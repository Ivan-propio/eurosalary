import { ui, defaultLang, languages, type Lang } from './ui';

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
  // Strip the current lang prefix to get the base path
  const parts = currentPath.split('/');
  const currentLang = parts[1];
  const basePath = currentLang in languages ? '/' + parts.slice(2).join('/') : currentPath;

  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    href: `/${lang}${basePath}`,
  }));
}

export function detectBrowserLang(): Lang {
  if (typeof navigator === 'undefined') return defaultLang;
  const browserLang = navigator.language.split('-')[0];
  if (browserLang in languages) return browserLang as Lang;
  return defaultLang;
}
