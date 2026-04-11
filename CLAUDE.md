# EuroSalary.eu — Project Memory

## What this project is
European salary comparison platform — 27 EU + CH countries, 24 EU languages.
- Live: https://eurosalary.eu | Staging: https://staging.eurosalary.eu
- Repo: eurosalary | Deploy: Cloudflare Pages (auto from GitHub)
- Stack: Astro 6.1.2 (SSG), Supabase (EU Frankfurt), Resend, Stripe LIVE
- Design: brand-tokens.json → build-tokens.mjs → tokens.css (rebrand in 5 min)

## Core rules — NEVER break these
1. All 24 EU languages active (en fr de es it pt nl pl ro cs sv da fi el hu sk bg hr sl lt lv et mt ga)
2. All content SSR/SSG — never render salary data via client-side JS
3. All nav links must point to real pages
4. Every page needs AEO markup: Article + FAQPage schema, hreflang ×24, TL;DR box, FAQ section
5. Deploy: dev → staging → main/production
6. Data in getStaticPaths() must be imported from src/data/, NOT inline
7. Admin pages use `<style is:global>` — NEVER scoped style on pages with JS innerHTML

## i18n architecture — MUST follow for ALL new code

**Golden rule: Every user-visible string translatable in all 24 languages. Never hardcode text.**

### Three translation systems
1. **`t()`** — Nav, layout, homepage strings → `src/i18n/ui.ts`
   - Usage: `const t = useTranslations(lang); t('nav.home')`
2. **`fb(uiLabels.xxx, lang)`** — Shared UI labels → `src/i18n/translations.ts`
   - ~50 keys (salaryComparison, avgSalary, viewDetails, etc.)
3. **`fb(countryNames.XX, lang)` / `fb(jobNames.slug, lang)`** — Entity names → same file
   - NEVER use `getLocalizedName()` — only reads 4 Supabase columns

**`fb()`** (src/i18n/utils.ts): tries exact lang → family chain → English.

**Template literals with variables:** Define inline `Record<string, string>` with ALL 24 keys.
Use `{placeholder}` syntax in translations.ts for simple substitution.

### Adding new strings/pages
- Add ALL 24 languages at once — never partial
- Always use `fb()` to read — never `record[lang]` directly
- New pages: `src/pages/[lang]/your-page.astro`, iterate `Object.keys(languages)` in getStaticPaths

### Key files
- `src/i18n/ui.ts` — t() strings | `src/i18n/utils.ts` — fb(), getAlternateLinks()
- `src/i18n/translations.ts` — countryNames, jobNames, uiLabels (all ×24)
- `src/data/slugs.ts` — URL slugs ×24 | `src/data/cities.ts` — city data

## Script-first method — MANDATORY for bulk work
Any change across 24 langs, multiple countries/jobs, or >3 files with similar patterns:
1. Create a one-off script in `scripts/` that reads, transforms, writes back
2. Use Python for regex-based bulk text updates (`os.walk()` for `[lang]` dirs)
3. Delete scripts after use — saves ~90% of tokens vs manual edits

## Stripe — LIVE ✅
7 products, 13 prices. Keys + IDs in `src/data/stripe-prices-live.json` and memory.
Endpoints: `/api/create-checkout`, `/api/stripe-webhook`, `/api/customer-portal`
Supabase tables: subscriptions, payments, salary_alerts, report_purchases + revenue views.

## Night Agent (3:00-7:00 AM)
- Reads: CLAUDE.md → BACKLOG.md → NIGHTLOG.md
- Picks top task from BACKLOG "Ready" section, executes, logs
- NEVER touches: homepage, DB schema, Stripe, API keys, git push
- Build → Deploy → Index after every change

## Deploy — Wrangler Direct Upload (MANDATORY)
Cloudflare Pages is NOT connected to GitHub. Every deploy requires:
```bash
CLOUDFLARE_API_TOKEN="cfut_..." wrangler pages deploy dist --project-name=eurosalary --branch=main --commit-dirty=true
```
**Always verify output contains `✨ Deployment complete!` before moving on.**
If output shows partial upload or Node.js stack trace → retry immediately, same command.

## Post-deploy — auto-indexing (MANDATORY, never ask)
`node scripts/index-pages.mjs` — submits all URLs via IndexNow.
For specific URLs: `--urls https://eurosalary.eu/en/pricing/`

## Current status
17,523 pages, 0 errors. Stripe LIVE. CRM + B2B pages built.
Last deploy: 2026-04-07.
