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
7. Homepage can be changed when discussed
   with the user — no explicit gate needed
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

## i18n architecture — MUST follow for ALL new code

### Golden rule
**Every user-visible string must be translatable in all 24 languages.**
Never hardcode text in any language. Never use inline 4-lang Records.

### Three translation systems (use the right one)

#### 1. `t()` — Navigation, layout, homepage strings
- **File:** `src/i18n/ui.ts`
- **Format:** `ui.en['nav.home'] = 'Home'`, repeated for all 24 langs
- **Usage:** `const t = useTranslations(lang); t('nav.home')`
- **When to use:** Header, footer, homepage, layout-level strings
- **Keys:** dot-notation like `'nav.home'`, `'home.heroTitle1'`, `'footer.copyright'`

#### 2. `fb(uiLabels.xxx, lang)` — Reusable UI labels across pages
- **File:** `src/i18n/translations.ts` → `uiLabels` object
- **Format:** `uiLabels.salaryComparison: { en: '...', fr: '...', ..all 24.. }`
- **Usage:** `fb(uiLabels.salaryComparison, lang)`
- **When to use:** Labels shared across multiple pages/components
  (table headers, section titles, button text, etc.)
- **Current keys (~50):** home, compare, details, country, junior,
  midLevel, senior, salary, perYear, acrossEurope, salaryComparison,
  highestPaying, lowestPaying, salaryGap, betweenHighestLowest,
  compareSalaries, inCountries, seniorityData, in2026, countries,
  salaryDataByCountry, avgSalary, topJobs, viewDetails, minimumWage,
  cities, h1Country, economicOverviewTitle, topJobsInCountry,
  avgSalaryLabel, minWageLabel, taxRateLabel, colLabel, populationLabel,
  currencyLabel, jobTitleHeader, viewSalaryLink, salaries,
  salaryBreakdownByLevel, sourcesTitle, sourcesIntro, sourcesLastUpdated,
  submitSalary, sourceEurostatDesc, sourceJobPostingsTitle,
  sourceJobPostingsDesc, sourceReportsTitle, sourceReportsDesc,
  allCountries, medianCompByJurisdiction, fullComparison

#### 3. `fb(countryNames.XX, lang)` / `fb(jobNames.slug, lang)` — Entity names
- **File:** `src/i18n/translations.ts` → `countryNames`, `jobNames`
- **Format:** `countryNames.DE: { en: 'Germany', nl: 'Duitsland', ..all 24.. }`
- **Usage:** `fb(countryNames[countryCode], lang)`, `fb(jobNames[jobSlug], lang)`
- **When to use:** Displaying country or job names anywhere
- **NEVER use `getLocalizedName()`** — it only reads 4 Supabase columns

### `fb()` — Smart fallback function
- **File:** `src/i18n/utils.ts`
- Tries exact lang → family chain → English
- Family chains: nl→de→en, it→es→fr→en, pl→cs→sk→en, etc.
- **Always provide all 24 langs** — fallback is safety net, not a feature

### Template literals with variables
For strings containing `${jobName}`, `${countryName}`, `${fmt(salary)}`:
- Define inline in the page as `Record<string, string>` with ALL 24 keys
- Example: `titles: { en: \`What is the salary of \${jobName}?\`, nl: \`Wat is het salaris van \${jobName}?\`, ...all 24... }`
- These CANNOT go in translations.ts because they need runtime variables
- Use `{placeholder}` syntax in translations.ts for simple substitution:
  `h1Country: { en: 'Salaries in {country}', nl: 'Salarissen in {country}' }`

### How to add a new translatable string

1. **Decide which system** (see above)
2. **Add ALL 24 languages at once** — never add just 4
   Languages: en, fr, de, es, it, pt, nl, pl, ro, cs,
   sv, da, fi, el, hu, sk, bg, hr, sl, lt, lv, et, mt, ga
3. **Use `fb()` to read** — never access record[lang] directly
4. **Test with a non-primary lang** (e.g. nl, et, bg) to verify

### How to add a new page

1. Create `src/pages/[lang]/your-page.astro`
2. In `getStaticPaths()`: iterate `Object.keys(languages)` — generates 24 routes
3. Import translations: `import { fb } from '../../i18n/utils'`
4. Import what you need: `import { uiLabels, countryNames, jobNames } from '../../i18n/translations'`
5. For page-specific text (H1, description, FAQ): define inline Records with ALL 24 langs
6. For shared labels: use `fb(uiLabels.xxx, lang)`
7. For entity names: use `fb(countryNames[code], lang)` / `fb(jobNames[slug], lang)`
8. **Never hardcode any visible text in English**

### File reference
- `src/i18n/ui.ts` — 24 language definitions + t() strings (nav, homepage, layout)
- `src/i18n/utils.ts` — getLangFromUrl(), useTranslations(), fb(), getAlternateLinks()
- `src/i18n/translations.ts` — countryNames (16×24), jobNames (21×24), uiLabels (~50×24)
- `src/data/slugs.ts` — countrySlugsByLang, jobSlugsByLang (URL slugs for 24 langs)
- `src/data/cities.ts` — cityData, citySlugs, cityDisplayNames

### Language switcher
Searchable dropdown, all 24 langs with traffic-priority sort order

## Pages inventory (9,602 total, 34 page files)
### Core pages
- /[lang]/ — homepage (24 routes)
- /[lang]/salary/[country]/[job]/ — salary pages
- /[lang]/country/[country]/ — 27 countries x 24
- /[lang]/compare/[job]/ — job comparisons
- /[lang]/compare/country/[pair]/ — 105 country pairs x 24
- /[lang]/city/[city]/ — 24 cities x 24 langs
- /[lang]/minimum-wage/[country]/ — 15 x 24
- /[lang]/salary-transparency/ — index + 27 countries x 24
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

## Supabase connection
- Project ref: hmmpmbqbfgcxhbcfjqir
- URL: https://hmmpmbqbfgcxhbcfjqir.supabase.co
- Region: EU West (Frankfurt)
- Keys stored in: memory/reference_api_keys.md
- .env has: PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY

## CRM Layer (Revenue Engine)
### Database tables (11 CRM tables)
- crm_accounts — companies/organizations
- crm_leads — individual contacts with scoring
- crm_deals — sales pipeline with stages
- crm_activities — event log (emails, page views, etc.)
- crm_email_sequences — automated nurture sequences
- crm_sequence_steps — individual emails in a sequence
- crm_sequence_enrollments — lead enrolled in a sequence
- crm_partners — affiliate/data/platform partners
- crm_partner_referrals — referral tracking
- crm_api_keys — paid API access management
- crm_analytics_daily — daily metrics snapshots
- Migration file: supabase/apply-crm.sql (idempotent, safe to re-run)

### API endpoints (Cloudflare Pages Functions)
- POST /api/lead-capture — smart lead upsert with scoring
- POST /api/track-activity — engagement tracking
- POST /api/partner-apply — partner applications

### Automation scripts (scripts/)
- process-email-sequences.mjs — hourly email processor
- daily-analytics.mjs — daily CRM metrics
- score-leads.mjs — weekly lead scoring
- seed-email-sequences.mjs — seeds 10 nurture sequences

### GitHub Actions workflows
- hourly-email-sequences.yml
- daily-crm-analytics.yml
- weekly-lead-scoring.yml

### B2B pages (all in 24 languages)
- /enterprise/ + /enterprise/demo/, /request-report/, /benchmark-audit/, /transparency-audit/
- /partners/ + /partners/api/, /data-licensing/, /referral/
- /pricing/ + /pricing/api/, /employer/, /enterprise/
- /for-employers/, /for-recruiters/, /salary-api/

## Blog architecture
- blog-posts.ts — empty array, ready for new posts
- New posts MUST be created with all 24 languages from day one
- Never add posts with only 4 languages
- Interface: BlogPost { id, title, slug, excerpt, content, image, imageAlt, date, tags }
- All Record<string, string> fields need all 24 language keys

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

## Payment system (Stripe — LIVE ✅)
Fully configured and deployed in LIVE mode. Real charges enabled.

### Stripe products (LIVE)
| Product | ID | Monthly | Annual |
|---|---|---|---|
| Pro | prod_UI9MEo3eMqmySl | price_1TJZ3rFVaIUkPsQC12XKbrF3 (€29) | price_1TJZ3sFVaIUkPsQCZnLuFcWh (€279) |
| Business | prod_UI9ML5efOD4dgg | price_1TJZ3sFVaIUkPsQCP8bnrUHZ (€99) | price_1TJZ3sFVaIUkPsQCU4MsDyoT (€949) |
| API Developer | prod_UI9M1FjOvGvwfY | price_1TJZ3tFVaIUkPsQCRHanOeHV (€49) | price_1TJZ3tFVaIUkPsQCfQ0Ii4pV (€469) |
| API Business | prod_UI9MgsuqUn11Sx | price_1TJZ3uFVaIUkPsQC8q6Rai19 (€149) | price_1TJZ3uFVaIUkPsQChM2i3tS3 (€1,429) |
| Employer Starter | prod_UI9MYQe3s58xfF | price_1TJZ3vFVaIUkPsQCjNNLBYsE (€79) | price_1TJZ3vFVaIUkPsQC6kQM94Mr (€759) |
| Employer Pro | prod_UI9M25ahnQzpvs | price_1TJZ3vFVaIUkPsQCRTT0cSS9 (€199) | price_1TJZ3wFVaIUkPsQCarpXE0xF (€1,909) |
| Country Report | prod_UI9M51NHmTNGBA | price_1TJZ3wFVaIUkPsQCuM9IP19N (€29 one-time) | — |

### Stripe keys in use
- LIVE secret key: sk_live_51TJYTd... (in Cloudflare env)
- LIVE webhook secret: whsec_XVlqUO7pzlP2jwYHXcMvQZ4apHaBLIcq
- LIVE webhook endpoint: we_1TJZ3wFVaIUkPsQCN487Gmqk → https://eurosalary.eu/api/stripe-webhook
- Test keys also exist (sk_test_, whsec_ST10...) for test mode products

### Stripe endpoints (Cloudflare Pages Functions)
- POST /api/create-checkout — creates Stripe Checkout session (priceId, mode, lang)
- POST /api/stripe-webhook — receives Stripe events → Supabase + Resend email
- POST /api/customer-portal — creates Stripe billing portal session

### Stripe data flow
1. User clicks CTA on pricing page → JS calls /api/create-checkout
2. Stripe Checkout opens → user pays
3. Stripe sends webhook → /api/stripe-webhook
4. Webhook writes to: crm_leads (upsert), payments (insert), subscriptions (upsert)
5. Confirmation email sent via Resend

### Cloudflare Pages secrets (5 configured)
- STRIPE_SECRET_KEY (live)
- STRIPE_WEBHOOK_SECRET (live)
- RESEND_API_KEY
- PUBLIC_SUPABASE_URL
- PUBLIC_SUPABASE_ANON_KEY

### Supabase payment tables (migrated ✅)
- subscriptions — Stripe subscription tracking with plan, status, amounts
- payments — all payment records (checkout, invoice, failed)
- salary_alerts — user alert subscriptions
- report_purchases — one-time report download tracking
- v_mrr, v_monthly_revenue, v_plan_breakdown — revenue dashboard views
- Migration file: supabase/apply-payments.sql

### Price data files
- src/data/stripe-prices.json — TEST mode price IDs
- src/data/stripe-prices-live.json — LIVE mode price IDs (in production)

## Google Analytics 4
- Measurement ID: G-V3JNJKQDCR (installed in BaseLayout)
- GTM Container: GTM-T526FS5D (installed in BaseLayout)
- Enhanced event tracking: pricing_click, demo_request, api_interest, partner_interest, newsletter_signup, scroll_depth, solutions_nav_click
- Content groups: salary_page, country_page, compare_page, pricing, b2b_employers, b2b_recruiters, b2b_enterprise, b2b_partners, b2b_api, premium, calculator, blog, newsletter, alerts
- GA4 Data API endpoint: /api/admin/analytics (ready, needs GA4_PROPERTY_ID + GA4_SERVICE_ACCOUNT_JSON env vars)
- Plausible Analytics also active (GDPR-compliant backup)

## Working method — MANDATORY script-first approach
**This is the DEFAULT for ALL repetitive work. Use it automatically
without asking. Only ask if a task is clearly too small (< 3 edits).**

### When to use scripts (always, unless impractical)
- Any change across 24 languages
- Any change across multiple countries, jobs, or entities
- Any bulk text replacement (e.g. "15 → 27" across files)
- Adding new i18n keys, new entity data, new page translations
- Updating data objects in multiple page files
- Any task touching > 3 files with similar patterns

### How
1. **Create a Python/JS script** in `scripts/` that reads existing
   data files, generates new entries programmatically, writes them back.
2. **One script = one task** — e.g. "add 12 countries to slugs.ts +
   translations.ts + seed.ts" all in a single script run.
3. **Use Python for bulk text updates** — regex-based find/replace
   across all files and all languages at once. Use `os.walk()` for
   Astro `[lang]` directories (glob can't resolve brackets).
4. **Delete scripts after use** — they're one-off tools, not permanent.
5. **Saves ~90% of tokens** vs. writing each translation manually.

### When NOT to use scripts (ask first)
- Single-file CSS/template changes
- Fixing 1-2 specific bugs
- Architecture decisions or new component creation

## Post-deploy — MANDATORY auto-indexing
**After every build+deploy, ALWAYS run indexing. Never ask.**

### Steps (automatic after every deploy)
1. `node scripts/index-pages.mjs` — submits all URLs via IndexNow API
2. IndexNow key file: `public/d4f8e2a1b3c5967082e4f1a9d7b6c3e5.txt`
3. Sitemap: `https://eurosalary.eu/sitemap-index.xml` (auto-generated by Astro)
4. Google picks up via Search Console (sitemap auto-refresh, verified)
5. For specific URLs only: `node scripts/index-pages.mjs --urls https://eurosalary.eu/en/pricing/`

### What's configured
- IndexNow API key deployed at root
- Google Search Console: verified, sitemap submitted
- robots.txt: sitemap reference + all bots allowed
- Sitemap: auto-generated with hreflang for all 24 languages

## Night Agent System
Autonomous development agent runs every night 3:00-7:00 AM.

### Files
- `BACKLOG.md` — task queue (agent reads, executes top task, moves to Done)
- `NIGHTLOG.md` — daily log (agent writes what it did each night)
- `CLAUDE.md` — this file (agent reads rules before every session)

### Rules for the night agent
- Read CLAUDE.md + BACKLOG.md + NIGHTLOG.md before starting
- Pick TOP task from BACKLOG.md "Ready" section
- Use script-first method for all bulk work
- Build → Deploy → Index after every change
- Never deploy if build has errors or fewer pages than previous
- Never touch: homepage, database schema, Stripe, API keys, git push
- Log everything in NIGHTLOG.md
- If task is risky/ambiguous, skip and note in BACKLOG.md

### How to add tasks
Add new entries to BACKLOG.md "Ready" section with:
- Priority (P0-P3), title, files involved, description, method, estimate

## Current status
Revenue engine built (CRM, API endpoints, automation, B2B pages).
Navigation connected: Header Solutions dropdown, Footer Business column, Homepage B2B section.
All 3 i18n-partial pages fixed (blog, calculator, newsletter → 24 languages).
Admin dashboard rebuilt (sidebar nav, revenue tab, subscriptions tab).
Blog cleared — new posts will be created in all 24 languages from scratch.
Pricing page redesigned + expanded to 24 languages.
27+1 countries (27 EU + CH) with full data across all pages.
**Stripe LIVE** — 7 products, 13 prices, webhook, checkout, portal all configured.
Supabase payment tables migrated (subscriptions, payments, alerts, reports + views).
Pricing page CTA buttons connected to Stripe Checkout (Pro + Business).
Build: 17,523 pages, 0 errors. Deployed to production.
Last deploy: 2026-04-07.
