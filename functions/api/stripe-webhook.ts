import Stripe from 'stripe';
import { buildSubscriptionEmail, buildPaymentEmail, sendEmail } from '../_shared/email-templates';

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
  const sig = context.request.headers.get('stripe-signature');

  if (!sig) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await context.request.text();
    event = stripe.webhooks.constructEvent(body, sig, context.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabaseUrl = context.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = context.env.SUPABASE_SERVICE_ROLE_KEY || context.env.PUBLIC_SUPABASE_ANON_KEY;

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const customerId = typeof session.customer === 'string'
          ? session.customer
          : (session.customer as any)?.id || null;

        const customerEmail = session.customer_email
          || (session.customer_details as any)?.email
          || (typeof session.customer !== 'string' ? (session.customer as any)?.email : null)
          || null;

        // Detect language from metadata or default to 'en'
        const lang = session.metadata?.lang || 'en';

        // Upsert customer in crm_leads
        if (customerEmail) {
          await supabaseUpsert(supabaseUrl, supabaseKey, 'crm_leads', {
            email: customerEmail,
            stripe_customer_id: customerId,
            source: 'stripe_checkout',
            status: 'converted',
          }, 'email');
        }

        // Record payment
        await supabaseInsert(supabaseUrl, supabaseKey, 'payments', {
          stripe_payment_intent_id: session.payment_intent || session.id,
          stripe_invoice_id: null,
          amount_eur: session.amount_total || 0,
          currency: session.currency?.toUpperCase() || 'EUR',
          status: session.payment_status === 'paid' ? 'succeeded' : 'pending',
          description: `Checkout ${session.mode}: ${session.id}`,
          metadata: session.metadata || {},
        });

        // Link auth user if client_reference_id is present
        const authUserId = session.client_reference_id;
        let hasAuthAccount = !!authUserId;

        if (authUserId && customerEmail) {
          await fetch(`${supabaseUrl}/rest/v1/crm_leads?email=eq.${encodeURIComponent(customerEmail)}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Prefer': 'return=minimal',
            },
            body: JSON.stringify({ auth_user_id: authUserId }),
          });
        }

        // If no client_reference_id, check if email has an existing auth account
        if (!hasAuthAccount && customerEmail) {
          try {
            const leadRes = await fetch(
              `${supabaseUrl}/rest/v1/crm_leads?email=eq.${encodeURIComponent(customerEmail)}&select=auth_user_id`,
              { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
            );
            if (leadRes.ok) {
              const leads = await leadRes.json() as { auth_user_id: string | null }[];
              if (leads.length > 0 && leads[0].auth_user_id) {
                hasAuthAccount = true;
              }
            }
          } catch {}
        }

        // Auto-generate API key for paid subscribers
        if (customerEmail && session.mode === 'subscription') {
          try {
            const leadRes = await fetch(
              `${supabaseUrl}/rest/v1/crm_leads?email=eq.${encodeURIComponent(customerEmail)}&select=id`,
              { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
            );
            if (leadRes.ok) {
              const leads = await leadRes.json() as { id: string }[];
              if (leads.length > 0) {
                const existingRes = await fetch(
                  `${supabaseUrl}/rest/v1/crm_api_keys?lead_id=eq.${leads[0].id}&is_active=eq.true&select=id&limit=1`,
                  { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
                );
                const existingKeys = existingRes.ok ? (await existingRes.json() as any[]) : [];
                if (existingKeys.length === 0) {
                  const bytes = new Uint8Array(32);
                  crypto.getRandomValues(bytes);
                  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
                  const apiKey = `esk_live_${hex}`;
                  await supabaseInsert(supabaseUrl, supabaseKey, 'crm_api_keys', {
                    lead_id: leads[0].id,
                    api_key: apiKey,
                    name: 'Auto-generated on subscription',
                    daily_limit: 10000,
                    daily_usage: 0,
                    is_active: true,
                  });
                }
              }
            }
          } catch (keyErr: any) {
            console.error('API key generation error:', keyErr.message);
          }
        }

        // Send branded confirmation email
        if (customerEmail && context.env.RESEND_API_KEY) {
          if (session.mode === 'subscription') {
            const { subject, html } = buildSubscriptionEmail(lang, hasAuthAccount);
            await sendEmail(context.env.RESEND_API_KEY, customerEmail, subject, html);
          } else {
            const { subject, html } = buildPaymentEmail(lang);
            await sendEmail(context.env.RESEND_API_KEY, customerEmail, subject, html);
          }
        }

        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const priceId = sub.items.data[0]?.price?.id || '';
        const productId = sub.items.data[0]?.price?.product as string || '';
        const amount = sub.items.data[0]?.price?.unit_amount || 0;
        const interval = sub.items.data[0]?.price?.recurring?.interval || 'month';

        const planMap: Record<string, string> = {
          // Test mode
          'prod_UI96j9yQFofhqA': 'pro',
          'prod_UI96u4eaqslsff': 'business',
          'prod_UI96JMRfrGkYkC': 'api_dev',
          'prod_UI96xoPIS8SBa8': 'api_biz',
          'prod_UI96LZnP98O1ZC': 'employer_starter',
          'prod_UI96LluceJ0c3G': 'employer_pro',
          // Live mode
          'prod_UI9MEo3eMqmySl': 'pro',
          'prod_UI9ML5efOD4dgg': 'business',
          'prod_UI9M1FjOvGvwfY': 'api_dev',
          'prod_UI9MgsuqUn11Sx': 'api_biz',
          'prod_UI9MYQe3s58xfF': 'employer_starter',
          'prod_UI9M25ahnQzpvs': 'employer_pro',
        };

        const subCustomerId = typeof sub.customer === 'string' ? sub.customer : (sub.customer as any)?.id || '';

        await supabaseUpsert(supabaseUrl, supabaseKey, 'subscriptions', {
          stripe_subscription_id: sub.id,
          stripe_customer_id: subCustomerId,
          stripe_price_id: priceId,
          plan: planMap[productId] || 'unknown',
          status: sub.status,
          amount_eur: amount,
          interval: interval,
          current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
        }, 'stripe_subscription_id');
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await supabaseUpsert(supabaseUrl, supabaseKey, 'subscriptions', {
          stripe_subscription_id: sub.id,
          status: 'cancelled',
        }, 'stripe_subscription_id');
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await supabaseInsert(supabaseUrl, supabaseKey, 'payments', {
          stripe_invoice_id: invoice.id,
          amount_eur: invoice.amount_paid,
          currency: invoice.currency?.toUpperCase() || 'EUR',
          status: 'succeeded',
          description: `Invoice payment: ${invoice.id}`,
        });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await supabaseInsert(supabaseUrl, supabaseKey, 'payments', {
          stripe_invoice_id: invoice.id,
          amount_eur: invoice.amount_due,
          currency: invoice.currency?.toUpperCase() || 'EUR',
          status: 'failed',
          description: `Failed invoice: ${invoice.id}`,
        });
        break;
      }
    }
  } catch (err: any) {
    console.error('Webhook handler error:', err.message);
    // Still return 200 to acknowledge receipt — Stripe retries on non-2xx
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// --- Supabase helpers ---

async function supabaseInsert(url: string, key: string, table: string, data: Record<string, any>) {
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Supabase insert to ${table} failed: ${text}`);
  }
}

async function supabaseUpsert(url: string, key: string, table: string, data: Record<string, any>, conflictColumn: string) {
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Prefer': 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Supabase upsert to ${table} failed: ${text}`);
  }
}
