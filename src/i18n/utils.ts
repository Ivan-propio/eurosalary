import { ui, defaultLang, languages, type Lang } from './ui';
import { countrySlugsByLang, jobSlugsByLang, getCountryCodeFromSlug, getCanonicalJobSlug } from '../data/slugs';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getRouteFromLang(lang: Lang, path: string): string {
  // path should be without lang prefix, e.g. "/salary/germany/software-engineer/"
  return `/${lang}${path}`;
}

export function getAlternateLinks(currentPath: string): { lang: Lang; href: string }[] {
  const parts = currentPath.split('/').filter(Boolean); // e.g. ['en', 'salary', 'germany', 'software-engineer']
  const currentLang = (parts[0] in languages ? parts[0] : defaultLang) as Lang;
  const section = parts[1]; // 'salary', 'country', or undefined (homepage)

  return (Object.keys(languages) as Lang[]).map((targetLang) => {
    // Homepage
    if (!section) return { lang: targetLang, href: `/${targetLang}/` };

    // Country page: /en/country/germany/ -> /fr/country/allemagne/
    if (section === 'country' && parts[2]) {
      const countryCode = getCountryCodeFromSlug(currentLang, parts[2]);
      if (countryCode && countrySlugsByLang[targetLang]?.[countryCode]) {
        return { lang: targetLang, href: `/${targetLang}/country/${countrySlugsByLang[targetLang][countryCode]}/` };
      }
    }

    // Salary page: /en/salary/germany/software-engineer/ -> /fr/salary/allemagne/ingenieur-logiciel/
    if (section === 'salary' && parts[2] && parts[3]) {
      const countryCode = getCountryCodeFromSlug(currentLang, parts[2]);
      const canonicalJob = getCanonicalJobSlug(currentLang, parts[3]);
      if (countryCode && canonicalJob && countrySlugsByLang[targetLang]?.[countryCode] && jobSlugsByLang[targetLang]?.[canonicalJob]) {
        return { lang: targetLang, href: `/${targetLang}/salary/${countrySlugsByLang[targetLang][countryCode]}/${jobSlugsByLang[targetLang][canonicalJob]}/` };
      }
    }

    // Fallback: just swap language prefix
    const basePath = '/' + parts.slice(1).join('/');
    return { lang: targetLang, href: `/${targetLang}${basePath.endsWith('/') ? basePath : basePath + '/'}` };
  });
}

/**
 * Smart fallback lookup for i18n records.
 * Tries: exact lang → same-family languages → English.
 * Family chains ensure users see a related language before falling back to English.
 */
const fallbackChains: Record<string, string[]> = {
  // Germanic
  nl: ['de', 'en'], da: ['sv', 'en'], sv: ['da', 'en'],
  // Romance
  it: ['es', 'fr', 'en'], pt: ['es', 'fr', 'en'], ro: ['fr', 'it', 'en'],
  // Slavic
  pl: ['cs', 'sk', 'en'], cs: ['sk', 'pl', 'en'], sk: ['cs', 'pl', 'en'],
  hr: ['sl', 'en'], sl: ['hr', 'en'], bg: ['en'],
  // Baltic
  lt: ['lv', 'en'], lv: ['lt', 'en'],
  // Finno-Ugric
  fi: ['et', 'en'], et: ['fi', 'en'], hu: ['en'],
  // Other
  el: ['en'], mt: ['it', 'en'], ga: ['en'],
  // Primary 4 — fallback to each other
  en: [], fr: ['es', 'it', 'en'], de: ['nl', 'en'], es: ['pt', 'fr', 'en'],
};

export function fb<T>(record: Record<string, T>, lang: string): T {
  if (record[lang] !== undefined) return record[lang];
  const chain = fallbackChains[lang] || ['en'];
  for (const fallback of chain) {
    if (record[fallback] !== undefined) return record[fallback];
  }
  return record.en;
}

export function detectBrowserLang(): Lang {
  if (typeof navigator === 'undefined') return defaultLang;
  const browserLang = navigator.language.split('-')[0];
  if (browserLang in languages) return browserLang as Lang;
  return defaultLang;
}
