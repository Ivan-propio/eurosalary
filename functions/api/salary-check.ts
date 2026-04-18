// Cloudflare Pages Function — "Are You Well Paid?" Salary Check
// POST /api/salary-check
// Body: { country: string, job: string, salary: number, currency: string }
// Returns: percentile, verdict, ai_analysis, top_countries, salary_tips

import { createClient } from '@supabase/supabase-js';

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  OPENAI_API_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Exchange rates to EUR (approximate 2026)
const EUR_RATES: Record<string, number> = {
  EUR: 1, GBP: 1.17, CHF: 1.06, SEK: 0.088, DKK: 0.134,
  PLN: 0.233, CZK: 0.04, HUF: 0.0026, RON: 0.2, BGN: 0.51,
  HRK: 0.133, NOK: 0.09, ISK: 0.0066,
};

function toEUR(amount: number, currency: string): number {
  const rate = EUR_RATES[currency.toUpperCase()] ?? 1;
  return Math.round(amount * rate);
}

function calcPercentile(userSalary: number, min: number, median: number, max: number): number {
  // Simple percentile estimation from min/median/max
  if (userSalary <= min) return 5;
  if (userSalary >= max) return 98;
  if (userSalary <= median) {
    return Math.round(5 + ((userSalary - min) / (median - min)) * 45);
  }
  return Math.round(50 + ((userSalary - median) / (max - median)) * 48);
}

function getVerdict(percentile: number): { label: string; key: string; color: string } {
  if (percentile >= 75) return { label: 'Well Paid', key: 'well_paid', color: '#10B981' };
  if (percentile >= 40) return { label: 'Market Rate', key: 'average', color: '#F59E0B' };
  return { label: 'Underpaid', key: 'underpaid', color: '#EF4444' };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as {
      country?: string;
      job?: string;
      salary?: number;
      currency?: string;
      experience_level?: string;
    };

    const { country, job, salary, currency = 'EUR', experience_level = 'mid' } = body;

    if (!country || !job || !salary) {
      return new Response(JSON.stringify({ error: 'Missing required fields: country, job, salary' }), {
        status: 400, headers: CORS_HEADERS,
      });
    }

    const salaryEUR = toEUR(salary, currency);
    const supabase = createClient(context.env.PUBLIC_SUPABASE_URL, context.env.PUBLIC_SUPABASE_ANON_KEY);

    // 1. Get salary benchmark for user's country + job
    const { data: benchmarkData } = await supabase
      .from('salary_data')
      .select(`
        salary_min, salary_median, salary_max, experience_level,
        jobs!inner(slug, name_en),
        countries!inner(code, name_en, currency)
      `)
      .eq('jobs.slug', job)
      .eq('countries.code', country.toUpperCase())
      .eq('experience_level', experience_level);

    // 2. Get all countries data for this job (comparison)
    const { data: allCountriesData } = await supabase
      .from('salary_data')
      .select(`
        salary_min, salary_median, salary_max, experience_level,
        jobs!inner(slug, name_en),
        countries!inner(code, name_en, currency)
      `)
      .eq('jobs.slug', job)
      .eq('experience_level', experience_level)
      .order('salary_median', { ascending: false });

    const benchmark = benchmarkData?.[0];
    const jobName = (benchmark?.jobs as any)?.name_en || job.replace(/-/g, ' ');
    const countryName = (benchmark?.countries as any)?.name_en || country;

    // Calculate percentile
    let percentile = 50;
    let salaryMin = 0, salaryMedian = 0, salaryMax = 0;

    if (benchmark) {
      salaryMin = benchmark.salary_min;
      salaryMedian = benchmark.salary_median;
      salaryMax = benchmark.salary_max;
      percentile = calcPercentile(salaryEUR, salaryMin, salaryMedian, salaryMax);
    }

    const verdict = getVerdict(percentile);

    // Top 3 countries paying more
    const topCountries = (allCountriesData || [])
      .filter((r: any) => {
        const code = (r.countries as any)?.code;
        return code !== country.toUpperCase() && r.salary_median > salaryEUR;
      })
      .slice(0, 3)
      .map((r: any) => ({
        code: (r.countries as any)?.code,
        name: (r.countries as any)?.name_en,
        median: r.salary_median,
        diff: Math.round(((r.salary_median - salaryEUR) / salaryEUR) * 100),
      }));

    // 3. Generate AI analysis via OpenAI
    let aiAnalysis = '';
    let salaryTips: string[] = [];

    if (context.env.OPENAI_API_KEY) {
      try {
        const prompt = `You are a European salary expert. Analyze this person's compensation situation concisely.

Job: ${jobName}
Country: ${countryName}
Their annual salary: €${salaryEUR.toLocaleString()}
Market median for this role in ${countryName}: €${salaryMedian.toLocaleString()}
Market range: €${salaryMin.toLocaleString()} – €${salaryMax.toLocaleString()}
Their percentile: Top ${100 - percentile}% (${percentile}th percentile)
Verdict: ${verdict.label}

${topCountries.length > 0 ? `Top paying countries for this role: ${topCountries.map(c => `${c.name} (€${c.median.toLocaleString()}, +${c.diff}%)`).join(', ')}` : ''}

Write a 2-3 sentence personal analysis explaining their position in the market. Be direct, insightful, and encouraging. Mention specific factors relevant to their job/country if relevant.

Then provide exactly 3 concrete action items to increase their salary (skills, negotiation, etc.) formatted as a JSON array of strings.

Respond in this exact JSON format:
{
  "analysis": "Your 2-3 sentence analysis here...",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${context.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (openaiRes.ok) {
          const openaiData = await openaiRes.json() as any;
          const parsed = JSON.parse(openaiData.choices[0].message.content);
          aiAnalysis = parsed.analysis || '';
          salaryTips = parsed.tips || [];
        }
      } catch (err) {
        console.error('OpenAI error:', err);
      }
    }

    // Fallback analysis if OpenAI fails
    if (!aiAnalysis) {
      if (verdict.key === 'well_paid') {
        aiAnalysis = `You're earning above the ${percentile}th percentile for ${jobName} in ${countryName} — you're in a strong position. Your salary is ${Math.round(((salaryEUR - salaryMedian) / salaryMedian) * 100)}% above the market median. Focus on maintaining your edge through continuous skill development.`;
      } else if (verdict.key === 'average') {
        aiAnalysis = `Your salary is at the ${percentile}th percentile for ${jobName} in ${countryName}, right around the market median of €${salaryMedian.toLocaleString()}. You have solid room to grow — targeted negotiations and skill upgrades could move you into the top 25%.`;
      } else {
        aiAnalysis = `Your salary is below the market median for ${jobName} in ${countryName}. The median for your role is €${salaryMedian.toLocaleString()}, putting you in the ${percentile}th percentile. There's a clear opportunity to close this gap — consider the actions below.`;
      }
      salaryTips = [
        'Negotiate at your next review using specific market data from eurosalary.eu',
        `Consider roles in higher-paying EU countries — ${topCountries[0]?.name || 'Luxembourg'} offers up to ${topCountries[0]?.diff || 30}% more for this role`,
        'Upskill in the highest-demand technologies or certifications for your field to move into senior roles',
      ];
    }

    return new Response(JSON.stringify({
      percentile,
      verdict,
      salary_eur: salaryEUR,
      benchmark: {
        min: salaryMin,
        median: salaryMedian,
        max: salaryMax,
        country: countryName,
        job: jobName,
        experience_level,
      },
      ai_analysis: aiAnalysis,
      salary_tips: salaryTips,
      top_countries: topCountries,
    }), { status: 200, headers: CORS_HEADERS });

  } catch (err: any) {
    console.error('Salary check error:', err);
    return new Response(JSON.stringify({ error: 'Internal error', details: err.message }), {
      status: 500, headers: CORS_HEADERS,
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
