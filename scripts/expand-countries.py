"""
Expand EuroSalary from 15 to 27 EU countries.
Adds: CZ, RO, HU, BG, HR, SK, SI, LT, LV, EE, CY, MT, EL (Greece)
Note: CH (Switzerland) kept as EFTA bonus.

Updates:
1. src/data/slugs.ts — countrySlugsByLang (12 new × 24 langs)
2. src/i18n/translations.ts — countryNames (12 new × 24 langs)
3. All "15" → "27" text references across all files
"""

import os, re, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ============================================================
# NEW COUNTRIES: code → { lang: name } for all 24 languages
# ============================================================
NEW_COUNTRIES = {
    'CZ': {
        'en': 'Czech Republic', 'fr': 'Republique tcheque', 'de': 'Tschechien', 'es': 'Republica Checa',
        'it': 'Repubblica Ceca', 'pt': 'Republica Checa', 'nl': 'Tsjechie', 'pl': 'Czechy',
        'ro': 'Republica Ceha', 'cs': 'Cesko', 'sv': 'Tjeckien', 'da': 'Tjekkiet',
        'fi': 'Tsekin tasavalta', 'el': 'Τσεχια', 'hu': 'Csehorszag', 'sk': 'Cesko',
        'bg': 'Чехия', 'hr': 'Ceska', 'sl': 'Ceska', 'lt': 'Cekija',
        'lv': 'Cehija', 'et': 'Tsehhi', 'mt': 'Ir-Repubblika Ceka', 'ga': 'An tSeicia',
    },
    'RO': {
        'en': 'Romania', 'fr': 'Roumanie', 'de': 'Rumanien', 'es': 'Rumania',
        'it': 'Romania', 'pt': 'Romenia', 'nl': 'Roemenie', 'pl': 'Rumunia',
        'ro': 'Romania', 'cs': 'Rumunsko', 'sv': 'Rumanien', 'da': 'Rumaenien',
        'fi': 'Romania', 'el': 'Ρουμανια', 'hu': 'Romania', 'sk': 'Rumunsko',
        'bg': 'Румъния', 'hr': 'Rumunjska', 'sl': 'Romunija', 'lt': 'Rumunija',
        'lv': 'Rumānija', 'et': 'Rumeenia', 'mt': 'Ir-Rumanija', 'ga': 'An Romàin',
    },
    'HU': {
        'en': 'Hungary', 'fr': 'Hongrie', 'de': 'Ungarn', 'es': 'Hungria',
        'it': 'Ungheria', 'pt': 'Hungria', 'nl': 'Hongarije', 'pl': 'Wegry',
        'ro': 'Ungaria', 'cs': 'Madarsko', 'sv': 'Ungern', 'da': 'Ungarn',
        'fi': 'Unkari', 'el': 'Ουγγαρια', 'hu': 'Magyarorszag', 'sk': 'Madarsko',
        'bg': 'Унгария', 'hr': 'Madarska', 'sl': 'Madzarska', 'lt': 'Vengrija',
        'lv': 'Ungārija', 'et': 'Ungari', 'mt': 'L-Ungerija', 'ga': 'An Ungàir',
    },
    'BG': {
        'en': 'Bulgaria', 'fr': 'Bulgarie', 'de': 'Bulgarien', 'es': 'Bulgaria',
        'it': 'Bulgaria', 'pt': 'Bulgaria', 'nl': 'Bulgarije', 'pl': 'Bulgaria',
        'ro': 'Bulgaria', 'cs': 'Bulharsko', 'sv': 'Bulgarien', 'da': 'Bulgarien',
        'fi': 'Bulgaria', 'el': 'Βουλγαρια', 'hu': 'Bulgaria', 'sk': 'Bulharsko',
        'bg': 'България', 'hr': 'Bugarska', 'sl': 'Bolgarija', 'lt': 'Bulgarija',
        'lv': 'Bulgārija', 'et': 'Bulgaaria', 'mt': 'Il-Bulgarija', 'ga': 'An Bhulgàir',
    },
    'HR': {
        'en': 'Croatia', 'fr': 'Croatie', 'de': 'Kroatien', 'es': 'Croacia',
        'it': 'Croazia', 'pt': 'Croacia', 'nl': 'Kroatie', 'pl': 'Chorwacja',
        'ro': 'Croatia', 'cs': 'Chorvatsko', 'sv': 'Kroatien', 'da': 'Kroatien',
        'fi': 'Kroatia', 'el': 'Κροατια', 'hu': 'Horvatorszag', 'sk': 'Chorvatsko',
        'bg': 'Хърватия', 'hr': 'Hrvatska', 'sl': 'Hrvaska', 'lt': 'Kroatija',
        'lv': 'Horvātija', 'et': 'Horvaatia', 'mt': 'Il-Kroazja', 'ga': 'An Chroàit',
    },
    'SK': {
        'en': 'Slovakia', 'fr': 'Slovaquie', 'de': 'Slowakei', 'es': 'Eslovaquia',
        'it': 'Slovacchia', 'pt': 'Eslovaquia', 'nl': 'Slowakije', 'pl': 'Slowacja',
        'ro': 'Slovacia', 'cs': 'Slovensko', 'sv': 'Slovakien', 'da': 'Slovakiet',
        'fi': 'Slovakia', 'el': 'Σλοβακια', 'hu': 'Szlovakia', 'sk': 'Slovensko',
        'bg': 'Словакия', 'hr': 'Slovacka', 'sl': 'Slovaska', 'lt': 'Slovakija',
        'lv': 'Slovākija', 'et': 'Slovakkia', 'mt': 'Is-Slovakkja', 'ga': 'An tSlòvaic',
    },
    'SI': {
        'en': 'Slovenia', 'fr': 'Slovenie', 'de': 'Slowenien', 'es': 'Eslovenia',
        'it': 'Slovenia', 'pt': 'Eslovenia', 'nl': 'Slovenie', 'pl': 'Slowenia',
        'ro': 'Slovenia', 'cs': 'Slovinsko', 'sv': 'Slovenien', 'da': 'Slovenien',
        'fi': 'Slovenia', 'el': 'Σλοβενια', 'hu': 'Szlovenia', 'sk': 'Slovinsko',
        'bg': 'Словения', 'hr': 'Slovenija', 'sl': 'Slovenija', 'lt': 'Slovenija',
        'lv': 'Slovēnija', 'et': 'Sloveenia', 'mt': 'Is-Slovenja', 'ga': 'An tSlòivein',
    },
    'LT': {
        'en': 'Lithuania', 'fr': 'Lituanie', 'de': 'Litauen', 'es': 'Lituania',
        'it': 'Lituania', 'pt': 'Lituania', 'nl': 'Litouwen', 'pl': 'Litwa',
        'ro': 'Lituania', 'cs': 'Litva', 'sv': 'Litauen', 'da': 'Litauen',
        'fi': 'Liettua', 'el': 'Λιθουανια', 'hu': 'Litvania', 'sk': 'Litva',
        'bg': 'Литва', 'hr': 'Litva', 'sl': 'Litva', 'lt': 'Lietuva',
        'lv': 'Lietuva', 'et': 'Leedu', 'mt': 'Il-Litwanja', 'ga': 'An Liotuàin',
    },
    'LV': {
        'en': 'Latvia', 'fr': 'Lettonie', 'de': 'Lettland', 'es': 'Letonia',
        'it': 'Lettonia', 'pt': 'Letonia', 'nl': 'Letland', 'pl': 'Lotwa',
        'ro': 'Letonia', 'cs': 'Lotyssko', 'sv': 'Lettland', 'da': 'Letland',
        'fi': 'Latvia', 'el': 'Λετονια', 'hu': 'Lettorszag', 'sk': 'Lotyssko',
        'bg': 'Латвия', 'hr': 'Latvija', 'sl': 'Latvija', 'lt': 'Latvija',
        'lv': 'Latvija', 'et': 'Lati', 'mt': 'Il-Latvja', 'ga': 'An Laitvia',
    },
    'EE': {
        'en': 'Estonia', 'fr': 'Estonie', 'de': 'Estland', 'es': 'Estonia',
        'it': 'Estonia', 'pt': 'Estonia', 'nl': 'Estland', 'pl': 'Estonia',
        'ro': 'Estonia', 'cs': 'Estonsko', 'sv': 'Estland', 'da': 'Estland',
        'fi': 'Viro', 'el': 'Εσθονια', 'hu': 'Esztorszag', 'sk': 'Estonsko',
        'bg': 'Естония', 'hr': 'Estonija', 'sl': 'Estonija', 'lt': 'Estija',
        'lv': 'Igaunija', 'et': 'Eesti', 'mt': 'L-Estonja', 'ga': 'An Eastòin',
    },
    'CY': {
        'en': 'Cyprus', 'fr': 'Chypre', 'de': 'Zypern', 'es': 'Chipre',
        'it': 'Cipro', 'pt': 'Chipre', 'nl': 'Cyprus', 'pl': 'Cypr',
        'ro': 'Cipru', 'cs': 'Kypr', 'sv': 'Cypern', 'da': 'Cypern',
        'fi': 'Kypros', 'el': 'Κυπρος', 'hu': 'Ciprus', 'sk': 'Cyprus',
        'bg': 'Кипър', 'hr': 'Cipar', 'sl': 'Ciper', 'lt': 'Kipras',
        'lv': 'Kipra', 'et': 'Kuupros', 'mt': 'Cipru', 'ga': 'An Chipir',
    },
    'MT': {
        'en': 'Malta', 'fr': 'Malte', 'de': 'Malta', 'es': 'Malta',
        'it': 'Malta', 'pt': 'Malta', 'nl': 'Malta', 'pl': 'Malta',
        'ro': 'Malta', 'cs': 'Malta', 'sv': 'Malta', 'da': 'Malta',
        'fi': 'Malta', 'el': 'Μαλτα', 'hu': 'Malta', 'sk': 'Malta',
        'bg': 'Малта', 'hr': 'Malta', 'sl': 'Malta', 'lt': 'Malta',
        'lv': 'Malta', 'et': 'Malta', 'mt': 'Malta', 'ga': 'Maltà',
    },
}

# Also add EL (Greece) — currently missing despite having Greek language
NEW_COUNTRIES['EL'] = {
    'en': 'Greece', 'fr': 'Grece', 'de': 'Griechenland', 'es': 'Grecia',
    'it': 'Grecia', 'pt': 'Grecia', 'nl': 'Griekenland', 'pl': 'Grecja',
    'ro': 'Grecia', 'cs': 'Recko', 'sv': 'Grekland', 'da': 'Graekenland',
    'fi': 'Kreikka', 'el': 'Ελλαδα', 'hu': 'Gorogorszag', 'sk': 'Grecko',
    'bg': 'Гърция', 'hr': 'Grcka', 'sl': 'Grcija', 'lt': 'Graikija',
    'lv': 'Griekija', 'et': 'Kreeka', 'mt': 'Il-Grecja', 'ga': 'An Ghreig',
}

# ============================================================
# URL SLUGS for new countries (24 langs each)
# ============================================================
NEW_SLUGS = {
    'CZ': {
        'en': 'czech-republic', 'fr': 'republique-tcheque', 'de': 'tschechien', 'es': 'republica-checa',
        'it': 'repubblica-ceca', 'pt': 'republica-checa', 'nl': 'tsjechie', 'pl': 'czechy',
        'ro': 'republica-ceha', 'cs': 'cesko', 'sv': 'tjeckien', 'da': 'tjekkiet',
        'fi': 'tsekki', 'el': 'tsehia', 'hu': 'csehorszag', 'sk': 'cesko',
        'bg': 'chehiya', 'hr': 'ceska', 'sl': 'ceska', 'lt': 'cekija',
        'lv': 'cehija', 'et': 'tsehhi', 'mt': 'repubblika-ceka', 'ga': 'an-tseicia',
    },
    'RO': {
        'en': 'romania', 'fr': 'roumanie', 'de': 'rumaenien', 'es': 'rumania',
        'it': 'romania', 'pt': 'romenia', 'nl': 'roemenie', 'pl': 'rumunia',
        'ro': 'romania', 'cs': 'rumunsko', 'sv': 'rumanien', 'da': 'rumaenien',
        'fi': 'romania', 'el': 'roumania', 'hu': 'romania', 'sk': 'rumunsko',
        'bg': 'rumuniya', 'hr': 'rumunjska', 'sl': 'romunija', 'lt': 'rumunija',
        'lv': 'rumānija', 'et': 'rumeenia', 'mt': 'rumanija', 'ga': 'an-romain',
    },
    'HU': {
        'en': 'hungary', 'fr': 'hongrie', 'de': 'ungarn', 'es': 'hungria',
        'it': 'ungheria', 'pt': 'hungria', 'nl': 'hongarije', 'pl': 'wegry',
        'ro': 'ungaria', 'cs': 'madarsko', 'sv': 'ungern', 'da': 'ungarn',
        'fi': 'unkari', 'el': 'ouggaria', 'hu': 'magyarorszag', 'sk': 'madarsko',
        'bg': 'ungariya', 'hr': 'madarska', 'sl': 'madzarska', 'lt': 'vengrija',
        'lv': 'ungārija', 'et': 'ungari', 'mt': 'ungerija', 'ga': 'an-ungair',
    },
    'BG': {
        'en': 'bulgaria', 'fr': 'bulgarie', 'de': 'bulgarien', 'es': 'bulgaria',
        'it': 'bulgaria', 'pt': 'bulgaria', 'nl': 'bulgarije', 'pl': 'bulgaria',
        'ro': 'bulgaria', 'cs': 'bulharsko', 'sv': 'bulgarien', 'da': 'bulgarien',
        'fi': 'bulgaria', 'el': 'voulgaria', 'hu': 'bulgaria', 'sk': 'bulharsko',
        'bg': 'bulgariya', 'hr': 'bugarska', 'sl': 'bolgarija', 'lt': 'bulgarija',
        'lv': 'bulgārija', 'et': 'bulgaaria', 'mt': 'bulgarija', 'ga': 'an-bhulgair',
    },
    'HR': {
        'en': 'croatia', 'fr': 'croatie', 'de': 'kroatien', 'es': 'croacia',
        'it': 'croazia', 'pt': 'croacia', 'nl': 'kroatie', 'pl': 'chorwacja',
        'ro': 'croatia', 'cs': 'chorvatsko', 'sv': 'kroatien', 'da': 'kroatien',
        'fi': 'kroatia', 'el': 'kroatia', 'hu': 'horvatorszag', 'sk': 'chorvatsko',
        'bg': 'harvatiya', 'hr': 'hrvatska', 'sl': 'hrvaska', 'lt': 'kroatija',
        'lv': 'horvātija', 'et': 'horvaatia', 'mt': 'kroazja', 'ga': 'an-chroait',
    },
    'SK': {
        'en': 'slovakia', 'fr': 'slovaquie', 'de': 'slowakei', 'es': 'eslovaquia',
        'it': 'slovacchia', 'pt': 'eslovaquia', 'nl': 'slowakije', 'pl': 'slowacja',
        'ro': 'slovacia', 'cs': 'slovensko', 'sv': 'slovakien', 'da': 'slovakiet',
        'fi': 'slovakia', 'el': 'slovakia', 'hu': 'szlovakia', 'sk': 'slovensko',
        'bg': 'slovakiya', 'hr': 'slovacka', 'sl': 'slovaska', 'lt': 'slovakija',
        'lv': 'slovākija', 'et': 'slovakkia', 'mt': 'slovakkja', 'ga': 'an-tslovaic',
    },
    'SI': {
        'en': 'slovenia', 'fr': 'slovenie', 'de': 'slowenien', 'es': 'eslovenia',
        'it': 'slovenia', 'pt': 'eslovenia', 'nl': 'slovenie', 'pl': 'slowenia',
        'ro': 'slovenia', 'cs': 'slovinsko', 'sv': 'slovenien', 'da': 'slovenien',
        'fi': 'slovenia', 'el': 'slovenia', 'hu': 'szlovenia', 'sk': 'slovinsko',
        'bg': 'sloveniya', 'hr': 'slovenija', 'sl': 'slovenija', 'lt': 'slovenija',
        'lv': 'slovēnija', 'et': 'sloveenia', 'mt': 'slovenja', 'ga': 'an-tsloivein',
    },
    'LT': {
        'en': 'lithuania', 'fr': 'lituanie', 'de': 'litauen', 'es': 'lituania',
        'it': 'lituania', 'pt': 'lituania', 'nl': 'litouwen', 'pl': 'litwa',
        'ro': 'lituania', 'cs': 'litva', 'sv': 'litauen', 'da': 'litauen',
        'fi': 'liettua', 'el': 'lithouania', 'hu': 'litvania', 'sk': 'litva',
        'bg': 'litva', 'hr': 'litva', 'sl': 'litva', 'lt': 'lietuva',
        'lv': 'lietuva', 'et': 'leedu', 'mt': 'litwanja', 'ga': 'an-liotuain',
    },
    'LV': {
        'en': 'latvia', 'fr': 'lettonie', 'de': 'lettland', 'es': 'letonia',
        'it': 'lettonia', 'pt': 'letonia', 'nl': 'letland', 'pl': 'lotwa',
        'ro': 'letonia', 'cs': 'lotyssko', 'sv': 'lettland', 'da': 'letland',
        'fi': 'latvia', 'el': 'letonia', 'hu': 'lettorszag', 'sk': 'lotyssko',
        'bg': 'latviya', 'hr': 'latvija', 'sl': 'latvija', 'lt': 'latvija',
        'lv': 'latvija', 'et': 'lati', 'mt': 'latvja', 'ga': 'an-laitvia',
    },
    'EE': {
        'en': 'estonia', 'fr': 'estonie', 'de': 'estland', 'es': 'estonia',
        'it': 'estonia', 'pt': 'estonia', 'nl': 'estland', 'pl': 'estonia',
        'ro': 'estonia', 'cs': 'estonsko', 'sv': 'estland', 'da': 'estland',
        'fi': 'viro', 'el': 'esthonia', 'hu': 'esztorszag', 'sk': 'estonsko',
        'bg': 'estoniya', 'hr': 'estonija', 'sl': 'estonija', 'lt': 'estija',
        'lv': 'igaunija', 'et': 'eesti', 'mt': 'estonja', 'ga': 'an-eastoin',
    },
    'CY': {
        'en': 'cyprus', 'fr': 'chypre', 'de': 'zypern', 'es': 'chipre',
        'it': 'cipro', 'pt': 'chipre', 'nl': 'cyprus', 'pl': 'cypr',
        'ro': 'cipru', 'cs': 'kypr', 'sv': 'cypern', 'da': 'cypern',
        'fi': 'kypros', 'el': 'kypros', 'hu': 'ciprus', 'sk': 'cyprus',
        'bg': 'kipur', 'hr': 'cipar', 'sl': 'ciper', 'lt': 'kipras',
        'lv': 'kipra', 'et': 'kuupros', 'mt': 'cipru', 'ga': 'an-chipir',
    },
    'MT': {
        'en': 'malta', 'fr': 'malte', 'de': 'malta', 'es': 'malta',
        'it': 'malta', 'pt': 'malta', 'nl': 'malta', 'pl': 'malta',
        'ro': 'malta', 'cs': 'malta', 'sv': 'malta', 'da': 'malta',
        'fi': 'malta', 'el': 'malta', 'hu': 'malta', 'sk': 'malta',
        'bg': 'malta', 'hr': 'malta', 'sl': 'malta', 'lt': 'malta',
        'lv': 'malta', 'et': 'malta', 'mt': 'malta', 'ga': 'malta',
    },
    'EL': {
        'en': 'greece', 'fr': 'grece', 'de': 'griechenland', 'es': 'grecia',
        'it': 'grecia', 'pt': 'grecia', 'nl': 'griekenland', 'pl': 'grecja',
        'ro': 'grecia', 'cs': 'recko', 'sv': 'grekland', 'da': 'graekenland',
        'fi': 'kreikka', 'el': 'ellada', 'hu': 'gorogorszag', 'sk': 'grecko',
        'bg': 'garciya', 'hr': 'grcka', 'sl': 'grcija', 'lt': 'graikija',
        'lv': 'griekija', 'et': 'kreeka', 'mt': 'grecja', 'ga': 'an-ghreig',
    },
}

LANGS = ['en','fr','de','es','bg','hr','cs','da','nl','et','fi','el','hu','ga',
         'it','lv','lt','mt','pl','pt','ro','sk','sl','sv']

# ============================================================
# 1. UPDATE slugs.ts — add new countries to each lang block
# ============================================================
def update_slugs():
    path = os.path.join(BASE, 'src', 'data', 'slugs.ts')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # For each language block in countrySlugsByLang, add new country entries
    for lang in LANGS:
        # Find the block for this language: "  lang: {\n    ...\n  },"
        # Pattern: lang key followed by entries ending with },
        pattern = rf"(  {lang}: \{{[^}}]+)(  \}})"
        match = re.search(pattern, content)
        if not match:
            print(f"  WARNING: Could not find slug block for lang '{lang}'")
            continue

        existing = match.group(1)
        closing = match.group(2)

        # Check which countries are already present
        new_entries = []
        for code, slugs in NEW_SLUGS.items():
            if f"'{code}':" in existing or f"{code}:" in existing:
                continue  # Already exists
            slug = slugs.get(lang, slugs['en'])
            new_entries.append(f"    {code}: '{slug}'")

        if new_entries:
            # Add new entries before the closing brace
            addition = ',\n'.join(new_entries)
            content = content.replace(
                existing + closing,
                existing + ',\n' + addition + ',\n' + closing
            )

    # Update comment
    content = content.replace(
        '15 countries × 24 langs',
        '27+ countries × 24 langs'
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[OK] Updated {path}")

# ============================================================
# 2. UPDATE translations.ts — add new countryNames entries
# ============================================================
def update_translations():
    path = os.path.join(BASE, 'src', 'i18n', 'translations.ts')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the last country entry before the closing of countryNames
    # We'll insert new countries after the last existing one
    # Find pattern: last country block ending with },\n};
    # Actually, let's find the end of the countryNames object

    for code, names in NEW_COUNTRIES.items():
        # Check if already exists
        if f"  {code}: {{" in content:
            print(f"  SKIP: {code} already in translations.ts")
            continue

        # Build the entry
        lines = [f"  {code}: {{"]
        lang_pairs = []
        for lang in LANGS:
            name = names.get(lang, names['en'])
            lang_pairs.append(f"{lang}: '{name}'")

        # Group 4 per line for readability
        for i in range(0, len(lang_pairs), 4):
            chunk = ', '.join(lang_pairs[i:i+4])
            lines.append(f"    {chunk},")
        lines.append("  },")
        entry = '\n'.join(lines)

        # Insert before the closing of countryNames
        # Find the pattern: last }; after the country blocks
        # We'll insert before the job names section
        marker = "// --------------- Job"
        if marker in content:
            content = content.replace(marker, entry + '\n' + marker)
        else:
            # Fallback: insert before first export after countryNames
            pass

    # Update comment
    content = content.replace(
        '15 countries × 24 langs',
        '27+ countries × 24 langs'
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[OK] Updated {path}")

# ============================================================
# 3. BULK REPLACE "15" references across all source files
# ============================================================
def update_15_to_27():
    """Replace '15 countries/pays/Länder/etc.' with '27' variants"""
    replacements = [
        # English
        ('15 EU countries', '27 EU countries'),
        ('15 EU Countries', '27 EU Countries'),
        ('15 European countries', '27 European countries'),
        ('15 countries', '27 countries'),
        # French
        ("15 pays de l'UE", "27 pays de l'UE"),
        ('15 pays europeens', '27 pays europeens'),
        ("15 pays européens", "27 pays européens"),
        ('15 pays', '27 pays'),
        # German
        ('15 EU-Ländern', '27 EU-Ländern'),
        ('15 EU-Landern', '27 EU-Landern'),
        ('15 europäischen Ländern', '27 europäischen Ländern'),
        ('15 europaischen Landern', '27 europaischen Landern'),
        ('15 Ländern', '27 Ländern'),
        ('15 Landern', '27 Landern'),
        ('15 Lander', '27 Lander'),
        # Spanish
        ('15 países de la UE', '27 países de la UE'),
        ('15 paises de la UE', '27 paises de la UE'),
        ('15 países europeos', '27 países europeos'),
        ('15 paises europeos', '27 paises europeos'),
        ('15 países', '27 países'),
        ('15 paises', '27 paises'),
        # Italian
        ('15 paesi europei', '27 paesi europei'),
        ('15 paesi', '27 paesi'),
        # Portuguese
        ('15 países europeus', '27 países europeus'),
        # Dutch
        ('15 Europese landen', '27 Europese landen'),
        ('15 EU-landen', '27 EU-landen'),
        # Polish
        ('15 krajach europejskich', '27 krajach europejskich'),
        ('15 krajów UE', '27 krajów UE'),
        ('15 krajow UE', '27 krajow UE'),
        # Romanian
        ('15 țări europene', '27 țări europene'),
        ('15 tari europene', '27 tari europene'),
        # Czech
        ('15 evropských zemích', '27 evropských zemích'),
        ('15 evropskych zemich', '27 evropskych zemich'),
        # Swedish
        ('15 europeiska länder', '27 europeiska länder'),
        ('15 europeiska lander', '27 europeiska lander'),
        # Danish
        ('15 europæiske lande', '27 europæiske lande'),
        ('15 europaeiske lande', '27 europaeiske lande'),
        # Finnish
        ('15 Euroopan maassa', '27 Euroopan maassa'),
        # Greek
        ('15 ευρωπαϊκές χώρες', '27 ευρωπαϊκές χώρες'),
        # Hungarian
        ('15 európai országban', '27 európai országban'),
        ('15 europai orszagban', '27 europai orszagban'),
        # Slovak
        ('15 európskych krajinách', '27 európskych krajinách'),
        ('15 europskych krajinach', '27 europskych krajinach'),
        # Bulgarian
        ('15 европейски държави', '27 европейски държави'),
        # Croatian
        ('15 europskih država', '27 europskih država'),
        ('15 europskih drzava', '27 europskih drzava'),
        # Slovenian
        ('15 evropskih državah', '27 evropskih državah'),
        ('15 evropskih drzavah', '27 evropskih drzavah'),
        # Lithuanian
        ('15 Europos šalių', '27 Europos šalių'),
        ("15 Europos saliu", "27 Europos saliu"),
        # Latvian
        ('15 Eiropas valstīs', '27 Eiropas valstīs'),
        ('15 Eiropas valstis', '27 Eiropas valstis'),
        # Estonian
        ('15 Euroopa riigis', '27 Euroopa riigis'),
        # Maltese
        ("15-il pajjiż Ewropew", "27 pajjiż Ewropew"),
        ("f'15-il", "f'27"),
        # Irish
        ('15 tír Eorpach', '27 tír Eorpach'),
        ('15 tir Eorpach', '27 tir Eorpach'),
        # Comments
        ('20 jobs × 15 countries', '20 jobs × 27 countries'),
        ('15 countries × 24 langs', '27+ countries × 24 langs'),
    ]

    # Search all relevant files
    extensions = ['*.ts', '*.astro', '*.mjs', '*.md']
    search_dirs = [
        os.path.join(BASE, 'src'),
        os.path.join(BASE, 'scripts'),
        os.path.join(BASE, 'CLAUDE.md'),
    ]

    files_changed = 0
    for search_dir in search_dirs:
        if os.path.isfile(search_dir):
            all_files = [search_dir]
        else:
            all_files = []
            for ext in extensions:
                all_files.extend(glob.glob(os.path.join(search_dir, '**', ext), recursive=True))

    for filepath in all_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except:
            continue

        original = content
        for old, new in replacements:
            content = content.replace(old, new)

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            files_changed += 1
            print(f"  [UPDATED] {os.path.relpath(filepath, BASE)}")

    print(f"[OK] Updated '15' → '27' in {files_changed} files")

# ============================================================
# RUN ALL
# ============================================================
if __name__ == '__main__':
    print("=== STEP 1: Update slugs.ts ===")
    update_slugs()
    print("\n=== STEP 2: Update translations.ts ===")
    update_translations()
    print("\n=== STEP 3: Replace 15 -> 27 everywhere ===")
    update_15_to_27()
    print("\n=== DONE ===")
