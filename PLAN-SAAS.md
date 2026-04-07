# EuroSalary SaaS Conversion Plan

## Current Problem
Stripe payments work but the user gets NOTHING after paying. No login, no API key, no gated content. The site is 100% public.

---

## PHASE 1: Auth + Pro Value (MVP) — 5-7 days
**Goal**: Pro subscriber (29 EUR/mo) signs up, logs in, gets real features.

### 1A. Supabase Auth
- Migration: `supabase/migrations/005_auth_and_entitlements.sql`
  - Link `crm_leads.auth_user_id` to `auth.users`
  - View `v_user_entitlements` (plan, limits, features per user)
  - RLS policies for authenticated users
- New Cloudflare env: `SUPABASE_SERVICE_ROLE_KEY`

### 1B. Auth API Endpoints
| File | Method | Purpose |
|------|--------|---------|
| `functions/api/auth/signup.ts` | POST | Create account, link to crm_leads |
| `functions/api/auth/login.ts` | POST | Login, set httpOnly cookies |
| `functions/api/auth/logout.ts` | POST | Clear cookies |
| `functions/api/auth/session.ts` | GET | Return user + plan + entitlements |
| `functions/api/auth/refresh.ts` | POST | Refresh JWT token |
| `functions/_middleware.ts` | — | Shared auth helper for all endpoints |

### 1C. Modify Stripe Webhook
- After checkout.session.completed + auth user exists:
  - Generate API key -> insert into `crm_api_keys`
  - Send welcome email WITH API key + dashboard link
- create-checkout.ts: pass `client_reference_id` = auth_user_id

### 1D. Login/Signup/Dashboard Pages
| Page | Routes | Purpose |
|------|--------|---------|
| `src/pages/[lang]/login.astro` | 24 | Email + password login |
| `src/pages/[lang]/signup.astro` | 24 | Create account |
| `src/pages/[lang]/dashboard/index.astro` | 24 | Plan, API key, usage, manage sub |

### 1E. Gated API Endpoints (Pro features)
| Endpoint | Free | Pro |
|----------|------|-----|
| `/api/v1/export?country=DE&format=csv` | 403 | Full CSV export |
| `/api/v1/net-salary?country=DE&gross=60000` | Teaser only | Full breakdown |
| `/api/v1/city-detail?city=berlin` | Basic | Extended data |
| `/api/v1/salary` | 100 req/hr | 10K req/day |

### 1F. UI Gating
- `src/components/ProGate.astro` — blur overlay + "Upgrade to Pro" CTA
- Header.astro: login/signup buttons or user avatar + plan badge
- Net salary calculator: free sees top-line, Pro sees full breakdown
- City pages: extended data gated behind ProGate

### 1G. API Key System
- `functions/api/dashboard/api-keys.ts` — CRUD for API keys
- Format: `esk_live_` + 32 hex chars
- Keys hashed (SHA-256) in DB, shown once at generation
- `scripts/reset-api-usage.mjs` + GitHub Action (daily reset)

### Phase 1 Files Summary
**CREATE (17 files):**
- supabase/migrations/005_auth_and_entitlements.sql
- functions/api/auth/signup.ts, login.ts, logout.ts, session.ts, refresh.ts
- functions/_middleware.ts
- functions/api/v1/export.ts, net-salary.ts, city-detail.ts
- functions/api/dashboard/api-keys.ts
- src/pages/[lang]/login.astro, signup.astro, dashboard/index.astro
- src/components/ProGate.astro
- scripts/reset-api-usage.mjs
- .github/workflows/daily-api-reset.yml

**MODIFY (7 files):**
- functions/api/stripe-webhook.ts (link auth, generate API key)
- functions/api/create-checkout.ts (pass auth user ID)
- functions/api/v1/salary.ts (API key validation)
- src/components/Header.astro (login/avatar)
- src/pages/[lang]/calculator/net-salary.astro (gate results)
- src/pages/[lang]/city/[city].astro (gate extended data)
- src/i18n/translations.ts + ui.ts (auth strings x24 langs)

---

## PHASE 2: Business Plan + PDF Reports — 4-5 days
**Goal**: Business subscriber (99 EUR/mo) gets PDF reports, bulk export, team access.

### Features
- **PDF Country Reports**: Pre-generated nightly, stored in Cloudflare R2, served via signed URLs
- **Bulk Export**: CSV/JSON/XLSX of multi-country salary data
- **Team Access**: 10 seats, invite by email, roles (owner/admin/member)
- **Gender Pay Gap**: Data and analysis per country (Business+ only)

### Files
- supabase/migrations/006_teams.sql
- functions/api/reports/country.ts, download.ts
- functions/api/v1/bulk-export.ts, gender-gap.ts
- functions/api/dashboard/team.ts, accept-invite.ts
- src/pages/[lang]/dashboard/team.astro, reports.astro
- scripts/generate-country-reports.mjs
- .github/workflows/nightly-reports.yml

---

## PHASE 3: API Developer Plans — 3-4 days
**Goal**: API Dev (49 EUR/mo) and API Biz (149 EUR/mo) get production API.

### Features
- **Rate limiting middleware** on all /api/v1/* via Cloudflare KV
- **API Dashboard**: usage charts, key management, code examples
- **SLA monitoring** for API Business (99.9% uptime)

### Files
- functions/api/v1/_middleware.ts (rate limit with KV)
- src/pages/[lang]/dashboard/api.astro
- src/pages/[lang]/salary-api/index.astro (update with auth instructions)
- scripts/api-health-check.mjs

---

## PHASE 4: Employer Plans — 5-6 days
**Goal**: Employer Starter (79 EUR/mo) and Pro (199 EUR/mo) get benchmarking tools.

### Features
- **Salary Benchmarking**: input job+country+salary, get percentile + competitiveness
- **Salary Bands**: recommended min/median/max per job per country
- **Pay Equity Analysis**: upload company data, get gap analysis (Pro only)
- **Custom Reports**: tailored PDF reports (Pro only)

### Files
- supabase/migrations/007_employer_features.sql
- functions/api/employer/benchmark.ts, salary-bands.ts, pay-equity.ts, custom-report.ts
- src/pages/[lang]/dashboard/employer/index.astro, pay-equity.astro

---

## PHASE 5: Country Report One-Time — 2-3 days
**Goal**: Single country report (29 EUR one-time) works end-to-end.

### Flow
1. User visits /premium/reports/germany/
2. Clicks "Buy Report" -> Stripe Checkout (one-time)
3. Webhook creates `report_purchases` row with download token
4. Email sent with download link
5. User downloads PDF (max 10 downloads, expires 90 days)

---

## PHASE 6: Polish + Conversion — 3-4 days
- 3-email onboarding sequence (welcome, tutorial, check-in)
- Upgrade nudges on free pages (contextual CTAs)
- Usage-based upgrade prompts (near rate limit -> show upgrade)
- Admin dashboard with real-time MRR, subscribers, churn

---

## Timeline Summary

| Phase | What | Days | Revenue |
|-------|------|------|---------|
| 1 | Auth + Pro features | 5-7 | Pro 29 EUR/mo |
| 2 | Business + PDF + Teams | 4-5 | Business 99 EUR/mo |
| 3 | API infrastructure | 3-4 | API Dev 49, Biz 149 EUR/mo |
| 4 | Employer tools | 5-6 | Employer 79, 199 EUR/mo |
| 5 | One-time reports | 2-3 | Country Report 29 EUR |
| 6 | Polish + conversion | 3-4 | Retention |
| **Total** | | **22-29 days** | **All 7 products** |

---

## Execution Rules
- Script-first for all i18n (24 languages)
- Build -> Deploy -> Index after every phase
- Never break existing public pages
- Test end-to-end before going live with each phase
- All auth cookies: httpOnly, Secure, SameSite=Strict
- API keys hashed in DB, shown once at generation
- SUPABASE_SERVICE_ROLE_KEY never exposed to client
