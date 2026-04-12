const HERO_CHECKS = [
  "Sterke eerste versie binnen 48 uur",
  "Gebouwd voor afspraken, aanvragen en WhatsApp",
  "Hosting, onderhoud en support inbegrepen",
  "Niet tevreden? Je betaalt niets",
];

const MOCKUP_SERVICES = [
  ["✂️", "Knippen", "vanaf €18"],
  ["🧔", "Baardverzorging", "vanaf €12"],
  ["💈", "Fade & Styling", "vanaf €22"],
];

export const HOME_HERO_STYLES = `
  .hero{
    background:linear-gradient(150deg,#060c1a 0%,#0a1428 38%,#0d1f3c 72%,#0f1e38 100%);
    min-height:calc(100svh - 72px);
    display:flex;
    align-items:center;
    padding:104px 5% 44px;
    position:relative;
    overflow:hidden;
  }

  .hero::before{
    content:'';
    position:absolute;
    inset:0;
    background:
      radial-gradient(ellipse at 68% 36%,rgba(59,130,246,.14) 0%,transparent 58%),
      radial-gradient(ellipse at 20% 80%,rgba(99,102,241,.08) 0%,transparent 52%);
    pointer-events:none;
  }

  .hero-container{
    max-width:1240px;
    margin:0 auto;
    width:100%;
    display:grid;
    grid-template-columns:minmax(0,1.04fr) minmax(320px,.84fr);
    gap:36px;
    align-items:center;
    position:relative;
    z-index:1;
  }

  .hero-content{
    min-width:0;
  }

  .hero-eyebrow{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.8);
    font-size:.66rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.7px;
    padding:8px 16px;
    border-radius:999px;
    margin-bottom:18px;
  }

  .hero-eyebrow::before{
    content:'';
    width:6px;
    height:6px;
    background:#22c55e;
    border-radius:50%;
    flex-shrink:0;
  }

  .hero h1{
    font-size:clamp(2.2rem,4.2vw,4rem);
    font-weight:900;
    line-height:1.02;
    color:#fff;
    margin-bottom:16px;
    letter-spacing:-1.8px;
    max-width:620px;
  }

  .hero-sub{
    font-size:1rem;
    color:rgba(255,255,255,.72);
    line-height:1.72;
    margin-bottom:20px;
    max-width:610px;
    font-weight:400;
  }

  .hero-checks{
    margin-bottom:20px;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:8px 14px;
    max-width:680px;
  }

  .hero-check{
    display:flex;
    align-items:flex-start;
    gap:10px;
    font-size:.83rem;
    color:rgba(255,255,255,.8);
    font-weight:600;
    line-height:1.45;
  }

  .hero-check::before{
    content:'✓';
    color:#22c55e;
    font-weight:900;
    font-size:.75rem;
    flex-shrink:0;
    background:rgba(34,197,94,.12);
    width:18px;
    height:18px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:1px;
  }

  .hero-ctas{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    align-items:center;
    margin-bottom:12px;
  }

  .hero-cta-note{
    font-size:.74rem;
    color:rgba(255,255,255,.44);
    font-weight:600;
  }

  .btn-primary{
    background:#fff;
    color:#0f172a;
    padding:14px 24px;
    border-radius:12px;
    font-weight:800;
    font-size:.9rem;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:all .25s cubic-bezier(.4,0,.2,1);
    border:none;
    cursor:pointer;
    letter-spacing:-.1px;
    box-shadow:0 8px 24px rgba(0,0,0,.24);
    min-height:50px;
    white-space:nowrap;
  }

  .btn-primary:hover{
    background:#f1f5f9;
    transform:translateY(-2px);
    box-shadow:0 14px 30px rgba(0,0,0,.30);
  }

  .btn-wa{
    background:#25d366;
    color:#fff;
    padding:14px 24px;
    border-radius:12px;
    font-weight:800;
    font-size:.9rem;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:all .25s cubic-bezier(.4,0,.2,1);
    border:none;
    cursor:pointer;
    box-shadow:0 8px 24px rgba(37,211,102,.24);
    min-height:50px;
    white-space:nowrap;
  }

  .btn-wa:hover{
    background:#22c55e;
    transform:translateY(-2px);
    box-shadow:0 14px 30px rgba(37,211,102,.34);
  }

  .btn-ghost{
    background:rgba(255,255,255,.06);
    color:#fff;
    border:1.5px solid rgba(255,255,255,.16);
    padding:13px 22px;
    border-radius:12px;
    font-weight:800;
    font-size:.9rem;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:all .25s;
    cursor:pointer;
    backdrop-filter:blur(4px);
    min-height:50px;
    white-space:nowrap;
  }

  .btn-ghost:hover{
    background:rgba(255,255,255,.1);
    border-color:rgba(255,255,255,.28);
    color:#fff;
    transform:translateY(-2px);
  }

  .hero-mockup-wrap{
    position:relative;
    width:100%;
  }

  .hero-mockup-wrap::before{
    content:'';
    position:absolute;
    top:-18px;
    left:-18px;
    right:-18px;
    bottom:-18px;
    background:radial-gradient(ellipse at center,rgba(99,102,241,.18) 0%,rgba(59,130,246,.06) 45%,transparent 70%);
    pointer-events:none;
    z-index:0;
    border-radius:34px;
  }

  .hero-mockup{
    background:#fff;
    border-radius:22px;
    overflow:hidden;
    box-shadow:0 0 0 1px rgba(255,255,255,.07),0 24px 64px rgba(0,0,0,.45),0 8px 24px rgba(0,0,0,.22);
    position:relative;
    z-index:1;
    width:100%;
    max-width:470px;
    margin-left:auto;
  }

  .mockup-bar{
    background:#141a27;
    padding:10px 14px;
    display:flex;
    align-items:center;
    gap:6px;
    border-bottom:1px solid rgba(255,255,255,.04);
  }

  .mockup-dot{
    width:8px;
    height:8px;
    border-radius:50%;
  }

  .mockup-url{
    flex:1;
    background:rgba(255,255,255,.06);
    border-radius:5px;
    height:18px;
    margin:0 12px;
    display:flex;
    align-items:center;
    padding:0 10px;
  }

  .mockup-url span{
    font-size:.58rem;
    color:rgba(255,255,255,.35);
    font-weight:500;
  }

  .mockup-header{
    background:linear-gradient(135deg,#0a1628,#0d2146);
    padding:22px 20px;
    color:#fff;
    text-align:center;
  }

  .mockup-title{
    font-size:1.22rem;
    font-weight:900;
    margin-bottom:6px;
    letter-spacing:-.4px;
  }

  .mockup-sub{
    font-size:.78rem;
    color:rgba(255,255,255,.68);
  }

  .mockup-services{
    padding:16px;
    background:#f9fafb;
    display:flex;
    flex-direction:column;
    gap:8px;
  }

  .mockup-item{
    background:#fff;
    padding:9px 12px;
    border-radius:10px;
    display:grid;
    grid-template-columns:auto 1fr auto;
    gap:10px;
    align-items:center;
    box-shadow:0 1px 4px rgba(0,0,0,.04);
    border:1px solid #f3f4f6;
    font-size:.76rem;
    font-weight:800;
    color:#111827;
  }

  .mockup-item span:last-child{
    color:#6366f1;
    font-size:.7rem;
  }

  .mockup-actions{
    padding:12px 16px;
    background:#fff;
    border-top:1px solid #f3f4f6;
    display:flex;
    gap:8px;
  }

  .mockup-actions button{
    flex:1;
    padding:9px 10px;
    border-radius:9px;
    border:none;
    font-weight:800;
    font-size:.7rem;
    cursor:pointer;
  }

  .mockup-actions button:first-child{
    background:#111827;
    color:#fff;
  }

  .mockup-actions button:last-child{
    background:#25d366;
    color:#fff;
  }

  .mockup-note{
    margin-top:12px;
    font-size:.72rem;
    color:rgba(255,255,255,.35);
    text-align:center;
    font-weight:600;
  }

  .hero-sticky-cta{
    position:fixed;
    right:20px;
    bottom:20px;
    z-index:999;
    display:none;
  }

  @media (max-width: 1024px){
    .hero{
      padding:90px 5% 54px;
      min-height:auto;
      align-items:flex-start;
    }

    .hero-container{
      grid-template-columns:1fr;
      gap:32px;
      text-align:center;
    }

    .hero-content{
      display:flex;
      flex-direction:column;
      align-items:center;
    }

    .hero h1{
      max-width:720px;
    }

    .hero-sub{
      margin-left:auto;
      margin-right:auto;
    }

    .hero-checks{
      grid-template-columns:1fr;
      max-width:460px;
      margin-left:auto;
      margin-right:auto;
      text-align:left;
    }

    .hero-ctas{
      justify-content:center;
    }

    .hero-mockup{
      max-width:540px;
      margin:0 auto;
    }
  }

  @media(max-width:768px){
    .hero{
      padding:82px 5% 46px;
    }

    .hero h1{
      font-size:1.98rem;
      line-height:1.08;
      letter-spacing:-1px;
    }

    .hero-sub{
      font-size:.9rem;
      line-height:1.68;
    }

    .hero-checks{
      display:none;
    }

    .hero-ctas{
      flex-direction:column;
      width:100%;
    }

    .hero-ctas a,
    .btn-primary,
    .btn-wa,
    .btn-ghost{
      width:100%;
      text-align:center;
    }

    .hero-mockup-wrap::before{
      display:none;
    }
  }

  @media(max-width:480px){
    .hero{
      padding:72px 5% 36px;
    }

    .hero h1{
      font-size:1.64rem;
      letter-spacing:-.7px;
    }

    .hero-sub{
      font-size:.85rem;
    }

    .hero-sticky-cta{
      left:16px;
      right:16px;
      bottom:16px;
      display:block;
    }

    .hero-sticky-cta .btn-wa{
      width:100%;
      text-align:center;
      display:flex;
      padding:14px 18px;
      box-shadow:0 12px 30px rgba(37,211,102,.28);
    }
  }
`;

export default function HomeHero() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              Voor lokale ondernemers die meer klanten willen
            </div>

            <h1>Een website die vertrouwen wekt</h1>

            <p className="hero-sub">
              Meer afspraken, aanvragen en contactmomenten — zonder technisch gedoe.
              Wij bouwen een website die direct duidelijk maakt waarom klanten voor jou kiezen.
            </p>

            <div className="hero-checks">
              {HERO_CHECKS.map((item) => (
                <div key={item} className="hero-check">
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-ctas">
              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20kennismaking."
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Plan gratis kennismaking →
              </a>

              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20website%20scan."
                target="_blank"
                rel="noreferrer"
                className="btn-wa"
              >
                Ontvang gratis website scan
              </a>

              <a href="#demo" className="btn-ghost">
                Bekijk voorbeelden →
              </a>
            </div>

            <div className="hero-cta-note">
              Vrijblijvend · binnen 48 uur eerste versie · geen risico
            </div>
          </div>

          <div className="hero-mockup-wrap">
            <div className="hero-mockup">
              <div className="mockup-bar">
                <div className="mockup-dot" style={{ background: "#ff5f57" }} />
                <div className="mockup-dot" style={{ background: "#febc2e" }} />
                <div className="mockup-dot" style={{ background: "#28c840" }} />
                <div className="mockup-url">
                  <span>barbershop-amsterdam.nl</span>
                </div>
              </div>

              <div className="mockup-header">
                <div className="mockup-title">Barbershop Amsterdam</div>
                <div className="mockup-sub">
                  Duidelijk. Snel. Gericht op afspraak of WhatsApp.
                </div>
              </div>

              <div className="mockup-services">
                {MOCKUP_SERVICES.map(([icon, name, price]) => (
                  <div key={name} className="mockup-item">
                    <span>{icon}</span>
                    <span>{name}</span>
                    <span>{price}</span>
                  </div>
                ))}
              </div>

              <div className="mockup-actions">
                <button type="button">📅 Afspraak maken</button>
                <button type="button">💬 WhatsApp</button>
              </div>
            </div>

            <p className="mockup-note">
              Demo mockup • bedoeld om richting en stijl te laten zien
            </p>
          </div>
        </div>
      </section>

      <div className="hero-sticky-cta">
        <a
          href="https://wa.me/310626219989"
          target="_blank"
          rel="noreferrer"
          className="btn-wa"
        >
          💬 Start gesprek
        </a>
      </div>
    </>
  );
}