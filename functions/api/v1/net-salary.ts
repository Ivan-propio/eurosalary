// Cloudflare Pages Function — Net Salary Calculator (Pro+ required)
// GET /api/v1/net-salary?country=DE&gross=60000

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
  'Content-Type': 'application/json',
};

const VALID_COUNTRIES = ['DE', 'FR', 'ES', 'NL', 'BE', 'IT', 'PT', 'PL', 'SE', 'AT', 'CH', 'LU', 'IE', 'DK', 'FI', 'CZ', 'RO', 'HU', 'SK', 'BG', 'HR', 'SI', 'LT', 'LV', 'EE', 'MT', 'CY'];

// Country-specific tax & social contribution rates (simplified effective rates)
interface TaxConfig {
  income_tax_rate: number;
  social_rate: number;
  currency: string;
  tax_free_allowance: number;
  name: string;
}

const TAX_CONFIGS: Record<string, TaxConfig> = {
  DE: { income_tax_rate: 0.30, social_rate: 0.20, currency: 'EUR', tax_free_allowance: 11604, name: 'Germany' },
  FR: { income_tax_rate: 0.25, social_rate: 0.23, currency: 'EUR', tax_free_allowance: 11294, name: 'France' },
  NL: { income_tax_rate: 0.37, social_rate: 0.15, currency: 'EUR', tax_free_allowance: 0, name: 'Netherlands' },
  ES: { income_tax_rate: 0.24, social_rate: 0.065, currency: 'EUR', tax_free_allowance: 5550, name: 'Spain' },
  BE: { income_tax_rate: 0.35, social_rate: 0.1307, currency: 'EUR', tax_free_allowance: 10160, name: 'Belgium' },
  IT: { income_tax_rate: 0.27, social_rate: 0.10, currency: 'EUR', tax_free_allowance: 8174, name: 'Italy' },
  PT: { income_tax_rate: 0.23, social_rate: 0.11, currency: 'EUR', tax_free_allowance: 4104, name: 'Portugal' },
  PL: { income_tax_rate: 0.17, social_rate: 0.1371, currency: 'EUR', tax_free_allowance: 7200, name: 'Poland' },
  SE: { income_tax_rate: 0.32, social_rate: 0.07, currency: 'EUR', tax_free_allowance: 0, name: 'Sweden' },
  AT: { income_tax_rate: 0.30, social_rate: 0.18, currency: 'EUR', tax_free_allowance: 12816, name: 'Austria' },
  CH: { income_tax_rate: 0.22, social_rate: 0.063, currency: 'CHF', tax_free_allowance: 0, name: 'Switzerland' },
  LU: { income_tax_rate: 0.28, social_rate: 0.1265, currency: 'EUR', tax_free_allowance: 13000, name: 'Luxembourg' },
  IE: { income_tax_rate: 0.26, social_rate: 0.04, currency: 'EUR', tax_free_allowance: 18000, name: 'Ireland' },
  DK: { income_tax_rate: 0.37, social_rate: 0.08, currency: 'EUR', tax_free_allowance: 6600, name: 'Denmark' },
  FI: { income_tax_rate: 0.30, social_rate: 0.092, currency: 'EUR', tax_free_allowance: 0, name: 'Finland' },
  CZ: { income_tax_rate: 0.15, social_rate: 0.11, currency: 'EUR', tax_free_allowance: 3000, name: 'Czech Republic' },
  RO: { income_tax_rate: 0.10, social_rate: 0.35, currency: 'EUR', tax_free_allowance: 0, name: 'Romania' },
  HU: { income_tax_rate: 0.15, social_rate: 0.185, currency: 'EUR', tax_free_allowance: 0, name: 'Hungary' },
  SK: { income_tax_rate: 0.19, social_rate: 0.134, currency: 'EUR', tax_free_allowance: 4922, name: 'Slovakia' },
  BG: { income_tax_rate: 0.10, social_rate: 0.1378, currency: 'EUR', tax_free_allowance: 0, name: 'Bulgaria' },
  HR: { income_tax_rate: 0.20, social_rate: 0.20, currency: 'EUR', tax_free_allowance: 5400, name: 'Croatia' },
  SI: { income_tax_rate: 0.27, social_rate: 0.2206, currency: 'EUR', tax_free_allowance: 5000, name: 'Slovenia' },
  LT: { income_tax_rate: 0.20, social_rate: 0.1252, currency: 'EUR', tax_free_allowance: 6000, name: 'Lithuania' },
  LV: { income_tax_rate: 0.20, social_rate: 0.105, currency: 'EUR', tax_free_allowance: 6000, name: 'Latvia' },
  EE: { income_tax_rate: 0.20, social_rate: 0.016, currency: 'EUR', tax_free_allowance: 7848, name: 'Estonia' },
  MT: { income_tax_rate: 0.25, social_rate: 0.10, currency: 'EUR', tax_free_allowance: 9100, name: 'Malta' },
  CY: { income_tax_rate: 0.22, social_rate: 0.086, currency: 'EUR', tax_free_allowance: 19500, name: 'Cyprus' },
};

function calculateNetSalary(gross: number, country: string) {
  const config = TAX_CONFIGS[country] || {
    income_tax_rate: 0.25,
    social_rate: 0.18,
    currency: 'EUR',
    tax_free_allowance: 0,
    name: country,
  };

  const social_contributions = Math.round(gross * config.social_rate * 100) / 100;
  const taxable_income = Math.max(0, gross - config.tax_free_allowance - social_contributions);
  const income_tax = Math.round(taxable_income * config.income_tax_rate * 100) / 100;
  const net = Math.round((gross - income_tax - social_contributions) * 100) / 100;
  const effective_rate = gross > 0 ? Math.round(((income_tax + social_contributions) / gross) * 10000) / 100 : 0;

  return {
    gross,
    income_tax,
    social_contributions,
    net,
    effective_rate,
    country,
    country_name: config.name,
    currency: config.currency,
    tax_free_allowance: config.tax_free_allowance,
    monthly_net: Math.round((net / 12) * 100) / 100,
    period: 'annual',
    disclaimer: 'Simplified estimate. Actual taxes depend on personal circumstances, deductions, and local regulations.',
  };
}

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
  const grossParam = url.searchParams.get('gross');

  // Validate params
  if (!country || !VALID_COUNTRIES.includes(country)) {
    return new Response(
      JSON.stringify({
        error: 'invalid_country',
        message: `Country must be one of: ${VALID_COUNTRIES.join(', ')}`,
        docs: 'https://eurosalary.eu/en/salary-api/',
      }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (!grossParam || isNaN(Number(grossParam)) || Number(grossParam) <= 0) {
    return new Response(
      JSON.stringify({
        error: 'invalid_gross',
        message: 'The "gross" parameter must be a positive number (annual gross salary in EUR)',
        example: '/api/v1/net-salary?country=DE&gross=60000',
      }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const gross = Number(grossParam);

  if (gross > 10000000) {
    return new Response(
      JSON.stringify({ error: 'invalid_gross', message: 'Maximum supported gross salary is 10,000,000' }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // Auth check
  const user = await getAuthUser(context.request, context.env);

  if (!user) {
    // Free tier: return teaser
    const rough = calculateNetSalary(gross, country);
    return new Response(
      JSON.stringify({
        teaser: true,
        gross,
        country,
        net_estimate: Math.round(rough.net / 1000) * 1000,
        effective_rate_estimate: `~${Math.round(rough.effective_rate)}%`,
        full_breakdown: 'requires_pro',
        message: 'Sign up for a Pro plan to get full tax breakdowns, deductions, and monthly net.',
        upgrade_url: '/en/pricing/',
      }),
      { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=3600' } }
    );
  }

  // Check entitlement
  const hasPro = await checkEntitlement(context.env, user.id, 'is_paid');
  if (!hasPro) {
    const rough = calculateNetSalary(gross, country);
    return new Response(
      JSON.stringify({
        teaser: true,
        gross,
        country,
        net_estimate: Math.round(rough.net / 1000) * 1000,
        effective_rate_estimate: `~${Math.round(rough.effective_rate)}%`,
        full_breakdown: 'requires_pro',
        message: 'Upgrade to Pro to unlock full net salary breakdowns.',
        upgrade_url: '/en/pricing/',
      }),
      { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'private, no-cache' } }
    );
  }

  // Full breakdown
  const result = calculateNetSalary(gross, country);

  return new Response(JSON.stringify(result, null, 2), {
    status: 200,
    headers: { ...CORS_HEADERS, 'Cache-Control': 'private, max-age=300' },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
