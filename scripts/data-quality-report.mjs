#!/usr/bin/env node
// Data quality report generator
// Checks for stale data, missing entries, outliers, and coverage gaps
// Run via: node scripts/data-quality-report.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const COUNTRIES = ['DE', 'FR', 'ES', 'NL', 'BE', 'IT', 'PT', 'PL', 'SE', 'AT', 'CH', 'LU', 'IE', 'DK', 'FI'];
const EXPERIENCE_LEVELS = ['junior', 'mid', 'senior', 'lead'];
const EXPECTED_JOBS = 21;

async function checkCoverage() {
  console.log('\n=== Data Coverage Report ===\n');

  let totalExpected = COUNTRIES.length * EXPECTED_JOBS * EXPERIENCE_LEVELS.length;
  let totalFound = 0;
  let missing = [];

  for (const country of COUNTRIES) {
    const { count, error } = await supabase
      .from('salary_data')
      .select('*', { count: 'exact', head: true })
      .eq('country_code', country);

    if (error) {
      console.warn(`  Could not check ${country}: ${error.message}`);
      continue;
    }

    const expected = EXPECTED_JOBS * EXPERIENCE_LEVELS.length;
    totalFound += (count || 0);

    if ((count || 0) < expected) {
      missing.push({ country, found: count || 0, expected });
    }

    console.log(`  ${country}: ${count || 0}/${expected} entries (${Math.round(((count || 0) / expected) * 100)}%)`);
  }

  console.log(`\n  Total: ${totalFound}/${totalExpected} entries (${Math.round((totalFound / totalExpected) * 100)}% coverage)`);

  if (missing.length > 0) {
    console.log('\n  Countries with gaps:');
    for (const m of missing) {
      console.log(`    ${m.country}: missing ${m.expected - m.found} entries`);
    }
  }
}

async function checkFreshness() {
  console.log('\n=== Data Freshness Report ===\n');

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { count: staleCount } = await supabase
    .from('salary_data')
    .select('*', { count: 'exact', head: true })
    .lt('updated_at', thirtyDaysAgo);

  console.log(`  Entries older than 30 days: ${staleCount || 0}`);

  const { count: totalCount } = await supabase
    .from('salary_data')
    .select('*', { count: 'exact', head: true });

  const freshPct = totalCount ? Math.round(((totalCount - (staleCount || 0)) / totalCount) * 100) : 0;
  console.log(`  Data freshness score: ${freshPct}%`);
}

async function checkOutliers() {
  console.log('\n=== Outlier Detection ===\n');

  // Check for suspiciously low salaries
  const { data: low } = await supabase
    .from('salary_data')
    .select('country_code, job_slug, experience_level, salary_median')
    .lt('salary_median', 5000)
    .order('salary_median');

  if (low && low.length > 0) {
    console.log(`  Suspiciously low salaries (< 5000):`);
    for (const row of low) {
      console.log(`    ${row.country_code}/${row.job_slug} (${row.experience_level}): ${row.salary_median}`);
    }
  } else {
    console.log('  No suspiciously low salaries found');
  }

  // Check for suspiciously high salaries
  const { data: high } = await supabase
    .from('salary_data')
    .select('country_code, job_slug, experience_level, salary_median')
    .gt('salary_median', 300000)
    .order('salary_median', { ascending: false });

  if (high && high.length > 0) {
    console.log(`  Suspiciously high salaries (> 300000):`);
    for (const row of high) {
      console.log(`    ${row.country_code}/${row.job_slug} (${row.experience_level}): ${row.salary_median}`);
    }
  } else {
    console.log('  No suspiciously high salaries found');
  }
}

async function main() {
  console.log(`Data Quality Report — ${new Date().toISOString()}`);
  console.log('='.repeat(50));

  await checkCoverage();
  await checkFreshness();
  await checkOutliers();

  console.log('\n' + '='.repeat(50));
  console.log('Report complete');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
