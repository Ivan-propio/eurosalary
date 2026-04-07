// Shared branded email templates for EuroSalary
// All emails use the same design: dark navy header, white body, blue CTA, light footer

const BRAND = {
  navy: '#0F1F3D',
  blue: '#2563EB',
  lightBlue: '#60a5fa',
  gray: '#64748b',
  lightGray: '#94a3b8',
  bg: '#f1f5f9',
  border: '#e2e8f0',
  footerBg: '#f8fafc',
};

function header(): string {
  return `
<div style="background:${BRAND.navy};padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td><span style="color:white;font-family:'Public Sans',Helvetica,Arial,sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.02em;">Euro<span style="color:${BRAND.lightBlue};">Salary</span></span></td>
          <td style="text-align:right;"><a href="https://eurosalary.eu" style="color:#93c5fd;font-size:12px;text-decoration:none;">eurosalary.eu</a></td>
        </tr></table>
      </td>
    </tr>
  </table>
</div>`;
}

function footer(): string {
  return `
<div style="background:${BRAND.footerBg};border-top:1px solid ${BRAND.border};">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td style="padding:24px 32px;text-align:center;">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;"><tr>
        <td style="padding:0 8px;"><a href="https://twitter.com/eurosalary" style="color:${BRAND.gray};text-decoration:none;font-size:13px;">Twitter</a></td>
        <td style="color:#cbd5e1;">|</td>
        <td style="padding:0 8px;"><a href="https://linkedin.com/company/eurosalary" style="color:${BRAND.gray};text-decoration:none;font-size:13px;">LinkedIn</a></td>
        <td style="color:#cbd5e1;">|</td>
        <td style="padding:0 8px;"><a href="https://eurosalary.eu/en/blog/" style="color:${BRAND.gray};text-decoration:none;font-size:13px;">Blog</a></td>
        <td style="color:#cbd5e1;">|</td>
        <td style="padding:0 8px;"><a href="https://eurosalary.eu/en/salary-api/" style="color:${BRAND.gray};text-decoration:none;font-size:13px;">API</a></td>
      </tr></table>
      <p style="margin:0 0 8px;font-size:12px;color:${BRAND.lightGray};">EuroSalary.eu &mdash; European Salary Intelligence</p>
      <p style="margin:0 0 4px;font-size:11px;color:#cbd5e1;">Precision. Integrity. Sovereignty.</p>
      <p style="margin:0;font-size:11px;color:#cbd5e1;">Luxembourg | hello@eurosalary.eu</p>
    </td></tr>
  </table>
</div>`;
}

function heroSection(badge: string, title: string, subtitle: string): string {
  return `
<div style="background:${BRAND.navy};">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td style="padding:0 32px 32px;text-align:center;">
      <div style="background:rgba(37,99,235,0.15);border:1px solid rgba(96,165,250,0.3);border-radius:20px;display:inline-block;padding:4px 14px;margin-bottom:16px;">
        <span style="color:#93c5fd;font-size:11px;font-weight:700;letter-spacing:0.08em;">${badge}</span>
      </div>
      <h1 style="color:white;font-size:28px;font-weight:800;margin:0 0 8px;letter-spacing:-0.02em;">${title}</h1>
      <p style="color:rgba(203,213,225,0.8);font-size:15px;margin:0;">${subtitle}</p>
    </td></tr>
  </table>
</div>`;
}

function ctaButton(text: string, url: string): string {
  return `
<div style="text-align:center;margin:0 0 24px;">
  <a href="${url}" style="display:inline-block;background:${BRAND.blue};color:white;padding:14px 36px;border-radius:6px;text-decoration:none;font-weight:700;font-size:15px;">${text}</a>
</div>`;
}

function wrap(content: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:'Public Sans',Helvetica,Arial,sans-serif;">
${header()}
${content}
${footer()}
</body></html>`;
}

// ============================================
// 1. Welcome email (after signup)
// ============================================

export function buildWelcomeEmail(lang: string): { subject: string; html: string } {
  const subjects: Record<string, string> = {
    en: 'Welcome to EuroSalary — Your account is ready',
    fr: 'Bienvenue sur EuroSalary — Votre compte est pret',
    de: 'Willkommen bei EuroSalary — Ihr Konto ist bereit',
    es: 'Bienvenido a EuroSalary — Tu cuenta esta lista',
    it: 'Benvenuto su EuroSalary — Il tuo account e pronto',
    pt: 'Bem-vindo ao EuroSalary — A sua conta esta pronta',
    nl: 'Welkom bij EuroSalary — Uw account is klaar',
    pl: 'Witamy w EuroSalary — Twoje konto jest gotowe',
    ro: 'Bun venit la EuroSalary — Contul tau este gata',
    cs: 'Vitejte v EuroSalary — Vas ucet je pripraven',
    sv: 'Valkommen till EuroSalary — Ditt konto ar klart',
    da: 'Velkommen til EuroSalary — Din konto er klar',
    fi: 'Tervetuloa EuroSalaryyn — Tilisi on valmis',
    el: 'Kalosirthate sto EuroSalary',
    hu: 'Udvozoljuk az EuroSalarynal — Fiokja keszen all',
    sk: 'Vitajte v EuroSalary — Vas ucet je pripraveny',
    bg: 'Dobre doshli v EuroSalary',
    hr: 'Dobrodosli u EuroSalary — Vas racun je spreman',
    sl: 'Dobrodosli v EuroSalary — Vas racun je pripravljen',
    lt: 'Sveiki atvyke i EuroSalary — Jusu paskyra paruosta',
    lv: 'Laipni ludzam EuroSalary — Jusu konts ir gatavs',
    et: 'Tere tulemast EuroSalary — Teie konto on valmis',
    mt: 'Merhba f\'EuroSalary — Il-kont tieghek lest',
    ga: 'Failte go EuroSalary — Ta do chuntas reidh',
  };

  const l = lang || 'en';
  const dashUrl = `https://eurosalary.eu/${l}/dashboard/`;
  const pricingUrl = `https://eurosalary.eu/${l}/pricing/`;

  const content = `
${heroSection('ACCOUNT CREATED', subjects[l] || subjects.en, '')}
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:white;">
  <tr><td style="padding:32px;">
    <p style="color:#1e293b;font-size:15px;line-height:1.6;margin:0 0 20px;">Your EuroSalary account is now active. Here is what you can do:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="padding:12px 16px;background:#f8fafc;border-radius:6px 6px 0 0;border-bottom:1px solid ${BRAND.border};">
        <strong style="color:${BRAND.navy};">&#128202; Salary Data</strong><br><span style="color:${BRAND.gray};font-size:13px;">Compare salaries across 27 European countries</span>
      </td></tr>
      <tr><td style="padding:12px 16px;background:#f8fafc;border-bottom:1px solid ${BRAND.border};">
        <strong style="color:${BRAND.navy};">&#128200; Salary Calculator</strong><br><span style="color:${BRAND.gray};font-size:13px;">Estimate net salary with tax breakdowns</span>
      </td></tr>
      <tr><td style="padding:12px 16px;background:#f8fafc;border-radius:0 0 6px 6px;">
        <strong style="color:${BRAND.navy};">&#9889; Upgrade to Pro</strong><br><span style="color:${BRAND.gray};font-size:13px;">Unlock full API access, CSV export, and city-level data</span>
      </td></tr>
    </table>
    ${ctaButton('Go to Your Dashboard &rarr;', dashUrl)}
    <p style="color:${BRAND.gray};font-size:13px;text-align:center;margin:0;">Want more features? <a href="${pricingUrl}" style="color:${BRAND.blue};">View Pro plans</a></p>
  </td></tr>
</table>`;

  return { subject: subjects[l] || subjects.en, html: wrap(content) };
}

// ============================================
// 2. Subscription activated (webhook — new subscriber)
// ============================================

export function buildSubscriptionEmail(lang: string, hasAuthAccount: boolean): { subject: string; html: string } {
  const l = lang || 'en';
  const dashUrl = `https://eurosalary.eu/${l}/dashboard/`;
  const signupUrl = `https://eurosalary.eu/${l}/signup/`;
  const manageUrl = `https://eurosalary.eu/${l}/pricing/?manage=true`;

  const subject = 'Welcome to EuroSalary Pro — Your subscription is active';

  const ctaText = hasAuthAccount ? 'Go to Your Dashboard &rarr;' : 'Create Your Account &rarr;';
  const ctaUrl = hasAuthAccount ? dashUrl : signupUrl;
  const ctaNote = hasAuthAccount
    ? `Your API key has been auto-generated. View it in your <a href="${dashUrl}" style="color:${BRAND.blue};">dashboard</a>.`
    : `Create your account with the same email to access all your Pro features.`;

  const content = `
${heroSection('SUBSCRIPTION ACTIVE', 'Welcome to EuroSalary Pro', 'Your premium access is ready. Start exploring now.')}
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:white;">
  <tr><td style="padding:32px;">
    <p style="color:#1e293b;font-size:15px;line-height:1.6;margin:0 0 20px;">Here is what is unlocked with your Pro subscription:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="padding:14px 16px;background:#f8fafc;border-radius:6px 6px 0 0;border-bottom:1px solid ${BRAND.border};">
        <strong style="color:${BRAND.navy};">&#128202; City-level salary data</strong><br><span style="color:${BRAND.gray};font-size:13px;">Detailed breakdowns for 24 cities across Europe</span>
      </td></tr>
      <tr><td style="padding:14px 16px;background:#f8fafc;border-bottom:1px solid ${BRAND.border};">
        <strong style="color:${BRAND.navy};">&#128176; Net salary calculator</strong><br><span style="color:${BRAND.gray};font-size:13px;">Taxes, social contributions, take-home pay by country</span>
      </td></tr>
      <tr><td style="padding:14px 16px;background:#f8fafc;border-bottom:1px solid ${BRAND.border};">
        <strong style="color:${BRAND.navy};">&#128268; API access &mdash; 10K req/day</strong><br><span style="color:${BRAND.gray};font-size:13px;"><a href="https://eurosalary.eu/en/salary-api/" style="color:${BRAND.blue};">View API documentation &rarr;</a></span>
      </td></tr>
      <tr><td style="padding:14px 16px;background:#f8fafc;border-bottom:1px solid ${BRAND.border};">
        <strong style="color:${BRAND.navy};">&#128229; CSV & data export</strong><br><span style="color:${BRAND.gray};font-size:13px;">Download salary data for your own analysis</span>
      </td></tr>
      <tr><td style="padding:14px 16px;background:#f8fafc;border-radius:0 0 6px 6px;">
        <strong style="color:${BRAND.navy};">&#9889; Priority email support</strong><br><span style="color:${BRAND.gray};font-size:13px;">Reach us at hello@eurosalary.eu</span>
      </td></tr>
    </table>
    ${ctaButton(ctaText, ctaUrl)}
    <p style="color:${BRAND.gray};font-size:13px;text-align:center;margin:0 0 16px;">${ctaNote}</p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:14px 18px;margin:0 0 20px;">
      <p style="margin:0;font-size:13px;color:#15803d;"><strong>Manage your subscription</strong> &mdash; <a href="${manageUrl}" style="color:${BRAND.blue};">Update payment, change plan, or cancel</a> anytime. No questions asked.</p>
    </div>
  </td></tr>
</table>`;

  return { subject, html: wrap(content) };
}

// ============================================
// 3. Payment confirmed (one-time purchase)
// ============================================

export function buildPaymentEmail(lang: string): { subject: string; html: string } {
  const l = lang || 'en';
  const dashUrl = `https://eurosalary.eu/${l}/dashboard/`;

  const content = `
${heroSection('PAYMENT CONFIRMED', 'Payment Confirmed', 'Thank you for your purchase.')}
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:white;">
  <tr><td style="padding:32px;">
    <p style="color:#1e293b;font-size:15px;line-height:1.6;margin:0 0 20px;">Your report is being generated and will be available shortly in your dashboard.</p>
    ${ctaButton('Go to Dashboard &rarr;', dashUrl)}
    <p style="font-size:13px;color:${BRAND.gray};text-align:center;">Questions? Contact <a href="mailto:hello@eurosalary.eu" style="color:${BRAND.blue};">hello@eurosalary.eu</a></p>
  </td></tr>
</table>`;

  return { subject: 'EuroSalary — Payment confirmed', html: wrap(content) };
}

// ============================================
// 4. Password reset email
// ============================================

export function buildPasswordResetEmail(lang: string, resetUrl: string): { subject: string; html: string } {
  const l = lang || 'en';

  const content = `
${heroSection('PASSWORD RESET', 'Reset Your Password', 'Click the button below to set a new password.')}
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:white;">
  <tr><td style="padding:32px;">
    <p style="color:#1e293b;font-size:15px;line-height:1.6;margin:0 0 20px;">We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
    ${ctaButton('Reset Password &rarr;', resetUrl)}
    <p style="font-size:13px;color:${BRAND.gray};text-align:center;">This link expires in 1 hour. After that, you will need to request a new one.</p>
  </td></tr>
</table>`;

  return { subject: 'EuroSalary — Reset your password', html: wrap(content) };
}

// ============================================
// Helper: Send email via Resend
// ============================================

export async function sendEmail(
  resendApiKey: string,
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'EuroSalary <hello@eurosalary.eu>',
        to,
        subject,
        html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
