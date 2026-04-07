// ============================================
// EuroSalary.eu — Seed Data
// 20 jobs × 27 countries — realistic 2025/2026 estimates
// Based on Eurostat earn_ses_pub1s + OECD averages
// All values in EUR (annual gross)
// ============================================

export interface SalaryEntry {
  job: string;
  country: string;
  junior_min: number;
  junior_max: number;
  mid_min: number;
  mid_max: number;
  senior_min: number;
  senior_max: number;
  lead_min: number;
  lead_max: number;
  currency: string;
  gross: boolean;
  source: 'eurostat' | 'scraping' | 'user_report' | 'directive';
  year: number;
}

export const seedData: SalaryEntry[] = [
  // ============================================
  // SOFTWARE ENGINEER
  // ============================================
  { job: 'software-engineer', country: 'DE', junior_min: 42000, junior_max: 55000, mid_min: 55000, mid_max: 78000, senior_min: 75000, senior_max: 100000, lead_min: 90000, lead_max: 130000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'FR', junior_min: 35000, junior_max: 48000, mid_min: 45000, mid_max: 62000, senior_min: 58000, senior_max: 82000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'ES', junior_min: 24000, junior_max: 34000, mid_min: 33000, mid_max: 50000, senior_min: 45000, senior_max: 68000, lead_min: 58000, lead_max: 88000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'NL', junior_min: 40000, junior_max: 54000, mid_min: 52000, mid_max: 75000, senior_min: 70000, senior_max: 98000, lead_min: 85000, lead_max: 125000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'BE', junior_min: 38000, junior_max: 50000, mid_min: 48000, mid_max: 68000, senior_min: 65000, senior_max: 90000, lead_min: 80000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'IT', junior_min: 26000, junior_max: 36000, mid_min: 35000, mid_max: 50000, senior_min: 48000, senior_max: 68000, lead_min: 60000, lead_max: 88000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'PT', junior_min: 20000, junior_max: 30000, mid_min: 28000, mid_max: 42000, senior_min: 38000, senior_max: 58000, lead_min: 48000, lead_max: 75000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'PL', junior_min: 18000, junior_max: 28000, mid_min: 28000, mid_max: 45000, senior_min: 40000, senior_max: 65000, lead_min: 55000, lead_max: 85000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'SE', junior_min: 38000, junior_max: 48000, mid_min: 48000, mid_max: 65000, senior_min: 62000, senior_max: 85000, lead_min: 78000, lead_max: 110000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'AT', junior_min: 40000, junior_max: 52000, mid_min: 50000, mid_max: 70000, senior_min: 68000, senior_max: 92000, lead_min: 82000, lead_max: 118000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'CH', junior_min: 70000, junior_max: 90000, mid_min: 90000, mid_max: 120000, senior_min: 115000, senior_max: 155000, lead_min: 140000, lead_max: 200000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'LU', junior_min: 48000, junior_max: 65000, mid_min: 62000, mid_max: 90000, senior_min: 82000, senior_max: 120000, lead_min: 100000, lead_max: 150000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'IE', junior_min: 40000, junior_max: 56000, mid_min: 55000, mid_max: 82000, senior_min: 75000, senior_max: 110000, lead_min: 95000, lead_max: 140000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'DK', junior_min: 42000, junior_max: 55000, mid_min: 55000, mid_max: 75000, senior_min: 72000, senior_max: 98000, lead_min: 90000, lead_max: 130000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'software-engineer', country: 'CZ', junior_min: 16000, junior_max: 25000, mid_min: 24000, mid_max: 40000, senior_min: 35000, senior_max: 55000, lead_min: 48000, lead_max: 72000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // PRODUCT MANAGER
  // ============================================
  { job: 'product-manager', country: 'DE', junior_min: 45000, junior_max: 60000, mid_min: 60000, mid_max: 82000, senior_min: 78000, senior_max: 108000, lead_min: 95000, lead_max: 135000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'FR', junior_min: 38000, junior_max: 50000, mid_min: 48000, mid_max: 68000, senior_min: 65000, senior_max: 90000, lead_min: 80000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'ES', junior_min: 28000, junior_max: 38000, mid_min: 36000, mid_max: 52000, senior_min: 48000, senior_max: 70000, lead_min: 62000, lead_max: 90000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'NL', junior_min: 42000, junior_max: 56000, mid_min: 55000, mid_max: 78000, senior_min: 72000, senior_max: 100000, lead_min: 88000, lead_max: 130000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'BE', junior_min: 40000, junior_max: 52000, mid_min: 50000, mid_max: 70000, senior_min: 68000, senior_max: 95000, lead_min: 82000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'IT', junior_min: 30000, junior_max: 40000, mid_min: 38000, mid_max: 55000, senior_min: 52000, senior_max: 72000, lead_min: 65000, lead_max: 95000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'PT', junior_min: 22000, junior_max: 32000, mid_min: 30000, mid_max: 45000, senior_min: 42000, senior_max: 62000, lead_min: 55000, lead_max: 80000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'PL', junior_min: 18000, junior_max: 28000, mid_min: 26000, mid_max: 42000, senior_min: 38000, senior_max: 58000, lead_min: 50000, lead_max: 78000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'SE', junior_min: 40000, junior_max: 52000, mid_min: 50000, mid_max: 70000, senior_min: 68000, senior_max: 92000, lead_min: 85000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'AT', junior_min: 42000, junior_max: 55000, mid_min: 52000, mid_max: 72000, senior_min: 70000, senior_max: 95000, lead_min: 85000, lead_max: 122000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'CH', junior_min: 72000, junior_max: 95000, mid_min: 92000, mid_max: 125000, senior_min: 120000, senior_max: 165000, lead_min: 145000, lead_max: 210000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'LU', junior_min: 50000, junior_max: 65000, mid_min: 65000, mid_max: 90000, senior_min: 85000, senior_max: 120000, lead_min: 105000, lead_max: 155000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'IE', junior_min: 42000, junior_max: 58000, mid_min: 55000, mid_max: 80000, senior_min: 75000, senior_max: 108000, lead_min: 95000, lead_max: 140000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'DK', junior_min: 44000, junior_max: 58000, mid_min: 56000, mid_max: 78000, senior_min: 75000, senior_max: 102000, lead_min: 92000, lead_max: 135000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'CZ', junior_min: 16000, junior_max: 26000, mid_min: 24000, mid_max: 38000, senior_min: 35000, senior_max: 52000, lead_min: 45000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // DATA ANALYST
  // ============================================
  { job: 'data-analyst', country: 'DE', junior_min: 38000, junior_max: 48000, mid_min: 48000, mid_max: 62000, senior_min: 60000, senior_max: 80000, lead_min: 75000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'FR', junior_min: 32000, junior_max: 42000, mid_min: 40000, mid_max: 55000, senior_min: 52000, senior_max: 70000, lead_min: 65000, lead_max: 90000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'ES', junior_min: 22000, junior_max: 30000, mid_min: 28000, mid_max: 40000, senior_min: 38000, senior_max: 55000, lead_min: 48000, lead_max: 70000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'NL', junior_min: 36000, junior_max: 46000, mid_min: 44000, mid_max: 60000, senior_min: 58000, senior_max: 78000, lead_min: 72000, lead_max: 98000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'IE', junior_min: 35000, junior_max: 48000, mid_min: 45000, mid_max: 62000, senior_min: 58000, senior_max: 80000, lead_min: 72000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'LU', junior_min: 42000, junior_max: 55000, mid_min: 55000, mid_max: 75000, senior_min: 70000, senior_max: 95000, lead_min: 85000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'CH', junior_min: 60000, junior_max: 78000, mid_min: 75000, mid_max: 100000, senior_min: 95000, senior_max: 130000, lead_min: 115000, lead_max: 165000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'BE', junior_min: 34000, junior_max: 44000, mid_min: 42000, mid_max: 58000, senior_min: 55000, senior_max: 75000, lead_min: 68000, lead_max: 95000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'IT', junior_min: 24000, junior_max: 32000, mid_min: 30000, mid_max: 42000, senior_min: 40000, senior_max: 58000, lead_min: 52000, lead_max: 75000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'PT', junior_min: 18000, junior_max: 26000, mid_min: 24000, mid_max: 36000, senior_min: 34000, senior_max: 50000, lead_min: 44000, lead_max: 65000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'PL', junior_min: 14000, junior_max: 22000, mid_min: 20000, mid_max: 34000, senior_min: 30000, senior_max: 48000, lead_min: 42000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'SE', junior_min: 35000, junior_max: 44000, mid_min: 42000, mid_max: 58000, senior_min: 55000, senior_max: 75000, lead_min: 70000, lead_max: 95000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'AT', junior_min: 36000, junior_max: 46000, mid_min: 44000, mid_max: 60000, senior_min: 58000, senior_max: 78000, lead_min: 70000, lead_max: 98000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'DK', junior_min: 38000, junior_max: 48000, mid_min: 46000, mid_max: 62000, senior_min: 58000, senior_max: 80000, lead_min: 72000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'CZ', junior_min: 12000, junior_max: 20000, mid_min: 18000, mid_max: 30000, senior_min: 28000, senior_max: 42000, lead_min: 38000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // FINANCIAL ANALYST
  // ============================================
  { job: 'financial-analyst', country: 'DE', junior_min: 40000, junior_max: 52000, mid_min: 52000, mid_max: 72000, senior_min: 68000, senior_max: 95000, lead_min: 85000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'FR', junior_min: 35000, junior_max: 45000, mid_min: 42000, mid_max: 60000, senior_min: 55000, senior_max: 80000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'NL', junior_min: 38000, junior_max: 50000, mid_min: 48000, mid_max: 68000, senior_min: 65000, senior_max: 90000, lead_min: 80000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'LU', junior_min: 52000, junior_max: 70000, mid_min: 68000, mid_max: 92000, senior_min: 85000, senior_max: 120000, lead_min: 105000, lead_max: 155000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'IE', junior_min: 38000, junior_max: 52000, mid_min: 50000, mid_max: 72000, senior_min: 65000, senior_max: 95000, lead_min: 82000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'CH', junior_min: 65000, junior_max: 85000, mid_min: 82000, mid_max: 110000, senior_min: 105000, senior_max: 145000, lead_min: 130000, lead_max: 185000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'ES', junior_min: 25000, junior_max: 35000, mid_min: 32000, mid_max: 48000, senior_min: 44000, senior_max: 65000, lead_min: 58000, lead_max: 85000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // ACCOUNTANT
  // ============================================
  { job: 'accountant', country: 'DE', junior_min: 35000, junior_max: 44000, mid_min: 42000, mid_max: 55000, senior_min: 52000, senior_max: 72000, lead_min: 65000, lead_max: 90000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'FR', junior_min: 28000, junior_max: 36000, mid_min: 35000, mid_max: 48000, senior_min: 45000, senior_max: 62000, lead_min: 58000, lead_max: 82000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'NL', junior_min: 32000, junior_max: 42000, mid_min: 40000, mid_max: 55000, senior_min: 52000, senior_max: 72000, lead_min: 65000, lead_max: 92000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'ES', junior_min: 22000, junior_max: 28000, mid_min: 26000, mid_max: 36000, senior_min: 34000, senior_max: 48000, lead_min: 44000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'LU', junior_min: 42000, junior_max: 55000, mid_min: 52000, mid_max: 72000, senior_min: 68000, senior_max: 95000, lead_min: 85000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // NURSE
  // ============================================
  { job: 'nurse', country: 'DE', junior_min: 30000, junior_max: 37000, mid_min: 36000, mid_max: 46000, senior_min: 42000, senior_max: 55000, lead_min: 50000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'FR', junior_min: 25000, junior_max: 32000, mid_min: 30000, mid_max: 40000, senior_min: 36000, senior_max: 50000, lead_min: 44000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'BE', junior_min: 32000, junior_max: 40000, mid_min: 38000, mid_max: 48000, senior_min: 44000, senior_max: 58000, lead_min: 52000, lead_max: 70000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'ES', junior_min: 22000, junior_max: 28000, mid_min: 27000, mid_max: 35000, senior_min: 32000, senior_max: 44000, lead_min: 38000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'NL', junior_min: 30000, junior_max: 38000, mid_min: 36000, mid_max: 48000, senior_min: 44000, senior_max: 58000, lead_min: 52000, lead_max: 72000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'CH', junior_min: 55000, junior_max: 68000, mid_min: 65000, mid_max: 82000, senior_min: 78000, senior_max: 98000, lead_min: 90000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'LU', junior_min: 40000, junior_max: 50000, mid_min: 48000, mid_max: 60000, senior_min: 56000, senior_max: 72000, lead_min: 65000, lead_max: 85000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'IE', junior_min: 32000, junior_max: 40000, mid_min: 38000, mid_max: 50000, senior_min: 46000, senior_max: 62000, lead_min: 55000, lead_max: 75000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'DK', junior_min: 38000, junior_max: 46000, mid_min: 44000, mid_max: 55000, senior_min: 52000, senior_max: 65000, lead_min: 60000, lead_max: 78000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // DOCTOR (GP)
  // ============================================
  { job: 'doctor', country: 'DE', junior_min: 55000, junior_max: 72000, mid_min: 72000, mid_max: 100000, senior_min: 95000, senior_max: 145000, lead_min: 120000, lead_max: 200000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'FR', junior_min: 45000, junior_max: 60000, mid_min: 62000, mid_max: 85000, senior_min: 80000, senior_max: 120000, lead_min: 100000, lead_max: 165000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'ES', junior_min: 35000, junior_max: 48000, mid_min: 48000, mid_max: 65000, senior_min: 62000, senior_max: 88000, lead_min: 78000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'NL', junior_min: 50000, junior_max: 68000, mid_min: 68000, mid_max: 95000, senior_min: 90000, senior_max: 135000, lead_min: 115000, lead_max: 180000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'IE', junior_min: 55000, junior_max: 72000, mid_min: 72000, mid_max: 100000, senior_min: 95000, senior_max: 140000, lead_min: 120000, lead_max: 190000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // TEACHER (Secondary)
  // ============================================
  { job: 'teacher', country: 'DE', junior_min: 42000, junior_max: 54000, mid_min: 52000, mid_max: 65000, senior_min: 60000, senior_max: 78000, lead_min: 70000, lead_max: 90000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'FR', junior_min: 28000, junior_max: 36000, mid_min: 35000, mid_max: 46000, senior_min: 42000, senior_max: 56000, lead_min: 50000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'ES', junior_min: 26000, junior_max: 34000, mid_min: 32000, mid_max: 42000, senior_min: 38000, senior_max: 52000, lead_min: 46000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'NL', junior_min: 34000, junior_max: 44000, mid_min: 42000, mid_max: 55000, senior_min: 52000, senior_max: 68000, lead_min: 62000, lead_max: 82000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'LU', junior_min: 55000, junior_max: 68000, mid_min: 68000, mid_max: 85000, senior_min: 82000, senior_max: 105000, lead_min: 95000, lead_max: 125000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'CH', junior_min: 65000, junior_max: 82000, mid_min: 78000, mid_max: 100000, senior_min: 95000, senior_max: 125000, lead_min: 110000, lead_max: 150000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // LAWYER
  // ============================================
  { job: 'lawyer', country: 'DE', junior_min: 48000, junior_max: 65000, mid_min: 65000, mid_max: 95000, senior_min: 85000, senior_max: 135000, lead_min: 110000, lead_max: 180000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'FR', junior_min: 38000, junior_max: 55000, mid_min: 52000, mid_max: 82000, senior_min: 72000, senior_max: 120000, lead_min: 95000, lead_max: 160000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'LU', junior_min: 58000, junior_max: 80000, mid_min: 80000, mid_max: 115000, senior_min: 105000, senior_max: 170000, lead_min: 140000, lead_max: 250000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'NL', junior_min: 42000, junior_max: 60000, mid_min: 58000, mid_max: 85000, senior_min: 78000, senior_max: 120000, lead_min: 100000, lead_max: 165000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'ES', junior_min: 28000, junior_max: 40000, mid_min: 38000, mid_max: 58000, senior_min: 52000, senior_max: 82000, lead_min: 68000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // MARKETING MANAGER
  // ============================================
  { job: 'marketing-manager', country: 'DE', junior_min: 35000, junior_max: 48000, mid_min: 48000, mid_max: 65000, senior_min: 62000, senior_max: 85000, lead_min: 78000, lead_max: 110000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'FR', junior_min: 32000, junior_max: 42000, mid_min: 42000, mid_max: 58000, senior_min: 55000, senior_max: 78000, lead_min: 68000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'ES', junior_min: 24000, junior_max: 34000, mid_min: 32000, mid_max: 46000, senior_min: 42000, senior_max: 62000, lead_min: 55000, lead_max: 82000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'NL', junior_min: 35000, junior_max: 46000, mid_min: 44000, mid_max: 62000, senior_min: 58000, senior_max: 82000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'IE', junior_min: 34000, junior_max: 46000, mid_min: 44000, mid_max: 62000, senior_min: 58000, senior_max: 82000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // SALES MANAGER
  // ============================================
  { job: 'sales-manager', country: 'DE', junior_min: 38000, junior_max: 50000, mid_min: 50000, mid_max: 70000, senior_min: 68000, senior_max: 95000, lead_min: 85000, lead_max: 125000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'FR', junior_min: 32000, junior_max: 42000, mid_min: 40000, mid_max: 58000, senior_min: 55000, senior_max: 78000, lead_min: 70000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'NL', junior_min: 36000, junior_max: 48000, mid_min: 46000, mid_max: 65000, senior_min: 62000, senior_max: 88000, lead_min: 78000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'ES', junior_min: 25000, junior_max: 35000, mid_min: 32000, mid_max: 48000, senior_min: 44000, senior_max: 65000, lead_min: 58000, lead_max: 88000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // HR MANAGER
  // ============================================
  { job: 'hr-manager', country: 'DE', junior_min: 38000, junior_max: 48000, mid_min: 48000, mid_max: 65000, senior_min: 62000, senior_max: 85000, lead_min: 78000, lead_max: 110000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'FR', junior_min: 32000, junior_max: 42000, mid_min: 40000, mid_max: 55000, senior_min: 52000, senior_max: 72000, lead_min: 65000, lead_max: 95000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'NL', junior_min: 36000, junior_max: 46000, mid_min: 44000, mid_max: 62000, senior_min: 58000, senior_max: 82000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'ES', junior_min: 26000, junior_max: 34000, mid_min: 32000, mid_max: 45000, senior_min: 42000, senior_max: 60000, lead_min: 55000, lead_max: 80000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // PROJECT MANAGER
  // ============================================
  { job: 'project-manager', country: 'DE', junior_min: 42000, junior_max: 55000, mid_min: 55000, mid_max: 75000, senior_min: 72000, senior_max: 98000, lead_min: 88000, lead_max: 125000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'FR', junior_min: 35000, junior_max: 46000, mid_min: 44000, mid_max: 62000, senior_min: 58000, senior_max: 82000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'NL', junior_min: 40000, junior_max: 52000, mid_min: 50000, mid_max: 70000, senior_min: 68000, senior_max: 92000, lead_min: 82000, lead_max: 118000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'ES', junior_min: 28000, junior_max: 38000, mid_min: 35000, mid_max: 50000, senior_min: 46000, senior_max: 68000, lead_min: 60000, lead_max: 88000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // MECHANICAL ENGINEER
  // ============================================
  { job: 'mechanical-engineer', country: 'DE', junior_min: 42000, junior_max: 52000, mid_min: 52000, mid_max: 68000, senior_min: 65000, senior_max: 88000, lead_min: 80000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'FR', junior_min: 33000, junior_max: 42000, mid_min: 40000, mid_max: 55000, senior_min: 52000, senior_max: 72000, lead_min: 65000, lead_max: 95000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'NL', junior_min: 38000, junior_max: 48000, mid_min: 46000, mid_max: 62000, senior_min: 58000, senior_max: 82000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'ES', junior_min: 25000, junior_max: 34000, mid_min: 32000, mid_max: 45000, senior_min: 42000, senior_max: 60000, lead_min: 55000, lead_max: 80000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'CH', junior_min: 65000, junior_max: 82000, mid_min: 80000, mid_max: 105000, senior_min: 100000, senior_max: 135000, lead_min: 120000, lead_max: 170000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // CIVIL ENGINEER
  // ============================================
  { job: 'civil-engineer', country: 'DE', junior_min: 40000, junior_max: 50000, mid_min: 48000, mid_max: 65000, senior_min: 62000, senior_max: 85000, lead_min: 78000, lead_max: 110000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'FR', junior_min: 32000, junior_max: 40000, mid_min: 38000, mid_max: 52000, senior_min: 48000, senior_max: 68000, lead_min: 62000, lead_max: 90000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'NL', junior_min: 36000, junior_max: 46000, mid_min: 44000, mid_max: 60000, senior_min: 56000, senior_max: 78000, lead_min: 70000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'ES', junior_min: 24000, junior_max: 32000, mid_min: 30000, mid_max: 42000, senior_min: 40000, senior_max: 58000, lead_min: 52000, lead_max: 78000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // GRAPHIC DESIGNER
  // ============================================
  { job: 'graphic-designer', country: 'DE', junior_min: 28000, junior_max: 36000, mid_min: 35000, mid_max: 48000, senior_min: 45000, senior_max: 62000, lead_min: 55000, lead_max: 78000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'FR', junior_min: 25000, junior_max: 32000, mid_min: 30000, mid_max: 42000, senior_min: 38000, senior_max: 55000, lead_min: 48000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'NL', junior_min: 28000, junior_max: 36000, mid_min: 34000, mid_max: 46000, senior_min: 42000, senior_max: 60000, lead_min: 52000, lead_max: 75000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'ES', junior_min: 18000, junior_max: 26000, mid_min: 24000, mid_max: 34000, senior_min: 32000, senior_max: 45000, lead_min: 40000, lead_max: 58000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // CUSTOMER SERVICE REP
  // ============================================
  { job: 'customer-service-rep', country: 'DE', junior_min: 26000, junior_max: 32000, mid_min: 30000, mid_max: 38000, senior_min: 36000, senior_max: 46000, lead_min: 42000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'FR', junior_min: 22000, junior_max: 28000, mid_min: 26000, mid_max: 34000, senior_min: 32000, senior_max: 42000, lead_min: 38000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'NL', junior_min: 26000, junior_max: 32000, mid_min: 30000, mid_max: 38000, senior_min: 35000, senior_max: 45000, lead_min: 42000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'ES', junior_min: 18000, junior_max: 24000, mid_min: 22000, mid_max: 28000, senior_min: 26000, senior_max: 34000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // LOGISTICS MANAGER
  // ============================================
  { job: 'logistics-manager', country: 'DE', junior_min: 36000, junior_max: 46000, mid_min: 45000, mid_max: 60000, senior_min: 58000, senior_max: 78000, lead_min: 72000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'NL', junior_min: 35000, junior_max: 44000, mid_min: 42000, mid_max: 58000, senior_min: 55000, senior_max: 75000, lead_min: 68000, lead_max: 95000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'FR', junior_min: 30000, junior_max: 40000, mid_min: 38000, mid_max: 52000, senior_min: 48000, senior_max: 68000, lead_min: 62000, lead_max: 88000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'ES', junior_min: 24000, junior_max: 32000, mid_min: 30000, mid_max: 42000, senior_min: 38000, senior_max: 55000, lead_min: 48000, lead_max: 72000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // OPERATIONS MANAGER
  // ============================================
  { job: 'operations-manager', country: 'DE', junior_min: 42000, junior_max: 55000, mid_min: 55000, mid_max: 72000, senior_min: 70000, senior_max: 95000, lead_min: 85000, lead_max: 120000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'FR', junior_min: 35000, junior_max: 46000, mid_min: 44000, mid_max: 62000, senior_min: 58000, senior_max: 80000, lead_min: 72000, lead_max: 105000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'NL', junior_min: 40000, junior_max: 52000, mid_min: 50000, mid_max: 68000, senior_min: 65000, senior_max: 90000, lead_min: 80000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'ES', junior_min: 28000, junior_max: 38000, mid_min: 36000, mid_max: 50000, senior_min: 46000, senior_max: 65000, lead_min: 58000, lead_max: 85000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // BUSINESS ANALYST
  // ============================================
  { job: 'business-analyst', country: 'DE', junior_min: 40000, junior_max: 50000, mid_min: 50000, mid_max: 68000, senior_min: 65000, senior_max: 88000, lead_min: 80000, lead_max: 112000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'FR', junior_min: 34000, junior_max: 44000, mid_min: 42000, mid_max: 58000, senior_min: 55000, senior_max: 75000, lead_min: 68000, lead_max: 98000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'NL', junior_min: 38000, junior_max: 48000, mid_min: 46000, mid_max: 65000, senior_min: 60000, senior_max: 85000, lead_min: 75000, lead_max: 108000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'ES', junior_min: 24000, junior_max: 32000, mid_min: 30000, mid_max: 44000, senior_min: 40000, senior_max: 58000, lead_min: 52000, lead_max: 78000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'IE', junior_min: 38000, junior_max: 50000, mid_min: 48000, mid_max: 68000, senior_min: 62000, senior_max: 88000, lead_min: 78000, lead_max: 112000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'LU', junior_min: 45000, junior_max: 60000, mid_min: 58000, mid_max: 80000, senior_min: 75000, senior_max: 105000, lead_min: 92000, lead_max: 135000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // PHARMACIST
  // ============================================
  { job: 'pharmacist', country: 'DE', junior_min: 42000, junior_max: 52000, mid_min: 50000, mid_max: 65000, senior_min: 62000, senior_max: 82000, lead_min: 75000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'FR', junior_min: 32000, junior_max: 42000, mid_min: 40000, mid_max: 55000, senior_min: 50000, senior_max: 70000, lead_min: 62000, lead_max: 88000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'BE', junior_min: 38000, junior_max: 48000, mid_min: 46000, mid_max: 60000, senior_min: 56000, senior_max: 78000, lead_min: 70000, lead_max: 95000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // DEVOPS ENGINEER
  // ============================================
  { job: 'devops-engineer', country: 'DE', junior_min: 45000, junior_max: 60000, mid_min: 58000, mid_max: 80000, senior_min: 78000, senior_max: 108000, lead_min: 95000, lead_max: 135000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'NL', junior_min: 43000, junior_max: 58000, mid_min: 55000, mid_max: 78000, senior_min: 72000, senior_max: 102000, lead_min: 88000, lead_max: 128000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'IE', junior_min: 42000, junior_max: 58000, mid_min: 58000, mid_max: 85000, senior_min: 78000, senior_max: 112000, lead_min: 95000, lead_max: 140000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'FR', junior_min: 38000, junior_max: 50000, mid_min: 48000, mid_max: 68000, senior_min: 62000, senior_max: 88000, lead_min: 78000, lead_max: 115000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'ES', junior_min: 28000, junior_max: 38000, mid_min: 36000, mid_max: 52000, senior_min: 48000, senior_max: 70000, lead_min: 62000, lead_max: 92000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // UX DESIGNER
  // ============================================
  { job: 'ux-designer', country: 'DE', junior_min: 35000, junior_max: 45000, mid_min: 45000, mid_max: 62000, senior_min: 58000, senior_max: 80000, lead_min: 72000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'FR', junior_min: 30000, junior_max: 40000, mid_min: 38000, mid_max: 52000, senior_min: 48000, senior_max: 68000, lead_min: 60000, lead_max: 88000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'NL', junior_min: 34000, junior_max: 44000, mid_min: 42000, mid_max: 58000, senior_min: 55000, senior_max: 78000, lead_min: 68000, lead_max: 98000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'ES', junior_min: 22000, junior_max: 30000, mid_min: 28000, mid_max: 40000, senior_min: 38000, senior_max: 55000, lead_min: 48000, lead_max: 72000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // ============================================
  // UNIVERSITY PROFESSOR
  // ============================================
  { job: 'university-professor', country: 'DE', junior_min: 52000, junior_max: 65000, mid_min: 65000, mid_max: 85000, senior_min: 82000, senior_max: 110000, lead_min: 95000, lead_max: 140000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'FR', junior_min: 35000, junior_max: 48000, mid_min: 45000, mid_max: 62000, senior_min: 58000, senior_max: 82000, lead_min: 72000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'NL', junior_min: 48000, junior_max: 60000, mid_min: 58000, mid_max: 78000, senior_min: 75000, senior_max: 100000, lead_min: 88000, lead_max: 125000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'CH', junior_min: 80000, junior_max: 100000, mid_min: 98000, mid_max: 130000, senior_min: 125000, senior_max: 170000, lead_min: 150000, lead_max: 220000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
];

// ============================================
// Helper functions
// ============================================

export function getSalaryForJobCountry(job: string, country: string): SalaryEntry | undefined {
  return seedData.find((d) => d.job === job && d.country === country);
}

export function getSalariesForJob(job: string): SalaryEntry[] {
  return seedData.filter((d) => d.job === job);
}

export function getSalariesForCountry(country: string): SalaryEntry[] {
  return seedData.filter((d) => d.country === country);
}

export function getAvailableJobs(): string[] {
  return [...new Set(seedData.map((d) => d.job))];
}

export function getAvailableCountries(): string[] {
  return [...new Set(seedData.map((d) => d.country))
  // --- RO ---
  { job: 'software-engineer', country: 'RO', junior_min: 13000, junior_max: 18000, mid_min: 18000, mid_max: 25000, senior_min: 24000, senior_max: 32000, lead_min: 29000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'RO', junior_min: 14000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 35000, lead_min: 30000, lead_max: 43000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'RO', junior_min: 12000, junior_max: 15000, mid_min: 15000, mid_max: 20000, senior_min: 19000, senior_max: 26000, lead_min: 24000, lead_max: 32000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'RO', junior_min: 13000, junior_max: 17000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'RO', junior_min: 11000, junior_max: 14000, mid_min: 13000, mid_max: 18000, senior_min: 17000, senior_max: 23000, lead_min: 21000, lead_max: 29000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'RO', junior_min: 10000, junior_max: 12000, mid_min: 12000, mid_max: 15000, senior_min: 13000, senior_max: 18000, lead_min: 16000, lead_max: 22000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'RO', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 32000, senior_min: 30000, senior_max: 46000, lead_min: 38000, lead_max: 64000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'RO', junior_min: 13000, junior_max: 17000, mid_min: 17000, mid_max: 21000, senior_min: 19000, senior_max: 25000, lead_min: 22000, lead_max: 29000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'RO', junior_min: 15000, junior_max: 21000, mid_min: 21000, mid_max: 30000, senior_min: 27000, senior_max: 43000, lead_min: 35000, lead_max: 58000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'RO', junior_min: 11000, junior_max: 15000, mid_min: 15000, mid_max: 21000, senior_min: 20000, senior_max: 27000, lead_min: 25000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'RO', junior_min: 12000, junior_max: 16000, mid_min: 16000, mid_max: 22000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'RO', junior_min: 12000, junior_max: 15000, mid_min: 15000, mid_max: 21000, senior_min: 20000, senior_max: 27000, lead_min: 25000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'RO', junior_min: 13000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 23000, senior_max: 31000, lead_min: 28000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'RO', junior_min: 13000, junior_max: 17000, mid_min: 17000, mid_max: 22000, senior_min: 21000, senior_max: 28000, lead_min: 26000, lead_max: 37000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'RO', junior_min: 13000, junior_max: 16000, mid_min: 15000, mid_max: 21000, senior_min: 20000, senior_max: 27000, lead_min: 25000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'RO', junior_min: 9000, junior_max: 12000, mid_min: 11000, mid_max: 15000, senior_min: 14000, senior_max: 20000, lead_min: 18000, lead_max: 25000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'RO', junior_min: 8000, junior_max: 10000, mid_min: 10000, mid_max: 12000, senior_min: 12000, senior_max: 15000, lead_min: 13000, lead_max: 18000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'RO', junior_min: 12000, junior_max: 15000, mid_min: 14000, mid_max: 19000, senior_min: 19000, senior_max: 25000, lead_min: 23000, lead_max: 32000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'RO', junior_min: 13000, junior_max: 18000, mid_min: 18000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'RO', junior_min: 13000, junior_max: 16000, mid_min: 16000, mid_max: 22000, senior_min: 21000, senior_max: 28000, lead_min: 26000, lead_max: 36000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'RO', junior_min: 13000, junior_max: 17000, mid_min: 16000, mid_max: 21000, senior_min: 20000, senior_max: 26000, lead_min: 24000, lead_max: 32000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'RO', junior_min: 14000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 35000, lead_min: 30000, lead_max: 43000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'RO', junior_min: 11000, junior_max: 14000, mid_min: 14000, mid_max: 20000, senior_min: 19000, senior_max: 26000, lead_min: 23000, lead_max: 32000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'RO', junior_min: 17000, junior_max: 21000, mid_min: 21000, mid_max: 27000, senior_min: 26000, senior_max: 35000, lead_min: 30000, lead_max: 45000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- HU ---
  { job: 'software-engineer', country: 'HU', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 30000, senior_min: 28000, senior_max: 38000, lead_min: 34000, lead_max: 49000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'HU', junior_min: 17000, junior_max: 23000, mid_min: 23000, mid_max: 31000, senior_min: 30000, senior_max: 41000, lead_min: 36000, lead_max: 51000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'HU', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 23000, senior_max: 30000, lead_min: 28000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'HU', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 32000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'HU', junior_min: 13000, junior_max: 17000, mid_min: 16000, mid_max: 21000, senior_min: 20000, senior_max: 27000, lead_min: 25000, lead_max: 34000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'HU', junior_min: 11000, junior_max: 14000, mid_min: 14000, mid_max: 17000, senior_min: 16000, senior_max: 21000, lead_min: 19000, lead_max: 26000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'HU', junior_min: 21000, junior_max: 27000, mid_min: 27000, mid_max: 38000, senior_min: 36000, senior_max: 55000, lead_min: 46000, lead_max: 76000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'HU', junior_min: 16000, junior_max: 21000, mid_min: 20000, mid_max: 25000, senior_min: 23000, senior_max: 30000, lead_min: 27000, lead_max: 34000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'HU', junior_min: 18000, junior_max: 25000, mid_min: 25000, mid_max: 36000, senior_min: 32000, senior_max: 51000, lead_min: 42000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'HU', junior_min: 13000, junior_max: 18000, mid_min: 18000, mid_max: 25000, senior_min: 24000, senior_max: 32000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'HU', junior_min: 14000, junior_max: 19000, mid_min: 19000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 32000, lead_max: 48000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'HU', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 25000, senior_min: 24000, senior_max: 32000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'HU', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 28000, senior_min: 27000, senior_max: 37000, lead_min: 33000, lead_max: 48000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'HU', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 26000, senior_min: 25000, senior_max: 33000, lead_min: 30000, lead_max: 44000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'HU', junior_min: 15000, junior_max: 19000, mid_min: 18000, mid_max: 25000, senior_min: 24000, senior_max: 32000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'HU', junior_min: 11000, junior_max: 14000, mid_min: 13000, mid_max: 18000, senior_min: 17000, senior_max: 24000, lead_min: 21000, lead_max: 30000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'HU', junior_min: 10000, junior_max: 12000, mid_min: 11000, mid_max: 14000, senior_min: 14000, senior_max: 17000, lead_min: 16000, lead_max: 21000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'HU', junior_min: 14000, junior_max: 17000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'HU', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 27000, senior_min: 27000, senior_max: 36000, lead_min: 32000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'HU', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 33000, lead_min: 30000, lead_max: 43000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'HU', junior_min: 16000, junior_max: 20000, mid_min: 19000, mid_max: 25000, senior_min: 24000, senior_max: 31000, lead_min: 28000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'HU', junior_min: 17000, junior_max: 23000, mid_min: 22000, mid_max: 30000, senior_min: 30000, senior_max: 41000, lead_min: 36000, lead_max: 51000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'HU', junior_min: 13000, junior_max: 17000, mid_min: 17000, mid_max: 24000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'HU', junior_min: 20000, junior_max: 25000, mid_min: 25000, mid_max: 32000, senior_min: 31000, senior_max: 42000, lead_min: 36000, lead_max: 53000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- BG ---
  { job: 'software-engineer', country: 'BG', junior_min: 10000, junior_max: 14000, mid_min: 14000, mid_max: 20000, senior_min: 19000, senior_max: 25000, lead_min: 22000, lead_max: 32000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'BG', junior_min: 11000, junior_max: 15000, mid_min: 15000, mid_max: 20000, senior_min: 20000, senior_max: 27000, lead_min: 24000, lead_max: 34000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'BG', junior_min: 10000, junior_max: 12000, mid_min: 12000, mid_max: 16000, senior_min: 15000, senior_max: 20000, lead_min: 19000, lead_max: 25000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'BG', junior_min: 10000, junior_max: 13000, mid_min: 13000, mid_max: 18000, senior_min: 17000, senior_max: 24000, lead_min: 21000, lead_max: 30000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'BG', junior_min: 9000, junior_max: 11000, mid_min: 10000, mid_max: 14000, senior_min: 13000, senior_max: 18000, lead_min: 16000, lead_max: 22000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'BG', junior_min: 8000, junior_max: 9000, mid_min: 9000, mid_max: 12000, senior_min: 10000, senior_max: 14000, lead_min: 12000, lead_max: 17000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'BG', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 25000, senior_min: 24000, senior_max: 36000, lead_min: 30000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'BG', junior_min: 10000, junior_max: 14000, mid_min: 13000, mid_max: 16000, senior_min: 15000, senior_max: 20000, lead_min: 18000, lead_max: 22000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'BG', junior_min: 12000, junior_max: 16000, mid_min: 16000, mid_max: 24000, senior_min: 21000, senior_max: 34000, lead_min: 28000, lead_max: 45000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'BG', junior_min: 9000, junior_max: 12000, mid_min: 12000, mid_max: 16000, senior_min: 16000, senior_max: 21000, lead_min: 20000, lead_max: 28000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'BG', junior_min: 10000, junior_max: 12000, mid_min: 12000, mid_max: 18000, senior_min: 17000, senior_max: 24000, lead_min: 21000, lead_max: 31000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'BG', junior_min: 10000, junior_max: 12000, mid_min: 12000, mid_max: 16000, senior_min: 16000, senior_max: 21000, lead_min: 20000, lead_max: 28000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'BG', junior_min: 10000, junior_max: 14000, mid_min: 14000, mid_max: 19000, senior_min: 18000, senior_max: 24000, lead_min: 22000, lead_max: 31000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'BG', junior_min: 10000, junior_max: 13000, mid_min: 13000, mid_max: 17000, senior_min: 16000, senior_max: 22000, lead_min: 20000, lead_max: 29000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'BG', junior_min: 10000, junior_max: 12000, mid_min: 12000, mid_max: 16000, senior_min: 16000, senior_max: 21000, lead_min: 20000, lead_max: 28000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'BG', junior_min: 7000, junior_max: 9000, mid_min: 9000, mid_max: 12000, senior_min: 11000, senior_max: 16000, lead_min: 14000, lead_max: 20000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'BG', junior_min: 6000, junior_max: 8000, mid_min: 8000, mid_max: 10000, senior_min: 9000, senior_max: 12000, lead_min: 10000, lead_max: 14000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'BG', junior_min: 9000, junior_max: 12000, mid_min: 11000, mid_max: 15000, senior_min: 14000, senior_max: 20000, lead_min: 18000, lead_max: 25000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'BG', junior_min: 10000, junior_max: 14000, mid_min: 14000, mid_max: 18000, senior_min: 18000, senior_max: 24000, lead_min: 21000, lead_max: 30000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'BG', junior_min: 10000, junior_max: 12000, mid_min: 12000, mid_max: 17000, senior_min: 16000, senior_max: 22000, lead_min: 20000, lead_max: 28000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'BG', junior_min: 10000, junior_max: 13000, mid_min: 12000, mid_max: 16000, senior_min: 16000, senior_max: 20000, lead_min: 19000, lead_max: 25000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'BG', junior_min: 11000, junior_max: 15000, mid_min: 14000, mid_max: 20000, senior_min: 20000, senior_max: 27000, lead_min: 24000, lead_max: 34000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'BG', junior_min: 9000, junior_max: 11000, mid_min: 11000, mid_max: 16000, senior_min: 14000, senior_max: 20000, lead_min: 18000, lead_max: 25000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'BG', junior_min: 13000, junior_max: 16000, mid_min: 16000, mid_max: 21000, senior_min: 20000, senior_max: 28000, lead_min: 24000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- HR ---
  { job: 'software-engineer', country: 'HR', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 27000, senior_min: 26000, senior_max: 35000, lead_min: 31000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'HR', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 27000, senior_max: 38000, lead_min: 33000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'HR', junior_min: 13000, junior_max: 17000, mid_min: 17000, mid_max: 22000, senior_min: 21000, senior_max: 28000, lead_min: 26000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'HR', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 25000, senior_min: 24000, senior_max: 33000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'HR', junior_min: 12000, junior_max: 15000, mid_min: 15000, mid_max: 19000, senior_min: 18000, senior_max: 25000, lead_min: 23000, lead_max: 31000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'HR', junior_min: 10000, junior_max: 13000, mid_min: 13000, mid_max: 16000, senior_min: 15000, senior_max: 19000, lead_min: 18000, lead_max: 24000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'HR', junior_min: 19000, junior_max: 25000, mid_min: 25000, mid_max: 35000, senior_min: 33000, senior_max: 51000, lead_min: 42000, lead_max: 70000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'HR', junior_min: 15000, junior_max: 19000, mid_min: 18000, mid_max: 23000, senior_min: 21000, senior_max: 27000, lead_min: 24000, lead_max: 31000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'HR', junior_min: 17000, junior_max: 23000, mid_min: 23000, mid_max: 33000, senior_min: 30000, senior_max: 47000, lead_min: 38000, lead_max: 63000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'HR', junior_min: 12000, junior_max: 17000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'HR', junior_min: 13000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 24000, senior_max: 33000, lead_min: 30000, lead_max: 44000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'HR', junior_min: 13000, junior_max: 17000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'HR', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 31000, lead_max: 44000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'HR', junior_min: 15000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 23000, senior_max: 31000, lead_min: 28000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'HR', junior_min: 14000, junior_max: 18000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'HR', junior_min: 10000, junior_max: 13000, mid_min: 12000, mid_max: 17000, senior_min: 16000, senior_max: 22000, lead_min: 19000, lead_max: 27000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'HR', junior_min: 9000, junior_max: 11000, mid_min: 10000, mid_max: 13000, senior_min: 13000, senior_max: 16000, lead_min: 15000, lead_max: 19000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'HR', junior_min: 13000, junior_max: 16000, mid_min: 16000, mid_max: 21000, senior_min: 20000, senior_max: 27000, lead_min: 25000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'HR', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 25000, senior_min: 24000, senior_max: 33000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'HR', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 23000, senior_max: 31000, lead_min: 28000, lead_max: 39000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'HR', junior_min: 15000, junior_max: 18000, mid_min: 18000, mid_max: 23000, senior_min: 22000, senior_max: 29000, lead_min: 26000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'HR', junior_min: 16000, junior_max: 21000, mid_min: 20000, mid_max: 28000, senior_min: 27000, senior_max: 38000, lead_min: 33000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'HR', junior_min: 12000, junior_max: 16000, mid_min: 16000, mid_max: 22000, senior_min: 20000, senior_max: 28000, lead_min: 25000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'HR', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 30000, senior_min: 29000, senior_max: 38000, lead_min: 33000, lead_max: 49000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- SK ---
  { job: 'software-engineer', country: 'SK', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 33000, senior_min: 32000, senior_max: 42000, lead_min: 38000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'SK', junior_min: 19000, junior_max: 25000, mid_min: 25000, mid_max: 34000, senior_min: 33000, senior_max: 45000, lead_min: 40000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'SK', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 32000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'SK', junior_min: 17000, junior_max: 22000, mid_min: 22000, mid_max: 30000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'SK', junior_min: 15000, junior_max: 18000, mid_min: 18000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'SK', junior_min: 13000, junior_max: 16000, mid_min: 15000, mid_max: 19000, senior_min: 18000, senior_max: 23000, lead_min: 21000, lead_max: 29000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'SK', junior_min: 23000, junior_max: 30000, mid_min: 30000, mid_max: 42000, senior_min: 40000, senior_max: 61000, lead_min: 50000, lead_max: 84000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'SK', junior_min: 18000, junior_max: 23000, mid_min: 22000, mid_max: 27000, senior_min: 25000, senior_max: 33000, lead_min: 29000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'SK', junior_min: 20000, junior_max: 27000, mid_min: 27000, mid_max: 40000, senior_min: 36000, senior_max: 57000, lead_min: 46000, lead_max: 76000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'SK', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'SK', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'SK', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'SK', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 32000, senior_min: 30000, senior_max: 41000, lead_min: 37000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'SK', junior_min: 18000, junior_max: 22000, mid_min: 22000, mid_max: 29000, senior_min: 27000, senior_max: 37000, lead_min: 34000, lead_max: 48000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'SK', junior_min: 17000, junior_max: 21000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'SK', junior_min: 12000, junior_max: 15000, mid_min: 15000, mid_max: 20000, senior_min: 19000, senior_max: 26000, lead_min: 23000, lead_max: 33000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'SK', junior_min: 11000, junior_max: 13000, mid_min: 13000, mid_max: 16000, senior_min: 15000, senior_max: 19000, lead_min: 18000, lead_max: 23000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'SK', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 25000, senior_min: 24000, senior_max: 33000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'SK', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 30000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'SK', junior_min: 17000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 27000, senior_max: 37000, lead_min: 34000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'SK', junior_min: 18000, junior_max: 22000, mid_min: 21000, mid_max: 27000, senior_min: 26000, senior_max: 34000, lead_min: 32000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'SK', junior_min: 19000, junior_max: 25000, mid_min: 24000, mid_max: 34000, senior_min: 33000, senior_max: 45000, lead_min: 40000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'SK', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 24000, senior_max: 34000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'SK', junior_min: 22000, junior_max: 27000, mid_min: 27000, mid_max: 36000, senior_min: 34000, senior_max: 46000, lead_min: 40000, lead_max: 59000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- SI ---
  { job: 'software-engineer', country: 'SI', junior_min: 23000, junior_max: 30000, mid_min: 30000, mid_max: 43000, senior_min: 41000, senior_max: 55000, lead_min: 50000, lead_max: 72000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'SI', junior_min: 25000, junior_max: 33000, mid_min: 33000, mid_max: 45000, senior_min: 43000, senior_max: 59000, lead_min: 52000, lead_max: 74000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'SI', junior_min: 21000, junior_max: 26000, mid_min: 26000, mid_max: 34000, senior_min: 33000, senior_max: 44000, lead_min: 41000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'SI', junior_min: 22000, junior_max: 29000, mid_min: 29000, mid_max: 40000, senior_min: 37000, senior_max: 52000, lead_min: 47000, lead_max: 66000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'SI', junior_min: 19000, junior_max: 24000, mid_min: 23000, mid_max: 30000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'SI', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 25000, senior_min: 23000, senior_max: 30000, lead_min: 28000, lead_max: 37000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'SI', junior_min: 30000, junior_max: 40000, mid_min: 40000, mid_max: 55000, senior_min: 52000, senior_max: 80000, lead_min: 66000, lead_max: 110000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'SI', junior_min: 23000, junior_max: 30000, mid_min: 29000, mid_max: 36000, senior_min: 33000, senior_max: 43000, lead_min: 38000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'SI', junior_min: 26000, junior_max: 36000, mid_min: 36000, mid_max: 52000, senior_min: 47000, senior_max: 74000, lead_min: 61000, lead_max: 99000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'SI', junior_min: 19000, junior_max: 26000, mid_min: 26000, mid_max: 36000, senior_min: 34000, senior_max: 47000, lead_min: 43000, lead_max: 61000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'SI', junior_min: 21000, junior_max: 28000, mid_min: 28000, mid_max: 38000, senior_min: 37000, senior_max: 52000, lead_min: 47000, lead_max: 69000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'SI', junior_min: 21000, junior_max: 26000, mid_min: 26000, mid_max: 36000, senior_min: 34000, senior_max: 47000, lead_min: 43000, lead_max: 61000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'SI', junior_min: 23000, junior_max: 30000, mid_min: 30000, mid_max: 41000, senior_min: 40000, senior_max: 54000, lead_min: 48000, lead_max: 69000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'SI', junior_min: 23000, junior_max: 29000, mid_min: 29000, mid_max: 37000, senior_min: 36000, senior_max: 48000, lead_min: 44000, lead_max: 63000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'SI', junior_min: 22000, junior_max: 28000, mid_min: 26000, mid_max: 36000, senior_min: 34000, senior_max: 47000, lead_min: 43000, lead_max: 61000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'SI', junior_min: 15000, junior_max: 20000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 30000, lead_max: 43000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'SI', junior_min: 14000, junior_max: 18000, mid_min: 16000, mid_max: 21000, senior_min: 20000, senior_max: 25000, lead_min: 23000, lead_max: 30000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'SI', junior_min: 20000, junior_max: 25000, mid_min: 25000, mid_max: 33000, senior_min: 32000, senior_max: 43000, lead_min: 40000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'SI', junior_min: 23000, junior_max: 30000, mid_min: 30000, mid_max: 40000, senior_min: 38000, senior_max: 52000, lead_min: 47000, lead_max: 66000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'SI', junior_min: 22000, junior_max: 28000, mid_min: 28000, mid_max: 37000, senior_min: 36000, senior_max: 48000, lead_min: 44000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'SI', junior_min: 23000, junior_max: 29000, mid_min: 28000, mid_max: 36000, senior_min: 34000, senior_max: 45000, lead_min: 41000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'SI', junior_min: 25000, junior_max: 33000, mid_min: 32000, mid_max: 44000, senior_min: 43000, senior_max: 59000, lead_min: 52000, lead_max: 74000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'SI', junior_min: 19000, junior_max: 25000, mid_min: 25000, mid_max: 34000, senior_min: 32000, senior_max: 44000, lead_min: 40000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'SI', junior_min: 29000, junior_max: 36000, mid_min: 36000, mid_max: 47000, senior_min: 45000, senior_max: 61000, lead_min: 52000, lead_max: 77000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- LT ---
  { job: 'software-engineer', country: 'LT', junior_min: 17000, junior_max: 22000, mid_min: 22000, mid_max: 31000, senior_min: 30000, senior_max: 40000, lead_min: 36000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'LT', junior_min: 18000, junior_max: 24000, mid_min: 24000, mid_max: 33000, senior_min: 31000, senior_max: 43000, lead_min: 38000, lead_max: 54000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'LT', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 25000, senior_min: 24000, senior_max: 32000, lead_min: 30000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'LT', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 27000, senior_max: 38000, lead_min: 34000, lead_max: 48000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'LT', junior_min: 14000, junior_max: 18000, mid_min: 17000, mid_max: 22000, senior_min: 21000, senior_max: 29000, lead_min: 26000, lead_max: 36000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'LT', junior_min: 12000, junior_max: 15000, mid_min: 14000, mid_max: 18000, senior_min: 17000, senior_max: 22000, lead_min: 20000, lead_max: 27000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'LT', junior_min: 22000, junior_max: 29000, mid_min: 29000, mid_max: 40000, senior_min: 38000, senior_max: 58000, lead_min: 48000, lead_max: 80000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'LT', junior_min: 17000, junior_max: 22000, mid_min: 21000, mid_max: 26000, senior_min: 24000, senior_max: 31000, lead_min: 28000, lead_max: 36000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'LT', junior_min: 19000, junior_max: 26000, mid_min: 26000, mid_max: 38000, senior_min: 34000, senior_max: 54000, lead_min: 44000, lead_max: 72000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'LT', junior_min: 14000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 31000, lead_max: 44000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'LT', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 28000, senior_min: 27000, senior_max: 38000, lead_min: 34000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'LT', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 31000, lead_max: 44000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'LT', junior_min: 17000, junior_max: 22000, mid_min: 22000, mid_max: 30000, senior_min: 29000, senior_max: 39000, lead_min: 35000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'LT', junior_min: 17000, junior_max: 21000, mid_min: 21000, mid_max: 27000, senior_min: 26000, senior_max: 35000, lead_min: 32000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'LT', junior_min: 16000, junior_max: 20000, mid_min: 19000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 31000, lead_max: 44000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'LT', junior_min: 11000, junior_max: 14000, mid_min: 14000, mid_max: 19000, senior_min: 18000, senior_max: 25000, lead_min: 22000, lead_max: 31000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'LT', junior_min: 10000, junior_max: 13000, mid_min: 12000, mid_max: 15000, senior_min: 14000, senior_max: 18000, lead_min: 17000, lead_max: 22000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'LT', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 23000, senior_max: 31000, lead_min: 29000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'LT', junior_min: 17000, junior_max: 22000, mid_min: 22000, mid_max: 29000, senior_min: 28000, senior_max: 38000, lead_min: 34000, lead_max: 48000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'LT', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 35000, lead_min: 32000, lead_max: 45000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'LT', junior_min: 17000, junior_max: 21000, mid_min: 20000, mid_max: 26000, senior_min: 25000, senior_max: 33000, lead_min: 30000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'LT', junior_min: 18000, junior_max: 24000, mid_min: 23000, mid_max: 32000, senior_min: 31000, senior_max: 43000, lead_min: 38000, lead_max: 54000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'LT', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 25000, senior_min: 23000, senior_max: 32000, lead_min: 29000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'LT', junior_min: 21000, junior_max: 26000, mid_min: 26000, mid_max: 34000, senior_min: 33000, senior_max: 44000, lead_min: 38000, lead_max: 56000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- LV ---
  { job: 'software-engineer', country: 'LV', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 28000, senior_min: 27000, senior_max: 36000, lead_min: 32000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'LV', junior_min: 16000, junior_max: 22000, mid_min: 22000, mid_max: 30000, senior_min: 28000, senior_max: 39000, lead_min: 34000, lead_max: 49000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'LV', junior_min: 14000, junior_max: 17000, mid_min: 17000, mid_max: 22000, senior_min: 22000, senior_max: 29000, lead_min: 27000, lead_max: 36000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'LV', junior_min: 14000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 24000, senior_max: 34000, lead_min: 31000, lead_max: 43000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'LV', junior_min: 13000, junior_max: 16000, mid_min: 15000, mid_max: 20000, senior_min: 19000, senior_max: 26000, lead_min: 23000, lead_max: 32000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'LV', junior_min: 11000, junior_max: 13000, mid_min: 13000, mid_max: 17000, senior_min: 15000, senior_max: 20000, lead_min: 18000, lead_max: 24000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'LV', junior_min: 20000, junior_max: 26000, mid_min: 26000, mid_max: 36000, senior_min: 34000, senior_max: 52000, lead_min: 43000, lead_max: 72000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'LV', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 23000, senior_min: 22000, senior_max: 28000, lead_min: 25000, lead_max: 32000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'LV', junior_min: 17000, junior_max: 23000, mid_min: 23000, mid_max: 34000, senior_min: 31000, senior_max: 49000, lead_min: 40000, lead_max: 65000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'LV', junior_min: 13000, junior_max: 17000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 31000, lead_min: 28000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'LV', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 25000, senior_min: 24000, senior_max: 34000, lead_min: 31000, lead_max: 45000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'LV', junior_min: 14000, junior_max: 17000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 31000, lead_min: 28000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'LV', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 35000, lead_min: 32000, lead_max: 45000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'LV', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 24000, senior_min: 23000, senior_max: 32000, lead_min: 29000, lead_max: 41000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'LV', junior_min: 14000, junior_max: 18000, mid_min: 17000, mid_max: 23000, senior_min: 22000, senior_max: 31000, lead_min: 28000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'LV', junior_min: 10000, junior_max: 13000, mid_min: 13000, mid_max: 17000, senior_min: 16000, senior_max: 22000, lead_min: 20000, lead_max: 28000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'LV', junior_min: 9000, junior_max: 12000, mid_min: 11000, mid_max: 14000, senior_min: 13000, senior_max: 17000, lead_min: 15000, lead_max: 20000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'LV', junior_min: 13000, junior_max: 17000, mid_min: 16000, mid_max: 22000, senior_min: 21000, senior_max: 28000, lead_min: 26000, lead_max: 36000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'LV', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 31000, lead_max: 43000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'LV', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 23000, senior_max: 32000, lead_min: 29000, lead_max: 40000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'LV', junior_min: 15000, junior_max: 19000, mid_min: 18000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 36000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'LV', junior_min: 16000, junior_max: 22000, mid_min: 21000, mid_max: 29000, senior_min: 28000, senior_max: 39000, lead_min: 34000, lead_max: 49000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'LV', junior_min: 13000, junior_max: 16000, mid_min: 16000, mid_max: 22000, senior_min: 21000, senior_max: 29000, lead_min: 26000, lead_max: 36000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'LV', junior_min: 19000, junior_max: 23000, mid_min: 23000, mid_max: 31000, senior_min: 30000, senior_max: 40000, lead_min: 34000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- EE ---
  { job: 'software-engineer', country: 'EE', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 33000, senior_min: 32000, senior_max: 42000, lead_min: 38000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'EE', junior_min: 19000, junior_max: 25000, mid_min: 25000, mid_max: 34000, senior_min: 33000, senior_max: 45000, lead_min: 40000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'EE', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 32000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'EE', junior_min: 17000, junior_max: 22000, mid_min: 22000, mid_max: 30000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'EE', junior_min: 15000, junior_max: 18000, mid_min: 18000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'EE', junior_min: 13000, junior_max: 16000, mid_min: 15000, mid_max: 19000, senior_min: 18000, senior_max: 23000, lead_min: 21000, lead_max: 29000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'EE', junior_min: 23000, junior_max: 30000, mid_min: 30000, mid_max: 42000, senior_min: 40000, senior_max: 61000, lead_min: 50000, lead_max: 84000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'EE', junior_min: 18000, junior_max: 23000, mid_min: 22000, mid_max: 27000, senior_min: 25000, senior_max: 33000, lead_min: 29000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'EE', junior_min: 20000, junior_max: 27000, mid_min: 27000, mid_max: 40000, senior_min: 36000, senior_max: 57000, lead_min: 46000, lead_max: 76000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'EE', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'EE', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'EE', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'EE', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 32000, senior_min: 30000, senior_max: 41000, lead_min: 37000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'EE', junior_min: 18000, junior_max: 22000, mid_min: 22000, mid_max: 29000, senior_min: 27000, senior_max: 37000, lead_min: 34000, lead_max: 48000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'EE', junior_min: 17000, junior_max: 21000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'EE', junior_min: 12000, junior_max: 15000, mid_min: 15000, mid_max: 20000, senior_min: 19000, senior_max: 26000, lead_min: 23000, lead_max: 33000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'EE', junior_min: 11000, junior_max: 13000, mid_min: 13000, mid_max: 16000, senior_min: 15000, senior_max: 19000, lead_min: 18000, lead_max: 23000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'EE', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 25000, senior_min: 24000, senior_max: 33000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'EE', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 30000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'EE', junior_min: 17000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 27000, senior_max: 37000, lead_min: 34000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'EE', junior_min: 18000, junior_max: 22000, mid_min: 21000, mid_max: 27000, senior_min: 26000, senior_max: 34000, lead_min: 32000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'EE', junior_min: 19000, junior_max: 25000, mid_min: 24000, mid_max: 34000, senior_min: 33000, senior_max: 45000, lead_min: 40000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'EE', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 24000, senior_max: 34000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'EE', junior_min: 22000, junior_max: 27000, mid_min: 27000, mid_max: 36000, senior_min: 34000, senior_max: 46000, lead_min: 40000, lead_max: 59000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- CY ---
  { job: 'software-engineer', country: 'CY', junior_min: 22000, junior_max: 29000, mid_min: 29000, mid_max: 41000, senior_min: 39000, senior_max: 52000, lead_min: 47000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'CY', junior_min: 23000, junior_max: 31000, mid_min: 31000, mid_max: 43000, senior_min: 41000, senior_max: 56000, lead_min: 49000, lead_max: 70000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'CY', junior_min: 20000, junior_max: 25000, mid_min: 25000, mid_max: 32000, senior_min: 31000, senior_max: 42000, lead_min: 39000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'CY', junior_min: 21000, junior_max: 27000, mid_min: 27000, mid_max: 37000, senior_min: 35000, senior_max: 49000, lead_min: 44000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'CY', junior_min: 18000, junior_max: 23000, mid_min: 22000, mid_max: 29000, senior_min: 27000, senior_max: 37000, lead_min: 34000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'CY', junior_min: 16000, junior_max: 19000, mid_min: 19000, mid_max: 24000, senior_min: 22000, senior_max: 29000, lead_min: 26000, lead_max: 35000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'CY', junior_min: 29000, junior_max: 37000, mid_min: 37000, mid_max: 52000, senior_min: 49000, senior_max: 75000, lead_min: 62000, lead_max: 104000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'CY', junior_min: 22000, junior_max: 28000, mid_min: 27000, mid_max: 34000, senior_min: 31000, senior_max: 41000, lead_min: 36000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'CY', junior_min: 25000, junior_max: 34000, mid_min: 34000, mid_max: 49000, senior_min: 44000, senior_max: 70000, lead_min: 57000, lead_max: 94000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'CY', junior_min: 18000, junior_max: 25000, mid_min: 25000, mid_max: 34000, senior_min: 32000, senior_max: 44000, lead_min: 41000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'CY', junior_min: 20000, junior_max: 26000, mid_min: 26000, mid_max: 36000, senior_min: 35000, senior_max: 49000, lead_min: 44000, lead_max: 65000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'CY', junior_min: 20000, junior_max: 25000, mid_min: 25000, mid_max: 34000, senior_min: 32000, senior_max: 44000, lead_min: 41000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'CY', junior_min: 22000, junior_max: 29000, mid_min: 29000, mid_max: 39000, senior_min: 37000, senior_max: 51000, lead_min: 46000, lead_max: 65000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'CY', junior_min: 22000, junior_max: 27000, mid_min: 27000, mid_max: 35000, senior_min: 34000, senior_max: 46000, lead_min: 42000, lead_max: 60000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'CY', junior_min: 21000, junior_max: 26000, mid_min: 25000, mid_max: 34000, senior_min: 32000, senior_max: 44000, lead_min: 41000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'CY', junior_min: 15000, junior_max: 19000, mid_min: 18000, mid_max: 25000, senior_min: 23000, senior_max: 32000, lead_min: 29000, lead_max: 41000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'CY', junior_min: 14000, junior_max: 17000, mid_min: 16000, mid_max: 20000, senior_min: 19000, senior_max: 24000, lead_min: 22000, lead_max: 29000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'CY', junior_min: 19000, junior_max: 24000, mid_min: 23000, mid_max: 31000, senior_min: 30000, senior_max: 41000, lead_min: 37000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'CY', junior_min: 22000, junior_max: 29000, mid_min: 29000, mid_max: 37000, senior_min: 36000, senior_max: 49000, lead_min: 44000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'CY', junior_min: 21000, junior_max: 26000, mid_min: 26000, mid_max: 35000, senior_min: 34000, senior_max: 46000, lead_min: 42000, lead_max: 58000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'CY', junior_min: 22000, junior_max: 27000, mid_min: 26000, mid_max: 34000, senior_min: 32000, senior_max: 43000, lead_min: 39000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'CY', junior_min: 23000, junior_max: 31000, mid_min: 30000, mid_max: 42000, senior_min: 41000, senior_max: 56000, lead_min: 49000, lead_max: 70000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'CY', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 32000, senior_min: 30000, senior_max: 42000, lead_min: 37000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'CY', junior_min: 27000, junior_max: 34000, mid_min: 34000, mid_max: 44000, senior_min: 43000, senior_max: 57000, lead_min: 49000, lead_max: 73000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- MT ---
  { job: 'software-engineer', country: 'MT', junior_min: 21000, junior_max: 28000, mid_min: 28000, mid_max: 39000, senior_min: 38000, senior_max: 50000, lead_min: 45000, lead_max: 65000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'MT', junior_min: 22000, junior_max: 30000, mid_min: 30000, mid_max: 41000, senior_min: 39000, senior_max: 54000, lead_min: 48000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'MT', junior_min: 19000, junior_max: 24000, mid_min: 24000, mid_max: 31000, senior_min: 30000, senior_max: 40000, lead_min: 38000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'MT', junior_min: 20000, junior_max: 26000, mid_min: 26000, mid_max: 36000, senior_min: 34000, senior_max: 48000, lead_min: 42000, lead_max: 60000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'MT', junior_min: 18000, junior_max: 22000, mid_min: 21000, mid_max: 28000, senior_min: 26000, senior_max: 36000, lead_min: 32000, lead_max: 45000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'MT', junior_min: 15000, junior_max: 18000, mid_min: 18000, mid_max: 23000, senior_min: 21000, senior_max: 28000, lead_min: 25000, lead_max: 34000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'MT', junior_min: 28000, junior_max: 36000, mid_min: 36000, mid_max: 50000, senior_min: 48000, senior_max: 72000, lead_min: 60000, lead_max: 100000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'MT', junior_min: 21000, junior_max: 27000, mid_min: 26000, mid_max: 32000, senior_min: 30000, senior_max: 39000, lead_min: 35000, lead_max: 45000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'MT', junior_min: 24000, junior_max: 32000, mid_min: 32000, mid_max: 48000, senior_min: 42000, senior_max: 68000, lead_min: 55000, lead_max: 90000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'MT', junior_min: 18000, junior_max: 24000, mid_min: 24000, mid_max: 32000, senior_min: 31000, senior_max: 42000, lead_min: 39000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'MT', junior_min: 19000, junior_max: 25000, mid_min: 25000, mid_max: 35000, senior_min: 34000, senior_max: 48000, lead_min: 42000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'MT', junior_min: 19000, junior_max: 24000, mid_min: 24000, mid_max: 32000, senior_min: 31000, senior_max: 42000, lead_min: 39000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'MT', junior_min: 21000, junior_max: 28000, mid_min: 28000, mid_max: 38000, senior_min: 36000, senior_max: 49000, lead_min: 44000, lead_max: 62000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'MT', junior_min: 21000, junior_max: 26000, mid_min: 26000, mid_max: 34000, senior_min: 32000, senior_max: 44000, lead_min: 40000, lead_max: 58000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'MT', junior_min: 20000, junior_max: 25000, mid_min: 24000, mid_max: 32000, senior_min: 31000, senior_max: 42000, lead_min: 39000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'MT', junior_min: 14000, junior_max: 18000, mid_min: 18000, mid_max: 24000, senior_min: 22000, senior_max: 31000, lead_min: 28000, lead_max: 39000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'MT', junior_min: 13000, junior_max: 16000, mid_min: 15000, mid_max: 19000, senior_min: 18000, senior_max: 23000, lead_min: 21000, lead_max: 28000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'MT', junior_min: 18000, junior_max: 23000, mid_min: 22000, mid_max: 30000, senior_min: 29000, senior_max: 39000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'MT', junior_min: 21000, junior_max: 28000, mid_min: 28000, mid_max: 36000, senior_min: 35000, senior_max: 48000, lead_min: 42000, lead_max: 60000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'MT', junior_min: 20000, junior_max: 25000, mid_min: 25000, mid_max: 34000, senior_min: 32000, senior_max: 44000, lead_min: 40000, lead_max: 56000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'MT', junior_min: 21000, junior_max: 26000, mid_min: 25000, mid_max: 32000, senior_min: 31000, senior_max: 41000, lead_min: 38000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'MT', junior_min: 22000, junior_max: 30000, mid_min: 29000, mid_max: 40000, senior_min: 39000, senior_max: 54000, lead_min: 48000, lead_max: 68000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'MT', junior_min: 18000, junior_max: 22000, mid_min: 22000, mid_max: 31000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'MT', junior_min: 26000, junior_max: 32000, mid_min: 32000, mid_max: 42000, senior_min: 41000, senior_max: 55000, lead_min: 48000, lead_max: 70000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },

  // --- EL ---
  { job: 'software-engineer', country: 'EL', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 33000, senior_min: 32000, senior_max: 42000, lead_min: 38000, lead_max: 55000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'product-manager', country: 'EL', junior_min: 19000, junior_max: 25000, mid_min: 25000, mid_max: 34000, senior_min: 33000, senior_max: 45000, lead_min: 40000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'data-analyst', country: 'EL', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 26000, senior_min: 25000, senior_max: 34000, lead_min: 32000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'financial-analyst', country: 'EL', junior_min: 17000, junior_max: 22000, mid_min: 22000, mid_max: 30000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'accountant', country: 'EL', junior_min: 15000, junior_max: 18000, mid_min: 18000, mid_max: 23000, senior_min: 22000, senior_max: 30000, lead_min: 27000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'nurse', country: 'EL', junior_min: 13000, junior_max: 16000, mid_min: 15000, mid_max: 19000, senior_min: 18000, senior_max: 23000, lead_min: 21000, lead_max: 29000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'doctor', country: 'EL', junior_min: 23000, junior_max: 30000, mid_min: 30000, mid_max: 42000, senior_min: 40000, senior_max: 61000, lead_min: 50000, lead_max: 84000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'teacher', country: 'EL', junior_min: 18000, junior_max: 23000, mid_min: 22000, mid_max: 27000, senior_min: 25000, senior_max: 33000, lead_min: 29000, lead_max: 38000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'lawyer', country: 'EL', junior_min: 20000, junior_max: 27000, mid_min: 27000, mid_max: 40000, senior_min: 36000, senior_max: 57000, lead_min: 46000, lead_max: 76000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'marketing-manager', country: 'EL', junior_min: 15000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'sales-manager', country: 'EL', junior_min: 16000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'hr-manager', country: 'EL', junior_min: 16000, junior_max: 20000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'project-manager', country: 'EL', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 32000, senior_min: 30000, senior_max: 41000, lead_min: 37000, lead_max: 52000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'mechanical-engineer', country: 'EL', junior_min: 18000, junior_max: 22000, mid_min: 22000, mid_max: 29000, senior_min: 27000, senior_max: 37000, lead_min: 34000, lead_max: 48000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'civil-engineer', country: 'EL', junior_min: 17000, junior_max: 21000, mid_min: 20000, mid_max: 27000, senior_min: 26000, senior_max: 36000, lead_min: 33000, lead_max: 46000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'graphic-designer', country: 'EL', junior_min: 12000, junior_max: 15000, mid_min: 15000, mid_max: 20000, senior_min: 19000, senior_max: 26000, lead_min: 23000, lead_max: 33000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'customer-service-rep', country: 'EL', junior_min: 11000, junior_max: 13000, mid_min: 13000, mid_max: 16000, senior_min: 15000, senior_max: 19000, lead_min: 18000, lead_max: 23000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'logistics-manager', country: 'EL', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 25000, senior_min: 24000, senior_max: 33000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'operations-manager', country: 'EL', junior_min: 18000, junior_max: 23000, mid_min: 23000, mid_max: 30000, senior_min: 29000, senior_max: 40000, lead_min: 36000, lead_max: 50000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'business-analyst', country: 'EL', junior_min: 17000, junior_max: 21000, mid_min: 21000, mid_max: 29000, senior_min: 27000, senior_max: 37000, lead_min: 34000, lead_max: 47000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'pharmacist', country: 'EL', junior_min: 18000, junior_max: 22000, mid_min: 21000, mid_max: 27000, senior_min: 26000, senior_max: 34000, lead_min: 32000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'devops-engineer', country: 'EL', junior_min: 19000, junior_max: 25000, mid_min: 24000, mid_max: 34000, senior_min: 33000, senior_max: 45000, lead_min: 40000, lead_max: 57000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'ux-designer', country: 'EL', junior_min: 15000, junior_max: 19000, mid_min: 19000, mid_max: 26000, senior_min: 24000, senior_max: 34000, lead_min: 30000, lead_max: 42000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
  { job: 'university-professor', country: 'EL', junior_min: 22000, junior_max: 27000, mid_min: 27000, mid_max: 36000, senior_min: 34000, senior_max: 46000, lead_min: 40000, lead_max: 59000, currency: 'EUR', gross: true, source: 'eurostat', year: 2026 },
];
