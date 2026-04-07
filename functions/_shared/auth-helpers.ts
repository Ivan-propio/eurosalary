// Shared auth helpers for EuroSalary Cloudflare Pages Functions
// Cookie management + CORS + Supabase REST helpers
// NO Supabase JS SDK — raw fetch only

export interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface SupabaseUser {
  id: string;
  email: string;
  created_at: string;
  [key: string]: unknown;
}

export interface Entitlements {
  is_paid: boolean;
  has_api_access: boolean;
  daily_api_limit: number;
  has_csv_export: boolean;
  has_pdf_reports: boolean;
  plan: string | null;
  subscription_status: string | null;
  current_period_end: string | null;
}

// ---- CORS ----

const ALLOWED_ORIGINS = [
  'https://eurosalary.eu',
  'https://www.eurosalary.eu',
  'https://staging.eurosalary.eu',
  'http://localhost:4321', // Astro dev
  'http://localhost:8788', // Wrangler dev
];

export function getCorsOrigin(request: Request): string {
  const origin = request.headers.get('Origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  return ALLOWED_ORIGINS[0]; // default to production
}

export function corsHeaders(request: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': getCorsOrigin(request),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export function handleOptions(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

// ---- Cookies ----

const COOKIE_OPTIONS = 'HttpOnly; Secure; SameSite=Strict; Path=/';

export function setAuthCookies(
  headers: Headers,
  tokens: AuthTokens
): void {
  const maxAge = tokens.expires_in || 3600;
  headers.append(
    'Set-Cookie',
    `sb-access-token=${tokens.access_token}; ${COOKIE_OPTIONS}; Max-Age=${maxAge}`
  );
  // Refresh token lives longer — 30 days
  headers.append(
    'Set-Cookie',
    `sb-refresh-token=${tokens.refresh_token}; ${COOKIE_OPTIONS}; Max-Age=${30 * 24 * 3600}`
  );
}

export function clearAuthCookies(headers: Headers): void {
  headers.append(
    'Set-Cookie',
    `sb-access-token=; ${COOKIE_OPTIONS}; Max-Age=0`
  );
  headers.append(
    'Set-Cookie',
    `sb-refresh-token=; ${COOKIE_OPTIONS}; Max-Age=0`
  );
}

export function parseCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key) cookies[key.trim()] = rest.join('=').trim();
  }
  return cookies;
}

// ---- Supabase REST helpers ----

/** Call Supabase Auth REST API */
export async function supabaseAuthFetch(
  env: Env,
  path: string,
  options: {
    method?: string;
    body?: unknown;
    accessToken?: string;
  } = {}
): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': env.PUBLIC_SUPABASE_ANON_KEY,
  };
  if (options.accessToken) {
    headers['Authorization'] = `Bearer ${options.accessToken}`;
  }
  return fetch(`${env.PUBLIC_SUPABASE_URL}/auth/v1${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
}

/** Call Supabase PostgREST API using the service role key */
export async function supabaseRestQuery(
  env: Env,
  path: string,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  } = {}
): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    ...options.headers,
  };
  return fetch(`${env.PUBLIC_SUPABASE_URL}/rest/v1${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
}

/** Fetch user entitlements from the v_user_entitlements view.
 *  Falls back to direct query if the view doesn't exist (pre-migration). */
export async function fetchEntitlements(
  env: Env,
  authUserId: string,
  email?: string
): Promise<Entitlements | null> {
  // Try the view first
  const res = await supabaseRestQuery(
    env,
    `/v_user_entitlements?auth_user_id=eq.${authUserId}&select=*&limit=1`
  );
  if (res.ok) {
    const rows = (await res.json()) as Entitlements[];
    if (rows && rows.length > 0) return rows[0];
  }

  // Fallback: direct query via email if view doesn't exist or returns empty
  if (email) {
    try {
      // Find lead by email
      const leadRes = await supabaseRestQuery(
        env,
        `/crm_leads?email=eq.${encodeURIComponent(email)}&select=id&limit=1`
      );
      if (!leadRes.ok) return null;
      const leads = (await leadRes.json()) as { id: string }[];
      if (!leads || leads.length === 0) return null;

      // Find active subscription
      const subRes = await supabaseRestQuery(
        env,
        `/subscriptions?lead_id=eq.${leads[0].id}&status=in.(active,trialing,past_due)&select=plan,status,current_period_end&order=created_at.desc&limit=1`
      );
      if (!subRes.ok) return null;
      const subs = (await subRes.json()) as { plan: string; status: string; current_period_end: string }[];
      if (!subs || subs.length === 0) return null;

      const s = subs[0];
      const isActive = ['active', 'trialing'].includes(s.status);
      return {
        is_paid: isActive,
        has_api_access: isActive && ['api_dev', 'api_biz', 'business', 'employer_pro'].includes(s.plan),
        daily_api_limit: isActive ? ({ api_biz: 10000, api_dev: 1000, business: 500, employer_pro: 500, pro: 50 }[s.plan] || 10) : 10,
        has_csv_export: isActive && ['pro', 'business', 'api_dev', 'api_biz', 'employer_starter', 'employer_pro'].includes(s.plan),
        has_pdf_reports: isActive && ['pro', 'business', 'api_dev', 'api_biz', 'employer_starter', 'employer_pro'].includes(s.plan),
        plan: s.plan,
        subscription_status: s.status,
        current_period_end: s.current_period_end,
      };
    } catch {
      return null;
    }
  }

  return null;
}

/** Link a crm_leads row to an auth user by email match.
 *  Silently fails if auth_user_id column doesn't exist yet (pre-migration). */
export async function linkLeadToAuthUser(
  env: Env,
  email: string,
  authUserId: string
): Promise<void> {
  try {
    await supabaseRestQuery(
      env,
      `/crm_leads?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        body: { auth_user_id: authUserId },
        headers: { 'Prefer': 'return=minimal' },
      }
    );
  } catch {
    // Silently fail — column may not exist yet
  }
}

/** JSON error response */
export function jsonError(
  message: string,
  status: number,
  request: Request
): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(request),
      },
    }
  );
}

/** JSON success response */
export function jsonOk(
  data: unknown,
  request: Request,
  extraHeaders?: Headers
): Response {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...corsHeaders(request),
  });
  if (extraHeaders) {
    extraHeaders.forEach((value, key) => {
      headers.append(key, value);
    });
  }
  return new Response(JSON.stringify(data), { status: 200, headers });
}
