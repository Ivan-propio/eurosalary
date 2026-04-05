import { jobSlugsByLang, countrySlugsByLang } from './slugs';
import { jobNames } from '../i18n/translations';

interface FeaturedSalary {
  jobKey: string;
  jobName: Record<string, string>;
  icon: string;
  countries: string;
  tagKey: string;
  tag: Record<string, string>;
  range: string;
  /** Canonical country code for the primary link */
  primaryCountry: string;
}

const featured: FeaturedSalary[] = [
  {
    jobKey: 'software-engineer',
    jobName: { en: 'Software Engineer', fr: 'Ingénieur logiciel', de: 'Softwareentwickler', es: 'Ingeniero de software' },
    icon: 'developer_mode',
    countries: 'DE, NL, FR, IE',
    tagKey: 'tier1',
    tag: {
      en: 'Tier 1 Hubs', fr: 'Hubs Tier 1', de: 'Tier-1-Hubs', es: 'Hubs Tier 1',
      it: 'Hub di livello 1', pt: 'Hubs Tier 1', nl: 'Tier 1-hubs', pl: 'Huby Tier 1',
      ro: 'Hub-uri Tier 1', cs: 'Huby Tier 1', sv: 'Tier 1-hubbar', da: 'Tier 1-hubs',
      fi: 'Tier 1 -keskukset', el: 'Κόμβοι Tier 1', hu: 'Tier 1 központok', sk: 'Huby Tier 1',
      bg: 'Хъбове от ниво 1', hr: 'Hubovi razine 1', sl: 'Vozlišča Tier 1', lt: 'Tier 1 centrai',
      lv: 'Tier 1 centri', et: 'Tier 1 keskused', mt: 'Hubs Tier 1', ga: 'Moil Leibhéal 1',
    },
    range: '€48,000 – €95,000',
    primaryCountry: 'DE',
  },
  {
    jobKey: 'product-manager',
    jobName: { en: 'Product Manager', fr: 'Chef de produit', de: 'Produktmanager', es: 'Product Manager' },
    icon: 'supervised_user_circle',
    countries: 'NL, DE, FR',
    tagKey: 'highDemand',
    tag: {
      en: 'High Demand', fr: 'Forte demande', de: 'Hohe Nachfrage', es: 'Alta demanda',
      it: 'Alta domanda', pt: 'Alta procura', nl: 'Hoge vraag', pl: 'Wysoki popyt',
      ro: 'Cerere mare', cs: 'Vysoká poptávka', sv: 'Hög efterfrågan', da: 'Høj efterspørgsel',
      fi: 'Suuri kysyntä', el: 'Υψηλή ζήτηση', hu: 'Nagy kereslet', sk: 'Vysoký dopyt',
      bg: 'Голямо търсене', hr: 'Velika potražnja', sl: 'Veliko povpraševanje', lt: 'Didelė paklausa',
      lv: 'Liels pieprasījums', et: 'Suur nõudlus', mt: 'Domanda għolja', ga: 'Éileamh ard',
    },
    range: '€50,000 – €85,000',
    primaryCountry: 'NL',
  },
  {
    jobKey: 'data-scientist',
    jobName: { en: 'Data Scientist', fr: 'Data Scientist', de: 'Data Scientist', es: 'Data Scientist' },
    icon: 'analytics',
    countries: 'FR, DE, NL, IE',
    tagKey: 'techHub',
    tag: {
      en: 'Tech Hub', fr: 'Hub Tech', de: 'Tech-Hub', es: 'Hub Tech',
      it: 'Hub tecnologico', pt: 'Hub Tech', nl: 'Tech-hub', pl: 'Hub technologiczny',
      ro: 'Hub tehnologic', cs: 'Tech hub', sv: 'Teknikhub', da: 'Tech-hub',
      fi: 'Teknologiakeskus', el: 'Τεχνολογικός κόμβος', hu: 'Tech központ', sk: 'Tech hub',
      bg: 'Технологичен хъб', hr: 'Tehnološki hub', sl: 'Tehnološko vozlišče', lt: 'Technologijų centras',
      lv: 'Tehnoloģiju centrs', et: 'Tehnoloogiakeskus', mt: 'Hub tat-teknoloġija', ga: 'Mol teicneolaíochta',
    },
    range: '€45,000 – €80,000',
    primaryCountry: 'FR',
  },
  {
    jobKey: 'nurse',
    jobName: { en: 'Nurse', fr: 'Infirmier/ère', de: 'Krankenpfleger(in)', es: 'Enfermero/a' },
    icon: 'health_and_safety',
    countries: 'BE, NL, DE, LU',
    tagKey: 'essential',
    tag: {
      en: 'Essential', fr: 'Essentiel', de: 'Unverzichtbar', es: 'Esencial',
      it: 'Essenziale', pt: 'Essencial', nl: 'Essentieel', pl: 'Niezbędny',
      ro: 'Esențial', cs: 'Nezbytný', sv: 'Väsentlig', da: 'Essentiel',
      fi: 'Välttämätön', el: 'Απαραίτητο', hu: 'Nélkülözhetetlen', sk: 'Nevyhnutný',
      bg: 'Незаменим', hr: 'Neizostavan', sl: 'Nepogrešljiv', lt: 'Būtinas',
      lv: 'Būtisks', et: 'Hädavajalik', mt: 'Essenzjali', ga: 'Riachtanach',
    },
    range: '€32,000 – €52,000',
    primaryCountry: 'BE',
  },
  {
    jobKey: 'marketing-manager',
    jobName: { en: 'Marketing Manager', fr: 'Directeur marketing', de: 'Marketingmanager', es: 'Director de marketing' },
    icon: 'campaign',
    countries: 'ES, FR, DE',
    tagKey: 'growth',
    tag: {
      en: 'Growth', fr: 'Croissance', de: 'Wachstum', es: 'Crecimiento',
      it: 'Crescita', pt: 'Crescimento', nl: 'Groei', pl: 'Wzrost',
      ro: 'Creștere', cs: 'Růst', sv: 'Tillväxt', da: 'Vækst',
      fi: 'Kasvu', el: 'Ανάπτυξη', hu: 'Növekedés', sk: 'Rast',
      bg: 'Растеж', hr: 'Rast', sl: 'Rast', lt: 'Augimas',
      lv: 'Izaugsme', et: 'Kasv', mt: 'Tkabbir', ga: 'Fás',
    },
    range: '€30,000 – €60,000',
    primaryCountry: 'ES',
  },
  {
    jobKey: 'financial-analyst',
    jobName: { en: 'Financial Analyst', fr: 'Analyste financier', de: 'Finanzanalyst', es: 'Analista financiero' },
    icon: 'account_balance',
    countries: 'LU, DE (Frankfurt)',
    tagKey: 'finance',
    tag: {
      en: 'Finance Centers', fr: 'Centres financiers', de: 'Finanzzentren', es: 'Centros financieros',
      it: 'Centri finanziari', pt: 'Centros financeiros', nl: 'Financiële centra', pl: 'Centra finansowe',
      ro: 'Centre financiare', cs: 'Finanční centra', sv: 'Finanscentrum', da: 'Finanscentre',
      fi: 'Rahoituskeskukset', el: 'Χρηματοοικονομικά κέντρα', hu: 'Pénzügyi központok', sk: 'Finančné centrá',
      bg: 'Финансови центрове', hr: 'Financijski centri', sl: 'Finančna središča', lt: 'Finansų centrai',
      lv: 'Finanšu centri', et: 'Finantskeskused', mt: 'Ċentri finanzjarji', ga: 'Ionaid airgeadais',
    },
    range: '€60,000 – €125,000',
    primaryCountry: 'LU',
  },
];

export function getFeaturedSalaries(lang: string) {
  const jobSlugs = jobSlugsByLang[lang] || jobSlugsByLang.en;
  const countrySlugs = countrySlugsByLang[lang] || countrySlugsByLang.en;

  return featured.map((item) => ({
    job: jobNames[item.jobKey]?.[lang] || jobNames[item.jobKey]?.en || item.jobName.en,
    icon: item.icon,
    countries: item.countries,
    tag: item.tag[lang] || item.tag.en,
    range: item.range,
    link: `/${lang}/salary/${countrySlugs[item.primaryCountry]}/${jobSlugs[item.jobKey]}/`,
    compare: `/${lang}/compare/${jobSlugs[item.jobKey]}/`,
  }));
}

export function getHomepageMeta(lang: string) {
  const meta: Record<string, { title: string; description: string }> = {
    en: {
      title: 'Average Salaries in Europe (2026) — Compare Across 27 Countries',
      description: 'Compare average salaries across Europe. Verified data from Eurostat, job postings, and anonymous reports. Updated monthly for 2026.',
    },
    fr: {
      title: 'Salaires moyens en Europe (2026) — Comparez dans 27 pays',
      description: 'Comparez les salaires moyens en Europe. Données vérifiées d\'Eurostat, offres d\'emploi et rapports anonymes. Mis à jour mensuellement pour 2026.',
    },
    de: {
      title: 'Durchschnittsgehälter in Europa (2026) — Vergleich in 27 Ländern',
      description: 'Vergleichen Sie Durchschnittsgehälter in Europa. Verifizierte Daten von Eurostat, Stellenanzeigen und anonymen Berichten. Monatlich aktualisiert für 2026.',
    },
    es: {
      title: 'Salarios promedio en Europa (2026) — Compara en 27 países',
      description: 'Compara los salarios promedio en Europa. Datos verificados de Eurostat, ofertas de empleo e informes anónimos. Actualizado mensualmente para 2026.',
    },
    bg: {
      title: 'Средни заплати в Европа (2026) — Сравнение в 27 държави',
      description: 'Сравнете средните заплати в Европа. Верифицирани данни от Eurostat, обяви за работа и анонимни доклади.',
    },
    hr: {
      title: 'Prosječne plaće u Europi (2026) — Usporedba u 27 zemalja',
      description: 'Usporedite prosječne plaće diljem Europe. Verificirani podaci iz Eurostata, oglasa za posao i anonimnih izvještaja.',
    },
    cs: {
      title: 'Průměrné platy v Evropě (2026) — Srovnání ve 27 zemích',
      description: 'Srovnejte průměrné platy v Evropě. Ověřená data z Eurostatu, pracovních inzerátů a anonymních hlášení.',
    },
    da: {
      title: 'Gennemsnitslønninger i Europa (2026) — Sammenlign på tværs af 27 lande',
      description: 'Sammenlign gennemsnitslønninger i Europa. Verificerede data fra Eurostat, jobannoncer og anonyme rapporter.',
    },
    nl: {
      title: 'Gemiddelde salarissen in Europa (2026) — Vergelijk in 27 landen',
      description: 'Vergelijk gemiddelde salarissen in Europa. Geverifieerde gegevens van Eurostat, vacatures en anonieme rapporten.',
    },
    et: {
      title: 'Keskmine palk Euroopas (2026) — Võrdlus 27 riigi vahel',
      description: 'Võrrelge keskmisi palku Euroopas. Kontrollitud andmed Eurostatist, tööpakkumistest ja anonüümsetest aruannetest.',
    },
    fi: {
      title: 'Keskipalkat Euroopassa (2026) — Vertaa 27 maan välillä',
      description: 'Vertaa keskipalkkoja Euroopassa. Vahvistetut tiedot Eurostatista, työpaikkailmoituksista ja anonyymiraporteista.',
    },
    el: {
      title: 'Μέσοι μισθοί στην Ευρώπη (2026) — Σύγκριση σε 27 χώρες',
      description: 'Συγκρίνετε μέσους μισθούς στην Ευρώπη. Επαληθευμένα δεδομένα από τη Eurostat, αγγελίες εργασίας και ανώνυμες αναφορές.',
    },
    hu: {
      title: 'Átlagfizetések Európában (2026) — Összehasonlítás 27 országban',
      description: 'Hasonlítsa össze az átlagfizetéseket Európában. Ellenőrzött adatok az Eurostat-tól, álláshirdetésekből és anonim jelentésekből.',
    },
    ga: {
      title: 'Meántuarastail san Eoraip (2026) — Comparáid ar fud 27 tír',
      description: 'Cuir meántuarastail i gcomparáid ar fud na hEorpa. Sonraí fíoraithe ó Eurostat, fógraí poist agus tuairiscí anaithnide.',
    },
    it: {
      title: 'Stipendi medi in Europa (2026) — Confronta in 27 paesi',
      description: 'Confronta gli stipendi medi in Europa. Dati verificati da Eurostat, annunci di lavoro e report anonimi. Aggiornato mensilmente per il 2026.',
    },
    lv: {
      title: 'Vidējās algas Eiropā (2026) — Salīdzinājums 27 valstīs',
      description: 'Salīdziniet vidējās algas Eiropā. Pārbaudīti dati no Eurostat, darba sludinājumiem un anonīmiem ziņojumiem.',
    },
    lt: {
      title: 'Vidutiniai atlyginimai Europoje (2026) — Palyginimas 27 šalyse',
      description: 'Palyginkite vidutinius atlyginimus Europoje. Patikrinti duomenys iš Eurostat, darbo skelbimų ir anoniminių ataskaitų.',
    },
    mt: {
      title: 'Pagi medji fl-Ewropa (2026) — Qabbel fi 27 pajjiż',
      description: 'Qabbel il-pagi medji fl-Ewropa. Dejta vverifikata minn Eurostat, riklami tax-xogħol u rapporti anonimi.',
    },
    pl: {
      title: 'Średnie zarobki w Europie (2026) — Porównanie w 27 krajach',
      description: 'Porównaj średnie zarobki w Europie. Zweryfikowane dane z Eurostatu, ogłoszeń o pracę i anonimowych raportów.',
    },
    pt: {
      title: 'Salários médios na Europa (2026) — Compare em 27 países',
      description: 'Compare salários médios na Europa. Dados verificados do Eurostat, anúncios de emprego e relatórios anónimos.',
    },
    ro: {
      title: 'Salarii medii în Europa (2026) — Comparație în 27 de țări',
      description: 'Comparați salariile medii din Europa. Date verificate de la Eurostat, anunțuri de locuri de muncă și rapoarte anonime.',
    },
    sk: {
      title: 'Priemerné platy v Európe (2026) — Porovnanie v 27 krajinách',
      description: 'Porovnajte priemerné platy v Európe. Overené údaje z Eurostatu, pracovných inzerátov a anonymných hlásení.',
    },
    sl: {
      title: 'Povprečne plače v Evropi (2026) — Primerjava v 27 državah',
      description: 'Primerjajte povprečne plače v Evropi. Preverjeni podatki iz Eurostata, zaposlitvenih oglasov in anonimnih poročil.',
    },
    sv: {
      title: 'Genomsnittslöner i Europa (2026) — Jämför i 27 länder',
      description: 'Jämför genomsnittslöner i Europa. Verifierad data från Eurostat, jobbannonser och anonyma rapporter.',
    },
  };
  return meta[lang] || meta.en;
}
