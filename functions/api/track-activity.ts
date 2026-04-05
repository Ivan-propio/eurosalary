// Cloudflare Pages Function — CRM Activity Tracker
// POST /api/track-activity
// Tracks lead activities (page views, clicks, downloads, etc.)
// Updates engagement_score, pages_visited, last_active_at

import { createClient } from '@supabase/supabase-js';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

interface TrackActivityBody {
  email?: string;
  activity_type?: string;
  metadata?: Record<string, any>;
}

const ACTIVITY_SCORES: Record<string, number> = {
  page_view: 1,
  pricing_view: 5,
  api_docs_view: 5,
  report_download: 10,
  demo_request: 15,
  calculator_use: 3,
  comparison_view: 2,
  country_view: 1,
  blog_read: 2,
  newsletter_open: 2,
  email_click: 3,
  return_visit: 4,
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as TrackActivityBody;

    const email = body.email?.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return jsonResponse({ error: 'Valid email is required' }, 400);
    }

    const activityType = body.activity_type || 'page_view';
    const metadata = body.metadata || {};

    const supabase = createClient(context.env.SUPABASE_URL, context.env.SUPABASE_KEY);

    // 1. Look up lead by email, create minimal record if not found
    let { data: lead } = await supabase
      .from('crm_leads')
      .select('id, engagement_score, pages_visited')
      .eq('email', email)
      .maybeSingle();

    if (!lead) {
      const { data: newLead, error: insertErr } = await supabase
        .from('crm_leads')
        .insert({
          email,
          name: email.split('@')[0],
          lead_type: 'general',
          status: 'new',
          engagement_score: 0,
          pages_visited: 0,
        })
        .select('id, engagement_score, pages_visited')
        .single();

      if (insertErr) throw new Error(`Lead create failed: ${insertErr.message}`);
      lead = newLead;
    }

    // 2. Insert activity
    await supabase.from('crm_activities').insert({
      lead_id: lead.id,
      activity_type: activityType,
      subject: `${activityType}: ${metadata.page_url || metadata.subject || ''}`.trim(),
      metadata,
    });

    // 3. Update engagement score and counters
    const scoreIncrement = ACTIVITY_SCORES[activityType] || 1;
    const newScore = Math.min((lead.engagement_score || 0) + scoreIncrement, 100);
    const newPagesVisited = (lead.pages_visited || 0) + (activityType === 'page_view' ? 1 : 0);

    await supabase
      .from('crm_leads')
      .update({
        engagement_score: newScore,
        pages_visited: newPagesVisited,
        last_active_at: new Date().toISOString(),
      })
      .eq('id', lead.id);

    return jsonResponse({ ok: true });
  } catch (err: any) {
    console.error('Track activity error:', err);
    return jsonResponse({ error: 'Internal error' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
