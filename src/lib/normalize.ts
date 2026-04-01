// ============================================
// EuroSalary.eu — Job Title Normalization
// Uses Claude Haiku API to map messy job titles
// to standard slugs. Caches results in Supabase.
// ============================================

import { supabase } from './supabase';

const ANTHROPIC_API_KEY = import.meta.env.ANTHROPIC_API_KEY;
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';

// Standard job slugs in our database
const STANDARD_JOBS = [
  'software-engineer',
  'product-manager',
  'data-analyst',
  'financial-analyst',
  'accountant',
  'nurse',
  'doctor',
  'teacher',
  'lawyer',
  'marketing-manager',
  'sales-manager',
  'hr-manager',
  'project-manager',
  'mechanical-engineer',
  'civil-engineer',
  'graphic-designer',
  'customer-service-rep',
  'logistics-manager',
  'operations-manager',
  'business-analyst',
  'data-scientist',
  'ux-designer',
  'devops-engineer',
  'pharmacist',
  'university-professor',
] as const;

export type StandardJobSlug = (typeof STANDARD_JOBS)[number];

interface NormalizationCache {
  raw_title: string;
  normalized_slug: string;
  confidence: number;
  created_at: string;
}

/**
 * Normalize a raw job title to a standard slug.
 * First checks Supabase cache, then calls Claude Haiku.
 *
 * Examples:
 *   "Sr. Software Dev" → "software-engineer"
 *   "Développeur Backend" → "software-engineer"
 *   "Krankenschwester" → "nurse"
 *   "Chef de Projet Digital" → "project-manager"
 */
export async function normalizeJobTitle(rawTitle: string): Promise<{
  slug: StandardJobSlug;
  confidence: number;
}> {
  const normalized = rawTitle.trim().toLowerCase();

  // 1. Check cache first
  const cached = await getCachedNormalization(normalized);
  if (cached) {
    return {
      slug: cached.normalized_slug as StandardJobSlug,
      confidence: cached.confidence,
    };
  }

  // 2. Try exact/fuzzy match before calling API
  const localMatch = localNormalize(normalized);
  if (localMatch) {
    await cacheNormalization(normalized, localMatch.slug, localMatch.confidence);
    return localMatch;
  }

  // 3. Call Claude Haiku for complex normalization
  const aiResult = await callClaudeForNormalization(rawTitle);

  // 4. Cache the result
  await cacheNormalization(normalized, aiResult.slug, aiResult.confidence);

  return aiResult;
}

/**
 * Local normalization — handles obvious matches without API calls
 */
function localNormalize(title: string): { slug: StandardJobSlug; confidence: number } | null {
  const mappings: Record<string, StandardJobSlug> = {
    // English
    'software engineer': 'software-engineer',
    'software developer': 'software-engineer',
    'backend developer': 'software-engineer',
    'frontend developer': 'software-engineer',
    'full stack developer': 'software-engineer',
    'fullstack developer': 'software-engineer',
    'web developer': 'software-engineer',
    'product manager': 'product-manager',
    'data analyst': 'data-analyst',
    'data scientist': 'data-scientist',
    'financial analyst': 'financial-analyst',
    'accountant': 'accountant',
    'nurse': 'nurse',
    'registered nurse': 'nurse',
    'doctor': 'doctor',
    'physician': 'doctor',
    'general practitioner': 'doctor',
    'teacher': 'teacher',
    'lawyer': 'lawyer',
    'attorney': 'lawyer',
    'marketing manager': 'marketing-manager',
    'sales manager': 'sales-manager',
    'hr manager': 'hr-manager',
    'human resources manager': 'hr-manager',
    'project manager': 'project-manager',
    'mechanical engineer': 'mechanical-engineer',
    'civil engineer': 'civil-engineer',
    'graphic designer': 'graphic-designer',
    'ux designer': 'ux-designer',
    'ui designer': 'ux-designer',
    'ui/ux designer': 'ux-designer',
    'devops engineer': 'devops-engineer',
    'pharmacist': 'pharmacist',
    'professor': 'university-professor',

    // French
    'ingénieur logiciel': 'software-engineer',
    'développeur': 'software-engineer',
    'développeur backend': 'software-engineer',
    'développeur frontend': 'software-engineer',
    'chef de produit': 'product-manager',
    'analyste de données': 'data-analyst',
    'analyste financier': 'financial-analyst',
    'comptable': 'accountant',
    'infirmier': 'nurse',
    'infirmière': 'nurse',
    'médecin': 'doctor',
    'enseignant': 'teacher',
    'professeur': 'teacher',
    'avocat': 'lawyer',
    'directeur marketing': 'marketing-manager',
    'directeur commercial': 'sales-manager',
    'responsable rh': 'hr-manager',
    'chef de projet': 'project-manager',
    'ingénieur mécanique': 'mechanical-engineer',
    'ingénieur civil': 'civil-engineer',
    'graphiste': 'graphic-designer',
    'pharmacien': 'pharmacist',

    // German
    'softwareentwickler': 'software-engineer',
    'softwareingenier': 'software-engineer',
    'produktmanager': 'product-manager',
    'datenanalyst': 'data-analyst',
    'finanzanalyst': 'financial-analyst',
    'buchhalter': 'accountant',
    'krankenpfleger': 'nurse',
    'krankenschwester': 'nurse',
    'arzt': 'doctor',
    'lehrer': 'teacher',
    'rechtsanwalt': 'lawyer',
    'marketingmanager': 'marketing-manager',
    'vertriebsleiter': 'sales-manager',
    'personalleiter': 'hr-manager',
    'projektmanager': 'project-manager',
    'maschinenbauingenieur': 'mechanical-engineer',
    'bauingenieur': 'civil-engineer',
    'grafikdesigner': 'graphic-designer',
    'apotheker': 'pharmacist',

    // Spanish
    'ingeniero de software': 'software-engineer',
    'desarrollador': 'software-engineer',
    'desarrollador de software': 'software-engineer',
    'analista de datos': 'data-analyst',
    'analista financiero': 'financial-analyst',
    'contable': 'accountant',
    'enfermero': 'nurse',
    'enfermera': 'nurse',
    'médico': 'doctor',
    'profesor': 'teacher',
    'abogado': 'lawyer',
    'director de marketing': 'marketing-manager',
    'director de ventas': 'sales-manager',
    'director de rrhh': 'hr-manager',
    'director de proyecto': 'project-manager',
    'ingeniero mecánico': 'mechanical-engineer',
    'ingeniero civil': 'civil-engineer',
    'diseñador gráfico': 'graphic-designer',
    'farmacéutico': 'pharmacist',
  };

  const match = mappings[title];
  if (match) return { slug: match, confidence: 0.95 };

  // Partial match
  for (const [key, slug] of Object.entries(mappings)) {
    if (title.includes(key) || key.includes(title)) {
      return { slug, confidence: 0.8 };
    }
  }

  return null;
}

/**
 * Call Claude Haiku API for normalization
 */
async function callClaudeForNormalization(rawTitle: string): Promise<{
  slug: StandardJobSlug;
  confidence: number;
}> {
  if (!ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY not set. Falling back to best-guess normalization.');
    return { slug: 'software-engineer', confidence: 0.1 };
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: `Map this job title to the closest standard slug from this list: ${STANDARD_JOBS.join(', ')}

Job title: "${rawTitle}"

Respond with ONLY a JSON object: {"slug": "the-slug", "confidence": 0.0-1.0}
No explanation. Just the JSON.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error(`Claude API error: ${response.status}`);
    return { slug: 'software-engineer', confidence: 0.1 };
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || '';

  try {
    const parsed = JSON.parse(text);
    if (STANDARD_JOBS.includes(parsed.slug)) {
      return {
        slug: parsed.slug as StandardJobSlug,
        confidence: Math.min(Math.max(parsed.confidence || 0.7, 0), 1),
      };
    }
  } catch {
    console.error('Failed to parse Claude response:', text);
  }

  return { slug: 'software-engineer', confidence: 0.1 };
}

/**
 * Check Supabase cache for a previously normalized title
 */
async function getCachedNormalization(title: string): Promise<NormalizationCache | null> {
  try {
    const { data, error } = await supabase
      .from('job_title_cache')
      .select('*')
      .eq('raw_title', title)
      .single();

    if (error || !data) return null;
    return data as NormalizationCache;
  } catch {
    return null;
  }
}

/**
 * Cache normalization result in Supabase
 */
async function cacheNormalization(rawTitle: string, slug: string, confidence: number): Promise<void> {
  try {
    await supabase
      .from('job_title_cache')
      .upsert({
        raw_title: rawTitle,
        normalized_slug: slug,
        confidence,
      }, { onConflict: 'raw_title' });
  } catch (error) {
    console.error('Failed to cache normalization:', error);
  }
}
