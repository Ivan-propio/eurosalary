// Cloudflare Pages Function — POST /api/auth/refresh
// Refreshes access token using the refresh token cookie
// NO Supabase JS SDK — raw fetch only

import {
  type Env,
  handleOptions,
  corsHeaders,
  parseCookies,
  setAuthCookies,
  supabaseAuthFetch,
  jsonError,
} from '../../_shared/auth-helpers';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return handleOptions(context.request);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const cookies = parseCookies(request);
    const refreshToken = cookies['sb-refresh-token'];

    if (!refreshToken) {
      return jsonError('No refresh token', 401, request);
    }

    // 1. Call Supabase Auth to refresh the token
    const refreshRes = await supabaseAuthFetch(env, '/token?grant_type=refresh_token', {
      method: 'POST',
      body: { refresh_token: refreshToken },
    });

    const refreshData = await refreshRes.json() as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      user?: { id: string; email: string };
      error?: string;
      error_description?: string;
      msg?: string;
    };

    if (!refreshRes.ok || !refreshData.access_token) {
      const errMsg = refreshData.error_description || refreshData.error || refreshData.msg || 'Token refresh failed';
      return jsonError(errMsg, 401, request);
    }

    // 2. Set new cookies
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    });

    setAuthCookies(responseHeaders, {
      access_token: refreshData.access_token,
      refresh_token: refreshData.refresh_token!,
      expires_in: refreshData.expires_in || 3600,
    });

    return new Response(
      JSON.stringify({
        user: refreshData.user
          ? { id: refreshData.user.id, email: refreshData.user.email }
          : null,
        expires_in: refreshData.expires_in,
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error('Refresh error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
