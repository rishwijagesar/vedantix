import { useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import BigFooter from "../components/BigFooter";
import HomeHero from "./HomeHero";
import HomePricing from "./HomePricing";
import HomeDemoSection from "./HomeDemoSection";
import HomeFounderSection from "./HomeFounderSection";
import ClientCasesSection from "../components/home/ClientCasesSection";
import "../styles/home.css";
import "../styles/home-hero.css";

const FITS = [
  "Kappers",
  "Restaurants",
  "Klusbedrijven",
  "Schoonheidssalons",
  "Fotografen",
  "ZZP'ers",
];

const PROMISES = [
  ["48u", "Snel eerste concept", "Geen lang traject of maanden wachten. Je hebt snel iets sterks om op te reageren en mee verder te bouwen."],
  ["€", "Duidelijke maandprijs", "Geen vaag gedoe met losse technische kosten. Je weet vooraf waar je aan toe bent."],
  ["✓", "Doorlopende ondersteuning", "Na livegang stopt het niet. Onderhoud, kleine updates en hulp blijven gewoon geregeld."],
];

const PROBLEMS = [
  ["🔍", "Je website overtuigt niet snel genoeg", "Bezoekers beslissen in seconden. Is je site onduidelijk of verouderd, dan haken ze af voordat ze bellen of appen."],
  ["📱", "Mobiel laat vaak kansen liggen", "Veel lokale klanten bekijken je website op hun telefoon. Als dat niet strak en duidelijk werkt, verlies je directe actie."],
  ["📞", "Te weinig sturing naar contact", "Zonder sterke call-to-actions verdwijnen bezoekers zonder reservering, aanvraag of WhatsApp-bericht."],
  ["🧩", "Na oplevering begint vaak het gedoe", "Veel ondernemers willen geen losse partijen, technische vragen of een website die daarna stilstaat."],
];

const PROOF_POINTS = [
  ["01", "Gebouwd voor lokale bedrijven", "De focus ligt op vertrouwen, contact en aanvragen. Niet op overbodige complexiteit."],
  ["02", "Van bezoeker naar actie", "Elke sectie stuurt op duidelijkheid: bellen, WhatsApp, offerte, reservering of intake."],
  ["03", "Geen losse oplevering", "Je krijgt niet alleen een website, maar ook onderhoud, ondersteuning en ruimte om door te groeien."],
];

const NICHE_OPTIONS = [
  {
    key: "kappers",
    icon: "✂️",
    name: "Kappers",
    problem: "Je wilt meer afspraken en een website die direct vertrouwen geeft.",
    bestFit: "Growth past vaak het best",
    href: "/website-kapper",
    title: "Meer afspraken, minder afhaken",
    text: "Voor kappers moet een website niet alleen mooi zijn, maar vooral snel vertrouwen opwekken en direct naar contact of afspraak leiden.",
    points: [
      "Duidelijke CTA’s voor bellen, WhatsApp of afspraak aanvragen",
      "Sterke eerste indruk die past bij je salon en doelgroep",
      "Ruimte voor behandelingen, tarieven, reviews en sfeer",
    ],
  },
  {
    key: "restaurants",
    icon: "🍽️",
    name: "Restaurants",
    problem: "Je wilt meer reserveringen en minder afhankelijk zijn van externe platforms.",
    bestFit: "Growth of Pro past vaak het best",
    href: "/website-restaurant",
    title: "Meer reserveringen via je eigen website",
    text: "Een restaurantwebsite moet sfeer neerzetten, maar vooral direct helpen bij reserveren, bellen en oriënteren.",
    points: [
      "Sterke menukaart-, sfeer- en contactsecties",
      "Duidelijke focus op reserveren en directe omzet",
      "Later uitbreidbaar met reserveringsflow of extra pagina’s",
    ],
  },
  {
    key: "klusbedrijven",
    icon: "🔨",
    name: "Klusbedrijven",
    problem: "Je wilt meer offerte-aanvragen en professioneler overkomen.",
    bestFit: "Growth past vaak het best",
    href: "/website-klusbedrijf",
    title: "Meer offerte-aanvragen uit je regio",
    text: "Voor klusbedrijven moet meteen duidelijk zijn wat je doet, waar je werkt en waarom iemand jou moet kiezen.",
    points: [
      "Sterke dienstenpagina’s en lokale zichtbaarheid",
      "Focus op offerte, bellen en snelle leadopvolging",
      "Meer vertrouwen bij nieuwe klanten",
    ],
  },
  {
    key: "schoonheidssalons",
    icon: "💅",
    name: "Schoonheidssalons",
    problem: "Je wilt meer boekingen met een rustige, luxe uitstraling.",
    bestFit: "Growth past vaak het best",
    href: "/website-salon",
    title: "Meer boekingen met een rustige, professionele uitstraling",
    text: "Voor salons moet je website kwaliteit uitstralen en soepel naar boeking of contact sturen.",
    points: [
      "Duidelijke behandelingen en contactopties",
      "Sterke mobiele ervaring voor snelle beslissers",
      "Minder chaos via losse DM’s en berichten",
    ],
  },
  {
    key: "fotografen",
    icon: "📸",
    name: "Fotografen",
    problem: "Je wilt portfolio en vertrouwen combineren met meer boekingen.",
    bestFit: "Growth past vaak het best",
    href: "/website-fotograaf",
    title: "Portfolio dat ook echt aanvragen oplevert",
    text: "Voor fotografen moet een website niet alleen mooi tonen wat je maakt, maar ook overtuigen om contact op te nemen.",
    points: [
      "Portfolio-opbouw met duidelijke CTA’s",
      "Professionelere indruk dan alleen social media",
      "Meer aanvragen voor shoots, events of opdrachten",
    ],
  },
  {
    key: "zzpers",
    icon: "🧑‍💼",
    name: "ZZP'ers",
    problem: "Je wilt professioneler overkomen en makkelijker klanten aantrekken.",
    bestFit: "Starter of Growth past vaak het best",
    href: "/website-zzp",
    title: "Een sterke eerste indruk zonder technisch gedoe",
    text: "Als zzp’er is je website vaak je eerste serieuze contactmoment. Die moet meteen duidelijk maken wat je doet en wat iemand kan verwachten.",
    points: [
      "Snelle professionele uitstraling",
      "Meer focus op leads, bellen of intake aanvragen",
      "Makkelijk later uit te breiden als je groeit",
    ],
  },
];

const COMPARE_OLD = [
  "Zelf tools, hosting en aanpassingen uitzoeken",
  "Tijd kwijt aan design, tekst en techniek",
  "Geen duidelijke opbouw richting contact of aanvraag",
  "Bij problemen zelf zoeken wie iets oplost",
  "Vaak goedkoop gestart, later alsnog duur en rommelig",
];

const COMPARE_NEW = [
  "Alles rondom je website geregeld vanuit één partij",
  "Gebouwd met focus op vertrouwen, contact en conversie",
  "Onderhoud en kleine updates blijven doorlopen",
  "Snelle communicatie zonder anoniem ticketsysteem",
  "Makkelijk op te schalen zodra je bedrijf groeit",
];

const OUTCOMES = [
  ["✔", "Meer vertrouwen", "Een website die professioneler overkomt en sneller serieus genomen wordt."],
  ["⚡", "Meer actie", "Meer kans op bellen, appen, reserveren of een aanvraag."],
  ["🛡️", "Meer rust", "Onderhoud, kleine wijzigingen en doorlopende ondersteuning blijven geregeld."],
];

const STEPS = [
  ["1", "Korte kennismaking", "We bespreken je bedrijf, doelgroep en wat je website praktisch moet opleveren."],
  ["2", "Concept en opbouw", "Je krijgt een sterke eerste richting die past bij jouw branche en uitstraling."],
  ["3", "Aanscherpen en live zetten", "We verwerken feedback, maken het scherp en zetten alles netjes live."],
  ["4", "Doorlopend verbeteren", "Na livegang blijven we beschikbaar voor onderhoud, updates en vervolgstappen."],
];

const TRUST_ITEMS = [
  "Gebouwd voor lokale ondernemers",
  "Duidelijke maandprijs",
  "Persoonlijk contact",
  "Onderhoud inbegrepen",
  "Snel opschaalbaar",
];

const FAQS = [
  [
    "Hoe snel kan mijn website live zijn?",
    "In veel gevallen staat de eerste sterke versie binnen 48 uur klaar. Daarna scherpen we die samen aan en zetten we hem live zodra de richting goed staat.",
  ],
  [
    "Moet ik zelf teksten en beelden aanleveren?",
    "Dat helpt, maar het hoeft niet perfect te zijn. We kunnen ook meedenken over structuur, richting en wat er vooral wél op moet staan om sneller te overtuigen.",
  ],
  [
    "Is dit geschikt als ik later meer wil?",
    "Ja. De opzet is juist bedoeld om later makkelijker uit te breiden met extra pagina’s, formulieren, reserveringen of andere functionaliteit.",
  ],
  [
    "Waarom werken jullie met een maandmodel?",
    "Omdat veel ondernemers vooral rust willen. Niet alleen een site die gebouwd wordt, maar ook iemand die hem blijft onderhouden en kleine dingen snel oppakt.",
  ],
];

const CTA_META = [
  "Vrijblijvende kennismaking",
  "Heldere maandprijs",
  "Onderhoud inbegrepen",
  "Snel contact via WhatsApp",
];

export default function Home() {
  const [selectedNiche, setSelectedNiche] = useState(NICHE_OPTIONS[0].key);

  const activeNiche = useMemo(
    () => NICHE_OPTIONS.find((item) => item.key === selectedNiche) || NICHE_OPTIONS[0],
    [selectedNiche]
  );

  return (
    <>
      <SEO
        title="Website laten maken voor lokale ondernemers | Vedantix"
        description="Binnen 48 uur een professionele website voor kappers, restaurants, klusbedrijven, salons, fotografen en zzp’ers. Gericht op meer aanvragen, minder gedoe en doorlopende ondersteuning."
        canonical="https://vedantix.nl/"
      />

      <div className="home-page">
        <NavBar />

        <main>
          <HomeHero />

          <div className="micro-proof">
            <div className="micro-proof-inner">
              <span className="micro-proof-label">Geschikt voor</span>
              {FITS.map((item) => (
                <span key={item} className="micro-proof-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <section className="section-shell">
            <div className="section-wrap">
              <div className="promise-grid">
                {PROMISES.map(([icon, title, text]) => (
                  <div key={title} className="promise-card">
                    <div className="promise-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ClientCasesSection />

          <section className="section-shell">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label">Het probleem</div>
                <h2 className="section-h2">Veel websites van lokale ondernemers laten onnodig klanten liggen</h2>
                <p className="section-p">
                  Niet omdat het bedrijf niet goed is, maar omdat de website te weinig vertrouwen geeft, te weinig richting biedt en daarna vaak stil blijft staan.
                </p>
              </div>

              <div className="problem-grid">
                {PROBLEMS.map(([icon, title, text]) => (
                  <div key={title} className="problem-card">
                    <div className="problem-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-shell alt">
            <div className="section-wrap">
              <div className="section-header center">
                <div className="section-label">Waarom Vedantix</div>
                <h2 className="section-h2">Geen technische rompslomp, maar een website die beter verkoopt</h2>
                <p className="section-p">
                  Vedantix is voor ondernemers die geen zin hebben in losse tools, lange trajecten of vage communicatie. Je krijgt snelheid, duidelijkheid en doorlopende ondersteuning.
                </p>
              </div>

              <div className="proof-grid">
                {PROOF_POINTS.map(([icon, title, text]) => (
                  <div key={title} className="proof-card">
                    <div className="proof-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-shell alt anchor-section" id="voor-wie">
            <div className="section-wrap">
              <div className="section-header center">
                <div className="section-label">Voor wie dit past</div>
                <h2 className="section-h2">Kies jouw branche en zie waar de meeste winst zit</h2>
                <p className="section-p">
                  Niet elke ondernemer heeft dezelfde website nodig. Kies je branche en zie direct welke richting meestal het beste aansluit.
                </p>
              </div>

              <div className="industry-grid">
                {NICHE_OPTIONS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`industry-card ${selectedNiche === item.key ? "active" : ""}`}
                    onClick={() => setSelectedNiche(item.key)}
                  >
                    <div className="industry-head">
                      <div className="industry-name">{item.name}</div>
                      <div className="industry-icon">{item.icon}</div>
                    </div>

                    <p className="industry-problem">{item.problem}</p>
                    <span className="industry-tag">{item.bestFit}</span>
                  </button>
                ))}
              </div>

              <div className="industry-highlight">
                <div className="industry-main">
                  <div className="section-label" style={{ marginBottom: 10 }}>
                    Voor {activeNiche.name.toLowerCase()}
                  </div>
                  <h3>{activeNiche.title}</h3>
                  <p>{activeNiche.text}</p>

                  <div className="bullet-list">
                    {activeNiche.points.map((point) => (
                      <div key={point} className="bullet-item">
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="industry-side">
                  <a href="#pricing" className="btn-lead">
                    Bekijk passende pakketten →
                  </a>
                  <a href={activeNiche.href} className="btn-outline">
                    Bekijk branchepagina →
                  </a>
                  <div className="industry-note">
                    De branchepagina’s helpen bezoekers zichzelf sneller herkennen en ondersteunen ook je SEO-structuur.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <HomeDemoSection />

          <section className="section-shell">
            <div className="section-wrap">
              <div className="section-header center">
                <div className="section-label">Vindbaarheid</div>
                <h2 className="section-h2">Niet alleen mooi, maar ook beter vindbaar</h2>
                <p className="section-p">
                  Een goede website moet niet alleen professioneel ogen, maar ook helpen om beter gevonden te worden in Google en lokaal meer zichtbaar te zijn.
                </p>
              </div>

              <div className="proof-grid">
                <div className="proof-card">
                  <div className="proof-icon">🔎</div>
                  <h3>Slimme SEO-basis</h3>
                  <p>We bouwen een duidelijke pagina-opbouw en inhoudsstructuur die helpt om beter gevonden te worden.</p>
                </div>

                <div className="proof-card">
                  <div className="proof-icon">📍</div>
                  <h3>Lokale vindbaarheid</h3>
                  <p>Voor lokale ondernemers is plaats + dienst belangrijk. Daar richten we de website-opbouw slim op in.</p>
                </div>

                <div className="proof-card">
                  <div className="proof-icon">📈</div>
                  <h3>Klaar voor groei</h3>
                  <p>De website blijft later makkelijk uitbreidbaar met extra pagina’s, FAQ’s, dienstenpagina’s of lokale landingspagina’s.</p>
                </div>
              </div>
            </div>
          </section>

          <HomePricing />

          <section className="section-shell alt">
            <div className="section-wrap">
              <div className="section-header center">
                <div className="section-label">De echte keuze</div>
                <h2 className="section-h2">Zelf puzzelen of alles in één keer goed geregeld hebben</h2>
                <p className="section-p">
                  De vergelijking is meestal niet met een goedkope builder. De echte vergelijking is of je alles zelf wilt uitzoeken of liever snel iets goeds neerzet met ondersteuning.
                </p>
              </div>

              <div className="compare-grid">
                <div className="compare-col old">
                  <h3>Zelf doen of losse tools combineren</h3>
                  {COMPARE_OLD.map((item) => (
                    <div key={item} className="compare-item">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="compare-col new">
                  <h3>Vedantix</h3>
                  {COMPARE_NEW.map((item) => (
                    <div key={item} className="compare-item">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-shell alt">
            <div className="section-wrap">
              <div className="section-header center">
                <div className="section-label">Na livegang</div>
                <h2 className="section-h2">Geen oplevering en klaar. Wij blijven betrokken.</h2>
                <p className="section-p">
                  Na livegang stopt het niet. We blijven actief met je meekijken, stellen verbeteringen voor en zorgen dat je website actueel en sterk blijft.
                </p>
              </div>

              <div className="proof-grid">
                <div className="proof-card">
                  <div className="proof-icon">01</div>
                  <h3>Periodiek contact</h3>
                  <p>We blijven regelmatig in gesprek om te kijken wat beter kan, wat je doelgroep nodig heeft en welke nieuwe wensen er zijn.</p>
                </div>

                <div className="proof-card">
                  <div className="proof-icon">02</div>
                  <h3>Continue optimalisatie</h3>
                  <p>Een website hoeft niet stil te staan na oplevering. We blijven kijken naar duidelijkheid, conversie en verbeterkansen.</p>
                </div>

                <div className="proof-card">
                  <div className="proof-icon">03</div>
                  <h3>Warme samenwerking</h3>
                  <p>We willen geen losse transactie, maar een relatie waarin we betrokken blijven en waarin klanten je later ook makkelijker aanbevelen.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-shell anchor-section" id="how">
            <div className="section-wrap">
              <div className="section-header center">
                <div className="section-label">Werkwijze</div>
                <h2 className="section-h2">Van eerste bericht naar live website in 4 heldere stappen</h2>
                <p className="section-p">
                  Geen vaag proces. Je weet vooraf hoe we werken, wat je kunt verwachten en hoe snel we kunnen schakelen.
                </p>
              </div>

              <div className="steps-wrap">
                {STEPS.map(([number, title, text]) => (
                  <div key={number} className="step-card">
                    <div className="step-no">{number}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-shell alt">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label">Wat dit oplevert</div>
                <h2 className="section-h2">Meer vertrouwen, meer actie en minder gedoe</h2>
                <p className="section-p">
                  Een goede website moet niet alleen netjes ogen. Hij moet iemand overtuigen om contact op te nemen, te reserveren of een aanvraag te sturen.
                </p>
              </div>

              <div className="outcome-grid">
                {OUTCOMES.map(([icon, title, text]) => (
                  <div key={title} className="outcome-card">
                    <div className="outcome-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <HomeFounderSection />

          <div className="trust-strip">
            <div className="trust-strip-inner">
              {TRUST_ITEMS.map((item) => (
                <div key={item} className="trust-chip">
                  <span style={{ color: "#22c55e" }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <section className="section-shell">
            <div className="section-wrap">
              <div className="lead-box">
                <div>
                  <div className="lead-badge">Gratis · vrijblijvend</div>
                  <div className="lead-title">Ontvang een eerlijke scan van je huidige website</div>
                  <p className="lead-text">
                    We laten concreet zien waar winst zit in duidelijkheid, uitstraling, mobiele gebruikservaring en call-to-actions. Geen vaag advies, maar punten waar je echt iets aan hebt.
                  </p>
                </div>

                <div className="lead-side">
                  <h3>Wat je terugkrijgt</h3>
                  <p>Een korte, duidelijke beoordeling met verbeterpunten waar je direct mee verder kunt.</p>
                  <ul>
                    <li>Heldere feedback op je eerste indruk</li>
                    <li>Verbeterpunten voor mobiel en CTA’s</li>
                    <li>Reactie binnen 24 uur</li>
                  </ul>
                  <a
                    href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20website%20scan."
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wa"
                  >
                    Vraag gratis website scan aan →
                  </a>
                  <div className="lead-note">Helemaal vrijblijvend. Geen verplichtingen.</div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-shell alt">
            <div className="section-wrap">
              <div className="urgency-wrap">
                <div className="urgency-box">
                  <div className="urgency-badge">Beperkte capaciteit</div>
                  <h3>We werken bewust met een beperkt aantal trajecten tegelijk</h3>
                  <div className="spots">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className={`spot ${item <= 3 ? "full" : "open"}`} />
                    ))}
                  </div>
                  <p>
                    Zo blijft er ruimte voor snelle communicatie, kwaliteit in de uitwerking en aandacht na livegang. Dat werkt beter dan zoveel mogelijk projecten tegelijk aannemen.
                  </p>
                </div>

                <div className="guarantee-card">
                  <h3>Geen druk, wel duidelijkheid</h3>
                  <p>
                    Eerst bespreken we wat bij jouw bedrijf past. Daarna beslis jij rustig of je verder wilt. Het doel is een website die echt bijdraagt aan je bedrijf, niet een snelle verkoop om het verkopen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-shell">
            <div className="section-wrap">
              <div className="section-header center">
                <div className="section-label">Veelgestelde vragen</div>
                <h2 className="section-h2">Praktische vragen, direct beantwoord</h2>
                <p className="section-p">
                  Juist bij een eerste websiteproject wil je vooraf weten hoe snel het gaat, wat je zelf moet doen en hoe flexibel het later nog is.
                </p>
              </div>

              <div className="faq-grid">
                {FAQS.map(([question, answer]) => (
                  <div key={question} className="faq-card">
                    <h3>{question}</h3>
                    <p>{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="cta" className="cta-section anchor-section">
            <div className="cta-inner">
              <h2>Klaar voor een website die wél vertrouwen wekt en actie uitlokt?</h2>
              <p>
                Plan een vrijblijvende kennismaking en ontdek welke richting, stijl en opbouw het beste past bij jouw bedrijf.
              </p>

              <div className="cta-actions">
                <a
                  href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20kennismaking%20voor%20mijn%20website."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-dark"
                >
                  Plan gratis kennismaking →
                </a>

                <a
                  href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20heb%20een%20vraag%20over%20een%20website."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa"
                >
                  Stel je vraag via WhatsApp
                </a>

                <a href="#voor-wie" className="btn-ghost">
                  Bekijk wat bij jou past →
                </a>
              </div>

              <div className="cta-meta">
                {CTA_META.map((item) => (
                  <div key={item} className="cta-meta-item">
                    <span style={{ color: "#22c55e" }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="cta-phone">
                Liever direct bellen?
                <strong>+31 6 26 21 99 89</strong>
              </div>
            </div>
          </section>
        </main>

        <BigFooter />
      </div>
    </>
  );
}