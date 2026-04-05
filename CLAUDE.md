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

## Current status
Revenue engine built (CRM, API endpoints, automation, B2B pages).
Blog cleared — new posts will be created in all 24 languages from scratch.
Build: 9,722 pages, 0 errors. Deployed to production.
Last deploy: 2026-04-06.
