# EuroSalary — Backlog (Agent Task Queue)

## How this works
- Agent reads this file every night at 3:00 AM
- Picks the TOP task from **Ready** section
- Executes it, builds, deploys, indexes
- Moves it to **Done** with date and notes
- If a task fails, moves it to **Blocked** with error details
- Max 1 large task or 2-3 small tasks per night (4h window)
- Full plan details: see PLAN-SAAS.md

## Priority levels
- P0 = Critical (revenue-blocking, broken pages)
- P1 = High (new features, SEO improvements)
- P2 = Medium (UX polish, content expansion)
- P3 = Low (nice-to-have, experiments)

---

## Ready (ordered by priority — agent picks from top)

### P0 — PHASE 1A: Supabase Auth + Entitlements Migration
- **Files:** `supabase/migrations/005_auth_and_entitlements.sql`
- **Task:** Create migration: link crm_leads to auth.users, create v_user_entitlements view, add RLS policies for authenticated users
- **Method:** Create SQL file, run via Supabase SQL Editor
- **Estimate:** 30min
- **Depends on:** Nothing
- **Unlocks:** All Phase 1 tasks

### P0 — PHASE 1B: Auth API Endpoints (signup, login, logout, session, refresh)
- **Files:** `functions/api/auth/signup.ts`, `login.ts`, `logout.ts`, `session.ts`, `refresh.ts`, `functions/_middleware.ts`
- **Task:** Build 5 auth endpoints + shared middleware. Use Supabase Auth SDK. httpOnly cookies for JWT.
- **Method:** Direct code — 6 files
- **Estimate:** 2h
- **Depends on:** Phase 1A
- **New env var:** SUPABASE_SERVICE_ROLE_KEY in Cloudflare

### P0 — PHASE 1C: Login + Signup Pages (24 langs)
- **Files:** `src/pages/[lang]/login.astro`, `src/pages/[lang]/signup.astro`
- **Task:** Create login and signup pages with i18n for all 24 languages
- **Method:** Script — generate i18n blocks for 24 langs, create both page files
- **Estimate:** 2h
- **Depends on:** Phase 1B

### P0 — PHASE 1D: Dashboard Page + API Key Generation
- **Files:** `src/pages/[lang]/dashboard/index.astro`, `functions/api/dashboard/api-keys.ts`
- **Task:** Create user dashboard showing plan, API key (with copy), usage stats, manage subscription. API key CRUD endpoint.
- **Method:** Direct code + script for i18n
- **Estimate:** 3h
- **Depends on:** Phase 1B, 1C

### P0 — PHASE 1E: Gated API Endpoints (export, net-salary, city-detail)
- **Files:** `functions/api/v1/export.ts`, `net-salary.ts`, `city-detail.ts`
- **Task:** Create 3 premium-only endpoints. Validate session cookie. Return 403 with upsell for free users.
- **Method:** Direct code
- **Estimate:** 2h
- **Depends on:** Phase 1B

### P0 — PHASE 1F: ProGate Component + UI Gating
- **Files:** `src/components/ProGate.astro`, modify Header.astro, net-salary page, city pages
- **Task:** Create blur/lock overlay component. Add login/avatar to header. Gate calculator results and city extended data.
- **Method:** Direct code + script for i18n
- **Estimate:** 2h
- **Depends on:** Phase 1D, 1E

### P0 — PHASE 1G: Link Stripe to Auth + API Key on Payment
- **Files:** `functions/api/stripe-webhook.ts`, `functions/api/create-checkout.ts`
- **Task:** After payment, auto-generate API key, link auth user, send branded email with key + dashboard link. Pass client_reference_id through checkout.
- **Method:** Modify existing files
- **Estimate:** 1h
- **Depends on:** Phase 1D

### P1 — PHASE 2A: PDF Country Report Generation
- **Files:** `scripts/generate-country-reports.mjs`, `functions/api/reports/country.ts`, `functions/api/reports/download.ts`
- **Task:** Pre-generate 27 country report PDFs nightly. Store in R2. Serve via signed URLs. Business+ only.
- **Method:** Script (Puppeteer) + API endpoints
- **Estimate:** 4h
- **Depends on:** Phase 1 complete

### P1 — PHASE 2B: Bulk Export + Team Access
- **Files:** `functions/api/v1/bulk-export.ts`, `supabase/migrations/006_teams.sql`, `functions/api/dashboard/team.ts`
- **Task:** Multi-country CSV/JSON/XLSX export. Team invite system (10 seats). Business+ only.
- **Estimate:** 4h
- **Depends on:** Phase 1 complete

### P1 — PHASE 3: API Rate Limiting with Cloudflare KV
- **Files:** `functions/api/v1/_middleware.ts`, `src/pages/[lang]/dashboard/api.astro`
- **Task:** Real rate limiting via KV. API dashboard with usage charts + code examples.
- **Estimate:** 3h
- **Depends on:** Phase 1 complete

### P1 — PHASE 4: Employer Benchmarking Tools
- **Files:** `functions/api/employer/benchmark.ts`, `salary-bands.ts`, `pay-equity.ts`
- **Task:** Salary benchmarking, salary bands, pay equity analysis for Employer plans.
- **Estimate:** 5h
- **Depends on:** Phase 2 complete

### P1 — PHASE 5: Country Report One-Time Purchase Flow
- **Task:** Buy single PDF report -> Stripe one-time -> webhook -> download token -> email -> download
- **Estimate:** 2h
- **Depends on:** Phase 2A

### P2 — PHASE 6: Onboarding Emails + Upgrade Nudges
- **Task:** 3-email onboarding sequence. Contextual upgrade CTAs on free pages. Usage-based prompts.
- **Estimate:** 3h
- **Depends on:** Phase 1 complete

### P2 — Blog posts (3 articles x 24 languages)
- **Files:** `src/data/blog-posts.ts`
- **Topics:** EU Pay Transparency 2026, Highest paying tech jobs, Cost of living vs salary
- **Method:** Script
- **Estimate:** 3h

### P2 — Fix B2B pages UX (for-recruiters, enterprise, partners)
- **Task:** Spacing/padding issues on all B2B pages
- **Method:** Direct CSS edits
- **Estimate:** 2h

### P2 — Expand B2B pages to 24 languages
- **Task:** Add remaining 20 languages to for-employers, for-recruiters, enterprise, partners, salary-api
- **Method:** Script per page
- **Estimate:** 3h per page

### P3 — Add 20 more European cities
- **Task:** Munich, Barcelona, Lyon, Milan, Rotterdam, etc.
- **Method:** Script
- **Estimate:** 3h

### P3 — SEO internal linking hub on all pages
- **Estimate:** 2h

### P3 — Data freshness micro-adjustments
- **Estimate:** 30min

### P3 — Image optimization (WebP)
- **Estimate:** 1h

---

## In Progress
(agent moves task here when starting)

---

## Blocked
(tasks that failed — agent adds error details)

---

## Done

### 2026-04-07 — Stripe LIVE Configuration
- Created 7 products + 13 prices in Stripe test AND live mode
- Built create-checkout, stripe-webhook, customer-portal endpoints
- Ran Supabase payment migration (subscriptions, payments, salary_alerts, report_purchases)
- Set 5 Cloudflare env secrets (STRIPE_SECRET_KEY, WEBHOOK_SECRET, RESEND, SUPABASE x2)
- Connected pricing page CTA buttons to Stripe Checkout with live price IDs
- Created promo code EUROSALARY100 (100% off, 3 uses)
- Fixed webhook: handle customer as string/object, customer_email fallback
- Built branded HTML email template (header, features, CTA, footer with social links)
- Fixed premium page: replaced waitlist/Q3 2026 text with "now available" + pricing link
- Tested full flow: checkout -> payment -> Supabase -> email delivery

### 2026-04-07 — Pricing page redesign + 24 languages
- Rewrote pricing page UX (compact hero, card grid, trust badges)
- Added 20 missing language blocks via script
- Fixed "15 paises" -> "27 paises" across all languages
- Deployed and indexed 17,522 URLs via IndexNow
