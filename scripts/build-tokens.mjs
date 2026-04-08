#!/usr/bin/env node
/**
 * build-tokens.mjs — generates src/styles/tokens.css from brand/brand-tokens.json
 *
 * This is the single choke-point of the brand system. Edit brand-tokens.json,
 * run this script, and every component that consumes CSS custom properties
 * picks up the change. Legacy variable names (--color-blue-600, --font-headline,
 * etc.) are emitted as aliases so pre-brandbook code keeps working.
 *
 * Runs automatically before every build (see package.json `prebuild`).
 * Also generates brand/assets-manifest.json — used by the admin dashboard
 * to enumerate downloadable brand assets without re-scanning disk.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TOKENS_JSON = join(ROOT, 'brand', 'brand-tokens.json');
const TOKENS_CSS = join(ROOT, 'src', 'styles', 'tokens.css');
const ASSETS_DIR = join(ROOT, 'brand', 'final');
const LOGOS_DIR = join(ROOT, 'brand', 'logos');
const PUBLIC_BRAND = join(ROOT, 'public', 'brand');
const MANIFEST = join(ROOT, 'brand', 'assets-manifest.json');

// ---- load ----
const tokens = JSON.parse(readFileSync(TOKENS_JSON, 'utf8'));

// ---- CSS emission ----
const lines = [];
lines.push('/*');
lines.push(' * tokens.css — AUTO-GENERATED from brand/brand-tokens.json');
lines.push(' * DO NOT EDIT BY HAND. Edit brand/brand-tokens.json and run:');
lines.push(' *   npm run build:tokens');
lines.push(` * Generated: ${new Date().toISOString()}`);
lines.push(` * Brand version: ${tokens.meta.version}`);
lines.push(' */');
lines.push('');
lines.push(':root {');
lines.push('  /* ==== Brand colors ==== */');
for (const [k, v] of Object.entries(tokens.color.brand)) lines.push(`  --${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Ink / text ==== */');
for (const [k, v] of Object.entries(tokens.color.ink)) lines.push(`  --${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Surfaces ==== */');
for (const [k, v] of Object.entries(tokens.color.surface)) lines.push(`  --${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Semantic ==== */');
for (const [k, v] of Object.entries(tokens.color.semantic)) lines.push(`  --${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Typography ==== */');
lines.push(`  --font-sans: ${tokens.font.sans};`);
lines.push(`  --font-mono: ${tokens.font.mono};`);
lines.push('');
lines.push('  /* ==== Spacing (4px base) ==== */');
for (const [k, v] of Object.entries(tokens.spacing)) lines.push(`  --sp-${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Radius ==== */');
for (const [k, v] of Object.entries(tokens.radius)) lines.push(`  --r-${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Shadows ==== */');
for (const [k, v] of Object.entries(tokens.shadow)) lines.push(`  --shadow-${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Motion ==== */');
for (const [k, v] of Object.entries(tokens.motion)) lines.push(`  --${k}: ${v};`);
lines.push('');
lines.push('  /* ==== Legacy aliases — backwards compat for pre-brandbook code ====');
lines.push('   * Remove as pages are migrated. See brand/brand-tokens.json legacyAliases. */');
const allColorTokens = { ...tokens.color.brand, ...tokens.color.ink, ...tokens.color.surface, ...tokens.color.semantic };
for (const [legacy, target] of Object.entries(tokens.legacyAliases)) {
  if (legacy.startsWith('--font')) {
    lines.push(`  ${legacy}: var(--font-${target});`);
  } else if (legacy === 'note') {
    continue;
  } else {
    if (!(target in allColorTokens)) {
      console.warn(`[build-tokens] WARN legacy alias ${legacy} → ${target} not found in color tokens`);
      continue;
    }
    lines.push(`  ${legacy}: var(--${target});`);
  }
}
lines.push('}');
lines.push('');

// ---- write CSS ----
mkdirSync(dirname(TOKENS_CSS), { recursive: true });
writeFileSync(TOKENS_CSS, lines.join('\n'), 'utf8');
console.log(`[build-tokens] wrote ${relative(ROOT, TOKENS_CSS)}`);

// ---- copy brand assets to public/brand/ ----
mkdirSync(PUBLIC_BRAND, { recursive: true });
const copyDir = (src, dst) => {
  if (!existsSync(src)) return [];
  mkdirSync(dst, { recursive: true });
  const out = [];
  for (const f of readdirSync(src)) {
    const sp = join(src, f);
    if (!statSync(sp).isFile()) continue;
    if (!/\.(svg|png|ico|jpg|jpeg|webp)$/i.test(f)) continue;
    const dp = join(dst, f);
    writeFileSync(dp, readFileSync(sp));
    out.push({ src: relative(ROOT, sp), public: `/brand/${f}`, name: f });
  }
  return out;
};
const finalAssets = copyDir(ASSETS_DIR, PUBLIC_BRAND);
const logoAssets = copyDir(LOGOS_DIR, join(PUBLIC_BRAND, 'explorations'));
console.log(`[build-tokens] copied ${finalAssets.length} final + ${logoAssets.length} exploration assets to public/brand/`);

// also update root favicon.svg if we have one
const rootFavicon = join(ROOT, 'public', 'favicon.svg');
const brandFavicon = join(ASSETS_DIR, 'favicon.svg');
if (existsSync(brandFavicon)) {
  writeFileSync(rootFavicon, readFileSync(brandFavicon));
  console.log(`[build-tokens] synced public/favicon.svg from brand/final/favicon.svg`);
}

// publish brand-tokens.json at site root (consumed by admin dashboard fetch)
writeFileSync(join(ROOT, 'public', 'brand-tokens.json'), JSON.stringify(tokens, null, 2));
// publish brand book HTML so /brand/brandbook.html works in prod
const brandbookSrc = join(ROOT, 'brand', 'brandbook.html');
if (existsSync(brandbookSrc)) {
  writeFileSync(join(PUBLIC_BRAND, 'brandbook.html'), readFileSync(brandbookSrc));
}
console.log('[build-tokens] published brand-tokens.json + brandbook.html to public/');

// ---- emit assets manifest (consumed by admin dashboard, cheap future audits) ----
const manifest = {
  generated: new Date().toISOString(),
  brandVersion: tokens.meta.version,
  colors: tokens.color,
  fonts: tokens.font,
  assets: {
    final: finalAssets,
    explorations: logoAssets.map((a) => ({ ...a, public: a.public.replace('/brand/', '/brand/explorations/') })),
  },
};
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`[build-tokens] wrote ${relative(ROOT, MANIFEST)}`);
console.log('[build-tokens] done ✓');
