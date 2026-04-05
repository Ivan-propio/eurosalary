#!/usr/bin/env node
// Send weekly newsletter to all subscribers via Resend
// Reads content from tmp/newsletter.json, fetches subscribers from Supabase

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_API_KEY) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const resend = new Resend(RESEND_API_KEY);

const BATCH_SIZE = 50;
const BATCH_DELAY_MS = 1000; // 1 second between batches to respect Resend rate limits

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('Loading newsletter content...');

  const newsletterPath = join(ROOT, 'tmp', 'newsletter.json');
  const newsletter = JSON.parse(readFileSync(newsletterPath, 'utf-8'));

  // Fetch all active subscribers
  const { data: subscribers, error } = await supabase
    .from('newsletter_subscribers')
    .select('email, language')
    .eq('active', true);

  if (error) {
    console.error('Failed to fetch subscribers:', error.message);
    process.exit(1);
  }

  if (!subscribers || subscribers.length === 0) {
    console.log('No active subscribers found. Exiting.');
    return;
  }

  console.log(`Found ${subscribers.length} active subscribers`);

  // Group by language
  const byLang = {};
  for (const sub of subscribers) {
    const lang = sub.language || 'en';
    if (!byLang[lang]) byLang[lang] = [];
    byLang[lang].push(sub.email);
  }

  let totalSent = 0;
  let totalErrors = 0;

  for (const [lang, emails] of Object.entries(byLang)) {
    const content = newsletter[lang] || newsletter.en;
    console.log(`\nSending to ${emails.length} ${lang.toUpperCase()} subscribers...`);

    // Send in batches
    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batch = emails.slice(i, i + BATCH_SIZE);

      try {
        // Resend supports batch sending
        const result = await resend.batch.send(
          batch.map((email) => ({
            from: 'Salary Pulse Europe <hello@eurosalary.eu>',
            to: email,
            subject: content.subject,
            html: content.html,
          }))
        );

        totalSent += batch.length;
        console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: sent ${batch.length} emails`);
      } catch (err) {
        totalErrors += batch.length;
        console.error(`  Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, err.message);
      }

      if (i + BATCH_SIZE < emails.length) {
        await sleep(BATCH_DELAY_MS);
      }
    }
  }

  // Log results
  console.log(`\nNewsletter send complete: ${totalSent} sent, ${totalErrors} errors`);

  // Update Supabase with send stats
  await supabase.from('content_pages').upsert({
    slug: '_newsletter_stats',
    title: 'Newsletter Stats',
    content: JSON.stringify({
      lastSent: new Date().toISOString(),
      totalSent,
      totalErrors,
      subscriberCount: subscribers.length,
    }),
    updated_at: new Date().toISOString(),
  }, { onConflict: 'slug' });
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
