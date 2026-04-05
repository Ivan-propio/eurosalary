// Cloudflare Pages Function — Salary Data API
// GET /api/v1/salary?country=DE&job=software-engineer&level=mid
// Returns structured salary data in JSON format

import { createClient } from '@supabase/supabase-js';

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  API_RATE_LIMIT_KV: KVNamespace;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

const VALID_COUNTRIES = ['DE', 'FR', 'ES', 'NL', 'BE', 'IT', 'PT', 'PL', 'SE', 'AT', 'CH', 'LU', 'IE', 'DK', 'FI'];
const VALID_LEVELS = ['junior', 'mid', 'senior', 'lead'];

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const country = url.searchParams.get('country')?.toUpperCase();
  const job = url.searchParams.get('job');
  const level = url.searchParams.get('level');

  // Validate params
  if (!country || !VALID_COUNTRIES.includes(country)) {
    return new Response(JSON.stringify({
      error: 'invalid_country',
      message: `Country must be one of: ${VALID_COUNTRIES.join(', ')}`,
      docs: 'https://eurosalary.eu/en/salary-api/',
    }), { status: 400, headers: CORS_HEADERS });
  }

  if (!job) {
    return new Response(JSON.stringify({
      error: 'missing_job',
      message: 'The "job" query parameter is required (e.g., software-engineer)',
      docs: 'https://eurosalary.eu/en/salary-api/',
    }), { status: 400, headers: CORS_HEADERS });
  }

  // Rate limiting (simple IP-based, 100 req/hour for free tier)
  const clientIP = context.request.headers.get('cf-connecting-ip') || 'unknown';
  const apiKey = context.request.headers.get('authorization')?.replace('Bearer ', '');

  if (!apiKey) {
    // Free tier — rate limited
    try {
      const kvKey = `rate:${clientIP}:${Math.floor(Date.now() / 3600000)}`;
      const current = parseInt(await context.env.API_RATE_LIMIT_KV?.get(kvKey) || '0');
      if (current >= 100) {
        return new Response(JSON.stringify({
          error: 'rate_limited',
          message: 'Free tier limited to 100 requests/hour. Get an API key at eurosalary.eu/en/salary-api/',
          retryAfter: 3600,
        }), { status: 429, headers: { ...CORS_HEADERS, 'Retry-After': '3600' } });
      }
      await context.env.API_RATE_LIMIT_KV?.put(kvKey, String(current + 1), { expirationTtl: 3600 });
    } catch {
      // If KV is not available, skip rate limiting
    }
  }

  // Fetch data from Supabase
  const supabase = createClient(context.env.PUBLIC_SUPABASE_URL, context.env.PUBLIC_SUPABASE_ANON_KEY);

  let query = supabase
    .from('salary_data')
    .select(`
      salary_min, salary_median, salary_max, experience_level, confidence, sample_size, updated_at,
      jobs!inner(slug, name_en),
      countries!inner(code, name_en, currency)
    `)
    .eq('jobs.slug', job)
    .eq('countries.code', country);

  if (level && VALID_LEVELS.includes(level)) {
    query = query.eq('experience_level', level);
  }

  const { data, error } = await query.order('experience_level');

  if (error) {
    return new Response(JSON.stringify({
      error: 'internal_error',
      message: 'Failed to fetch salary data',
    }), { status: 500, headers: CORS_HEADERS });
  }

  if (!data || data.length === 0) {
    return new Response(JSON.stringify({
      error: 'not_found',
      message: `No salary data found for ${job} in ${country}`,
      suggestion: 'Check available jobs at GET /api/v1/salary?country=DE (without job param)',
    }), { status: 404, headers: CORS_HEADERS });
  }

  // Format response
  const response = {
    meta: {
      country: country,
      job: job,
      currency: 'EUR',
      period: 'annual',
      source: 'EuroSalary.eu',
      methodology: 'https://eurosalary.eu/en/methodology/',
      dataVersion: '2026.04',
    },
    data: data.map((row: any) => ({
      level: row.experience_level,
      salary: {
        min: row.salary_min,
        median: row.salary_median,
        max: row.salary_max,
      },
      confidence: row.confidence,
      sampleSize: row.sample_size,
      lastUpdated: row.updated_at,
    })),
  };

  return new Response(JSON.stringify(response, null, 2), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
