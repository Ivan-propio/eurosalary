// Cloudflare Pages Middleware — /{lang}/dashboard/ auth gate
// Runs server-side before serving any /*/dashboard/* page.
// If no valid sb-access-token cookie → redirect to /{lang}/login/
// This replaces the old client-side JS fetch for auth, preventing flash of content.

import { parseCookies, supabaseAuthFetch, type Env } from '../../_shared/auth-helpers';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params, next } = context;

  // Extract lang from route params (Cloudflare sets it from [lang] folder)
  const lang = (params as Record<string, string>).lang || 'en';

  try {
    const cookies = parseCookies(request);
    const accessToken = cookies['sb-access-token'];

    if (!accessToken) {
      const loginUrl = new URL(`/${lang}/login/`, request.url);
      loginUrl.searchParams.set('next', `/${lang}/dashboard/`);
      return Response.redirect(loginUrl.toString(), 302);
    }

    // Validate token with Supabase
    const userRes = await supabaseAuthFetch(env, '/user', { accessToken });

    if (!userRes.ok) {
      const loginUrl = new URL(`/${lang}/login/`, request.url);
      loginUrl.searchParams.set('next', `/${lang}/dashboard/`);
      return Response.redirect(loginUrl.toString(), 302);
    }

    // Token valid — let the request through
    return next();
  } catch (err) {
    // On error, fail open (let client-side JS handle it) to avoid false lockouts
    return next();
  }
};
