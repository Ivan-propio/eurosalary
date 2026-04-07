// Cloudflare Pages Function — POST /api/auth/forgot-password
// Generates a Supabase password reset link via Admin API
// Sends branded reset email via Resend
// NO Supabase JS SDK — raw fetch only

import {
  type Env as BaseEnv,
  handleOptions,
  corsHeaders,
  jsonError,
} from '../../_shared/auth-helpers';

import { buildPasswordResetEmail, sendEmail } from '../../_shared/email-templates';

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
      lang?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const lang = body.lang || 'en';

    if (!email) {
      return jsonError('Email is required', 400, request);
    }

    // Always return success regardless of whether the email exists
    // to prevent email enumeration attacks
    try {
      // 1. Generate password reset link via Supabase Admin API
      const generateRes = await fetch(
        `${env.PUBLIC_SUPABASE_URL}/auth/v1/admin/generate_link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            type: 'recovery',
            email,
            redirect_to: `https://eurosalary.eu/${lang}/auth/callback/`,
          }),
        }
      );

      if (generateRes.ok) {
        const data = await generateRes.json() as { action_link?: string };
        const actionLink = data.action_link;

        if (actionLink && env.RESEND_API_KEY) {
          // 2. Send branded password reset email via Resend
          const { subject, html } = buildPasswordResetEmail(lang, actionLink);
          await sendEmail(env.RESEND_API_KEY, email, subject, html);
        }
      }
      // If user doesn't exist or any error, silently continue
    } catch {
      // Silently fail — don't reveal if email exists or not
    }

    // Always return success
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request),
        },
      }
    );
  } catch (err) {
    console.error('Forgot password error:', err);
    return jsonError('Internal server error', 500, request);
  }
};
