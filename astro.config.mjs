// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SSG build — Cloudflare Pages serves static files natively.
// No adapter needed for static output.
export default defineConfig({
  site: 'https://eurosalary.eu',
  output: 'static',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'es'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fr: 'fr',
          de: 'de',
          es: 'es',
        },
      },
    }),
  ],
});
