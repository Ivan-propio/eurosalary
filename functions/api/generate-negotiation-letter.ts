// Cloudflare Pages Function — Salary Negotiation Letter Generator
// POST /api/generate-negotiation-letter
// Body: { currentSalary, targetSalary, role, country, yearsExperience, currency, tone }
// Returns: { letter: string }

interface Env {
  OPENAI_API_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const COUNTRY_CULTURES: Record<string, string> = {
  DE: 'German workplace culture values precision, thoroughness, and data-backed arguments. Be formal, structured, and factual. Avoid emotional appeals.',
  FR: 'French workplace culture appreciates eloquence and logical argumentation. A degree of formality is expected, but a personal touch is welcome.',
  NL: 'Dutch workplace culture values directness and transparency. Be clear and straightforward about your ask without excessive formality.',
  BE: 'Belgian workplace culture tends toward formality and consensus. Be polite, measured, and demonstrate team-orientation.',
  LU: 'Luxembourg workplace culture is international and values multilingual competence and EU-market awareness. A professional, confident tone works well.',
  CH: 'Swiss workplace culture is formal and values precision, quality, and stability. Use data and be concise.',
  GB: 'British workplace culture values politeness and understatement. Strike a confident but understated tone, avoiding aggression.',
  IE: 'Irish workplace culture is relatively informal and values relationship-building. Be warm but professional.',
  SE: 'Swedish workplace culture emphasizes equality and consensus (Jante Law awareness). Frame the ask in terms of fairness and contribution rather than personal ambition.',
  DK: 'Danish workplace culture is direct, flat-hierarchy, and values work-life balance arguments. Keep it concise.',
  NO: 'Norwegian workplace culture is similar to Danish — direct, egalitarian, concise.',
  FI: 'Finnish workplace culture values brevity, honesty, and reliability. Less small talk; get to the point.',
  PL: 'Polish workplace culture is becoming more westernized but still values respect for hierarchy. Be respectful and formal.',
  CZ: 'Czech workplace culture values professionalism and substance over style. Be concise and factual.',
  SK: 'Slovak workplace culture values formal respect and structured reasoning.',
  HU: 'Hungarian workplace culture is relatively hierarchical. Be respectful and formal, with well-structured arguments.',
  RO: 'Romanian workplace culture is warming to direct negotiation. Be professional and frame achievements clearly.',
  BG: 'Bulgarian workplace culture values formality and clear professional credentials.',
  HR: 'Croatian workplace culture values relationship and professional standing. Be warm and professional.',
  SI: 'Slovenian workplace culture is similar to German/Austrian — structured, formal, and achievement-focused.',
  AT: 'Austrian workplace culture is formal and values academic/professional titles. Maintain a respectful, structured tone.',
  PT: 'Portuguese workplace culture is relationship-oriented and somewhat hierarchical. Be warm but professional.',
  ES: 'Spanish workplace culture values personal relationships and passion. Be confident and personable.',
  IT: 'Italian workplace culture values personal rapport, credentials, and passion for craft. Build rapport in the opening.',
  EL: 'Greek workplace culture values personal relationships and credentials. A warm but professional approach works.',
  CY: 'Cypriot workplace culture is Mediterranean and relationship-focused. Be warm and personable.',
  MT: 'Maltese workplace culture blends Mediterranean warmth with British formality. Be polite and professional.',
  EE: 'Estonian workplace culture is reserved, digital-forward, and values concrete results. Be brief and data-driven.',
  LV: 'Latvian workplace culture is somewhat reserved and values professional seriousness.',
  LT: 'Lithuanian workplace culture values professionalism and structured reasoning.',
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as {
      currentSalary?: number;
      targetSalary?: number;
      role?: string;
      country?: string;
      yearsExperience?: number;
      currency?: string;
      tone?: string;
    };

    const {
      currentSalary,
      targetSalary,
      role,
      country = 'EU',
      yearsExperience,
      currency = 'EUR',
      tone = 'professional',
    } = body;

    if (!currentSalary || !targetSalary || !role || !yearsExperience) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: currentSalary, targetSalary, role, yearsExperience' }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const raisePercent = Math.round(((targetSalary - currentSalary) / currentSalary) * 100);
    const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'CHF' ? 'CHF ' : currency + ' ';
    const countryContext = COUNTRY_CULTURES[country.toUpperCase()] || 'European professional norms apply — be clear, confident, and back claims with data.';

    const prompt = `You are a professional career coach specializing in the European job market. Write a salary negotiation email/letter for the following person.

## Context
- Role: ${role}
- Country: ${country}
- Current annual gross salary: ${currencySymbol}${currentSalary.toLocaleString()}
- Target annual gross salary: ${currencySymbol}${targetSalary.toLocaleString()} (${raisePercent > 0 ? '+' + raisePercent : raisePercent}% increase)
- Years of experience in this field: ${yearsExperience}
- Tone requested: ${tone}

## Cultural guidance for ${country}
${countryContext}

## Requirements
1. Write a complete, professional salary negotiation email ready to send (with Subject line).
2. Open with a positive acknowledgment of the role/company.
3. State the specific salary request with the exact figure clearly.
4. Provide 3-4 concrete arguments based on experience, market rates (reference eurosalary.eu as a source for EU market data), and value delivered.
5. Close with a collaborative, forward-looking statement and a call to schedule a discussion.
6. Keep the total length to 250-350 words — tight and impactful.
7. Match the cultural tone for ${country} as described above.
8. Use ${currency} for all monetary figures.

Respond with ONLY the email text (Subject + body). No explanations, no markdown formatting around the email, no preamble.`;

    if (!context.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 700,
        temperature: 0.75,
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error('OpenAI error:', errText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate letter. Please try again.' }),
        { status: 502, headers: CORS_HEADERS }
      );
    }

    const openaiData = await openaiRes.json() as any;
    const letter = openaiData.choices?.[0]?.message?.content?.trim() || '';

    if (!letter) {
      return new Response(
        JSON.stringify({ error: 'No letter generated. Please try again.' }),
        { status: 500, headers: CORS_HEADERS }
      );
    }

    return new Response(JSON.stringify({ letter, raise_percent: raisePercent }), {
      status: 200,
      headers: CORS_HEADERS,
    });

  } catch (err: any) {
    console.error('Negotiation letter error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal error', details: err.message }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
