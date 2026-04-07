const PRICING_STYLES = `
  .pricing-section{
    padding:88px 5%;
    background:#fff
  }

  .pricing-intro{
    max-width:760px;
    margin:0 auto 14px;
    text-align:center
  }

  .pricing-kicker{
    display:inline-block;
    margin-bottom:12px;
    padding:8px 14px;
    border-radius:999px;
    background:#eef2ff;
    color:#4338ca;
    font-size:.72rem;
    font-weight:800;
    letter-spacing:1px;
    text-transform:uppercase
  }

  .pricing-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:18px;
    align-items:stretch
  }

  .pricing-card{
    border-radius:22px;
    padding:28px 24px;
    border:1.5px solid #eceff5;
    transition:all .25s;
    position:relative;
    background:#fff;
    display:flex;
    flex-direction:column;
    min-height:100%
  }

  .pricing-card:hover{
    border-color:#dbe4ff;
    box-shadow:0 18px 46px rgba(99,102,241,.08);
    transform:translateY(-2px)
  }

  .pricing-card.featured{
    border-color:#6366f1;
    background:linear-gradient(160deg,#fafbff,#f4f3ff);
    box-shadow:0 20px 56px rgba(99,102,241,.14)
  }

  .pricing-badge{
    position:absolute;
    top:-12px;
    left:50%;
    transform:translateX(-50%);
    background:linear-gradient(135deg,#6366f1,#8b5cf6);
    color:#fff;
    padding:5px 16px;
    border-radius:999px;
    font-weight:800;
    font-size:.67rem;
    text-transform:uppercase;
    letter-spacing:1px;
    white-space:nowrap;
    box-shadow:0 4px 12px rgba(99,102,241,.3)
  }

  .p-tier{
    font-size:.68rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.5px;
    color:#9ca3af;
    margin-bottom:8px
  }

  .pricing-card.featured .p-tier{
    color:#6366f1
  }

  .p-name{
    font-size:1.22rem;
    font-weight:900;
    color:#111827;
    letter-spacing:-.5px;
    line-height:1.2;
    margin-bottom:10px
  }

  .p-fit{
    display:inline-flex;
    align-items:center;
    padding:8px 12px;
    border-radius:999px;
    background:#f8fafc;
    border:1px solid #e5e7eb;
    color:#475569;
    font-size:.72rem;
    font-weight:800;
    line-height:1.45;
    margin-bottom:18px
  }

  .pricing-card.featured .p-fit{
    background:#eef2ff;
    border-color:#c7d2fe;
    color:#4338ca
  }

  .p-price-row{
    display:flex;
    align-items:flex-end;
    gap:10px;
    margin-bottom:8px
  }

  .p-price{
    font-size:3rem;
    font-weight:900;
    color:#111827;
    letter-spacing:-2px;
    line-height:1
  }

  .p-price sup{
    font-size:1rem;
    font-weight:700;
    vertical-align:super;
    letter-spacing:0
  }

  .p-price span{
    font-size:.96rem;
    font-weight:700;
    color:#9ca3af;
    letter-spacing:0
  }

  .p-setup{
    font-size:.78rem;
    color:#94a3b8;
    font-weight:700;
    margin-bottom:14px
  }

  .p-terms{
    margin-bottom:18px;
    padding:10px 12px;
    border-radius:12px;
    background:#f8fafc;
    border:1px solid #e5e7eb;
    font-size:.74rem;
    color:#475569;
    line-height:1.5;
    font-weight:700
  }

  .pricing-card.featured .p-terms{
    background:#eef2ff;
    border-color:#c7d2fe;
    color:#4338ca
  }

  .p-divider{
    height:1px;
    background:#eef2f7;
    margin-bottom:18px
  }

  .pricing-card.featured .p-divider{
    background:#dbe4ff
  }

  .p-features{
    list-style:none;
    padding:0;
    margin:0 0 20px 0;
    display:flex;
    flex-direction:column;
    gap:10px;
    flex:1
  }

  .p-features li{
    font-size:.83rem;
    color:#475569;
    display:flex;
    gap:8px;
    align-items:flex-start;
    line-height:1.55
  }

  .p-features li::before{
    content:'✓';
    color:#6366f1;
    font-weight:900;
    flex-shrink:0;
    margin-top:1px;
    font-size:.8rem
  }

  .pricing-card.featured .p-features li{
    color:#374151
  }

  .p-cta{
    display:block;
    text-align:center;
    padding:13px;
    border-radius:12px;
    font-weight:800;
    font-size:.88rem;
    text-decoration:none;
    transition:all .25s;
    margin-top:auto
  }

  .p-cta.default{
    background:#f8fafc;
    color:#374151;
    border:1.5px solid #e5e7eb
  }

  .p-cta.default:hover{
    background:#f3f4f6;
    border-color:#d1d5db
  }

  .p-cta.featured{
    background:linear-gradient(135deg,#6366f1,#8b5cf6);
    color:#fff;
    box-shadow:0 4px 16px rgba(99,102,241,.25)
  }

  .p-cta.featured:hover{
    box-shadow:0 8px 24px rgba(99,102,241,.34);
    transform:translateY(-1px)
  }

  .pricing-help{
    margin-top:22px;
    font-size:.84rem;
    color:#6b7280;
    text-align:center
  }

  .pricing-help a{
    color:#6366f1;
    font-weight:800;
    text-decoration:none
  }

  .pricing-help a:hover{
    text-decoration:underline
  }

  .pricing-decision{
    max-width:760px;
    margin:24px auto 0;
    padding:20px 22px;
    border-radius:18px;
    background:#f8fafc;
    border:1px solid #e5e7eb;
    text-align:center
  }

  .pricing-decision h3{
    font-size:1rem;
    font-weight:900;
    color:#111827;
    margin-bottom:8px
  }

  .pricing-decision p{
    font-size:.86rem;
    color:#6b7280;
    line-height:1.7
  }

  @media(max-width:1024px){
    .pricing-grid{
      grid-template-columns:1fr;
      max-width:620px;
      margin:0 auto
    }
  }

  @media(max-width:768px){
    .pricing-section{
      padding:80px 5%
    }
  }

  @media(max-width:480px){
    .pricing-section{
      padding:60px 5%
    }
  }
`;

const PACKAGES = [
  {
    tier: "Zichtbaar",
    name: "Professioneel online zonder gedoe",
    fit: "Voor starters, zzp’ers en kleine bedrijven",
    price: "99",
    setup: "€500 setup",
    featured: false,
    cancelNote: "Opzegbaar vanaf 6 maanden",
    bullets: [
      "Website tot 5 pagina’s",
      "Mobielvriendelijk ontwerp",
      "WhatsApp, bellen en formulier",
      "Onderhoud inbegrepen",
    ],
    cta: "Kies Zichtbaar →",
  },
  {
    tier: "Groei",
    name: "Meer aanvragen via je website",
    fit: "Meest gekozen door kappers, salons en klusbedrijven",
    price: "149",
    setup: "€750 setup",
    featured: true,
    cancelNote: "Opzegbaar vanaf 6 maanden",
    bullets: [
      "Alles uit Zichtbaar",
      "Meer pagina’s en SEO-structuur",
      "Blog of FAQ mogelijk",
      "Meer ruimte voor diensten",
    ],
    cta: "Kies Groei →",
  },
  {
    tier: "Automatiseren",
    name: "Je website laten meewerken",
    fit: "Voor reserveringen, intake en workflows",
    price: "249",
    setup: "€1000 setup",
    featured: false,
    cancelNote: "Opzegbaar vanaf maand 3",
    bullets: [
      "Alles uit Groei",
      "Dashboard of klantomgeving",
      "Reserveringen of intake mogelijk",
      "Meer maatwerk en doorontwikkeling",
    ],
    cta: "Kies Automatiseren →",
  },
];

export default function HomePricing() {
  return (
    <section id="pricing" className="pricing-section anchor-section">
      <style>{PRICING_STYLES}</style>

      <div className="section-wrap">
        <div className="pricing-intro">
          <div className="pricing-kicker">Je kiest geen website. Je kiest hoeveel je eruit wilt halen.</div>
        </div>

        <div className="section-header centered">
          <div className="section-label">Pakketten</div>
          <h2 className="section-h2">Kies het pakket dat bij jouw bedrijf past</h2>
          <p className="section-p">
            Eerst professioneel zichtbaar zijn, daarna meer aanvragen of uiteindelijk processen laten meewerken.
            De pakketten zijn bewust simpel gehouden zodat je snel ziet wat bij jouw fase past.
          </p>
        </div>

        <div className="pricing-grid">
          {PACKAGES.map((pkg) => (
            <div key={pkg.tier} className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
              {pkg.featured && <div className="pricing-badge">Meest gekozen</div>}

              <div className="p-tier">{pkg.tier}</div>
              <div className="p-name">{pkg.name}</div>
              <div className="p-fit">{pkg.fit}</div>

              <div className="p-price-row">
                <div className="p-price">
                  <sup>€</sup>
                  {pkg.price}
                  <span>/m</span>
                </div>
              </div>

              <div className="p-setup">+ {pkg.setup}</div>
              <div className="p-terms">{pkg.cancelNote}</div>
              <div className="p-divider" />

              <ul className="p-features">
                {pkg.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20meer%20weten%20over%20het%20pakket%20dat%20bij%20mijn%20bedrijf%20past."
                target="_blank"
                rel="noreferrer"
                className={`p-cta ${pkg.featured ? "featured" : "default"}`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="pricing-decision">
          <h3>Twijfel je?</h3>
          <p>
            De meeste ondernemers kiezen voor <strong>Groei</strong>. Daar zit meestal alles in om meer klanten,
            afspraken of aanvragen te krijgen zonder dat het meteen complex wordt.
          </p>
        </div>

        <div className="pricing-help">
          <a href="/pakketvergelijking">Bekijk de uitgebreide pakketvergelijking →</a>
        </div>
      </div>
    </section>
  );
}