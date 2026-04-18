export const faqBySector: Record<string, Record<string, Array<{ question: string; answer: string }>>> = {
  technology: {
    en: [
      { question: 'What is the average technology salary in Europe?', answer: 'Technology salaries in Europe range from €45,000 to €85,000 per year depending on role and country. Switzerland and Luxembourg lead with the highest tech salaries, while Poland and Romania offer competitive salaries with lower cost of living.' },
      { question: 'Which European country pays software engineers the most?', answer: 'Switzerland pays the highest software engineering salaries in Europe, with median compensation exceeding €90,000–€110,000 gross per year. Luxembourg, Denmark, and Ireland also rank among the top-paying countries for tech roles.' },
      { question: 'How does the EU Pay Transparency Directive affect tech companies?', answer: 'From June 2026, tech companies operating in the EU must publish salary ranges in all job postings and report gender pay gaps if they have 100+ employees. This affects all EU-based employers including subsidiaries of US or UK tech companies.' },
      { question: 'What is the salary difference between junior and senior developers in Europe?', answer: 'Senior software engineers typically earn 1.8–2.5x more than junior developers in the same country. For example, in Germany, junior developers average around €45,000 while senior engineers can earn €80,000–€95,000.' },
    ],
    fr: [
      { question: 'Quel est le salaire moyen dans la technologie en Europe ?', answer: 'Les salaires dans le secteur technologique en Europe varient de 45 000 € à 85 000 € par an selon le poste et le pays. La Suisse et le Luxembourg offrent les salaires tech les plus élevés.' },
      { question: 'Quel pays européen paie le mieux les ingénieurs logiciels ?', answer: 'La Suisse paie les salaires d\'ingénieurs logiciels les plus élevés en Europe, avec une rémunération médiane dépassant 90 000–110 000 € brut par an.' },
      { question: 'Comment la directive sur la transparence salariale affecte-t-elle les entreprises tech ?', answer: 'À partir de juin 2026, les entreprises tech opérant dans l\'UE devront publier les fourchettes de salaires dans toutes les offres d\'emploi et signaler les écarts de rémunération hommes-femmes.' },
      { question: 'Quelle est la différence de salaire entre développeurs juniors et seniors en Europe ?', answer: 'Les ingénieurs logiciels seniors gagnent généralement 1,8 à 2,5 fois plus que les développeurs juniors dans le même pays.' },
    ],
    de: [
      { question: 'Was ist das durchschnittliche Technologiegehalt in Europa?', answer: 'Technologiegehälter in Europa liegen zwischen 45.000 € und 85.000 € pro Jahr, abhängig von Rolle und Land. Die Schweiz und Luxemburg führen bei den höchsten Tech-Gehältern.' },
      { question: 'Welches europäische Land zahlt Software-Ingenieuren am meisten?', answer: 'Die Schweiz zahlt die höchsten Software-Engineering-Gehälter in Europa, mit einem Median von über 90.000–110.000 € brutto pro Jahr.' },
      { question: 'Wie wirkt sich die EU-Lohntransparenzrichtlinie auf Tech-Unternehmen aus?', answer: 'Ab Juni 2026 müssen Tech-Unternehmen in der EU Gehaltsranges in allen Stellenanzeigen veröffentlichen und bei 100+ Mitarbeitern den Gender Pay Gap berichten.' },
      { question: 'Was ist der Gehaltsunterschied zwischen Junior- und Senior-Entwicklern in Europa?', answer: 'Senior-Software-Ingenieure verdienen typischerweise 1,8–2,5x mehr als Junior-Entwickler im gleichen Land.' },
    ],
    es: [
      { question: '¿Cuál es el salario promedio en tecnología en Europa?', answer: 'Los salarios tecnológicos en Europa oscilan entre €45.000 y €85.000 al año según el puesto y el país. Suiza y Luxemburgo lideran con los salarios tecnológicos más altos.' },
      { question: '¿Qué país europeo paga mejor a los ingenieros de software?', answer: 'Suiza paga los salarios de ingeniería de software más altos de Europa, con una compensación mediana que supera los €90.000–€110.000 brutos anuales.' },
      { question: '¿Cómo afecta la Directiva de Transparencia Salarial de la UE a las empresas tech?', answer: 'A partir de junio de 2026, las empresas tech en la UE deberán publicar rangos salariales en todas las ofertas de empleo e informar sobre brechas salariales de género.' },
      { question: '¿Cuál es la diferencia salarial entre desarrolladores junior y senior en Europa?', answer: 'Los ingenieros senior suelen ganar entre 1,8 y 2,5 veces más que los desarrolladores junior en el mismo país.' },
    ],
  },
  finance: {
    en: [
      { question: 'What is the average finance salary in Europe?', answer: 'Finance salaries in Europe range from €40,000 to €75,000 per year. Luxembourg, Switzerland, and the UK (pre-Brexit benchmark) offer the highest financial sector compensation, driven by banking and investment management hubs.' },
      { question: 'Which city in Europe has the highest finance salaries?', answer: 'Luxembourg City, Zurich, and Frankfurt are the top-paying finance cities in Europe. Luxembourg particularly benefits from its role as the EU\'s second-largest investment fund centre after the US.' },
      { question: 'Do finance companies need to report gender pay gaps under the EU directive?', answer: 'Yes. Financial services firms with 150+ employees must report gender pay gaps starting from the 2027 reporting period (covering 2026 data). Companies with 100+ employees join in 2031. Many major banks already report voluntarily.' },
      { question: 'How much does a financial analyst earn in Germany?', answer: 'A mid-level financial analyst in Germany earns approximately €55,000–€65,000 gross per year. Senior financial analysts in Frankfurt\'s banking district can earn €80,000–€100,000 including bonus.' },
    ],
    fr: [
      { question: 'Quel est le salaire moyen dans la finance en Europe ?', answer: 'Les salaires dans la finance en Europe vont de 40 000 € à 75 000 € par an. Le Luxembourg, la Suisse offrent les rémunérations les plus élevées du secteur financier.' },
      { question: 'Quelle ville européenne a les salaires de la finance les plus élevés ?', answer: 'Luxembourg-Ville, Zurich et Francfort sont les villes financières les mieux rémunérées en Europe.' },
      { question: 'Les entreprises financières doivent-elles déclarer les écarts salariaux selon la directive européenne ?', answer: 'Oui. Les entreprises de services financiers avec 150+ employés devront déclarer les écarts de rémunération hommes-femmes à partir de 2027.' },
      { question: 'Combien gagne un analyste financier en Allemagne ?', answer: 'Un analyste financier de niveau intermédiaire en Allemagne gagne environ 55 000 à 65 000 € brut par an.' },
    ],
    de: [
      { question: 'Was ist das durchschnittliche Finanzgehalt in Europa?', answer: 'Finanzgehälter in Europa liegen zwischen 40.000 € und 75.000 € pro Jahr. Luxemburg und die Schweiz bieten die höchsten Vergütungen im Finanzsektor.' },
      { question: 'Welche Stadt in Europa hat die höchsten Finanzgehälter?', answer: 'Luxemburg-Stadt, Zürich und Frankfurt sind die Städte mit den höchsten Finanzgehältern in Europa.' },
      { question: 'Müssen Finanzunternehmen unter der EU-Richtlinie Gender Pay Gaps melden?', answer: 'Ja. Finanzdienstleister mit 150+ Mitarbeitern müssen ab 2027 den Gender Pay Gap melden.' },
      { question: 'Wie viel verdient ein Finanzanalyst in Deutschland?', answer: 'Ein Finanzanalyst auf mittlerem Niveau in Deutschland verdient etwa 55.000–65.000 € brutto pro Jahr.' },
    ],
    es: [
      { question: '¿Cuál es el salario promedio en finanzas en Europa?', answer: 'Los salarios en finanzas en Europa oscilan entre €40.000 y €75.000 al año. Luxemburgo y Suiza ofrecen las compensaciones más altas del sector.' },
      { question: '¿Qué ciudad europea tiene los salarios más altos en finanzas?', answer: 'Luxemburgo, Zúrich y Fráncfort son las ciudades financieras mejor remuneradas de Europa.' },
      { question: '¿Las empresas financieras deben reportar brechas salariales de género según la directiva?', answer: 'Sí. Las empresas de servicios financieros con 150+ empleados deberán informar sobre brechas salariales de género a partir de 2027.' },
      { question: '¿Cuánto gana un analista financiero en Alemania?', answer: 'Un analista financiero de nivel medio en Alemania gana aproximadamente €55.000–€65.000 brutos al año.' },
    ],
  },
  healthcare: {
    en: [
      { question: 'What is the average healthcare salary in Europe?', answer: 'Healthcare salaries in Europe vary widely by profession: doctors earn €60,000–€150,000, nurses €28,000–€55,000, and pharmacists €40,000–€70,000 gross annually. Switzerland, Denmark, and Germany offer the highest healthcare compensation.' },
      { question: 'Which European country pays doctors the most?', answer: 'Switzerland pays the highest physician salaries in Europe, with specialists earning €150,000–€250,000 gross per year. Germany, Denmark, and the Netherlands also rank among the top countries for medical compensation.' },
      { question: 'Is there a nursing salary shortage issue in Europe?', answer: 'Yes. Multiple EU countries face nursing shortages, with salary gaps between Western and Eastern Europe exceeding 300%. Germany and France have introduced bonuses and visa programs to recruit nurses from Southern and Eastern Europe.' },
      { question: 'How does the EU Pay Transparency Directive apply to hospitals?', answer: 'Public and private hospitals with 100+ employees must comply with the EU Pay Transparency Directive. They must publish salary ranges in job postings and report gender pay gaps, which are significant in healthcare (nurses vs. doctors).' },
    ],
    fr: [
      { question: 'Quel est le salaire moyen dans le secteur de la santé en Europe ?', answer: 'Les salaires dans la santé en Europe varient selon la profession : les médecins gagnent 60 000–150 000 €, les infirmiers 28 000–55 000 € brut annuel.' },
      { question: 'Quel pays européen paie le mieux les médecins ?', answer: 'La Suisse paie les salaires de médecins les plus élevés en Europe, avec des spécialistes gagnant 150 000–250 000 € brut par an.' },
      { question: 'Existe-t-il un problème de pénurie de personnel infirmier en Europe ?', answer: 'Oui. Plusieurs pays de l\'UE font face à des pénuries d\'infirmiers, avec des écarts de salaires entre Europe occidentale et orientale dépassant 300%.' },
      { question: 'Comment la directive sur la transparence salariale s\'applique-t-elle aux hôpitaux ?', answer: 'Les hôpitaux publics et privés de 100+ employés doivent se conformer à la directive européenne sur la transparence salariale.' },
    ],
    de: [
      { question: 'Was ist das durchschnittliche Gesundheitsgehalt in Europa?', answer: 'Gesundheitsgehälter in Europa variieren stark: Ärzte verdienen 60.000–150.000 €, Krankenschwestern 28.000–55.000 € brutto jährlich.' },
      { question: 'Welches europäische Land zahlt Ärzten am meisten?', answer: 'Die Schweiz zahlt die höchsten Arztgehälter in Europa, mit Spezialisten, die 150.000–250.000 € brutto pro Jahr verdienen.' },
      { question: 'Gibt es ein Pflegepersonalmangel-Problem in Europa?', answer: 'Ja. Mehrere EU-Länder haben Pflegemangel, mit Gehaltsunterschieden zwischen West- und Osteuropa von über 300%.' },
      { question: 'Wie gilt die EU-Lohntransparenzrichtlinie für Krankenhäuser?', answer: 'Öffentliche und private Krankenhäuser mit 100+ Mitarbeitern müssen die EU-Lohntransparenzrichtlinie einhalten.' },
    ],
    es: [
      { question: '¿Cuál es el salario promedio en sanidad en Europa?', answer: 'Los salarios sanitarios en Europa varían mucho: los médicos ganan €60.000–€150.000, las enfermeras €28.000–€55.000 brutos anuales.' },
      { question: '¿Qué país europeo paga más a los médicos?', answer: 'Suiza paga los salarios médicos más altos de Europa, con especialistas ganando €150.000–€250.000 brutos anuales.' },
      { question: '¿Hay escasez de enfermeras en Europa?', answer: 'Sí. Varios países de la UE enfrentan escasez de enfermeras, con diferencias salariales entre Europa occidental y oriental superiores al 300%.' },
      { question: '¿Cómo se aplica la Directiva de Transparencia Salarial de la UE a los hospitales?', answer: 'Los hospitales públicos y privados con 100+ empleados deben cumplir con la directiva de transparencia salarial de la UE.' },
    ],
  },
  legal: {
    en: [
      { question: 'What is the average lawyer salary in Europe?', answer: 'Lawyer salaries in Europe range from €45,000 to €120,000+ per year for mid-level to senior attorneys. Partners at major law firms in London, Luxembourg, and Zurich can earn €200,000–€500,000 or more.' },
      { question: 'Which country has the highest legal salaries in Europe?', answer: 'Switzerland and Luxembourg offer the highest base legal salaries in the EU. Large international law firms in these jurisdictions command premium rates due to cross-border financial and corporate work.' },
      { question: 'How does the EU Pay Transparency Directive affect law firms?', answer: 'Law firms with 100+ employees in the EU must comply with the directive. This is particularly significant given historical opacity in legal sector compensation and the known gender pay gap in law (women partners earn 20-30% less on average).' },
      { question: 'What is the gender pay gap in the legal profession in Europe?', answer: 'The legal profession has one of the larger gender pay gaps in Europe, averaging 18-25% across countries. This is driven by partnership structures and fewer women reaching senior partner level. The EU directive targets this through mandatory gap reporting.' },
    ],
    fr: [
      { question: 'Quel est le salaire moyen des avocats en Europe ?', answer: 'Les salaires des avocats en Europe vont de 45 000 € à 120 000 €+ par an pour des juristes de niveau intermédiaire à senior.' },
      { question: 'Quel pays a les salaires juridiques les plus élevés en Europe ?', answer: 'La Suisse et le Luxembourg offrent les salaires juridiques de base les plus élevés de l\'UE.' },
      { question: 'Comment la directive sur la transparence salariale affecte-t-elle les cabinets d\'avocats ?', answer: 'Les cabinets d\'avocats de 100+ employés dans l\'UE doivent se conformer à la directive, notable vu l\'opacité historique de la rémunération dans le secteur juridique.' },
      { question: 'Quel est l\'écart salarial entre les sexes dans la profession juridique en Europe ?', answer: 'La profession juridique a l\'un des plus grands écarts salariaux en Europe, en moyenne 18-25% entre pays.' },
    ],
    de: [
      { question: 'Was ist das durchschnittliche Anwaltsgehalt in Europa?', answer: 'Anwaltsgehälter in Europa liegen zwischen 45.000 € und 120.000 €+ pro Jahr für mittlere bis leitende Anwälte.' },
      { question: 'Welches Land hat die höchsten Rechtsgehälter in Europa?', answer: 'Die Schweiz und Luxemburg bieten die höchsten juristischen Grundgehälter in der EU.' },
      { question: 'Wie wirkt sich die EU-Lohntransparenzrichtlinie auf Anwaltskanzleien aus?', answer: 'Anwaltskanzleien mit 100+ Mitarbeitern in der EU müssen die Richtlinie einhalten, was angesichts der historischen Intransparenz bei der Vergütung bedeutsam ist.' },
      { question: 'Was ist der Gender Pay Gap in der Rechtsprofession in Europa?', answer: 'Der juristische Beruf hat einen der größten Gender Pay Gaps in Europa, durchschnittlich 18-25% zwischen Ländern.' },
    ],
    es: [
      { question: '¿Cuál es el salario promedio de los abogados en Europa?', answer: 'Los salarios de abogados en Europa oscilan entre €45.000 y €120.000+ al año para abogados de nivel medio a senior.' },
      { question: '¿Qué país tiene los salarios legales más altos en Europa?', answer: 'Suiza y Luxemburgo ofrecen los salarios base legales más altos de la UE.' },
      { question: '¿Cómo afecta la Directiva de Transparencia Salarial de la UE a los despachos de abogados?', answer: 'Los despachos con 100+ empleados en la UE deben cumplir con la directiva, notable dada la opacidad histórica en la compensación del sector legal.' },
      { question: '¿Cuál es la brecha salarial de género en la profesión legal en Europa?', answer: 'La profesión legal tiene una de las mayores brechas salariales de género en Europa, con una media del 18-25%.' },
    ],
  },
};

// Generic FAQ fallback for sectors without specific FAQs
export const genericFaqByLang: Record<string, Array<{ question: string; answer: string }>> = {
  en: [
    { question: `What is the average ${'{sector}'} salary in Europe?`, answer: `${'{sector}'} salaries in Europe range from €${'{low}'}K to €${'{high}'}K per year depending on role, experience, and country. Switzerland, Luxembourg, and the Nordic countries offer the highest compensation.` },
    { question: `Which European country pays ${'{sector}'} professionals the most?`, answer: 'Switzerland and Luxembourg consistently offer the highest salaries across most professional sectors in Europe, followed by Denmark, the Netherlands, and Germany.' },
    { question: `How does the EU Pay Transparency Directive affect ${'{sector}'} employers?`, answer: 'From June 2026, all EU employers with 100+ employees must publish salary ranges in job postings and report gender pay gaps. This applies across all sectors including this one.' },
    { question: `Where can I find verified ${'{sector}'} salary data for Europe?`, answer: 'EuroSalary.eu aggregates verified salary data from Eurostat, 50+ European job boards, and anonymous salary submissions. All data is updated monthly and covers 27 EU countries.' },
  ],
  fr: [
    { question: `Quel est le salaire moyen dans le secteur ${'{sector}'} en Europe ?`, answer: `Les salaires dans le secteur en Europe varient de ${'{low}'}K€ à ${'{high}'}K€ par an selon le poste, l'expérience et le pays.` },
    { question: `Quel pays européen paie le mieux les professionnels de ce secteur ?`, answer: 'La Suisse et le Luxembourg offrent systématiquement les salaires les plus élevés dans la plupart des secteurs professionnels en Europe.' },
    { question: `Comment la directive sur la transparence salariale affecte-t-elle les employeurs ?`, answer: 'À partir de juin 2026, tous les employeurs de l\'UE avec 100+ employés devront publier les fourchettes de salaires dans les offres d\'emploi.' },
    { question: `Où trouver des données salariales vérifiées pour ce secteur en Europe ?`, answer: 'EuroSalary.eu agrège des données salariales vérifiées d\'Eurostat, de plus de 50 sites d\'emploi européens et de rapports salariaux anonymes.' },
  ],
  de: [
    { question: `Was ist das durchschnittliche Gehalt in der ${'{sector}'}-Branche in Europa?`, answer: `Gehälter in dieser Branche in Europa liegen zwischen ${'{low}'}K€ und ${'{high}'}K€ pro Jahr.` },
    { question: `Welches europäische Land zahlt Fachleute dieser Branche am meisten?`, answer: 'Die Schweiz und Luxemburg bieten in den meisten Branchen in Europa durchweg die höchsten Gehälter.' },
    { question: `Wie wirkt sich die EU-Lohntransparenzrichtlinie auf Arbeitgeber dieser Branche aus?`, answer: 'Ab Juni 2026 müssen alle EU-Arbeitgeber mit 100+ Mitarbeitern Gehaltsranges in Stellenanzeigen veröffentlichen.' },
    { question: `Wo finde ich verifizierte Gehaltsdaten für diese Branche in Europa?`, answer: 'EuroSalary.eu aggregiert verifizierte Gehaltsdaten von Eurostat und über 50 europäischen Jobbörsen.' },
  ],
  es: [
    { question: `¿Cuál es el salario promedio en el sector ${'{sector}'} en Europa?`, answer: `Los salarios en este sector en Europa oscilan entre €${'{low}'}K y €${'{high}'}K al año según el puesto, experiencia y país.` },
    { question: `¿Qué país europeo paga más a los profesionales de este sector?`, answer: 'Suiza y Luxemburgo ofrecen sistemáticamente los salarios más altos en la mayoría de los sectores profesionales en Europa.' },
    { question: `¿Cómo afecta la Directiva de Transparencia Salarial de la UE a los empleadores de este sector?`, answer: 'A partir de junio de 2026, todos los empleadores de la UE con 100+ empleados deberán publicar rangos salariales en las ofertas de empleo.' },
    { question: `¿Dónde puedo encontrar datos salariales verificados para este sector en Europa?`, answer: 'EuroSalary.eu agrega datos salariales verificados de Eurostat y más de 50 bolsas de trabajo europeas.' },
  ],
};
