-- ============================================
-- EuroSalary.eu — Row Level Security Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ access (anon + authenticated)
-- All reference data is publicly readable
-- ============================================

-- Sectors: public read
CREATE POLICY "sectors_public_read" ON sectors
  FOR SELECT USING (true);

-- Countries: public read
CREATE POLICY "countries_public_read" ON countries
  FOR SELECT USING (true);

-- Jobs: public read
CREATE POLICY "jobs_public_read" ON jobs
  FOR SELECT USING (true);

-- Salary data: public read
CREATE POLICY "salary_data_public_read" ON salary_data
  FOR SELECT USING (true);

-- Content pages: public read (only published)
CREATE POLICY "content_pages_public_read" ON content_pages
  FOR SELECT USING (published = true);

-- ============================================
-- USER REPORTS: anon can INSERT, no read
-- (prevents data scraping of individual reports)
-- ============================================
CREATE POLICY "user_reports_anon_insert" ON user_reports
  FOR INSERT WITH CHECK (true);

-- No SELECT policy for anon = reports are not readable via API
-- Admin reads via service_role key only

-- ============================================
-- NEWSLETTER: anon can INSERT (subscribe)
-- No read/update/delete via API
-- ============================================
CREATE POLICY "newsletter_anon_insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- ============================================
-- WRITE access: service_role only (via Make.com / API)
-- No public write on reference tables
-- ============================================
-- sectors, countries, jobs, salary_data:
-- INSERT/UPDATE/DELETE only via service_role key (bypasses RLS)
-- No additional policies needed — service_role bypasses RLS by default
