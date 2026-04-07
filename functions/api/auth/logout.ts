// Cloudflare Pages Function — POST /api/auth/logout
// Clears auth cookies and calls Supabase Auth logout
// NO Supabase JS SDK — raw fetch only

import {
  type Env,
  handleOptions,
  corsHeaders,
  parseCookies,
  clearAuthCookies,
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
    const accessToken = cookies['sb-access-token'];

    // 1. Call Supabase Auth logout if we have a token
    if (accessToken) {
      try {
        await supabaseAuthFetch(env, '/logout', {
          method: 'POST',
          accessToken,
        });
      } catch {
        // Logout failure is not critical — we still clear cookies
      }
    }

    // 2. Clear cookies
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    });

    clearAuthCookies(responseHeaders);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error('Logout error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
