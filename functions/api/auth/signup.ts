// Cloudflare Pages Function — POST /api/auth/signup
// Creates a new Supabase Auth user and links to existing crm_leads row
// NO Supabase JS SDK — raw fetch only

import {
  type Env,
  handleOptions,
  corsHeaders,
  supabaseAuthFetch,
  supabaseRestQuery,
  linkLeadToAuthUser,
  setAuthCookies,
  jsonError,
  type AuthTokens,
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
      lang?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const lang = body.lang || 'en';

    if (!email || !password) {
      return jsonError('Email and password are required', 400, request);
    }

    if (password.length < 8) {
      return jsonError('Password must be at least 8 characters', 400, request);
    }

    // 1. Sign up via Supabase Auth REST API
    const signupRes = await supabaseAuthFetch(env, '/signup', {
      method: 'POST',
      body: {
        email,
        password,
        data: { lang },
      },
    });

    const signupData = await signupRes.json() as {
      id?: string;
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      user?: { id: string; email: string };
      error?: string;
      error_description?: string;
      msg?: string;
    };

    if (!signupRes.ok) {
      const errMsg = signupData.error_description || signupData.error || signupData.msg || 'Signup failed';
      return jsonError(errMsg, signupRes.status, request);
    }

    // Supabase may return the user directly (autoconfirm) or require email confirmation.
    // If autoconfirm is on, we get access_token + refresh_token.
    // If email confirmation required, we get user but no tokens.
    const user = signupData.user || { id: signupData.id, email };
    const hasSession = !!signupData.access_token;

    // 2. Link to existing crm_leads row if email matches
    if (user.id) {
      await linkLeadToAuthUser(env, email, user.id);

      // If no existing lead, create one
      const checkRes = await supabaseRestQuery(
        env,
        `/crm_leads?email=eq.${encodeURIComponent(email)}&select=id&limit=1`
      );
      const existing = (await checkRes.json()) as { id: string }[];
      if (!existing || existing.length === 0) {
        await supabaseRestQuery(env, '/crm_leads', {
          method: 'POST',
          body: {
            email,
            auth_user_id: user.id,
            language: lang,
            source: 'signup',
            status: 'new',
          },
          headers: { 'Prefer': 'return=minimal' },
        });
      }
    }

    // 3. Set cookies if we have a session
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    });

    if (hasSession) {
      setAuthCookies(responseHeaders, {
        access_token: signupData.access_token!,
        refresh_token: signupData.refresh_token!,
        expires_in: signupData.expires_in || 3600,
      });
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email || email,
        },
        session: hasSession
          ? { access_token: signupData.access_token, expires_in: signupData.expires_in }
          : null,
        confirmation_required: !hasSession,
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error('Signup error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
