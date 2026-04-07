// Cloudflare Pages Function — GET /api/auth/session
// Validates current session from cookie and returns user + entitlements
// NO Supabase JS SDK — raw fetch only

import {
  type Env,
  handleOptions,
  corsHeaders,
  parseCookies,
  supabaseAuthFetch,
  fetchEntitlements,
  jsonError,
} from '../../_shared/auth-helpers';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return handleOptions(context.request);
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const cookies = parseCookies(request);
    const accessToken = cookies['sb-access-token'];

    if (!accessToken) {
      return new Response(
        JSON.stringify({ user: null }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(request),
          },
        }
      );
    }

    // 1. Validate token by calling Supabase Auth /user
    const userRes = await supabaseAuthFetch(env, '/user', {
      accessToken,
    });

    if (!userRes.ok) {
      // Token is invalid or expired
      return new Response(
        JSON.stringify({ user: null }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(request),
          },
        }
      );
    }

    const userData = await userRes.json() as {
      id: string;
      email: string;
      created_at: string;
      user_metadata?: Record<string, unknown>;
    };

    // 2. Fetch entitlements (view or direct query fallback)
    const entitlements = await fetchEntitlements(env, userData.id, userData.email);

    return new Response(
      JSON.stringify({
        user: {
          id: userData.id,
          email: userData.email,
          created_at: userData.created_at,
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
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request),
        },
      }
    );
  } catch (err) {
    console.error('Session error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
