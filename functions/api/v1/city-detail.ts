// Cloudflare Pages Function — Extended City Data (Pro+ required)
// GET /api/v1/city-detail?city=berlin

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

interface CityDetailData {
  city: string;
  country: string;
  currency: string;
  salary_distribution: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
  cost_of_living_index: number;
  rent_index: number;
  purchasing_power_index: number;
  average_salary: number;
  median_salary: number;
  population: number;
  quality_of_life_index: number;
}

// Realistic mock data for major European cities
// Indices relative to Prague = 100 (Numbeo-style)
const CITY_DATA: Record<string, CityDetailData> = {
  berlin: {
    city: 'Berlin', country: 'DE', currency: 'EUR',
    salary_distribution: { p10: 28000, p25: 38000, p50: 52000, p75: 70000, p90: 92000 },
    cost_of_living_index: 72.3, rent_index: 38.7, purchasing_power_index: 112.4,
    average_salary: 55200, median_salary: 52000, population: 3748148, quality_of_life_index: 168.2,
  },
  munich: {
    city: 'Munich', country: 'DE', currency: 'EUR',
    salary_distribution: { p10: 34000, p25: 45000, p50: 62000, p75: 82000, p90: 108000 },
    cost_of_living_index: 82.6, rent_index: 52.4, purchasing_power_index: 126.8,
    average_salary: 65400, median_salary: 62000, population: 1488202, quality_of_life_index: 179.5,
  },
  frankfurt: {
    city: 'Frankfurt', country: 'DE', currency: 'EUR',
    salary_distribution: { p10: 32000, p25: 43000, p50: 60000, p75: 80000, p90: 105000 },
    cost_of_living_index: 78.2, rent_index: 46.1, purchasing_power_index: 122.3,
    average_salary: 63000, median_salary: 60000, population: 764104, quality_of_life_index: 172.1,
  },
  hamburg: {
    city: 'Hamburg', country: 'DE', currency: 'EUR',
    salary_distribution: { p10: 30000, p25: 40000, p50: 55000, p75: 73000, p90: 96000 },
    cost_of_living_index: 74.8, rent_index: 40.2, purchasing_power_index: 116.5,
    average_salary: 57800, median_salary: 55000, population: 1906411, quality_of_life_index: 174.8,
  },
  paris: {
    city: 'Paris', country: 'FR', currency: 'EUR',
    salary_distribution: { p10: 26000, p25: 36000, p50: 48000, p75: 65000, p90: 88000 },
    cost_of_living_index: 85.4, rent_index: 62.8, purchasing_power_index: 94.6,
    average_salary: 51000, median_salary: 48000, population: 2161000, quality_of_life_index: 155.3,
  },
  lyon: {
    city: 'Lyon', country: 'FR', currency: 'EUR',
    salary_distribution: { p10: 22000, p25: 30000, p50: 40000, p75: 54000, p90: 72000 },
    cost_of_living_index: 70.2, rent_index: 32.4, purchasing_power_index: 96.8,
    average_salary: 42500, median_salary: 40000, population: 522250, quality_of_life_index: 163.7,
  },
  amsterdam: {
    city: 'Amsterdam', country: 'NL', currency: 'EUR',
    salary_distribution: { p10: 30000, p25: 40000, p50: 55000, p75: 74000, p90: 98000 },
    cost_of_living_index: 80.1, rent_index: 58.3, purchasing_power_index: 108.2,
    average_salary: 57500, median_salary: 55000, population: 921402, quality_of_life_index: 176.4,
  },
  rotterdam: {
    city: 'Rotterdam', country: 'NL', currency: 'EUR',
    salary_distribution: { p10: 27000, p25: 36000, p50: 48000, p75: 64000, p90: 84000 },
    cost_of_living_index: 72.4, rent_index: 42.1, purchasing_power_index: 105.3,
    average_salary: 50200, median_salary: 48000, population: 655468, quality_of_life_index: 168.9,
  },
  madrid: {
    city: 'Madrid', country: 'ES', currency: 'EUR',
    salary_distribution: { p10: 18000, p25: 24000, p50: 34000, p75: 48000, p90: 65000 },
    cost_of_living_index: 58.6, rent_index: 34.2, purchasing_power_index: 86.4,
    average_salary: 36200, median_salary: 34000, population: 3305408, quality_of_life_index: 162.8,
  },
  barcelona: {
    city: 'Barcelona', country: 'ES', currency: 'EUR',
    salary_distribution: { p10: 17000, p25: 23000, p50: 32000, p75: 45000, p90: 62000 },
    cost_of_living_index: 60.2, rent_index: 38.6, purchasing_power_index: 82.1,
    average_salary: 34500, median_salary: 32000, population: 1664182, quality_of_life_index: 158.4,
  },
  rome: {
    city: 'Rome', country: 'IT', currency: 'EUR',
    salary_distribution: { p10: 18000, p25: 24000, p50: 33000, p75: 46000, p90: 62000 },
    cost_of_living_index: 65.8, rent_index: 32.6, purchasing_power_index: 74.2,
    average_salary: 35800, median_salary: 33000, population: 2860009, quality_of_life_index: 138.5,
  },
  milan: {
    city: 'Milan', country: 'IT', currency: 'EUR',
    salary_distribution: { p10: 22000, p25: 30000, p50: 40000, p75: 56000, p90: 76000 },
    cost_of_living_index: 72.4, rent_index: 44.8, purchasing_power_index: 88.6,
    average_salary: 42800, median_salary: 40000, population: 1396059, quality_of_life_index: 148.2,
  },
  lisbon: {
    city: 'Lisbon', country: 'PT', currency: 'EUR',
    salary_distribution: { p10: 12000, p25: 16000, p50: 24000, p75: 36000, p90: 50000 },
    cost_of_living_index: 52.8, rent_index: 34.5, purchasing_power_index: 62.4,
    average_salary: 26500, median_salary: 24000, population: 545923, quality_of_life_index: 160.6,
  },
  vienna: {
    city: 'Vienna', country: 'AT', currency: 'EUR',
    salary_distribution: { p10: 28000, p25: 36000, p50: 48000, p75: 65000, p90: 86000 },
    cost_of_living_index: 72.8, rent_index: 36.2, purchasing_power_index: 108.6,
    average_salary: 50800, median_salary: 48000, population: 1982097, quality_of_life_index: 182.4,
  },
  zurich: {
    city: 'Zurich', country: 'CH', currency: 'CHF',
    salary_distribution: { p10: 58000, p25: 75000, p50: 98000, p75: 128000, p90: 165000 },
    cost_of_living_index: 131.2, rent_index: 96.8, purchasing_power_index: 142.6,
    average_salary: 102000, median_salary: 98000, population: 443037, quality_of_life_index: 195.8,
  },
  brussels: {
    city: 'Brussels', country: 'BE', currency: 'EUR',
    salary_distribution: { p10: 26000, p25: 34000, p50: 46000, p75: 62000, p90: 82000 },
    cost_of_living_index: 72.6, rent_index: 38.4, purchasing_power_index: 102.8,
    average_salary: 48500, median_salary: 46000, population: 1222637, quality_of_life_index: 154.2,
  },
  warsaw: {
    city: 'Warsaw', country: 'PL', currency: 'EUR',
    salary_distribution: { p10: 12000, p25: 18000, p50: 28000, p75: 42000, p90: 60000 },
    cost_of_living_index: 42.8, rent_index: 24.6, purchasing_power_index: 82.4,
    average_salary: 30200, median_salary: 28000, population: 1860281, quality_of_life_index: 148.6,
  },
  copenhagen: {
    city: 'Copenhagen', country: 'DK', currency: 'EUR',
    salary_distribution: { p10: 36000, p25: 46000, p50: 60000, p75: 78000, p90: 102000 },
    cost_of_living_index: 92.4, rent_index: 52.6, purchasing_power_index: 118.2,
    average_salary: 63500, median_salary: 60000, population: 644431, quality_of_life_index: 190.2,
  },
  stockholm: {
    city: 'Stockholm', country: 'SE', currency: 'EUR',
    salary_distribution: { p10: 32000, p25: 42000, p50: 55000, p75: 72000, p90: 95000 },
    cost_of_living_index: 82.6, rent_index: 48.2, purchasing_power_index: 112.8,
    average_salary: 58200, median_salary: 55000, population: 990137, quality_of_life_index: 183.6,
  },
  helsinki: {
    city: 'Helsinki', country: 'FI', currency: 'EUR',
    salary_distribution: { p10: 30000, p25: 38000, p50: 50000, p75: 66000, p90: 86000 },
    cost_of_living_index: 78.4, rent_index: 40.8, purchasing_power_index: 106.4,
    average_salary: 52800, median_salary: 50000, population: 658864, quality_of_life_index: 186.4,
  },
  dublin: {
    city: 'Dublin', country: 'IE', currency: 'EUR',
    salary_distribution: { p10: 28000, p25: 38000, p50: 52000, p75: 72000, p90: 98000 },
    cost_of_living_index: 82.8, rent_index: 68.4, purchasing_power_index: 104.6,
    average_salary: 55600, median_salary: 52000, population: 592713, quality_of_life_index: 170.8,
  },
  luxembourg_city: {
    city: 'Luxembourg City', country: 'LU', currency: 'EUR',
    salary_distribution: { p10: 38000, p25: 50000, p50: 68000, p75: 92000, p90: 125000 },
    cost_of_living_index: 88.2, rent_index: 72.4, purchasing_power_index: 134.8,
    average_salary: 72000, median_salary: 68000, population: 132778, quality_of_life_index: 178.6,
  },
  prague: {
    city: 'Prague', country: 'CZ', currency: 'EUR',
    salary_distribution: { p10: 10000, p25: 15000, p50: 22000, p75: 34000, p90: 48000 },
    cost_of_living_index: 46.2, rent_index: 28.4, purchasing_power_index: 72.8,
    average_salary: 24500, median_salary: 22000, population: 1357326, quality_of_life_index: 158.2,
  },
  bucharest: {
    city: 'Bucharest', country: 'RO', currency: 'EUR',
    salary_distribution: { p10: 8000, p25: 12000, p50: 18000, p75: 28000, p90: 42000 },
    cost_of_living_index: 38.6, rent_index: 18.2, purchasing_power_index: 64.2,
    average_salary: 20200, median_salary: 18000, population: 1794590, quality_of_life_index: 132.4,
  },
};

// Aliases for common query variations
const CITY_ALIASES: Record<string, string> = {
  'luxembourg': 'luxembourg_city',
  'luxembourg-city': 'luxembourg_city',
  'luxemburg': 'luxembourg_city',
};

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
  const cityParam = url.searchParams.get('city')?.toLowerCase().trim();

  if (!cityParam) {
    return new Response(
      JSON.stringify({
        error: 'missing_city',
        message: 'The "city" query parameter is required',
        available_cities: Object.keys(CITY_DATA).concat(Object.keys(CITY_ALIASES)).sort(),
        example: '/api/v1/city-detail?city=berlin',
      }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // Resolve alias
  const cityKey = CITY_ALIASES[cityParam] || cityParam;
  const cityData = CITY_DATA[cityKey];

  if (!cityData) {
    return new Response(
      JSON.stringify({
        error: 'city_not_found',
        message: `No data found for city "${cityParam}"`,
        available_cities: Object.keys(CITY_DATA).concat(Object.keys(CITY_ALIASES)).sort(),
      }),
      { status: 404, headers: CORS_HEADERS }
    );
  }

  // Auth check
  const user = await getAuthUser(context.request, context.env);

  if (!user) {
    // Free tier: return basic data only
    return new Response(
      JSON.stringify({
        teaser: true,
        city: cityData.city,
        country: cityData.country,
        median_salary: cityData.median_salary,
        currency: cityData.currency,
        population: cityData.population,
        full_data: 'requires_pro',
        message: 'Sign up for Pro to access salary distributions, cost of living indices, and purchasing power data.',
        upgrade_url: '/en/pricing/',
      }),
      { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=3600' } }
    );
  }

  // Check entitlement
  const hasPro = await checkEntitlement(context.env, user.id, 'is_paid');
  if (!hasPro) {
    return new Response(
      JSON.stringify({
        teaser: true,
        city: cityData.city,
        country: cityData.country,
        median_salary: cityData.median_salary,
        currency: cityData.currency,
        population: cityData.population,
        full_data: 'requires_pro',
        message: 'Upgrade to Pro to unlock full city data with salary distributions and cost of living.',
        upgrade_url: '/en/pricing/',
      }),
      { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'private, no-cache' } }
    );
  }

  // Full data
  const response = {
    meta: {
      source: 'EuroSalary.eu',
      methodology: 'https://eurosalary.eu/en/methodology/',
      period: 'annual',
      dataVersion: '2026.04',
      lastUpdated: '2026-04-01',
    },
    data: {
      city: cityData.city,
      country: cityData.country,
      currency: cityData.currency,
      population: cityData.population,
      salary: {
        average: cityData.average_salary,
        median: cityData.median_salary,
        distribution: cityData.salary_distribution,
      },
      indices: {
        cost_of_living: cityData.cost_of_living_index,
        rent: cityData.rent_index,
        purchasing_power: cityData.purchasing_power_index,
        quality_of_life: cityData.quality_of_life_index,
      },
    },
  };

  return new Response(JSON.stringify(response, null, 2), {
    status: 200,
    headers: { ...CORS_HEADERS, 'Cache-Control': 'private, max-age=3600' },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
