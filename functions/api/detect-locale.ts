// Cloudflare Pages Function: server-side locale detection
// Used as fallback for the root domain smart redirect
// Priority: stored cookie > Accept-Language > CF geo > EN

const SUPPORTED = ['en','fr','de','es','it','pt','nl','pl','ro','cs','sv','da','fi','el','hu','sk','bg','hr','sl','lt','lv','et','mt','ga'];

// Map CF country codes to EU language codes
const COUNTRY_TO_LANG: Record<string, string> = {
  GB: 'en', US: 'en', IE: 'en', AU: 'en', NZ: 'en', CA: 'en',
  FR: 'fr', BE: 'fr', MC: 'fr', SN: 'fr', CI: 'fr', ML: 'fr',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  IT: 'it', SM: 'it', VA: 'it',
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt',
  NL: 'nl', SR: 'nl',
  PL: 'pl',
  RO: 'ro', MD: 'ro',
  CZ: 'cs',
  SE: 'sv',
  DK: 'da',
  FI: 'fi',
  GR: 'el', CY: 'el',
  HU: 'hu',
  SK: 'sk',
  BG: 'bg',
  HR: 'hr',
  SI: 'sl',
  LT: 'lt',
  LV: 'lv',
  EE: 'et',
  MT: 'mt',
  LU: 'fr', // Luxembourg defaults to French
};

function parseAcceptLanguage(header: string): string | null {
  const langs = header
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    if (SUPPORTED.includes(lang)) return lang;
  }
  return null;
}

export const onRequest: PagesFunction = async (context) => {
  // 1. Check cookie preference
  const cookieHeader = context.request.headers.get('cookie') || '';
  const match = cookieHeader.match(/eurosalary-lang=([a-z]{2})/);
  if (match && SUPPORTED.includes(match[1])) {
    return Response.json({ locale: match[1] });
  }

  // 2. Check Accept-Language header
  const acceptLang = context.request.headers.get('accept-language');
  if (acceptLang) {
    const detected = parseAcceptLanguage(acceptLang);
    if (detected) return Response.json({ locale: detected });
  }

  // 3. Check Cloudflare geo headers
  const country = (context.request as any).cf?.country || context.request.headers.get('cf-ipcountry');
  if (country && COUNTRY_TO_LANG[country]) {
    return Response.json({ locale: COUNTRY_TO_LANG[country] });
  }

  // 4. Fallback
  return Response.json({ locale: 'en' });
};
