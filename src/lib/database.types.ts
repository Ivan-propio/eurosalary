// ============================================
// EuroSalary.eu — Supabase Database Types
// Auto-generate with: npx supabase gen types typescript
// This is a manual version for initial development
// ============================================

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      sectors: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_fr: string;
          name_de: string;
          name_es: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['sectors']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['sectors']['Insert']>;
      };

      countries: {
        Row: {
          id: string;
          slug: string;
          code: string;
          name_en: string;
          name_fr: string;
          name_de: string;
          name_es: string;
          currency: string;
          eu_member: boolean;
          tax_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['countries']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['countries']['Insert']>;
      };

      jobs: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_fr: string;
          name_de: string;
          name_es: string;
          sector_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>;
      };

      salary_data: {
        Row: {
          id: string;
          job_id: string;
          country_id: string;
          experience_level: 'junior' | 'mid' | 'senior' | 'lead';
          salary_min: number;
          salary_max: number;
          salary_median: number;
          salary_net_estimate: number | null;
          gross_or_net: string;
          currency: string;
          source: 'eurostat' | 'scraping' | 'user_report' | 'directive';
          data_date: string;
          confidence_score: number | null;
          sample_size: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['salary_data']['Row'], 'id' | 'created_at' | 'updated_at' | 'gross_or_net' | 'currency'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          gross_or_net?: string;
          currency?: string;
        };
        Update: Partial<Database['public']['Tables']['salary_data']['Insert']>;
      };

      user_reports: {
        Row: {
          id: string;
          job_id: string;
          country_id: string;
          city: string | null;
          experience_level: 'junior' | 'mid' | 'senior' | 'lead';
          gross_salary: number;
          employment_type: 'startup' | 'corporate' | 'public' | null;
          company_size: string | null;
          reported_at: string;
          validated: boolean;
        };
        Insert: Omit<Database['public']['Tables']['user_reports']['Row'], 'id' | 'reported_at' | 'validated'> & {
          id?: string;
          reported_at?: string;
          validated?: boolean;
        };
        Update: Partial<Database['public']['Tables']['user_reports']['Insert']>;
      };

      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          language: 'en' | 'fr' | 'de' | 'es';
          subscribed_at: string;
          status: 'active' | 'unsubscribed';
        };
        Insert: Omit<Database['public']['Tables']['newsletter_subscribers']['Row'], 'id' | 'subscribed_at' | 'status'> & {
          id?: string;
          subscribed_at?: string;
          status?: 'active' | 'unsubscribed';
        };
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };

      content_pages: {
        Row: {
          id: string;
          slug: string;
          language: 'en' | 'fr' | 'de' | 'es';
          title: string;
          meta_description: string | null;
          body_html: string | null;
          tldr: string | null;
          faq_json: Json | null;
          date_published: string | null;
          date_modified: string;
          published: boolean;
        };
        Insert: Omit<Database['public']['Tables']['content_pages']['Row'], 'id' | 'date_modified' | 'published'> & {
          id?: string;
          date_modified?: string;
          published?: boolean;
        };
        Update: Partial<Database['public']['Tables']['content_pages']['Insert']>;
      };
    };
  };
}
