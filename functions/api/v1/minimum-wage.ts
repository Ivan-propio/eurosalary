// Cloudflare Pages Function — Minimum Wage API
// GET /api/v1/minimum-wage?country=DE
// GET /api/v1/minimum-wage (all countries)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const MIN_WAGE_DATA: Record<string, { hourly: number | null; monthly: number | null; annual: number | null; hasMinWage: boolean; note: string; lastUpdate: string }> = {
  DE: { hourly: 12.82, monthly: 2220, annual: 26640, hasMinWage: true, note: 'Federal statutory minimum', lastUpdate: '2026-01' },
  FR: { hourly: 11.65, monthly: 1767, annual: 21204, hasMinWage: true, note: 'SMIC', lastUpdate: '2026-01' },
  ES: { hourly: 8.45, monthly: 1323, annual: 15876, hasMinWage: true, note: 'SMI', lastUpdate: '2026-01' },
  NL: { hourly: 13.27, monthly: 2300, annual: 27600, hasMinWage: true, note: 'Wettelijk minimumloon', lastUpdate: '2026-01' },
  BE: { hourly: 12.10, monthly: 2030, annual: 24360, hasMinWage: true, note: 'RMMMG', lastUpdate: '2026-01' },
  IT: { hourly: null, monthly: null, annual: null, hasMinWage: false, note: 'No statutory minimum — sector collective agreements', lastUpdate: 'N/A' },
  PT: { hourly: 5.27, monthly: 870, annual: 12180, hasMinWage: true, note: 'RMMG', lastUpdate: '2026-01' },
  PL: { hourly: 5.10, monthly: 890, annual: 10680, hasMinWage: true, note: 'Płaca minimalna (EUR equivalent)', lastUpdate: '2026-01' },
  SE: { hourly: null, monthly: null, annual: null, hasMinWage: false, note: 'No statutory minimum — collective agreements', lastUpdate: 'N/A' },
  AT: { hourly: 10.90, monthly: 1890, annual: 22680, hasMinWage: true, note: 'Collective agreement minimum', lastUpdate: '2026-01' },
  CH: { hourly: null, monthly: null, annual: null, hasMinWage: false, note: 'No federal minimum — cantonal minimums exist', lastUpdate: 'Varies' },
  LU: { hourly: 14.86, monthly: 2571, annual: 30852, hasMinWage: true, note: 'SSM — highest in EU', lastUpdate: '2026-01' },
  IE: { hourly: 12.70, monthly: 2200, annual: 26400, hasMinWage: true, note: 'National Minimum Wage', lastUpdate: '2026-01' },
  DK: { hourly: null, monthly: null, annual: null, hasMinWage: false, note: 'No statutory minimum — collective agreements', lastUpdate: 'N/A' },
  FI: { hourly: null, monthly: null, annual: null, hasMinWage: false, note: 'No statutory minimum — collective agreements', lastUpdate: 'N/A' },
};

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const country = url.searchParams.get('country')?.toUpperCase();

  if (country) {
    const data = MIN_WAGE_DATA[country];
    if (!data) {
      return new Response(JSON.stringify({ error: 'not_found', message: `No data for country: ${country}` }), {
        status: 404, headers: CORS_HEADERS,
      });
    }
    return new Response(JSON.stringify({
      meta: { country, currency: 'EUR', source: 'EuroSalary.eu' },
      data,
    }, null, 2), { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=86400' } });
  }

  // Return all countries
  const response = {
    meta: { currency: 'EUR', source: 'EuroSalary.eu', countries: Object.keys(MIN_WAGE_DATA).length },
    data: MIN_WAGE_DATA,
  };

  return new Response(JSON.stringify(response, null, 2), {
    status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=86400' },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
