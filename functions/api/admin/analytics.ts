/**
 * Admin Analytics Proxy — GA4 Data API
 *
 * Fetches analytics data from GA4 Data API and returns it.
 * Requires GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_JSON in env.
 *
 * GET /api/admin/analytics?range=7d
 * GET /api/admin/analytics?range=30d
 * GET /api/admin/analytics?range=90d
 *
 * Returns: { topPages, topCountries, trafficByDay, contentGroups, conversions }
 *
 * NOTE: Until GA4 service account is configured, this returns mock structure
 * so the dashboard can be built and tested. Replace with real API calls when ready.
 */

interface Env {
  GA4_PROPERTY_ID?: string;
  GA4_SERVICE_ACCOUNT_JSON?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://eurosalary.eu',
  };

  const url = new URL(context.request.url);
  const range = url.searchParams.get('range') || '7d';
  const propertyId = context.env.GA4_PROPERTY_ID;
  const serviceAccountJson = context.env.GA4_SERVICE_ACCOUNT_JSON;

  // If GA4 credentials are configured, fetch real data
  if (propertyId && serviceAccountJson) {
    try {
      const data = await fetchGA4Data(propertyId, serviceAccountJson, range);
      return new Response(JSON.stringify(data), { headers });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message, fallback: true, ...getPlaceholderData(range) }), { headers });
    }
  }

  // No credentials yet — return placeholder structure
  return new Response(JSON.stringify({
    configured: false,
    message: 'GA4 service account not configured. Set GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_JSON in Cloudflare Pages env.',
    ...getPlaceholderData(range)
  }), { headers });
};

async function fetchGA4Data(propertyId: string, serviceAccountJson: string, range: string) {
  // Parse service account credentials
  const sa = JSON.parse(serviceAccountJson);

  // Create JWT for Google OAuth
  const jwt = await createGoogleJWT(sa);

  // Exchange JWT for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json() as any;
  if (!tokenData.access_token) throw new Error('Failed to get access token');

  const accessToken = tokenData.access_token;
  const days = range === '90d' ? 90 : range === '30d' ? 30 : 7;
  const startDate = `${days}daysAgo`;

  // Fetch multiple reports in parallel
  const [pageViews, countries, contentGroups, dailyTraffic] = await Promise.all([
    runGA4Report(propertyId, accessToken, {
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'averageSessionDuration' }, { name: 'bounceRate' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 20,
    }),
    runGA4Report(propertyId, accessToken, {
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 15,
    }),
    runGA4Report(propertyId, accessToken, {
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'contentGroup' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'averageSessionDuration' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    }),
    runGA4Report(propertyId, accessToken, {
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
      orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
    }),
  ]);

  return {
    configured: true,
    range,
    topPages: formatReport(pageViews, ['pagePath'], ['views', 'avgDuration', 'bounceRate']),
    topCountries: formatReport(countries, ['country'], ['users', 'sessions']),
    contentGroups: formatReport(contentGroups, ['group'], ['views', 'users', 'avgDuration']),
    trafficByDay: formatReport(dailyTraffic, ['date'], ['users', 'sessions', 'views']),
  };
}

async function runGA4Report(propertyId: string, accessToken: string, body: any) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

function formatReport(report: any, dimNames: string[], metricNames: string[]) {
  if (!report?.rows) return [];
  return report.rows.map((row: any) => {
    const item: any = {};
    row.dimensionValues?.forEach((d: any, i: number) => { item[dimNames[i]] = d.value; });
    row.metricValues?.forEach((m: any, i: number) => { item[metricNames[i]] = parseFloat(m.value); });
    return item;
  });
}

async function createGoogleJWT(sa: any): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const claims = btoa(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));

  const unsignedToken = `${header}.${claims}`;

  // Import private key and sign
  const pemContents = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\n/g, '');

  const keyData = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return `${unsignedToken}.${sig}`;
}

function getPlaceholderData(range: string) {
  return {
    range,
    topPages: [
      { pagePath: '/en/', views: 0, avgDuration: 0, bounceRate: 0 },
    ],
    topCountries: [
      { country: '(not set)', users: 0, sessions: 0 },
    ],
    contentGroups: [
      { group: 'salary_page', views: 0, users: 0, avgDuration: 0 },
      { group: 'pricing', views: 0, users: 0, avgDuration: 0 },
      { group: 'b2b_employers', views: 0, users: 0, avgDuration: 0 },
    ],
    trafficByDay: [],
  };
}
