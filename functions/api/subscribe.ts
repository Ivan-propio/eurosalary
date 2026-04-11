// Cloudflare Pages Function — Newsletter Signup
// POST /api/subscribe { email, language }
// 1. Insert into Supabase newsletter_subscribers
// 2. Send welcome email via Resend

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
}

type Lang = 'en' | 'fr' | 'de' | 'es';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json() as { email?: string; language?: string };
    const email = body.email?.trim().toLowerCase();
    const language = (['en', 'fr', 'de', 'es'].includes(body.language || '') ? body.language : 'en') as Lang;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // 1. Insert into Supabase
    const supabase = createClient(context.env.PUBLIC_SUPABASE_URL, context.env.PUBLIC_SUPABASE_ANON_KEY);
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email, language });

    if (dbError) {
      if (dbError.code === '23505') {
        return new Response(JSON.stringify({ error: 'already_subscribed' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
      throw dbError;
    }

    // 2. Send welcome email via Resend
    const resend = new Resend(context.env.RESEND_API_KEY);
    const fromEmail = context.env.RESEND_FROM_EMAIL || 'hello@eurosalary.eu';

    await resend.emails.send({
      from: `EuroSalary.eu <${fromEmail}>`,
      to: email,
      subject: welcomeSubjects[language],
      html: welcomeEmailHtml(language),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err: any) {
    console.error('Subscribe error:', err);
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

// Inline email content to avoid import issues in CF Pages Functions
const welcomeSubjects: Record<Lang, string> = {
  en: 'Welcome to Salary Pulse Europe',
  fr: 'Bienvenue à Salary Pulse Europe',
  de: 'Willkommen bei Salary Pulse Europe',
  es: 'Bienvenido a Salary Pulse Europe',
};

function welcomeEmailHtml(lang: Lang): string {
  const content: Record<Lang, { heading: string; body: string; cta: string; ctaUrl: string; footer: string }> = {
    en: {
      heading: 'Welcome to Salary Pulse Europe!',
      body: `You're now subscribed to the most comprehensive European salary data newsletter. Every Tuesday, you'll receive:<br><br><strong>What to expect:</strong><br>• Salary trends across 15 EU countries<br>• Job market insights by sector<br>• Country spotlights with tax comparisons<br>• New data releases from Eurostat<br><br>In the meantime, explore our salary data:`,
      cta: 'Explore Salaries',
      ctaUrl: 'https://eurosalary.eu/en/',
      footer: 'You received this because you subscribed at EuroSalary.eu. Unsubscribe anytime.',
    },
    fr: {
      heading: 'Bienvenue à Salary Pulse Europe !',
      body: `Vous êtes maintenant abonné à la newsletter la plus complète sur les salaires européens. Chaque mardi :<br><br><strong>Ce qui vous attend :</strong><br>• Tendances salariales dans 15 pays de l'UE<br>• Analyses du marché par secteur<br>• Focus pays avec comparaisons fiscales<br>• Nouvelles données Eurostat<br><br>En attendant, explorez nos données :`,
      cta: 'Explorer les salaires',
      ctaUrl: 'https://eurosalary.eu/fr/',
      footer: 'Vous recevez cet email car vous vous êtes inscrit sur EuroSalary.eu.',
    },
    de: {
      heading: 'Willkommen bei Salary Pulse Europe!',
      body: `Sie sind jetzt für den umfassendsten europäischen Gehaltsdaten-Newsletter angemeldet. Jeden Dienstag erhalten Sie:<br><br><strong>Was Sie erwartet:</strong><br>• Gehaltstrends in 15 EU-Ländern<br>• Arbeitsmarktanalysen nach Branche<br>• Länderfokus mit Steuervergleichen<br>• Neue Eurostat-Datenveröffentlichungen<br><br>Erkunden Sie unsere Gehaltsdaten:`,
      cta: 'Gehälter erkunden',
      ctaUrl: 'https://eurosalary.eu/de/',
      footer: 'Sie erhalten diese E-Mail, weil Sie sich bei EuroSalary.eu angemeldet haben.',
    },
    es: {
      heading: '¡Bienvenido a Salary Pulse Europe!',
      body: `Ahora estás suscrito al newsletter más completo sobre salarios europeos. Cada martes recibirás:<br><br><strong>Qué esperar:</strong><br>• Tendencias salariales en 15 países de la UE<br>• Análisis del mercado laboral por sector<br>• Foco por país con comparaciones fiscales<br>• Nuevos datos de Eurostat<br><br>Mientras tanto, explora nuestros datos:`,
      cta: 'Explorar salarios',
      ctaUrl: 'https://eurosalary.eu/es/',
      footer: 'Recibes este email porque te suscribiste en EuroSalary.eu.',
    },
  };

  const c = content[lang];
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background:#F5F7FA;font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FA;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);"><tr><td style="background:#0A1F44;padding:28px 40px;"><span style="color:#fff;font-family:'Inter',sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Euro<span style="color:#0066CC;">Salary</span><span style="color:#FFCC00;">.eu</span></span></td></tr><tr><td style="padding:40px;"><h1 style="color:#0A1F44;font-family:'Inter',sans-serif;font-size:22px;font-weight:700;margin:0 0 20px;line-height:1.3;">${c.heading}</h1><p style="color:#4a5568;font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;margin:0 0 28px;">${c.body}</p><table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td style="background:#003399;border-radius:12px;padding:14px 32px;"><a href="${c.ctaUrl}" style="color:#fff;text-decoration:none;font-family:'Inter',sans-serif;font-weight:600;font-size:15px;">${c.cta}</a></td></tr></table></td></tr><tr><td style="padding:20px 40px;background:#F9FAFB;border-top:1px solid #E5E7EB;text-align:center;"><p style="color:#9CA3AF;font-family:'Inter',sans-serif;font-size:11px;margin:0 0 4px;">EuroSalary.eu &mdash; European Salary Intelligence</p><p style="color:#6B7280;font-family:'Inter',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.05em;margin:0 0 8px;">Precision. Integrity. Sovereignty.</p><p style="color:#9CA3AF;font-family:'Inter',sans-serif;font-size:11px;margin:0;">${c.footer}</p></td></tr></table></td></tr></table></body></html>`;
}
