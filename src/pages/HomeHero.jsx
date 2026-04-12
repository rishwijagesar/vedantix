const HERO_CHECKS = [
  "Sterke eerste versie binnen 48 uur",
  "Gebouwd voor afspraken, aanvragen en WhatsApp",
  "Hosting, onderhoud en support inbegrepen",
  "Betaling na oplevering — niet tevreden, niet betalen",
];

const MOCKUP_SERVICES = [
  ["✂️", "Knippen", "vanaf €18"],
  ["🧔", "Baardverzorging", "vanaf €12"],
  ["💈", "Fade & Styling", "vanaf €22"],
];

export const HOME_HERO_STYLES = `
  .hero-btn-primary{
    background:#fff;
    color:#0f172a;
    padding:14px 22px;
    border-radius:12px;
    font-weight:800;
    font-size:.88rem;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:all .25s cubic-bezier(.4,0,.2,1);
    border:none;
    cursor:pointer;
    letter-spacing:-.1px;
    box-shadow:0 8px 24px rgba(0,0,0,.24);
    min-height:48px;
    white-space:nowrap;
  }

  .hero-btn-primary:hover{
    background:#f1f5f9;
    transform:translateY(-2px);
    box-shadow:0 14px 30px rgba(0,0,0,.30);
  }

  .hero-btn-wa{
    background:#25d366;
    color:#fff;
    padding:14px 22px;
    border-radius:12px;
    font-weight:800;
    font-size:.88rem;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:all .25s cubic-bezier(.4,0,.2,1);
    border:none;
    cursor:pointer;
    box-shadow:0 8px 24px rgba(37,211,102,.24);
    min-height:48px;
    white-space:nowrap;
  }

  .hero-btn-wa:hover{
    background:#22c55e;
    transform:translateY(-2px);
    box-shadow:0 14px 30px rgba(37,211,102,.34);
  }

  .hero-btn-ghost{
    background:rgba(255,255,255,.06);
    color:#fff;
    border:1.5px solid rgba(255,255,255,.16);
    padding:13px 20px;
    border-radius:12px;
    font-weight:800;
    font-size:.88rem;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:all .25s;
    cursor:pointer;
    backdrop-filter:blur(4px);
    min-height:48px;
    white-space:nowrap;
  }

  .hero-btn-ghost:hover{
    background:rgba(255,255,255,.1);
    border-color:rgba(255,255,255,.28);
    color:#fff;
    transform:translateY(-2px);
  }

  .hero{
    background:linear-gradient(150deg,#060c1a 0%,#0a1428 38%,#0d1f3c 72%,#0f1e38 100%);
    min-height:calc(100svh - 72px);
    display:flex;
    align-items:center;
    padding:92px 5% 28px;
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
    grid-template-columns:minmax(0,1.02fr) minmax(340px,.9fr);
    gap:34px;
    align-items:center;
    position:relative;
    z-index:1;
  }

  .hero-content{
    min-width:0;
    max-width:640px;
    position:relative;
    z-index:2;
  }

  .hero-eyebrow{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.8);
    font-size:.64rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.7px;
    padding:8px 16px;
    border-radius:999px;
    margin-bottom:16px;
  }

  .hero-eyebrow::before{
    content:'';
    width:6px;
    height:6px;
    background:#22c55e;
    border-radius:50%;
    flex-shrink:0;
    animation:pulse 2s infinite;
  }

  @keyframes pulse{
    0%,100%{opacity:1}
    50%{opacity:.35}
  }

  @keyframes float{
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-8px)}
  }

  .hero h1{
    font-size:clamp(2.45rem,4.1vw,4.1rem);
    font-weight:900;
    line-height:.98;
    color:#fff;
    margin-bottom:14px;
    letter-spacing:-1.8px;
    max-width:620px;
    text-wrap:balance;
  }

  .hero h1 span{
    background:linear-gradient(125deg,#60a5fa 0%,#818cf8 50%,#a78bfa 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
  }

  .hero-sub{
    font-size:.95rem;
    color:rgba(255,255,255,.72);
    line-height:1.68;
    margin-bottom:10px;
    max-width:590px;
    font-weight:400;
  }

  .hero-sub strong{
    color:#fff;
    font-weight:700;
  }

  .hero-microcopy{
    font-size:.76rem;
    color:rgba(255,255,255,.46);
    margin-bottom:14px;
    font-weight:600;
    max-width:560px;
  }

  .hero-checks{
    margin-bottom:16px;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:8px 14px;
    max-width:590px;
  }

  .hero-check{
    display:flex;
    align-items:flex-start;
    gap:10px;
    font-size:.8rem;
    color:rgba(255,255,255,.8);
    font-weight:600;
    line-height:1.45;
  }

  .hero-check::before{
    content:'✓';
    color:#22c55e;
    font-weight:900;
    font-size:.74rem;
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
    margin-bottom:10px;
  }

  .hero-cta-note{
    font-size:.72rem;
    color:rgba(255,255,255,.44);
    font-weight:600;
    margin-bottom:14px;
  }

  .hero-social-proof{
    display:flex;
    align-items:flex-start;
    gap:18px;
    padding-top:12px;
    border-top:1px solid rgba(255,255,255,.07);
    max-width:590px;
  }

  .hero-sp-item{
    flex:1;
    min-width:0;
  }

  .hero-sp-stat{
    font-size:.86rem;
    font-weight:800;
    color:#fff;
    line-height:1.1;
    margin-bottom:4px;
  }

  .hero-sp-text{
    font-size:.69rem;
    color:rgba(255,255,255,.44);
    font-weight:500;
    line-height:1.38;
  }

  .hero-divider{
    width:1px;
    height:34px;
    background:rgba(255,255,255,.08);
    flex-shrink:0;
  }

  .hero-mockup-wrap{
    position:relative;
    width:100%;
    display:flex;
    justify-content:flex-end;
    align-items:center;
  }

  .hero-mockup-wrap::before{
    content:'';
    position:absolute;
    top:-18px;
    left:-8px;
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
    animation:float 5s ease-in-out infinite;
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

  .mockup-label{
    font-size:.6rem;
    font-weight:800;
    color:rgba(255,255,255,.45);
    text-transform:uppercase;
    letter-spacing:1.4px;
    margin-bottom:8px;
  }

  .mockup-title{
    font-size:1.18rem;
    font-weight:900;
    margin-bottom:6px;
    letter-spacing:-.3px;
  }

  .mockup-sub{
    font-size:.76rem;
    color:rgba(255,255,255,.68);
    margin-bottom:12px;
  }

  .mockup-meta{
    display:flex;
    justify-content:center;
    gap:12px;
    padding-top:10px;
    border-top:1px solid rgba(255,255,255,.08);
    flex-wrap:wrap;
  }

  .mockup-meta span{
    font-size:.66rem;
    color:rgba(255,255,255,.7);
    font-weight:700;
  }

  .mockup-services{
    padding:14px;
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
    font-size:.74rem;
    font-weight:800;
    color:#111827;
  }

  .mockup-item span:last-child{
    color:#6366f1;
    font-size:.68rem;
  }

  .mockup-actions{
    padding:12px 14px;
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
    font-size:.68rem;
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
    font-size:.71rem;
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

  @media (min-width:1500px){
    .hero{
      padding:102px 5% 34px;
    }

    .hero-container{
      max-width:1320px;
      grid-template-columns:minmax(0,1fr) minmax(380px,.92fr);
      gap:44px;
    }

    .hero-mockup{
      max-width:500px;
    }
  }

  @media (max-width:1360px){
    .hero{
      padding:86px 5% 24px;
      min-height:auto;
      align-items:flex-start;
    }

    .hero-container{
      grid-template-columns:minmax(0,560px) minmax(300px,390px);
      gap:26px;
      align-items:start;
    }

    .hero-content{
      max-width:560px;
    }

    .hero h1{
      font-size:clamp(2.15rem,3.55vw,3.25rem);
      max-width:530px;
      margin-bottom:12px;
    }

    .hero-sub{
      font-size:.9rem;
      line-height:1.62;
      max-width:520px;
      margin-bottom:8px;
    }

    .hero-microcopy{
      margin-bottom:12px;
    }

    .hero-checks{
      margin-bottom:14px;
      gap:7px 12px;
      max-width:520px;
    }

    .hero-ctas{
      margin-bottom:8px;
    }

    .hero-cta-note{
      margin-bottom:12px;
    }

    .hero-social-proof{
      gap:14px;
      max-width:520px;
    }

    .hero-sp-stat{
      font-size:.82rem;
    }

    .hero-sp-text{
      font-size:.67rem;
    }

    .hero-mockup{
      max-width:390px;
    }

    .hero-btn-primary,
    .hero-btn-wa,
    .hero-btn-ghost{
      padding:12px 16px;
      min-height:46px;
      font-size:.82rem;
    }
  }

  @media (max-width:1180px){
    .hero{
      padding:82px 5% 22px;
      min-height:auto;
    }

    .hero-container{
      grid-template-columns:minmax(0,1fr) 360px;
      gap:24px;
      align-items:start;
    }

    .hero-content{
      max-width:520px;
    }

    .hero h1{
      font-size:clamp(2rem,3.2vw,2.75rem);
      max-width:500px;
    }

    .hero-sub{
      max-width:500px;
      font-size:.88rem;
    }

    .hero-checks{
      grid-template-columns:1fr;
      max-width:430px;
    }

    .hero-social-proof{
      max-width:500px;
      gap:10px;
    }

    .hero-sp-text{
      font-size:.65rem;
    }

    .hero-mockup{
      max-width:360px;
    }
  }

  @media (max-width:900px){
    .hero{
      padding:76px 5% 26px;
      min-height:auto;
    }

    .hero-container{
      grid-template-columns:1fr;
      gap:0;
      text-align:left;
    }

    .hero-content{
      max-width:620px;
    }

    .hero h1{
      font-size:2.15rem;
      max-width:560px;
    }

    .hero-sub{
      max-width:560px;
      font-size:.92rem;
    }

    .hero-checks{
      grid-template-columns:1fr;
      max-width:500px;
    }

    .hero-social-proof{
      display:grid;
      grid-template-columns:repeat(3,1fr);
      max-width:560px;
      gap:12px;
    }

    .hero-divider{
      display:none;
    }

    .hero-mockup-wrap{
      display:none;
    }
  }

  @media(max-width:640px){
    .hero{
      padding:70px 5% 22px;
    }

    .hero-eyebrow{
      font-size:.6rem;
      letter-spacing:1.4px;
      padding:8px 14px;
      margin-bottom:14px;
    }

    .hero h1{
      font-size:1.8rem;
      line-height:1.02;
      letter-spacing:-1px;
      max-width:100%;
    }

    .hero-sub{
      font-size:.87rem;
      line-height:1.64;
      max-width:100%;
    }

    .hero-microcopy{
      display:none;
    }

    .hero-checks{
      display:none;
    }

    .hero-social-proof{
      display:none;
    }

    .hero-ctas{
      flex-direction:column;
      width:100%;
      align-items:stretch;
    }

    .hero-btn-primary,
    .hero-btn-wa,
    .hero-btn-ghost{
      width:100%;
      text-align:center;
    }
  }

  @media(max-width:480px){
    .hero{
      padding:66px 5% 18px;
    }

    .hero h1{
      font-size:1.58rem;
      letter-spacing:-.8px;
    }

    .hero-sub{
      font-size:.83rem;
    }

    .hero-sticky-cta{
      left:16px;
      right:16px;
      bottom:16px;
      display:block;
    }

    .hero-sticky-cta .hero-btn-wa{
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

            <h1>
              Een website die
              <br />
              <span>vertrouwen wekt</span>
              <br />
              en meer aanvragen oplevert
            </h1>

            <p className="hero-sub">
              Meer afspraken, aanvragen en contactmomenten — zonder technisch gedoe.
              Wij bouwen een website die <strong>professioneel overkomt, direct duidelijk maakt wat je doet</strong> en bezoekers sneller richting WhatsApp, bellen of een aanvraag stuurt.
            </p>

            <div className="hero-microcopy">
              Ook geschikt als je nog geen bestaande website, reviews of uitgebreide content hebt.
            </div>

            <div className="hero-checks">
              {HERO_CHECKS.map((item) => (
                <div key={item} className="hero-check">
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-ctas">
              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20kennismaking%20voor%20mijn%20website."
                target="_blank"
                rel="noreferrer"
                className="hero-btn-primary"
              >
                Plan gratis kennismaking →
              </a>

              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20website%20scan."
                target="_blank"
                rel="noreferrer"
                className="hero-btn-wa"
              >
                Ontvang gratis website scan
              </a>

              <a href="#demo" className="hero-btn-ghost">
                Bekijk voorbeelden →
              </a>
            </div>

            <div className="hero-cta-note">
              Betaling na oplevering · duidelijke afspraken · geen risico
            </div>

            <div className="hero-social-proof">
              <div className="hero-sp-item">
                <div className="hero-sp-stat">Sterkere eerste indruk</div>
                <div className="hero-sp-text">Professioneler overkomen vanaf het eerste bezoek</div>
              </div>

              <div className="hero-divider" />

              <div className="hero-sp-item">
                <div className="hero-sp-stat">Meer actie</div>
                <div className="hero-sp-text">Gebouwd voor bellen, WhatsApp en aanvragen</div>
              </div>

              <div className="hero-divider" />

              <div className="hero-sp-item">
                <div className="hero-sp-stat">Minder gedoe</div>
                <div className="hero-sp-text">Hosting, onderhoud en support onder één partij</div>
              </div>
            </div>
          </div>

          <div className="hero-mockup-wrap" aria-hidden="true">
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
                <div className="mockup-label">Demo concept voor kapper / barber</div>
                <div className="mockup-title">Barbershop Amsterdam</div>
                <div className="mockup-sub">
                  Duidelijk. Snel. Gericht op afspraak of WhatsApp.
                </div>

                <div className="mockup-meta">
                  <span>⭐ Professionele eerste indruk</span>
                  <span>📱 Mobielvriendelijk</span>
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
          className="hero-btn-wa"
        >
          💬 Start gesprek
        </a>
      </div>
    </>
  );
}