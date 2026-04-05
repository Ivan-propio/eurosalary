// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// All 24 official EU languages
const euLocales = [
  'en','fr','de','es','it','pt','nl','pl','ro','cs',
  'sv','da','fi','el','hu','sk','bg','hr','sl','lt','lv','et','mt','ga',
];

// SSG build — Cloudflare Pages serves static files natively.
// No adapter needed for static output.
export default defineConfig({
  site: 'https://eurosalary.eu',
  output: 'static',

  i18n: {
    defaultLocale: 'en',
    locales: euLocales,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: Object.fromEntries(euLocales.map((l) => [l, l])),
      },
    }),
  ],
});
