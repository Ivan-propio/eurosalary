# EuroSalary.eu — Project Memory

## What this project is
European salary comparison platform.
Live at: https://eurosalary.eu
Staging at: https://staging.eurosalary.eu
GitHub repo: eurosalary

## Core rules — NEVER break these
1. All 24 official EU languages active
   Languages: en, fr, de, es, it, pt, nl, pl, ro, cs,
   sv, da, fi, el, hu, sk, bg, hr, sl, lt, lv, et, mt, ga
2. All content server-side rendered (SSR/SSG)
   Never render salary data via client-side JS
3. All nav links must point to real pages
   Never link to pages that don't exist
4. Design must match Stitch mockups (dark navy + blue)
5. Every page needs AEO markup:
   Article schema, FAQPage schema,
   hreflang for all 24 langs, TL;DR box, FAQ section
6. Deploy to dev branch first,
   staging second, main/production last
7. Never change the homepage design
   without explicit instruction
8. Data used in getStaticPaths() must be imported
   from external files (src/data/), NOT defined
   inline — Astro hoists getStaticPaths into a
   separate module scope during build

## Tech stack
- Astro 6.1.2 (SSG) + Cloudflare Pages
- Supabase (database, EU West / Frankfurt)
- Resend (email)
- Cloudflare Pages Functions (serverless API)
- GitHub Actions (scheduled tasks)
- Pexels API (blog images)
- NO Make.com — we use free tools only

## i18n system
- All 24 EU languages defined in src/i18n/ui.ts
- Object.keys(languages) in all getStaticPaths()
- fb(record, lang) = fallback function: tries
  record[lang], falls back to record.en
- Translated strings: Record<string, string> with
  en/fr/de/es keys, fb() handles other 20 langs
- Localized URL slugs: src/data/slugs.ts
  (countrySlugsByLang, jobSlugsByLang)
- City slugs: src/data/cities.ts
- Language switcher: searchable dropdown, all 24
  langs with traffic-priority sort order

## Pages inventory (9,578 total, 33 page files)
### Core pages
- /[lang]/ — homepage (24 routes)
- /[lang]/salary/[country]/[job]/ — salary pages
- /[lang]/country/[country]/ — 15 countries x 24
- /[lang]/compare/[job]/ — job comparisons
- /[lang]/compare/country/[pair]/ — 105 country pairs x 24
- /[lang]/city/[city]/ — 24 cities x 24 langs
- /[lang]/minimum-wage/[country]/ — 15 x 24
- /[lang]/salary-transparency/ — index + 15 countries x 24
- /[lang]/countries/ — country list
- /[lang]/sectors/ + /[lang]/sectors/[sector]/

### Content pages
- /[lang]/methodology/
- /[lang]/privacy/
- /[lang]/about/
- /[lang]/data-sources/
- /[lang]/blog/ + /[lang]/blog/[slug]/
- /[lang]/newsletter/

### Monetization pages
- /[lang]/premium/ — premium landing
- /[lang]/premium/reports/[country]/ — per-country reports
- /[lang]/premium/employer/ — employer dashboard
- /[lang]/pricing/ — pricing page (4 tiers)
- /[lang]/salary-api/ — API documentation
- /[lang]/for-employers/ — employer landing
- /[lang]/for-recruiters/ — recruiter landing
- /[lang]/enterprise/ — enterprise landing
- /[lang]/partners/ — partnership program

### Tool pages
- /[lang]/calculator/ — salary calculator
- /[lang]/calculator/net-salary/ — net salary calc
- /[lang]/alerts/ — salary alerts

## API endpoints (Cloudflare Pages Functions)
- POST /api/subscribe — newsletter signup
- POST /api/contact — lead capture
- GET /api/detect-locale — server-side locale detect
- GET /api/v1/salary?country=DE&job=software-engineer
- GET /api/v1/compare?job=software-engineer&level=mid
- GET /api/v1/minimum-wage?country=DE
- GET /api/v1/city?city=berlin

## Components
- BaseLayout, Header, Footer, LanguageSwitcher
- TLDRBox, FAQSection, SalaryTable, SalaryForm
- SearchBar, BrowseSection, CountryCompare, EuropeMap
- JobAffiliateCTA, NewsletterForm
- InternalLinkingHub — reusable cross-linking section
- FreshnessIndicator — shows data update timestamps
- NewsletterCTA — email capture with 3 variants

## Data files (src/data/)
- slugs.ts — countrySlugsByLang, jobSlugsByLang for 24 langs
- cities.ts — cityData, citySlugs, cityDisplayNames
- blog-posts.ts — 5 articles x 4 langs
- homepage.ts — homepage content
- freshness.json — data update timestamps
- seed.ts — database seed data

## GitHub Actions workflows
- weekly-data-refresh.yml — Monday 06:00 UTC
- monthly-eurostat-sync.yml — 1st of month 04:00 UTC
- health-check.yml — daily 08:00 UTC
- weekly-newsletter.yml — Tuesday 10:00 UTC

## Scripts (scripts/)
- refresh-salary-data.mjs — weekly salary micro-adjustments
- sync-eurostat.mjs — monthly Eurostat API sync
- update-freshness.mjs — update freshness.json timestamps
- data-quality-report.mjs — coverage/freshness/outlier checks
- generate-newsletter.mjs — generate newsletter content
- send-newsletter.mjs — batch send via Resend

## Design reference
Dark navy (#0F1F3D) + electric blue (#2563EB)
Public Sans headlines, Inter body

## AEO requirements (every page)
- H1 must be a question
- First paragraph: direct answer, 60 words max
- TL;DR box with 3 bullets
- FAQ section with min 5 Q&As
- FAQPage schema markup
- Article schema with dateModified
- hreflang for all 24 EU languages
- All data in static HTML (not JS)
- llms.txt at /llms.txt
- robots.txt allows all AI bots

## What's already configured
- Supabase: connected, schema created, seeded
- Resend: verified for eurosalary.eu domain
- Cloudflare Pages: auto-deploy from GitHub
- Google Search Console: verified
- Cloudflare Web Analytics: active

## Accounts and services
- Domain: Namecheap (eurosalary.eu)
- DNS + Hosting: Cloudflare
- Database: Supabase (EU West / Frankfurt)
- Email: Resend (hello@eurosalary.eu)
- Analytics: Cloudflare Web Analytics
- Images: Pexels API (free)

## Session start checklist
Before doing ANYTHING in a new session:
1. Read this entire CLAUDE.md file
2. Check git log (last 5 commits)
3. Check what pages currently exist
4. Then start working

## Current status
All 5 prompts executed. Build: 9,578 pages, 0 errors.
Remaining work: deploy to dev/staging/main.
