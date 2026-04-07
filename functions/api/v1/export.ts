// Cloudflare Pages Function — CSV Export (Pro+ required)
// GET /api/v1/export?country=DE&format=csv

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
};

const VALID_COUNTRIES = ['DE', 'FR', 'ES', 'NL', 'BE', 'IT', 'PT', 'PL', 'SE', 'AT', 'CH', 'LU', 'IE', 'DK', 'FI', 'CZ', 'RO', 'HU', 'SK', 'BG', 'HR', 'SI', 'LT', 'LV', 'EE', 'MT', 'CY'];

async function getAuthUser(request: Request, env: Env): Promise<{ id: string; email: string } | null> {
  const cookies = request.headers.get('cookie') || '';
  const match = cookies.match(/sb-access-token=([^;]+)/);
  if (!match) return null;
  const res = await fetch(`${env.PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${match[1]}`, apikey: env.PUBLIC_SUPABASE_ANON_KEY },
  });
  if (!res.ok) return null;
  const user: any = await res.json();
  return { id: user.id, email: user.email };
}

async function checkEntitlement(env: Env, userId: string, feature: string): Promise<boolean> {
  const res = await fetch(
    `${env.PUBLIC_SUPABASE_URL}/rest/v1/v_user_entitlements?auth_user_id=eq.${userId}&select=${feature}`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (!res.ok) return false;
  const rows: any[] = await res.json();
  return rows.length > 0 && rows[0][feature] === true;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const country = url.searchParams.get('country')?.toUpperCase();
  const format = url.searchParams.get('format')?.toLowerCase() || 'csv';

  // Validate country
  if (!country || !VALID_COUNTRIES.includes(country)) {
    return new Response(
      JSON.stringify({
        error: 'invalid_country',
        message: `Country must be one of: ${VALID_COUNTRIES.join(', ')}`,
        docs: 'https://eurosalary.eu/en/salary-api/',
      }),
      { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  if (format !== 'csv') {
    return new Response(
      JSON.stringify({ error: 'invalid_format', message: 'Only CSV format is currently supported' }),
      { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  // Auth check
  const user = await getAuthUser(context.request, context.env);
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'unauthorized', message: 'Authentication required. Sign in at eurosalary.eu' }),
      { status: 401, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  // Entitlement check
  const hasExport = await checkEntitlement(context.env, user.id, 'has_csv_export');
  if (!hasExport) {
    return new Response(
      JSON.stringify({
        error: 'Pro plan required',
        message: 'CSV export is available on Pro plans and above.',
        upgrade_url: '/en/pricing/',
      }),
      { status: 403, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  // Fetch salary data from Supabase
  const dataRes = await fetch(
    `${context.env.PUBLIC_SUPABASE_URL}/rest/v1/salary_data?select=salary_min,salary_median,salary_max,experience_level,confidence,sample_size,updated_at,jobs!inner(slug,name_en),countries!inner(code,name_en,currency)&countries.code=eq.${country}&order=jobs.slug,experience_level`,
    {
      headers: {
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  if (!dataRes.ok) {
    return new Response(
      JSON.stringify({ error: 'internal_error', message: 'Failed to fetch salary data' }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  const data: any[] = await dataRes.json();

  if (!data || data.length === 0) {
    return new Response(
      JSON.stringify({ error: 'not_found', message: `No salary data found for ${country}` }),
      { status: 404, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }

  // Build CSV
  const csvHeaders = ['country', 'country_name', 'currency', 'job_slug', 'job_name', 'level', 'salary_min', 'salary_median', 'salary_max', 'confidence', 'sample_size', 'updated_at'];
  const csvRows = data.map((row: any) => {
    const countryInfo = row.countries || {};
    const jobInfo = row.jobs || {};
    return [
      countryInfo.code || country,
      `"${(countryInfo.name_en || '').replace(/"/g, '""')}"`,
      countryInfo.currency || 'EUR',
      jobInfo.slug || '',
      `"${(jobInfo.name_en || '').replace(/"/g, '""')}"`,
      row.experience_level || '',
      row.salary_min || '',
      row.salary_median || '',
      row.salary_max || '',
      row.confidence || '',
      row.sample_size || '',
      row.updated_at || '',
    ].join(',');
  });

  const csv = [csvHeaders.join(','), ...csvRows].join('\n');
  const filename = `eurosalary_${country.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-cache',
    },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
