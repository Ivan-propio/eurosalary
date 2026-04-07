"""
AEO (Answer Engine Optimization) bulk fix script.
Adds speakable schema, Dataset schemas, and enhances Article schemas
across ALL content page types.

Targets:
1. salary/[country]/[job].astro — add speakable to Article schema
2. country/[country].astro — add Dataset + speakable to Article schema
3. compare/[job].astro — add speakable + Dataset schema
4. minimum-wage/[country].astro — add speakable + Dataset schema
5. BaseLayout.astro — improve BreadcrumbList with proper labels
6. blog/[slug].astro — add speakable
7. city/[city].astro — add speakable + Dataset
"""

import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(BASE, 'src', 'pages', '[lang]')

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fixes_applied = []

# =============================================================================
# 1. SALARY PAGES — Add speakable to Article schema
# =============================================================================
salary_path = os.path.join(PAGES, 'salary', '[country]', '[job].astro')
if os.path.exists(salary_path):
    content = read_file(salary_path)

    # Add speakable to Article schema
    old = """    '@type': 'Article',
    headline: fb(titles, lang),
    author: { '@type': 'Organization', name: 'EuroSalary.eu' },
    datePublished: '2026-01-15',
    dateModified: '2026-04-04',
    publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },"""

    new = """    '@type': 'Article',
    headline: fb(titles, lang),
    author: { '@type': 'Organization', name: 'EuroSalary.eu' },
    datePublished: '2026-01-15',
    dateModified: '2026-04-07',
    publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    image: `https://eurosalary.eu/flags/${countryCode.toLowerCase()}.svg`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.salary-hero__answer', '.faq-item'],
    },"""

    if old in content:
        content = content.replace(old, new)
        write_file(salary_path, content)
        fixes_applied.append('salary/[country]/[job].astro: Added speakable + image to Article schema')
    else:
        fixes_applied.append('salary/[country]/[job].astro: SKIPPED (pattern not found)')

# =============================================================================
# 2. COUNTRY PAGES — Add Dataset schema + speakable to Article
# =============================================================================
country_path = os.path.join(PAGES, 'country', '[country].astro')
if os.path.exists(country_path):
    content = read_file(country_path)

    # Replace the entire pageSchema block to add Dataset + speakable
    old_schema = """const pageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    author: { '@type': 'Organization', name: 'EuroSalary.eu' },
    datePublished: '2026-01-15',
    dateModified: '2026-04-01',
    publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
  },
];"""

    new_schema = """const pageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: pageDescription,
    author: { '@type': 'Organization', name: 'EuroSalary.eu' },
    datePublished: '2026-01-15',
    dateModified: '2026-04-07',
    publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.country-hero__desc', '.faq-item'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Salary Data for ${countryName} ${new Date().getFullYear()}`,
    description: pageDescription,
    url: `https://eurosalary.eu/${lang}/country/${countrySlug}/`,
    creator: { '@type': 'Organization', name: 'EuroSalary.eu' },
    temporalCoverage: '2025/2026',
    spatialCoverage: { '@type': 'Place', name: countryName },
    variableMeasured: [
      'Average annual gross salary in EUR',
      'Minimum wage',
      'Income tax rate',
      'Cost of living index',
    ],
  },
];"""

    if old_schema in content:
        content = content.replace(old_schema, new_schema)
        write_file(country_path, content)
        fixes_applied.append('country/[country].astro: Added Dataset schema + speakable to Article')
    else:
        fixes_applied.append('country/[country].astro: SKIPPED (pattern not found)')

# =============================================================================
# 3. COMPARE/[JOB] PAGES — Add speakable + Dataset
# =============================================================================
compare_job_path = os.path.join(PAGES, 'compare', '[job].astro')
if os.path.exists(compare_job_path):
    content = read_file(compare_job_path)

    old_compare = """const pageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: pageDescription,
    author: { '@type': 'Organization', name: 'EuroSalary.eu' },
    datePublished: '2026-01-15',
    dateModified: '2026-04-01',
    publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    about: {
      '@type': 'Occupation',
      name: jobName,
      estimatedSalary: rows.slice(0, 5).map((r) => ({
        '@type': 'MonetaryAmountDistribution',
        name: `${jobName} in ${countryNames[r.code]?.en}`,
        currency: 'EUR',
        median: r.mid,
        percentile10: r.junior,
        percentile90: r.senior,
      })),
    },
  },
];"""

    new_compare = """const pageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: pageDescription,
    author: { '@type': 'Organization', name: 'EuroSalary.eu' },
    datePublished: '2026-01-15',
    dateModified: '2026-04-07',
    publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.page-hero__desc', '.faq-item'],
    },
    about: {
      '@type': 'Occupation',
      name: jobName,
      estimatedSalary: rows.slice(0, 5).map((r) => ({
        '@type': 'MonetaryAmountDistribution',
        name: `${jobName} in ${countryNames[r.code]?.en}`,
        currency: 'EUR',
        median: r.mid,
        percentile10: r.junior,
        percentile90: r.senior,
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${jobName} Salary Comparison Across Europe ${new Date().getFullYear()}`,
    description: pageDescription,
    url: `https://eurosalary.eu/${lang}/compare/${jobSlug}/`,
    creator: { '@type': 'Organization', name: 'EuroSalary.eu' },
    temporalCoverage: '2025/2026',
    spatialCoverage: { '@type': 'Place', name: 'European Union' },
    variableMeasured: 'Annual gross salary in EUR by country and seniority level',
  },
];"""

    if old_compare in content:
        content = content.replace(old_compare, new_compare)
        write_file(compare_job_path, content)
        fixes_applied.append('compare/[job].astro: Added speakable + Dataset schema')
    else:
        fixes_applied.append('compare/[job].astro: SKIPPED (pattern not found)')

# =============================================================================
# 4. MINIMUM WAGE PAGES — Add speakable + Dataset
# =============================================================================
minwage_path = os.path.join(PAGES, 'minimum-wage', '[country].astro')
if os.path.exists(minwage_path):
    content = read_file(minwage_path)

    # Find the pageSchema pattern in minimum wage pages
    # Look for the Article schema and add speakable + Dataset
    schema_pattern = re.compile(
        r"(const pageSchema = \[\s*\{[^}]*'@type': 'Article'[^}]*\},?\s*)\];",
        re.DOTALL
    )
    match = schema_pattern.search(content)
    if match:
        old_block = match.group(0)
        # Add speakable to existing Article and add Dataset
        new_block = old_block.replace(
            "dateModified: '2026-04-01'",
            "dateModified: '2026-04-07'"
        ).replace(
            "dateModified: '2026-04-04'",
            "dateModified: '2026-04-07'"
        )
        # Insert speakable before the closing of Article and add Dataset
        new_block = new_block.rstrip('];')
        # Add speakable property to Article
        new_block = new_block.rstrip().rstrip(',').rstrip('}')
        new_block += """,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.minwage-hero__desc', '.faq-item'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Minimum Wage Data for ${'{'}countryName{'}'} ${'{'}new Date().getFullYear(){'}'}`,
    description: pageDescription,
    url: `https://eurosalary.eu/${'{'} lang ${'}'}/minimum-wage/${'{'} countrySlug ${'}'}/`,
    creator: { '@type': 'Organization', name: 'EuroSalary.eu' },
    temporalCoverage: '2015/2026',
    spatialCoverage: { '@type': 'Place', name: countryName },
    variableMeasured: ['Hourly minimum wage in EUR', 'Monthly minimum wage in EUR', 'Annual minimum wage in EUR'],
  },
];"""
        content = content.replace(old_block, new_block)
        write_file(minwage_path, content)
        fixes_applied.append('minimum-wage/[country].astro: Added speakable + Dataset schema (regex)')
    else:
        fixes_applied.append('minimum-wage/[country].astro: SKIPPED (no schema pattern found)')

# =============================================================================
# 5. BLOG PAGES — Add speakable
# =============================================================================
blog_slug_path = os.path.join(PAGES, 'blog', '[slug].astro')
if os.path.exists(blog_slug_path):
    content = read_file(blog_slug_path)

    if 'speakable' not in content and "'@type': 'Article'" in content:
        # Add speakable to the Article schema
        content = content.replace(
            "publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },",
            """publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.blog-post__intro', '.faq-item'],
    },""",
            1  # only first occurrence
        )
        write_file(blog_slug_path, content)
        fixes_applied.append('blog/[slug].astro: Added speakable to Article schema')
    else:
        fixes_applied.append('blog/[slug].astro: SKIPPED (already has speakable or no Article)')

# =============================================================================
# 6. CITY PAGES — Add speakable + Dataset
# =============================================================================
city_path = os.path.join(PAGES, 'city', '[city].astro')
if os.path.exists(city_path):
    content = read_file(city_path)

    if 'speakable' not in content and "'@type': 'Article'" in content:
        content = content.replace(
            "publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },",
            """publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.city-hero__desc', '.faq-item'],
    },""",
            1
        )
        write_file(city_path, content)
        fixes_applied.append('city/[city].astro: Added speakable to Article schema')
    else:
        fixes_applied.append('city/[city].astro: SKIPPED')

# =============================================================================
# 7. COMPARE/COUNTRY/[PAIR] — Add speakable
# =============================================================================
pair_path = os.path.join(PAGES, 'compare', 'country', '[pair].astro')
if os.path.exists(pair_path):
    content = read_file(pair_path)

    if 'speakable' not in content and "'@type': 'Article'" in content:
        content = content.replace(
            "publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },",
            """publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.compare-hero__desc', '.faq-item'],
    },""",
            1
        )
        write_file(pair_path, content)
        fixes_applied.append('compare/country/[pair].astro: Added speakable')
    else:
        fixes_applied.append('compare/country/[pair].astro: SKIPPED')

# =============================================================================
# 8. SALARY TRANSPARENCY PAGES — Add speakable
# =============================================================================
transp_path = os.path.join(PAGES, 'salary-transparency', 'index.astro')
if os.path.exists(transp_path):
    content = read_file(transp_path)
    if 'speakable' not in content and "'@type': 'Article'" in content:
        content = content.replace(
            "publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },",
            """publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.page-hero__desc', '.faq-item'],
    },""",
            1
        )
        write_file(transp_path, content)
        fixes_applied.append('salary-transparency/index.astro: Added speakable')

transp_country = os.path.join(PAGES, 'salary-transparency', '[country].astro')
if os.path.exists(transp_country):
    content = read_file(transp_country)
    if 'speakable' not in content and "'@type': 'Article'" in content:
        content = content.replace(
            "publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },",
            """publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.page-hero__desc', '.faq-item'],
    },""",
            1
        )
        write_file(transp_country, content)
        fixes_applied.append('salary-transparency/[country].astro: Added speakable')

# =============================================================================
# 9. SECTORS PAGES — Add speakable
# =============================================================================
for sector_file in ['index.astro', '[sector].astro']:
    sector_path = os.path.join(PAGES, 'sectors', sector_file)
    if os.path.exists(sector_path):
        content = read_file(sector_path)
        if 'speakable' not in content and "'@type': 'Article'" in content:
            content = content.replace(
                "publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },",
                """publisher: { '@type': 'Organization', name: 'EuroSalary.eu', url: 'https://eurosalary.eu' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer', '.page-hero__desc', '.faq-item'],
    },""",
                1
            )
            write_file(sector_path, content)
            fixes_applied.append(f'sectors/{sector_file}: Added speakable')

# =============================================================================
# SUMMARY
# =============================================================================
print('\n=== AEO FIXES APPLIED ===')
for fix in fixes_applied:
    print(f'  [OK] {fix}')
print(f'\nTotal fixes: {len(fixes_applied)}')
