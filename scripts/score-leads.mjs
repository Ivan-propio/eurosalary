#!/usr/bin/env node
// Weekly lead scoring script
// Recalculates enterprise_score and engagement_score for all active leads
// Run via: node scripts/score-leads.mjs

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Scoring functions ---

function calculateEnterpriseScore(lead) {
  let score = 0;

  // Company size: +10 to +40
  const size = lead.company_size || 0;
  if (size >= 1000) score += 40;
  else if (size >= 500) score += 30;
  else if (size >= 100) score += 20;
  else if (size >= 10) score += 10;

  // Lead type enterprise: +30
  if (lead.lead_type === 'enterprise') score += 30;

  // Multiple countries: +5 per country beyond the first
  const countryCount = lead.countries?.length || 1;
  if (countryCount > 1) score += (countryCount - 1) * 5;

  // API usage: +15
  if (lead.api_usage) score += 15;

  // Report downloads: +10 per download
  const downloads = lead.report_downloads || 0;
  score += downloads * 10;

  return Math.min(score, 100);
}

function calculateEngagementScore(lead) {
  let score = 0;

  // Pages visited: +1 per page, max 30
  const pages = lead.pages_visited || 0;
  score += Math.min(pages, 30);

  // Emails opened: +5 per email
  const emailsOpened = lead.emails_opened || 0;
  score += emailsOpened * 5;

  // API calls: +1 per 100 calls, max 20
  const apiCalls = lead.api_calls || 0;
  score += Math.min(Math.floor(apiCalls / 100), 20);

  // Recency bonus based on last_active
  if (lead.last_active) {
    const lastActive = new Date(lead.last_active);
    const now = new Date();
    const daysSinceActive = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

    if (daysSinceActive <= 7) score += 20;
    else if (daysSinceActive <= 30) score += 10;
  }

  return Math.min(score, 100);
}

// --- Main ---

async function main() {
  console.log('Starting weekly lead scoring...');

  // Fetch all active leads
  const { data: leads, error: fetchError } = await supabase
    .from('crm_leads')
    .select('*')
    .eq('status', 'active');

  if (fetchError) {
    console.error('Failed to fetch leads:', fetchError.message);
    process.exit(1);
  }

  if (!leads || leads.length === 0) {
    console.log('No active leads found. Exiting.');
    return;
  }

  console.log(`Scoring ${leads.length} active leads...`);

  const hotLeads = [];
  let updated = 0;
  let errors = 0;

  for (const lead of leads) {
    const enterpriseScore = calculateEnterpriseScore(lead);
    const engagementScore = calculateEngagementScore(lead);

    const { error: updateError } = await supabase
      .from('crm_leads')
      .update({
        enterprise_score: enterpriseScore,
        engagement_score: engagementScore,
        scored_at: new Date().toISOString(),
      })
      .eq('id', lead.id);

    if (updateError) {
      console.error(`Failed to update lead ${lead.id}:`, updateError.message);
      errors++;
      continue;
    }

    updated++;

    // Identify hot leads: enterprise_score > 70 AND engagement_score > 50
    if (enterpriseScore > 70 && engagementScore > 50) {
      hotLeads.push({
        id: lead.id,
        email: lead.email,
        company: lead.company_name || 'Unknown',
        enterpriseScore,
        engagementScore,
        combinedScore: enterpriseScore + engagementScore,
      });
      console.log(
        `HOT LEAD: ${lead.email} (${lead.company_name || 'Unknown'}) — enterprise: ${enterpriseScore}, engagement: ${engagementScore}`
      );
    }
  }

  // Sort hot leads by combined score descending
  hotLeads.sort((a, b) => b.combinedScore - a.combinedScore);

  console.log(`\nScoring complete:`);
  console.log(`  Total leads scored: ${updated}`);
  console.log(`  Hot leads found: ${hotLeads.length}`);
  console.log(`  Errors: ${errors}`);

  if (hotLeads.length > 0) {
    console.log(`\nTop hot leads:`);
    hotLeads.slice(0, 10).forEach((lead, i) => {
      console.log(
        `  ${i + 1}. ${lead.company} (${lead.email}) — enterprise: ${lead.enterpriseScore}, engagement: ${lead.engagementScore}`
      );
    });
  }

  // Send summary email
  await sendSummaryEmail(updated, hotLeads);
}

async function sendSummaryEmail(totalScored, hotLeads) {
  if (!RESEND_API_KEY) {
    console.log('No RESEND_API_KEY set — skipping summary email.');
    return;
  }

  const resend = new Resend(RESEND_API_KEY);
  const top10 = hotLeads.slice(0, 10);

  const top10Rows = top10.length > 0
    ? top10
        .map(
          (lead, i) =>
            `<tr>
              <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${i + 1}</td>
              <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${lead.company}</td>
              <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${lead.email}</td>
              <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${lead.enterpriseScore}</td>
              <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${lead.engagementScore}</td>
            </tr>`
        )
        .join('\n')
    : '<tr><td colspan="5" style="padding:12px;text-align:center;color:#6b7280">No hot leads this week</td></tr>';

  const html = `
    <div style="font-family:Inter,sans-serif;max-width:640px;margin:0 auto">
      <h1 style="color:#0F1F3D;font-size:22px">Weekly Lead Scoring Summary</h1>
      <p style="color:#374151">Scoring completed on ${new Date().toISOString().split('T')[0]}</p>

      <div style="display:flex;gap:24px;margin:20px 0">
        <div style="background:#f0f9ff;padding:16px 24px;border-radius:8px;text-align:center">
          <div style="font-size:28px;font-weight:700;color:#2563EB">${totalScored}</div>
          <div style="color:#6b7280;font-size:13px">Leads Scored</div>
        </div>
        <div style="background:#fef3c7;padding:16px 24px;border-radius:8px;text-align:center">
          <div style="font-size:28px;font-weight:700;color:#d97706">${hotLeads.length}</div>
          <div style="color:#6b7280;font-size:13px">Hot Leads</div>
        </div>
      </div>

      <h2 style="color:#0F1F3D;font-size:17px;margin-top:28px">Top 10 Leads by Score</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead>
          <tr style="background:#f9fafb">
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">#</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">Company</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">Email</th>
            <th style="padding:8px 12px;text-align:center;border-bottom:2px solid #e5e7eb">Enterprise</th>
            <th style="padding:8px 12px;text-align:center;border-bottom:2px solid #e5e7eb">Engagement</th>
          </tr>
        </thead>
        <tbody>
          ${top10Rows}
        </tbody>
      </table>

      <p style="color:#9ca3af;font-size:12px;margin-top:24px">
        Sent automatically by EuroSalary CRM — Weekly Lead Scoring
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'EuroSalary CRM <hello@eurosalary.eu>',
      to: 'hello@eurosalary.eu',
      subject: `Lead Scoring: ${totalScored} scored, ${hotLeads.length} hot leads`,
      html,
    });
    console.log('Summary email sent to hello@eurosalary.eu');
  } catch (err) {
    console.error('Failed to send summary email:', err.message);
  }
}

main().catch((err) => {
  console.error('Lead scoring failed:', err);
  process.exit(1);
});
