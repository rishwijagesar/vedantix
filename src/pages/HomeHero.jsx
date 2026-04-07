export const HOME_HERO_STYLES = `
  .home-hero{
    position:relative;
    overflow:hidden;
    background:
      radial-gradient(circle at 14% 18%, rgba(99,102,241,.16), transparent 28%),
      radial-gradient(circle at 86% 20%, rgba(59,130,246,.08), transparent 22%),
      linear-gradient(160deg,#0b1530 0%, #0f172a 58%, #111827 100%);
    color:#fff;
  }

  .home-hero::before{
    content:'';
    position:absolute;
    inset:0;
    background:linear-gradient(to bottom, rgba(255,255,255,.03), rgba(255,255,255,0));
    pointer-events:none;
  }

  .home-hero-shell{
    max-width:1240px;
    margin:0 auto;
    padding:
      clamp(82px, 9vh, 108px)
      24px
      clamp(38px, 5vh, 54px);
    min-height:calc(100svh - 72px);
    display:grid;
    align-items:center;
    position:relative;
    z-index:1;
  }

  .home-hero-grid{
    display:grid;
    grid-template-columns:minmax(0,1.18fr) minmax(280px,.62fr);
    gap:32px;
    align-items:center;
  }

  .home-hero-copy{
    max-width:760px;
  }

  .home-hero-badge{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:9px 14px;
    border-radius:999px;
    background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.10);
    color:rgba(255,255,255,.88);
    font-size:.72rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1px;
    margin-bottom:20px;
    backdrop-filter:blur(8px);
  }

  .home-hero-badge::before{
    content:'';
    width:8px;
    height:8px;
    border-radius:50%;
    background:#22c55e;
    box-shadow:0 0 0 6px rgba(34,197,94,.14);
  }

  .home-hero-title{
    margin:0 0 18px;
    font-size:clamp(2.5rem, 5vw, 5rem);
    line-height:.94;
    letter-spacing:-2.4px;
    font-weight:900;
    max-width:11ch;
  }

  .home-hero-title .accent{
    display:block;
    color:#a5b4fc;
  }

  .home-hero-text{
    margin:0;
    max-width:58ch;
    font-size:clamp(1rem, 1.15vw, 1.06rem);
    line-height:1.82;
    color:rgba(255,255,255,.74);
  }

  .home-hero-benefits{
    display:flex;
    flex-wrap:wrap;
    gap:12px;
    margin-top:24px;
    max-width:760px;
  }

  .home-hero-benefit{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:11px 14px;
    border-radius:999px;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.08);
    color:rgba(255,255,255,.86);
    font-size:.81rem;
    font-weight:700;
    line-height:1.4;
  }

  .home-hero-benefit::before{
    content:'✓';
    color:#86efac;
    font-weight:900;
  }

  .home-hero-ctas{
    display:flex;
    gap:12px;
    flex-wrap:wrap;
    margin-top:28px;
  }

  .home-hero-btn-primary,
  .home-hero-btn-secondary{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-height:52px;
    padding:0 22px;
    border-radius:12px;
    text-decoration:none;
    font-weight:800;
    font-size:.92rem;
    transition:all .2s ease;
  }

  .home-hero-btn-primary{
    background:#fff;
    color:#111827;
    box-shadow:0 12px 28px rgba(0,0,0,.18);
  }

  .home-hero-btn-primary:hover{
    transform:translateY(-1px);
    background:#f8fafc;
  }

  .home-hero-btn-secondary{
    color:#fff;
    border:1px solid rgba(255,255,255,.18);
    background:rgba(255,255,255,.04);
    backdrop-filter:blur(10px);
  }

  .home-hero-btn-secondary:hover{
    background:rgba(255,255,255,.08);
    transform:translateY(-1px);
  }

  .home-hero-meta{
    display:flex;
    flex-wrap:wrap;
    gap:10px 18px;
    margin-top:18px;
  }

  .home-hero-meta-item{
    font-size:.77rem;
    color:rgba(255,255,255,.56);
    font-weight:700;
    display:flex;
    align-items:center;
    gap:7px;
  }

  .home-hero-meta-item::before{
    content:'•';
    color:#60a5fa;
    font-size:1rem;
    line-height:1;
  }

  .home-hero-card{
    background:linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.05));
    border:1px solid rgba(255,255,255,.10);
    border-radius:22px;
    padding:22px;
    backdrop-filter:blur(14px);
    box-shadow:0 20px 56px rgba(2,6,23,.22);
    max-width:360px;
    width:100%;
    justify-self:end;
  }

  .home-hero-card-label{
    display:inline-flex;
    padding:7px 11px;
    border-radius:999px;
    background:rgba(99,102,241,.16);
    color:#c7d2fe;
    font-size:.68rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1px;
    margin-bottom:12px;
  }

  .home-hero-card-title{
    margin:0 0 10px;
    font-size:1.16rem;
    line-height:1.2;
    font-weight:900;
    color:#fff;
    max-width:16ch;
  }

  .home-hero-card-text{
    margin:0;
    color:rgba(255,255,255,.68);
    font-size:.84rem;
    line-height:1.7;
  }

  .home-hero-card-list{
    list-style:none;
    padding:0;
    margin:18px 0 0 0;
    display:flex;
    flex-direction:column;
    gap:12px;
  }

  .home-hero-card-item{
    display:flex;
    gap:12px;
    align-items:flex-start;
    padding-top:12px;
    border-top:1px solid rgba(255,255,255,.08);
  }

  .home-hero-card-item:first-child{
    border-top:none;
    padding-top:0;
  }

  .home-hero-card-icon{
    width:34px;
    height:34px;
    border-radius:11px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(255,255,255,.08);
    color:#c7d2fe;
    font-size:.88rem;
    flex-shrink:0;
  }

  .home-hero-card-item strong{
    display:block;
    color:#fff;
    font-size:.88rem;
    font-weight:800;
    margin-bottom:4px;
  }

  .home-hero-card-item span{
    display:block;
    color:rgba(255,255,255,.64);
    font-size:.79rem;
    line-height:1.58;
  }

  .home-hero-card-note{
    margin-top:18px;
    padding-top:14px;
    border-top:1px solid rgba(255,255,255,.08);
    color:rgba(255,255,255,.58);
    font-size:.76rem;
    line-height:1.6;
  }

  @media (max-width: 1120px){
    .home-hero-shell{
      min-height:auto;
      padding-top:90px;
      padding-bottom:40px;
    }

    .home-hero-grid{
      grid-template-columns:1fr;
      gap:26px;
    }

    .home-hero-copy{
      max-width:none;
    }

    .home-hero-title{
      max-width:12ch;
    }

    .home-hero-card{
      justify-self:start;
      max-width:520px;
    }
  }

  @media (max-width: 768px){
    .home-hero-shell{
      padding:82px 16px 30px;
    }

    .home-hero-title{
      font-size:clamp(2.05rem, 8vw, 3.2rem);
      line-height:.96;
      letter-spacing:-1.6px;
      max-width:11.5ch;
    }

    .home-hero-text{
      font-size:.95rem;
      line-height:1.72;
    }

    .home-hero-benefits{
      gap:10px;
      margin-top:20px;
    }

    .home-hero-benefit{
      width:100%;
      justify-content:flex-start;
    }

    .home-hero-ctas{
      flex-direction:column;
      margin-top:22px;
    }

    .home-hero-btn-primary,
    .home-hero-btn-secondary{
      width:100%;
    }

    .home-hero-card{
      padding:20px;
      border-radius:20px;
      max-width:none;
    }

    .home-hero-card-title{
      font-size:1.08rem;
    }
  }

  @media (max-width: 480px){
    .home-hero-shell{
      padding-top:76px;
      padding-bottom:24px;
    }

    .home-hero-badge{
      font-size:.66rem;
      margin-bottom:14px;
    }

    .home-hero-title{
      max-width:11ch;
    }
  }
`;

const HERO_BENEFITS = [
  "Binnen 48 uur live",
  "Gericht op meer aanvragen",
  "Gebouwd voor lokale ondernemers",
  "Onderhoud en support inbegrepen",
];

const HERO_CARD_ITEMS = [
  {
    icon: "⚡",
    title: "Snel live",
    text: "Voor veel standaard websites kun je snel online staan zonder lang traject.",
  },
  {
    icon: "🎯",
    title: "Gericht op actie",
    text: "Gebouwd om bezoekers sneller te laten bellen, appen of aanvragen.",
  },
];

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero-shell">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <div className="home-hero-badge">
              Websites voor kappers, restaurants, salons, fotografen en zzp’ers
            </div>

            <h1 className="home-hero-title">
              Een website die
              <span className="accent">klanten oplevert.</span>
            </h1>

            <p className="home-hero-text">
              Vedantix bouwt websites voor lokale ondernemers die professioneel willen overkomen,
              sneller online willen staan en meer aanvragen willen krijgen — zonder technisch gedoe.
            </p>

            <div className="home-hero-benefits">
              {HERO_BENEFITS.map((item) => (
                <div key={item} className="home-hero-benefit">
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="home-hero-ctas">
              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20kennismaking%20voor%20mijn%20website."
                target="_blank"
                rel="noreferrer"
                className="home-hero-btn-primary"
              >
                Plan gratis intake →
              </a>

              <a href="#voor-wie" className="home-hero-btn-secondary">
                Bekijk wat bij jou past →
              </a>
            </div>

            <div className="home-hero-meta">
              <div className="home-hero-meta-item">Duidelijke maandprijs</div>
              <div className="home-hero-meta-item">Persoonlijk contact</div>
              <div className="home-hero-meta-item">Geen technisch gedoe</div>
            </div>
          </div>

          <div className="home-hero-card">
            <div className="home-hero-card-label">Waarom Vedantix</div>

            <h2 className="home-hero-card-title">
              Snel live, duidelijk geregeld.
            </h2>

            <p className="home-hero-card-text">
              Geen gedoe met builders, hosting, plugins of losse partijen.
              Je krijgt een professionele website die duidelijk oogt en sneller tot actie leidt.
            </p>

            <div className="home-hero-card-list">
              {HERO_CARD_ITEMS.map((item) => (
                <div key={item.title} className="home-hero-card-item">
                  <div className="home-hero-card-icon">{item.icon}</div>

                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="home-hero-card-note">
              Website, updates en support onder één dak. Duidelijk, snel en zonder losse technische puzzelstukken.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}