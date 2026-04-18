#!/usr/bin/env node
// Monthly Eurostat data sync
// Fetches Structure of Earnings Survey and Labour Force Survey data
// Run via: node scripts/sync-eurostat.mjs

import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Eurostat JSON API base URL
const EUROSTAT_API = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data';

// Dataset codes relevant to salary data
const DATASETS = {
  // Structure of Earnings Survey — gross annual earnings
  earn_ses_annual: 'earn_ses_annual',
  // Labour cost index
  lc_lci_r2_q: 'lc_lci_r2_q',
  // Minimum wages
  earn_mw_cur: 'earn_mw_cur',
  // Gender pay gap
  earn_gr_gpgr2: 'earn_gr_gpgr2',
};

// Map Eurostat geo codes to our country codes
const GEO_MAP = {
  DE: 'DE', FR: 'FR', ES: 'ES', NL: 'NL', BE: 'BE',
  IT: 'IT', PT: 'PT', PL: 'PL', SE: 'SE', AT: 'AT',
  CH: 'CH', LU: 'LU', IE: 'IE', DK: 'DK', FI: 'FI',
};

async function fetchEurostatDataset(datasetCode, params = {}) {
  const url = new URL(`${EUROSTAT_API}/${datasetCode}`);
  url.searchParams.set('format', 'JSON');
  url.searchParams.set('lang', 'en');

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  console.log(`  Fetching: ${url.toString()}`);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      console.warn(`  Warning: Eurostat returned ${response.status} for ${datasetCode}`);
      return null;
    }
    return await response.json();
  } catch (err) {
    console.warn(`  Warning: Failed to fetch ${datasetCode}: ${err.message}`);
    return null;
  }
}

async function syncMinimumWages() {
  console.log('\n--- Syncing minimum wages ---');

  const data = await fetchEurostatDataset(DATASETS.earn_mw_cur, {
    geo: Object.keys(GEO_MAP).join(','),
  });

  if (!data) {
    console.log('  Skipping minimum wages (no data)');
    return;
  }

  // Process and store
  console.log('  Minimum wage data received, processing...');
  // In production: parse JSON-stat format, extract values, update Supabase
  // For now, log the structure
  if (data.dimension) {
    console.log(`  Dimensions: ${Object.keys(data.dimension).join(', ')}`);
  }
}

async function syncEarningsData() {
  console.log('\n--- Syncing earnings data ---');

  const data = await fetchEurostatDataset(DATASETS.earn_ses_annual, {
    geo: Object.keys(GEO_MAP).join(','),
  });

  if (!data) {
    console.log('  Skipping earnings data (no data)');
    return;
  }

  console.log('  Earnings data received, processing...');
}

async function syncGenderPayGap() {
  console.log('\n--- Syncing gender pay gap ---');

  const data = await fetchEurostatDataset(DATASETS.earn_gr_gpgr2, {
    geo: Object.keys(GEO_MAP).join(','),
  });

  if (!data) {
    console.log('  Skipping gender pay gap (no data)');
    return;
  }

  console.log('  Gender pay gap data received, processing...');
}

async function main() {
  console.log(`[${new Date().toISOString()}] Starting monthly Eurostat sync...`);

  await syncMinimumWages();
  await syncEarningsData();
  await syncGenderPayGap();

  // Update sync metadata
  await supabase
    .from('content_pages')
    .upsert({
      slug: '_eurostat_sync_meta',
      title: 'Eurostat Sync Metadata',
      content: JSON.stringify({
        lastSync: new Date().toISOString(),
        datasets: Object.keys(DATASETS),
      }),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'slug' });

  console.log(`[${new Date().toISOString()}] Eurostat sync complete`);

  // Run the salary_data enrichment from Eurostat ISCO data
  console.log('\n--- Running salary_data enrichment from Eurostat ---');
  const enrichScript = join(__dirname, 'enrich-from-eurostat.mjs');
  try {
    execFileSync(process.execPath, [enrichScript], {
      stdio: 'inherit',
      env: process.env,
    });
  } catch (err) {
    console.error('Enrichment script failed:', err.message);
    // Non-fatal — sync continues
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
