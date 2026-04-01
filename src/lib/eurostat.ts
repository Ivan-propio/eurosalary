// ============================================
// EuroSalary.eu — Eurostat API Client
// Fetches salary data from Eurostat REST API
// No API key needed — publicly available EU data
// ============================================

const BASE_URL = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data';

// Target countries (ISO 3166-1 alpha-2)
const COUNTRIES = ['DE', 'FR', 'ES', 'NL', 'BE', 'IT', 'PT', 'PL', 'SE', 'AT', 'CH', 'LU', 'IE', 'DK', 'FI'];

// NACE sector codes
const NACE_SECTORS = {
  'B-E': 'Industry',
  'F': 'Construction',
  'G-N': 'Services',
  'O-Q': 'Public Administration',
  'R-U': 'Arts & Other Services',
};

interface EurostatResponse {
  version: string;
  label: string;
  updated: string;
  id: string[];
  size: number[];
  dimension: Record<string, {
    label: string;
    category: {
      index: Record<string, number>;
      label: Record<string, string>;
    };
  }>;
  value: Record<string, number>;
}

/**
 * Fetch earnings by sector from Eurostat
 * Dataset: earn_ses_pub1s (Structure of Earnings Survey - public data)
 */
export async function fetchEarningsBySector(
  countries: string[] = COUNTRIES,
  year: string = '2022' // Latest available SES data
): Promise<EurostatResponse | null> {
  const geo = countries.join('+');
  const url = `${BASE_URL}/earn_ses_pub1s?geo=${geo}&time=${year}&nace_r2=B-E+F+G-N+O-Q+R-U&indic_se=MEAN_E_EUR&format=JSON&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Eurostat API error: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Eurostat data:', error);
    return null;
  }
}

/**
 * Fetch net earnings data
 * Dataset: earn_nt_net (net earnings)
 */
export async function fetchNetEarnings(
  countries: string[] = COUNTRIES,
  year: string = '2022'
): Promise<EurostatResponse | null> {
  const geo = countries.join('+');
  const url = `${BASE_URL}/earn_nt_net?geo=${geo}&time=${year}&estruct=NET_A_SINGLE&currency=EUR&format=JSON&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Eurostat API error: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Eurostat net earnings:', error);
    return null;
  }
}

/**
 * Fetch labour cost index
 * Dataset: lc_lci_r2 (Labour Cost Index)
 */
export async function fetchLabourCostIndex(
  countries: string[] = COUNTRIES,
  year: string = '2024'
): Promise<EurostatResponse | null> {
  const geo = countries.join('+');
  const url = `${BASE_URL}/lc_lci_r2?geo=${geo}&time=${year}&nace_r2=B-S&lcstruct=D1_D4_MD5&s_adj=NSA&unit=I20&format=JSON&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Eurostat API error: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Eurostat LCI:', error);
    return null;
  }
}

/**
 * Parse Eurostat response into structured salary data.
 * Eurostat uses a JSON-stat format with dimensional indexing.
 */
export function parseEurostatEarnings(data: EurostatResponse): Array<{
  country: string;
  sector: string;
  sectorLabel: string;
  meanEarnings: number;
  year: string;
}> {
  const results: Array<{
    country: string;
    sector: string;
    sectorLabel: string;
    meanEarnings: number;
    year: string;
  }> = [];

  if (!data?.dimension || !data?.value) return results;

  const geoDim = data.dimension.geo;
  const naceDim = data.dimension.nace_r2;
  const timeDim = data.dimension.time;

  if (!geoDim || !naceDim || !timeDim) return results;

  const geoKeys = Object.keys(geoDim.category.index);
  const naceKeys = Object.keys(naceDim.category.index);
  const timeKeys = Object.keys(timeDim.category.index);

  const geoSize = geoKeys.length;
  const naceSize = naceKeys.length;

  for (const geoKey of geoKeys) {
    for (const naceKey of naceKeys) {
      for (const timeKey of timeKeys) {
        const geoIdx = geoDim.category.index[geoKey];
        const naceIdx = naceDim.category.index[naceKey];
        const timeIdx = timeDim.category.index[timeKey];

        // JSON-stat index calculation
        const valueIdx = geoIdx * naceSize * timeKeys.length + naceIdx * timeKeys.length + timeIdx;
        const value = data.value[valueIdx.toString()];

        if (value !== undefined && value !== null) {
          results.push({
            country: geoKey,
            sector: naceKey,
            sectorLabel: naceDim.category.label[naceKey] || naceKey,
            meanEarnings: value,
            year: timeKey,
          });
        }
      }
    }
  }

  return results;
}

/**
 * Make.com webhook handler structure.
 * Call this endpoint monthly to refresh Eurostat data.
 *
 * Webhook URL format: https://hook.eu2.make.com/YOUR_WEBHOOK_ID
 *
 * Flow:
 * 1. Make.com triggers this webhook monthly (1st of month)
 * 2. Fetch latest Eurostat data
 * 3. Parse and transform
 * 4. Upsert into Supabase salary_data table
 */
export interface EurostatRefreshPayload {
  source: 'eurostat';
  datasets: ('earn_ses_pub1s' | 'earn_nt_net' | 'lc_lci_r2')[];
  countries: string[];
  triggered_at: string;
}

export function createRefreshPayload(): EurostatRefreshPayload {
  return {
    source: 'eurostat',
    datasets: ['earn_ses_pub1s', 'earn_nt_net', 'lc_lci_r2'],
    countries: COUNTRIES,
    triggered_at: new Date().toISOString(),
  };
}
