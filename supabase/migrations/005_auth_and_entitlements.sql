-- ============================================
-- Auth & Entitlements Layer for EuroSalary
-- Links Supabase Auth users to CRM leads
-- and exposes plan/entitlement info via view
-- Depends on: 004_crm_layer.sql, apply-payments.sql
-- ============================================

-- ---- 1. Add auth_user_id to crm_leads ----
ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS auth_user_id UUID;

-- Reference to auth.users (Supabase managed)
-- Using DO block to avoid error if constraint already exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'crm_leads_auth_user_id_fkey'
  ) THEN
    ALTER TABLE crm_leads
      ADD CONSTRAINT crm_leads_auth_user_id_fkey
      FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Unique index — one auth user per lead
CREATE UNIQUE INDEX IF NOT EXISTS idx_crm_leads_auth_user_id
  ON crm_leads(auth_user_id) WHERE auth_user_id IS NOT NULL;

-- ---- 2. Entitlements view ----
-- Joins crm_leads with their active subscription to determine
-- what features the user has access to.
CREATE OR REPLACE VIEW v_user_entitlements AS
SELECT
  l.auth_user_id,
  l.id AS lead_id,
  l.email,
  l.name,
  l.language,
  s.id AS subscription_id,
  s.plan,
  s.status AS subscription_status,
  s.current_period_end,
  -- Is the user on an active paid plan?
  COALESCE(s.status IN ('active', 'trialing'), false) AS is_paid,
  -- API access: api_dev, api_biz, business, employer_pro, enterprise plans
  COALESCE(s.plan IN ('api_dev', 'api_biz', 'business', 'employer_pro') AND s.status IN ('active', 'trialing'), false) AS has_api_access,
  -- Daily API limit based on plan
  CASE
    WHEN s.plan = 'api_biz' AND s.status IN ('active', 'trialing') THEN 10000
    WHEN s.plan = 'api_dev' AND s.status IN ('active', 'trialing') THEN 1000
    WHEN s.plan = 'business' AND s.status IN ('active', 'trialing') THEN 500
    WHEN s.plan = 'employer_pro' AND s.status IN ('active', 'trialing') THEN 500
    WHEN s.plan = 'pro' AND s.status IN ('active', 'trialing') THEN 50
    ELSE 10  -- free tier
  END AS daily_api_limit,
  -- CSV export: pro and above
  COALESCE(s.plan IN ('pro', 'business', 'api_dev', 'api_biz', 'employer_starter', 'employer_pro') AND s.status IN ('active', 'trialing'), false) AS has_csv_export,
  -- PDF reports: pro and above
  COALESCE(s.plan IN ('pro', 'business', 'api_dev', 'api_biz', 'employer_starter', 'employer_pro') AND s.status IN ('active', 'trialing'), false) AS has_pdf_reports
FROM crm_leads l
LEFT JOIN subscriptions s ON s.lead_id = l.id
  AND s.status IN ('active', 'trialing', 'past_due')
WHERE l.auth_user_id IS NOT NULL;

-- ---- 3. RLS policies for authenticated users ----

-- Authenticated users can read their own lead row
CREATE POLICY "auth_read_own_lead"
  ON crm_leads
  FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

-- Authenticated users can update their own lead row (name, language, etc.)
CREATE POLICY "auth_update_own_lead"
  ON crm_leads
  FOR UPDATE
  TO authenticated
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

-- Authenticated users can read their own subscriptions
CREATE POLICY "auth_read_own_subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (lead_id IN (SELECT id FROM crm_leads WHERE auth_user_id = auth.uid()));

-- Authenticated users can read their own payments
CREATE POLICY "auth_read_own_payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (lead_id IN (SELECT id FROM crm_leads WHERE auth_user_id = auth.uid()));

-- Authenticated users can read their own API keys
CREATE POLICY "auth_read_own_api_keys"
  ON crm_api_keys
  FOR SELECT
  TO authenticated
  USING (lead_id IN (SELECT id FROM crm_leads WHERE auth_user_id = auth.uid()));

-- Authenticated users can read their own activities
CREATE POLICY "auth_read_own_activities"
  ON crm_activities
  FOR SELECT
  TO authenticated
  USING (lead_id IN (SELECT id FROM crm_leads WHERE auth_user_id = auth.uid()));
