import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ============================================
// Typed query helpers
// ============================================

export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'lead';
export type Lang = 'en' | 'fr' | 'de' | 'es';

/** Get salary data for a specific job + country */
export async function getSalaryData(jobSlug: string, countryCode: string) {
  const { data, error } = await supabase
    .from('salary_data')
    .select(`
      *,
      jobs!inner(slug, name_en, name_fr, name_de, name_es, sector_id),
      countries!inner(slug, code, name_en, name_fr, name_de, name_es, currency, tax_notes)
    `)
    .eq('jobs.slug', jobSlug)
    .eq('countries.code', countryCode)
    .order('experience_level');

  if (error) throw error;
  return data;
}

/** Get all jobs (for search / listing) */
export async function getAllJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, sectors(slug, name_en, name_fr, name_de, name_es)')
    .order('name_en');

  if (error) throw error;
  return data;
}

/** Get all countries */
export async function getAllCountries() {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('eu_member', true)
    .order('name_en');

  if (error) throw error;
  return data;
}

/** Get all salary data for one country */
export async function getCountrySalaries(countryCode: string) {
  const { data, error } = await supabase
    .from('salary_data')
    .select(`
      *,
      jobs(slug, name_en, name_fr, name_de, name_es),
      countries!inner(code, name_en)
    `)
    .eq('countries.code', countryCode)
    .order('salary_median', { ascending: false });

  if (error) throw error;
  return data;
}

/** Compare same job across countries */
export async function compareJobAcrossCountries(jobSlug: string, experienceLevel: ExperienceLevel = 'mid') {
  const { data, error } = await supabase
    .from('salary_data')
    .select(`
      *,
      jobs!inner(slug, name_en, name_fr, name_de, name_es),
      countries(slug, code, name_en, name_fr, name_de, name_es)
    `)
    .eq('jobs.slug', jobSlug)
    .eq('experience_level', experienceLevel)
    .order('salary_median', { ascending: false });

  if (error) throw error;
  return data;
}

/** Submit anonymous salary report */
export async function submitSalaryReport(report: {
  job_id: string;
  country_id: string;
  city?: string;
  experience_level: ExperienceLevel;
  gross_salary: number;
  employment_type?: 'startup' | 'corporate' | 'public';
  company_size?: string;
}) {
  const { data, error } = await supabase
    .from('user_reports')
    .insert(report)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Subscribe to newsletter */
export async function subscribeNewsletter(email: string, language: Lang = 'en') {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email, language })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Get sectors with job counts */
export async function getSectors() {
  const { data, error } = await supabase
    .from('sectors')
    .select('*, jobs(id)')
    .order('name_en');

  if (error) throw error;
  return data;
}
