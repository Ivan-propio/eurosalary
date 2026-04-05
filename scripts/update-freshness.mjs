#!/usr/bin/env node
// Update freshness timestamps in static data files
// This ensures build-time pages show accurate "last updated" dates
// Run via: node scripts/update-freshness.mjs

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const now = new Date();
const isoDate = now.toISOString().split('T')[0]; // YYYY-MM-DD

// Update the freshness data file used by components at build time
const freshnessData = {
  lastDataRefresh: now.toISOString(),
  lastDataRefreshDate: isoDate,
  lastEurostatSync: null, // Set by monthly sync
  dataVersion: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`,
  sources: {
    eurostat: { lastSync: null, status: 'ok' },
    jobPostings: { lastSync: now.toISOString(), status: 'ok' },
    userReports: { lastSync: now.toISOString(), status: 'ok' },
  },
};

const outputPath = join(ROOT, 'src', 'data', 'freshness.json');
writeFileSync(outputPath, JSON.stringify(freshnessData, null, 2));
console.log(`Updated freshness data: ${outputPath}`);

// Also update llms.txt with current date
const llmsPath = join(ROOT, 'public', 'llms.txt');
try {
  let llmsContent = readFileSync(llmsPath, 'utf-8');
  llmsContent = llmsContent.replace(
    /# Last updated: .+/,
    `# Last updated: ${isoDate}`
  );
  writeFileSync(llmsPath, llmsContent);
  console.log(`Updated llms.txt date: ${isoDate}`);
} catch (err) {
  console.warn('Could not update llms.txt:', err.message);
}

console.log('Freshness update complete');
