// Cloudflare Pages Function — POST /api/auth/callback
// Handles Supabase Auth redirect callback: validates token, sets httpOnly cookies
// NO Supabase JS SDK — raw fetch only

import {
  type Env,
  handleOptions,
  corsHeaders,
  supabaseAuthFetch,
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
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
    };

    const accessToken = body.access_token;
    const refreshToken = body.refresh_token;
    const expiresIn = body.expires_in || 3600;

    if (!accessToken || !refreshToken) {
      return jsonError('access_token and refresh_token are required', 400, request);
    }

    // Validate the access token by fetching the user from Supabase
    const userRes = await supabaseAuthFetch(env, '/user', {
      method: 'GET',
      accessToken: accessToken,
    });

    const userData = await userRes.json() as {
      id?: string;
      email?: string;
      error?: string;
      error_description?: string;
      msg?: string;
    };

    if (!userRes.ok || !userData.id) {
      const errMsg = userData.error_description || userData.error || userData.msg || 'Invalid or expired token';
      return jsonError(errMsg, 401, request);
    }

    // Set httpOnly cookies
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    });

    setAuthCookies(responseHeaders, {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    });

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: userData.id,
          email: userData.email,
        },
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error('Auth callback error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
