// ============================================
// EuroSalary.eu — Resend Email Client
// Handles newsletter welcome, confirmations,
// and transactional emails in 4 languages
// ============================================

import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const FROM_EMAIL = import.meta.env.RESEND_FROM_EMAIL || 'hello@eurosalary.eu';
const FROM_NAME = 'EuroSalary.eu';

type Lang = 'en' | 'fr' | 'de' | 'es';

// ============================================
// Welcome Email (newsletter signup)
// ============================================

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
      body: `You're now subscribed to the most comprehensive European salary data newsletter. Every Tuesday, you'll receive:<br><br>
        <strong>What to expect:</strong><br>
        • Salary trends across 15 EU countries<br>
        • Job market insights by sector<br>
        • Country spotlights with tax comparisons<br>
        • New data releases from Eurostat<br><br>
        In the meantime, explore our salary data:`,
      cta: 'Explore Salaries',
      ctaUrl: 'https://eurosalary.eu/en/',
      footer: 'You received this because you subscribed at EuroSalary.eu. Unsubscribe anytime.',
    },
    fr: {
      heading: 'Bienvenue à Salary Pulse Europe !',
      body: `Vous êtes maintenant abonné à la newsletter la plus complète sur les salaires européens. Chaque mardi, vous recevrez :<br><br>
        <strong>Ce qui vous attend :</strong><br>
        • Tendances salariales dans 15 pays de l'UE<br>
        • Analyses du marché de l'emploi par secteur<br>
        • Focus pays avec comparaisons fiscales<br>
        • Nouvelles données Eurostat<br><br>
        En attendant, explorez nos données salariales :`,
      cta: 'Explorer les salaires',
      ctaUrl: 'https://eurosalary.eu/fr/',
      footer: 'Vous recevez cet email car vous vous êtes inscrit sur EuroSalary.eu. Désabonnement à tout moment.',
    },
    de: {
      heading: 'Willkommen bei Salary Pulse Europe!',
      body: `Sie sind jetzt für den umfassendsten europäischen Gehaltsdaten-Newsletter angemeldet. Jeden Dienstag erhalten Sie:<br><br>
        <strong>Was Sie erwartet:</strong><br>
        • Gehaltstrends in 15 EU-Ländern<br>
        • Arbeitsmarktanalysen nach Branche<br>
        • Länderfokus mit Steuervergleichen<br>
        • Neue Eurostat-Datenveröffentlichungen<br><br>
        Erkunden Sie in der Zwischenzeit unsere Gehaltsdaten:`,
      cta: 'Gehälter erkunden',
      ctaUrl: 'https://eurosalary.eu/de/',
      footer: 'Sie erhalten diese E-Mail, weil Sie sich bei EuroSalary.eu angemeldet haben. Jederzeit abbestellbar.',
    },
    es: {
      heading: '¡Bienvenido a Salary Pulse Europe!',
      body: `Ahora estás suscrito al newsletter más completo sobre salarios europeos. Cada martes recibirás:<br><br>
        <strong>Qué esperar:</strong><br>
        • Tendencias salariales en 15 países de la UE<br>
        • Análisis del mercado laboral por sector<br>
        • Foco por país con comparaciones fiscales<br>
        • Nuevos datos de Eurostat<br><br>
        Mientras tanto, explora nuestros datos salariales:`,
      cta: 'Explorar salarios',
      ctaUrl: 'https://eurosalary.eu/es/',
      footer: 'Recibes este email porque te suscribiste en EuroSalary.eu. Cancela cuando quieras.',
    },
  };

  const c = content[lang];
  return emailTemplate(c.heading, c.body, c.cta, c.ctaUrl, c.footer);
}

export async function sendWelcomeEmail(email: string, lang: Lang = 'en') {
  return resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: welcomeSubjects[lang],
    html: welcomeEmailHtml(lang),
  });
}

// ============================================
// Salary Submission Confirmation
// ============================================

const confirmSubjects: Record<Lang, string> = {
  en: 'Thanks for your salary submission',
  fr: 'Merci pour votre déclaration de salaire',
  de: 'Danke für Ihre Gehaltsmeldung',
  es: 'Gracias por enviar tu salario',
};

function confirmEmailHtml(lang: Lang): string {
  const content: Record<Lang, { heading: string; body: string; cta: string; ctaUrl: string; footer: string }> = {
    en: {
      heading: 'Salary Report Received!',
      body: `Thank you for contributing to salary transparency in Europe. Your anonymous submission helps thousands of professionals make informed career decisions.<br><br>
        <strong>What happens next:</strong><br>
        • Your data is validated against existing benchmarks<br>
        • Once approved, it's included in our aggregated statistics<br>
        • No personal information is ever stored or shared<br><br>
        Want to see how your salary compares?`,
      cta: 'Compare Your Salary',
      ctaUrl: 'https://eurosalary.eu/en/',
      footer: 'This is a one-time confirmation. You will not receive further emails unless you subscribe to our newsletter.',
    },
    fr: {
      heading: 'Déclaration de salaire reçue !',
      body: `Merci de contribuer à la transparence salariale en Europe. Votre soumission anonyme aide des milliers de professionnels à prendre des décisions de carrière éclairées.<br><br>
        <strong>Prochaines étapes :</strong><br>
        • Vos données sont validées par rapport aux benchmarks existants<br>
        • Une fois approuvées, elles sont incluses dans nos statistiques agrégées<br>
        • Aucune information personnelle n'est stockée ou partagée`,
      cta: 'Comparer votre salaire',
      ctaUrl: 'https://eurosalary.eu/fr/',
      footer: 'Ceci est une confirmation unique. Vous ne recevrez pas d\'autres emails sauf si vous vous abonnez à notre newsletter.',
    },
    de: {
      heading: 'Gehaltsmeldung erhalten!',
      body: `Vielen Dank für Ihren Beitrag zur Gehaltstransparenz in Europa. Ihre anonyme Eingabe hilft Tausenden von Fachkräften, fundierte Karriereentscheidungen zu treffen.<br><br>
        <strong>Nächste Schritte:</strong><br>
        • Ihre Daten werden anhand bestehender Benchmarks validiert<br>
        • Nach Genehmigung fließen sie in unsere aggregierten Statistiken ein<br>
        • Es werden niemals persönliche Informationen gespeichert oder weitergegeben`,
      cta: 'Gehalt vergleichen',
      ctaUrl: 'https://eurosalary.eu/de/',
      footer: 'Dies ist eine einmalige Bestätigung. Sie erhalten keine weiteren E-Mails, es sei denn, Sie abonnieren unseren Newsletter.',
    },
    es: {
      heading: '¡Reporte salarial recibido!',
      body: `Gracias por contribuir a la transparencia salarial en Europa. Tu envío anónimo ayuda a miles de profesionales a tomar decisiones de carrera informadas.<br><br>
        <strong>Próximos pasos:</strong><br>
        • Tus datos se validan contra benchmarks existentes<br>
        • Una vez aprobados, se incluyen en nuestras estadísticas agregadas<br>
        • Nunca se almacena ni comparte información personal`,
      cta: 'Comparar tu salario',
      ctaUrl: 'https://eurosalary.eu/es/',
      footer: 'Esta es una confirmación única. No recibirás más emails a menos que te suscribas a nuestro newsletter.',
    },
  };

  const c = content[lang];
  return emailTemplate(c.heading, c.body, c.cta, c.ctaUrl, c.footer);
}

export async function sendConfirmationEmail(email: string, lang: Lang = 'en') {
  return resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: confirmSubjects[lang],
    html: confirmEmailHtml(lang),
  });
}

// ============================================
// Shared email template
// ============================================

function emailTemplate(heading: string, body: string, ctaText: string, ctaUrl: string, footer: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0F1F3D 0%,#1a3a6b 100%);padding:32px 40px;text-align:center;">
              <span style="color:#ffffff;font-size:24px;font-weight:700;">Euro<span style="color:#2563EB;">Salary</span></span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="color:#0F1F3D;font-size:22px;margin:0 0 20px 0;">${heading}</h1>
              <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 28px 0;">${body}</p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#2563EB;border-radius:6px;padding:14px 32px;">
                    <a href="${ctaUrl}" style="color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;">${ctaText}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8;font-size:12px;margin:0;text-align:center;">${footer}</p>
              <p style="color:#94a3b8;font-size:12px;margin:8px 0 0 0;text-align:center;">EuroSalary.eu — European Salary Data</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
