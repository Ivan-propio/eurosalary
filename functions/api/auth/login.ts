// Cloudflare Pages Function — POST /api/auth/login
// Authenticates user via Supabase Auth and returns plan/entitlements
// NO Supabase JS SDK — raw fetch only

import {
  type Env,
  handleOptions,
  corsHeaders,
  supabaseAuthFetch,
  fetchEntitlements,
  setAuthCookies,
  jsonError,
} from '../../_shared/auth-helpers';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return handleOptions(context.request);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json() as {
      email?: string;
      password?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return jsonError('Email and password are required', 400, request);
    }

    // 1. Authenticate via Supabase Auth REST API
    const tokenRes = await supabaseAuthFetch(env, '/token?grant_type=password', {
      method: 'POST',
      body: { email, password },
    });

    const tokenData = await tokenRes.json() as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      user?: { id: string; email: string };
      error?: string;
      error_description?: string;
      msg?: string;
    };

    if (!tokenRes.ok || !tokenData.access_token) {
      const errMsg = tokenData.error_description || tokenData.error || tokenData.msg || 'Invalid credentials';
      return jsonError(errMsg, tokenRes.status === 400 ? 401 : tokenRes.status, request);
    }

    const user = tokenData.user!;

    // 2. Fetch entitlements (view or direct query fallback)
    const entitlements = await fetchEntitlements(env, user.id, user.email);

    // 3. Set httpOnly cookies
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    });

    setAuthCookies(responseHeaders, {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token!,
      expires_in: tokenData.expires_in || 3600,
    });

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
        },
        plan: entitlements?.plan || 'free',
        entitlements: entitlements || {
          is_paid: false,
          has_api_access: false,
          daily_api_limit: 10,
          has_csv_export: false,
          has_pdf_reports: false,
          plan: null,
          subscription_status: null,
          current_period_end: null,
        },
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error('Login error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
