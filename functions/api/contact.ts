// Cloudflare Pages Function — Contact Form / Lead Capture
// POST /api/contact { name, email, company, type, message }
// 1. Insert into Supabase leads table
// 2. Send notification email via Resend
// 3. Send auto-reply to user

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
}

type LeadType = 'enterprise' | 'partner' | 'employer' | 'recruiter' | 'api' | 'general';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json() as {
      name?: string;
      email?: string;
      company?: string;
      type?: string;
      message?: string;
      language?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const company = body.company?.trim() || '';
    const leadType = (['enterprise', 'partner', 'employer', 'recruiter', 'api', 'general'].includes(body.type || '')
      ? body.type
      : 'general') as LeadType;
    const message = body.message?.trim() || '';
    const language = body.language || 'en';

    if (!email || !email.includes('@') || !name) {
      return new Response(JSON.stringify({ error: 'Name and valid email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // 1. Insert into Supabase
    const supabase = createClient(context.env.PUBLIC_SUPABASE_URL, context.env.PUBLIC_SUPABASE_ANON_KEY);
    await supabase.from('leads').insert({
      name,
      email,
      company,
      lead_type: leadType,
      message,
      language,
      source: context.request.headers.get('referer') || 'direct',
      created_at: new Date().toISOString(),
    });

    // 2. Notify team
    const resend = new Resend(context.env.RESEND_API_KEY);
    const fromEmail = context.env.RESEND_FROM_EMAIL || 'hello@eurosalary.eu';

    await resend.emails.send({
      from: `EuroSalary Leads <${fromEmail}>`,
      to: 'hello@eurosalary.eu',
      subject: `[${leadType.toUpperCase()}] New lead: ${company || name}`,
      html: `<h2>New ${leadType} Lead</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'N/A'}</p>
<p><strong>Type:</strong> ${leadType}</p>
<p><strong>Message:</strong> ${message || 'N/A'}</p>
<p><strong>Language:</strong> ${language}</p>
<p><strong>Source:</strong> ${context.request.headers.get('referer') || 'direct'}</p>`,
    });

    // 3. Auto-reply to user
    const autoReplySubjects: Record<string, string> = {
      en: 'Thanks for contacting EuroSalary',
      fr: 'Merci d\'avoir contacté EuroSalary',
      de: 'Danke für Ihre Kontaktaufnahme bei EuroSalary',
      es: 'Gracias por contactar con EuroSalary',
    };

    await resend.emails.send({
      from: `EuroSalary.eu <${fromEmail}>`,
      to: email,
      subject: autoReplySubjects[language] || autoReplySubjects.en,
      html: `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
<h2 style="color:#0F1F3D;">Thank you, ${name}!</h2>
<p>We've received your inquiry and will get back to you within 24 hours.</p>
<p>In the meantime, feel free to explore our <a href="https://eurosalary.eu/${language}/" style="color:#2563EB;">salary data</a>.</p>
<p style="color:#666;font-size:13px;margin-top:30px;">— The EuroSalary Team<br>Luxembourg</p>
</body></html>`,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
