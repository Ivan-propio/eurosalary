-- ============================================
-- Payments & Subscriptions Layer for EuroSalary
-- Safe to run multiple times (IF NOT EXISTS)
-- Depends on: apply-crm.sql (must run first)
-- ============================================

-- ---- 1. Subscriptions ----
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE SET NULL,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT NOT NULL,
  plan TEXT NOT NULL,  -- 'pro', 'business', 'api_dev', 'api_biz', 'employer_starter', 'employer_pro'
  status TEXT NOT NULL DEFAULT 'active',  -- 'active', 'past_due', 'cancelled', 'trialing', 'incomplete'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  amount_eur INTEGER NOT NULL DEFAULT 0,
  interval TEXT NOT NULL DEFAULT 'month',  -- 'month', 'year', 'one_time'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_lead ON subscriptions(lead_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON subscriptions(plan);

-- ---- 2. Payments ----
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES crm_leads(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_invoice_id TEXT,
  amount_eur INTEGER NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'pending',  -- 'succeeded', 'failed', 'refunded', 'pending'
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_payments_subscription ON payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_lead ON payments(lead_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at DESC);

-- ---- 3. Salary Alerts ----
CREATE TABLE IF NOT EXISTS salary_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  country_code CHAR(2),
  job_slug TEXT,
  frequency TEXT DEFAULT 'monthly',  -- 'weekly', 'monthly'
  threshold_change NUMERIC(5,2) DEFAULT 5.00,  -- notify when salary changes by X%
  is_active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_salary_alerts_lead ON salary_alerts(lead_id);
CREATE INDEX IF NOT EXISTS idx_salary_alerts_email ON salary_alerts(email);
CREATE INDEX IF NOT EXISTS idx_salary_alerts_active ON salary_alerts(is_active) WHERE is_active = true;

-- ---- 4. Report Purchases ----
CREATE TABLE IF NOT EXISTS report_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE SET NULL,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL,  -- 'single_country', 'bundle_all'
  country_code CHAR(2),
  download_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 10,
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '90 days'),
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_report_purchases_lead ON report_purchases(lead_id);
CREATE INDEX IF NOT EXISTS idx_report_purchases_token ON report_purchases(download_token);

-- ---- 5. Add columns to existing CRM tables ----

-- crm_leads: link to Stripe
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
CREATE INDEX IF NOT EXISTS idx_crm_leads_stripe ON crm_leads(stripe_customer_id);

-- crm_api_keys: link to subscription
ALTER TABLE crm_api_keys ADD COLUMN IF NOT EXISTS subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL;

-- crm_analytics_daily: revenue metrics
ALTER TABLE crm_analytics_daily ADD COLUMN IF NOT EXISTS mrr_eur NUMERIC(12,2) DEFAULT 0;
ALTER TABLE crm_analytics_daily ADD COLUMN IF NOT EXISTS arr_eur NUMERIC(12,2) DEFAULT 0;
ALTER TABLE crm_analytics_daily ADD COLUMN IF NOT EXISTS active_subscriptions INTEGER DEFAULT 0;
ALTER TABLE crm_analytics_daily ADD COLUMN IF NOT EXISTS churned_subscriptions INTEGER DEFAULT 0;
ALTER TABLE crm_analytics_daily ADD COLUMN IF NOT EXISTS new_subscriptions INTEGER DEFAULT 0;
ALTER TABLE crm_analytics_daily ADD COLUMN IF NOT EXISTS payment_volume_eur NUMERIC(12,2) DEFAULT 0;

-- ---- 6. Triggers ----
DROP TRIGGER IF EXISTS trg_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER trg_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---- 7. RLS ----
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_purchases ENABLE ROW LEVEL SECURITY;

-- ---- 8. RLS Policies (anon insert for public forms) ----
DROP POLICY IF EXISTS "anon_insert_alerts" ON salary_alerts;
CREATE POLICY "anon_insert_alerts" ON salary_alerts FOR INSERT TO anon WITH CHECK (true);

-- ---- 9. Views for dashboard queries ----
CREATE OR REPLACE VIEW v_mrr AS
SELECT
  COALESCE(SUM(CASE
    WHEN interval = 'month' THEN amount_eur
    WHEN interval = 'year' THEN amount_eur / 12
    ELSE 0
  END), 0) AS mrr_eur,
  COUNT(*) AS active_subs
FROM subscriptions
WHERE status = 'active';

CREATE OR REPLACE VIEW v_monthly_revenue AS
SELECT
  date_trunc('month', created_at)::date AS month,
  SUM(amount_eur) AS total_eur,
  COUNT(*) AS payment_count
FROM payments
WHERE status = 'succeeded'
GROUP BY 1
ORDER BY 1 DESC;

CREATE OR REPLACE VIEW v_plan_breakdown AS
SELECT
  plan,
  COUNT(*) AS sub_count,
  SUM(amount_eur) AS total_eur
FROM subscriptions
WHERE status = 'active'
GROUP BY plan
ORDER BY total_eur DESC;

-- ---- Done! ----
-- 4 new tables + 5 altered columns + 3 views created.
-- Run AFTER apply-crm.sql.
