import Stripe from 'stripe';

interface Env {
  STRIPE_SECRET_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);

  try {
    const body = await context.request.json() as {
      customerId: string;
      returnUrl?: string;
      lang?: string;
    };

    if (!body.customerId) {
      return new Response(JSON.stringify({ error: 'customerId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lang = body.lang || 'en';
    const origin = new URL(context.request.url).origin;

    const session = await stripe.billingPortal.sessions.create({
      customer: body.customerId,
      return_url: body.returnUrl || `${origin}/${lang}/pricing/`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
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
