import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import BigFooter from "../components/BigFooter";

const PAGE_STYLES = `
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;padding:0}

  .pricing-page{
    font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    color:#111827;
    background:#fff;
    line-height:1.6
  }

  .page-hero{
    background:linear-gradient(160deg,#0d1a3a 0%,#111827 100%);
    padding:140px 5% 90px;
    position:relative;
    overflow:hidden
  }
  .page-hero::before{
    content:'';
    position:absolute;
    inset:0;
    background:radial-gradient(ellipse at center,rgba(99,102,241,.12) 0%,transparent 65%);
    pointer-events:none
  }

  .page-wrap{
    max-width:1180px;
    margin:0 auto;
    width:100%;
    position:relative
  }

  .eyebrow{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.78);
    font-size:.72rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.8px;
    padding:8px 18px;
    border-radius:100px;
    margin-bottom:22px
  }
  .eyebrow::before{
    content:'';
    width:6px;
    height:6px;
    background:#22c55e;
    border-radius:50%
  }

  .page-hero h1{
    font-size:clamp(2.2rem,4vw,3.6rem);
    font-weight:900;
    line-height:1.08;
    color:#fff;
    letter-spacing:-1.5px;
    margin-bottom:16px;
    max-width:760px
  }
  .page-hero p{
    font-size:1rem;
    color:rgba(255,255,255,.62);
    max-width:700px;
    line-height:1.75
  }

  .section{padding:90px 5%}
  .section.alt{background:#f8fafc}

  .section-title{
    font-size:clamp(1.7rem,3vw,2.5rem);
    font-weight:900;
    color:#111827;
    letter-spacing:-.8px;
    line-height:1.15;
    margin-bottom:14px
  }
  .section-sub{
    font-size:.95rem;
    color:#6b7280;
    line-height:1.75;
    max-width:760px;
    margin-bottom:42px
  }

  .pricing-compare-table{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px;
    align-items:start
  }

  .pricing-column{
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:22px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,.04)
  }

  .pricing-column.featured{
    border-color:#6366f1;
    box-shadow:0 18px 50px rgba(99,102,241,.14);
    transform:translateY(-4px)
  }

  .pricing-head{
    padding:28px 24px;
    color:#fff
  }
  .pricing-head.starter{background:linear-gradient(135deg,#0f172a,#1d4ed8)}
  .pricing-head.growth{background:linear-gradient(135deg,#312e81,#7c3aed)}
  .pricing-head.pro{background:linear-gradient(135deg,#3f1d0f,#ea580c)}

  .pricing-tag{
    display:inline-block;
    font-size:.68rem;
    font-weight:800;
    letter-spacing:1.4px;
    text-transform:uppercase;
    color:rgba(255,255,255,.75);
    margin-bottom:10px
  }

  .pricing-featured-badge{
    display:inline-block;
    margin-left:8px;
    background:rgba(255,255,255,.16);
    border:1px solid rgba(255,255,255,.18);
    padding:4px 10px;
    border-radius:999px;
    font-size:.64rem;
    font-weight:800;
    letter-spacing:1px;
    text-transform:uppercase;
    color:#fff;
    vertical-align:middle
  }

  .pricing-title{
    font-size:1.3rem;
    font-weight:900;
    line-height:1.2;
    margin-bottom:8px
  }

  .pricing-sub{
    font-size:.84rem;
    color:rgba(255,255,255,.78);
    line-height:1.6
  }

  .pricing-price-wrap{
    padding:22px 24px 0;
    background:#fff
  }

  .pricing-price{
    font-size:2.8rem;
    font-weight:900;
    color:#111827;
    letter-spacing:-2px;
    line-height:1
  }
  .pricing-price sup{
    font-size:1.05rem;
    font-weight:800;
    vertical-align:super
  }
  .pricing-price span{
    font-size:.98rem;
    font-weight:700;
    color:#6b7280;
    letter-spacing:0
  }

  .pricing-setup{
    font-size:.78rem;
    color:#9ca3af;
    margin-top:8px;
    font-weight:700
  }

  .pricing-terms{
    margin-top:14px;
    padding:12px 14px;
    border-radius:12px;
    background:#f8fafc;
    border:1px solid #e5e7eb;
    font-size:.76rem;
    font-weight:700;
    color:#475569;
    line-height:1.55
  }

  .pricing-section-block{
    padding:20px 24px;
    border-top:1px solid #eef2f7
  }

  .pricing-block-title{
    font-size:.72rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.5px;
    color:#6366f1;
    margin-bottom:12px
  }

  .pricing-list{
    list-style:none;
    padding:0;
    margin:0;
    display:flex;
    flex-direction:column;
    gap:10px
  }

  .pricing-list li{
    display:flex;
    gap:8px;
    align-items:flex-start;
    font-size:.84rem;
    color:#4b5563;
    line-height:1.6
  }
  .pricing-list li::before{
    content:'✓';
    color:#6366f1;
    font-weight:900;
    flex-shrink:0
  }

  .pricing-list.minus li::before{
    content:'–';
    color:#94a3b8
  }

  .pricing-cta-note{
    padding:20px 24px;
    background:#f8fafc;
    border-top:1px solid #eef2f7;
    font-size:.8rem;
    color:#475569;
    line-height:1.6;
    font-weight:600
  }

  .notes-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:18px;
    margin-top:30px
  }

  .note-card{
    background:#f8fafc;
    border:1px solid #e5e7eb;
    border-radius:18px;
    padding:24px
  }

  .note-card h3{
    font-size:.95rem;
    font-weight:900;
    color:#111827;
    margin-bottom:12px
  }

  .note-card ul{
    padding-left:18px;
    margin:0
  }

  .note-card li{
    font-size:.84rem;
    color:#6b7280;
    line-height:1.7;
    margin-bottom:6px
  }

  .back-link{
    display:inline-flex;
    align-items:center;
    gap:8px;
    text-decoration:none;
    color:#6366f1;
    font-weight:800;
    font-size:.9rem;
    margin-top:28px
  }

  @media(max-width:1024px){
    .pricing-compare-table,
    .notes-grid{
      grid-template-columns:1fr;
      max-width:560px;
      margin:0 auto
    }

    .pricing-column.featured{
      transform:none
    }
  }

  @media(max-width:768px){
    .page-hero{padding:110px 5% 70px}
    .section{padding:70px 5%}

    .pricing-head,
    .pricing-price-wrap,
    .pricing-section-block,
    .pricing-cta-note,
    .note-card{
      padding-left:20px;
      padding-right:20px
    }

    .pricing-price{font-size:2.4rem}
  }
`;

const PACKAGE_DETAILS = {
  starter: {
    included: [
      "Professionele website",
      "Tot 5 pagina’s",
      "1 zakelijk mailadres",
      "Mobielvriendelijk ontwerp",
      "Contactformulier en WhatsApp-knop",
      "Onderhoud en kleine updates",
      "Je website blijft online en veilig",
    ],
    notIncluded: [
      "Geen klantomgeving of login",
      "Geen uitgebreide reserveringsmodule",
      "Geen maatwerk functionaliteit",
      "Niet bedoeld voor complexe processen",
    ],
    addons: [
      "Extra mailadressen",
      "Extra pagina’s",
      "Lokale SEO uitbreiding",
      "Blog of FAQ uitbreiding",
      "Extra formulieren of secties",
    ],
  },
  growth: {
    included: [
      "Alles uit Starter",
      "Meer pagina’s en meer inhoud",
      "5 zakelijke mailadressen",
      "Blog of FAQ mogelijk",
      "Sterkere SEO-opbouw",
      "Meer ruimte voor dienstenpagina’s en landingspagina’s",
    ],
    notIncluded: [
      "Geen uitgebreide klantomgeving standaard",
      "Geen zwaar maatwerk standaard",
      "Niet bedoeld voor complexe interne workflows",
    ],
    addons: [
      "Extra pagina’s",
      "Extra mailadressen",
      "Reserveringsmodule",
      "Uitgebreidere leadformulieren",
      "Extra SEO-landingspagina’s",
    ],
  },
  pro: {
    included: [
      "Alles uit Growth",
      "10 zakelijke mailadressen",
      "Klantomgeving of dashboard mogelijk",
      "Reserveringen, intake of workflows mogelijk",
      "Meer maatwerk en doorontwikkeling",
      "Geschikt voor bedrijven die online processen willen ondersteunen",
    ],
    notIncluded: [
      "Zeer specialistisch maatwerk alleen op offertebasis",
    ],
    addons: [
      "Extra mailadressen",
      "Extra opslag of uitgebreide formulieren",
      "Extra beveiliging",
      "Extra maatwerk modules",
    ],
  },
};

const MAILBOX_BUNDLES = [
  "Starter: 1 zakelijk mailadres inbegrepen",
  "Growth: 5 zakelijke mailadressen inbegrepen",
  "Pro: 10 zakelijke mailadressen inbegrepen",
  "Extra mailadressen kunnen later worden toegevoegd",
  "Aliassen zoals info@ of hello@ zijn vaak slim genoeg voor kleinere teams",
];

const DATA_RULES = [
  "Starter is bedoeld voor een duidelijke bedrijfswebsite zonder complexe functionaliteit",
  "Growth biedt meer ruimte voor formulieren, inhoud en uitbreidingen",
  "Pro is bedoeld voor bedrijven die ook processen via hun website willen ondersteunen",
  "Complex maatwerk wordt alleen toegevoegd als het echt nodig is",
  "Je betaalt dus niet direct voor techniek die je nog niet gebruikt",
];

const PACKAGE_BASICS = [
  "Professionele uitstraling",
  "Mobielvriendelijke website",
  "Onderhoud en support",
  "Eén vast aanspreekpunt",
  "Duidelijke maandprijs",
  "Geen technisch gedoe",
  "Gebouwd voor lokale ondernemers",
];

export default function PricingDetails() {
  return (
    <>
      <SEO
        title="Pakketvergelijking | Vedantix"
        description="Vergelijk alle Vedantix pakketten en zie in gewone taal welk pakket past bij jouw bedrijf, doelen en groeifase."
        canonical="https://vedantix.nl/pakketvergelijking"
      />

      <style>{PAGE_STYLES}</style>

      <div className="pricing-page">
        <NavBar />

        <main>
          <section className="page-hero">
            <div className="page-wrap">
              <div className="eyebrow">Pakketvergelijking</div>
              <h1>Vergelijk de pakketten en kies wat past bij jouw bedrijf</h1>
              <p>
                Hier zie je in gewone taal welk pakket past bij jouw fase: professioneel zichtbaar zijn, meer aanvragen genereren
                of extra functionaliteit toevoegen aan je website.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="page-wrap">
              <h2 className="section-title">Vergelijk de pakketten naast elkaar</h2>
              <p className="section-sub">
                Dit overzicht is bewust in drie kolommen opgebouwd, zodat verschillen in prijs, inhoud,
                flexibiliteit en uitbreidbaarheid direct zichtbaar zijn.
              </p>

              <div className="pricing-compare-table">
                <div className="pricing-column">
                  <div className="pricing-head starter">
                    <div className="pricing-tag">Starter</div>
                    <div className="pricing-title">Voor starters en kleine lokale bedrijven</div>
                    <div className="pricing-sub">
                      Voor ondernemers die snel professioneel online zichtbaar willen zijn zonder ingewikkeld traject.
                    </div>
                  </div>

                  <div className="pricing-price-wrap">
                    <div className="pricing-price">
                      <sup>€</sup>99<span>/m</span>
                    </div>
                    <div className="pricing-setup">+ €500 eenmalige setup</div>
                    <div className="pricing-terms">Maandelijks opzegbaar vanaf 6 maanden · daarna €50 opzegvergoeding</div>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Inbegrepen</div>
                    <ul className="pricing-list">
                      {PACKAGE_DETAILS.starter.included.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Niet inbegrepen</div>
                    <ul className="pricing-list minus">
                      {PACKAGE_DETAILS.starter.notIncluded.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Uitbreidingen</div>
                    <ul className="pricing-list">
                      {PACKAGE_DETAILS.starter.addons.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-cta-note">
                    Geschikt als instap wanneer je vooral professioneel zichtbaar wilt zijn zonder extra complexiteit.
                  </div>
                </div>

                <div className="pricing-column featured">
                  <div className="pricing-head growth">
                    <div className="pricing-tag">
                      Growth <span className="pricing-featured-badge">Meest gekozen</span>
                    </div>
                    <div className="pricing-title">Voor bedrijven die meer aanvragen willen</div>
                    <div className="pricing-sub">
                      Voor ondernemers die hun website actiever willen inzetten voor zichtbaarheid, inhoud en groei.
                    </div>
                  </div>

                  <div className="pricing-price-wrap">
                    <div className="pricing-price">
                      <sup>€</sup>149<span>/m</span>
                    </div>
                    <div className="pricing-setup">+ €750 eenmalige setup</div>
                    <div className="pricing-terms">Maandelijks opzegbaar vanaf 6 maanden · daarna zonder lange contractduur</div>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Inbegrepen</div>
                    <ul className="pricing-list">
                      {PACKAGE_DETAILS.growth.included.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Niet standaard inbegrepen</div>
                    <ul className="pricing-list minus">
                      {PACKAGE_DETAILS.growth.notIncluded.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Uitbreidingen</div>
                    <ul className="pricing-list">
                      {PACKAGE_DETAILS.growth.addons.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-cta-note">
                    Beste balans tussen prijs, inhoud en groeiruimte voor de meeste lokale ondernemers.
                  </div>
                </div>

                <div className="pricing-column">
                  <div className="pricing-head pro">
                    <div className="pricing-tag">Pro</div>
                    <div className="pricing-title">Voor bedrijven die online processen willen automatiseren</div>
                    <div className="pricing-sub">
                      Voor ondernemers die meer nodig hebben dan alleen een website, zoals intake, reserveringen of een klantomgeving.
                    </div>
                  </div>

                  <div className="pricing-price-wrap">
                    <div className="pricing-price">
                      <sup>€</sup>249<span>/m</span>
                    </div>
                    <div className="pricing-setup">+ €1000 eenmalige setup</div>
                    <div className="pricing-terms">Maandelijks opzegbaar vanaf maand 3</div>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Inbegrepen</div>
                    <ul className="pricing-list">
                      {PACKAGE_DETAILS.pro.included.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Niet standaard inbegrepen</div>
                    <ul className="pricing-list minus">
                      {PACKAGE_DETAILS.pro.notIncluded.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-section-block">
                    <div className="pricing-block-title">Uitbreidingen</div>
                    <ul className="pricing-list">
                      {PACKAGE_DETAILS.pro.addons.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-cta-note">
                    Voor bedrijven die hun website echt als onderdeel van hun proces of dienstverlening willen inzetten.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section alt">
            <div className="page-wrap">
              <h2 className="section-title">Belangrijke nuances</h2>
              <p className="section-sub">
                Extra context over mailadressen, uitbreidingen en wat in alle pakketten centraal staat.
              </p>

              <div className="notes-grid">
                <div className="note-card">
                  <h3>Mailadressen</h3>
                  <ul>
                    {MAILBOX_BUNDLES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="note-card">
                  <h3>Groei en functionaliteit</h3>
                  <ul>
                    {DATA_RULES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="note-card">
                  <h3>In alle pakketten centraal</h3>
                  <ul>
                    {PACKAGE_BASICS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a href="/" className="back-link">← Terug naar homepage</a>
            </div>
          </section>
        </main>

        <BigFooter />
      </div>
    </>
  );
}