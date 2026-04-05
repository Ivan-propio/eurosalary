// Cloudflare Pages Function — Salary Comparison API
// GET /api/v1/compare?job=software-engineer&level=mid
// Returns salary data for a job across all countries

import { createClient } from '@supabase/supabase-js';

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const job = url.searchParams.get('job');
  const level = url.searchParams.get('level') || 'mid';

  if (!job) {
    return new Response(JSON.stringify({
      error: 'missing_job',
      message: 'The "job" query parameter is required',
    }), { status: 400, headers: CORS_HEADERS });
  }

  const supabase = createClient(context.env.PUBLIC_SUPABASE_URL, context.env.PUBLIC_SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('salary_data')
    .select(`
      salary_min, salary_median, salary_max, experience_level, confidence,
      countries!inner(code, name_en, currency)
    `)
    .eq('jobs.slug', job)
    .eq('experience_level', level)
    .order('salary_median', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: 'internal_error' }), {
      status: 500, headers: CORS_HEADERS,
    });
  }

  const response = {
    meta: {
      job,
      level,
      currency: 'EUR',
      period: 'annual',
      source: 'EuroSalary.eu',
    },
    data: (data || []).map((row: any) => ({
      country: row.countries?.code,
      countryName: row.countries?.name_en,
      salary: {
        min: row.salary_min,
        median: row.salary_median,
        max: row.salary_max,
      },
      confidence: row.confidence,
    })),
  };

  return new Response(JSON.stringify(response, null, 2), {
    status: 200,
    headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=3600' },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
