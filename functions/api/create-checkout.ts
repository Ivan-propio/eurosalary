import Stripe from 'stripe';

interface Env {
  STRIPE_SECRET_KEY: string;
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);

  try {
    const body = await context.request.json() as {
      priceId: string;
      mode?: 'subscription' | 'payment';
      successUrl?: string;
      cancelUrl?: string;
      customerEmail?: string;
      lang?: string;
    };

    if (!body.priceId) {
      return new Response(JSON.stringify({ error: 'priceId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const mode = body.mode || 'subscription';
    const lang = body.lang || 'en';
    const origin = new URL(context.request.url).origin;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: [{ price: body.priceId, quantity: 1 }],
      success_url: body.successUrl || `${origin}/${lang}/pricing/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: body.cancelUrl || `${origin}/${lang}/pricing/?canceled=true`,
      allow_promotion_codes: true,
      payment_method_collection: 'if_required',
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
      metadata: { lang, source: 'eurosalary_pricing' },
    };

    if (body.customerEmail) {
      sessionParams.customer_email = body.customerEmail;
    }

    // Try to detect auth user from session cookie and pass as client_reference_id
    const cookies = context.request.headers.get('Cookie') || '';
    const tokenMatch = cookies.match(/sb-access-token=([^;]+)/);
    if (tokenMatch) {
      try {
        const userRes = await fetch(`${context.env.PUBLIC_SUPABASE_URL}/auth/v1/user`, {
          headers: {
            'Authorization': `Bearer ${tokenMatch[1]}`,
            'apikey': context.env.PUBLIC_SUPABASE_ANON_KEY,
          },
        });
        if (userRes.ok) {
          const userData = await userRes.json() as { id: string; email: string };
          sessionParams.client_reference_id = userData.id;
          if (!sessionParams.customer_email) {
            sessionParams.customer_email = userData.email;
          }
        }
      } catch {}
    }

    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: { lang, source: 'eurosalary_pricing' },
      };
    }

    if (mode === 'payment') {
      sessionParams.payment_intent_data = {
        metadata: { lang, source: 'eurosalary_pricing' },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
