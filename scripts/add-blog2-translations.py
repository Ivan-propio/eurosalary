#!/usr/bin/env python3
"""Add 20 language translations to blog post #2 content field."""
import os

filepath = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'data', 'blog-posts.ts')

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Anchor: end of es content in blog post #2
anchor = 'nueva era de transparencia salarial.</p>`,\n    },\n  },'

idx = content.find(anchor)
if idx == -1:
    print("ERROR: Anchor not found!")
    exit(1)

print(f"Anchor found at position {idx}")

# We need to insert before the last two closing braces: },  },
# The anchor includes `,\n    },\n  },` which is the end of es content + close content obj + close blog post obj
# We want to insert BEFORE `\n    },\n  },` (before closing content and post)
# So we replace anchor with: es ending + new langs + closing

es_end = 'nueva era de transparencia salarial.</p>`,'

# All 20 translations as template literal strings
translations = '''

      it: `<h2>Cos'e la direttiva UE sulla trasparenza retributiva?</h2>
<p>La direttiva UE sulla trasparenza retributiva (Direttiva 2023/970) e una delle normative sul lavoro piu significative emerse da Bruxelles nell'ultimo decennio. Adottata nel maggio 2023, concede agli Stati membri dell'UE tempo fino al 7 giugno 2026 per recepire la direttiva nel diritto nazionale. Il suo obiettivo principale e semplice ma trasformativo: eliminare il divario retributivo di genere rendendo trasparenti le informazioni salariali in ogni fase del rapporto di lavoro.</p>
<p>Per i lavoratori, questo significa un accesso senza precedenti ai dati retributivi. Per i datori di lavoro, significa un cambiamento fondamentale nella gestione della retribuzione. E per piattaforme come EuroSalary, conferma la missione di rendere i dati salariali europei aperti e accessibili a tutti.</p>

<h2>Cosa cambia a giugno 2026</h2>
<p>La direttiva introduce diversi requisiti concreti che rimodelleranno il mercato del lavoro europeo:</p>
<ul>
  <li><strong>Fasce salariali negli annunci di lavoro:</strong> I datori di lavoro devono includere il livello retributivo iniziale o la fascia salariale in ogni annuncio di lavoro, o al piu tardi prima del primo colloquio.</li>
  <li><strong>Divieto di domande sullo storico retributivo:</strong> I datori di lavoro non possono piu chiedere ai candidati informazioni sul loro stipendio attuale o precedente durante il processo di selezione.</li>
  <li><strong>Diritto all'informazione:</strong> I dipendenti ottengono il diritto di richiedere e ricevere informazioni sui livelli retributivi medi, disaggregati per genere, per i lavoratori che svolgono lo stesso lavoro o un lavoro di pari valore.</li>
  <li><strong>Reportistica retributiva:</strong> Le aziende con piu di 100 dipendenti devono rendicontare i divari retributivi di genere. Annualmente per le aziende con 250+ dipendenti, ogni tre anni per quelle con 100-249.</li>
  <li><strong>Valutazioni retributive congiunte:</strong> Se la rendicontazione rivela un divario retributivo di genere del 5% o piu non giustificabile da criteri oggettivi e neutri rispetto al genere, i datori di lavoro devono condurre una valutazione retributiva congiunta con i rappresentanti dei lavoratori.</li>
</ul>

<h2>Impatto sui candidati</h2>
<p>Per chiunque cerchi lavoro in Europa, la direttiva rappresenta una svolta epocale. Non dovrai piu indovinare se una posizione paga 40.000 \u20ac o 70.000 \u20ac.</p>
<p>La direttiva permette ai candidati di:</p>
<ul>
  <li>Confrontare le fasce salariali tra diversi datori di lavoro prima di candidarsi</li>
  <li>Negoziare da una posizione di conoscenza piuttosto che di incertezza</li>
  <li>Identificare le aziende che pagano equamente rispetto a quelle che non lo fanno</li>
  <li>Prendere decisioni informate sul trasferimento in un altro paese dell'UE</li>
</ul>
<p>In combinazione con piattaforme come EuroSalary che aggregano dati salariali in tutto il continente, i candidati nel 2026 avranno piu informazioni sulla retribuzione che mai. Puoi gia esplorare gli stipendi per paese \u2014 ad esempio, scopri quanto guadagnano gli <a href="/en/salary/germany/software-engineer/">ingegneri del software in Germania</a> o <a href="/en/salary/france/software-engineer/">in Francia</a>.</p>

<h2>Impatto sui datori di lavoro</h2>
<p>Per le aziende, la direttiva crea sia sfide che opportunita. Le organizzazioni devono verificare le proprie strutture retributive, creare fasce salariali difendibili e prepararsi al controllo pubblico. Le aziende nei <a href="/en/country/netherlands/">Paesi Bassi</a> e nei paesi nordici, dove le norme sulla trasparenza sono gia solide, troveranno la transizione piu facile.</p>
<p>Passi chiave che i datori di lavoro dovrebbero compiere prima di giugno 2026:</p>
<ul>
  <li>Condurre un audit completo sull'equita retributiva</li>
  <li>Stabilire fasce salariali chiare e documentate per tutti i ruoli</li>
  <li>Formare i responsabili delle assunzioni sulle nuove regole</li>
  <li>Preparare l'infrastruttura di reportistica per le aziende con 100+ dipendenti</li>
  <li>Rivedere e aggiornare tutti i modelli di annunci di lavoro</li>
</ul>

<h2>Come EuroSalary aiuta nella nuova era della trasparenza</h2>
<p>EuroSalary e stato costruito sul principio che la trasparenza retributiva avvantaggia tutti. La nostra piattaforma aggrega dati da Eurostat, annunci di lavoro verificati e segnalazioni salariali anonime.</p>
<p>Esplora i dati salariali per qualsiasi paese e professione \u2014 dagli <a href="/en/salary/germany/software-engineer/">ingegneri del software in Germania</a> agli <a href="/en/salary/spain/software-engineer/">sviluppatori in Spagna</a> ai <a href="/en/salary/ireland/software-engineer/">professionisti tech in Irlanda</a>.</p>

<h2>Stato di attuazione per paese</h2>
<ul>
  <li><strong>Germania:</strong> Bozza legislativa pubblicata a gennaio 2026. <a href="/en/country/germany/">Vedi panoramica salariale della Germania</a>.</li>
  <li><strong>Francia:</strong> Basata sull'indice di uguaglianza professionale esistente. <a href="/en/country/france/">Vedi panoramica salariale della Francia</a>.</li>
  <li><strong>Paesi Bassi:</strong> Gia uno dei mercati piu trasparenti. <a href="/en/country/netherlands/">Vedi panoramica salariale dei Paesi Bassi</a>.</li>
  <li><strong>Spagna:</strong> Estensione dei requisiti di audit esistenti. <a href="/en/country/spain/">Vedi panoramica salariale della Spagna</a>.</li>
  <li><strong>Polonia:</strong> Redazione di nuova legislazione. <a href="/en/country/poland/">Vedi panoramica salariale della Polonia</a>.</li>
</ul>

<h2>Conclusione</h2>
<p>La direttiva UE sulla trasparenza retributiva rappresenta un cambiamento fondamentale nel funzionamento della retribuzione in tutta Europa. Entro giugno 2026, il segreto salariale sara un ricordo del passato per milioni di lavoratori europei. EuroSalary continuera a monitorare l'attuazione in tutti i 27 Stati membri e a fornire i dati necessari per navigare in questa nuova era di trasparenza retributiva.</p>`,

      pt: `<h2>O que e a Diretiva de Transparencia Salarial da UE?</h2>
<p>A Diretiva de Transparencia Salarial da UE (Diretiva 2023/970) e uma das pecas legislativas mais significativas em materia de emprego a sair de Bruxelas na ultima decada. Adotada em maio de 2023, concede aos Estados-Membros da UE ate 7 de junho de 2026 para transpor a diretiva para o direito nacional. O seu objetivo central e simples mas transformador: eliminar a disparidade salarial de genero tornando as informacoes salariais transparentes em todas as fases do emprego.</p>
<p>Para os trabalhadores, isto significa um acesso sem precedentes aos dados salariais. Para os empregadores, significa uma mudanca fundamental na forma como gerem a remuneracao. E para plataformas como a EuroSalary, valida a missao de tornar os dados salariais europeus abertos e acessiveis a todos.</p>

<h2>O que muda em junho de 2026</h2>
<p>A diretiva introduz varios requisitos concretos que vao remodelar o mercado de trabalho europeu:</p>
<ul>
  <li><strong>Faixas salariais nos anuncios de emprego:</strong> Os empregadores devem incluir o nivel salarial inicial ou a faixa salarial em cada anuncio de emprego, ou o mais tardar antes da primeira entrevista.</li>
  <li><strong>Proibicao de perguntas sobre historico salarial:</strong> Os empregadores nao podem perguntar aos candidatos sobre o seu salario atual ou anterior durante o recrutamento.</li>
  <li><strong>Direito a informacao:</strong> Os trabalhadores ganham o direito de solicitar e receber informacoes sobre niveis salariais medios, desagregados por genero.</li>
  <li><strong>Relatorios salariais:</strong> Empresas com mais de 100 trabalhadores devem reportar disparidades salariais de genero. Anualmente para empresas com 250+, a cada tres anos para 100-249.</li>
  <li><strong>Avaliacoes salariais conjuntas:</strong> Se os relatorios revelarem uma disparidade salarial de genero de 5% ou mais que nao possa ser justificada por criterios objetivos, os empregadores devem realizar uma avaliacao salarial conjunta com representantes dos trabalhadores.</li>
</ul>

<h2>Impacto nos candidatos a emprego</h2>
<p>Para quem procura emprego na Europa, a diretiva e uma mudanca radical. Sem mais adivinhacoes sobre se uma funcao paga 40.000 \u20ac ou 70.000 \u20ac.</p>
<p>A diretiva capacita os candidatos a:</p>
<ul>
  <li>Comparar faixas salariais entre empregadores antes de se candidatar</li>
  <li>Negociar a partir de uma posicao de conhecimento em vez de incerteza</li>
  <li>Identificar empresas que pagam de forma justa</li>
  <li>Tomar decisoes informadas sobre mudar-se para outro pais da UE</li>
</ul>
<p>Combinado com plataformas como a EuroSalary, os candidatos em 2026 terao mais informacoes sobre remuneracao do que nunca. Ja pode explorar salarios por pais \u2014 por exemplo, veja o que ganham os <a href="/en/salary/germany/software-engineer/">engenheiros de software na Alemanha</a> ou <a href="/en/salary/france/software-engineer/">em Franca</a>.</p>

<h2>Impacto nos empregadores</h2>
<p>Para as empresas, a diretiva cria tanto desafios como oportunidades. As organizacoes devem auditar as suas estruturas salariais, criar faixas salariais defensaveis e preparar-se para o escrutinio publico. As empresas nos <a href="/en/country/netherlands/">Paises Baixos</a> e nos paises nordicos encontrarao a transicao mais facil.</p>
<p>Passos-chave que os empregadores devem tomar antes de junho de 2026:</p>
<ul>
  <li>Realizar uma auditoria abrangente de equidade salarial</li>
  <li>Estabelecer faixas salariais claras e documentadas para todos os cargos</li>
  <li>Formar gestores de recrutamento sobre as novas regras</li>
  <li>Preparar infraestrutura de relatorios para empresas com 100+ trabalhadores</li>
  <li>Rever e atualizar todos os modelos de anuncios de emprego</li>
</ul>

<h2>Como a EuroSalary ajuda na nova era de transparencia</h2>
<p>A EuroSalary foi construida com base no principio de que a transparencia salarial beneficia todos. A nossa plataforma agrega dados do Eurostat, anuncios de emprego verificados e submissoes salariais anonimas.</p>
<p>Explore dados salariais para qualquer pais e profissao \u2014 desde <a href="/en/salary/germany/software-engineer/">engenheiros de software na Alemanha</a> a <a href="/en/salary/spain/software-engineer/">programadores em Espanha</a> e <a href="/en/salary/ireland/software-engineer/">profissionais tech na Irlanda</a>.</p>

<h2>Estado de implementacao por pais</h2>
<ul>
  <li><strong>Alemanha:</strong> Projeto de lei publicado em janeiro de 2026. <a href="/en/country/germany/">Ver panorama salarial da Alemanha</a>.</li>
  <li><strong>Franca:</strong> Baseando-se no indice de igualdade profissional existente. <a href="/en/country/france/">Ver panorama salarial da Franca</a>.</li>
  <li><strong>Paises Baixos:</strong> Ja um dos mercados mais transparentes. <a href="/en/country/netherlands/">Ver panorama salarial dos Paises Baixos</a>.</li>
  <li><strong>Espanha:</strong> Alargamento dos requisitos de auditoria existentes. <a href="/en/country/spain/">Ver panorama salarial da Espanha</a>.</li>
  <li><strong>Polonia:</strong> Elaboracao de nova legislacao. <a href="/en/country/poland/">Ver panorama salarial da Polonia</a>.</li>
</ul>

<h2>Conclusao</h2>
<p>A Diretiva de Transparencia Salarial da UE representa uma mudanca fundamental no funcionamento da remuneracao em toda a Europa. Ate junho de 2026, o segredo salarial sera coisa do passado para milhoes de trabalhadores europeus. EuroSalary continuara a acompanhar a implementacao em todos os 27 Estados-Membros e a fornecer os dados de que necessita para navegar nesta nova era de transparencia salarial.</p>`,

      nl: `<h2>Wat is de EU-richtlijn loontransparantie?</h2>
<p>De EU-richtlijn loontransparantie (Richtlijn 2023/970) is een van de meest significante arbeidsrechtelijke wetgevingen die de afgelopen tien jaar uit Brussel is gekomen. Aangenomen in mei 2023, geeft het EU-lidstaten tot 7 juni 2026 de tijd om de richtlijn om te zetten in nationaal recht. Het kerndoel is eenvoudig maar transformatief: de loonkloof tussen mannen en vrouwen elimineren door salarisinformatie transparant te maken in elke fase van het dienstverband.</p>
<p>Voor werknemers betekent dit ongekende toegang tot salarisgegevens. Voor werkgevers betekent het een fundamentele verschuiving in hoe zij met beloning omgaan. En voor platforms zoals EuroSalary bevestigt het de missie om Europese salarisgegevens open en toegankelijk te maken voor iedereen.</p>

<h2>Wat verandert er in juni 2026</h2>
<p>De richtlijn introduceert verschillende concrete vereisten die de Europese arbeidsmarkt zullen hervormen:</p>
<ul>
  <li><strong>Salarisschalen in vacatures:</strong> Werkgevers moeten het aanvangssalaris of de salarisschaal opnemen in elke vacature, of uiterlijk voor het eerste sollicitatiegesprek.</li>
  <li><strong>Verbod op vragen over salarisgeschiedenis:</strong> Werkgevers mogen kandidaten niet langer vragen naar hun huidige of eerdere salaris tijdens het wervingsproces.</li>
  <li><strong>Recht op informatie:</strong> Werknemers krijgen het recht om informatie op te vragen over gemiddelde beloningsniveaus, uitgesplitst naar geslacht.</li>
  <li><strong>Loonrapportage:</strong> Bedrijven met 100+ werknemers moeten rapporteren over loonverschillen tussen mannen en vrouwen. Jaarlijks voor 250+, elke drie jaar voor 100-249.</li>
  <li><strong>Gezamenlijke loonbeoordelingen:</strong> Als rapportage een loonkloof van 5% of meer aan het licht brengt die niet kan worden gerechtvaardigd, moeten werkgevers een gezamenlijke loonbeoordeling uitvoeren met werknemersvertegenwoordigers.</li>
</ul>

<h2>Impact op werkzoekenden</h2>
<p>Voor iedereen die een baan zoekt in Europa is de richtlijn een gamechanger. Geen giswerk meer of een functie \u20ac40.000 of \u20ac70.000 betaalt.</p>
<p>De richtlijn stelt kandidaten in staat om:</p>
<ul>
  <li>Salarisschalen bij werkgevers vergelijken voordat ze solliciteren</li>
  <li>Onderhandelen vanuit een positie van kennis in plaats van onzekerheid</li>
  <li>Bedrijven identificeren die eerlijk betalen</li>
  <li>Weloverwogen beslissingen nemen over verhuizen naar een ander EU-land</li>
</ul>
<p>Gecombineerd met platforms zoals EuroSalary zullen werkzoekenden in 2026 meer beloningsinformatie hebben dan ooit. U kunt nu al salarissen per land verkennen \u2014 bekijk wat <a href="/en/salary/germany/software-engineer/">software engineers in Duitsland</a> of <a href="/en/salary/france/software-engineer/">in Frankrijk</a> verdienen.</p>

<h2>Impact op werkgevers</h2>
<p>Voor bedrijven creert de richtlijn zowel uitdagingen als kansen. Organisaties moeten hun beloningsstructuren auditen en zich voorbereiden op publieke controle. Bedrijven in <a href="/en/country/netherlands/">Nederland</a> en de Noordse landen zullen de overgang gemakkelijker vinden.</p>
<p>Belangrijke stappen voor juni 2026:</p>
<ul>
  <li>Een uitgebreide loonaudit uitvoeren</li>
  <li>Duidelijke, gedocumenteerde salarisschalen vaststellen voor alle functies</li>
  <li>Hiring managers trainen in de nieuwe regels</li>
  <li>Rapportage-infrastructuur voorbereiden voor bedrijven met 100+ werknemers</li>
  <li>Alle vacaturesjablonen herzien en bijwerken</li>
</ul>

<h2>Hoe EuroSalary helpt in het nieuwe tijdperk van transparantie</h2>
<p>EuroSalary is gebouwd op het principe dat loontransparantie iedereen ten goede komt. Ons platform aggregeert gegevens van Eurostat, geverifieerde vacatures en anonieme salarisinzendingen.</p>
<p>Verken salarisgegevens voor elk land en beroep \u2014 van <a href="/en/salary/germany/software-engineer/">software engineers in Duitsland</a> tot <a href="/en/salary/spain/software-engineer/">ontwikkelaars in Spanje</a> tot <a href="/en/salary/ireland/software-engineer/">techprofessionals in Ierland</a>.</p>

<h2>Implementatiestatus per land</h2>
<ul>
  <li><strong>Duitsland:</strong> Conceptwetgeving gepubliceerd in januari 2026. <a href="/en/country/germany/">Bekijk Duitsland salarisoverzicht</a>.</li>
  <li><strong>Frankrijk:</strong> Voortbouwend op de bestaande gendergelijkheidsindex. <a href="/en/country/france/">Bekijk Frankrijk salarisoverzicht</a>.</li>
  <li><strong>Nederland:</strong> Al een van de meest transparante markten. <a href="/en/country/netherlands/">Bekijk Nederland salarisoverzicht</a>.</li>
  <li><strong>Spanje:</strong> Uitbreiding van bestaande auditvereisten. <a href="/en/country/spain/">Bekijk Spanje salarisoverzicht</a>.</li>
  <li><strong>Polen:</strong> Opstelling van nieuwe wetgeving. <a href="/en/country/poland/">Bekijk Polen salarisoverzicht</a>.</li>
</ul>

<h2>Conclusie</h2>
<p>De EU-richtlijn loontransparantie vertegenwoordigt een fundamentele verschuiving in hoe beloning werkt in heel Europa. Tegen juni 2026 zal salarisgeheimhouding tot het verleden behoren voor miljoenen Europese werknemers. EuroSalary zal de implementatie in alle 27 lidstaten blijven volgen en de gegevens leveren die u nodig heeft om dit nieuwe tijdperk van loontransparantie te navigeren.</p>`,

      pl: `<h2>Czym jest dyrektywa UE o przejrzystosci wynagrodzen?</h2>
<p>Dyrektywa UE o przejrzystosci wynagrodzen (Dyrektywa 2023/970) jest jednym z najwazniejszych aktow prawnych w dziedzinie zatrudnienia, ktore wyszly z Brukseli w ostatniej dekadzie. Przyjeta w maju 2023 roku, daje panstwom czlonkowskim UE czas do 7 czerwca 2026 roku na transpozycje dyrektywy do prawa krajowego. Jej glowny cel jest prosty, ale transformacyjny: wyeliminowac luke placowa miedzy plciami poprzez uczynienie informacji o wynagrodzeniach przejrzystymi na kazdym etapie zatrudnienia.</p>
<p>Dla pracownikow oznacza to bezprecedensowy dostep do danych o wynagrodzeniach. Dla pracodawcow oznacza to fundamentalna zmiane w sposobie zarzadzania wynagrodzeniami. A dla platform takich jak EuroSalary, potwierdza misje uczynienia europejskich danych o wynagrodzeniach otwartymi i dostepnymi dla wszystkich.</p>

<h2>Co zmienia sie w czerwcu 2026</h2>
<p>Dyrektywa wprowadza kilka konkretnych wymagan, ktore przeksztalca europejski rynek pracy:</p>
<ul>
  <li><strong>Przedzialy wynagrodzen w ofertach pracy:</strong> Pracodawcy musza umieszczac poczatkowy poziom wynagrodzenia lub przedzial wynagrodzenia w kazdej ofercie pracy, lub najpozniej przed pierwsza rozmowa kwalifikacyjna.</li>
  <li><strong>Zakaz pytan o historie wynagrodzen:</strong> Pracodawcy nie moga juz pytac kandydatow o ich aktualne lub poprzednie wynagrodzenie podczas rekrutacji.</li>
  <li><strong>Prawo do informacji:</strong> Pracownicy uzyskuja prawo do zadania i otrzymania informacji o srednich poziomach wynagrodzen, z podzialem na plec.</li>
  <li><strong>Sprawozdawczosc placowa:</strong> Firmy z ponad 100 pracownikami musza raportowac o lukach placowych miedzy plciami. Corocznie dla firm z 250+, co trzy lata dla 100-249.</li>
  <li><strong>Wspolne oceny wynagrodzen:</strong> Jesli sprawozdawczosc ujawni luke placowa w wysokosci 5% lub wiecej, pracodawcy musza przeprowadzic wspolna ocene wynagrodzen z przedstawicielami pracownikow.</li>
</ul>

<h2>Wplyw na osoby poszukujace pracy</h2>
<p>Dla kazdego, kto szuka pracy w Europie, dyrektywa to przelom. Koniec z zgadywaniem, czy stanowisko placi 40 000 \u20ac czy 70 000 \u20ac.</p>
<p>Dyrektywa umozliwia kandydatom:</p>
<ul>
  <li>Porownywanie przedzialow wynagrodzen u roznych pracodawcow przed zlozeniem aplikacji</li>
  <li>Negocjowanie z pozycji wiedzy, a nie niepewnosci</li>
  <li>Identyfikowanie firm, ktore placa sprawiedliwie</li>
  <li>Podejmowanie swiadomych decyzji o przeprowadzce do innego kraju UE</li>
</ul>
<p>W polaczeniu z platformami takimi jak EuroSalary, osoby poszukujace pracy w 2026 roku beda mialy wiecej informacji o wynagrodzeniach niz kiedykolwiek. Mozesz juz teraz eksplorowac wynagrodzenia wedlug krajow \u2014 sprawdz, ile zarabiaja <a href="/en/salary/germany/software-engineer/">inzynierowie oprogramowania w Niemczech</a> lub <a href="/en/salary/france/software-engineer/">we Francji</a>.</p>

<h2>Wplyw na pracodawcow</h2>
<p>Dla firm dyrektywa tworzy zarowno wyzwania, jak i mozliwosci. Organizacje musza zaudytowac swoje struktury placowe i przygotowac sie na publiczna kontrole. Firmy w <a href="/en/country/netherlands/">Holandii</a> i krajach nordyckich latwiej przejda transformacje.</p>
<p>Kluczowe kroki przed czerwcem 2026:</p>
<ul>
  <li>Przeprowadzenie kompleksowego audytu rownosci wynagrodzen</li>
  <li>Ustanowienie jasnych, udokumentowanych przedzialow placowych dla wszystkich stanowisk</li>
  <li>Przeszkolenie menedzerow ds. rekrutacji w zakresie nowych zasad</li>
  <li>Przygotowanie infrastruktury sprawozdawczej dla firm z ponad 100 pracownikami</li>
  <li>Przeglad i aktualizacja wszystkich szablonow ofert pracy</li>
</ul>

<h2>Jak EuroSalary pomaga w nowej erze przejrzystosci</h2>
<p>EuroSalary zostal zbudowany na zasadzie, ze przejrzystosc wynagrodzen korzystnie wplywa na wszystkich. Nasza platforma agreguje dane z Eurostatu, zweryfikowanych ofert pracy i anonimowych zgloszen wynagrodzen.</p>
<p>Eksploruj dane o wynagrodzeniach dla kazdego kraju i zawodu \u2014 od <a href="/en/salary/germany/software-engineer/">inzynierow oprogramowania w Niemczech</a> po <a href="/en/salary/spain/software-engineer/">programistow w Hiszpanii</a> i <a href="/en/salary/ireland/software-engineer/">specjalistow tech w Irlandii</a>.</p>

<h2>Stan wdrazania wedlug krajow</h2>
<ul>
  <li><strong>Niemcy:</strong> Projekt ustawy opublikowany w styczniu 2026. <a href="/en/country/germany/">Zobacz przeglad wynagrodzen w Niemczech</a>.</li>
  <li><strong>Francja:</strong> Budowanie na istniejacym indeksie rownosci zawodowej. <a href="/en/country/france/">Zobacz przeglad wynagrodzen we Francji</a>.</li>
  <li><strong>Holandia:</strong> Juz jeden z najbardziej przejrzystych rynkow. <a href="/en/country/netherlands/">Zobacz przeglad wynagrodzen w Holandii</a>.</li>
  <li><strong>Hiszpania:</strong> Rozszerzenie istniejacych wymagan audytowych. <a href="/en/country/spain/">Zobacz przeglad wynagrodzen w Hiszpanii</a>.</li>
  <li><strong>Polska:</strong> Opracowywanie nowej legislacji. <a href="/en/country/poland/">Zobacz przeglad wynagrodzen w Polsce</a>.</li>
</ul>

<h2>Podsumowanie</h2>
<p>Dyrektywa UE o przejrzystosci wynagrodzen stanowi fundamentalna zmiane w sposobie funkcjonowania wynagrodzen w calej Europie. Do czerwca 2026 roku tajemnica placowa stanie sie przeszloscia dla milionow europejskich pracownikow. EuroSalary bedzie nadal sledzic wdrazanie we wszystkich 27 panstwach czlonkowskich i dostarczac dane potrzebne do poruszania sie w tej nowej erze przejrzystosci wynagrodzen.</p>`,

      ro: `<h2>Ce este Directiva UE privind transparenta salariala?</h2>
<p>Directiva UE privind transparenta salariala (Directiva 2023/970) este una dintre cele mai semnificative acte legislative in materie de ocupare a fortei de munca aparute la Bruxelles in ultimul deceniu. Adoptata in mai 2023, acorda statelor membre ale UE termen pana la 7 iunie 2026 pentru a transpune directiva in legislatia nationala. Obiectivul sau central este simplu, dar transformator: eliminarea diferentei de remunerare intre femei si barbati prin transparentizarea informatiilor salariale in fiecare etapa a angajarii.</p>
<p>Pentru lucratori, aceasta inseamna un acces fara precedent la datele salariale. Pentru angajatori, inseamna o schimbare fundamentala in modul in care gestioneaza remunerarea. Iar pentru platforme precum EuroSalary, valideaza misiunea de a face datele salariale europene deschise si accesibile tuturor.</p>

<h2>Ce se schimba in iunie 2026</h2>
<p>Directiva introduce mai multe cerinte concrete care vor remodela piata muncii europene:</p>
<ul>
  <li><strong>Intervale salariale in anunturile de angajare:</strong> Angajatorii trebuie sa includa nivelul de remunerare initial sau intervalul salarial in fiecare anunt de angajare.</li>
  <li><strong>Interzicerea intrebarilor privind istoricul salarial:</strong> Angajatorii nu mai pot intreba candidatii despre salariul lor actual sau anterior.</li>
  <li><strong>Dreptul la informare:</strong> Angajatii obtin dreptul de a solicita si primi informatii despre nivelurile medii de remunerare, defalcate pe gen.</li>
  <li><strong>Raportarea salariala:</strong> Companiile cu peste 100 de angajati trebuie sa raporteze diferentele salariale de gen. Anual pentru cele cu 250+, la fiecare trei ani pentru 100-249.</li>
  <li><strong>Evaluari salariale comune:</strong> Daca raportarea releva o diferenta salariala de 5% sau mai mult nejustificata, angajatorii trebuie sa efectueze o evaluare salariala comuna cu reprezentantii lucratorilor.</li>
</ul>

<h2>Impactul asupra candidatilor</h2>
<p>Pentru oricine cauta un loc de munca in Europa, directiva este o schimbare radicala. Nu mai trebuie sa ghicesti daca un post plateste 40.000 \u20ac sau 70.000 \u20ac.</p>
<p>Directiva le permite candidatilor sa:</p>
<ul>
  <li>Compare intervalele salariale ale angajatorilor inainte de a aplica</li>
  <li>Negocieze dintr-o pozitie de cunoastere</li>
  <li>Identifice companiile care platesc corect</li>
  <li>Ia decizii informate cu privire la mutarea intr-o alta tara a UE</li>
</ul>
<p>Combinat cu platforme precum EuroSalary, candidatii in 2026 vor avea mai multe informatii despre remunerare ca niciodata. Puteti deja explora salariile pe tari \u2014 vedeti cat castiga <a href="/en/salary/germany/software-engineer/">inginerii de software in Germania</a> sau <a href="/en/salary/france/software-engineer/">in Franta</a>.</p>

<h2>Impactul asupra angajatorilor</h2>
<p>Pentru companii, directiva creeaza atat provocari, cat si oportunitati. Companiile din <a href="/en/country/netherlands/">Tarile de Jos</a> si tarile nordice vor gasi tranzitia mai usoara.</p>
<p>Pasi cheie inainte de iunie 2026:</p>
<ul>
  <li>Efectuarea unui audit complet al echitatii salariale</li>
  <li>Stabilirea unor grile salariale clare si documentate</li>
  <li>Instruirea managerilor de recrutare cu privire la noile reguli</li>
  <li>Pregatirea infrastructurii de raportare pentru companiile cu 100+ angajati</li>
  <li>Revizuirea si actualizarea tuturor sabloanelor de anunturi de angajare</li>
</ul>

<h2>Cum ajuta EuroSalary in noua era a transparentei</h2>
<p>EuroSalary a fost construit pe principiul ca transparenta salariala aduce beneficii tuturor. Platforma noastra agrega date de la Eurostat, anunturi de angajare verificate si raportari salariale anonime.</p>
<p>Explorati datele salariale pentru orice tara si profesie \u2014 de la <a href="/en/salary/germany/software-engineer/">ingineri de software in Germania</a> la <a href="/en/salary/spain/software-engineer/">programatori in Spania</a> si <a href="/en/salary/ireland/software-engineer/">profesionisti tech in Irlanda</a>.</p>

<h2>Stadiul implementarii pe tari</h2>
<ul>
  <li><strong>Germania:</strong> Proiect de lege publicat in ianuarie 2026. <a href="/en/country/germany/">Vezi prezentarea generala a salariilor din Germania</a>.</li>
  <li><strong>Franta:</strong> Se bazeaza pe indicele existent de egalitate profesionala. <a href="/en/country/france/">Vezi prezentarea generala a salariilor din Franta</a>.</li>
  <li><strong>Tarile de Jos:</strong> Deja una dintre cele mai transparente piete. <a href="/en/country/netherlands/">Vezi prezentarea generala a salariilor din Tarile de Jos</a>.</li>
  <li><strong>Spania:</strong> Extinderea cerintelor de audit existente. <a href="/en/country/spain/">Vezi prezentarea generala a salariilor din Spania</a>.</li>
  <li><strong>Polonia:</strong> Elaborarea unei noi legislatii. <a href="/en/country/poland/">Vezi prezentarea generala a salariilor din Polonia</a>.</li>
</ul>

<h2>Concluzie</h2>
<p>Directiva UE privind transparenta salariala reprezinta o schimbare fundamentala in modul in care functioneaza remunerarea in toata Europa. Pana in iunie 2026, secretul salarial va fi de domeniul trecutului pentru milioane de lucratori europeni. EuroSalary va continua sa urmareasca implementarea in toate cele 27 de state membre si sa furnizeze datele de care aveti nevoie pentru a naviga in aceasta noua era a transparentei salariale.</p>`,

      cs: `<h2>Co je smernice EU o transparentnosti odmenovani?</h2>
<p>Smernice EU o transparentnosti odmenovani (Smernice 2023/970) je jednim z nejvyznamnejsich pravnich predpisu v oblasti zamestnanosti za poslednich deset let. Prijata v kvetnu 2023, dava clenskym statum EU cas do 7. cervna 2026 na transpozici do vnitrostatniho prava. Jeji hlavni cil je jednoduchy, ale transformativni: odstranit rozdily v odmenovani zen a muzu transparentnosti platovych informaci v kazde fazi zamestnanosti.</p>
<p>Pro pracovniky to znamena bezprecedentni pristup k platovym datum. Pro zamestnavatele to znamena zasadni zmenu ve zpusobu rizeni odmenovani. A pro platformy jako EuroSalary to potvrzuje poslani zpristupnit evropska platova data vsem.</p>

<h2>Co se meni v cervnu 2026</h2>
<p>Smernice zavadi konkretnich pozadavku, ktere pretvoriva trh prace:</p>
<ul>
  <li><strong>Platova rozpeti v pracovnich inzeratech:</strong> Zamestnavatele musi uvest pocatecni uroven odmenovani nebo platove rozpeti v kazdem inzeratu.</li>
  <li><strong>Zakaz otazek na historii platu:</strong> Zamestnavatele se nesmeji ptat kandidatu na jejich soucasny nebo predchozi plat.</li>
  <li><strong>Pravo na informace:</strong> Zamestnanci mohou pozadovat informace o prumernych urovnich odmenovani clenenych podle pohlavi.</li>
  <li><strong>Platova spravozdajnost:</strong> Spolecnosti se 100+ zamestnanci musi podavat zpravy o rozdilech v odmenovani. Rocne pro 250+, kazdych tri let pro 100-249.</li>
  <li><strong>Spolecna hodnoceni odmenovani:</strong> Pokud spravozdajnost odhali rozdil 5 % nebo vice, musi zamestnavatele provest spolecne hodnoceni se zastupci zamestnancu.</li>
</ul>

<h2>Dopad na uchazece o praci</h2>
<p>Pro kohokoliv, kdo hleda praci v Evrope, je smernice zlomovym okamzikem. Uz zadne hadani, zda pozice plati 40 000 \u20ac nebo 70 000 \u20ac.</p>
<p>Smernice umoznuje kandidatum:</p>
<ul>
  <li>Porovnavat platova rozpeti u zamestnavatelu pred podanim prihlasky</li>
  <li>Vyjednavat z pozice znalosti misto nejistoty</li>
  <li>Identifikovat firmy, ktere plati spravedlive</li>
  <li>Cinit informovana rozhodnuti o prestehovani do jine zeme EU</li>
</ul>
<p>V kombinaci s platformami jako EuroSalary budou uchazeci v roce 2026 mit vice informaci nez kdykoli. Uz nyni muzete prozkoumavat platy \u2014 podivejte se, kolik vydelavaji <a href="/en/salary/germany/software-engineer/">softwarovi inzenyri v Nemecku</a> nebo <a href="/en/salary/france/software-engineer/">ve Francii</a>.</p>

<h2>Dopad na zamestnavatele</h2>
<p>Pro firmy smernice vytvari vyzvy i prilezitosti. Firmy v <a href="/en/country/netherlands/">Nizozemsku</a> a nordickych zemich najdou prechod jednodussi.</p>
<p>Klicove kroky pred cervnem 2026:</p>
<ul>
  <li>Provest komplexni audit rovnosti odmenovani</li>
  <li>Stanovit jasna, dokumentovana platova pasma</li>
  <li>Proskolit manazery naboru v novych pravidlech</li>
  <li>Pripravit infrastrukturu pro spravozdajnost u spolecnosti se 100+ zamestnanci</li>
  <li>Zkontrolovat a aktualizovat vsechny sablony pracovnich inzeratu</li>
</ul>

<h2>Jak EuroSalary pomaha v nove ere transparentnosti</h2>
<p>EuroSalary byl postaven na principu, ze transparentnost odmenovani prospiva vsem. Nase platforma agreguje data z Eurostatu, overenich inzeratu a anonymnich hlasenich o platech.</p>
<p>Prozkoumejte platova data pro jakoukoli zemi a profesi \u2014 od <a href="/en/salary/germany/software-engineer/">softwarovych inzenyru v Nemecku</a> po <a href="/en/salary/spain/software-engineer/">vyvojare ve Spanelsku</a> a <a href="/en/salary/ireland/software-engineer/">tech profesionaly v Irsku</a>.</p>

<h2>Stav implementace podle zemi</h2>
<ul>
  <li><strong>Nemecko:</strong> Navrh zakona zverejnen v lednu 2026. <a href="/en/country/germany/">Zobrazit prehled platu v Nemecku</a>.</li>
  <li><strong>Francie:</strong> Stavba na existujicim indexu profesni rovnosti. <a href="/en/country/france/">Zobrazit prehled platu ve Francii</a>.</li>
  <li><strong>Nizozemsko:</strong> Jiz jeden z nejtransparentnejsich trhu. <a href="/en/country/netherlands/">Zobrazit prehled platu v Nizozemsku</a>.</li>
  <li><strong>Spanelsko:</strong> Rozsireni existujicich auditorskych pozadavku. <a href="/en/country/spain/">Zobrazit prehled platu ve Spanelsku</a>.</li>
  <li><strong>Polsko:</strong> Priprava nove legislativy. <a href="/en/country/poland/">Zobrazit prehled platu v Polsku</a>.</li>
</ul>

<h2>Zaver</h2>
<p>Smernice EU o transparentnosti odmenovani predstavuje zasadni zmenu ve fungovani odmenovani v cele Evrope. Do cervna 2026 bude platove tajemstvi minulosti pro miliony evropskych pracovniku. EuroSalary bude nadale sledovat implementaci ve vsech 27 clenskych statech a poskytovat data pro navigaci v teto nove ere transparentnosti odmenovani.</p>`,

      sv: `<h2>Vad ar EU:s lonetransparensdirektiv?</h2>
<p>EU:s lonetransparensdirektiv (Direktiv 2023/970) ar en av de mest betydande arbetsrattsliga lagstiftningarna fran Bryssel under det senaste decenniet. Antaget i maj 2023 ger det EU:s medlemsstater till den 7 juni 2026 att implementera direktivet. Dess karnmal ar att eliminera loneskillnaden mellan konen genom att gora loneinformation transparent i varje steg av anstallningen.</p>
<p>For arbetstagare innebar detta oovertraffad tillgang till lonedata. For arbetsgivare innebar det en fundamental forandring i hur de hanterar ersattning. Och for plattformar som EuroSalary bekraftar det uppdraget att gora europeisk lonedata oppen och tillganglig for alla.</p>

<h2>Vad som andras i juni 2026</h2>
<p>Direktivet infor flera konkreta krav som kommer att omforma den europeiska arbetsmarknaden:</p>
<ul>
  <li><strong>Loneintervall i platsannonser:</strong> Arbetsgivare maste inkludera loneintervallet i varje platsannons, eller senast fore den forsta intervjun.</li>
  <li><strong>Forbud mot fragor om lonehistorik:</strong> Arbetsgivare far inte langre fraga kandidater om deras nuvarande eller tidigare lon.</li>
  <li><strong>Ratt till information:</strong> Anstallda far ratt att begara information om genomsnittliga lonenicvaer, uppdelade efter kon.</li>
  <li><strong>Lonerapportering:</strong> Foretag med 100+ anstallda maste rapportera om loneskillnader. Arligen for 250+, vart tredje ar for 100-249.</li>
  <li><strong>Gemensamma lonebedomningar:</strong> Om rapporteringen avsljar en loneskillnad pa 5 % eller mer, maste arbetsgivare genomfora en gemensam lonebedomning med arbetstagarrepresentanter.</li>
</ul>

<h2>Paverkan pa arbetssokande</h2>
<p>For alla som soker jobb i Europa ar direktivet en spelforandrare. Ingen mer gissning om en tjanst betalar 40 000 \u20ac eller 70 000 \u20ac.</p>
<p>Direktivet ger kandidater mojlighet att:</p>
<ul>
  <li>Jamfora loneintervall mellan arbetsgivare fore ansokan</li>
  <li>Forhandla fran en position av kunskap</li>
  <li>Identifiera foretag som betalar rattvist</li>
  <li>Fatta valgrundade beslut om att flytta till ett annat EU-land</li>
</ul>
<p>I kombination med plattformar som EuroSalary kommer arbetssokande 2026 att ha mer ersattningsinformation an nagonsin. Du kan redan utforska loner per land \u2014 se vad <a href="/en/salary/germany/software-engineer/">mjukvaruingenjorer tjanar i Tyskland</a> eller <a href="/en/salary/france/software-engineer/">i Frankrike</a>.</p>

<h2>Paverkan pa arbetsgivare</h2>
<p>For foretag skapar direktivet bade utmaningar och mojligheter. Foretag i <a href="/en/country/netherlands/">Nederlanderna</a> och de nordiska landerna kommer att finna overgangen enklare.</p>
<p>Viktiga steg fore juni 2026:</p>
<ul>
  <li>Genomfora en omfattande lonerattviserevision</li>
  <li>Fastalla tydliga, dokumenterade loneband for alla roller</li>
  <li>Utbilda rekryteringsansvariga i de nya reglerna</li>
  <li>Forbereda rapporteringsinfrastruktur for foretag med 100+ anstallda</li>
  <li>Se over och uppdatera alla platsannonsmallar</li>
</ul>

<h2>Hur EuroSalary hjalper i den nya transparenseran</h2>
<p>EuroSalary byggdes pa principen att lonetransparens gynnar alla. Var plattform aggregerar data fran Eurostat, verifierade platsannonser och anonyma loneinlamningar.</p>
<p>Utforska lonedata for alla lander och yrken \u2014 fran <a href="/en/salary/germany/software-engineer/">mjukvaruingenjorer i Tyskland</a> till <a href="/en/salary/spain/software-engineer/">utvecklare i Spanien</a> till <a href="/en/salary/ireland/software-engineer/">techproffs i Irland</a>.</p>

<h2>Implementeringsstatus per land</h2>
<ul>
  <li><strong>Tyskland:</strong> Lagforslag publicerat i januari 2026. <a href="/en/country/germany/">Se Tysklands loneoversikt</a>.</li>
  <li><strong>Frankrike:</strong> Bygger pa befintligt jamstalldhetindex. <a href="/en/country/france/">Se Frankrikes loneoversikt</a>.</li>
  <li><strong>Nederlanderna:</strong> Redan en av de mest transparenta marknaderna. <a href="/en/country/netherlands/">Se Nederlandernas loneoversikt</a>.</li>
  <li><strong>Spanien:</strong> Utvidgning av befintliga revisionskrav. <a href="/en/country/spain/">Se Spaniens loneoversikt</a>.</li>
  <li><strong>Polen:</strong> Utarbetande av ny lagstiftning. <a href="/en/country/poland/">Se Polens loneoversikt</a>.</li>
</ul>

<h2>Slutsats</h2>
<p>EU:s lonetransparensdirektiv representerar en fundamental forandring i hur ersattning fungerar i hela Europa. Till juni 2026 kommer lonehemligheter att tillhora det forgangna for miljontals europeiska arbetstagare. EuroSalary kommer att fortsatta folja implementeringen i alla 27 medlemsstater och tillhandahalla den data du behover for att navigera i denna nya era av lonetransparens.</p>`,

      da: `<h2>Hvad er EU-direktivet om loengennemsigtighed?</h2>
<p>EU-direktivet om loengennemsigtighed (Direktiv 2023/970) er en af de mest betydningsfulde arbejdsretlige love fra Bruxelles i det seneste arti. Vedtaget i maj 2023, dets kerneformal er at eliminere loenforskellen mellem koennene ved at goere loenoplysninger gennemsigtige i alle faser af ansaettelsen.</p>
<p>For arbejdstagere betyder dette hidtil uset adgang til loendata. For arbejdsgivere en fundamental aendring i haandtering af afloenning. Og for platforme som EuroSalary bekraefter det missionen om aabne europaeiske loendata.</p>

<h2>Hvad aendrer sig i juni 2026</h2>
<p>Direktivet indforer konkrete krav der vil omforme arbejdsmarkedet:</p>
<ul>
  <li><strong>Loenintervaller i jobopslag:</strong> Arbejdsgivere skal oplyse loenintervallet i hvert jobopslag.</li>
  <li><strong>Forbud mod spoergsmaal om loenhistorik:</strong> Arbejdsgivere maa ikke spoerge om nuvaerende eller tidligere loen.</li>
  <li><strong>Ret til information:</strong> Medarbejdere faar ret til oplysninger om gennemsnitlige loenniveauer opdelt efter koen.</li>
  <li><strong>Loenrapportering:</strong> Virksomheder med 100+ ansatte skal rapportere om loenforskelle. Aarligt for 250+, hvert tredje aar for 100-249.</li>
  <li><strong>Faelles loenvurderinger:</strong> Hvis rapporteringen afslorer en loenforskels paa 5 % eller mere, skal arbejdsgivere gennemfoere en faelles loenvurdering med medarbejderrepraesentanter.</li>
</ul>

<h2>Indvirkning paa jobsoegere</h2>
<p>For alle der soeger job i Europa er direktivet en gamechanger. Ikke mere gaetteri om en stilling betaler 40.000 \u20ac eller 70.000 \u20ac.</p>
<p>Direktivet giver kandidater mulighed for at:</p>
<ul>
  <li>Sammenligne loenintervaller hos arbejdsgivere</li>
  <li>Forhandle fra en position med viden</li>
  <li>Identificere virksomheder der betaler retfaerdigt</li>
  <li>Traeffe informerede beslutninger om at flytte til et andet EU-land</li>
</ul>
<p>Kombineret med platforme som EuroSalary vil jobsoegere i 2026 have mere information end nogensinde. Du kan allerede udforske loenninger per land \u2014 se hvad <a href="/en/salary/germany/software-engineer/">softwareingenioerer tjener i Tyskland</a> eller <a href="/en/salary/france/software-engineer/">i Frankrig</a>.</p>

<h2>Indvirkning paa arbejdsgivere</h2>
<p>For virksomheder skaber direktivet baade udfordringer og muligheder. Virksomheder i <a href="/en/country/netherlands/">Holland</a> og de nordiske lande vil finde overgangen lettere.</p>
<p>Vigtige skridt foer juni 2026:</p>
<ul>
  <li>Gennemfoere en loenlighedsrevision</li>
  <li>Etablere klare loenbaand for alle roller</li>
  <li>Uddanne ansaettelsesansvarlige i de nye regler</li>
  <li>Forberede rapporteringsinfrastruktur for virksomheder med 100+ ansatte</li>
  <li>Opdatere alle jobopslagsskabeloner</li>
</ul>

<h2>Hvordan EuroSalary hjaelper i den nye transparensaera</h2>
<p>EuroSalary er bygget paa princippet om at loengennemsigtighed gavner alle. Vores platform aggregerer data fra Eurostat, verificerede jobopslag og anonyme loenindberetninger.</p>
<p>Udforsk loendata for ethvert land og erhverv \u2014 fra <a href="/en/salary/germany/software-engineer/">softwareingenioerer i Tyskland</a> til <a href="/en/salary/spain/software-engineer/">udviklere i Spanien</a> til <a href="/en/salary/ireland/software-engineer/">techprofessionelle i Irland</a>.</p>

<h2>Implementeringsstatus per land</h2>
<ul>
  <li><strong>Tyskland:</strong> Lovudkast offentliggjort i januar 2026. <a href="/en/country/germany/">Se Tysklands loenoversigt</a>.</li>
  <li><strong>Frankrig:</strong> Bygger paa eksisterende ligestillingsindeks. <a href="/en/country/france/">Se Frankrigs loenoversigt</a>.</li>
  <li><strong>Holland:</strong> Allerede et af de mest gennemsigtige markeder. <a href="/en/country/netherlands/">Se Hollands loenoversigt</a>.</li>
  <li><strong>Spanien:</strong> Udvidelse af eksisterende revisionskrav. <a href="/en/country/spain/">Se Spaniens loenoversigt</a>.</li>
  <li><strong>Polen:</strong> Udarbejdelse af ny lovgivning. <a href="/en/country/poland/">Se Polens loenoversigt</a>.</li>
</ul>

<h2>Konklusion</h2>
<p>EU-direktivet om loengennemsigtighed repraesenterer en fundamental aendring i hvordan afloenning fungerer i hele Europa. Inden juni 2026 vil loenhemmeligheder vaere fortid for millioner af europaeiske arbejdstagere. EuroSalary vil fortsat foelge implementeringen i alle 27 medlemslande og levere de data du har brug for.</p>`,

      fi: `<h2>Mika on EU:n palkka-avoimuusdirektiivi?</h2>
<p>EU:n palkka-avoimuusdirektiivi (Direktiivi 2023/970) on yksi merkittavimmista tyolainsaadannoista Brysselista viimeisen vuosikymmenen aikana. Toukokuussa 2023 hyvaksytty direktiivi antaa jasenvaltiolla aikaa 7. kesakuuta 2026 asti saattaa se osaksi kansallista lainsaadantoa. Sen ydintavoite on poistaa sukupuolten palkkaero tekemalla palkkatiedoista lapinakyvat tyosuhteen jokaisessa vaiheessa.</p>
<p>Tyontekijoille tama tarkoittaa ennennakemattomia palkkatietoja. Tyonantajille perustavanlaatuista muutosta palkkauksen hallintaan. Ja EuroSalaryn kaltaisille alustoille se vahvistaa tehtavan tehda eurooppalaiset palkkatiedot avoimiksi ja kaikkien saataville.</p>

<h2>Mika muuttuu kesakuussa 2026</h2>
<p>Direktiivi tuo konkreettisia vaatimuksia jotka muokkaavat tyomarkkinoita:</p>
<ul>
  <li><strong>Palkkahaarukat tyopaikkailmoituksissa:</strong> Tyonantajien on sisallytettava palkkahaarukka jokaiseen ilmoitukseen.</li>
  <li><strong>Palkkahistoriakysymysten kielto:</strong> Tyonantajat eivat saa kysya ehdokkailta heidan aiemmasta palkastaan.</li>
  <li><strong>Oikeus tietoon:</strong> Tyontekijat saavat oikeuden pyytaa tietoja keskimaaraisista palkkatasoista sukupuolen mukaan.</li>
  <li><strong>Palkkaraportointi:</strong> Yli 100 tyontekijan yritykset raportoivat sukupuolten palkkaeroista. Vuosittain 250+, joka kolmas vuosi 100-249.</li>
  <li><strong>Yhteiset palkka-arvioinnit:</strong> Jos raportointi paljastaa 5 %:n tai suuremman palkkaeron, tyonantajien on tehtava yhteinen palkka-arviointi tyontekijoiden edustajien kanssa.</li>
</ul>

<h2>Vaikutus tyonhakijoihin</h2>
<p>Kaikille tyota etsiville direktiivi on kaanteentekeva. Ei enaa arvailua, maksaako tehtava 40 000 \u20ac vai 70 000 \u20ac.</p>
<p>Direktiivi mahdollistaa ehdokkaille:</p>
<ul>
  <li>Palkkahaarukoiden vertailun eri tyonantajien valilla</li>
  <li>Neuvottelun tiedon pohjalta</li>
  <li>Reilusti maksavien yritysten tunnistamisen</li>
  <li>Tietoon perustuvien patosten tekemisen toiseen EU-maahan muutosta</li>
</ul>
<p>Yhdistettyna EuroSalaryn kaltaisiin alustoihin tyonhakijoilla on 2026 enemmantietoa kuin koskaan. Voit tutkia palkkoja maittain \u2014 katso mita <a href="/en/salary/germany/software-engineer/">ohjelmistoinsinoorit ansaitsevat Saksassa</a> tai <a href="/en/salary/france/software-engineer/">Ranskassa</a>.</p>

<h2>Vaikutus tyonantajiin</h2>
<p>Yrityksille direktiivi luo seka haasteita etta mahdollisuuksia. Yritykset <a href="/en/country/netherlands/">Alankomaissa</a> ja Pohjoismaissa loytavat siirtyman helpommaksi.</p>
<p>Tarkeimmat toimet ennen kesakuuta 2026:</p>
<ul>
  <li>Kattavan palkkatasa-arvotarkastuksen suorittaminen</li>
  <li>Selkeiden palkkaluokkien maarittaminen kaikille tehtaville</li>
  <li>Rekrytointivastaavien kouluttaminen uusiin saantoihin</li>
  <li>Raportointinfrastruktuurin valmistelu yli 100 tyontekijan yrityksille</li>
  <li>Kaikkien tyopaikkailmoituspohjien paivittaminen</li>
</ul>

<h2>Miten EuroSalary auttaa uudella avoimuuden aikakaudella</h2>
<p>EuroSalary on rakennettu periaatteelle etta palkka-avoimuus hyodyttaa kaikkia. Alustamme kokoaa tietoja Eurostatista, varmennetuista ilmoituksista ja anonyymeista palkkailmoituksista.</p>
<p>Tutustu palkkatietoihin mista tahansa maasta ja ammatista \u2014 <a href="/en/salary/germany/software-engineer/">ohjelmistoinsinooreista Saksassa</a> <a href="/en/salary/spain/software-engineer/">kehittajiin Espanjassa</a> ja <a href="/en/salary/ireland/software-engineer/">tech-ammattilaisiin Irlannissa</a>.</p>

<h2>Taytantoonpanon tila maittain</h2>
<ul>
  <li><strong>Saksa:</strong> Lakiesitys julkaistu tammikuussa 2026. <a href="/en/country/germany/">Katso Saksan palkkakatsaus</a>.</li>
  <li><strong>Ranska:</strong> Olemassa olevan tasa-arvoindeksin pohjalle. <a href="/en/country/france/">Katso Ranskan palkkakatsaus</a>.</li>
  <li><strong>Alankomaat:</strong> Jo yksi lapinakyvimmista markkinoista. <a href="/en/country/netherlands/">Katso Alankomaiden palkkakatsaus</a>.</li>
  <li><strong>Espanja:</strong> Tarkastusvaatimusten laajentaminen. <a href="/en/country/spain/">Katso Espanjan palkkakatsaus</a>.</li>
  <li><strong>Puola:</strong> Uuden lainsaadannon valmistelu. <a href="/en/country/poland/">Katso Puolan palkkakatsaus</a>.</li>
</ul>

<h2>Yhteenveto</h2>
<p>EU:n palkka-avoimuusdirektiivi edustaa perustavanlaatuista muutosta palkkauksen toiminnassa Euroopassa. Kesakuuhun 2026 mennessa palkkasalaisuus on menneisyytta miljoonille eurooppalaisille tyontekijoille. EuroSalary jatkaa taytantoonpanon seurantaa kaikissa 27 jasenvaltiossa ja tarjoaa tarvittavat tiedot.</p>`,

      el: `<h2>Ti einai i Odigia tis EE gia ti Diafaneia ton Amoivon?</h2>
<p>I Odigia tis EE gia ti Diafaneia ton Amoivon (Odigia 2023/970) einai ena apo ta pio simantika nomotheseis ergasias apo tis Vryxelles tin teleftaia dekaetia. Egkritike ton Maio tou 2023, dinei sta krati meli prothesmia eos tis 7 Iouniou 2026. O stochos einai aplos alla metaschimatistikos: na exaleifthei to chasma amoivon metaxy ton fylon me diafaneia pliroforion misthodosias se kathe stadio tis apascholisis.</p>
<p>Gia tous ergazomenous auto simainei prosfati prosvasimo se dedomena misthon. Gia tous ergodotes themeliodi allagi stin diacheirisi amoivon. Kai gia platformes opos to EuroSalary epivevaionei tin apostoli diafanon evropaikon dedomenon misthon.</p>

<h2>Ti allazei ton Iounio tou 2026</h2>
<p>I odigia eisagei sygkekriemenes apaitiseis:</p>
<ul>
  <li><strong>Klimakes misthon stis aggelies ergasias:</strong> Oi ergodotes prepei na symperilamvanoun tin klimaka misthon se kathe aggelia.</li>
  <li><strong>Apagoreysi erotiseon gia istoriko misthon:</strong> Oi ergodotes den boroun na rotoun gia trecho i proigoumeno mistho.</li>
  <li><strong>Dikaioma stin pliroforisi:</strong> Oi ergazomenoi mporoun na zitoun pliroforis gia mesa epipeda amoivon ana fylo.</li>
  <li><strong>Anafora misthon:</strong> Etairies me 100+ ergazomenous prepei na anaferoun chasmata amoivon. Etisia gia 250+, kathe tria eti gia 100-249.</li>
  <li><strong>Koines axiologiseis:</strong> Ean yparchei chasma 5% i perissotero, oi ergodotes prepei na diexagoun koini axiologisi me ekprosopous ergazomenon.</li>
</ul>

<h2>Epiptosi stous anazitountes ergasia</h2>
<p>Gia opoiondipote anazita ergasia stin Evropi i odigia einai kathoristiki. Ochi allo mantepsimo ean mia thesi plironei 40.000 \u20ac i 70.000 \u20ac.</p>
<p>I odigia epitrepei stous ypopsifious na:</p>
<ul>
  <li>Synkrinoun klimakes misthon metaxy ergodoton</li>
  <li>Diapragmateountai apo thesi gnosis</li>
  <li>Anagnorisoun etairies pou plironoun dikaia</li>
  <li>Parnoun tekmiriomenes apofaseis gia metakoinisi se alli chora tis EE</li>
</ul>
<p>Se syndiasmo me to EuroSalary oi anazitountes to 2026 tha echoun perissoteres pliroforis apo pote. Exereunise misthous ana chora \u2014 des ti kerdisoyn oi <a href="/en/salary/germany/software-engineer/">michaniko logismikou sti Germania</a> i <a href="/en/salary/france/software-engineer/">sti Gallia</a>.</p>

<h2>Epiptosi stous ergodotes</h2>
<p>Gia tis etairies i odigia dimjourgi proklisis kai efkairies. Oi etairies stis <a href="/en/country/netherlands/">Kato Chores</a> kai tis Nordikes chores tha vroun ti metavasi efkoloteri.</p>
<p>Vasika vimata prin ton Iounio 2026:</p>
<ul>
  <li>Diexagogi axiologisis isotitas amoivon</li>
  <li>Kathierosi safon zonon misthon</li>
  <li>Ekpaidefsi ypefthynon proslipseon</li>
  <li>Proetoimasia ypodomi anaforas gia 100+ ergazomenous</li>
  <li>Enimerosi protypon aggelion ergasias</li>
</ul>

<h2>Pos voithaei to EuroSalary</h2>
<p>To EuroSalary chtistike me tin archi oti i diafaneia amoivon ofelei olous. I platforma sygkentronei dedomena apo Eurostat, aggelies kai anonymes ypovoles misthon.</p>
<p>Exerevniste dedomena gia opoiadipote chora kai epaggelma \u2014 apo <a href="/en/salary/germany/software-engineer/">michaniko sti Germania</a> eos <a href="/en/salary/spain/software-engineer/">programmatistes stin Ispania</a> kai <a href="/en/salary/ireland/software-engineer/">tech stin Irlandia</a>.</p>

<h2>Katastasi efarmogis ana chora</h2>
<ul>
  <li><strong>Germania:</strong> Schedio nomou ton Ianouario 2026. <a href="/en/country/germany/">Deite episkopisi Germanias</a>.</li>
  <li><strong>Gallia:</strong> Vasizetai ston yparxonta deikti isotitas. <a href="/en/country/france/">Deite episkopisi Gallias</a>.</li>
  <li><strong>Ollandia:</strong> Idi mia apo tis pio diafaneis agores. <a href="/en/country/netherlands/">Deite episkopisi Ollandias</a>.</li>
  <li><strong>Ispania:</strong> Epektasi apaitiseon elegchou. <a href="/en/country/spain/">Deite episkopisi Ispanias</a>.</li>
  <li><strong>Polonia:</strong> Nea nomothesia. <a href="/en/country/poland/">Deite episkopisi Polonias</a>.</li>
</ul>

<h2>Symperasma</h2>
<p>I Odigia tis EE gia ti Diafaneia ton Amoivon antiprosopevei themeliodi allagi stin amoivi se oli tin Evropi. Mechri ton Iounio 2026 to mystiko ton misthon tha einai parelthon gia ekatommyria ergazomenous. To EuroSalary tha synechisi na parakolouthei tin efarmogi se ola ta 27 krati meli.</p>`,

      hu: `<h2>Mi az EU beratalathatosagi iranyelve?</h2>
<p>Az EU beratalathatosagi iranyelve (2023/970 iranyelv) az elmult evtized egyik legjelentosebb foglalkoztatasi jogszabalya. 2023 majusaban elfogadva, 2026. junius 7-ig ad idot az EU tagallamainak az atultetesre. Fo celja egyszeru de atalakito: megszuntetni a nemek kozotti berkulonbseget a berinformaciok atlathatova tetelevel a foglalkoztatas minden szakaszaban.</p>
<p>A munkavallalok szamara peldatlan hozzaferest jelent a beradatokhoz. A munkaadok szamara alapveto valtozast a javadalmak kezeleseben. Es az EuroSalary szamara megerositi a kuldetest az europai beradatok nyiltta tetelere.</p>

<h2>Mi valtozik 2026 juniusaban</h2>
<p>Az iranyelv konkret kovetelmenyeket vezet be:</p>
<ul>
  <li><strong>Bersavok az allashipdetesekben:</strong> A munkaadoknak fel kell tuntetniuk a bersavot minden allashipdetesben.</li>
  <li><strong>Bertortenetre vonatkozo kerdesek tilalma:</strong> A munkaadok nem kerdezhetik meg a jelolteket a korabbi fizetesukrol.</li>
  <li><strong>Tajekoztatashoz valo jog:</strong> A munkavallalok kerhetik az atlagos berszinteket nemek szerint bontva.</li>
  <li><strong>Berjelentes:</strong> A 100 fonel tobbet foglalkoztato vallalatok kotelezottek jelentes tenni. Evente a 250+ fos, haromevente a 100-249 fos vallalatok.</li>
  <li><strong>Kozos berertekelesek:</strong> Ha 5%-os vagy nagyobb berkulonbseg van, a munkaadoknak kozos berertekeleseket kell vegezniuk.</li>
</ul>

<h2>Hatas az allaskeresokre</h2>
<p>Mindenki szamara aki Europaban keres munkat az iranyelv sorsdontos. Nincs tobb talalgatasa hogy egy pozicio 40 000 \u20ac-t vagy 70 000 \u20ac-t fizet-e.</p>
<p>Az iranyelv lehetove teszi a jeloltek szamara:</p>
<ul>
  <li>Bersavok osszehasonlitasa a munkaadok kozott</li>
  <li>Tudas alapjan targyalni</li>
  <li>Tisztessegesen fizeto vallalatok azonositasa</li>
  <li>Tajekozott dontesek masik EU-orszagba valo koltozesrol</li>
</ul>
<p>Az EuroSalaryval kombinava az allaskeresok 2026-ban tobb informacioval rendelkeznek mint valaha. Fedezze fel a fizeteseket orszagonkent \u2014 peldaul a <a href="/en/salary/germany/software-engineer/">szoftvermernokoket Nemetorszagban</a> vagy <a href="/en/salary/france/software-engineer/">Franciaorszagban</a>.</p>

<h2>Hatas a munkaadokra</h2>
<p>A vallalatok szamara kihivasokat es lehetosegeket teremt. Az <a href="/en/country/netherlands/">hollandiai</a> es eszaki vallalatok konnyebbnek fogjak talalni az atallast.</p>
<p>Kulcsfontossagu lepesek 2026 juniusa elott:</p>
<ul>
  <li>Atfogo beregyenlosegi audit</li>
  <li>Egyertelmu bersavok minden poziciora</li>
  <li>Toborzasi menedzserek kepzese</li>
  <li>Jelentesteli infrastruktura elokeszitese 100+ fos vallalatoknak</li>
  <li>Allashipdetesi sablonok frissitese</li>
</ul>

<h2>Hogyan segit az EuroSalary</h2>
<p>Az EuroSalary azon az elven epul hogy a beratlathatosag mindenkinek elonyos. Platformunk az Eurostat, ellenorzott allashipdetesek es anonim berjelentesek adatait aggregalja.</p>
<p>Fedezze fel a beradatokat barmely orszagra \u2014 a <a href="/en/salary/germany/software-engineer/">szoftvermernokoktol Nemetorszagban</a> a <a href="/en/salary/spain/software-engineer/">fejlesztokig Spanyolorszagban</a> es <a href="/en/salary/ireland/software-engineer/">tech szakemberekig Irorszagban</a>.</p>

<h2>Megvalositas allapota orszagonkent</h2>
<ul>
  <li><strong>Nemetorszag:</strong> Torvenyjavaslatot 2026 januarjaban tettek kozze. <a href="/en/country/germany/">Lasd nemet berattekintest</a>.</li>
  <li><strong>Franciaorszag:</strong> A meglevo egyenlosegi indexre epitve. <a href="/en/country/france/">Lasd francia berattekintest</a>.</li>
  <li><strong>Hollandia:</strong> Mar az egyik legatlathatobb piac. <a href="/en/country/netherlands/">Lasd holland berattekintest</a>.</li>
  <li><strong>Spanyolorszag:</strong> A meglevo auditkovetelmenyeket boviti. <a href="/en/country/spain/">Lasd spanyol berattekintest</a>.</li>
  <li><strong>Lengyelorszag:</strong> Uj jogszabaly kidolgozasa. <a href="/en/country/poland/">Lasd lengyel berattekintest</a>.</li>
</ul>

<h2>Osszegzes</h2>
<p>Az EU beratalathatosagi iranyelve alapveto valtozast kepvisel a javadalmak mukodest illetoen egesz Europaban. 2026 juniusara a bertitok a mult reszeve valik milliok europai munkavallalos szamara. EuroSalary tovabbra is nyomon koveti a megvalositast mind a 27 tagallamban.</p>`,

      sk: `<h2>Co je smernica EU o transparentnosti odmenovania?</h2>
<p>Smernica EU o transparentnosti odmenovania (Smernica 2023/970) je jednym z najvyznamnejsich pravnych predpisov v oblasti zamestnanosti za posledne desatocie. Prijata v maji 2023, dava clenskym statom EU cas do 7. juna 2026 na transpoziciu do vnutrostatneho prava. Jej ciel je odstranit rodovy rozdiel v odmenovani transparentnostou platovych informacii v kazdej faze zamestnanosti.</p>
<p>Pre pracovnikov to znamena bezprecedentny pristup k platovym udajom. Pre zamestnavatelov zasadnu zmenu v spravovani odmenovania. Pre platformy ako EuroSalary potvrdzuje poslanie spristupnit europske platove data vsetkym.</p>

<h2>Co sa meni v juni 2026</h2>
<p>Smernica zavadza konkretne poziadavky:</p>
<ul>
  <li><strong>Platove rozpatie v inzeratoch:</strong> Zamestnavatelia musia uviest platove rozpatie v kazdom inzerate.</li>
  <li><strong>Zakaz otazok o platovej historii:</strong> Zamestnavatelia nesmu pytat na sucasny ci predchadzajuci plat.</li>
  <li><strong>Pravo na informacie:</strong> Zamestnanci mozu pozadovat informacie o priemernych urovniach odmenovania podla pohlavia.</li>
  <li><strong>Platove vykazovanie:</strong> Spolocnosti so 100+ zamestnancami musia podavat spravy. Rocne pre 250+, kazdych tri roky pre 100-249.</li>
  <li><strong>Spolocne hodnotenia:</strong> Ak je rozdiel 5 % alebo viac, musia zamestnavatelia vykonat spolocne hodnotenie so zastupcami zamestnancov.</li>
</ul>

<h2>Dopad na uchadzacov</h2>
<p>Pre kohokovek kto hlada pracu v Europe je smernica zlomovym momentom. Uz ziadne hadanie ci pozicia plati 40 000 \u20ac alebo 70 000 \u20ac.</p>
<p>Smernica umoznuje kandidatom:</p>
<ul>
  <li>Porovnavat platove rozpatie</li>
  <li>Vyjednavat z pozicie vedomosti</li>
  <li>Identifikovat firmy ktore platia spravodlivo</li>
  <li>Robit informovane rozhodnutia o prestehovani</li>
</ul>
<p>V kombinacii s EuroSalary budu uchadzaci v 2026 mat viac informacii nez kedykolvek. Skumajte platy \u2014 pozrite sa kolko zarabaju <a href="/en/salary/germany/software-engineer/">softvarovi inzinieri v Nemecku</a> alebo <a href="/en/salary/france/software-engineer/">vo Francuzsku</a>.</p>

<h2>Dopad na zamestnavatelov</h2>
<p>Pre firmy smernica vytvara vyzvy aj prilezitosti. Firmy v <a href="/en/country/netherlands/">Holandsku</a> a nordickych krajinach najdu prechod jednoduchsi.</p>
<p>Klucove kroky pred junom 2026:</p>
<ul>
  <li>Audit rovnosti odmenovania</li>
  <li>Stanovit jasne platove pasma</li>
  <li>Preskolit manazerov naboru</li>
  <li>Pripravit infrastrukturu vykazovania pre 100+ zamestnancov</li>
  <li>Aktualizovat sablony inzeratov</li>
</ul>

<h2>Ako EuroSalary pomaha</h2>
<p>EuroSalary bol postaveny na principe ze transparentnost odmenovania prospeva vsetkym. Nasa platforma agreguje data z Eurostatu, overenych inzeratov a anonymnych hlaseni.</p>
<p>Preskumajte platove data \u2014 od <a href="/en/salary/germany/software-engineer/">softvarovych inzinierov v Nemecku</a> po <a href="/en/salary/spain/software-engineer/">vyvojarov v Spanielsku</a> a <a href="/en/salary/ireland/software-engineer/">tech profesionalov v Irsku</a>.</p>

<h2>Stav implementacie podla krajin</h2>
<ul>
  <li><strong>Nemecko:</strong> Navrh zakona v januari 2026. <a href="/en/country/germany/">Zobrazit prehlad Nemecka</a>.</li>
  <li><strong>Francuzsko:</strong> Na existujucom indexe rovnosti. <a href="/en/country/france/">Zobrazit prehlad Francuzska</a>.</li>
  <li><strong>Holandsko:</strong> Uz jeden z najtransparentnejsich trhov. <a href="/en/country/netherlands/">Zobrazit prehlad Holandska</a>.</li>
  <li><strong>Spanielsko:</strong> Rozsirenie auditorskych poziadaviek. <a href="/en/country/spain/">Zobrazit prehlad Spanielska</a>.</li>
  <li><strong>Polsko:</strong> Priprava novej legislativy. <a href="/en/country/poland/">Zobrazit prehlad Polska</a>.</li>
</ul>

<h2>Zaver</h2>
<p>Smernica EU o transparentnosti odmenovania predstavuje zasadnu zmenu vo fungovani odmenovania v Europe. Do juna 2026 bude platove tajomstvo minulostou pre miliony europskych pracovnikov. EuroSalary bude nadalej sledovat implementaciu vo vsetkych 27 clenskych statoch.</p>`,

      bg: `<h2>Kakvo e Direktivata na ES za prozrachnost na zaplashtaneto?</h2>
<p>Direktivata na ES za prozrachnost na zaplashtaneto (Direktiva 2023/970) e edin ot nay-znachiomite zakoni v oblastta na zaetostta ot Bryuksel prez poslednoto desatiletie. Prieta prez may 2023, tya dava srok do 7 yuni 2026 za transponirane v natsionalnoto zakonodatelstvo. Tselta e premahvane na razlikata v zaplashtaneto mezhdu polovete chrez prozrachnost na informatsiata za zaplatite.</p>
<p>Za rabotnitsite tova oznachava bezpretsedenten dostyp do danni za zaplatite. Za rabotodatelite fundamentalna promyana v upravlenieto na vuznagrazhdeniyata. Za platformi kato EuroSalary potvarzhda misiyata za otvoreni danni.</p>

<h2>Kakvo se promenya prez yuni 2026</h2>
<p>Direktivata vuvezhda konkretni iziskvaniya:</p>
<ul>
  <li><strong>Diapazoni na zaplatite v obyvite:</strong> Rabotodatelite tryabva da vklyuchat diapazona na zaplatata vuv vsyaka obyava.</li>
  <li><strong>Zabrana na vuprosi za istoriyata na zaplatite:</strong> Rabotodatelite ne mogat da pitaat za tekushtata ili predishnata zaplata.</li>
  <li><strong>Pravo na informatsiya:</strong> Sluzhitelite mogat da iskaat informatsiya za srednite niva na zaplashtane po pol.</li>
  <li><strong>Otchetnost:</strong> Kompaniite s nad 100 sluzhiteli dokladat za razlikite. Ezhegodno za 250+, na tri godini za 100-249.</li>
  <li><strong>Suvmestni otsenki:</strong> Pri razlika ot 5% ili poveche se provezdhda suvmestna otsenka s predstavitelite na rabotnitsite.</li>
</ul>

<h2>Vuzdeystviie vurhu turseshtite rabota</h2>
<p>Za vseki koyto tursi rabota v Evropa direktivata e predizvikatelstvo. Nyama poveche otgatvane dali pozitsiyata plashta 40 000 \u20ac ili 70 000 \u20ac.</p>
<p>Direktivata dava vuzmozhnost na kandidatite da:</p>
<ul>
  <li>Sravnyavat diapazonite na zaplatite</li>
  <li>Pregovarzyaat ot pozitsiya na znanie</li>
  <li>Identifitsirat spravedlivo plashtashti kompanii</li>
  <li>Vzemat informirani resheniya za preseelvane</li>
</ul>
<p>S platformi kato EuroSalary turseshtite prez 2026 shte imat poveche informatsiya ot kogato i da e bilo. Izsledvayte zaplatite po durzhavi \u2014 vizhte <a href="/en/salary/germany/software-engineer/">softuerni inzheneri v Germaniya</a> ili <a href="/en/salary/france/software-engineer/">vuv Frantsiya</a>.</p>

<h2>Vuzdeystviie vurhu rabotodatelite</h2>
<p>Za kompaniite direktivata suzdava predizvikatelstva i vuzmozhnosti. Kompaniite v <a href="/en/country/netherlands/">Niderlandiya</a> i nordicheskite durzhavi shte nameryat prehoda za po-leseen.</p>
<p>Klyuchovi stupki predi yuni 2026:</p>
<ul>
  <li>Otsenka na spravedlivostta na zaplashtaneto</li>
  <li>Ustanovyavane na yasni diapazoni na zaplatite</li>
  <li>Obuchenie na menidzhurite po nabirane</li>
  <li>Podgotovka na infrastruktura za otchetnost za 100+ sluzhiteli</li>
  <li>Aktualizatsiya na shablonite za obyavi</li>
</ul>

<h2>Kak EuroSalary pomaga</h2>
<p>EuroSalary e izgraden na printsipa che prozrachnostta na zaplashtaneto e ot polza za vsichki. Platformata agregira danni ot Eurostat, verificirani obyavi i anonimni dokladi.</p>
<p>Izsledvayte danni za vsyaka strana i profesiya \u2014 ot <a href="/en/salary/germany/software-engineer/">softuerni inzheneri v Germaniya</a> do <a href="/en/salary/spain/software-engineer/">razrabotchitsi v Ispaniya</a> i <a href="/en/salary/ireland/software-engineer/">tech v Irlandiya</a>.</p>

<h2>Sustoyanie na prilagane po durzhavi</h2>
<ul>
  <li><strong>Germaniya:</strong> Proekt na zakon prez yanuari 2026. <a href="/en/country/germany/">Vizhte pregled Germaniya</a>.</li>
  <li><strong>Frantsiya:</strong> Vurhu sushtestvuvashtiya indeks za ravenstvo. <a href="/en/country/france/">Vizhte pregled Frantsiya</a>.</li>
  <li><strong>Niderlandiya:</strong> Veche edin ot nay-prozrachnite pazari. <a href="/en/country/netherlands/">Vizhte pregled Niderlandiya</a>.</li>
  <li><strong>Ispaniya:</strong> Razshiryavane na iziskvaniyata za odit. <a href="/en/country/spain/">Vizhte pregled Ispaniya</a>.</li>
  <li><strong>Polsha:</strong> Novo zakonodatelstvo. <a href="/en/country/poland/">Vizhte pregled Polsha</a>.</li>
</ul>

<h2>Zaklyuchenie</h2>
<p>Direktivata na ES za prozrachnost na zaplashtaneto predstavlya fundamentalna promyana v tsyala Evropa. Do yuni 2026 taynatana zaplatite shte e minalo za milioni rabotnitsi. EuroSalary shte produlzhi da proslegyava prilaganeto vuv vsichkite 27 durzhavi chlenki.</p>`,

      hr: `<h2>Sto je Direktiva EU o transparentnosti placa?</h2>
<p>Direktiva EU o transparentnosti placa (Direktiva 2023/970) jedan je od najznacajnijih propisa o zaposljavanju iz Bruxellesa u posljednjem desetljecu. Usvojena u svibnju 2023., daje rok do 7. lipnja 2026. za transponiranje u nacionalno zakonodavstvo. Cilj je ukloniti razliku u placama medu spolovima transparentnoscu informacija o placama u svakoj fazi zaposlenja.</p>
<p>Za radnike to znaci nevidjeni pristup podacima o placama. Za poslodavce temeljnu promjenu u upravljanju naknadama. Za platforme poput EuroSalaryja potvrdjuje misiju otvorenih europskih podataka o placama.</p>

<h2>Sto se mijenja u lipnju 2026.</h2>
<p>Direktiva uvodi konkretne zahtjeve:</p>
<ul>
  <li><strong>Rasponi placa u oglasima:</strong> Poslodavci moraju ukljuciti raspon placa u svaki oglas za posao.</li>
  <li><strong>Zabrana pitanja o povijesti placa:</strong> Poslodavci ne smiju pitati o trenutnoj ili prijasnjoj placi.</li>
  <li><strong>Pravo na informacije:</strong> Zaposlenici mogu zatraziti informacije o prosjecnim razinama placa po spolu.</li>
  <li><strong>Izvjestavanje:</strong> Tvrtke s 100+ zaposlenika moraju izvjestavati. Godisnje za 250+, svake tri godine za 100-249.</li>
  <li><strong>Zajednicke procjene:</strong> Ako je razlika 5% ili vise, poslodavci moraju provesti zajednicku procjenu s predstavnicima radnika.</li>
</ul>

<h2>Utjecaj na trazitelje posla</h2>
<p>Za svakoga tko trazi posao u Europi direktiva je prekretnica. Nema vise nagadjanja placa li radno mjesto 40.000 \u20ac ili 70.000 \u20ac.</p>
<p>Direktiva omogucuje kandidatima da:</p>
<ul>
  <li>Usporede raspone placa kod poslodavaca</li>
  <li>Pregovaraju iz pozicije znanja</li>
  <li>Identificiraju tvrtke koje posteno placaju</li>
  <li>Donesu informirane odluke o preseljenju</li>
</ul>
<p>S platformama poput EuroSalaryja trazitelji posla ce 2026. imati vise informacija nego ikada. Istrazivajte place po zemljama \u2014 pogledajte koliko zaradjuju <a href="/en/salary/germany/software-engineer/">softverski inzenjeri u Njemackoj</a> ili <a href="/en/salary/france/software-engineer/">u Francuskoj</a>.</p>

<h2>Utjecaj na poslodavce</h2>
<p>Za tvrtke direktiva stvara izazove i prilike. Tvrtke u <a href="/en/country/netherlands/">Nizozemskoj</a> i nordijskim zemljama naci ce prijelaz laksim.</p>
<p>Kljucni koraci prije lipnja 2026.:</p>
<ul>
  <li>Revizija jednakosti placa</li>
  <li>Jasni rasponi placa za sva radna mjesta</li>
  <li>Obuka voditelja zaposljavanja</li>
  <li>Infrastruktura za izvjestavanje za 100+ zaposlenika</li>
  <li>Azuriranje predlozaka oglasa za posao</li>
</ul>

<h2>Kako EuroSalary pomaze</h2>
<p>EuroSalary je izgraden na nacelu da transparentnost placa koristi svima. Nasa platforma agregira podatke iz Eurostata, provjerenih oglasa i anonimnih prijava placa.</p>
<p>Istrazite podatke o placama za bilo koju zemlju \u2014 od <a href="/en/salary/germany/software-engineer/">softverskih inzenjera u Njemackoj</a> do <a href="/en/salary/spain/software-engineer/">programera u Spanjolskoj</a> i <a href="/en/salary/ireland/software-engineer/">tech strucnjaka u Irskoj</a>.</p>

<h2>Status provedbe po zemljama</h2>
<ul>
  <li><strong>Njemacka:</strong> Nacrt zakona u sijecnju 2026. <a href="/en/country/germany/">Pogledajte pregled Njemacke</a>.</li>
  <li><strong>Francuska:</strong> Na postojecem indeksu jednakosti. <a href="/en/country/france/">Pogledajte pregled Francuske</a>.</li>
  <li><strong>Nizozemska:</strong> Vec jedno od najtransparentnijih trzista. <a href="/en/country/netherlands/">Pogledajte pregled Nizozemske</a>.</li>
  <li><strong>Spanjolska:</strong> Prosirenje zahtjeva za reviziju. <a href="/en/country/spain/">Pogledajte pregled Spanjolske</a>.</li>
  <li><strong>Poljska:</strong> Izrada novog zakonodavstva. <a href="/en/country/poland/">Pogledajte pregled Poljske</a>.</li>
</ul>

<h2>Zakljucak</h2>
<p>Direktiva EU o transparentnosti placa predstavlja temeljnu promjenu u naknadama diljem Europe. Do lipnja 2026. tajna placa bit ce proslost za milijune europskih radnika. EuroSalary ce nastaviti pratiti provedbu u svih 27 drzava clanica.</p>`,

      sl: `<h2>Kaj je Direktiva EU o preglednosti plac?</h2>
<p>Direktiva EU o preglednosti plac (Direktiva 2023/970) je eden najpomembnejsih predpisov o zaposlovanju iz Bruslja v zadnjem desetletju. Sprejeta maja 2023, daje cas do 7. junija 2026 za prenos v nacionalno zakonodajo. Cilj je odpraviti razliko v placilu med spoloma z zagotavljanjem preglednosti informacij o placah na vsaki stopnji zaposlitve.</p>
<p>Za delavce to pomeni brezprecedencen dostop do podatkov o placah. Za delodajalce temeljno spremembo v upravljanju s placili. Za platforme kot je EuroSalary potrjuje poslanstvo odprtih evropskih podatkov o placah.</p>

<h2>Kaj se spreminja junija 2026</h2>
<p>Direktiva uvaja konkretne zahteve:</p>
<ul>
  <li><strong>Placni razponi v oglasih:</strong> Delodajalci morajo navesti placni razpon v vsakem oglasu za delo.</li>
  <li><strong>Prepoved vprasanj o preteklem placilu:</strong> Delodajalci ne smejo sprasevati o trenutnem ali preteklem placilu.</li>
  <li><strong>Pravica do informacij:</strong> Zaposleni lahko zahtevajo informacije o povprecnih placnih ravneh po spolu.</li>
  <li><strong>Porocanje:</strong> Podjetja s 100+ zaposlenimi morajo porocati. Letno za 250+, vsaka tri leta za 100-249.</li>
  <li><strong>Skupne ocene:</strong> Ce je razlika 5 % ali vec, morajo delodajalci izvesti skupno oceno s predstavniki delavcev.</li>
</ul>

<h2>Vpliv na iskalce zaposlitve</h2>
<p>Za vsakogar ki isce delo v Evropi je direktiva prelomnica. Ni vec ugibanja ali delovno mesto placa 40.000 \u20ac ali 70.000 \u20ac.</p>
<p>Direktiva kandidatom omogoca:</p>
<ul>
  <li>Primerjavo placnih razponov pri delodajalcih</li>
  <li>Pogajanja iz pozicije znanja</li>
  <li>Prepoznavanje podjetij ki posteno placujejo</li>
  <li>Informirane odlocitve o selitvi v drugo drzavo EU</li>
</ul>
<p>S platformami kot je EuroSalary bodo iskalci 2026 imeli vec informacij kot kadarkoli. Raziskujte place po drzavah \u2014 poglejte koliko zasluzijo <a href="/en/salary/germany/software-engineer/">programski inzenirji v Nemciji</a> ali <a href="/en/salary/france/software-engineer/">v Franciji</a>.</p>

<h2>Vpliv na delodajalce</h2>
<p>Za podjetja direktiva ustvarja izzive in priloznosti. Podjetja na <a href="/en/country/netherlands/">Nizozemskem</a> in v nordijskih drzavah bodo prehod lazje izvedla.</p>
<p>Kljucni koraki pred junijem 2026:</p>
<ul>
  <li>Revizija enakosti placil</li>
  <li>Jasni placni razponi za vsa delovna mesta</li>
  <li>Usposabljanje vodij zaposlovanja</li>
  <li>Infrastruktura za porocanje za 100+ zaposlenih</li>
  <li>Posodobitev predlog oglasov za delo</li>
</ul>

<h2>Kako EuroSalary pomaga</h2>
<p>EuroSalary je bil zgrajen na nacelu da preglednost plac koristi vsem. Nasa platforma agregira podatke iz Eurostata, preverjenih oglasov in anonimnih porocil o placah.</p>
<p>Razisite podatke o placah za katero koli drzavo \u2014 od <a href="/en/salary/germany/software-engineer/">programskih inzenirjev v Nemciji</a> do <a href="/en/salary/spain/software-engineer/">razvijalcev v Spaniji</a> in <a href="/en/salary/ireland/software-engineer/">tech strokovnjakov na Irskem</a>.</p>

<h2>Stanje izvajanja po drzavah</h2>
<ul>
  <li><strong>Nemcija:</strong> Osnutek zakona januarja 2026. <a href="/en/country/germany/">Oglejte si pregled Nemcije</a>.</li>
  <li><strong>Francija:</strong> Na obstoecem indeksu enakosti. <a href="/en/country/france/">Oglejte si pregled Francije</a>.</li>
  <li><strong>Nizozemska:</strong> Ze eno najtransparentnejsih trgov. <a href="/en/country/netherlands/">Oglejte si pregled Nizozemske</a>.</li>
  <li><strong>Spanija:</strong> Razsiritev revizijskih zahtev. <a href="/en/country/spain/">Oglejte si pregled Spanije</a>.</li>
  <li><strong>Poljska:</strong> Priprava nove zakonodaje. <a href="/en/country/poland/">Oglejte si pregled Poljske</a>.</li>
</ul>

<h2>Sklep</h2>
<p>Direktiva EU o preglednosti plac predstavlja temeljno spremembo v delovanju placil po Evropi. Do junija 2026 bo placna tajnost preteklost za milijone evropskih delavcev. EuroSalary bo se naprej spremljal izvajanje v vseh 27 drzavah clanicah.</p>`,

      lt: `<h2>Kas yra ES darbo uzmokescio skaidrumo direktyva?</h2>
<p>ES darbo uzmokescio skaidrumo direktyva (Direktyva 2023/970) yra vienas reiksmingiausiuu darbo teises aktu is Briuselio per pastaraji desiimtmeti. Priimta 2023 m. geguz, ji suteikia laiko iki 2026 m. birczelio 7 d. perkelti direktyva i nacionaline teise. Tikslas yra panaikinti lyciu darbo uzmokescio atotruki padaryant atlyginimo informacija skaidria kiekviename idarbinimo etape.</p>
<p>Darbuotojams tai reiskia beprecedenti prieiga prie atlyginimo duomenu. Darbdaviams esmine pokytis atlyginimo valdyme. Platformoms kaip EuroSalary patvirtina misija atviriu Europos atlyginimo duomenu.</p>

<h2>Kas keiciasi 2026 m. birzeli</h2>
<p>Direktyva iveda konkrecius reikalavimus:</p>
<ul>
  <li><strong>Atlyginimo diapazonai darbo skelbimuose:</strong> Darbdaviai privalo nurodyti atlyginimo diapazona kiekviename skelbime.</li>
  <li><strong>Draudimas klausti apie atlyginimo istorija:</strong> Darbdaviai negali klausti apie dabartini ar ankstesni atlyginima.</li>
  <li><strong>Teise i informacija:</strong> Darbuotojai gali prasyti informacijos apie vidutinius atlyginimo lygius pagal lyti.</li>
  <li><strong>Ataskaitos:</strong> Imones su 100+ darbuotoju turi teikti ataskaitas. Kasmet 250+, kas trejus metus 100-249.</li>
  <li><strong>Bendri vertinimai:</strong> Jei skirtumas yra 5 % ar daugiau, darbdaviai turi atlikti bendra vertinima su darbuotoju atstovais.</li>
</ul>

<h2>Poveikis darbo ieskotojams</h2>
<p>Visiems ieskantasiems darbo Europoje direktyva yra lemtingas posukis. Nebereikia speti ar pozicija moka 40 000 \u20ac ar 70 000 \u20ac.</p>
<p>Direktyva suteikia galimybe:</p>
<ul>
  <li>Palyginti atlyginimo diapazonus tarp darbdaviu</li>
  <li>Deretis is zinojimo pozicijos</li>
  <li>Identifikuoti teisingai mokancias imones</li>
  <li>Priimti informuotus sprendimus del persikraustymo</li>
</ul>
<p>Su EuroSalary darbo ieskootojai 2026 m. tures daugiau informacijos nei bet kada. Tyrinekite atlyginimus pagal salis \u2014 paziiurekite <a href="/en/salary/germany/software-engineer/">programines irangos inzinieriai Vokietijoje</a> arba <a href="/en/salary/france/software-engineer/">Prancuzijoje</a>.</p>

<h2>Poveikis darbdaviams</h2>
<p>Imonems direktyva kuria issukius ir galimybes. Imones <a href="/en/country/netherlands/">Olandijoje</a> ir Siaures salyse perejima ras lengvesni.</p>
<p>Pagrindiniai zingsniai iki 2026 m. birczelio:</p>
<ul>
  <li>Atlyginimo lygybes auditas</li>
  <li>Aiskios atlyginimo juostos visoms pareigoms</li>
  <li>Idarbinimo vadovu apmokymas</li>
  <li>Ataskaitu infrastruktura 100+ darbuotoju imonems</li>
  <li>Darbo skelbimu sablonu atnaujinimas</li>
</ul>

<h2>Kaip EuroSalary padeda</h2>
<p>EuroSalary sukurtas principu kad atlyginimo skaidrumas naudinas visiems. Platforma kaupia duomenis is Eurostato, patikrintu skelbimu ir anoniminiu prnesiimu.</p>
<p>Tyrinekite duomenis bet kuriai saliai \u2014 nuo <a href="/en/salary/germany/software-engineer/">inzinieriu Vokietijoje</a> iki <a href="/en/salary/spain/software-engineer/">kureju Ispanijoje</a> ir <a href="/en/salary/ireland/software-engineer/">tech specialistu Airijoje</a>.</p>

<h2>Igyvendinimo busena pagal salis</h2>
<ul>
  <li><strong>Vokietija:</strong> Istatymo projektas 2026 m. sausii. <a href="/en/country/germany/">Ziurekite Vokietijos apzvalga</a>.</li>
  <li><strong>Prancuzija:</strong> Ant esamo lygybes indekso. <a href="/en/country/france/">Ziurekite Prancuzijos apzvalga</a>.</li>
  <li><strong>Olandija:</strong> Jau viena skaidriausiuu rinku. <a href="/en/country/netherlands/">Ziurekite Olandijos apzvalga</a>.</li>
  <li><strong>Ispanija:</strong> Audito reikalavimu ispletimaas. <a href="/en/country/spain/">Ziurekite Ispanijos apzvalga</a>.</li>
  <li><strong>Lenkija:</strong> Naujas istatymas rengiamas. <a href="/en/country/poland/">Ziurekite Lenkijos apzvalga</a>.</li>
</ul>

<h2>Isvada</h2>
<p>ES darbo uzmokescio skaidrumo direktyva atspindi esmini pokytis atlyginimasi visoje Europoje. Iki 2026 m. birczelio atlyginimo paslaptis taps praeitimi milijonams darbuotoju. EuroSalary toles seks igyvendinima visose 27 valstybese narese.</p>`,

      lv: `<h2>Kas ir ES darba samaksas paredzamibas direktiva?</h2>
<p>ES darba samaksas paredzamibas direktiva (Direktiva 2023/970) ir viens no nozimigakajiem nodarbinatibas tiesibu aktiem no Briseles pedeja desmitgade. Pienemta 2023. gada maija, ta dod laiku lidz 2026. gada 7. junijam transponesanai. Merkis ir likvidet dzimumu darba samaksas atskiribu padarot informaciju par algam caurspidigu visos nodarbinatibas posmos.</p>
<p>Darbiniekiem tas nozime bezprecedenta pieeju algu datiem. Darba devejiem fundamentalas izmainas atalgojuma parvaldiba. Platformaam ka EuroSalary apstiprina misiju atvertiem Eiropas algu datiem.</p>

<h2>Kas mainisies 2026. gada junija</h2>
<p>Direktiva ievies konkretas prasibas:</p>
<ul>
  <li><strong>Algu diapazoni sludinajumos:</strong> Darba devejiem jaieklauj algu diapazons katra sludinajuma.</li>
  <li><strong>Aizliegums jautat par algu vesturi:</strong> Darba deveji nedrikst jautat par pasnreizejo vai iepriekssejo algu.</li>
  <li><strong>Tiesibas uz informaciju:</strong> Darbinieki var pieprasit informaciju par videjiem atalgojuma limeniem pec dzimuma.</li>
  <li><strong>Parskati:</strong> Uznemumiem ar 100+ darbiniekiem jaziino. Katru gadu 250+, reizi trijos gados 100-249.</li>
  <li><strong>Kopigas novertesanas:</strong> Ja atskiriiba ir 5 % vai vairak, japilda kopiga novertesana ar darbinieku parstavjiem.</li>
</ul>

<h2>Ietekme uz darba mekletajiem</h2>
<p>Visiem kas mekle darbu Eiropa direktiva ir izsskirossa. Vairs nav jaminee vai amats maksaa 40 000 \u20ac vai 70 000 \u20ac.</p>
<p>Direktiva dod iespeeju:</p>
<ul>
  <li>Saliddzinaat algu diapazonus pie darba devejiem</li>
  <li>Vest sarunas no zinasanu pozicijas</li>
  <li>Identificeet godiigus uznemumus</li>
  <li>Pienemt informetus lemumus par parsselesanu</li>
</ul>
<p>Ar EuroSalary darba mekletaji 2026. gadaa bus vairak informacijas neka jelkad. Izpetiet algas pec valstim \u2014 aplukojiet <a href="/en/salary/germany/software-engineer/">programmaturas inzenieri Vacija</a> vai <a href="/en/salary/france/software-engineer/">Francija</a>.</p>

<h2>Ietekme uz darba devejiem</h2>
<p>Uznemumiem direktiva rada izaicinajumus un iespejas. Uznemumi <a href="/en/country/netherlands/">Niiderlande</a> un Ziemelvalstis pareju atradis vienkarsaku.</p>
<p>Galvenie soli pirms 2026. gada junija:</p>
<ul>
  <li>Atalgojuma vienliidziibas audits</li>
  <li>Skaidras algu joslas visiem amatiem</li>
  <li>Personala atlases vaditaju apmaciba</li>
  <li>Parskatu infrastruktura 100+ darbinieku uznemumiem</li>
  <li>Sludinajumu veidnu atjauninasana</li>
</ul>

<h2>Ka EuroSalary paliddz</h2>
<p>EuroSalary veidots uz principa ka algu caurspidiba ir izdeviga visiem. Platforma apkopo datus no Eurostat, verificeetiem sludinajumiem un anonimiem ziinojumiem.</p>
<p>Izpeetiet algu datus jebkurai valstij \u2014 no <a href="/en/salary/germany/software-engineer/">programmaturas inzenieriem Vacija</a> lidz <a href="/en/salary/spain/software-engineer/">izstraadaatajiem Spanija</a> un <a href="/en/salary/ireland/software-engineer/">tech specialistiem Irija</a>.</p>

<h2>Ieviesanas statuss pa valstim</h2>
<ul>
  <li><strong>Vacija:</strong> Likumprojekts 2026. gada janvari. <a href="/en/country/germany/">Skatit Vacijas parskatu</a>.</li>
  <li><strong>Francija:</strong> Uz esossoo vienlidziibas indeksa. <a href="/en/country/france/">Skatit Francijas parskatu</a>.</li>
  <li><strong>Niiderlande:</strong> Jau viens no caurspidgaakajiem tirgiem. <a href="/en/country/netherlands/">Skatit Niiderlandes parskatu</a>.</li>
  <li><strong>Spanija:</strong> Audita prasibu papildinasana. <a href="/en/country/spain/">Skatit Spanijas parskatu</a>.</li>
  <li><strong>Polija:</strong> Jauna likumdosana izstraade. <a href="/en/country/poland/">Skatit Polijas parskatu</a>.</li>
</ul>

<h2>Secinajums</h2>
<p>ES darba samaksas paredzamibas direktiva parstaav fundamentalas izmainas atalgojuma darbiiba visa Eiropa. Lidz 2026. gada junijam algu noslepums bus pagaatne miljoniem darbinieku. EuroSalary turpinas sekot ieviesanai visaas 27 daliibvalstis.</p>`,

      et: `<h2>Mis on EL-i palgalapaistvuse direktiiv?</h2>
<p>EL-i palgalapaistvuse direktiiv (direktiiv 2023/970) on uks olulisemaid toohoiualaseid oigusakte Brusselist viimase kumne aasta jooksul. 2023. aasta mais vastu voetud, annab liikmesriikidele aega kuni 7. juunini 2026. Eesmark on kaotatada sooline palgalohe muutes palgateabe lapipaistvaks igal toosuhte etapil.</p>
<p>Tootajate jaoks tahendab see enneolematut juurdepasu palgaandmetele. Tooandjate jaoks poohimottelist muutust tasu haldamises. Platvormide nagu EuroSalary jaoks kinnitab see missiooni avatuks ja koigile kattesaadavaks.</p>

<h2>Mis muutub 2026. aasta juunis</h2>
<p>Direktiiv kehtestab konkreetsed nouded:</p>
<ul>
  <li><strong>Palgavahemikud tookuulutustes:</strong> Tooandjad peavad marka palgavahemiku igas kuulutuses.</li>
  <li><strong>Palgaajaloo kusimuste keeld:</strong> Tooandjad ei tohi kusida praeguse voi varasema palga kohta.</li>
  <li><strong>Oigus teabele:</strong> Tootajad saavad kusida keskmisi palgatasemeid soo jargi.</li>
  <li><strong>Aruandlus:</strong> Ule 100 tootajaga ettevotted peavad aruandma. Igaaastaselt 250+, iga kolme aasta tagant 100-249.</li>
  <li><strong>Uhised hindamised:</strong> Kui lohe on 5 % voi suurem, peavad tooandjad laabi viima uhise hindamise tootajate esindajatega.</li>
</ul>

<h2>Moju toootsijatele</h2>
<p>Koigile kes otsivad tood Euroopas on direktiiv murrangulise tahtsusega. Enam ei pea arvama kas ametikoht maksab 40 000 \u20ac voi 70 000 \u20ac.</p>
<p>Direktiiv voimaldab kandidaatidel:</p>
<ul>
  <li>Vorrellda palgavahemikke tooandjate vahel</li>
  <li>Labirakida teadmiste positsioonilt</li>
  <li>Tuvastada oiglaselt maksvaod ettevotteid</li>
  <li>Teha teadlikke otsuseid teise riiki kolimise kohta</li>
</ul>
<p>Koos EuroSalaryga on toootsijatel 2026. aastal rohkem teavet kui kunagi varem. Uurige palku riikide kaupa \u2014 vaadake <a href="/en/salary/germany/software-engineer/">tarkvarainseneri Saksamaal</a> voi <a href="/en/salary/france/software-engineer/">Prantsusmaal</a>.</p>

<h2>Moju tooandjatele</h2>
<p>Ettevotete jaoks loob direktiiv valjakutseid ja voimalusi. Ettevotted <a href="/en/country/netherlands/">Madalmaades</a> ja Pohjamaades leiavad uleiminekulihtsama.</p>
<p>Poohilised sammud enne 2026. aasta juunit:</p>
<ul>
  <li>Poohjalik palgavoirdsuse audit</li>
  <li>Selged palgavahemikud koigile ametikohtadele</li>
  <li>Varbamisjuhtide koolitamine</li>
  <li>Aruandluse infrastruktuur 100+ tootajaga ettevotetele</li>
  <li>Tookuulutuste mallide uuendamine</li>
</ul>

<h2>Kuidas EuroSalary aitab</h2>
<p>EuroSalary on ehitatud pohimoottel et palgalapaistvus toob kasu koigile. Platvorm koondab andmeid Eurostatist, kontrollitud kuulutustest ja anonuumsetest aruannetest.</p>
<p>Uurige palgaandmeid mis tahes riigi kohta \u2014 alates <a href="/en/salary/germany/software-engineer/">tarkvarainseneredest Saksamaal</a> kuni <a href="/en/salary/spain/software-engineer/">arendajateni Hispaanias</a> ja <a href="/en/salary/ireland/software-engineer/">tehnikaspetsialistideni Iirimaal</a>.</p>

<h2>Rakendamise staatus riikide kaupa</h2>
<ul>
  <li><strong>Saksamaa:</strong> Seaduseelnou 2026. aasta jaanuaris. <a href="/en/country/germany/">Vaadake Saksamaa ulevaated</a>.</li>
  <li><strong>Prantsusmaa:</strong> Olemasoleval voirdsuse indeksil. <a href="/en/country/france/">Vaadake Prantsusmaa ulevaated</a>.</li>
  <li><strong>Madalmaad:</strong> Juba uks lapaistvamaid turgusid. <a href="/en/country/netherlands/">Vaadake Madalmaade ulevaated</a>.</li>
  <li><strong>Hispaania:</strong> Auditinoouete laiendamine. <a href="/en/country/spain/">Vaadake Hispaania ulevaated</a>.</li>
  <li><strong>Poola:</strong> Uue seadusandluse koostamine. <a href="/en/country/poland/">Vaadake Poola ulevaated</a>.</li>
</ul>

<h2>Kokkuvote</h2>
<p>EL-i palgalapaistvuse direktiiv kujutab poohimottelist muutust tasustamise toimimises Euroopas. 2026. aasta juuniks on palgasaladus minevik miljonitele tootajatele. EuroSalary jagab rakendamise jalgimist koigis 27 liikmesriigis.</p>`,

      mt: `<h2>X'inhi d-Direttiva tal-UE dwar it-Trasparenza fil-Paga?</h2>
<p>Id-Direttiva tal-UE dwar it-Trasparenza fil-Paga (Direttiva 2023/970) hija wahda mill-aktar sinifikanti legizlazzjonijiet tal-impjieg minn Brussell fl-ahhar ghaxar snin. Adottata f'Mejju 2023, taghti sa 7 ta' Gunju 2026 biex tigi trasposta fil-ligi nazzjonali. L-ghan huwa l-eliminazzjoni tad-differenza fil-paga bejn is-sessi billi l-informazzjoni dwar is-salarji ssir trasparenti f'kull stadju tal-impjieg.</p>
<p>Ghal-haddiema dan ifisser access bla precedent ghad-data tas-salarji. Ghal-impjegaturi bidla fundamentali fil-kumpens. Ghal-pjattaformi bhal EuroSalary jivvalida l-missjoni ta' data miftuh.</p>

<h2>X'se jinbidel f'Gunju 2026</h2>
<p>Id-direttiva tintroduci rekwiziti konkreti:</p>
<ul>
  <li><strong>Skali tas-salarji f'avvizi:</strong> L-impjegaturi jridu jinkludu l-iskala f'kull avviz tax-xoghol.</li>
  <li><strong>Projbizzjoni ta' mistoqsijiet dwar l-istorja:</strong> L-impjegaturi ma jistghux jistaqsu dwar is-salarju attwali jew precedenti.</li>
  <li><strong>Dritt ghal-informazzjoni:</strong> L-impjegati jistghu jitolbu informazzjoni dwar il-livelli medji tal-paga skont is-sess.</li>
  <li><strong>Rappurtar:</strong> Kumpaniji b'100+ impjegat iridu jirrapurtaw. Kull sena ghall-250+, kull tliet snin ghall-100-249.</li>
  <li><strong>Valutazzjonijiet kongunti:</strong> Jekk id-differenza hija 5% jew aktar, irid isir valutazzjoni kongunta mar-rapprezentanti.</li>
</ul>

<h2>Impatt fuq min qed ifittex xoghol</h2>
<p>Ghal-kulhadd li qed ifittex xoghol fl-Ewropa d-direttiva hija tibdila radikali. M'hemmx aktar tentativi kemm thallas pozizzjoni \u2014 40,000 \u20ac jew 70,000 \u20ac.</p>
<p>Id-direttiva tippermetti lill-kandidati:</p>
<ul>
  <li>Iqabblu l-iskali bejn l-impjegaturi</li>
  <li>Jinnegozjaw minn pozizzjoni ta' gherf</li>
  <li>Jidentifikaw kumpaniji gusti</li>
  <li>Jiehdu decizjonijiet informati dwar trasferiment</li>
</ul>
<p>Ma' EuroSalary min ifittex xoghol fl-2026 se jkollu aktar informazzjoni minn qatt. Esplora salarji skont il-pajjiz \u2014 ara <a href="/en/salary/germany/software-engineer/">inginiera fil-Germanija</a> jew <a href="/en/salary/france/software-engineer/">fi Franza</a>.</p>

<h2>Impatt fuq l-impjegaturi</h2>
<p>Ghall-kumpaniji d-direttiva tohloq sfidi u opportunitajiet. Il-kumpaniji fl-<a href="/en/country/netherlands/">Olanda</a> u l-pajjizi Nordicvi se jsibu t-transizzjoni ehfef.</p>
<p>Passi ewlenin qabel Gunju 2026:</p>
<ul>
  <li>Awditu tal-ekwita fil-paga</li>
  <li>Skali ta' paga cari ghall-irwoli kollha</li>
  <li>Drilling tal-managers tar-reklutaeg</li>
  <li>Infrastruttura tar-rappurtar ghall-100+ impjegat</li>
  <li>Aggornament tal-mudelli tal-avvizi</li>
</ul>

<h2>Kif EuroSalary jghin</h2>
<p>EuroSalary nbena fuq il-principju li t-trasparenza tibbenefika lil-kulhadd. Il-pjattaforma tiggrega data minn Eurostat, avvizi verifikati u sottomissjonijiet anonimi.</p>
<p>Esplora d-data ghall-kwalunkwe pajjiz \u2014 minn <a href="/en/salary/germany/software-engineer/">inginiera fil-Germanija</a> sa <a href="/en/salary/spain/software-engineer/">zviluppaturi fi Spanja</a> u <a href="/en/salary/ireland/software-engineer/">tech fl-Irlanda</a>.</p>

<h2>Status tal-implimentazzjoni</h2>
<ul>
  <li><strong>Il-Germanija:</strong> Abbozz f'Jannar 2026. <a href="/en/country/germany/">Ara l-harsa tal-Germanija</a>.</li>
  <li><strong>Franza:</strong> Fuq l-indicci ezistenti. <a href="/en/country/france/">Ara l-harsa ta' Franza</a>.</li>
  <li><strong>L-Olanda:</strong> Diga wahda mill-aktar trasparenti. <a href="/en/country/netherlands/">Ara l-harsa tal-Olanda</a>.</li>
  <li><strong>Spanja:</strong> Estensjoni tar-rekwiziti. <a href="/en/country/spain/">Ara l-harsa ta' Spanja</a>.</li>
  <li><strong>Il-Polonja:</strong> Legizlazzjoni gdida. <a href="/en/country/poland/">Ara l-harsa tal-Polonja</a>.</li>
</ul>

<h2>Konkluzjoni</h2>
<p>Id-Direttiva tirraprezenta bidla fundamentali fil-pagi fl-Ewropa kollha. Sa Gunju 2026 is-segretezza se tkun passat ghal-miljuni ta' haddiema. EuroSalary se jkompli jsegwi l-implimentazzjoni fl-Istati Membri kollha 27.</p>`,

      ga: `<h2>Cad is Treoir an AE maidir le Trediheacht Pa?</h2>
<p>Is i Treoir an AE maidir le Trediheacht Pa (Treoir 2023/970) ceann de na piosai suntasacha reachtaiochta fostaiochta as an mBruiseil le deich mbliana anuas. Glactha i mBealtaine 2023, tugann si go dti an 7 Meitheamh 2026 chun i a thrasuiu ina ndli naisiunta. Is e an spreagchuspoir an bearnas pa inscne a dhiothui trid fhaisneis tuarastail a dheanamh trediheach ag gach ceim den fhostaiocht.</p>
<p>Do na hoibrithe ciallaionn se rochtain gan fasach ar shonrai tuarastail. Do na fostoiri athrui bunusach ar chuiteamh. D'ardain mar EuroSalary dearbhaionn se an misean sonrai oscailte.</p>

<h2>Cad a athraionn i Meitheamh 2026</h2>
<p>Tugann an treoir isteach ceanglais nithiula:</p>
<ul>
  <li><strong>Raoin tuarastail i bhfograiocht:</strong> Ni mor d'fhostoiri an raon tuarastail a chur san aireamh i ngach fogra poist.</li>
  <li><strong>Toirmeasc ar cheisteanna faoi stair tuarastail:</strong> Ni fheidir le fostoiri ceist a chur faoi thuarastal reatha no roimhe seo.</li>
  <li><strong>Ceart chun faisneis:</strong> Faigheann fostaithe ceart iarratas a dheanamh ar leibheil pa meanacha de reir inscne.</li>
  <li><strong>Tuairisciu:</strong> Ni mor do chuideachtai le 100+ tuairisciu. Go bliantail 250+, gach tri bliana 100-249.</li>
  <li><strong>Measunachtai comhphairteacha:</strong> Ma ta bearnas 5% no nios mo, ni mor measunacht chomhphairteach a dheanamh le hionadaithe oibrithe.</li>
</ul>

<h2>Tionchar ar chuardaitheoiri poist</h2>
<p>D'aon duine ag lorg poist san Eoraip is athrui cluiche e. Nil buille faoi thuairim an iocann post 40,000 \u20ac no 70,000 \u20ac.</p>
<p>Tugann an treoir cumhacht d'iarrthoir:</p>
<ul>
  <li>Raoin tuarastail a chur i gcomparaid</li>
  <li>Idirbheartaiocht o shuiomh eolais</li>
  <li>Cuideachtai coothromasacha a aithint</li>
  <li>Cinneadh eolacha a dheanamh faoi bhogadh</li>
</ul>
<p>Le EuroSalary beidh nios mo faisneis ag cuardaitheoiri in 2026 na riamh. Fiosraigh tuarastail de reir tire \u2014 feach <a href="/en/salary/germany/software-engineer/">innealtoir bogearra sa Ghearmain</a> no <a href="/en/salary/france/software-engineer/">sa Fhrainc</a>.</p>

<h2>Tionchar ar fhostoiri</h2>
<p>Do chuideachtai cruthionn an treoir dushshlain agus deiseanna. Cuideachtai san <a href="/en/country/netherlands/">Isiltir</a> agus sna tiortha Nordacha beidh an t-aistriu nios easa.</p>
<p>Ceimeanna roimh Mheitheamh 2026:</p>
<ul>
  <li>Iniiuchadh cothromas pa</li>
  <li>Bandai pa soileir do gach rol</li>
  <li>Oiliiunt bainisteoiri fostaiochta</li>
  <li>Bonneagar tuairiscithe do 100+ fostaiche</li>
  <li>Teimpleid fograiochta a nuashonru</li>
</ul>

<h2>Conas a chuidionn EuroSalary</h2>
<p>Togadh EuroSalary ar an bprionsabal go dtaireann trediheacht pa do chach. Bailionn an t-ardan sonrai o Eurostat, fograiocht fioraithe agus aighneachtai gan ainm.</p>
<p>Fiosraigh sonrai d'aon tir \u2014 o <a href="/en/salary/germany/software-engineer/">innealtoir sa Ghearmain</a> go <a href="/en/salary/spain/software-engineer/">forbaithe sa Spainn</a> agus <a href="/en/salary/ireland/software-engineer/">gairmithe teicneolaiochta in Eirinn</a>.</p>

<h2>Stadas cur chun feidhme de reir tire</h2>
<ul>
  <li><strong>An Ghearmain:</strong> Dreach reachtaiochta in Eanair 2026. <a href="/en/country/germany/">Feach forbhreathnui na Gearmaine</a>.</li>
  <li><strong>An Fhrainc:</strong> Ar an innacs comhionannais ata ann. <a href="/en/country/france/">Feach forbhreathnui na Fraince</a>.</li>
  <li><strong>An Isiltir:</strong> Ceann de na margai is trediheach. <a href="/en/country/netherlands/">Feach forbhreathnui na hIsiltire</a>.</li>
  <li><strong>An Spainn:</strong> Ceanglais iniiuchta a leathnui. <a href="/en/country/spain/">Feach forbhreathnui na Spainne</a>.</li>
  <li><strong>An Pholainn:</strong> Reachtaiocht nua a dhreachtu. <a href="/en/country/poland/">Feach forbhreathnui na Polainne</a>.</li>
</ul>

<h2>Concluid</h2>
<p>Is ionann Treoir an AE maidir le Trediheacht Pa agus athrui bunusach ar chuiteamh ar fud na hEorpa. Faoi Mheitheamh 2026 beidh rundiacht tuarastail ina rud on seanaimsir do na milliuin oibrithe Eorpacha. Leanfaidh EuroSalary de bheith ag rianu an chur chun feidhme i ngach ceann de na 27 mBallstat.</p>`,'''

new_replacement = es_end + translations + '''
    },
  },

  // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // 3. Best Countries for Tech Workers'''

content = content.replace(anchor, new_replacement, 1)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: 20 language content translations added to blog post #2")
