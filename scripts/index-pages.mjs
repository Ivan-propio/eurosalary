#!/usr/bin/env node
/**
 * index-pages.mjs — Submit new/updated pages to search engines after deploy
 *
 * Usage:
 *   node scripts/index-pages.mjs                    # Submit full sitemap
 *   node scripts/index-pages.mjs --urls url1 url2   # Submit specific URLs
 *
 * Methods:
 *   1. IndexNow API (Bing, Yandex, Seznam, Naver — instant)
 *   2. Google Search Console sitemap ping (via API if available)
 *   3. Sitemap ping fallback for other engines
 */

const SITE = 'https://eurosalary.eu';
const INDEXNOW_KEY = 'd4f8e2a1b3c5967082e4f1a9d7b6c3e5';
const SITEMAP_URL = `${SITE}/sitemap-index.xml`;

async function submitIndexNow(urls) {
  // Batch POST to IndexNow (max 10,000 per request)
  const batches = [];
  for (let i = 0; i < urls.length; i += 500) {
    batches.push(urls.slice(i, i + 500));
  }

  let totalSubmitted = 0;
  let successCount = 0;
  let failCount = 0;

  for (const batch of batches) {
    const body = {
      host: 'eurosalary.eu',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    };

    try {
      const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      });
      if (res.status === 200 || res.status === 202) {
        successCount += batch.length;
      } else {
        failCount += batch.length;
      }
      totalSubmitted += batch.length;
    } catch (err) {
      failCount += batch.length;
    }

    // Rate limit: small delay between batches
    await new Promise(r => setTimeout(r, 200));
  }

  // If batch POST fails, try direct GET for key pages
  if (failCount > 0) {
    console.log(`  Batch POST: ${successCount} OK, ${failCount} failed. Trying GET for key pages...`);
    const keyPages = urls.filter(u =>
      u.match(/\/(en|fr|de|es|nl|pl|it|pt)\/(pricing|country|compare|calculator|for-employers|for-recruiters|enterprise|partners|salary-api)\/?$/) ||
      u.match(/\/(en|fr|de|es|nl|pl|it|pt)\/?$/)
    ).slice(0, 100);

    let getOk = 0;
    for (const url of keyPages) {
      try {
        const r = await fetch(`https://api.indexnow.org/IndexNow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`);
        if (r.status === 200) getOk++;
      } catch {}
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(`  GET fallback: ${getOk}/${keyPages.length} key pages submitted OK`);
  } else {
    console.log(`  All ${successCount} URLs submitted successfully`);
  }

  return totalSubmitted;
}

async function pingSearchEngines() {
  const engines = [
    { name: 'Google', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
    { name: 'Bing', url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
  ];

  for (const engine of engines) {
    try {
      const res = await fetch(engine.url);
      console.log(`  ${engine.name} sitemap ping: HTTP ${res.status}`);
    } catch (err) {
      console.log(`  ${engine.name} sitemap ping: ${err.message}`);
    }
  }
}

async function extractUrlsFromSitemap() {
  const fs = await import('fs');
  const path = await import('path');
  const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-0.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.log('  No sitemap-0.xml found in dist/. Run astro build first.');
    return [];
  }

  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const regex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    // Only grab primary URLs (not xhtml:link alternates)
    urls.push(match[1]);
  }

  // Deduplicate
  return [...new Set(urls)];
}

async function main() {
  const args = process.argv.slice(2);
  let urls;

  console.log('=== EuroSalary Search Engine Indexing ===\n');

  if (args[0] === '--urls') {
    urls = args.slice(1);
    console.log(`Submitting ${urls.length} specific URLs...\n`);
  } else {
    console.log('Extracting URLs from sitemap...');
    urls = await extractUrlsFromSitemap();
    console.log(`Found ${urls.length} URLs in sitemap.\n`);
  }

  if (urls.length === 0) {
    console.log('No URLs to submit.');
    return;
  }

  // 1. IndexNow (instant indexing for Bing, Yandex, etc.)
  console.log('1. IndexNow API (Bing, Yandex, Seznam, Naver):');
  await submitIndexNow(urls);

  // 2. Sitemap pings
  console.log('\n2. Sitemap pings:');
  await pingSearchEngines();

  console.log('\n=== Done! ===');
  console.log(`Submitted ${urls.length} URLs via IndexNow + sitemap pings.`);
  console.log('Google will also pick up changes via Search Console (sitemap auto-refresh).');
}

main().catch(console.error);
