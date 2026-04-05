-- ============================================
-- CRM Layer for EuroSalary Revenue Engine
-- Phase 1: Internal CRM inside Supabase
-- Tables: accounts, leads, deals, activities,
--         email_sequences, sequence_emails,
--         affiliate_partners, api_keys
-- ============================================

-- ---- ENUM types ----
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'nurturing', 'converted', 'lost');
CREATE TYPE lead_type AS ENUM ('employer', 'recruiter', 'enterprise', 'partner', 'api_user', 'general');
CREATE TYPE deal_stage AS ENUM ('discovery', 'demo_scheduled', 'demo_done', 'proposal_sent', 'negotiation', 'closed_won', 'closed_lost');
CREATE TYPE activity_type AS ENUM ('email_sent', 'email_opened', 'email_clicked', 'form_submit', 'page_view', 'api_call', 'report_download', 'demo_request', 'deal_created', 'deal_updated', 'note');
CREATE TYPE sequence_status AS ENUM ('active', 'paused', 'completed', 'cancelled');
CREATE TYPE partner_status AS ENUM ('applied', 'approved', 'active', 'suspended', 'churned');
CREATE TYPE partner_type AS ENUM ('affiliate', 'data', 'platform', 'content', 'reseller');

-- ---- 1. CRM Accounts (companies) ----
CREATE TABLE crm_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  industry TEXT,
  company_size TEXT, -- '1-10', '11-50', '51-200', '201-1000', '1000+'
  country_code CHAR(2),
  city TEXT,
  website TEXT,
  linkedin_url TEXT,
  account_type lead_type DEFAULT 'general',
  enterprise_score INTEGER DEFAULT 0, -- 0-100
  annual_revenue_estimate TEXT,
  employee_count INTEGER,
  is_target BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  owner TEXT, -- contact owner email or name
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crm_accounts_domain ON crm_accounts(domain);
CREATE INDEX idx_crm_accounts_country ON crm_accounts(country_code);
CREATE INDEX idx_crm_accounts_type ON crm_accounts(account_type);
CREATE INDEX idx_crm_accounts_score ON crm_accounts(enterprise_score DESC);

-- ---- 2. CRM Leads ----
CREATE TABLE crm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  name TEXT,
  job_title TEXT,
  phone TEXT,
  company TEXT,
  country_code CHAR(2),
  language TEXT DEFAULT 'en',
  lead_type lead_type DEFAULT 'general',
  status lead_status DEFAULT 'new',
  source TEXT, -- 'organic', 'outbound', 'partner_referral', 'api_signup', etc.
  source_url TEXT, -- the page they came from
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  -- Scoring
  enterprise_score INTEGER DEFAULT 0,
  engagement_score INTEGER DEFAULT 0,
  api_usage_score INTEGER DEFAULT 0,
  -- Product interest
  interest_tags TEXT[] DEFAULT '{}', -- 'premium_reports', 'api', 'employer_dashboard', 'compliance', etc.
  interested_countries TEXT[] DEFAULT '{}', -- country codes they looked at
  interested_jobs TEXT[] DEFAULT '{}', -- job slugs they looked at
  -- Tracking
  premium_reports_downloaded INTEGER DEFAULT 0,
  api_calls_made INTEGER DEFAULT 0,
  pages_visited INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  -- Lifecycle
  first_touch_at TIMESTAMPTZ DEFAULT now(),
  converted_at TIMESTAMPTZ,
  lost_at TIMESTAMPTZ,
  lost_reason TEXT,
  -- Expansion
  expansion_potential TEXT, -- 'low', 'medium', 'high'
  renewal_date DATE,
  -- Consent
  gdpr_consent BOOLEAN DEFAULT false,
  gdpr_consent_at TIMESTAMPTZ,
  unsubscribed BOOLEAN DEFAULT false,
  -- Meta
  owner TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_crm_leads_email ON crm_leads(email);
CREATE INDEX idx_crm_leads_status ON crm_leads(status);
CREATE INDEX idx_crm_leads_type ON crm_leads(lead_type);
CREATE INDEX idx_crm_leads_account ON crm_leads(account_id);
CREATE INDEX idx_crm_leads_country ON crm_leads(country_code);
CREATE INDEX idx_crm_leads_score ON crm_leads(enterprise_score DESC);
CREATE INDEX idx_crm_leads_source ON crm_leads(source);
CREATE INDEX idx_crm_leads_last_active ON crm_leads(last_active_at DESC);

-- ---- 3. CRM Deals ----
CREATE TABLE crm_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE SET NULL,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  stage deal_stage DEFAULT 'discovery',
  product TEXT, -- 'professional', 'business', 'enterprise', 'api_developer', 'api_business', 'data_license', 'compliance_suite'
  amount_eur INTEGER DEFAULT 0, -- deal value in EUR
  recurring BOOLEAN DEFAULT true, -- monthly recurring
  currency TEXT DEFAULT 'EUR',
  close_probability INTEGER DEFAULT 10, -- 0-100
  expected_close_date DATE,
  closed_at TIMESTAMPTZ,
  lost_reason TEXT,
  country_code CHAR(2),
  notes TEXT,
  owner TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crm_deals_lead ON crm_deals(lead_id);
CREATE INDEX idx_crm_deals_account ON crm_deals(account_id);
CREATE INDEX idx_crm_deals_stage ON crm_deals(stage);
CREATE INDEX idx_crm_deals_product ON crm_deals(product);
CREATE INDEX idx_crm_deals_close_date ON crm_deals(expected_close_date);

-- ---- 4. CRM Activities (event log) ----
CREATE TABLE crm_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
  activity_type activity_type NOT NULL,
  subject TEXT,
  body TEXT,
  metadata JSONB DEFAULT '{}', -- flexible: { page_url, email_id, sequence_id, api_endpoint, etc. }
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crm_activities_lead ON crm_activities(lead_id);
CREATE INDEX idx_crm_activities_deal ON crm_activities(deal_id);
CREATE INDEX idx_crm_activities_type ON crm_activities(activity_type);
CREATE INDEX idx_crm_activities_created ON crm_activities(created_at DESC);

-- ---- 5. Email Sequences ----
CREATE TABLE crm_email_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'report_download_followup', 'api_waitlist_nurture', etc.
  description TEXT,
  target_type lead_type, -- which lead type this targets
  trigger_event TEXT, -- 'report_download', 'api_signup', 'demo_request', etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ---- 6. Sequence Steps (individual emails in a sequence) ----
CREATE TABLE crm_sequence_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID REFERENCES crm_email_sequences(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  delay_hours INTEGER DEFAULT 0, -- hours after previous step (or trigger)
  subject_template TEXT NOT NULL, -- supports {name}, {company}, {country}
  body_html TEXT NOT NULL, -- supports same placeholders
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crm_sequence_steps_seq ON crm_sequence_steps(sequence_id, step_order);

-- ---- 7. Sequence Enrollments (lead enrolled in a sequence) ----
CREATE TABLE crm_sequence_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
  sequence_id UUID REFERENCES crm_email_sequences(id) ON DELETE CASCADE,
  current_step INTEGER DEFAULT 0,
  status sequence_status DEFAULT 'active',
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  next_send_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX idx_crm_enrollments_unique ON crm_sequence_enrollments(lead_id, sequence_id);
CREATE INDEX idx_crm_enrollments_next_send ON crm_sequence_enrollments(next_send_at) WHERE status = 'active';
CREATE INDEX idx_crm_enrollments_status ON crm_sequence_enrollments(status);

-- ---- 8. Affiliate Partners ----
CREATE TABLE crm_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  website TEXT,
  partner_type partner_type DEFAULT 'affiliate',
  status partner_status DEFAULT 'applied',
  referral_code TEXT UNIQUE,
  commission_rate NUMERIC(5,2) DEFAULT 25.00, -- percentage
  total_referrals INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_revenue_eur NUMERIC(12,2) DEFAULT 0,
  payout_method TEXT, -- 'bank_transfer', 'paypal'
  payout_details JSONB DEFAULT '{}',
  country_code CHAR(2),
  notes TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crm_partners_referral ON crm_partners(referral_code);
CREATE INDEX idx_crm_partners_status ON crm_partners(status);
CREATE INDEX idx_crm_partners_type ON crm_partners(partner_type);

-- ---- 9. Partner Referrals (tracking) ----
CREATE TABLE crm_partner_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES crm_partners(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES crm_leads(id) ON DELETE SET NULL,
  referral_code TEXT NOT NULL,
  landing_url TEXT,
  converted BOOLEAN DEFAULT false,
  conversion_value_eur NUMERIC(12,2) DEFAULT 0,
  commission_eur NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  converted_at TIMESTAMPTZ
);

CREATE INDEX idx_crm_referrals_partner ON crm_partner_referrals(partner_id);
CREATE INDEX idx_crm_referrals_code ON crm_partner_referrals(referral_code);

-- ---- 10. API Keys (for paid API access) ----
CREATE TABLE crm_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  api_key TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free', -- 'free', 'developer', 'business', 'enterprise'
  requests_today INTEGER DEFAULT 0,
  requests_month INTEGER DEFAULT 0,
  daily_limit INTEGER DEFAULT 100,
  monthly_limit INTEGER DEFAULT 3000,
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMPTZ,
  expires_at DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crm_api_keys_key ON crm_api_keys(api_key);
CREATE INDEX idx_crm_api_keys_lead ON crm_api_keys(lead_id);
CREATE INDEX idx_crm_api_keys_plan ON crm_api_keys(plan);

-- ---- 11. Sales Analytics (daily snapshots) ----
CREATE TABLE crm_analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  new_leads INTEGER DEFAULT 0,
  new_leads_by_type JSONB DEFAULT '{}', -- { employer: 3, recruiter: 5, ... }
  new_leads_by_country JSONB DEFAULT '{}',
  demos_scheduled INTEGER DEFAULT 0,
  demos_completed INTEGER DEFAULT 0,
  deals_created INTEGER DEFAULT 0,
  deals_closed_won INTEGER DEFAULT 0,
  deals_closed_lost INTEGER DEFAULT 0,
  revenue_new_eur NUMERIC(12,2) DEFAULT 0,
  revenue_expansion_eur NUMERIC(12,2) DEFAULT 0,
  api_signups INTEGER DEFAULT 0,
  api_requests_total INTEGER DEFAULT 0,
  report_downloads INTEGER DEFAULT 0,
  partner_referrals INTEGER DEFAULT 0,
  emails_sent INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  conversion_rate NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crm_analytics_date ON crm_analytics_daily(date DESC);

-- ---- Auto-update triggers ----
CREATE TRIGGER trg_crm_accounts_updated_at BEFORE UPDATE ON crm_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_crm_leads_updated_at BEFORE UPDATE ON crm_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_crm_deals_updated_at BEFORE UPDATE ON crm_deals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_crm_sequences_updated_at BEFORE UPDATE ON crm_email_sequences FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_crm_partners_updated_at BEFORE UPDATE ON crm_partners FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---- RLS Policies ----
ALTER TABLE crm_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_sequence_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_partner_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_analytics_daily ENABLE ROW LEVEL SECURITY;

-- Service role has full access (bypasses RLS)
-- Anonymous can only insert leads (via contact forms)
CREATE POLICY "anon_insert_leads" ON crm_leads FOR INSERT TO anon WITH CHECK (true);
-- Anonymous can insert partner applications
CREATE POLICY "anon_insert_partners" ON crm_partners FOR INSERT TO anon WITH CHECK (true);
-- Anonymous can insert activities (page views, form submits)
CREATE POLICY "anon_insert_activities" ON crm_activities FOR INSERT TO anon WITH CHECK (true);
