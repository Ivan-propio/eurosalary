#!/usr/bin/env node
// One-time script to seed CRM email sequences with step templates
// Creates 10 sequences with 3-5 steps each, professional consultative tone
// Brand: dark navy (#0F1F3D) + electric blue (#2563EB)

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing required environment variables: SUPABASE_URL, SUPABASE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Email template wrapper ---
function wrap(heading, bodyHtml, ctaText, ctaUrl) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
<tr><td style="background:linear-gradient(135deg,#0F1F3D,#1a3a6b);padding:28px 40px;text-align:center;">
<span style="color:#fff;font-size:22px;font-weight:700;">Euro<span style="color:#2563EB;">Salary</span></span></td></tr>
<tr><td style="padding:36px 40px;">
<h1 style="color:#0F1F3D;font-size:20px;margin:0 0 20px;line-height:1.4;">${heading}</h1>
${bodyHtml}
${ctaText ? `<table cellpadding="0" cellspacing="0" style="margin:28px auto 0;"><tr>
<td style="background:#2563EB;border-radius:6px;padding:13px 28px;">
<a href="${ctaUrl}" style="color:#fff;text-decoration:none;font-weight:600;font-size:14px;">${ctaText}</a>
</td></tr></table>` : ''}
</td></tr>
<tr><td style="padding:20px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
<p style="color:#94a3b8;font-size:11px;margin:0;text-align:center;">EuroSalary.eu &mdash; European Salary Intelligence &bull; Luxembourg<br>
<a href="https://eurosalary.eu" style="color:#94a3b8;">eurosalary.eu</a></p>
</td></tr></table></td></tr></table></body></html>`;
}

function p(text) {
  return `<p style="color:#4a5568;font-size:14px;line-height:1.7;margin:0 0 14px;">${text}</p>`;
}

function sig() {
  return `<p style="color:#64748b;font-size:13px;margin:24px 0 0;border-top:1px solid #e2e8f0;padding-top:16px;">Best regards,<br><strong style="color:#0F1F3D;">The EuroSalary Team</strong></p>`;
}

// --- Sequence definitions ---
const sequences = [
  {
    name: 'report_download_followup',
    trigger_event: 'report_download',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 2,
        subject_template: 'Your salary report for {country} is ready',
        body_html: wrap(
          'Your {country} Salary Report',
          p('Hi {name},') +
          p('Thanks for downloading the salary report for {country}. We hope you find the data valuable for your benchmarking needs.') +
          p('The report covers median salaries across 20+ job categories, seniority levels, and regional breakdowns. Here are a few things you can do with it:') +
          p('<strong>&bull;</strong> Compare your compensation packages against market rates<br><strong>&bull;</strong> Identify salary gaps across seniority levels<br><strong>&bull;</strong> Benchmark against neighboring countries') +
          p('Have questions about the data? Simply reply to this email.') + sig(),
          'Explore More Countries',
          'https://eurosalary.eu/en/countries/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 48,
        subject_template: 'How teams use EuroSalary data for {country}',
        body_html: wrap(
          'Getting More From Your Salary Data',
          p('Hi {name},') +
          p('Many HR teams and compensation analysts use EuroSalary data to go beyond simple benchmarking. Here are the most common use cases we see:') +
          p('<strong>1. Compensation audits</strong> &mdash; Compare your salary bands against real market data across Europe.') +
          p('<strong>2. Hiring budgets</strong> &mdash; Set competitive offers using up-to-date salary ranges by role and seniority.') +
          p('<strong>3. Relocation packages</strong> &mdash; Calculate cost-adjusted compensation when moving talent between countries.') +
          p('Need data for more than one country? Our multi-country comparison tool lets you benchmark across 15 EU markets side by side.') + sig(),
          'Compare Countries',
          'https://eurosalary.eu/en/countries/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 120,
        subject_template: 'Unlock the full picture for {company}',
        body_html: wrap(
          'Go Deeper With Premium Data',
          p('Hi {name},') +
          p('The report you downloaded is a great starting point. But if {company} needs detailed salary breakdowns by city, sector, or experience band, our Premium reports provide significantly more granularity.') +
          p('Premium includes:<br><strong>&bull;</strong> City-level salary data (24 major EU cities)<br><strong>&bull;</strong> Sector-specific breakdowns<br><strong>&bull;</strong> Historical trends (3-year comparison)<br><strong>&bull;</strong> Exportable CSV/PDF formats') +
          p('Teams typically use these for board presentations, compensation reviews, and market-entry analysis.') + sig(),
          'View Premium Reports',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
    ],
  },
  {
    name: 'api_waitlist_followup',
    trigger_event: 'api_interest',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 1,
        subject_template: "You're on the EuroSalary API waitlist",
        body_html: wrap(
          'Welcome to the API Waitlist',
          p('Hi {name},') +
          p("Thanks for your interest in the EuroSalary API. You're now on our waitlist and we'll notify you as soon as your access is ready.") +
          p('The API provides programmatic access to:<br><strong>&bull;</strong> Salary data for 15 EU countries and 20+ job categories<br><strong>&bull;</strong> Real-time minimum wage data<br><strong>&bull;</strong> City-level salary comparisons<br><strong>&bull;</strong> Cost-of-living adjusted figures') +
          p('While you wait, you can review our API documentation to plan your integration.') + sig(),
          'View API Documentation',
          'https://eurosalary.eu/en/salary-api/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 72,
        subject_template: 'API use cases for {company}',
        body_html: wrap(
          'How Companies Use the EuroSalary API',
          p('Hi {name},') +
          p("While you're on the waitlist, here are the most popular API integration patterns we see:") +
          p('<strong>HR platforms</strong> &mdash; Embed salary benchmarks directly into your compensation management tools.') +
          p('<strong>Job boards</strong> &mdash; Show salary ranges alongside job postings to improve candidate engagement.') +
          p('<strong>Consulting firms</strong> &mdash; Pull real-time data into client deliverables and market reports.') +
          p('<strong>Internal tools</strong> &mdash; Power dashboards for HR teams with live European salary data.') +
          p('If you have a specific use case in mind, reply to this email and we can help you plan the integration.') + sig(),
          'Read API Docs',
          'https://eurosalary.eu/en/salary-api/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 168,
        subject_template: 'Your API access update',
        body_html: wrap(
          'API Access &mdash; Next Steps',
          p('Hi {name},') +
          p('We wanted to give you an update on your API waitlist status. We are onboarding new API users in batches to ensure quality of service.') +
          p('In the meantime, you can start with our free tier which includes 100 requests per day &mdash; enough to prototype your integration and test endpoints.') +
          p('Ready to get started? Visit your API dashboard to activate your free key.') + sig(),
          'Get Your API Key',
          'https://eurosalary.eu/en/salary-api/'
        ),
      },
    ],
  },
  {
    name: 'employer_benchmark_demo',
    trigger_event: 'employer_inquiry',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 1,
        subject_template: 'Salary benchmarking for {company}',
        body_html: wrap(
          "Let's Build Your Compensation Benchmark",
          p('Hi {name},') +
          p("Thank you for your interest in EuroSalary's employer solutions. We help companies like {company} make data-driven compensation decisions across European markets.") +
          p('Based on your inquiry, here is what we can help with:<br><strong>&bull;</strong> Multi-country salary benchmarking<br><strong>&bull;</strong> Compensation band design<br><strong>&bull;</strong> Pay equity analysis<br><strong>&bull;</strong> Market-rate adjustments by seniority') +
          p('Would a 20-minute walkthrough of our employer dashboard be useful? Simply reply with a couple of time slots that work for you.') + sig(),
          'Explore Employer Solutions',
          'https://eurosalary.eu/en/for-employers/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 48,
        subject_template: 'How employers benchmark with EuroSalary',
        body_html: wrap(
          'Compensation Benchmarking in Practice',
          p('Hi {name},') +
          p('Here is how other employers use EuroSalary to stay competitive:') +
          p('<strong>Annual compensation review</strong><br>Pull updated salary data for all roles, compare against your current bands, and identify where adjustments are needed.') +
          p('<strong>New market entry</strong><br>When expanding to a new EU country, set compensation packages based on local market data rather than guesswork.') +
          p('<strong>Retention strategy</strong><br>Identify roles where your compensation is below market and address them before you lose talent.') +
          p('Our employer dashboard makes this analysis easy with side-by-side comparisons and exportable reports.') + sig(),
          'View Pricing Plans',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 120,
        subject_template: 'Quick question about {company} compensation strategy',
        body_html: wrap(
          'One Question for You',
          p('Hi {name},') +
          p("I wanted to follow up on your interest in salary benchmarking for {company}. I have one quick question:") +
          p('<strong>What is the biggest compensation challenge you are facing right now?</strong>') +
          p('Whether it is pay equity, cross-border consistency, or simply staying competitive in a tight market, we have likely helped a similar company solve it.') +
          p('Reply with a sentence or two, and I will point you to the most relevant data and tools we have.') + sig(),
          null, null
        ),
      },
      {
        step_order: 4,
        delay_hours: 240,
        subject_template: 'Last chance: Free {country} salary benchmark for {company}',
        body_html: wrap(
          'A Complimentary Benchmark Report',
          p('Hi {name},') +
          p("I know things get busy, so I wanted to make this easy. We have prepared a complimentary salary benchmark overview for {country} that is relevant to companies like {company}.") +
          p('It includes:<br><strong>&bull;</strong> Top 10 roles by salary in {country}<br><strong>&bull;</strong> Year-over-year salary trends<br><strong>&bull;</strong> How {country} compares to neighboring markets') +
          p('No commitment required. Download it and see if the data is useful for your team.') + sig(),
          'Download Free Report',
          'https://eurosalary.eu/en/premium/reports/'
        ),
      },
    ],
  },
  {
    name: 'recruiter_nurture',
    trigger_event: 'recruiter_inquiry',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 2,
        subject_template: 'Salary data that helps you close candidates',
        body_html: wrap(
          'Win More Placements With Better Data',
          p('Hi {name},') +
          p('Thanks for your interest in EuroSalary. As a recruiter, having accurate salary data can be the difference between closing a placement and losing a candidate.') +
          p('Here is what EuroSalary gives you:<br><strong>&bull;</strong> Real market rates by role, seniority, and country<br><strong>&bull;</strong> Data to justify salary expectations to clients<br><strong>&bull;</strong> Cross-border comparisons for international placements<br><strong>&bull;</strong> Monthly updates with the latest market trends') +
          p('Explore our free salary data to see how it can support your placements.') + sig(),
          'Browse Salary Data',
          'https://eurosalary.eu/en/countries/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 72,
        subject_template: 'The salary negotiation edge for recruiters',
        body_html: wrap(
          'Back Your Numbers With Data',
          p('Hi {name},') +
          p('The most successful recruiters we work with use salary data at three key moments:') +
          p('<strong>1. Job briefing</strong> &mdash; Show clients what the market actually pays for the role, setting realistic expectations from the start.') +
          p('<strong>2. Candidate screening</strong> &mdash; Quickly assess whether a candidate\'s salary expectations align with market rates.') +
          p('<strong>3. Offer negotiation</strong> &mdash; Present third-party data to bridge the gap between client budget and candidate expectations.') +
          p('Our salary comparison tool makes these conversations faster and more credible.') + sig(),
          'Try the Comparison Tool',
          'https://eurosalary.eu/en/calculator/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 168,
        subject_template: 'Recruiter plans starting at zero',
        body_html: wrap(
          'Plans Built for Recruitment Teams',
          p('Hi {name},') +
          p('EuroSalary offers a free tier that covers basic salary lookups. For recruitment agencies handling multiple markets, our Professional plan includes:') +
          p('<strong>&bull;</strong> Unlimited salary lookups across 15 EU countries<br><strong>&bull;</strong> City-level data for 24 major cities<br><strong>&bull;</strong> Downloadable salary reports for client presentations<br><strong>&bull;</strong> API access for ATS/CRM integration') +
          p('Many agencies find that a single successful placement pays for an entire year of access.') + sig(),
          'See Pricing',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
    ],
  },
  {
    name: 'transparency_urgency',
    trigger_event: 'transparency_page_view',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 4,
        subject_template: 'EU Pay Transparency Directive: Is {company} ready?',
        body_html: wrap(
          'The EU Pay Transparency Directive Is Coming',
          p('Hi {name},') +
          p('You recently explored our salary transparency content. If you are preparing for the EU Pay Transparency Directive, here is what you need to know:') +
          p('<strong>By June 2026</strong>, companies in the EU must disclose salary ranges in job postings, provide pay gap reports, and justify any compensation differences.') +
          p('The key requirements:<br><strong>&bull;</strong> Salary ranges in all job advertisements<br><strong>&bull;</strong> Right of employees to request pay information<br><strong>&bull;</strong> Mandatory gender pay gap reporting (250+ employees)<br><strong>&bull;</strong> Joint pay assessments if gap exceeds 5%') +
          p('EuroSalary provides the benchmark data you need to set compliant, competitive salary ranges.') + sig(),
          'Read Our Transparency Guide',
          'https://eurosalary.eu/en/salary-transparency/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 96,
        subject_template: 'How to set salary ranges that comply with EU rules',
        body_html: wrap(
          'Setting Compliant Salary Ranges',
          p('Hi {name},') +
          p('One of the most practical steps companies can take now is establishing salary ranges for every role. Here is a straightforward approach:') +
          p('<strong>Step 1:</strong> Benchmark each role against market data for your country and sector.<br><strong>Step 2:</strong> Define bands with a 15-25% spread between minimum and maximum.<br><strong>Step 3:</strong> Document the criteria that determine placement within each band (experience, skills, performance).<br><strong>Step 4:</strong> Review and adjust annually using updated market data.') +
          p('EuroSalary reports provide the market data foundation for each of these steps.') + sig(),
          'Get Country Reports',
          'https://eurosalary.eu/en/premium/reports/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 168,
        subject_template: 'Pay transparency compliance checklist',
        body_html: wrap(
          'Your Compliance Checklist',
          p('Hi {name},') +
          p('Here is a quick checklist to assess your readiness for pay transparency requirements:') +
          p('&#9744; Salary ranges defined for all roles<br>&#9744; Market benchmark data sourced and documented<br>&#9744; Job postings include salary range information<br>&#9744; Internal pay gap analysis completed<br>&#9744; Process for employee pay information requests<br>&#9744; Reporting framework for gender pay gap (if 250+ employees)') +
          p('If you need help with any of these steps, EuroSalary data can serve as your market reference. Reply to this email and we will point you to the right resources.') + sig(),
          'Explore Transparency Data',
          'https://eurosalary.eu/en/salary-transparency/'
        ),
      },
    ],
  },
  {
    name: 'compliance_reminders',
    trigger_event: 'compliance_interest',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 24,
        subject_template: 'Salary compliance deadlines for {country}',
        body_html: wrap(
          'Key Compensation Compliance Dates',
          p('Hi {name},') +
          p('Staying on top of compensation compliance across Europe can be complex. Here are the key regulatory milestones to track:') +
          p('<strong>EU Pay Transparency Directive</strong> &mdash; National transposition deadline: June 7, 2026<br><strong>Minimum wage reviews</strong> &mdash; Most EU countries review annually (Jan/Jul)<br><strong>Equal pay reporting</strong> &mdash; Varies by country (check local requirements)') +
          p('EuroSalary tracks minimum wage changes across all 15 EU markets in real time. Use our data to stay ahead of mandatory adjustments.') + sig(),
          'View Minimum Wages',
          'https://eurosalary.eu/en/countries/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 168,
        subject_template: 'Minimum wage update for {country}',
        body_html: wrap(
          'Stay Current With Wage Changes',
          p('Hi {name},') +
          p('Minimum wages across Europe change frequently. In 2026 alone, several countries have already announced adjustments.') +
          p('Using outdated wage data can lead to:<br><strong>&bull;</strong> Non-compliant employment contracts<br><strong>&bull;</strong> Underpayment penalties<br><strong>&bull;</strong> Employee relations issues<br><strong>&bull;</strong> Reputational risk') +
          p('Our platform updates minimum wage data within 48 hours of any official change. Subscribe to our newsletter for instant notifications.') + sig(),
          'Check Current Rates',
          'https://eurosalary.eu/en/countries/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 336,
        subject_template: 'Automate compliance with the EuroSalary API',
        body_html: wrap(
          'Automate Your Compliance Monitoring',
          p('Hi {name},') +
          p('If {company} operates across multiple EU countries, manual wage monitoring is not sustainable. Our API lets you automate it.') +
          p('Popular compliance automation use cases:<br><strong>&bull;</strong> Automatic alerts when minimum wages change<br><strong>&bull;</strong> Payroll system integration for wage floor checks<br><strong>&bull;</strong> Quarterly compliance reports generated automatically<br><strong>&bull;</strong> Dashboard showing compliance status by country') +
          p('The API starts at no cost with 100 requests per day. Enough to run a daily compliance check across all your markets.') + sig(),
          'Explore the API',
          'https://eurosalary.eu/en/salary-api/'
        ),
      },
    ],
  },
  {
    name: 'expansion_upsell',
    trigger_event: 'multi_country_interest',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 24,
        subject_template: 'Expanding to new EU markets? Data you need',
        body_html: wrap(
          'Market Entry Compensation Data',
          p('Hi {name},') +
          p('We noticed your interest in salary data across multiple countries. If {company} is considering expansion, compensation planning is one of the first things to get right.') +
          p('Our multi-country data helps you:<br><strong>&bull;</strong> Set competitive packages that attract local talent<br><strong>&bull;</strong> Understand true cost differences between markets<br><strong>&bull;</strong> Maintain internal equity across borders<br><strong>&bull;</strong> Plan realistic hiring budgets') +
          p('Start with our free country-by-country comparison tool.') + sig(),
          'Compare Countries',
          'https://eurosalary.eu/en/countries/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 96,
        subject_template: 'The hidden cost differences between EU markets',
        body_html: wrap(
          'Beyond Base Salary: True Compensation Costs',
          p('Hi {name},') +
          p('When expanding across Europe, base salary is only part of the picture. Here are the cost factors that catch most companies off guard:') +
          p('<strong>Social contributions</strong> &mdash; Vary from 13% (UK) to 45% (France) of gross salary.<br><strong>Mandatory benefits</strong> &mdash; Holiday allowances, 13th month pay, meal vouchers differ by country.<br><strong>Tax treatment</strong> &mdash; Employer tax obligations vary significantly.<br><strong>Cost of living</strong> &mdash; A competitive salary in Lisbon looks very different from one in Zurich.') +
          p('Our premium reports break down total employment cost by country, not just base salary.') + sig(),
          'View Premium Reports',
          'https://eurosalary.eu/en/premium/reports/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 192,
        subject_template: 'Enterprise plans for multi-country teams',
        body_html: wrap(
          'Built for Multi-Country Operations',
          p('Hi {name},') +
          p('For companies operating across multiple EU markets, our Enterprise plan provides:') +
          p('<strong>&bull;</strong> All 15 EU country reports with quarterly updates<br><strong>&bull;</strong> Custom salary bands by your specific roles and levels<br><strong>&bull;</strong> API access for payroll and HRIS integration<br><strong>&bull;</strong> Dedicated support for compensation strategy questions<br><strong>&bull;</strong> Cross-country pay equity analysis') +
          p('Would it be useful to have a conversation about how this could work for {company}? Reply with a convenient time and we will set something up.') + sig(),
          'Learn About Enterprise',
          'https://eurosalary.eu/en/enterprise/'
        ),
      },
    ],
  },
  {
    name: 'renewal_warning',
    trigger_event: 'subscription_expiring',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 0,
        subject_template: 'Your EuroSalary subscription renews soon',
        body_html: wrap(
          'Subscription Renewal Notice',
          p('Hi {name},') +
          p('This is a friendly reminder that your EuroSalary subscription is coming up for renewal.') +
          p('Over the past period, your account has had access to salary data across 15 EU markets. Here is a quick look at what is new since you last renewed:') +
          p('<strong>&bull;</strong> Updated 2026 salary data for all countries<br><strong>&bull;</strong> New city-level data for 6 additional cities<br><strong>&bull;</strong> Improved API with faster response times<br><strong>&bull;</strong> New salary transparency compliance tools') +
          p('No action needed if you want to continue. If you have any questions about your plan, just reply to this email.') + sig(),
          'Manage Your Account',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 120,
        subject_template: 'Renewing? Here is what is new in your plan',
        body_html: wrap(
          'New Features in Your Plan',
          p('Hi {name},') +
          p('Before your renewal, we wanted to highlight the features that have been added to your plan at no extra cost:') +
          p('<strong>&bull;</strong> Net salary calculator with tax breakdowns<br><strong>&bull;</strong> Salary alerts for roles and countries you track<br><strong>&bull;</strong> Improved export formats (CSV, PDF, Excel)<br><strong>&bull;</strong> EU Pay Transparency compliance toolkit') +
          p('All included in your current plan. Renew to keep access to everything.') + sig(),
          'Review Your Plan',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 240,
        subject_template: 'Your access expires in 3 days',
        body_html: wrap(
          'Access Expiring Soon',
          p('Hi {name},') +
          p('Just a heads-up: your EuroSalary access expires in 3 days. After that, you will lose access to:') +
          p('<strong>&bull;</strong> Premium salary reports and downloads<br><strong>&bull;</strong> API endpoints (if applicable)<br><strong>&bull;</strong> City-level and sector-level data<br><strong>&bull;</strong> Historical trend comparisons') +
          p('Free-tier access to basic country averages will still be available. To keep your full access, renew before the expiration date.') + sig(),
          'Renew Now',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
    ],
  },
  {
    name: 'trial_expiry',
    trigger_event: 'trial_started',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 48,
        subject_template: 'Getting the most from your EuroSalary trial',
        body_html: wrap(
          'Make the Most of Your Trial',
          p('Hi {name},') +
          p('You are a couple of days into your EuroSalary trial. Here are the three things most users find valuable during their trial:') +
          p('<strong>1. Download a country report</strong> &mdash; Get a full salary breakdown for your primary market.') +
          p('<strong>2. Run a comparison</strong> &mdash; Compare salaries for a role across multiple countries to see the spread.') +
          p('<strong>3. Try the calculator</strong> &mdash; Calculate net salary with tax breakdowns for any EU country.') +
          p('Each of these features is available during your trial. Try them before your trial ends.') + sig(),
          'Go to Dashboard',
          'https://eurosalary.eu/en/premium/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 120,
        subject_template: 'Your trial is halfway through',
        body_html: wrap(
          'Trial Checkpoint: Halfway There',
          p('Hi {name},') +
          p('Your EuroSalary trial is at the halfway mark. Quick question: have you found what you were looking for?') +
          p('If you need help with anything specific &mdash; a particular country, a specific job category, or an integration question &mdash; reply to this email and we will point you in the right direction.') +
          p('If you have already found the data useful, you can upgrade to a paid plan at any time to keep access after your trial ends.') + sig(),
          'View Plans',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 216,
        subject_template: 'Your trial ends tomorrow',
        body_html: wrap(
          'Trial Ending Tomorrow',
          p('Hi {name},') +
          p('Your EuroSalary trial expires tomorrow. After that, your access will revert to the free tier.') +
          p('What you keep on free tier:<br><strong>&bull;</strong> Basic country-level salary averages<br><strong>&bull;</strong> Minimum wage data<br><strong>&bull;</strong> Salary comparison tool (limited)') +
          p('What you lose:<br><strong>&bull;</strong> Detailed reports and downloads<br><strong>&bull;</strong> City-level and sector data<br><strong>&bull;</strong> API access<br><strong>&bull;</strong> Historical trends') +
          p('Upgrade before tomorrow to keep full access with no interruption.') + sig(),
          'Upgrade Now',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
      {
        step_order: 4,
        delay_hours: 264,
        subject_template: 'Your trial has ended (but we saved your data)',
        body_html: wrap(
          'Trial Ended &mdash; Your Data Is Safe',
          p('Hi {name},') +
          p('Your EuroSalary trial has ended. Your account is now on the free tier.') +
          p('We have saved any reports you downloaded and your comparison history. If you upgrade within the next 30 days, everything will be right where you left it.') +
          p('If the timing is not right, no problem. You can upgrade whenever you need European salary data again.') + sig(),
          'Reactivate Premium',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
    ],
  },
  {
    name: 'lost_deal_reactivation',
    trigger_event: 'deal_lost',
    is_active: true,
    steps: [
      {
        step_order: 1,
        delay_hours: 336, // 2 weeks after deal lost
        subject_template: 'New salary data available for {country}',
        body_html: wrap(
          'Fresh Data for Your Markets',
          p('Hi {name},') +
          p('We have recently updated our salary data with the latest figures across all 15 EU countries. Since you were previously interested in our data, we thought you might find this update useful.') +
          p('Key updates:<br><strong>&bull;</strong> Q1 2026 salary adjustments reflected<br><strong>&bull;</strong> New minimum wage figures for 8 countries<br><strong>&bull;</strong> Updated cost-of-living indices') +
          p('Even on our free tier, you can access the updated country averages and minimum wage data.') + sig(),
          'See Updated Data',
          'https://eurosalary.eu/en/countries/'
        ),
      },
      {
        step_order: 2,
        delay_hours: 672, // 4 weeks
        subject_template: 'A different approach for {company}',
        body_html: wrap(
          'We Have New Options',
          p('Hi {name},') +
          p('Since we last spoke, we have introduced some new options that might be a better fit for {company}:') +
          p('<strong>Pay-per-report</strong> &mdash; Buy individual country reports without a subscription.<br><strong>API micro-plan</strong> &mdash; 1,000 requests/month for teams that need occasional data access.<br><strong>Annual billing</strong> &mdash; Save 20% compared to monthly plans.') +
          p('Sometimes the timing or the package was not quite right. If circumstances have changed, we would be happy to discuss what makes sense now.') + sig(),
          'View New Options',
          'https://eurosalary.eu/en/pricing/'
        ),
      },
      {
        step_order: 3,
        delay_hours: 1344, // 8 weeks
        subject_template: 'Checking in from EuroSalary',
        body_html: wrap(
          'A Quick Check-In',
          p('Hi {name},') +
          p('It has been a while since we connected. Just wanted to let you know that EuroSalary is here whenever {company} needs European salary data.') +
          p('A few things that have changed since we last spoke:<br><strong>&bull;</strong> Expanded from 15 to more EU markets<br><strong>&bull;</strong> New EU Pay Transparency compliance tools<br><strong>&bull;</strong> Improved API with sub-100ms response times') +
          p('No pressure at all. This is just a friendly check-in. Reply anytime if you want to explore how things have evolved.') + sig(),
          'Visit EuroSalary',
          'https://eurosalary.eu'
        ),
      },
    ],
  },
];

// --- Main ---
async function main() {
  console.log('Seeding email sequences...\n');

  for (const seq of sequences) {
    const { steps, ...seqData } = seq;

    // Upsert sequence
    const { data: seqRow, error: seqErr } = await supabase
      .from('crm_email_sequences')
      .upsert(seqData, { onConflict: 'name' })
      .select('id')
      .single();

    if (seqErr) {
      console.error(`Failed to upsert sequence "${seq.name}":`, seqErr.message);
      continue;
    }

    console.log(`Sequence "${seq.name}" (id: ${seqRow.id}) — ${steps.length} steps`);

    // Delete existing steps for this sequence (idempotent re-run)
    await supabase
      .from('crm_sequence_steps')
      .delete()
      .eq('sequence_id', seqRow.id);

    // Insert steps
    for (const step of steps) {
      const { error: stepErr } = await supabase
        .from('crm_sequence_steps')
        .insert({
          sequence_id: seqRow.id,
          ...step,
        });

      if (stepErr) {
        console.error(`  Failed to insert step ${step.step_order}:`, stepErr.message);
      } else {
        console.log(`  Step ${step.step_order}: "${step.subject_template}" (delay: ${step.delay_hours}h)`);
      }
    }
  }

  console.log('\nDone. All sequences seeded.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
