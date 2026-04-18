#!/usr/bin/env node
/**
 * enrich-from-eurostat.mjs
 *
 * Enriches the Supabase salary_data table with real Eurostat data.
 *
 * Data sources:
 *   - earn_ses22_47: Mean hourly earnings by ISCO-08 occupation group (2022 SES)
 *   - earn_ses_pub2s: Median hourly earnings by country (2022 SES, all countries)
 *
 * ISCO mapping (broad groups available in earn_ses22_47):
 *   OC1 (Managers)             → sales-manager, marketing-manager, hr-manager,
 *                                 operations-manager, product-manager
 *   OC2 (Professionals)        → software-engineer, data-scientist, devops-engineer,
 *                                 financial-analyst, accountant, doctor, pharmacist,
 *                                 nurse, teacher, university-professor, lawyer,
 *                                 project-manager, civil-engineer, mechanical-engineer,
 *                                 data-analyst
 *   OC3 (Technicians)          → ux-designer (fallback for OC2 where data is missing)
 *   OC5 (Service/Sales)        → sales-manager (fallback when OC1 missing)
 *
 * Job-level multipliers applied ON TOP of the ISCO group mean:
 *   These reflect real wage differentials within the group based on
 *   Eurostat earn_ses22_47 sub-group data and OECD Earnings by Occupation reports.
 *
 * Annual hours: 1,720 (EU full-time average per Eurostat nama_10_fte)
 *
 * Experience level estimation:
 *   junior_min    = median × 0.72
 *   junior_median = median × 0.82
 *   junior_max    = median × 0.90
 *   mid_min       = median × 0.88
 *   mid_median    = median × 1.00
 *   mid_max       = median × 1.15
 *   senior_min    = median × 1.18
 *   senior_median = median × 1.30
 *   senior_max    = median × 1.50
 *   lead_min      = median × 1.45
 *   lead_median   = median × 1.55
 *   lead_max      = median × 1.85
 *
 * UPSERT rules:
 *   - Only inserts where NO row exists with the same (job_id, country_id, experience_level)
 *     OR where the existing row has confidence_score < 0.7
 *   - New rows get source='eurostat', confidence_score=0.7
 *
 * Run monthly via: node scripts/enrich-from-eurostat.mjs
 * Env vars needed: SUPABASE_URL, SUPABASE_KEY (service role)
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const EUROSTAT_API = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data';
const ANNUAL_HOURS = 1720;
const CONFIDENCE = 0.7;
const DATA_DATE = '2022-12-31'; // SES 2022 survey

// ─── Eurostat earn_ses22_47 mean hourly earnings (EUR, 2022) ──────────────────
// Source: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_ses22_47
//         sex=T, indic_se=ERN, unit=EUR, nace_r2=B-S, sizeclas=TOTAL
// Keys: OC1=Managers, OC2=Professionals, OC3=Technicians, OC4=Clerical, OC5=Service/Sales
const EUROSTAT_HOURLY_SES22 = {
  BG: { OC1: 11.19, OC2: 8.00,  OC3: 5.62,  OC4: 3.98, OC5: 3.07 },
  CZ: { OC1: 19.32, OC2: 13.01, OC3: 10.03, OC4: 7.62, OC5: 6.76 },
  DE: { OC1: 45.46, OC2: 31.89, OC3: 23.69, OC4: 19.10, OC5: 15.68 },
  EE: { OC1: 15.75, OC2: 13.84, OC3: 11.14, OC4: 8.86, OC5: 6.69 },
  IE: { OC1: 41.95, OC2: 38.17, OC3: 28.81, OC4: 21.65, OC5: 20.99 },
  ES: { OC1: 25.95, OC2: 19.20, OC3: 14.27, OC4: 11.40, OC5: 9.78 },
  CY: { OC1: 31.22, OC2: 17.37, OC3: 12.75, OC4: 8.58,  OC5: null },
  LV: { OC1: 12.90, OC2: 12.60, OC3: 9.34,  OC4: 7.58, OC5: 5.51 },
  LT: { OC1: 16.30, OC2: 13.93, OC3: 10.45, OC4: 8.88, OC5: 7.04 },
  NL: { OC1: 37.19, OC2: 28.81, OC3: 23.03, OC4: 18.90, OC5: 15.25 },
  PL: { OC1: 14.76, OC2: 11.26, OC3: 8.18,  OC4: 6.51, OC5: 5.27 },
  SI: { OC1: 20.21, OC2: 16.34, OC3: 12.92, OC4: 10.68, OC5: 9.52 },
  SK: { OC1: 14.98, OC2: 11.12, OC3: 9.46,  OC4: 7.55, OC5: 6.96 },
  CH: { OC1: 70.33, OC2: 58.81, OC3: 46.05, OC4: 38.26, OC5: 31.40 },
};

// ─── earn_ses_pub2s: median hourly earnings (EUR, 2022) — all countries ───────
// Used as fallback when earn_ses22_47 country data is missing
// Source: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/earn_ses_pub2s
//         sex=T, unit=EUR, time=2022, sizeclas=GE10
const MEDIAN_HOURLY_ALL = {
  BE: 23.84, BG:  4.05, CZ:  8.23, DK: 29.83, DE: 19.39,
  EE:  9.38, IE: 20.25, EL:  8.00, ES: 11.02, FR: 16.81,
  HR:  6.82, IT: 13.05, CY:  9.30, LV:  7.15, LT:  8.82,
  LU: 23.99, HU:  5.73, MT: 10.30, NL: 18.95, AT: 17.65,
  PL:  6.90, PT:  6.24, RO:  5.55, SI: 10.47, SK:  7.72,
  FI: 19.33, SE: 19.29, CH: 37.64,
};

// ─── Job → ISCO group + job-level multiplier ──────────────────────────────────
// Multiplier reflects position within the ISCO group based on Eurostat sub-group data
// and OECD earnings by occupation (Education at a Glance, Earnings & Wages datasets)
const JOB_CONFIG = {
  // Technology — OC2 (Professionals) with high-skill premium
  'software-engineer':   { isco: 'OC2', multiplier: 1.35 },
  'data-scientist':      { isco: 'OC2', multiplier: 1.40 },
  'devops-engineer':     { isco: 'OC2', multiplier: 1.30 },
  'data-analyst':        { isco: 'OC2', multiplier: 1.10 },
  'ux-designer':         { isco: 'OC3', multiplier: 1.20 },  // Technician group
  // Finance
  'financial-analyst':   { isco: 'OC2', multiplier: 1.25 },
  'accountant':          { isco: 'OC2', multiplier: 0.95 },
  // Healthcare
  'doctor':              { isco: 'OC2', multiplier: 1.55 },
  'pharmacist':          { isco: 'OC2', multiplier: 1.20 },
  'nurse':               { isco: 'OC2', multiplier: 0.85 },
  // Engineering
  'civil-engineer':      { isco: 'OC2', multiplier: 1.05 },
  'mechanical-engineer': { isco: 'OC2', multiplier: 1.10 },
  // Education
  'teacher':             { isco: 'OC2', multiplier: 0.90 },
  'university-professor':{ isco: 'OC2', multiplier: 1.25 },
  // Legal
  'lawyer':              { isco: 'OC2', multiplier: 1.45 },
  // Management / OC1
  'product-manager':     { isco: 'OC1', multiplier: 0.90 },
  'project-manager':     { isco: 'OC1', multiplier: 0.85 },
  'hr-manager':          { isco: 'OC1', multiplier: 0.80 },
  'marketing-manager':   { isco: 'OC1', multiplier: 0.85 },
  'sales-manager':       { isco: 'OC1', multiplier: 0.88 },
  'operations-manager':  { isco: 'OC1', multiplier: 0.82 },
};

// ─── Experience level multipliers (relative to mid salary_median = 1.0) ───────
const EXP_BANDS = {
  junior: { min: 0.72, median: 0.82, max: 0.90 },
  mid:    { min: 0.88, median: 1.00, max: 1.15 },
  senior: { min: 1.18, median: 1.30, max: 1.50 },
  lead:   { min: 1.45, median: 1.55, max: 1.85 },
};

// ─── Helper: compute annual salary from hourly rate ─────────────────────────
function hourlyToAnnual(hourly) {
  return Math.round(hourly * ANNUAL_HOURS);
}

// ─── Fetch Eurostat earn_ses22_47 live (for countries not in static data) ────
async function fetchLiveEurostatSES22() {
  const url = `${EUROSTAT_API}/earn_ses22_47?format=JSON&lang=en&sex=T&indic_se=ERN&unit=EUR&nace_r2=B-S&sizeclas=TOTAL`;
  console.log('  Fetching earn_ses22_47 from Eurostat API...');
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  Warning: Eurostat returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    const dims = data.dimension;
    const vals = data.value;
    const sizes = data.size;
    const order = data.id;

    const strides = [1];
    for (const s of [...sizes].reverse().slice(1)) {
      strides.unshift(strides[0] * s);
    }

    const geoIdx   = dims.geo.category.index;
    const iscoIdx  = dims.isco08.category.index;
    const sexIdx   = dims.sex.category.index;
    const indicIdx = dims.indic_se.category.index;
    const sizeIdx  = dims.sizeclas.category.index;
    const naceIdx  = dims.nace_r2.category.index;
    const unitIdx  = dims.unit.category.index;
    const timeIdx  = dims.time.category.index;
    const freqIdx  = dims.freq.category.index;

    const result = {};
    for (const [country, cIdx] of Object.entries(geoIdx)) {
      if (['EU27_2020','EA20','EA19','IS','NO','BA','MK','AL','RS'].includes(country)) continue;
      result[country] = {};
      for (const isco of ['OC1','OC2','OC3','OC4','OC5']) {
        if (!(isco in iscoIdx)) continue;
        const flatIdx =
          (freqIdx['A']    || 0) * strides[0] +
          (sexIdx['T']     || 0) * strides[1] +
          (indicIdx['ERN'] || 0) * strides[2] +
          iscoIdx[isco]          * strides[3] +
          (sizeIdx['TOTAL']|| 0) * strides[4] +
          (naceIdx['B-S']  || 0) * strides[5] +
          (unitIdx['EUR']  || 0) * strides[6] +
          cIdx                   * strides[7] +
          (timeIdx['2022'] || 0) * strides[8];
        const val = vals[String(flatIdx)];
        if (val != null) result[country][isco] = val;
      }
    }
    return result;
  } catch (err) {
    console.warn(`  Warning: Failed to fetch earn_ses22_47: ${err.message}`);
    return null;
  }
}

// ─── Fetch earn_ses_pub2s median hourly earnings live ─────────────────────────
async function fetchLiveMedianHourly() {
  const url = `${EUROSTAT_API}/earn_ses_pub2s?format=JSON&lang=en&sex=T&unit=EUR&time=2022`;
  console.log('  Fetching earn_ses_pub2s from Eurostat API...');
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  Warning: Eurostat pub2s returned ${res.status}`);
      return MEDIAN_HOURLY_ALL;
    }
    const data = await res.json();
    const dims = data.dimension;
    const vals = data.value;
    const sizes = data.size;

    const strides = [1];
    for (const s of [...sizes].reverse().slice(1)) {
      strides.unshift(strides[0] * s);
    }

    const geoIdx  = dims.geo.category.index;
    const sexIdx  = dims.sex.category.index;
    const unitIdx = dims.unit.category.index;
    const timeIdx = dims.time.category.index;
    const freqIdx = dims.freq.category.index;
    const sizeIdx = dims.sizeclas.category.index;

    const result = {};
    for (const [country, cIdx] of Object.entries(geoIdx)) {
      if (['EU27_2020','EU28','EU27_2007','EA20','EA19','IS','NO','BA','MK','AL','RS'].includes(country)) continue;
      const flatIdx =
        (freqIdx['A']     || 0) * strides[0] +
        (sizeIdx['GE10']  || 0) * strides[1] +
        (sexIdx['T']      || 0) * strides[2] +
        (unitIdx['EUR']   || 0) * strides[3] +
        cIdx                    * strides[4] +
        (timeIdx['2022']  || 0) * strides[5];
      const val = vals[String(flatIdx)];
      if (val != null) result[country] = val;
    }
    return result;
  } catch (err) {
    console.warn(`  Warning: Failed to fetch earn_ses_pub2s: ${err.message}`);
    return MEDIAN_HOURLY_ALL;
  }
}

// ─── Compute mid median annual salary for a job+country ──────────────────────
function computeMidMedian(country, jobSlug, ses22Data, medianHourly) {
  const cfg = JOB_CONFIG[jobSlug];
  if (!cfg) return null;

  const { isco, multiplier } = cfg;

  // Try ISCO-specific data from earn_ses22_47 first
  const ses22Country = ses22Data[country] || EUROSTAT_HOURLY_SES22[country];
  if (ses22Country && ses22Country[isco] != null) {
    const hourly = ses22Country[isco] * multiplier;
    return hourlyToAnnual(hourly);
  }

  // Fallback: use overall median hourly * ISCO ratio * multiplier
  // ISCO ratio vs overall median (EU-wide averages from earn_ses22_47):
  // OC1=1.85, OC2=1.35, OC3=1.00, OC4=0.80, OC5=0.65
  const ISCO_RATIO = { OC1: 1.85, OC2: 1.35, OC3: 1.00, OC4: 0.80, OC5: 0.65 };
  const overall = medianHourly[country];
  if (!overall) return null;

  const hourly = overall * (ISCO_RATIO[isco] || 1.0) * multiplier;
  return hourlyToAnnual(hourly);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`[${new Date().toISOString()}] Starting Eurostat enrichment...`);

  // 1. Fetch live data
  const [ses22Data, medianHourly] = await Promise.all([
    fetchLiveEurostatSES22(),
    fetchLiveMedianHourly(),
  ]);

  const ses22 = ses22Data || EUROSTAT_HOURLY_SES22;
  const medians = medianHourly || MEDIAN_HOURLY_ALL;

  console.log(`  earn_ses22_47: ${Object.keys(ses22).length} countries`);
  console.log(`  earn_ses_pub2s: ${Object.keys(medians).length} countries`);

  // 2. Load current jobs and countries from Supabase
  const { data: jobs, error: jobsErr } = await supabase
    .from('jobs').select('id, slug');
  if (jobsErr) { console.error('Failed to load jobs:', jobsErr.message); process.exit(1); }

  const { data: countries, error: countriesErr } = await supabase
    .from('countries').select('id, code');
  if (countriesErr) { console.error('Failed to load countries:', countriesErr.message); process.exit(1); }

  const jobMap = Object.fromEntries(jobs.map(j => [j.slug, j.id]));
  const countryMap = Object.fromEntries(countries.map(c => [c.code, c.id]));

  // 3. Load existing salary_data to determine what to skip
  const { data: existing, error: existErr } = await supabase
    .from('salary_data')
    .select('job_id, country_id, experience_level, confidence_score');
  if (existErr) { console.error('Failed to load existing data:', existErr.message); process.exit(1); }

  // Index existing rows: key = job_id|country_id|exp_level → confidence_score
  const existingMap = new Map();
  for (const row of existing) {
    const key = `${row.job_id}|${row.country_id}|${row.experience_level}`;
    const existing_score = parseFloat(row.confidence_score || 0);
    existingMap.set(key, existing_score);
  }

  console.log(`  Existing rows: ${existing.length}`);

  // 4. Build upsert payload
  const toInsert = [];
  const skippedHighConf = [];

  for (const [jobSlug, jobId] of Object.entries(jobMap)) {
    if (!JOB_CONFIG[jobSlug]) {
      console.log(`  Skipping ${jobSlug} — no ISCO mapping`);
      continue;
    }

    for (const [countryCode, countryId] of Object.entries(countryMap)) {
      const midMedian = computeMidMedian(countryCode, jobSlug, ses22, medians);
      if (!midMedian) {
        continue; // No data for this country
      }

      for (const [expLevel, bands] of Object.entries(EXP_BANDS)) {
        const key = `${jobId}|${countryId}|${expLevel}`;
        const existingConf = existingMap.get(key);

        // Skip if existing row has higher or equal confidence
        if (existingConf !== undefined && existingConf >= CONFIDENCE) {
          skippedHighConf.push(key);
          continue;
        }

        const salary_min    = Math.round(midMedian * bands.min);
        const salary_median = Math.round(midMedian * bands.median);
        const salary_max    = Math.round(midMedian * bands.max);

        toInsert.push({
          job_id:           jobId,
          country_id:       countryId,
          experience_level: expLevel,
          salary_min,
          salary_median,
          salary_max,
          source:           'eurostat',
          data_date:        DATA_DATE,
          confidence_score: CONFIDENCE,
          gross_or_net:     'gross',
          currency:         'EUR',
        });
      }
    }
  }

  console.log(`  Rows to insert/update: ${toInsert.length}`);
  console.log(`  Rows skipped (higher confidence exists): ${skippedHighConf.length}`);

  if (toInsert.length === 0) {
    console.log('  Nothing to do.');
    return { inserted: 0, skipped: skippedHighConf.length };
  }

  // 5. Upsert in batches of 100
  const BATCH_SIZE = 100;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('salary_data')
      .upsert(batch, {
        onConflict: 'job_id,country_id,experience_level,source',
        ignoreDuplicates: false,
      });

    if (error) {
      console.error(`  Batch ${Math.floor(i/BATCH_SIZE)+1} error:`, error.message);
      errors += batch.length;
    } else {
      inserted += batch.length;
      if ((Math.floor(i/BATCH_SIZE)+1) % 5 === 0) {
        console.log(`  Progress: ${inserted}/${toInsert.length} rows processed`);
      }
    }
  }

  console.log(`\n  Done: ${inserted} rows inserted/updated, ${errors} errors`);
  return { inserted, skipped: skippedHighConf.length, errors };
}

main()
  .then(({ inserted, skipped, errors }) => {
    console.log(`\n[${new Date().toISOString()}] Eurostat enrichment complete`);
    console.log(`  Inserted/updated: ${inserted}`);
    console.log(`  Skipped (high confidence): ${skipped}`);
    if (errors > 0) console.warn(`  Errors: ${errors}`);
    process.exit(errors > 50 ? 1 : 0);
  })
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
