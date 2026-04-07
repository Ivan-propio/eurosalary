// Cloudflare Pages Function — POST /api/auth/signup
// Creates a new Supabase Auth user via Admin API (auto-confirmed, no Supabase email)
// Sends branded welcome email via Resend
// NO Supabase JS SDK — raw fetch only

import {
  type Env as BaseEnv,
  handleOptions,
  corsHeaders,
  supabaseAuthFetch,
  supabaseRestQuery,
  linkLeadToAuthUser,
  setAuthCookies,
  jsonError,
} from '../../_shared/auth-helpers';

import { buildWelcomeEmail, sendEmail } from '../../_shared/email-templates';

interface Env extends BaseEnv {
  RESEND_API_KEY: string;
}

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

    // 1. Create user via Admin API (auto-confirmed, NO Supabase email sent)
    const createRes = await fetch(`${env.PUBLIC_SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { lang },
      }),
    });

    if (!createRes.ok) {
      const errData = await createRes.json() as { msg?: string; message?: string; error?: string };
      const errMsg = errData.msg || errData.message || errData.error || 'Signup failed';

      // 422 = user already exists
      if (createRes.status === 422) {
        return jsonError('An account with this email already exists. Please log in instead.', 409, request);
      }
      return jsonError(errMsg, createRes.status, request);
    }

    const userData = await createRes.json() as { id: string; email: string };
    const userId = userData.id;

    // 2. Login to get tokens (user is already confirmed)
    const tokenRes = await supabaseAuthFetch(env, '/token?grant_type=password', {
      method: 'POST',
      body: { email, password },
    });

    const tokenData = await tokenRes.json() as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      error?: string;
      error_description?: string;
    };

    if (!tokenRes.ok || !tokenData.access_token) {
      // User was created but login failed — still return success
      console.error('Auto-login failed after signup:', tokenData.error_description || tokenData.error);
      return new Response(
        JSON.stringify({
          user: { id: userId, email },
          session: null,
          confirmation_required: false,
          message: 'Account created. Please log in.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
        }
      );
    }

    // 3. Link to existing crm_leads row (or create one)
    await linkLeadToAuthUser(env, email, userId);

    try {
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
            auth_user_id: userId,
            language: lang,
            source: 'signup',
            status: 'new',
          },
          headers: { 'Prefer': 'return=minimal' },
        });
      }
    } catch {
      // Non-critical — continue
    }

    // 4. Set httpOnly cookies
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    });

    setAuthCookies(responseHeaders, {
      access_token: tokenData.access_token!,
      refresh_token: tokenData.refresh_token!,
      expires_in: tokenData.expires_in || 3600,
    });

    // 5. Send branded welcome email via Resend (non-blocking)
    if (env.RESEND_API_KEY) {
      const { subject, html } = buildWelcomeEmail(lang);
      // Fire and forget — don't block the response
      sendEmail(env.RESEND_API_KEY, email, subject, html).catch(() => {});
    }

    return new Response(
      JSON.stringify({
        user: { id: userId, email },
        session: {
          access_token: tokenData.access_token,
          expires_in: tokenData.expires_in,
        },
        confirmation_required: false,
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error('Signup error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
