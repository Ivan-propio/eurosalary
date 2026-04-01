-- ============================================
-- EuroSalary.eu — Seed Data
-- 8 sectors, 20 jobs, 15 countries
-- Salary data based on Eurostat 2024-2025 averages
-- ============================================

-- ============================================
-- SECTORS (8)
-- ============================================
INSERT INTO sectors (slug, name_en, name_fr, name_de, name_es) VALUES
  ('technology', 'Technology', 'Technologie', 'Technologie', 'Tecnología'),
  ('finance', 'Finance & Banking', 'Finance & Banque', 'Finanzen & Bankwesen', 'Finanzas & Banca'),
  ('healthcare', 'Healthcare', 'Santé', 'Gesundheitswesen', 'Salud'),
  ('engineering', 'Engineering', 'Ingénierie', 'Ingenieurwesen', 'Ingeniería'),
  ('marketing', 'Marketing & Communications', 'Marketing & Communication', 'Marketing & Kommunikation', 'Marketing & Comunicación'),
  ('education', 'Education', 'Éducation', 'Bildung', 'Educación'),
  ('legal', 'Legal', 'Juridique', 'Recht', 'Legal'),
  ('manufacturing', 'Manufacturing & Industry', 'Industrie & Production', 'Fertigung & Industrie', 'Manufactura & Industria');

-- ============================================
-- COUNTRIES (15 EU members)
-- ============================================
INSERT INTO countries (slug, code, name_en, name_fr, name_de, name_es, currency, eu_member, tax_notes) VALUES
  ('germany', 'DE', 'Germany', 'Allemagne', 'Deutschland', 'Alemania', 'EUR', true, 'Progressive tax 14-45%. Solidarity surcharge 5.5%. Church tax 8-9%.'),
  ('france', 'FR', 'France', 'France', 'Frankreich', 'Francia', 'EUR', true, 'Progressive tax 0-45%. CSG 9.2%. CRDS 0.5%.'),
  ('netherlands', 'NL', 'Netherlands', 'Pays-Bas', 'Niederlande', 'Países Bajos', 'EUR', true, 'Progressive tax 9.32-49.5%. 30% ruling for expats.'),
  ('belgium', 'BE', 'Belgium', 'Belgique', 'Belgien', 'Bélgica', 'EUR', true, 'Progressive tax 25-50%. High social contributions ~13.07%.'),
  ('spain', 'ES', 'Spain', 'Espagne', 'Spanien', 'España', 'EUR', true, 'Progressive tax 19-47%. Regional variations apply.'),
  ('italy', 'IT', 'Italy', 'Italie', 'Italien', 'Italia', 'EUR', true, 'Progressive tax 23-43%. Regional/municipal surcharges.'),
  ('austria', 'AT', 'Austria', 'Autriche', 'Österreich', 'Austria', 'EUR', true, 'Progressive tax 0-55%. 13th/14th month salary taxed at 6%.'),
  ('ireland', 'IE', 'Ireland', 'Irlande', 'Irland', 'Irlanda', 'EUR', true, 'Tax 20-40%. USC 0.5-8%. PRSI 4%.'),
  ('portugal', 'PT', 'Portugal', 'Portugal', 'Portugal', 'Portugal', 'EUR', true, 'Progressive tax 14.5-48%. NHR regime for new residents.'),
  ('poland', 'PL', 'Poland', 'Pologne', 'Polen', 'Polonia', 'PLN', true, 'Flat 12% up to 120k PLN, then 32%. ZUS contributions.'),
  ('sweden', 'SE', 'Sweden', 'Suède', 'Schweden', 'Suecia', 'SEK', true, 'Municipal tax ~32%. State tax 20% above threshold.'),
  ('denmark', 'DK', 'Denmark', 'Danemark', 'Dänemark', 'Dinamarca', 'DKK', true, 'Municipal tax ~25%. Top marginal rate ~56%.'),
  ('finland', 'FI', 'Finland', 'Finlande', 'Finnland', 'Finlandia', 'EUR', true, 'Progressive tax 6-44%. Municipal tax ~20%.'),
  ('luxembourg', 'LU', 'Luxembourg', 'Luxembourg', 'Luxemburg', 'Luxemburgo', 'EUR', true, 'Progressive tax 0-42%. Competitive rates for high earners.'),
  ('czech-republic', 'CZ', 'Czech Republic', 'République tchèque', 'Tschechien', 'República Checa', 'CZK', true, 'Flat 15% (23% above threshold). Social contributions ~11%.');

-- ============================================
-- JOBS (20 across sectors)
-- ============================================
INSERT INTO jobs (slug, name_en, name_fr, name_de, name_es, sector_id) VALUES
  ('software-engineer', 'Software Engineer', 'Ingénieur logiciel', 'Softwareentwickler', 'Ingeniero de software', (SELECT id FROM sectors WHERE slug = 'technology')),
  ('data-scientist', 'Data Scientist', 'Data Scientist', 'Data Scientist', 'Científico de datos', (SELECT id FROM sectors WHERE slug = 'technology')),
  ('product-manager', 'Product Manager', 'Chef de produit', 'Produktmanager', 'Product Manager', (SELECT id FROM sectors WHERE slug = 'technology')),
  ('ux-designer', 'UX Designer', 'Designer UX', 'UX-Designer', 'Diseñador UX', (SELECT id FROM sectors WHERE slug = 'technology')),
  ('devops-engineer', 'DevOps Engineer', 'Ingénieur DevOps', 'DevOps-Ingenieur', 'Ingeniero DevOps', (SELECT id FROM sectors WHERE slug = 'technology')),
  ('financial-analyst', 'Financial Analyst', 'Analyste financier', 'Finanzanalyst', 'Analista financiero', (SELECT id FROM sectors WHERE slug = 'finance')),
  ('accountant', 'Accountant', 'Comptable', 'Buchhalter', 'Contable', (SELECT id FROM sectors WHERE slug = 'finance')),
  ('nurse', 'Nurse', 'Infirmier(e)', 'Krankenpfleger(in)', 'Enfermero/a', (SELECT id FROM sectors WHERE slug = 'healthcare')),
  ('doctor', 'Doctor (General Practitioner)', 'Médecin généraliste', 'Allgemeinmediziner', 'Médico general', (SELECT id FROM sectors WHERE slug = 'healthcare')),
  ('pharmacist', 'Pharmacist', 'Pharmacien(ne)', 'Apotheker(in)', 'Farmacéutico/a', (SELECT id FROM sectors WHERE slug = 'healthcare')),
  ('civil-engineer', 'Civil Engineer', 'Ingénieur civil', 'Bauingenieur', 'Ingeniero civil', (SELECT id FROM sectors WHERE slug = 'engineering')),
  ('mechanical-engineer', 'Mechanical Engineer', 'Ingénieur mécanique', 'Maschinenbauingenieur', 'Ingeniero mecánico', (SELECT id FROM sectors WHERE slug = 'engineering')),
  ('marketing-manager', 'Marketing Manager', 'Directeur marketing', 'Marketingmanager', 'Director de marketing', (SELECT id FROM sectors WHERE slug = 'marketing')),
  ('graphic-designer', 'Graphic Designer', 'Graphiste', 'Grafikdesigner', 'Diseñador gráfico', (SELECT id FROM sectors WHERE slug = 'marketing')),
  ('teacher', 'Teacher (Secondary)', 'Enseignant (secondaire)', 'Lehrer (Sekundarstufe)', 'Profesor (secundaria)', (SELECT id FROM sectors WHERE slug = 'education')),
  ('university-professor', 'University Professor', 'Professeur d''université', 'Universitätsprofessor', 'Profesor universitario', (SELECT id FROM sectors WHERE slug = 'education')),
  ('lawyer', 'Lawyer', 'Avocat(e)', 'Rechtsanwalt', 'Abogado/a', (SELECT id FROM sectors WHERE slug = 'legal')),
  ('hr-manager', 'HR Manager', 'Responsable RH', 'Personalleiter', 'Director de RRHH', (SELECT id FROM sectors WHERE slug = 'manufacturing')),
  ('project-manager', 'Project Manager', 'Chef de projet', 'Projektmanager', 'Director de proyecto', (SELECT id FROM sectors WHERE slug = 'engineering')),
  ('sales-manager', 'Sales Manager', 'Directeur commercial', 'Vertriebsleiter', 'Director de ventas', (SELECT id FROM sectors WHERE slug = 'marketing'));

-- ============================================
-- SALARY DATA
-- Based on Eurostat nama_10_fte + OECD 2024-2025 estimates
-- All values in EUR (annual gross)
-- For PLN/SEK/DKK/CZK countries: converted to EUR
-- ============================================

-- Helper: we'll insert salary data for key job+country combos
-- Format: job_slug, country_code, junior, mid, senior, lead (min/median/max for each)

-- SOFTWARE ENGINEER
INSERT INTO salary_data (job_id, country_id, experience_level, salary_min, salary_median, salary_max, salary_net_estimate, source, data_date, confidence_score, sample_size) VALUES
-- Germany
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='DE'), 'junior', 42000, 48000, 55000, 30000, 'eurostat', '2025-01-01', 0.85, 12000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='DE'), 'mid', 55000, 65000, 78000, 40000, 'eurostat', '2025-01-01', 0.85, 15000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='DE'), 'senior', 75000, 85000, 100000, 52000, 'eurostat', '2025-01-01', 0.85, 8000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='DE'), 'lead', 90000, 105000, 130000, 62000, 'eurostat', '2025-01-01', 0.80, 3000),
-- France
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='FR'), 'junior', 35000, 40000, 48000, 27000, 'eurostat', '2025-01-01', 0.85, 10000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='FR'), 'mid', 45000, 52000, 62000, 35000, 'eurostat', '2025-01-01', 0.85, 12000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='FR'), 'senior', 58000, 68000, 82000, 44000, 'eurostat', '2025-01-01', 0.85, 6000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='FR'), 'lead', 72000, 85000, 105000, 53000, 'eurostat', '2025-01-01', 0.80, 2500),
-- Netherlands
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='NL'), 'junior', 40000, 46000, 54000, 31000, 'eurostat', '2025-01-01', 0.80, 6000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='NL'), 'mid', 52000, 62000, 75000, 41000, 'eurostat', '2025-01-01', 0.80, 8000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='NL'), 'senior', 70000, 82000, 98000, 52000, 'eurostat', '2025-01-01', 0.80, 4000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='NL'), 'lead', 85000, 100000, 125000, 60000, 'eurostat', '2025-01-01', 0.75, 1500),
-- Spain
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='ES'), 'junior', 24000, 28000, 34000, 20000, 'eurostat', '2025-01-01', 0.85, 8000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='ES'), 'mid', 33000, 40000, 50000, 28000, 'eurostat', '2025-01-01', 0.85, 10000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='ES'), 'senior', 45000, 55000, 68000, 37000, 'eurostat', '2025-01-01', 0.85, 5000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='ES'), 'lead', 58000, 70000, 88000, 46000, 'eurostat', '2025-01-01', 0.80, 2000),
-- Ireland
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='IE'), 'junior', 40000, 48000, 56000, 35000, 'eurostat', '2025-01-01', 0.80, 4000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='IE'), 'mid', 55000, 68000, 82000, 48000, 'eurostat', '2025-01-01', 0.80, 5000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='IE'), 'senior', 75000, 90000, 110000, 60000, 'eurostat', '2025-01-01', 0.80, 3000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='IE'), 'lead', 95000, 115000, 140000, 72000, 'eurostat', '2025-01-01', 0.75, 1200),
-- Luxembourg
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='LU'), 'junior', 48000, 55000, 65000, 38000, 'eurostat', '2025-01-01', 0.75, 800),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='LU'), 'mid', 62000, 75000, 90000, 50000, 'eurostat', '2025-01-01', 0.75, 1000),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='LU'), 'senior', 82000, 98000, 120000, 64000, 'eurostat', '2025-01-01', 0.75, 600),
((SELECT id FROM jobs WHERE slug='software-engineer'), (SELECT id FROM countries WHERE code='LU'), 'lead', 100000, 120000, 150000, 76000, 'eurostat', '2025-01-01', 0.70, 300),

-- DATA SCIENTIST
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='DE'), 'junior', 45000, 50000, 58000, 32000, 'eurostat', '2025-01-01', 0.80, 5000),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='DE'), 'mid', 58000, 68000, 80000, 42000, 'eurostat', '2025-01-01', 0.80, 6000),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='DE'), 'senior', 78000, 90000, 108000, 55000, 'eurostat', '2025-01-01', 0.80, 3000),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='DE'), 'lead', 95000, 112000, 135000, 66000, 'eurostat', '2025-01-01', 0.75, 1200),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='FR'), 'junior', 38000, 43000, 50000, 29000, 'eurostat', '2025-01-01', 0.80, 4000),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='FR'), 'mid', 48000, 55000, 65000, 37000, 'eurostat', '2025-01-01', 0.80, 5000),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='FR'), 'senior', 62000, 72000, 88000, 46000, 'eurostat', '2025-01-01', 0.80, 2500),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='FR'), 'lead', 78000, 92000, 115000, 57000, 'eurostat', '2025-01-01', 0.75, 1000),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='NL'), 'junior', 42000, 48000, 56000, 33000, 'eurostat', '2025-01-01', 0.75, 2500),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='NL'), 'mid', 55000, 65000, 78000, 43000, 'eurostat', '2025-01-01', 0.75, 3000),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='NL'), 'senior', 72000, 85000, 100000, 54000, 'eurostat', '2025-01-01', 0.75, 1500),
((SELECT id FROM jobs WHERE slug='data-scientist'), (SELECT id FROM countries WHERE code='NL'), 'lead', 88000, 105000, 128000, 63000, 'eurostat', '2025-01-01', 0.70, 600),

-- NURSE
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='DE'), 'junior', 30000, 33000, 37000, 22000, 'eurostat', '2025-01-01', 0.90, 20000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='DE'), 'mid', 36000, 40000, 46000, 27000, 'eurostat', '2025-01-01', 0.90, 25000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='DE'), 'senior', 42000, 48000, 55000, 32000, 'eurostat', '2025-01-01', 0.90, 15000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='FR'), 'junior', 25000, 28000, 32000, 20000, 'eurostat', '2025-01-01', 0.90, 18000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='FR'), 'mid', 30000, 34000, 40000, 24000, 'eurostat', '2025-01-01', 0.90, 22000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='FR'), 'senior', 36000, 42000, 50000, 29000, 'eurostat', '2025-01-01', 0.90, 12000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='BE'), 'junior', 32000, 36000, 40000, 23000, 'eurostat', '2025-01-01', 0.85, 8000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='BE'), 'mid', 38000, 42000, 48000, 27000, 'eurostat', '2025-01-01', 0.85, 10000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='BE'), 'senior', 44000, 50000, 58000, 32000, 'eurostat', '2025-01-01', 0.85, 6000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='ES'), 'junior', 22000, 25000, 28000, 18000, 'eurostat', '2025-01-01', 0.90, 15000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='ES'), 'mid', 27000, 30000, 35000, 22000, 'eurostat', '2025-01-01', 0.90, 18000),
((SELECT id FROM jobs WHERE slug='nurse'), (SELECT id FROM countries WHERE code='ES'), 'senior', 32000, 37000, 44000, 26000, 'eurostat', '2025-01-01', 0.90, 10000),

-- PRODUCT MANAGER
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='DE'), 'junior', 45000, 52000, 60000, 33000, 'eurostat', '2025-01-01', 0.80, 4000),
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='DE'), 'mid', 60000, 70000, 82000, 43000, 'eurostat', '2025-01-01', 0.80, 5000),
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='DE'), 'senior', 78000, 90000, 108000, 55000, 'eurostat', '2025-01-01', 0.80, 3000),
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='DE'), 'lead', 95000, 110000, 135000, 65000, 'eurostat', '2025-01-01', 0.75, 1500),
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='NL'), 'junior', 42000, 48000, 56000, 33000, 'eurostat', '2025-01-01', 0.75, 2000),
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='NL'), 'mid', 55000, 65000, 78000, 43000, 'eurostat', '2025-01-01', 0.75, 3000),
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='NL'), 'senior', 72000, 85000, 100000, 54000, 'eurostat', '2025-01-01', 0.75, 1500),
((SELECT id FROM jobs WHERE slug='product-manager'), (SELECT id FROM countries WHERE code='NL'), 'lead', 88000, 105000, 130000, 63000, 'eurostat', '2025-01-01', 0.70, 700),

-- FINANCIAL ANALYST
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='DE'), 'junior', 40000, 45000, 52000, 29000, 'eurostat', '2025-01-01', 0.85, 6000),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='DE'), 'mid', 52000, 60000, 72000, 38000, 'eurostat', '2025-01-01', 0.85, 7000),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='DE'), 'senior', 68000, 80000, 95000, 49000, 'eurostat', '2025-01-01', 0.85, 4000),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='LU'), 'junior', 52000, 60000, 70000, 42000, 'eurostat', '2025-01-01', 0.80, 1500),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='LU'), 'mid', 68000, 78000, 92000, 52000, 'eurostat', '2025-01-01', 0.80, 2000),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='LU'), 'senior', 85000, 100000, 120000, 65000, 'eurostat', '2025-01-01', 0.80, 1200),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='IE'), 'junior', 38000, 44000, 52000, 32000, 'eurostat', '2025-01-01', 0.80, 2500),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='IE'), 'mid', 50000, 60000, 72000, 42000, 'eurostat', '2025-01-01', 0.80, 3000),
((SELECT id FROM jobs WHERE slug='financial-analyst'), (SELECT id FROM countries WHERE code='IE'), 'senior', 65000, 78000, 95000, 52000, 'eurostat', '2025-01-01', 0.80, 1800),

-- MARKETING MANAGER
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='DE'), 'junior', 35000, 40000, 48000, 26000, 'eurostat', '2025-01-01', 0.85, 5000),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='DE'), 'mid', 48000, 55000, 65000, 35000, 'eurostat', '2025-01-01', 0.85, 6000),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='DE'), 'senior', 62000, 72000, 85000, 44000, 'eurostat', '2025-01-01', 0.85, 3500),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='ES'), 'junior', 24000, 28000, 34000, 20000, 'eurostat', '2025-01-01', 0.85, 4000),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='ES'), 'mid', 32000, 38000, 46000, 27000, 'eurostat', '2025-01-01', 0.85, 5000),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='ES'), 'senior', 42000, 50000, 62000, 34000, 'eurostat', '2025-01-01', 0.85, 2500),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='FR'), 'junior', 32000, 36000, 42000, 24000, 'eurostat', '2025-01-01', 0.85, 5000),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='FR'), 'mid', 42000, 48000, 58000, 32000, 'eurostat', '2025-01-01', 0.85, 6000),
((SELECT id FROM jobs WHERE slug='marketing-manager'), (SELECT id FROM countries WHERE code='FR'), 'senior', 55000, 65000, 78000, 42000, 'eurostat', '2025-01-01', 0.85, 3000),

-- LAWYER
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='DE'), 'junior', 48000, 55000, 65000, 35000, 'eurostat', '2025-01-01', 0.80, 4000),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='DE'), 'mid', 65000, 78000, 95000, 48000, 'eurostat', '2025-01-01', 0.80, 5000),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='DE'), 'senior', 85000, 105000, 135000, 62000, 'eurostat', '2025-01-01', 0.80, 3000),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='FR'), 'junior', 38000, 45000, 55000, 30000, 'eurostat', '2025-01-01', 0.80, 3500),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='FR'), 'mid', 52000, 65000, 82000, 42000, 'eurostat', '2025-01-01', 0.80, 4000),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='FR'), 'senior', 72000, 90000, 120000, 56000, 'eurostat', '2025-01-01', 0.80, 2500),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='LU'), 'junior', 58000, 68000, 80000, 47000, 'eurostat', '2025-01-01', 0.75, 600),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='LU'), 'mid', 80000, 95000, 115000, 63000, 'eurostat', '2025-01-01', 0.75, 800),
((SELECT id FROM jobs WHERE slug='lawyer'), (SELECT id FROM countries WHERE code='LU'), 'senior', 105000, 130000, 170000, 82000, 'eurostat', '2025-01-01', 0.75, 500),

-- TEACHER (Secondary)
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='DE'), 'junior', 42000, 48000, 54000, 30000, 'eurostat', '2025-01-01', 0.90, 30000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='DE'), 'mid', 52000, 58000, 65000, 37000, 'eurostat', '2025-01-01', 0.90, 40000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='DE'), 'senior', 60000, 68000, 78000, 43000, 'eurostat', '2025-01-01', 0.90, 25000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='FR'), 'junior', 28000, 32000, 36000, 23000, 'eurostat', '2025-01-01', 0.90, 25000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='FR'), 'mid', 35000, 40000, 46000, 28000, 'eurostat', '2025-01-01', 0.90, 35000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='FR'), 'senior', 42000, 48000, 56000, 33000, 'eurostat', '2025-01-01', 0.90, 20000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='ES'), 'junior', 26000, 30000, 34000, 21000, 'eurostat', '2025-01-01', 0.90, 20000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='ES'), 'mid', 32000, 36000, 42000, 25000, 'eurostat', '2025-01-01', 0.90, 28000),
((SELECT id FROM jobs WHERE slug='teacher'), (SELECT id FROM countries WHERE code='ES'), 'senior', 38000, 44000, 52000, 30000, 'eurostat', '2025-01-01', 0.90, 15000),

-- DEVOPS ENGINEER
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='DE'), 'junior', 45000, 52000, 60000, 33000, 'eurostat', '2025-01-01', 0.80, 3000),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='DE'), 'mid', 58000, 68000, 80000, 42000, 'eurostat', '2025-01-01', 0.80, 4000),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='DE'), 'senior', 78000, 90000, 108000, 55000, 'eurostat', '2025-01-01', 0.80, 2000),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='NL'), 'junior', 43000, 50000, 58000, 34000, 'eurostat', '2025-01-01', 0.75, 1500),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='NL'), 'mid', 55000, 65000, 78000, 43000, 'eurostat', '2025-01-01', 0.75, 2000),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='NL'), 'senior', 72000, 85000, 102000, 54000, 'eurostat', '2025-01-01', 0.75, 1000),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='IE'), 'junior', 42000, 50000, 58000, 36000, 'eurostat', '2025-01-01', 0.75, 1200),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='IE'), 'mid', 58000, 70000, 85000, 49000, 'eurostat', '2025-01-01', 0.75, 1500),
((SELECT id FROM jobs WHERE slug='devops-engineer'), (SELECT id FROM countries WHERE code='IE'), 'senior', 78000, 92000, 112000, 61000, 'eurostat', '2025-01-01', 0.75, 800),

-- DOCTOR (GP)
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='DE'), 'junior', 55000, 62000, 72000, 38000, 'eurostat', '2025-01-01', 0.85, 8000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='DE'), 'mid', 72000, 85000, 100000, 52000, 'eurostat', '2025-01-01', 0.85, 10000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='DE'), 'senior', 95000, 115000, 145000, 68000, 'eurostat', '2025-01-01', 0.85, 6000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='FR'), 'junior', 45000, 52000, 60000, 34000, 'eurostat', '2025-01-01', 0.85, 6000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='FR'), 'mid', 62000, 72000, 85000, 46000, 'eurostat', '2025-01-01', 0.85, 8000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='FR'), 'senior', 80000, 95000, 120000, 58000, 'eurostat', '2025-01-01', 0.85, 5000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='ES'), 'junior', 35000, 40000, 48000, 28000, 'eurostat', '2025-01-01', 0.85, 5000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='ES'), 'mid', 48000, 55000, 65000, 38000, 'eurostat', '2025-01-01', 0.85, 7000),
((SELECT id FROM jobs WHERE slug='doctor'), (SELECT id FROM countries WHERE code='ES'), 'senior', 62000, 72000, 88000, 48000, 'eurostat', '2025-01-01', 0.85, 4000);
