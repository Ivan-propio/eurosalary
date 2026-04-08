# Brand Migration Audit — EuroSalary.eu

**Last updated:** 2026-04-08
**Brand book version:** 1.0.0
**How to refresh:** `node scripts/build-tokens.mjs` regenerates `tokens.css` + `assets-manifest.json`. Re-run the grep commands in the "Audit commands" section below if you want fresh counts.

> This file is the **cheap-to-read state snapshot** of the brand rollout. Instead of re-scanning 17.9k pages every time we audit, read this. If it looks stale, refresh it with the commands below.

---

## Source of truth

```
brand/brand-tokens.json        ← edit this to change colors, fonts, spacing, etc.
scripts/build-tokens.mjs       ← generator (runs on prebuild/predev automatically)
src/styles/tokens.css          ← AUTO-GENERATED. Do not edit by hand.
brand/assets-manifest.json     ← AUTO-GENERATED. Enumerates all brand assets.
public/brand/*                 ← AUTO-COPIED from brand/final/ + brand/logos/
public/brand-tokens.json       ← published so admin dashboard can fetch it
public/brand/brandbook.html    ← published so /brand/brandbook.html works in prod
public/favicon.svg             ← synced from brand/final/favicon.svg
```

**Rule:** any change to brand tokens goes through `brand/brand-tokens.json`. Never edit `tokens.css` directly — your changes will be wiped on the next build.

---

## Rollout phase status

| Phase | Scope | Status |
|---|---|---|
| 0 | Audit + manifest architecture | ✅ done (this file) |
| 1 | Tokens architecture (JSON → generator → CSS) + brand assets in admin | ✅ done 2026-04-08 |
| 2 | Global chrome (BaseLayout fonts, Header/Footer logo swap) | ⏳ fonts done; Header/Footer logo swap pending |
| 3 | Homepage restyle using new brand tokens | ⏳ pending |
| 4 | Core templates (salary, country, compare, city) | ⏳ pending |
| 5 | Monetization pages (pricing, premium, enterprise) | ⏳ pending (needs Stripe E2E test) |
| 6 | Content + tools pages | ⏳ pending |
| 7 | Iconography + voice/tone (24-lang) | ⏳ pending |
| 8 | Final QA + deploy to main | ⏳ pending |

---

## Current state (2026-04-08)

### What's live on the new architecture
- `brand-tokens.json` exists and is the single source of truth
- `tokens.css` generated and imported at the top of `src/styles/global.css`
- Brand book tokens available as CSS vars: `--eu-blue`, `--eu-blue-light`, `--eu-yellow`, `--navy`, `--font-sans`, `--font-mono`, `--sp-*`, `--r-*`, `--shadow-*`, `--t-fast`/`--t-base`/`--t-slow`, etc.
- Legacy variable names (`--color-primary`, `--color-blue-600`, `--font-headline`, etc.) aliased to brand tokens in `tokens.css` — so any code using them picks up the brand values wherever the legacy vars are NOT shadowed by local `:root` overrides in global.css
- **Fonts migrated** — Public Sans removed; BaseLayout loads Inter 400-900 + JetBrains Mono per brand book
- **Favicons migrated** — `public/favicon.svg` synced from `brand/final/favicon.svg`
- **Admin dashboard** has a new `Brand Assets` section (`/admin/` → sidebar → Brand Assets) with:
  - Quick links to brandbook, brand-tokens.json, favicon
  - Logo library (6 assets: primary, dark, mono, icon-only, favicon, favicon-simple) — each downloadable
  - Color system (click-to-copy swatches for all brand/ink/surface/semantic colors)
  - Typography preview (Inter + JetBrains Mono)
- Build verified: 17,907 pages, 0 errors, +384 pages vs last deploy (no regression)

### What still uses old values
- **882 hardcoded hex color literals** across 57 files (pages + components). These are NOT using `var()` — they need to be migrated file-by-file in later phases.
- **197 font-family references** across 53 files — same pattern.
- Local `:root` block in `src/styles/global.css` still declares legacy color values inline (e.g. `--color-primary: #00071b`, `--color-blue-600: #0051d5`). These OVERRIDE the brand aliases in `tokens.css` due to CSS cascade order. Fonts have been removed from the local block.

**This is intentional.** Fase 1 = architecture only, zero visual regression on existing pages. Visual migration ships phase-by-phase behind the new tokens.

---

## Audit commands (run when refreshing this file)

```bash
cd eurosalary

# Count hardcoded hex colors by file
grep -rE "#[0-9a-fA-F]{6}\b" src/ --include="*.astro" --include="*.css" --include="*.ts" -c | sort -t: -k2 -rn | head -20

# Count font-family references
grep -rE "Public Sans|Inter|JetBrains|font-family" src/ --include="*.astro" --include="*.css" -c | sort -t: -k2 -rn | head -20

# Find files using the new brand vars (migration progress)
grep -rE "--eu-blue|--eu-yellow|--navy\b" src/ --include="*.astro" --include="*.css" -l

# Regenerate tokens + assets manifest
node scripts/build-tokens.mjs
```

### Snapshot from last audit (2026-04-08)

- **882** hardcoded hex codes across **57** files
- **197** font references across **53** files
- Top 5 offenders by hex count:
  - `city/[city].astro` — 36
  - `global.css` — 36 (legacy :root block)
  - `salary-transparency/[country].astro` — 44
  - `compare/country/[pair].astro` — 38
  - `pricing/employer.astro` — 38

---

## For future audits

When asked "¿cómo va el brand rollout?":
1. **Read this file first.** It's the manifest.
2. Check `brand/assets-manifest.json` for the current asset list + brand version.
3. Only re-grep the codebase if a phase was supposed to reduce hex counts and you need fresh numbers.
4. After any phase ships, update the status table above and the "current state" section. Bump `lastUpdated`.

## Future-proof bonus

Because everything flows from `brand-tokens.json`:
- **Next rebrand:** edit JSON → `npm run build:tokens` → deploy. Zero code edits needed.
- **Dark mode variant:** add a `brand-tokens.dark.json` and extend the generator to emit a `[data-theme=dark]` block. Architecture already supports it.
- **Multi-brand (EuroSalary US, Pawify theme, etc.):** clone the JSON, point the generator at an env flag. No refactor required.
- **Figma sync:** the generator can emit Figma Tokens JSON format from the same source. One-liner addition when needed.
- **Guardrail (future):** add `scripts/lint-no-hardcoded-colors.mjs` to CI so no new hex literals sneak into components. Not blocking Fase 1.
