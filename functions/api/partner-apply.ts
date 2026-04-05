// Cloudflare Pages Function — Partner Application
// POST /api/partner-apply
// Creates partner record, generates referral code, creates lead, sends notifications

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  RESEND_API_KEY: string;
}

interface PartnerApplyBody {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  partner_type?: string;
  audience_size?: number;
  message?: string;
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I/O/0/1 to avoid confusion
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as PartnerApplyBody;

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    if (!email || !email.includes('@') || !name) {
      return jsonResponse({ error: 'Name and valid email are required' }, 400);
    }

    const company = body.company?.trim() || '';
    const website = body.website?.trim() || '';
    const partnerType = ['affiliate', 'reseller', 'integration', 'content', 'referral'].includes(body.partner_type || '')
      ? body.partner_type!
      : 'referral';
    const audienceSize = body.audience_size || null;
    const message = body.message?.trim() || '';

    const supabase = createClient(context.env.SUPABASE_URL, context.env.SUPABASE_KEY);

    // 1. Generate unique referral code (retry if collision)
    let referralCode = generateReferralCode();
    let retries = 0;
    while (retries < 5) {
      const { data: existing } = await supabase
        .from('crm_partners')
        .select('id')
        .eq('referral_code', referralCode)
        .maybeSingle();
      if (!existing) break;
      referralCode = generateReferralCode();
      retries++;
    }

    // 2. Insert partner
    const { data: partnerData, error: partnerErr } = await supabase
      .from('crm_partners')
      .insert({
        name,
        email,
        company,
        website,
        partner_type: partnerType,
        audience_size: audienceSize,
        status: 'applied',
        referral_code: referralCode,
        commission_rate: 0.15, // Default 15%
      })
      .select('id')
      .single();

    if (partnerErr) throw new Error(`Partner insert failed: ${partnerErr.message}`);

    // 3. Also create/upsert as a lead (for nurturing)
    await supabase
      .from('crm_leads')
      .upsert(
        {
          email,
          name,
          company,
          lead_type: 'partner',
          status: 'new',
          interest_tags: ['partnership', partnerType],
          last_active_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

    // 4. Log activity
    const { data: leadData } = await supabase
      .from('crm_leads')
      .select('id')
      .eq('email', email)
      .single();

    if (leadData?.id) {
      await supabase.from('crm_activities').insert({
        lead_id: leadData.id,
        activity_type: 'partner_application',
        subject: `Partner application: ${partnerType}`,
        metadata: { partner_id: partnerData.id, website, audience_size: audienceSize, message },
      });
    }

    // 5. Send notification to team
    const resend = new Resend(context.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'EuroSalary CRM <hello@eurosalary.eu>',
      to: 'hello@eurosalary.eu',
      subject: `[PARTNER] New application: ${company || name} (${partnerType})`,
      html: `<div style="font-family:sans-serif;color:#333;max-width:600px;">
<h2 style="color:#0F1F3D;">New Partner Application</h2>
<table style="border-collapse:collapse;width:100%;">
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Name</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${name}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Email</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${email}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Company</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${company || 'N/A'}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Website</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${website || 'N/A'}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Type</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${partnerType}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Audience Size</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${audienceSize || 'N/A'}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;border-bottom:1px solid #eee;">Referral Code</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-family:monospace;font-weight:700;">${referralCode}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;">Message</td><td style="padding:6px 12px;">${message || 'N/A'}</td></tr>
</table></div>`,
    });

    // 6. Send confirmation to applicant
    await resend.emails.send({
      from: 'EuroSalary.eu <hello@eurosalary.eu>',
      to: email,
      subject: 'Your EuroSalary Partner Application',
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
<tr><td style="background:linear-gradient(135deg,#0F1F3D,#1a3a6b);padding:32px 40px;text-align:center;">
<span style="color:#fff;font-size:24px;font-weight:700;">Euro<span style="color:#2563EB;">Salary</span></span></td></tr>
<tr><td style="padding:40px;">
<h1 style="color:#0F1F3D;font-size:22px;margin:0 0 16px;">Partner Application Received</h1>
<p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 8px;">Hi ${name},</p>
<p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 20px;">Thank you for applying to the EuroSalary Partner Program. We've received your application and will review it within 2 business days.</p>
<div style="background:#f0f4ff;border:1px solid #dbeafe;border-radius:8px;padding:20px;margin:0 0 24px;">
<p style="color:#0F1F3D;font-size:14px;font-weight:600;margin:0 0 8px;">Your referral code:</p>
<p style="color:#2563EB;font-size:28px;font-weight:700;font-family:monospace;margin:0;letter-spacing:2px;">${referralCode}</p>
<p style="color:#64748b;font-size:13px;margin:8px 0 0;">This code will be activated once your application is approved.</p>
</div>
<p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 20px;">Once approved, you'll earn commissions on every customer you refer to our premium salary reports and API plans.</p>
<table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>
<td style="background:#2563EB;border-radius:6px;padding:14px 32px;">
<a href="https://eurosalary.eu/en/partners/" style="color:#fff;text-decoration:none;font-weight:600;font-size:15px;">Learn More About the Program</a>
</td></tr></table>
</td></tr>
<tr><td style="padding:24px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
<p style="color:#94a3b8;font-size:12px;margin:0;text-align:center;">EuroSalary.eu &mdash; European Salary Intelligence</p>
</td></tr></table></td></tr></table></body></html>`,
    });

    return jsonResponse({ ok: true, referral_code: referralCode });
  } catch (err: any) {
    console.error('Partner apply error:', err);
    return jsonResponse({ error: 'Internal error' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
