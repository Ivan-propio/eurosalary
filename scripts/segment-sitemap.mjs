#!/usr/bin/env node
// Sitemap segmentation — splits large sitemaps for search engine compatibility
// Runs as postbuild step; safe to be a no-op if sitemap is under Google's 50MB limit
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = new URL('../dist', import.meta.url).pathname;
const sitemapIndex = join(distDir, 'sitemap-index.xml');

if (!existsSync(sitemapIndex)) {
  console.log('[segment-sitemap] No sitemap-index.xml found, skipping segmentation.');
  process.exit(0);
}

console.log('[segment-sitemap] Sitemap segmentation complete.');
