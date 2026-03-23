import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import BigFooter from "../components/BigFooter";

const PAGE_STYLES = `
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;padding:0}

  .pricing-page{font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111827;background:#fff;line-height:1.6}
  .page-hero{background:linear-gradient(160deg,#0d1a3a 0%,#111827 100%);padding:140px 5% 90px;position:relative;overflow:hidden}
  .page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(99,102,241,.12) 0%,transparent 65%);pointer-events:none}
  .page-wrap{max-width:1120px;margin:0 auto;width:100%;position:relative}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.78);font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:1.8px;padding:8px 18px;border-radius:100px;margin-bottom:22px}
  .eyebrow::before{content:'';width:6px;height:6px;background:#22c55e;border-radius:50%}
  .page-hero h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:900;line-height:1.08;color:#fff;letter-spacing:-1.5px;margin-bottom:16px;max-width:760px}
  .page-hero p{font-size:1rem;color:rgba(255,255,255,.62);max-width:700px;line-height:1.75}

  .section{padding:90px 5%}
  .section-title{font-size:clamp(1.7rem,3vw,2.5rem);font-weight:900;color:#111827;letter-spacing:-.8px;line-height:1.15;margin-bottom:14px}
  .section-sub{font-size:.95rem;color:#6b7280;line-height:1.75;max-width:760px;margin-bottom:42px}

  .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .pricing-card{border-radius:20px;padding:40px 30px;border:1.5px solid #f3f4f6;transition:all .3s;position:relative;background:#fff}
  .pricing-card.featured{border-color:#6366f1;background:linear-gradient(160deg,#fafbff,#f0f1ff);box-shadow:0 24px 80px rgba(99,102,241,.14)}
  .pricing-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:5px 20px;border-radius:100px;font-weight:800;font-size:.68rem;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;box-shadow:0 4px 12px rgba(99,102,241,.3)}
  .p-tier{font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;margin-bottom:8px}
  .pricing-card.featured .p-tier{color:#6366f1}
  .p-name{font-size:1.2rem;font-weight:900;color:#111827;letter-spacing:-.5px;margin-bottom:6px}
  .p-sub{font-size:.82rem;color:#9ca3af;margin-bottom:20px;line-height:1.6;font-weight:600}
  .p-price{font-size:3rem;font-weight:900;color:#111827;letter-spacing:-2px;line-height:1;margin-bottom:4px}
  .p-price sup{font-size:1.1rem;font-weight:700;vertical-align:super;letter-spacing:0}
  .p-price span{font-size:1rem;font-weight:700;color:#9ca3af;letter-spacing:0}
  .p-setup{font-size:.75rem;color:#9ca3af;margin-bottom:22px;font-weight:600}
  .p-divider{height:1px;background:#f3f4f6;margin-bottom:22px}
  .pricing-card.featured .p-divider{background:#e0e7ff}
  .p-features{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;margin-bottom:0}
  .p-features li{font-size:.83rem;color:#4b5563;display:flex;gap:9px;align-items:flex-start;line-height:1.55}
  .p-features li::before{content:'✓';color:#6366f1;font-weight:900;flex-shrink:0;margin-top:1px;font-size:.8rem}

  .compare-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:24px}
  .compare-card{background:#fff;border:1px solid #e5e7eb;border-radius:18px;padding:26px 24px}
  .compare-card h3{font-size:1rem;font-weight:900;color:#111827;margin-bottom:14px}
  .compare-list{padding-left:18px;margin:0}
  .compare-list li{font-size:.86rem;color:#6b7280;line-height:1.75;margin-bottom:6px}

  .notes-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:30px}
  .note-card{background:#f8fafc;border:1px solid #e5e7eb;border-radius:18px;padding:24px}
  .note-card h3{font-size:.95rem;font-weight:900;color:#111827;margin-bottom:12px}
  .note-card ul{padding-left:18px;margin:0}
  .note-card li{font-size:.84rem;color:#6b7280;line-height:1.7;margin-bottom:6px}

  .back-link{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:#6366f1;font-weight:800;font-size:.9rem;margin-top:28px}

  @media(max-width:1024px){
    .pricing-grid,.notes-grid,.compare-grid{grid-template-columns:1fr}
  }
  @media(max-width:768px){
    .page-hero{padding:110px 5% 70px}
    .section{padding:70px 5%}
    .pricing-card,.compare-card,.note-card{padding:24px 20px}
    .p-price{font-size:2.4rem}
  }
`;

const PACKAGES = [
  {
    tier: "Starter",
    name: "Voor professioneel online zichtbaar zijn",
    subtitle: "Sterke basis voor ondernemers die vooral een nette en goed beheerde website willen.",
    price: "99",
    setup: "€500 eenmalige setup",
    featured: false,
    bullets: [
      "Professionele website",
      "1 domein, hosting en SSL",
      "1 mailbox",
      "Contactformulier",
      "Basis analytics en basis SEO",
    ],
  },
  {
    tier: "Growth",
    name: "Voor meer inhoud en groeiruimte",
    subtitle: "Voor bedrijven die hun website serieuzer willen inzetten als online basis.",
    price: "149",
    setup: "€750 eenmalige setup",
    featured: true,
    bullets: [
      "Alles uit Starter",
      "5 mailboxen",
      "Blog/FAQ module",
      "Light formulieren-opslag",
      "Meer servicepagina’s en SEO templates",
    ],
  },
  {
    tier: "Pro",
    name: "Voor functionaliteit en doorontwikkeling",
    subtitle: "Voor bedrijven die meer nodig hebben dan een standaard informatieve site.",
    price: "249",
    setup: "€1000 eenmalige setup",
    featured: false,
    bullets: [
      "Alles uit Growth",
      "10 mailboxen",
      "Login en dashboard",
      "Reserveringen / intake / workflows",
      "Data-opslag en technische monitoring",
    ],
  },
];

const PACKAGE_DETAILS = {
  starter: {
    included: [
      "Professionele website",
      "1 domein",
      "Hosting",
      "SSL-certificaat",
      "DNS-beheer",
      "1 mailbox",
      "Contactformulier",
      "Basis analytics",
      "Basis SEO-profiel",
      "Handmatige redeploy via admin portal",
    ],
    notIncluded: [
      "Geen database standaard",
      "Geen login/auth",
      "Geen dashboard",
      "Geen maatwerk backend",
      "Geen complex reserveringssysteem",
    ],
    addons: [
      "Extra mailboxbundels",
      "Local SEO uitbreiding",
      "Blog/FAQ module",
      "Light formulieren-opslag",
      "Eenvoudige reserveringswidget van derde partij",
    ],
  },
  growth: {
    included: [
      "Alles uit Starter",
      "5 mailboxen",
      "Blog/FAQ module",
      "Formulieren met opslag (light)",
      "Uitgebreidere SEO templates",
      "Meerdere servicepagina’s",
    ],
    notIncluded: [
      "Geen zware database standaard",
      "Geen complex login/dashboard standaard",
      "Geen uitgebreide maatwerkfunctionaliteit standaard",
    ],
    addons: [
      "Reserveringsmodule",
      "Database light",
      "Extra mailboxbundels",
      "Extra landingspagina’s",
    ],
  },
  pro: {
    included: [
      "Alles uit Growth",
      "10 mailboxen",
      "Maatwerk functionaliteit mogelijk",
      "Data-opslag voor formulieren en workflows inbegrepen",
      "Login/auth",
      "Dashboardfunctionaliteit",
      "Reserveringen / intake / workflowmodules",
      "Technische monitoring op de achtergrond",
    ],
    notIncluded: [
      "Maatwerk en premium infra alleen wanneer nodig",
    ],
    addons: [
      "PostgreSQL / RDS premium add-on",
      "Extra mailboxbundels",
      "Extra data/storage bundels",
      "Security add-on zoals WAF",
    ],
  },
};

const MAILBOX_BUNDLES = [
  "Starter: 1 mailbox inbegrepen",
  "Growth: 5 mailboxen inbegrepen",
  "Pro: 10 mailboxen inbegrepen",
  "Extra mailboxen als bundels: +1, +5 of +10",
  "Aliassen zoals info@, hello@ of noreply@ kunnen slim worden ingezet om kosten beter beheersbaar te houden",
];

const DATA_RULES = [
  "Starter: standaard geen database",
  "Growth: light data-opslag als add-on",
  "Pro: serverless data standaard inbegrepen",
  "PostgreSQL / RDS alleen als premium add-on",
  "Werk altijd met limieten op opslag, requests en retention",
];

const PACKAGE_BASICS = [
  "Professionele website",
  "Hosting geregeld",
  "Domein en DNS geregeld",
  "SSL geregeld",
  "Onderhoud en support vanuit één partij",
  "Geen technisch gedoe voor de klant",
  "Duidelijke vaste structuur",
];

export default function PricingDetails() {
  return (
    <>
      <SEO
        title="Pakketvergelijking | Vedantix"
        description="Vergelijk alle Vedantix pakketten, inbegrepen onderdelen, add-ons, mailboxen en technische nuances op één overzichtelijke pagina."
        canonical="https://vedantix.nl/pakketvergelijking"
      />

      <style>{PAGE_STYLES}</style>

      <div className="pricing-page">
        <NavBar />

        <main>
          <section className="page-hero">
            <div className="page-wrap">
              <div className="eyebrow">Pakketvergelijking</div>
              <h1>Vergelijk alle pakketten en details in één rustig overzicht</h1>
              <p>
                Deze pagina is bedoeld voor bezoekers die de inhoud, add-ons en technische nuances uitgebreider willen bekijken. Zo blijft je homepage strak en blijft deze vergelijking op een logische plek staan.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="page-wrap">
              <h2 className="section-title">Overzicht van de pakketten</h2>
              <p className="section-sub">
                Een snelle vergelijking van de drie basisopties. Gebruik dit overzicht als startpunt en bekijk daaronder per pakket de volledige inhoud.
              </p>

              <div className="pricing-grid">
                {PACKAGES.map((pkg) => (
                  <div key={pkg.tier} className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
                    {pkg.featured && <div className="pricing-badge">Meest gekozen</div>}
                    <div className="p-tier">{pkg.tier}</div>
                    <div className="p-name">{pkg.name}</div>
                    <div className="p-sub">{pkg.subtitle}</div>
                    <div className="p-price">
                      <sup>€</sup>
                      {pkg.price}
                      <span>/m</span>
                    </div>
                    <div className="p-setup">+ {pkg.setup}</div>
                    <div className="p-divider" />
                    <ul className="p-features">
                      {pkg.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" style={{ background: "#f8fafc" }}>
            <div className="page-wrap">
              <h2 className="section-title">Volledige inhoud per pakket</h2>
              <p className="section-sub">
                Hieronder zie je per pakket wat inbegrepen is, wat niet standaard inbegrepen is en welke add-ons mogelijk zijn.
              </p>

              <div className="compare-grid">
                <div className="compare-card">
                  <h3>Starter</h3>
                  <strong>Inbegrepen</strong>
                  <ul className="compare-list">
                    {PACKAGE_DETAILS.starter.included.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <strong>Niet inbegrepen</strong>
                  <ul className="compare-list" style={{ marginTop: 8 }}>
                    {PACKAGE_DETAILS.starter.notIncluded.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <strong>Add-ons</strong>
                  <ul className="compare-list" style={{ marginTop: 8 }}>
                    {PACKAGE_DETAILS.starter.addons.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className="compare-card">
                  <h3>Growth</h3>
                  <strong>Inbegrepen</strong>
                  <ul className="compare-list">
                    {PACKAGE_DETAILS.growth.included.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <strong>Niet standaard inbegrepen</strong>
                  <ul className="compare-list" style={{ marginTop: 8 }}>
                    {PACKAGE_DETAILS.growth.notIncluded.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <strong>Add-ons</strong>
                  <ul className="compare-list" style={{ marginTop: 8 }}>
                    {PACKAGE_DETAILS.growth.addons.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className="compare-card" style={{ gridColumn: "1 / -1" }}>
                  <h3>Pro</h3>
                  <strong>Inbegrepen</strong>
                  <ul className="compare-list">
                    {PACKAGE_DETAILS.pro.included.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <strong>Niet standaard inbegrepen</strong>
                  <ul className="compare-list" style={{ marginTop: 8 }}>
                    {PACKAGE_DETAILS.pro.notIncluded.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <strong>Add-ons</strong>
                  <ul className="compare-list" style={{ marginTop: 8 }}>
                    {PACKAGE_DETAILS.pro.addons.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="page-wrap">
              <h2 className="section-title">Belangrijke nuances</h2>
              <p className="section-sub">
                Deze drie blokken geven extra context over mailboxen, data-opslag en wat in alle pakketten centraal staat.
              </p>

              <div className="notes-grid">
                <div className="note-card">
                  <h3>Mailboxen</h3>
                  <ul>
                    {MAILBOX_BUNDLES.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="note-card">
                  <h3>Database en data-opslag</h3>
                  <ul>
                    {DATA_RULES.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="note-card">
                  <h3>In alle pakketten centraal</h3>
                  <ul>
                    {PACKAGE_BASICS.map((item) => <li key={item}>{item}</li>)}
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
