#!/usr/bin/env node
// MAILER agent — AI-generated weekly newsletter content

import { createClient } from '@supabase/supabase-js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ask } from './_ai.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LANGUAGES = ['en', 'fr', 'de', 'es'];

const subjects = {
  en: (week) => `Salary Pulse Europe — Week ${week} Insights`,
  fr: (week) => `Salary Pulse Europe — Aperçu Semaine ${week}`,
  de: (week) => `Salary Pulse Europe — Woche ${week} Einblicke`,
  es: (week) => `Salary Pulse Europe — Semana ${week} Análisis`,
};

const intros = {
  en: 'Here are this week\'s highlights in European salary trends.',
  fr: 'Voici les faits marquants de la semaine en matière de salaires européens.',
  de: 'Hier sind die Highlights der Woche bei europäischen Gehaltstrends.',
  es: 'Aquí están los aspectos destacados de esta semana en tendencias salariales europeas.',
};

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - start) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
}

function generateHtml(lang, topJobs, countryHighlight, intro) {
  const week = getWeekNumber();
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F7FA;font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FA;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
  <tr><td style="background:#0A1F44;padding:28px 40px;">
    <span style="color:#fff;font-family:'Inter',sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Euro<span style="color:#0066CC;">Salary</span><span style="color:#FFCC00;">.eu</span></span>
    <p style="color:rgba(203,213,225,0.7);font-family:'Inter',sans-serif;font-size:12px;margin:8px 0 0;letter-spacing:0.02em;">Salary Pulse Europe &mdash; Week ${week}</p>
  </td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="color:#374151;font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;margin:0 0 24px;">${intro || intros[lang] || intros.en}</p>

    <h2 style="color:#0A1F44;font-family:'Inter',sans-serif;font-size:17px;font-weight:700;margin:0 0 12px;letter-spacing:-0.3px;">Top Salary Movements This Week</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${(topJobs || []).map(j => `<tr><td style="padding:10px 14px;background:#F8FAFC;border-radius:6px;margin-bottom:6px;font-family:'Inter',sans-serif;font-size:14px;color:#374151;border-bottom:1px solid #E5E7EB;"><strong style="color:#0A1F44;">${j.job}</strong> &mdash; ${j.country}<span style="float:right;color:#003399;font-weight:600;">€${(j.salary||0).toLocaleString()}/yr <span style="color:#10B981;">${j.change || ''}</span></span></td></tr>`).join('')}
    </table>

    <h2 style="color:#0A1F44;font-family:'Inter',sans-serif;font-size:17px;font-weight:700;margin:0 0 12px;letter-spacing:-0.3px;">Country Spotlight</h2>
    <p style="color:#374151;font-family:'Inter',sans-serif;font-size:14px;line-height:1.7;margin:0 0 24px;padding:16px;background:#F5F7FA;border-left:3px solid #003399;border-radius:0 6px 6px 0;">${countryHighlight || 'This week we spotlight Germany, where tech salaries continue their upward trajectory driven by strong demand in AI and cloud engineering roles.'}</p>

    <table cellpadding="0" cellspacing="0" style="margin:8px auto 0;">
      <tr><td style="background:#003399;border-radius:12px;padding:13px 30px;">
        <a href="https://eurosalary.eu/${lang}/" style="color:#fff;text-decoration:none;font-family:'Inter',sans-serif;font-weight:600;font-size:14px;">Explore Full Data &rarr;</a>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 40px;background:#F9FAFB;border-top:1px solid #E5E7EB;text-align:center;">
    <p style="color:#9CA3AF;font-family:'Inter',sans-serif;font-size:11px;margin:0 0 4px;">EuroSalary.eu &mdash; European Salary Intelligence</p>
    <p style="color:#6B7280;font-family:'Inter',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.05em;margin:0 0 8px;">Precision. Integrity. Sovereignty. &bull; Luxembourg</p>
    <a href="https://eurosalary.eu/${lang}/newsletter/" style="color:#9CA3AF;font-family:'Inter',sans-serif;font-size:11px;">Unsubscribe</a>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

async function main() {
  console.log('🧠 MAILER — Generating AI-powered newsletter content...');

  // Fetch recent salary data context from Supabase
  const { data: recentData } = await supabase
    .from('salary_data')
    .select('country_code, job_slug, salary_median, updated_at')
    .order('updated_at', { ascending: false })
    .limit(20);

  const week = getWeekNumber();
  const year = new Date().getFullYear();

  const newsletter = {};

  for (const lang of LANGUAGES) {
    console.log(`  Generating ${lang} newsletter...`);

    const langNames = { en: 'English', fr: 'French', de: 'German', es: 'Spanish' };

    const content = await ask(`You are writing the weekly EuroSalary.eu newsletter in ${langNames[lang]}.

EuroSalary is a European salary comparison platform covering 27 EU countries.
Week ${week}, ${year}.

Recent salary data points (for context): ${JSON.stringify((recentData || []).slice(0, 10))}

Write a newsletter email in ${langNames[lang]} with:
1. Subject line (compelling, data-driven, max 60 chars)
2. Intro paragraph (2-3 sentences, mention a specific trend or insight)
3. 3 salary highlights (job + country + salary + % change vs last week)
4. A "Country Spotlight" paragraph (pick one interesting EU country, explain something about salaries there)
5. One call-to-action sentence

Format as JSON:
{
  "subject": "...",
  "intro": "...",
  "highlights": [{"job":"...","country":"...","salary":65000,"change":"+1.8%"},...],
  "spotlight": "...",
  "cta": "..."
}

Use realistic European salary data. Be engaging and professional.`, { maxTokens: 800, temperature: 0.7 });

    let parsed = null;
    if (content) {
      try {
        const cleaned = content.replace(/^```json?\s*/i,'').replace(/\s*```$/i,'').trim();
        parsed = JSON.parse(cleaned);
      } catch { console.log(`  Could not parse AI JSON for ${lang}, using fallback`); }
    }

    const topJobs = parsed?.highlights || [
      { job: 'Software Engineer', country: 'Germany', salary: 68000, change: '+2.3%' },
      { job: 'Data Scientist', country: 'Netherlands', salary: 65000, change: '+1.8%' },
      { job: 'Product Manager', country: 'France', salary: 55000, change: '+1.5%' },
    ];
    const intro = parsed?.intro || intros[lang] || intros.en;
    const subject = parsed?.subject || subjects[lang](week);
    const spotlight = parsed?.spotlight || '';

    newsletter[lang] = {
      subject,
      html: generateHtml(lang, topJobs, spotlight, intro),
      week,
    };
  }

  mkdirSync(join(ROOT, 'tmp'), { recursive: true });
  writeFileSync(join(ROOT, 'tmp', 'newsletter.json'), JSON.stringify(newsletter, null, 2));
  console.log('✅ AI newsletter content generated: tmp/newsletter.json');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
