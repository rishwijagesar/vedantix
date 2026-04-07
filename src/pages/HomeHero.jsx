export const HOME_HERO_STYLES = `
  .home-hero{
    position:relative;
    background:
      radial-gradient(circle at top left, rgba(99,102,241,.12), transparent 28%),
      radial-gradient(circle at bottom right, rgba(59,130,246,.10), transparent 24%),
      linear-gradient(160deg,#0d1a3a 0%,#111827 100%);
    color:#fff;
    overflow:hidden;
  }

  .home-hero::before{
    content:'';
    position:absolute;
    inset:0;
    background:
      linear-gradient(to bottom, rgba(255,255,255,.02), rgba(255,255,255,0));
    pointer-events:none;
  }

  .home-hero-shell{
    max-width:1160px;
    margin:0 auto;
    padding:
      clamp(88px, 11vh, 128px)
      20px
      clamp(40px, 6vh, 64px);
    min-height:calc(100svh - 72px);
    display:grid;
    align-items:center;
  }

  .home-hero-grid{
    display:grid;
    grid-template-columns:minmax(0,1.05fr) minmax(320px,.95fr);
    gap:34px;
    align-items:center;
  }

  .home-hero-copy{
    max-width:620px;
  }

  .home-hero-badge{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:8px 14px;
    border-radius:999px;
    background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.12);
    color:rgba(255,255,255,.88);
    font-size:.74rem;
    font-weight:800;
    letter-spacing:1px;
    text-transform:uppercase;
    margin-bottom:16px;
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
    margin:0 0 16px;
    font-size:clamp(2.2rem, 4vw, 4.1rem);
    line-height:.98;
    letter-spacing:-1.8px;
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
    font-size:clamp(.98rem, 1.3vw, 1.08rem);
    line-height:1.78;
    color:rgba(255,255,255,.74);
  }

  .home-hero-points{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:10px 12px;
    margin-top:24px;
    max-width:620px;
  }

  .home-hero-point{
    display:flex;
    gap:10px;
    align-items:flex-start;
    padding:12px 14px;
    border-radius:14px;
    background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.08);
    font-size:.84rem;
    color:rgba(255,255,255,.84);
    line-height:1.55;
  }

  .home-hero-point::before{
    content:'✓';
    color:#86efac;
    font-weight:900;
    flex-shrink:0;
    margin-top:1px;
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
    min-height:50px;
    padding:0 20px;
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
    font-size:.78rem;
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

  .home-hero-panel{
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.10);
    border-radius:24px;
    padding:22px;
    backdrop-filter:blur(12px);
    box-shadow:0 20px 60px rgba(2,6,23,.24);
  }

  .home-hero-panel-top{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:14px;
    margin-bottom:16px;
  }

  .home-hero-panel-label{
    font-size:.76rem;
    color:#c7d2fe;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.5px;
  }

  .home-hero-panel-chip{
    padding:7px 10px;
    border-radius:999px;
    background:rgba(34,197,94,.12);
    border:1px solid rgba(34,197,94,.22);
    color:#bbf7d0;
    font-size:.72rem;
    font-weight:800;
    white-space:nowrap;
  }

  .home-hero-panel-title{
    margin:0 0 8px;
    font-size:1.18rem;
    line-height:1.25;
    font-weight:900;
    color:#fff;
  }

  .home-hero-panel-text{
    margin:0 0 18px;
    color:rgba(255,255,255,.68);
    font-size:.88rem;
    line-height:1.7;
  }

  .home-hero-choice-grid{
    display:grid;
    gap:12px;
  }

  .home-hero-choice{
    display:block;
    padding:16px;
    border-radius:16px;
    background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.08);
  }

  .home-hero-choice-top{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
    margin-bottom:6px;
  }

  .home-hero-choice-title{
    font-size:.96rem;
    font-weight:900;
    color:#fff;
  }

  .home-hero-choice-badge{
    padding:5px 9px;
    border-radius:999px;
    background:rgba(99,102,241,.16);
    color:#c7d2fe;
    font-size:.68rem;
    font-weight:800;
    white-space:nowrap;
  }

  .home-hero-choice-text{
    font-size:.82rem;
    line-height:1.65;
    color:rgba(255,255,255,.68);
  }

  .home-hero-choice-link{
    margin-top:10px;
    display:inline-flex;
    align-items:center;
    gap:6px;
    text-decoration:none;
    color:#a5b4fc;
    font-size:.8rem;
    font-weight:800;
  }

  .home-hero-bottom{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:12px;
    margin-top:16px;
  }

  .home-hero-stat{
    padding:14px 12px;
    border-radius:16px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.06);
    text-align:center;
  }

  .home-hero-stat strong{
    display:block;
    font-size:1.02rem;
    font-weight:900;
    color:#fff;
    margin-bottom:4px;
  }

  .home-hero-stat span{
    font-size:.74rem;
    color:rgba(255,255,255,.56);
    line-height:1.45;
  }

  @media (max-width: 1080px){
    .home-hero-shell{
      min-height:auto;
      padding-top:96px;
      padding-bottom:44px;
    }

    .home-hero-grid{
      grid-template-columns:1fr;
      gap:24px;
    }

    .home-hero-copy{
      max-width:none;
    }

    .home-hero-title{
      max-width:13ch;
    }

    .home-hero-panel{
      max-width:760px;
    }
  }

  @media (max-width: 768px){
    .home-hero-shell{
      padding:
        88px
        16px
        34px;
    }

    .home-hero-title{
      font-size:clamp(1.95rem, 8vw, 2.8rem);
      max-width:12ch;
      margin-bottom:14px;
    }

    .home-hero-text{
      font-size:.95rem;
      line-height:1.72;
    }

    .home-hero-points{
      grid-template-columns:1fr;
      margin-top:20px;
    }

    .home-hero-ctas{
      flex-direction:column;
      margin-top:22px;
    }

    .home-hero-btn-primary,
    .home-hero-btn-secondary{
      width:100%;
    }

    .home-hero-panel{
      padding:18px;
      border-radius:20px;
    }

    .home-hero-bottom{
      grid-template-columns:1fr;
    }

    .home-hero-meta{
      gap:8px 14px;
    }
  }

  @media (max-width: 480px){
    .home-hero-shell{
      padding-top:82px;
      padding-bottom:28px;
    }

    .home-hero-badge{
      font-size:.68rem;
      margin-bottom:14px;
    }

    .home-hero-title{
      letter-spacing:-1.2px;
      max-width:11ch;
    }

    .home-hero-point{
      padding:11px 12px;
      font-size:.82rem;
    }

    .home-hero-panel-top{
      flex-direction:column;
      align-items:flex-start;
    }

    .home-hero-choice{
      padding:14px;
    }

    .home-hero-choice-top{
      align-items:flex-start;
      flex-direction:column;
      gap:8px;
    }
  }
`;

const HERO_POINTS = [
  "Binnen 48 uur live",
  "Gebouwd voor lokale ondernemers",
  "Gericht op meer aanvragen",
  "Onderhoud en support inbegrepen",
];

const HERO_CHOICES = [
  {
    title: "Zichtbaar",
    badge: "€99/m",
    text: "Voor ondernemers die snel professioneel online willen staan zonder gedoe.",
    href: "#pricing",
  },
  {
    title: "Groei",
    badge: "Meest gekozen",
    text: "Voor ondernemers die hun website echt willen inzetten voor meer klanten en aanvragen.",
    href: "#pricing",
  },
  {
    title: "Automatiseren",
    badge: "Vanaf €249/m",
    text: "Voor reserveringen, intake of processen die via je website moeten meewerken.",
    href: "#pricing",
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
              Een website die niet alleen mooi is,
              <span className="accent">maar klanten oplevert.</span>
            </h1>

            <p className="home-hero-text">
              Vedantix bouwt websites voor lokale ondernemers die snel live moeten, professioneel willen overkomen
              en meer aanvragen willen krijgen — zonder technisch gedoe of losse partijen.
            </p>

            <div className="home-hero-points">
              {HERO_POINTS.map((point) => (
                <div key={point} className="home-hero-point">
                  <span>{point}</span>
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

          <div className="home-hero-panel">
            <div className="home-hero-panel-top">
              <div className="home-hero-panel-label">Snel kiezen</div>
              <div className="home-hero-panel-chip">Wat past bij jou?</div>
            </div>

            <h2 className="home-hero-panel-title">
              Kies niet eerst een techniek.
              <br />
              Kies eerst je doel.
            </h2>

            <p className="home-hero-panel-text">
              De meeste bezoekers willen direct weten: wil ik vooral professioneel online staan, meer klanten krijgen
              of processen laten meewerken? Hieronder zie je meteen de drie richtingen.
            </p>

            <div className="home-hero-choice-grid">
              {HERO_CHOICES.map((choice) => (
                <div key={choice.title} className="home-hero-choice">
                  <div className="home-hero-choice-top">
                    <div className="home-hero-choice-title">{choice.title}</div>
                    <div className="home-hero-choice-badge">{choice.badge}</div>
                  </div>

                  <div className="home-hero-choice-text">{choice.text}</div>

                  <a href={choice.href} className="home-hero-choice-link">
                    Bekijk pakket →
                  </a>
                </div>
              ))}
            </div>

            <div className="home-hero-bottom">
              <div className="home-hero-stat">
                <strong>48 uur</strong>
                <span>Snel live voor veel standaard websites</span>
              </div>

              <div className="home-hero-stat">
                <strong>1 partij</strong>
                <span>Website, updates en support onder één dak</span>
              </div>

              <div className="home-hero-stat">
                <strong>Meer actie</strong>
                <span>Gericht op bellen, appen en aanvragen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}