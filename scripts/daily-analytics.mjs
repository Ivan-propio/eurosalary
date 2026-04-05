#!/usr/bin/env node
// Aggregate daily CRM metrics into crm_analytics_daily
// Runs daily at 23:00 UTC via GitHub Actions

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing required environment variables: SUPABASE_URL, SUPABASE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const dayStart = `${today}T00:00:00.000Z`;
  const dayEnd = `${today}T23:59:59.999Z`;

  console.log(`Aggregating CRM analytics for ${today}...`);

  // Helper: count rows matching a filter
  async function countWhere(table, filters = {}) {
    let query = supabase.from(table).select('id', { count: 'exact', head: true });
    for (const [col, val] of Object.entries(filters)) {
      if (val === null) continue;
      query = query.eq(col, val);
    }
    query = query.gte('created_at', dayStart).lte('created_at', dayEnd);
    const { count } = await query;
    return count || 0;
  }

  // Helper: count leads by type
  async function countLeadsByType(leadType) {
    const { count } = await supabase
      .from('crm_leads')
      .select('id', { count: 'exact', head: true })
      .eq('lead_type', leadType)
      .gte('created_at', dayStart)
      .lte('created_at', dayEnd);
    return count || 0;
  }

  // New leads (total)
  const newLeads = await countWhere('crm_leads');

  // Leads by type
  const newLeadsEnterprise = await countLeadsByType('enterprise');
  const newLeadsEmployer = await countLeadsByType('employer');
  const newLeadsRecruiter = await countLeadsByType('recruiter');
  const newLeadsApi = await countLeadsByType('api');
  const newLeadsGeneral = await countLeadsByType('general');

  // Demos scheduled (activity type)
  const demosScheduled = await countWhere('crm_activities', { activity_type: 'demo_request' });

  // Deals created / won / lost
  const dealsCreated = await countWhere('crm_deals');

  const { count: dealsWon } = await supabase
    .from('crm_deals')
    .select('id', { count: 'exact', head: true })
    .eq('stage', 'won')
    .gte('updated_at', dayStart)
    .lte('updated_at', dayEnd);

  const { count: dealsLost } = await supabase
    .from('crm_deals')
    .select('id', { count: 'exact', head: true })
    .eq('stage', 'lost')
    .gte('updated_at', dayStart)
    .lte('updated_at', dayEnd);

  // Revenue from won deals today
  const { data: wonDeals } = await supabase
    .from('crm_deals')
    .select('amount_eur')
    .eq('stage', 'won')
    .gte('updated_at', dayStart)
    .lte('updated_at', dayEnd);
  const revenue = (wonDeals || []).reduce((sum, d) => sum + (d.amount_eur || 0), 0);

  // API signups
  const apiSignups = await countWhere('crm_api_keys');

  // Report downloads
  const reportDownloads = await countWhere('crm_activities', { activity_type: 'report_download' });

  // Partner referrals
  const partnerReferrals = await countWhere('crm_partner_referrals');

  // Emails sent
  const emailsSent = await countWhere('crm_activities', { activity_type: 'email_sent' });

  // Emails opened
  const emailsOpened = await countWhere('crm_activities', { activity_type: 'email_opened' });

  // Emails clicked
  const emailsClicked = await countWhere('crm_activities', { activity_type: 'email_click' });

  // Unique countries from today's leads
  const { data: countryData } = await supabase
    .from('crm_leads')
    .select('interested_countries')
    .gte('created_at', dayStart)
    .lte('created_at', dayEnd);
  const countriesSet = new Set();
  (countryData || []).forEach((l) => {
    (l.interested_countries || []).forEach((c) => countriesSet.add(c));
  });

  const metrics = {
    date: today,
    new_leads: newLeads,
    new_leads_enterprise: newLeadsEnterprise,
    new_leads_employer: newLeadsEmployer,
    new_leads_recruiter: newLeadsRecruiter,
    new_leads_api: newLeadsApi,
    new_leads_general: newLeadsGeneral,
    demos_scheduled: demosScheduled,
    deals_created: dealsCreated,
    deals_won: dealsWon || 0,
    deals_lost: dealsLost || 0,
    revenue_eur: revenue,
    api_signups: apiSignups,
    report_downloads: reportDownloads,
    partner_referrals: partnerReferrals,
    emails_sent: emailsSent,
    emails_opened: emailsOpened,
    emails_clicked: emailsClicked,
    unique_countries: countriesSet.size,
  };

  console.log('Metrics:', JSON.stringify(metrics, null, 2));

  // Upsert into crm_analytics_daily
  const { error } = await supabase
    .from('crm_analytics_daily')
    .upsert(metrics, { onConflict: 'date' });

  if (error) {
    console.error('Failed to upsert analytics:', error.message);
    process.exit(1);
  }

  console.log(`Analytics for ${today} saved successfully.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
