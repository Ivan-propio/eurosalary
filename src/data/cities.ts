// ============================================
// City salary data and localized slugs
// Used by getStaticPaths() in city/[city].astro
// Extracted to separate file so Astro's compiler
// includes it in the module scope for getStaticPaths
// ============================================

export interface CityInfo {
  country: string;
  avgSalary: number;
  costIndex: number;
  rentIndex: number;
  techSalary: number;
  population: string;
}

export const cityData: Record<string, CityInfo> = {
  'berlin': { country: 'DE', avgSalary: 50000, costIndex: 70.2, rentIndex: 32.5, techSalary: 62000, population: '3.7M' },
  'munich': { country: 'DE', avgSalary: 60000, costIndex: 80.1, rentIndex: 42.3, techSalary: 72000, population: '1.5M' },
  'hamburg': { country: 'DE', avgSalary: 52000, costIndex: 72.5, rentIndex: 33.1, techSalary: 63000, population: '1.9M' },
  'paris': { country: 'FR', avgSalary: 52000, costIndex: 82.3, rentIndex: 45.2, techSalary: 60000, population: '2.2M' },
  'lyon': { country: 'FR', avgSalary: 40000, costIndex: 62.1, rentIndex: 25.3, techSalary: 48000, population: '0.5M' },
  'madrid': { country: 'ES', avgSalary: 35000, costIndex: 55.8, rentIndex: 28.4, techSalary: 42000, population: '3.3M' },
  'barcelona': { country: 'ES', avgSalary: 34000, costIndex: 58.2, rentIndex: 30.1, techSalary: 41000, population: '1.6M' },
  'amsterdam': { country: 'NL', avgSalary: 56000, costIndex: 78.5, rentIndex: 42.8, techSalary: 68000, population: '0.9M' },
  'rotterdam': { country: 'NL', avgSalary: 48000, costIndex: 68.3, rentIndex: 30.2, techSalary: 58000, population: '0.65M' },
  'brussels': { country: 'BE', avgSalary: 50000, costIndex: 68.7, rentIndex: 30.5, techSalary: 58000, population: '1.2M' },
  'rome': { country: 'IT', avgSalary: 35000, costIndex: 62.5, rentIndex: 28.7, techSalary: 40000, population: '2.9M' },
  'milan': { country: 'IT', avgSalary: 42000, costIndex: 72.8, rentIndex: 38.5, techSalary: 50000, population: '1.4M' },
  'lisbon': { country: 'PT', avgSalary: 28000, costIndex: 52.3, rentIndex: 28.9, techSalary: 35000, population: '0.5M' },
  'porto': { country: 'PT', avgSalary: 24000, costIndex: 45.8, rentIndex: 20.1, techSalary: 30000, population: '0.23M' },
  'warsaw': { country: 'PL', avgSalary: 28000, costIndex: 42.5, rentIndex: 22.3, techSalary: 38000, population: '1.8M' },
  'krakow': { country: 'PL', avgSalary: 24000, costIndex: 38.2, rentIndex: 18.5, techSalary: 34000, population: '0.78M' },
  'stockholm': { country: 'SE', avgSalary: 54000, costIndex: 78.2, rentIndex: 38.5, techSalary: 65000, population: '1.0M' },
  'vienna': { country: 'AT', avgSalary: 52000, costIndex: 70.5, rentIndex: 32.8, techSalary: 60000, population: '1.9M' },
  'zurich': { country: 'CH', avgSalary: 105000, costIndex: 131.5, rentIndex: 62.3, techSalary: 120000, population: '0.43M' },
  'geneva': { country: 'CH', avgSalary: 100000, costIndex: 128.2, rentIndex: 58.7, techSalary: 115000, population: '0.2M' },
  'luxembourg-city': { country: 'LU', avgSalary: 72000, costIndex: 85.3, rentIndex: 48.2, techSalary: 82000, population: '0.13M' },
  'dublin': { country: 'IE', avgSalary: 58000, costIndex: 78.5, rentIndex: 48.5, techSalary: 72000, population: '1.4M' },
  'copenhagen': { country: 'DK', avgSalary: 60000, costIndex: 88.2, rentIndex: 42.1, techSalary: 70000, population: '0.8M' },
  'helsinki': { country: 'FI', avgSalary: 46000, costIndex: 72.8, rentIndex: 30.5, techSalary: 55000, population: '0.66M' },
};

export const citySlugs: Record<string, Record<string, string>> = {
  'berlin': { en: 'berlin', fr: 'berlin', de: 'berlin', es: 'berlin' },
  'munich': { en: 'munich', fr: 'munich', de: 'muenchen', es: 'munich' },
  'hamburg': { en: 'hamburg', fr: 'hambourg', de: 'hamburg', es: 'hamburgo' },
  'paris': { en: 'paris', fr: 'paris', de: 'paris', es: 'paris' },
  'lyon': { en: 'lyon', fr: 'lyon', de: 'lyon', es: 'lyon' },
  'madrid': { en: 'madrid', fr: 'madrid', de: 'madrid', es: 'madrid' },
  'barcelona': { en: 'barcelona', fr: 'barcelone', de: 'barcelona', es: 'barcelona' },
  'amsterdam': { en: 'amsterdam', fr: 'amsterdam', de: 'amsterdam', es: 'amsterdam' },
  'rotterdam': { en: 'rotterdam', fr: 'rotterdam', de: 'rotterdam', es: 'rotterdam' },
  'brussels': { en: 'brussels', fr: 'bruxelles', de: 'bruessel', es: 'bruselas' },
  'rome': { en: 'rome', fr: 'rome', de: 'rom', es: 'roma' },
  'milan': { en: 'milan', fr: 'milan', de: 'mailand', es: 'milan' },
  'lisbon': { en: 'lisbon', fr: 'lisbonne', de: 'lissabon', es: 'lisboa' },
  'porto': { en: 'porto', fr: 'porto', de: 'porto', es: 'oporto' },
  'warsaw': { en: 'warsaw', fr: 'varsovie', de: 'warschau', es: 'varsovia' },
  'krakow': { en: 'krakow', fr: 'cracovie', de: 'krakau', es: 'cracovia' },
  'stockholm': { en: 'stockholm', fr: 'stockholm', de: 'stockholm', es: 'estocolmo' },
  'vienna': { en: 'vienna', fr: 'vienne', de: 'wien', es: 'viena' },
  'zurich': { en: 'zurich', fr: 'zurich', de: 'zuerich', es: 'zurich' },
  'geneva': { en: 'geneva', fr: 'geneve', de: 'genf', es: 'ginebra' },
  'luxembourg-city': { en: 'luxembourg-city', fr: 'ville-de-luxembourg', de: 'luxemburg-stadt', es: 'ciudad-de-luxemburgo' },
  'dublin': { en: 'dublin', fr: 'dublin', de: 'dublin', es: 'dublin' },
  'copenhagen': { en: 'copenhagen', fr: 'copenhague', de: 'kopenhagen', es: 'copenhague' },
  'helsinki': { en: 'helsinki', fr: 'helsinki', de: 'helsinki', es: 'helsinki' },
};

export const cityDisplayNames: Record<string, Record<string, string>> = {
  'berlin': { en: 'Berlin', fr: 'Berlin', de: 'Berlin', es: 'Berlin' },
  'munich': { en: 'Munich', fr: 'Munich', de: 'München', es: 'Múnich' },
  'hamburg': { en: 'Hamburg', fr: 'Hambourg', de: 'Hamburg', es: 'Hamburgo' },
  'paris': { en: 'Paris', fr: 'Paris', de: 'Paris', es: 'París' },
  'lyon': { en: 'Lyon', fr: 'Lyon', de: 'Lyon', es: 'Lyon' },
  'madrid': { en: 'Madrid', fr: 'Madrid', de: 'Madrid', es: 'Madrid' },
  'barcelona': { en: 'Barcelona', fr: 'Barcelone', de: 'Barcelona', es: 'Barcelona' },
  'amsterdam': { en: 'Amsterdam', fr: 'Amsterdam', de: 'Amsterdam', es: 'Ámsterdam' },
  'rotterdam': { en: 'Rotterdam', fr: 'Rotterdam', de: 'Rotterdam', es: 'Róterdam' },
  'brussels': { en: 'Brussels', fr: 'Bruxelles', de: 'Brüssel', es: 'Bruselas' },
  'rome': { en: 'Rome', fr: 'Rome', de: 'Rom', es: 'Roma' },
  'milan': { en: 'Milan', fr: 'Milan', de: 'Mailand', es: 'Milán' },
  'lisbon': { en: 'Lisbon', fr: 'Lisbonne', de: 'Lissabon', es: 'Lisboa' },
  'porto': { en: 'Porto', fr: 'Porto', de: 'Porto', es: 'Oporto' },
  'warsaw': { en: 'Warsaw', fr: 'Varsovie', de: 'Warschau', es: 'Varsovia' },
  'krakow': { en: 'Krakow', fr: 'Cracovie', de: 'Krakau', es: 'Cracovia' },
  'stockholm': { en: 'Stockholm', fr: 'Stockholm', de: 'Stockholm', es: 'Estocolmo' },
  'vienna': { en: 'Vienna', fr: 'Vienne', de: 'Wien', es: 'Viena' },
  'zurich': { en: 'Zurich', fr: 'Zurich', de: 'Zürich', es: 'Zúrich' },
  'geneva': { en: 'Geneva', fr: 'Genève', de: 'Genf', es: 'Ginebra' },
  'luxembourg-city': { en: 'Luxembourg City', fr: 'Ville de Luxembourg', de: 'Luxemburg-Stadt', es: 'Ciudad de Luxemburgo' },
  'dublin': { en: 'Dublin', fr: 'Dublin', de: 'Dublin', es: 'Dublín' },
  'copenhagen': { en: 'Copenhagen', fr: 'Copenhague', de: 'Kopenhagen', es: 'Copenhague' },
  'helsinki': { en: 'Helsinki', fr: 'Helsinki', de: 'Helsinki', es: 'Helsinki' },
};
