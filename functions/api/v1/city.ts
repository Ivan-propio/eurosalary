// Cloudflare Pages Function — City Salary API
// GET /api/v1/city?city=berlin
// GET /api/v1/city?country=DE (all cities in country)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const CITY_DATA: Record<string, { country: string; avgSalary: number; techSalary: number; costIndex: number; rentIndex: number; population: string }> = {
  berlin: { country: 'DE', avgSalary: 50000, techSalary: 62000, costIndex: 70.2, rentIndex: 32.5, population: '3.7M' },
  munich: { country: 'DE', avgSalary: 60000, techSalary: 72000, costIndex: 80.1, rentIndex: 42.3, population: '1.5M' },
  hamburg: { country: 'DE', avgSalary: 52000, techSalary: 63000, costIndex: 72.5, rentIndex: 33.1, population: '1.9M' },
  paris: { country: 'FR', avgSalary: 52000, techSalary: 60000, costIndex: 82.3, rentIndex: 45.2, population: '2.2M' },
  lyon: { country: 'FR', avgSalary: 40000, techSalary: 48000, costIndex: 62.1, rentIndex: 25.3, population: '0.5M' },
  madrid: { country: 'ES', avgSalary: 35000, techSalary: 42000, costIndex: 55.8, rentIndex: 28.4, population: '3.3M' },
  barcelona: { country: 'ES', avgSalary: 34000, techSalary: 41000, costIndex: 58.2, rentIndex: 30.1, population: '1.6M' },
  amsterdam: { country: 'NL', avgSalary: 56000, techSalary: 68000, costIndex: 78.5, rentIndex: 42.8, population: '0.9M' },
  rotterdam: { country: 'NL', avgSalary: 48000, techSalary: 58000, costIndex: 68.3, rentIndex: 30.2, population: '0.65M' },
  brussels: { country: 'BE', avgSalary: 50000, techSalary: 58000, costIndex: 68.7, rentIndex: 30.5, population: '1.2M' },
  rome: { country: 'IT', avgSalary: 35000, techSalary: 40000, costIndex: 62.5, rentIndex: 28.7, population: '2.9M' },
  milan: { country: 'IT', avgSalary: 42000, techSalary: 50000, costIndex: 72.8, rentIndex: 38.5, population: '1.4M' },
  lisbon: { country: 'PT', avgSalary: 28000, techSalary: 35000, costIndex: 52.3, rentIndex: 28.9, population: '0.5M' },
  porto: { country: 'PT', avgSalary: 24000, techSalary: 30000, costIndex: 45.8, rentIndex: 20.1, population: '0.23M' },
  warsaw: { country: 'PL', avgSalary: 28000, techSalary: 38000, costIndex: 42.5, rentIndex: 22.3, population: '1.8M' },
  krakow: { country: 'PL', avgSalary: 24000, techSalary: 34000, costIndex: 38.2, rentIndex: 18.5, population: '0.78M' },
  stockholm: { country: 'SE', avgSalary: 54000, techSalary: 65000, costIndex: 78.2, rentIndex: 38.5, population: '1.0M' },
  vienna: { country: 'AT', avgSalary: 52000, techSalary: 60000, costIndex: 70.5, rentIndex: 32.8, population: '1.9M' },
  zurich: { country: 'CH', avgSalary: 105000, techSalary: 120000, costIndex: 131.5, rentIndex: 62.3, population: '0.43M' },
  geneva: { country: 'CH', avgSalary: 100000, techSalary: 115000, costIndex: 128.2, rentIndex: 58.7, population: '0.2M' },
  'luxembourg-city': { country: 'LU', avgSalary: 72000, techSalary: 82000, costIndex: 85.3, rentIndex: 48.2, population: '0.13M' },
  dublin: { country: 'IE', avgSalary: 58000, techSalary: 72000, costIndex: 78.5, rentIndex: 48.5, population: '1.4M' },
  copenhagen: { country: 'DK', avgSalary: 60000, techSalary: 70000, costIndex: 88.2, rentIndex: 42.1, population: '0.8M' },
  helsinki: { country: 'FI', avgSalary: 46000, techSalary: 55000, costIndex: 72.8, rentIndex: 30.5, population: '0.66M' },
};

export const onRequestGet: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const city = url.searchParams.get('city')?.toLowerCase();
  const country = url.searchParams.get('country')?.toUpperCase();

  if (city) {
    const data = CITY_DATA[city];
    if (!data) {
      return new Response(JSON.stringify({
        error: 'not_found',
        message: `No data for city: ${city}`,
        available: Object.keys(CITY_DATA),
      }), { status: 404, headers: CORS_HEADERS });
    }
    return new Response(JSON.stringify({
      meta: { city, currency: 'EUR', source: 'EuroSalary.eu' },
      data,
    }, null, 2), { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=86400' } });
  }

  if (country) {
    const cities = Object.entries(CITY_DATA)
      .filter(([, d]) => d.country === country)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

    return new Response(JSON.stringify({
      meta: { country, currency: 'EUR', source: 'EuroSalary.eu' },
      data: cities,
    }, null, 2), { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=86400' } });
  }

  // Return all cities
  return new Response(JSON.stringify({
    meta: { currency: 'EUR', source: 'EuroSalary.eu', cities: Object.keys(CITY_DATA).length },
    data: CITY_DATA,
  }, null, 2), { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=86400' } });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
