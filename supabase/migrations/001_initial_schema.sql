-- ============================================
-- EuroSalary.eu — Initial Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SECTORS
-- ============================================
CREATE TABLE sectors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_de TEXT NOT NULL,
  name_es TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- COUNTRIES
-- ============================================
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  code CHAR(2) UNIQUE NOT NULL,          -- ISO 3166-1 alpha-2
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_de TEXT NOT NULL,
  name_es TEXT NOT NULL,
  currency TEXT DEFAULT 'EUR',
  eu_member BOOLEAN DEFAULT true,
  tax_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- JOBS
-- ============================================
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_de TEXT NOT NULL,
  name_es TEXT NOT NULL,
  sector_id UUID REFERENCES sectors(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- SALARY_DATA (core data table)
-- ============================================
CREATE TYPE experience_level AS ENUM ('junior', 'mid', 'senior', 'lead');
CREATE TYPE salary_source AS ENUM ('eurostat', 'scraping', 'user_report', 'directive');

CREATE TABLE salary_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  experience_level experience_level NOT NULL,
  salary_min INTEGER NOT NULL,
  salary_max INTEGER NOT NULL,
  salary_median INTEGER NOT NULL,
  salary_net_estimate INTEGER,
  gross_or_net TEXT DEFAULT 'gross' CHECK (gross_or_net IN ('gross', 'net')),
  currency TEXT DEFAULT 'EUR',
  source salary_source DEFAULT 'eurostat',
  data_date DATE NOT NULL,
  confidence_score NUMERIC(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  sample_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- One entry per job + country + experience level + source
  UNIQUE (job_id, country_id, experience_level, source)
);

-- ============================================
-- USER_REPORTS (anonymous salary submissions)
-- ============================================
CREATE TYPE employment_type AS ENUM ('startup', 'corporate', 'public');

CREATE TABLE user_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  city TEXT,
  experience_level experience_level NOT NULL,
  gross_salary INTEGER NOT NULL,
  employment_type employment_type,
  company_size TEXT,
  reported_at TIMESTAMPTZ DEFAULT now(),
  validated BOOLEAN DEFAULT false
);

-- ============================================
-- NEWSLETTER_SUBSCRIBERS
-- ============================================
CREATE TYPE subscriber_status AS ENUM ('active', 'unsubscribed');
CREATE TYPE supported_language AS ENUM ('en', 'fr', 'de', 'es');

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  language supported_language DEFAULT 'en',
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  status subscriber_status DEFAULT 'active'
);

-- ============================================
-- CONTENT_PAGES (blog + translated content)
-- ============================================
CREATE TABLE content_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL,
  language supported_language NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  body_html TEXT,
  tldr TEXT,
  faq_json JSONB,
  date_published TIMESTAMPTZ,
  date_modified TIMESTAMPTZ DEFAULT now(),
  published BOOLEAN DEFAULT false,

  UNIQUE (slug, language)
);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX idx_salary_data_job ON salary_data(job_id);
CREATE INDEX idx_salary_data_country ON salary_data(country_id);
CREATE INDEX idx_salary_data_job_country ON salary_data(job_id, country_id);
CREATE INDEX idx_salary_data_experience ON salary_data(experience_level);
CREATE INDEX idx_jobs_sector ON jobs(sector_id);
CREATE INDEX idx_jobs_slug ON jobs(slug);
CREATE INDEX idx_countries_slug ON countries(slug);
CREATE INDEX idx_countries_code ON countries(code);
CREATE INDEX idx_user_reports_job_country ON user_reports(job_id, country_id);
CREATE INDEX idx_content_pages_slug_lang ON content_pages(slug, language);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- ============================================
-- AUTO-UPDATE updated_at triggers
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sectors_updated_at
  BEFORE UPDATE ON sectors FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_countries_updated_at
  BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_jobs_updated_at
  BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_salary_data_updated_at
  BEFORE UPDATE ON salary_data FOR EACH ROW EXECUTE FUNCTION update_updated_at();
