// Cloudflare Pages Function — CRM Lead Capture
// POST /api/lead-capture
// Enhanced replacement for contact.ts — upserts into crm_leads, auto-creates account,
// logs activity, calculates enterprise_score, enrolls in email sequence, sends notifications.

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  RESEND_API_KEY: string;
}

type LeadType = 'enterprise' | 'partner' | 'employer' | 'recruiter' | 'api' | 'general';
type Lang = 'en' | 'fr' | 'de' | 'es';

interface LeadCaptureBody {
  name?: string;
  email?: string;
  company?: string;
  lead_type?: string;
  message?: string;
  language?: string;
  source_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  interested_countries?: string[];
  interest_tags?: string[];
}

const VALID_LEAD_TYPES: LeadType[] = ['enterprise', 'partner', 'employer', 'recruiter', 'api', 'general'];

function extractDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}

function calculateEnterpriseScore(body: LeadCaptureBody, leadType: LeadType): number {
  let score = 0;
  if (body.company && body.company.trim().length > 0) score += 20;
  if (leadType === 'enterprise') score += 30;
  if (body.interested_countries && body.interested_countries.length > 1) {
    score += (body.interested_countries.length - 1) * 10;
  }
  if (body.interest_tags?.includes('api') || leadType === 'api') score += 15;
  return Math.min(score, 100);
}

function getSequenceForLeadType(leadType: LeadType): string | null {
  const map: Record<string, string> = {
    enterprise: 'employer_benchmark_demo',
    employer: 'employer_benchmark_demo',
    recruiter: 'recruiter_nurture',
    api: 'api_waitlist_followup',
    partner: 'recruiter_nurture',
    general: 'report_download_followup',
  };
  return map[leadType] || null;
}

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

const autoReplyContent: Record<Lang, { subject: string; heading: string; body: string; cta: string }> = {
  en: {
    subject: 'Thanks for contacting EuroSalary',
    heading: 'Thank you for reaching out!',
    body: "We've received your inquiry and our team will get back to you within 24 hours. In the meantime, explore the latest salary benchmarks across Europe.",
    cta: 'Explore Salary Data',
  },
  fr: {
    subject: "Merci d'avoir contacte EuroSalary",
    heading: 'Merci pour votre message !',
    body: "Nous avons bien recu votre demande et notre equipe vous repondra sous 24 heures. En attendant, decouvrez les derniers benchmarks salariaux en Europe.",
    cta: 'Explorer les salaires',
  },
  de: {
    subject: 'Danke fur Ihre Kontaktaufnahme bei EuroSalary',
    heading: 'Vielen Dank fur Ihre Nachricht!',
    body: 'Wir haben Ihre Anfrage erhalten und unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden. Entdecken Sie in der Zwischenzeit aktuelle Gehaltsbenchmarks in Europa.',
    cta: 'Gehaltsdaten erkunden',
  },
  es: {
    subject: 'Gracias por contactar con EuroSalary',
    heading: 'Gracias por contactarnos!',
    body: 'Hemos recibido su consulta y nuestro equipo le respondera en un plazo de 24 horas. Mientras tanto, explore los ultimos datos salariales de Europa.',
    cta: 'Explorar salarios',
  },
};

function buildAutoReplyHtml(name: string, lang: Lang): string {
  const c = autoReplyContent[lang] || autoReplyContent.en;
  const langPath = lang === 'en' ? 'en' : lang;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
<tr><td style="background:linear-gradient(135deg,#0F1F3D,#1a3a6b);padding:32px 40px;text-align:center;">
<span style="color:#fff;font-size:24px;font-weight:700;">Euro<span style="color:#2563EB;">Salary</span></span></td></tr>
<tr><td style="padding:40px;">
<h1 style="color:#0F1F3D;font-size:22px;margin:0 0 16px;">${c.heading}</h1>
<p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 8px;">Hi ${name},</p>
<p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 28px;">${c.body}</p>
<table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>
<td style="background:#2563EB;border-radius:6px;padding:14px 32px;">
<a href="https://eurosalary.eu/${langPath}/" style="color:#fff;text-decoration:none;font-weight:600;font-size:15px;">${c.cta}</a>
</td></tr></table>
</td></tr>
<tr><td style="padding:24px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
<p style="color:#94a3b8;font-size:12px;margin:0;text-align:center;">EuroSalary.eu &mdash; European Salary Intelligence</p>
</td></tr></table></td></tr></table></body></html>`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as LeadCaptureBody;

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    if (!email || !email.includes('@') || !name) {
      return jsonResponse({ error: 'Name and valid email are required' }, 400);
    }

    const company = body.company?.trim() || '';
    const leadType = (VALID_LEAD_TYPES.includes(body.lead_type as LeadType)
      ? body.lead_type
      : 'general') as LeadType;
    const message = body.message?.trim() || '';
    const language = (['en', 'fr', 'de', 'es'].includes(body.language || '') ? body.language : 'en') as Lang;
    const sourceUrl = body.source_url || context.request.headers.get('referer') || 'direct';
    const utmSource = body.utm_source || null;
    const utmMedium = body.utm_medium || null;
    const utmCampaign = body.utm_campaign || null;
    const interestedCountries = body.interested_countries || [];
    const interestTags = body.interest_tags || [];

    const supabase = createClient(context.env.SUPABASE_URL, context.env.SUPABASE_KEY);

    // 1. Calculate enterprise score
    const enterpriseScore = calculateEnterpriseScore(body, leadType);

    // 2. Upsert lead
    const { data: leadData, error: leadError } = await supabase
      .from('crm_leads')
      .upsert(
        {
          email,
          name,
          company,
          lead_type: leadType,
          status: 'new',
          source_url: sourceUrl,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          interested_countries: interestedCountries,
          interest_tags: interestTags,
          enterprise_score: enterpriseScore,
          language,
          last_active_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )
      .select('id')
      .single();

    if (leadError) throw new Error(`Lead upsert failed: ${leadError.message}`);
    const leadId = leadData.id;

    // 3. Auto-create / upsert account from email domain
    const domain = extractDomain(email);
    if (domain && !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com', 'mail.com'].includes(domain)) {
      await supabase
        .from('crm_accounts')
        .upsert(
          {
            domain,
            name: company || domain.split('.')[0],
            enterprise_score: enterpriseScore,
          },
          { onConflict: 'domain' }
        )
        .select('id')
        .single()
        .then(({ data: acctData }) => {
          if (acctData?.id) {
            // Link lead to account
            supabase.from('crm_leads').update({ account_id: acctData.id }).eq('id', leadId).then(() => {});
          }
        });
    }

    // 4. Log activity
    await supabase.from('crm_activities').insert({
      lead_id: leadId,
      activity_type: 'form_submission',
      subject: `${leadType} inquiry via ${sourceUrl}`,
      metadata: { message, utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign },
    });

    // 5. Enroll in email sequence
    const sequenceName = getSequenceForLeadType(leadType);
    if (sequenceName) {
      const { data: seqData } = await supabase
        .from('crm_email_sequences')
        .select('id')
        .eq('name', sequenceName)
        .eq('is_active', true)
        .single();

      if (seqData?.id) {
        // Check not already enrolled
        const { data: existing } = await supabase
          .from('crm_sequence_enrollments')
          .select('id')
          .eq('lead_id', leadId)
          .eq('sequence_id', seqData.id)
          .in('status', ['active', 'completed'])
          .maybeSingle();

        if (!existing) {
          await supabase.from('crm_sequence_enrollments').insert({
            lead_id: leadId,
            sequence_id: seqData.id,
            current_step: 0,
            status: 'active',
            next_send_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
          });
        }
      }
    }

    // 6. Send notification email to team
    const resend = new Resend(context.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'EuroSalary CRM <hello@eurosalary.eu>',
      to: 'hello@eurosalary.eu',
      subject: `[${leadType.toUpperCase()}] New lead: ${company || name} (score: ${enterpriseScore})`,
      html: `<div style="font-family:sans-serif;color:#333;max-width:600px;">
<h2 style="color:#0F1F3D;">New ${leadType} Lead</h2>
<table style="border-collapse:collapse;width:100%;">
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Name</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${name}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Email</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${email}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Company</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${company || 'N/A'}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Type</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${leadType}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Enterprise Score</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${enterpriseScore}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Countries</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${interestedCountries.join(', ') || 'N/A'}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Tags</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${interestTags.join(', ') || 'N/A'}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Language</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${language}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Source</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${sourceUrl}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;">Message</td><td style="padding:6px 12px;">${message || 'N/A'}</td></tr>
</table></div>`,
    });

    // 7. Send auto-reply to lead
    const replyContent = autoReplyContent[language] || autoReplyContent.en;
    await resend.emails.send({
      from: 'EuroSalary.eu <hello@eurosalary.eu>',
      to: email,
      subject: replyContent.subject,
      html: buildAutoReplyHtml(name, language),
    });

    return jsonResponse({ ok: true, lead_id: leadId });
  } catch (err: any) {
    console.error('Lead capture error:', err);
    return jsonResponse({ error: 'Internal error' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
