-- ============================================
-- Job Title Normalization Cache
-- Stores Claude Haiku normalization results
-- to avoid repeat API calls
-- ============================================

CREATE TABLE job_title_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  raw_title TEXT UNIQUE NOT NULL,
  normalized_slug TEXT NOT NULL,
  confidence NUMERIC(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_job_title_cache_raw ON job_title_cache(raw_title);

-- Public read (for client-side pre-check), anon insert
ALTER TABLE job_title_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "job_title_cache_public_read" ON job_title_cache
  FOR SELECT USING (true);
