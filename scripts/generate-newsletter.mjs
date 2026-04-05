#!/usr/bin/env node
// Generate weekly newsletter content from latest salary data
// Output: tmp/newsletter.json with subject, html, and text versions per language

import { createClient } from '@supabase/supabase-js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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

function generateHtml(lang, topJobs, countryHighlight) {
  const week = getWeekNumber();
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
  <tr><td style="background:linear-gradient(135deg,#0F1F3D,#1a3a6b);padding:28px 40px;text-align:center;">
    <span style="color:#fff;font-size:22px;font-weight:700;">Euro<span style="color:#2563EB;">Salary</span></span>
    <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:8px 0 0;">Salary Pulse Europe — Week ${week}</p>
  </td></tr>
  <tr><td style="padding:36px 40px;">
    <p style="color:#4a5568;font-size:15px;line-height:1.7;">${intros[lang] || intros.en}</p>

    <h2 style="color:#0F1F3D;font-size:18px;margin:24px 0 12px;">Top Salary Movements This Week</h2>
    ${(topJobs || []).map(j => `<p style="color:#4a5568;font-size:14px;margin:4px 0;">• <strong>${j.job}</strong> in ${j.country}: €${j.salary?.toLocaleString() || 'N/A'}/yr (${j.change || '+0%'})</p>`).join('')}

    <h2 style="color:#0F1F3D;font-size:18px;margin:24px 0 12px;">Country Spotlight</h2>
    <p style="color:#4a5568;font-size:14px;line-height:1.7;">${countryHighlight || 'This week we spotlight Germany, where tech salaries continue their upward trajectory.'}</p>

    <table cellpadding="0" cellspacing="0" style="margin:28px auto;">
      <tr><td style="background:#2563EB;border-radius:6px;padding:12px 28px;">
        <a href="https://eurosalary.eu/${lang}/" style="color:#fff;text-decoration:none;font-weight:600;font-size:14px;">Explore Full Data</a>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
    <p style="color:#94a3b8;font-size:11px;margin:0;text-align:center;">
      EuroSalary.eu — European Salary Intelligence<br>
      <a href="https://eurosalary.eu/${lang}/newsletter/" style="color:#94a3b8;">Unsubscribe</a>
    </p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

async function main() {
  console.log('Generating newsletter content...');

  // Fetch top salary movers (placeholder logic)
  const topJobs = [
    { job: 'Software Engineer', country: 'Germany', salary: 68000, change: '+2.3%' },
    { job: 'Data Scientist', country: 'Netherlands', salary: 65000, change: '+1.8%' },
    { job: 'Product Manager', country: 'France', salary: 55000, change: '+1.5%' },
    { job: 'DevOps Engineer', country: 'Ireland', salary: 72000, change: '+2.1%' },
    { job: 'Nurse', country: 'Denmark', salary: 45000, change: '+1.2%' },
  ];

  const newsletter = {};
  for (const lang of LANGUAGES) {
    const week = getWeekNumber();
    newsletter[lang] = {
      subject: subjects[lang](week),
      html: generateHtml(lang, topJobs),
      week,
    };
  }

  mkdirSync(join(ROOT, 'tmp'), { recursive: true });
  writeFileSync(join(ROOT, 'tmp', 'newsletter.json'), JSON.stringify(newsletter, null, 2));
  console.log('Newsletter content generated: tmp/newsletter.json');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
