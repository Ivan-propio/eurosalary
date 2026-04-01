// ============================================
// EuroSalary.eu — Data Ingestion Pipeline
// Scaffold for Apify scraping + Make.com webhooks
// Active scraping starts after June 2026 (EU Pay
// Transparency Directive)
// ============================================

/**
 * Make.com Webhook Endpoints (to be configured):
 *
 * 1. EUROSTAT_REFRESH
 *    Trigger: Monthly (1st of month, 06:00 CET)
 *    URL: https://hook.eu2.make.com/[EUROSTAT_WEBHOOK_ID]
 *    Action: Fetch Eurostat APIs → parse → upsert Supabase
 *
 * 2. SALARY_REPORT_SUBMITTED
 *    Trigger: On new user_reports row (Supabase webhook)
 *    URL: https://hook.eu2.make.com/[REPORT_WEBHOOK_ID]
 *    Action: Validate submission → flag outliers → notify
 *
 * 3. APIFY_SCRAPE_COMPLETE (Phase 3 — post June 2026)
 *    Trigger: Apify actor run complete
 *    URL: https://hook.eu2.make.com/[APIFY_WEBHOOK_ID]
 *    Action: Receive scraped data → normalize with Claude →
 *            upsert Supabase → trigger Astro rebuild
 *
 * 4. ASTRO_REBUILD
 *    Trigger: After data upsert complete
 *    URL: Cloudflare Pages deploy hook
 *    Action: Trigger new SSG build with fresh data
 */

// ============================================
// Apify Actor Configuration (Phase 3)
// ============================================

export interface ApifyScrapingConfig {
  /** Apify actor ID for job scraping */
  actorId: string;
  /** Target job boards */
  sources: ('indeed' | 'stepstone' | 'linkedin')[];
  /** Countries to scrape (ISO codes) */
  countries: string[];
  /** Job titles to search */
  searchTerms: string[];
  /** Max results per search */
  maxResults: number;
  /** Schedule: cron expression */
  schedule: string;
}

export const scrapingConfig: ApifyScrapingConfig = {
  actorId: '', // To be set when Apify actor is created
  sources: ['indeed', 'stepstone', 'linkedin'],
  countries: ['DE', 'FR', 'ES', 'NL', 'BE', 'IT', 'PT', 'PL', 'SE', 'AT', 'CH', 'LU', 'IE', 'DK', 'FI'],
  searchTerms: [
    'Software Engineer',
    'Product Manager',
    'Data Analyst',
    'Financial Analyst',
    'Nurse',
    'Doctor',
    'Teacher',
    'Lawyer',
    'Marketing Manager',
    'Sales Manager',
    'HR Manager',
    'Project Manager',
    'Mechanical Engineer',
    'Civil Engineer',
    'DevOps Engineer',
    'Data Scientist',
    'UX Designer',
    'Business Analyst',
    'Operations Manager',
    'Accountant',
  ],
  maxResults: 100,
  schedule: '0 6 * * 1', // Every Monday at 06:00 UTC
};

// ============================================
// Scraped data format (what Apify returns)
// ============================================

export interface ScrapedJobPosting {
  /** Raw job title from posting */
  title: string;
  /** Company name */
  company: string;
  /** Location (city, country) */
  location: string;
  /** Country code (parsed from location) */
  countryCode: string;
  /** Salary range if available */
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: 'yearly' | 'monthly' | 'hourly';
  /** Source platform */
  source: 'indeed' | 'stepstone' | 'linkedin';
  /** Posting URL */
  url: string;
  /** Date scraped */
  scrapedAt: string;
  /** Date posted (if available) */
  postedAt?: string;
}

// ============================================
// Pipeline processing functions (scaffolded)
// ============================================

/**
 * Process scraped job postings into salary_data entries.
 * Called by Make.com after Apify actor completes.
 *
 * Flow:
 * 1. Receive batch of ScrapedJobPosting[]
 * 2. Normalize job titles via Claude Haiku
 * 3. Convert salary to annual EUR if needed
 * 4. Group by job + country + experience level
 * 5. Calculate min/median/max statistics
 * 6. Upsert into Supabase salary_data with source='scraping'
 */
export async function processScrapedData(postings: ScrapedJobPosting[]): Promise<{
  processed: number;
  skipped: number;
  errors: number;
}> {
  // Phase 3 implementation — scaffold only
  console.log(`[Pipeline] Would process ${postings.length} scraped postings`);

  return {
    processed: 0,
    skipped: postings.length,
    errors: 0,
  };
}

/**
 * Validate a user salary report.
 * Called by Make.com on new user_reports entry.
 *
 * Checks:
 * - Salary is within 3 standard deviations of median for job+country
 * - Country code is valid
 * - Experience level is valid
 * - Not a duplicate (same IP within 24h — checked by Make.com)
 */
export async function validateSalaryReport(report: {
  jobId: string;
  countryId: string;
  grossSalary: number;
  experienceLevel: string;
}): Promise<{
  valid: boolean;
  reason?: string;
}> {
  // Basic validation
  if (report.grossSalary < 5000 || report.grossSalary > 500000) {
    return { valid: false, reason: 'Salary out of reasonable range (€5K-€500K)' };
  }

  const validLevels = ['junior', 'mid', 'senior', 'lead'];
  if (!validLevels.includes(report.experienceLevel)) {
    return { valid: false, reason: 'Invalid experience level' };
  }

  // TODO: Compare against existing salary_data median for outlier detection
  // Flag if > 3 standard deviations from median

  return { valid: true };
}

/**
 * Trigger Cloudflare Pages rebuild after data update.
 * Uses the Cloudflare Deploy Hook.
 *
 * Deploy hook URL (to be configured):
 * https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/[HOOK_ID]
 */
export async function triggerRebuild(): Promise<boolean> {
  const deployHookUrl = import.meta.env.CF_DEPLOY_HOOK_URL;

  if (!deployHookUrl) {
    console.warn('CF_DEPLOY_HOOK_URL not configured');
    return false;
  }

  try {
    const response = await fetch(deployHookUrl, { method: 'POST' });
    return response.ok;
  } catch (error) {
    console.error('Failed to trigger rebuild:', error);
    return false;
  }
}
