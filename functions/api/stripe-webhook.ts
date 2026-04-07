import Stripe from 'stripe';

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

        // Extract customer ID (can be string or expanded object)
        const customerId = typeof session.customer === 'string'
          ? session.customer
          : (session.customer as any)?.id || null;

        // Extract email (customer_email can be null, fallback to customer_details)
        const customerEmail = session.customer_email
          || (session.customer_details as any)?.email
          || (typeof session.customer !== 'string' ? (session.customer as any)?.email : null)
          || null;

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

        // Link auth user if client_reference_id is present (auth_user_id)
        const authUserId = session.client_reference_id;
        if (authUserId && customerEmail) {
          // Update crm_leads with auth_user_id
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

        // Auto-generate API key for paid subscribers
        if (customerEmail && session.mode === 'subscription') {
          try {
            // Get lead ID
            const leadRes = await fetch(
              `${supabaseUrl}/rest/v1/crm_leads?email=eq.${encodeURIComponent(customerEmail)}&select=id`,
              { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
            );
            if (leadRes.ok) {
              const leads = await leadRes.json() as { id: string }[];
              if (leads.length > 0) {
                // Check if they already have an active API key
                const existingRes = await fetch(
                  `${supabaseUrl}/rest/v1/crm_api_keys?lead_id=eq.${leads[0].id}&is_active=eq.true&select=id&limit=1`,
                  { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
                );
                const existingKeys = existingRes.ok ? (await existingRes.json() as any[]) : [];
                if (existingKeys.length === 0) {
                  // Generate API key
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

        // Send confirmation email with dashboard link
        if (customerEmail && context.env.RESEND_API_KEY) {
          await sendConfirmationEmail(
            context.env.RESEND_API_KEY,
            customerEmail,
            session.mode === 'subscription' ? 'subscription' : 'payment'
          );
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

        // Map product to plan name
        // Map both test and live product IDs to plan names
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

// --- Email helper ---

async function sendConfirmationEmail(apiKey: string, email: string, type: 'subscription' | 'payment') {
  const subject = type === 'subscription'
    ? 'Welcome to EuroSalary — Your subscription is active'
    : 'EuroSalary — Payment confirmed';

  const html = buildEmailTemplate(type);

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'EuroSalary <hello@eurosalary.eu>',
      to: email,
      subject,
      html,
    }),
  });
}

// --- Branded email template ---

function buildEmailTemplate(type: 'subscription' | 'payment'): string {
  const header = `
<div style="background:#0F1F3D;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td><span style="color:white;font-family:'Public Sans',Helvetica,Arial,sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.02em;">Euro<span style="color:#60a5fa;">Salary</span></span></td>
          <td style="text-align:right;"><a href="https://eurosalary.eu" style="color:#93c5fd;font-size:12px;text-decoration:none;">eurosalary.eu</a></td>
        </tr></table>
      </td>
    </tr>
  </table>
</div>`;

  const footer = `
<div style="background:#f8fafc;border-top:1px solid #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td style="padding:24px 32px;text-align:center;">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;"><tr>
        <td style="padding:0 8px;"><a href="https://twitter.com/eurosalary" style="color:#64748b;text-decoration:none;font-size:13px;">Twitter</a></td>
        <td style="color:#cbd5e1;">|</td>
        <td style="padding:0 8px;"><a href="https://linkedin.com/company/eurosalary" style="color:#64748b;text-decoration:none;font-size:13px;">LinkedIn</a></td>
        <td style="color:#cbd5e1;">|</td>
        <td style="padding:0 8px;"><a href="https://eurosalary.eu/en/blog/" style="color:#64748b;text-decoration:none;font-size:13px;">Blog</a></td>
        <td style="color:#cbd5e1;">|</td>
        <td style="padding:0 8px;"><a href="https://eurosalary.eu/en/salary-api/" style="color:#64748b;text-decoration:none;font-size:13px;">API</a></td>
      </tr></table>
      <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;">EuroSalary.eu — European Salary Intelligence</p>
      <p style="margin:0 0 4px;font-size:11px;color:#cbd5e1;">Precision. Integrity. Sovereignty.</p>
      <p style="margin:0;font-size:11px;color:#cbd5e1;">Luxembourg | hello@eurosalary.eu</p>
    </td></tr>
  </table>
</div>`;

  if (type === 'subscription') {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Public Sans',Helvetica,Arial,sans-serif;">
${header}
<div style="background:#0F1F3D;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td style="padding:0 32px 32px;text-align:center;">
      <div style="background:rgba(37,99,235,0.15);border:1px solid rgba(96,165,250,0.3);border-radius:20px;display:inline-block;padding:4px 14px;margin-bottom:16px;">
        <span style="color:#93c5fd;font-size:11px;font-weight:700;letter-spacing:0.08em;">SUBSCRIPTION ACTIVE</span>
      </div>
      <h1 style="color:white;font-size:28px;font-weight:800;margin:0 0 8px;letter-spacing:-0.02em;">Welcome to EuroSalary Pro</h1>
      <p style="color:rgba(203,213,225,0.8);font-size:15px;margin:0;">Your premium access is ready. Start exploring now.</p>
    </td></tr>
  </table>
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:white;">
  <tr><td style="padding:32px;">
    <p style="color:#1e293b;font-size:15px;line-height:1.6;margin:0 0 20px;">Here's what's unlocked with your Pro subscription:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="padding:14px 16px;background:#f8fafc;border-radius:6px 6px 0 0;border-bottom:1px solid #e2e8f0;">
          <strong style="color:#0F1F3D;">📊 City-level salary data</strong><br><span style="color:#64748b;font-size:13px;">Detailed breakdowns for 24 cities across Europe</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
          <strong style="color:#0F1F3D;">💰 Net salary calculator</strong><br><span style="color:#64748b;font-size:13px;">Taxes, social contributions, take-home pay by country</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
          <strong style="color:#0F1F3D;">🔌 API access — 10K req/day</strong><br><span style="color:#64748b;font-size:13px;"><a href="https://eurosalary.eu/en/salary-api/" style="color:#2563EB;">View API documentation →</a></span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
          <strong style="color:#0F1F3D;">📥 CSV & data export</strong><br><span style="color:#64748b;font-size:13px;">Download salary data for your own analysis</span>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 16px;background:#f8fafc;border-radius:0 0 6px 6px;">
          <strong style="color:#0F1F3D;">⚡ Priority email support</strong><br><span style="color:#64748b;font-size:13px;">Reach us at hello@eurosalary.eu</span>
        </td>
      </tr>
    </table>
    <div style="text-align:center;margin:0 0 24px;">
      <a href="https://eurosalary.eu/en/dashboard/" style="display:inline-block;background:#2563EB;color:white;padding:14px 36px;border-radius:6px;text-decoration:none;font-weight:700;font-size:15px;">Go to Your Dashboard →</a>
    </div>
    <p style="color:#64748b;font-size:13px;text-align:center;margin:0 0 16px;">Your API key has been auto-generated. View it in your <a href="https://eurosalary.eu/en/dashboard/" style="color:#2563EB;">dashboard</a>.</p>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:14px 18px;margin:0 0 20px;">
      <p style="margin:0;font-size:13px;color:#15803d;"><strong>Manage your subscription</strong> — <a href="https://eurosalary.eu/en/pricing/?manage=true" style="color:#2563EB;">Update payment, change plan, or cancel</a> anytime. No questions asked.</p>
    </div>
  </td></tr>
</table>
${footer}
</body></html>`;
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Public Sans',Helvetica,Arial,sans-serif;">
${header}
<div style="background:#0F1F3D;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td style="padding:0 32px 32px;text-align:center;">
      <h1 style="color:white;font-size:28px;font-weight:800;margin:0 0 8px;">Payment Confirmed ✓</h1>
      <p style="color:rgba(203,213,225,0.8);font-size:15px;margin:0;">Thank you for your purchase.</p>
    </td></tr>
  </table>
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:white;">
  <tr><td style="padding:32px;">
    <p style="color:#1e293b;font-size:15px;line-height:1.6;margin:0 0 20px;">Your report is being generated and will be available shortly.</p>
    <div style="text-align:center;margin:0 0 24px;">
      <a href="https://eurosalary.eu/en/countries/" style="display:inline-block;background:#2563EB;color:white;padding:14px 36px;border-radius:6px;text-decoration:none;font-weight:700;font-size:15px;">Browse Salary Data →</a>
    </div>
    <p style="font-size:13px;color:#64748b;">Questions? Reply to this email or contact <a href="mailto:hello@eurosalary.eu" style="color:#2563EB;">hello@eurosalary.eu</a></p>
  </td></tr>
</table>
${footer}
</body></html>`;
}
