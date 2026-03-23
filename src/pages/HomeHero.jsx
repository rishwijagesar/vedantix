const HERO_CHECKS = [
    "Binnen 48 uur een sterke eerste versie live",
    "Gebouwd voor contact, aanvragen of afspraken",
    "Hosting, onderhoud en support onder één partij",
    "Pas verder als de richting goed voelt",
  ];
  
  const MOCKUP_SERVICES = [
    ["✂️", "Knippen", "vanaf €18"],
    ["🧔", "Baardverzorging", "vanaf €12"],
    ["💈", "Fade & Styling", "vanaf €22"],
  ];
  
  const CTA_META = [
    "Vrijblijvende kennismaking",
    "Heldere maandprijs",
    "Onderhoud inbegrepen",
    "Snel schakelen via WhatsApp",
  ];
  
  export const HOME_HERO_STYLES = `
    .btn-primary{
      background:#fff;
      color:#0f172a;
      padding:15px 30px;
      border-radius:10px;
      font-weight:800;
      font-size:.92rem;
      text-decoration:none;
      display:inline-block;
      transition:all .25s cubic-bezier(.4,0,.2,1);
      border:none;
      cursor:pointer;
      letter-spacing:-.1px;
      box-shadow:0 4px 16px rgba(0,0,0,.25)
    }
    .btn-primary:hover{
      background:#f1f5f9;
      transform:translateY(-2px);
      box-shadow:0 10px 32px rgba(0,0,0,.35)
    }
  
    .btn-wa{
      background:#25d366;
      color:#fff;
      padding:15px 30px;
      border-radius:10px;
      font-weight:800;
      font-size:.92rem;
      text-decoration:none;
      display:inline-block;
      transition:all .25s cubic-bezier(.4,0,.2,1);
      border:none;
      cursor:pointer;
      box-shadow:0 4px 20px rgba(37,211,102,.3)
    }
    .btn-wa:hover{
      background:#22c55e;
      transform:translateY(-2px);
      box-shadow:0 10px 32px rgba(37,211,102,.4)
    }
  
    .btn-ghost{
      background:rgba(255,255,255,.06);
      color:#fff;
      border:1.5px solid rgba(255,255,255,.18);
      padding:14px 28px;
      border-radius:10px;
      font-weight:800;
      font-size:.92rem;
      text-decoration:none;
      display:inline-block;
      transition:all .25s;
      cursor:pointer;
      backdrop-filter:blur(4px)
    }
    .btn-ghost:hover{
      background:rgba(255,255,255,.12);
      border-color:rgba(255,255,255,.28);
      color:#fff;
      transform:translateY(-2px)
    }
  
    .hero{
      background:linear-gradient(150deg,#060c1a 0%,#0a1428 40%,#0d1f3c 70%,#0f1e38 100%);
      min-height:100vh;
      display:flex;
      align-items:center;
      padding:140px 5% 100px;
      position:relative;
      overflow:hidden
    }
    .hero::before{
      content:'';
      position:absolute;
      inset:0;
      background:
        radial-gradient(ellipse at 65% 38%,rgba(59,130,246,.13) 0%,transparent 58%),
        radial-gradient(ellipse at 20% 80%,rgba(99,102,241,.07) 0%,transparent 50%);
      pointer-events:none
    }
    .hero-container{
      max-width:1280px;
      margin:0 auto;
      width:100%;
      display:grid;
      grid-template-columns:minmax(0,1fr) 500px;
      gap:72px;
      align-items:center
    }
    .hero-content{
      min-width:0
    }
    .hero-eyebrow{
      display:inline-flex;
      align-items:center;
      gap:8px;
      background:rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.1);
      color:rgba(255,255,255,.78);
      font-size:.7rem;
      font-weight:700;
      text-transform:uppercase;
      letter-spacing:1.8px;
      padding:8px 18px;
      border-radius:100px;
      margin-bottom:24px
    }
    .hero-eyebrow::before{
      content:'';
      width:6px;
      height:6px;
      background:#22c55e;
      border-radius:50%;
      animation:pulse 2s infinite;
      flex-shrink:0
    }
  
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  
    .hero h1{
      font-size:clamp(2.7rem,4.8vw,4.35rem);
      font-weight:900;
      line-height:1.04;
      color:#fff;
      margin-bottom:22px;
      letter-spacing:-2px;
      max-width:780px
    }
    .hero h1 span{
      background:linear-gradient(125deg,#60a5fa 0%,#818cf8 50%,#a78bfa 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text
    }
    .hero-sub{
      font-size:1.03rem;
      color:rgba(255,255,255,.68);
      line-height:1.78;
      margin-bottom:18px;
      max-width:620px;
      font-weight:400
    }
    .hero-sub strong{color:#fff;font-weight:700}
    .hero-microcopy{
      font-size:.82rem;
      color:rgba(255,255,255,.45);
      margin-bottom:28px;
      font-weight:600
    }
  
    .hero-checks{
      margin-bottom:30px;
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:12px 18px;
      max-width:720px
    }
    .hero-check{
      display:flex;
      align-items:flex-start;
      gap:12px;
      font-size:.88rem;
      color:rgba(255,255,255,.78);
      font-weight:600;
      letter-spacing:.1px
    }
    .hero-check::before{
      content:'✓';
      color:#22c55e;
      font-weight:900;
      font-size:.85rem;
      flex-shrink:0;
      background:rgba(34,197,94,.12);
      width:20px;
      height:20px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      text-align:center;
      line-height:20px;
      margin-top:1px
    }
  
    .hero-ctas{
      display:flex;
      gap:14px;
      flex-wrap:wrap;
      align-items:center;
      margin-bottom:18px
    }
    .hero-cta-note{
      font-size:.78rem;
      color:rgba(255,255,255,.42);
      font-weight:600;
      margin-bottom:30px
    }
  
    .hero-social-proof{
      display:flex;
      align-items:center;
      gap:20px;
      padding-top:22px;
      border-top:1px solid rgba(255,255,255,.07)
    }
    .hero-sp-stat{
      font-size:1rem;
      font-weight:800;
      color:#fff;
      line-height:1;
      margin-bottom:6px
    }
    .hero-sp-text{
      font-size:.76rem;
      color:rgba(255,255,255,.42);
      font-weight:500;
      line-height:1.5
    }
  
    .hero-mockup-wrap{position:relative}
    .hero-mockup-wrap::before{
      content:'';
      position:absolute;
      top:-30px;
      left:-30px;
      right:-30px;
      bottom:-30px;
      background:radial-gradient(ellipse at center,rgba(99,102,241,.18) 0%,rgba(59,130,246,.06) 45%,transparent 70%);
      pointer-events:none;
      z-index:0;
      border-radius:40px
    }
    .hero-mockup{
      background:#fff;
      border-radius:22px;
      overflow:hidden;
      box-shadow:0 0 0 1px rgba(255,255,255,.07),0 32px 80px rgba(0,0,0,.55),0 8px 24px rgba(0,0,0,.3);
      animation:float 5s ease-in-out infinite;
      position:relative;
      z-index:1
    }
  
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  
    .mockup-bar{
      background:#141a27;
      padding:11px 16px;
      display:flex;
      align-items:center;
      gap:6px;
      border-bottom:1px solid rgba(255,255,255,.04)
    }
    .mockup-dot{width:9px;height:9px;border-radius:50%}
    .mockup-url{
      flex:1;
      background:rgba(255,255,255,.06);
      border-radius:5px;
      height:20px;
      margin:0 14px;
      display:flex;
      align-items:center;
      padding:0 10px
    }
    .mockup-url span{
      font-size:.6rem;
      color:rgba(255,255,255,.35);
      font-weight:500
    }
  
    .hero-sticky-cta{
      position:fixed;
      right:20px;
      bottom:20px;
      z-index:999;
      display:none
    }
  
    @media (min-width: 1440px) {
      .hero {
        padding:160px 5% 120px;
      }
    }
  
    @media (max-width: 1280px) {
      .hero {
        padding:110px 5% 60px;
        min-height:auto;
      }
  
      .hero-container {
        grid-template-columns:minmax(0,1fr) 440px;
        gap:40px;
        align-items:start;
      }
  
      .hero h1 {
        font-size:clamp(2.2rem,4vw,3rem);
        max-width:680px;
      }
  
      .hero-sub {
        font-size:.95rem;
        margin-bottom:14px;
        max-width:560px;
      }
  
      .hero-microcopy,
      .hero-checks,
      .hero-cta-note,
      .hero-social-proof {
        display:none;
      }
  
      .hero-ctas {
        margin-top:10px;
        margin-bottom:0;
      }
    }
  
    @media(max-width:1024px){
      .hero{
        padding:100px 5% 70px;
        min-height:auto;
      }
      .hero-container{
        grid-template-columns:1fr;
        gap:44px;
        text-align:center;
      }
      .hero-content{
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      .hero h1{
        font-size:2.45rem;
        max-width:700px;
      }
      .hero-sub{
        margin-left:auto;
        margin-right:auto;
        max-width:640px;
      }
      .hero-checks{
        display:grid;
        grid-template-columns:1fr;
        max-width:420px;
        margin:20px auto 28px;
        text-align:left;
      }
      .hero-microcopy,
      .hero-cta-note,
      .hero-social-proof{
        display:block;
      }
      .hero-social-proof{
        justify-content:center;
        width:100%;
      }
      .hero-mockup-wrap{
        max-width:560px;
        margin:0 auto;
        width:100%;
      }
    }
  
    @media(max-width:768px){
      .hero{
        padding:90px 5% 56px;
      }
      .hero h1{
        font-size:2rem;
        line-height:1.12;
        letter-spacing:-1px;
        margin-bottom:16px;
      }
      .hero-sub{
        font-size:.92rem;
        line-height:1.7;
        margin-bottom:12px;
      }
      .hero-microcopy{
        font-size:.78rem;
        margin-bottom:18px;
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
        gap:10px;
        margin-bottom:0;
      }
      .hero-ctas a{
        width:100%;
        text-align:center;
      }
      .hero-mockup-wrap{
        max-width:100%;
      }
    }
  
    @media(max-width:640px){
      .hero{
        padding:84px 5% 48px;
      }
      .hero-eyebrow{
        font-size:.62rem;
        letter-spacing:1.4px;
        padding:8px 14px;
        margin-bottom:18px;
      }
      .hero h1{
        font-size:1.84rem;
      }
      .hero-sub{
        font-size:.9rem;
      }
      .hero-microcopy{
        display:none;
      }
      .hero-mockup-wrap::before{
        display:none;
      }
      .mockup-bar{
        padding:10px 12px;
      }
    }
  
    @media(max-width:480px){
      .hero{
        padding:78px 5% 42px;
      }
      .hero h1{
        font-size:1.72rem;
        letter-spacing:-.7px;
      }
      .hero-sub{
        font-size:.88rem;
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
        display:block;
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
              <div className="hero-eyebrow">Voor kappers, salons, restaurants en lokale bedrijven</div>
  
              <h1>
                Meer klanten via jouw website —
                <br />
                <span>binnen 48 uur live</span>
              </h1>
  
              <p className="hero-sub">
                Vedantix bouwt websites voor lokale ondernemers die <strong>professioneel willen overkomen en sneller aanvragen,
                afspraken of contactmomenten</strong> willen binnenhalen. Geen lang traject, geen technisch gedoe, wel een website
                die direct duidelijk maakt waarom iemand voor jou moet kiezen.
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
                  className="btn-primary"
                  style={{ textAlign: "center" }}
                >
                  Plan gratis intake →
                </a>
  
                <a
                  href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20heb%20een%20vraag%20over%20een%20website."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa"
                  style={{ textAlign: "center" }}
                >
                  💬 Stel je vraag via WhatsApp
                </a>
  
                <a href="#demo" className="btn-ghost" style={{ textAlign: "center" }}>
                  Bekijk demo’s →
                </a>
              </div>
  
              <div className="hero-cta-note">
                Vrijblijvend gesprek · duidelijke pakketten · pas verder als de richting goed voelt
              </div>
  
              <div className="hero-social-proof">
                <div>
                  <div className="hero-sp-stat">Duidelijk</div>
                  <div className="hero-sp-text">Sterke boodschap en betere eerste indruk</div>
                </div>
                <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)" }} />
                <div>
                  <div className="hero-sp-stat">Praktisch</div>
                  <div className="hero-sp-text">Gebouwd voor contact, aanvragen en afspraken</div>
                </div>
                <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)" }} />
                <div>
                  <div className="hero-sp-stat">Zonder gedoe</div>
                  <div className="hero-sp-text">Hosting, onderhoud en support blijven geregeld</div>
                </div>
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
  
                <div
                  style={{
                    background: "linear-gradient(135deg,#0a1628,#0d2146)",
                    padding: "28px 24px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      marginBottom: 10,
                    }}
                  >
                    Demo concept voor kapper / barber
                  </div>
  
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: 6, letterSpacing: -0.5 }}>
                    Barbershop Amsterdam
                  </div>
  
                  <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.68)", marginBottom: 16 }}>
                    Duidelijk. Snel. Gericht op afspraak of WhatsApp.
                  </div>
  
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 16,
                      paddingTop: 12,
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
                      ⭐ Professionele eerste indruk
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
                      📱 Mobielvriendelijk
                    </span>
                  </div>
                </div>
  
                <div style={{ padding: "20px 20px", background: "#f9fafb" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {MOCKUP_SERVICES.map(([icon, name, price]) => (
                      <div
                        key={name}
                        style={{
                          background: "#fff",
                          padding: "10px 13px",
                          borderRadius: 10,
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                          border: "1px solid #f3f4f6",
                        }}
                      >
                        <span style={{ fontSize: "1rem" }}>{icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#111827" }}>{name}</div>
                        </div>
                        <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#6366f1" }}>{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div style={{ padding: "14px 20px", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      style={{
                        flex: 1,
                        background: "#111827",
                        color: "#fff",
                        padding: "9px 10px",
                        borderRadius: 9,
                        border: "none",
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        cursor: "pointer",
                      }}
                    >
                      📅 Afspraak maken
                    </button>
                    <button
                      type="button"
                      style={{
                        flex: 1,
                        background: "#25d366",
                        color: "#fff",
                        padding: "9px 10px",
                        borderRadius: 9,
                        border: "none",
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        cursor: "pointer",
                      }}
                    >
                      💬 WhatsApp
                    </button>
                  </div>
                </div>
              </div>
  
              <p
                style={{
                  marginTop: 16,
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.35)",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Demo mockup • bedoeld om richting en stijl te laten zien
              </p>
            </div>
          </div>
        </section>
  
        <div className="hero-sticky-cta">
          <a
            href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20meer%20weten%20over%20een%20website."
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