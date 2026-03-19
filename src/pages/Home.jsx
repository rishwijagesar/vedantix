import { useState } from "react";

if (typeof document !== "undefined") {
  let vp = document.querySelector('meta[name="viewport"]');
  if (!vp) {
    vp = document.createElement("meta");
    vp.name = "viewport";
    vp.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(vp);
  }
}

export default function Home() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#2c3e50", background: "#fff", lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{margin:0;padding:0}
        .btn-primary{background:#1a1a2e;color:#fff;padding:14px 36px;border-radius:8px;font-weight:700;font-size:0.95rem;text-decoration:none;display:inline-block;transition:all 0.3s;border:none;cursor:pointer;box-shadow:0 2px 8px rgba(26,26,46,0.15)}
        .btn-primary:hover{background:#2d2d4e;transform:translateY(-2px)}
        .btn-secondary{background:transparent;color:#1a1a2e;border:2px solid #1a1a2e;padding:12px 34px;border-radius:8px;font-weight:700;font-size:0.95rem;text-decoration:none;display:inline-block;transition:all 0.3s;cursor:pointer}
        .btn-secondary:hover{background:#1a1a2e;color:#fff}
        
        /* HERO */
        .hero{background:#f9fafb;padding:80px 5%;min-height:100vh;display:flex;align-items:center}
        .hero-container{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .hero-content h1{font-size:3.2rem;font-weight:900;line-height:1.2;color:#1a1a2e;margin-bottom:24px;letter-spacing:-0.5px}
        .hero-content p{font-size:1.1rem;color:#555;line-height:1.7;margin-bottom:32px;max-width:560px}
        .hero-bullets{margin-bottom:40px}
        .hero-bullets span{display:flex;align-items:center;gap:10px;font-size:0.95rem;color:#555;margin-bottom:10px;font-weight:500}
        .hero-bullets span:before{content:"✓";color:#2d73b1;font-weight:900;font-size:1.1rem}
        .hero-ctas{display:flex;gap:16px;margin-bottom:0}
        .hero-visual{background:linear-gradient(135deg,#f0f6fb 0%,#e8f4ff 100%);border-radius:16px;padding:60px 40px;min-height:500px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;overflow:hidden}
        .hero-visual::before{content:'';position:absolute;width:300px;height:300px;background:radial-gradient(circle,rgba(45,115,177,0.1) 0%,transparent 70%);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%)}
        .hero-visual-content{position:relative;z-index:1;text-align:center}
        .hero-visual-content h3{font-size:1.2rem;color:#1a1a2e;font-weight:700;margin-bottom:20px}
        .hero-visual-mockup{width:100%;max-width:280px;background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.08);padding:8px;aspect-ratio:9/16}
        .hero-visual-mockup-content{width:100%;height:100%;background:linear-gradient(180deg,#f0f6fb 0%,#e8f4ff 100%);border-radius:8px;display:flex;flex-direction:column;padding:20px;gap:12px}
        .hero-visual-mockup-content > div{height:8px;background:rgba(45,115,177,0.2);border-radius:4px}
        .hero-visual-mockup-content > div:nth-child(1){width:85%;height:18px;background:#2d73b1;border-radius:4px}
        .hero-visual-mockup-content > div:nth-child(2){width:100%;height:2px;background:rgba(45,115,177,0.1)}
        .hero-visual-mockup-content > div:nth-child(3){width:95%;height:14px;background:#2d73b1;border-radius:4px;margin-top:8px}
        .hero-visual-mockup-content > div:nth-child(4){width:90%;height:10px;background:rgba(45,115,177,0.15);border-radius:4px}
        .hero-visual-mockup-content > div:nth-child(5){width:100%;height:2px;background:rgba(45,115,177,0.1);margin-top:12px}
        .hero-visual-mockup-content > div:nth-child(6){width:80%;height:12px;background:rgba(45,115,177,0.2);border-radius:4px}
        
        /* SECTIONS */
        section{padding:100px 5%}
        .section-container{max-width:1200px;margin:0 auto}
        h2{font-size:2.8rem;font-weight:900;line-height:1.25;color:#1a1a2e;margin-bottom:24px;letter-spacing:-0.4px}
        h3{font-size:1.15rem;font-weight:700;color:#1a1a2e;line-height:1.3}
        .section-intro{font-size:1.05rem;color:#666;margin-bottom:56px;max-width:720px;line-height:1.6}
        
        /* PROBLEM */
        .problem{background:#fff}
        .problem-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:40px;margin-top:50px}
        .problem-item{padding-bottom:24px;border-bottom:1px solid #e8e8e8}
        .problem-item h3{color:#1a1a2e;margin-bottom:12px;font-size:1.08rem;font-weight:700}
        .problem-item p{color:#666;font-size:0.93rem;line-height:1.65;font-weight:500}
        
        /* SOLUTION */
        .solution{background:#f9fafb}
        .solution-intro{max-width:700px;margin-bottom:50px}
        .solution-text{max-width:650px}
        .solution-text h3{margin-bottom:12px}
        .solution-text p{color:#666;font-size:0.95rem;line-height:1.6;margin-bottom:24px}
        .solution-list{display:flex;flex-direction:column;gap:16px;margin-top:32px}
        .solution-list-item{display:flex;gap:16px;align-items:flex-start}
        .solution-list-item:before{content:"→";color:#2d73b1;font-weight:900;font-size:1.1rem;flex-shrink:0;margin-top:2px}
        .solution-list-item span{color:#555;font-size:0.95rem;line-height:1.6}
        
        /* RESULTS */
        .results{background:#1a1a2e;color:#fff;text-align:center;padding:120px 5%}
        .results h2{color:#fff;margin-bottom:20px}
        .results-intro{font-size:1.05rem;color:rgba(255,255,255,0.8);margin-bottom:60px;max-width:700px;margin-left:auto;margin-right:auto}
        .results-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;max-width:900px;margin:0 auto}
        .result-item strong{display:block;font-size:2.6rem;color:#4db8ff;font-weight:900;margin-bottom:8px}
        .result-item span{font-size:0.9rem;color:rgba(255,255,255,0.7);font-weight:500}
        .results-note{font-size:1rem;margin-top:60px;color:rgba(255,255,255,0.85);font-weight:600;color:#4db8ff}
        
        /* PRICING */
        .pricing{background:#fff;padding:120px 5%}
        .pricing-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:60px;max-width:1000px;margin-left:auto;margin-right:auto}
        .pricing-card{border:2px solid #e8e8e8;border-radius:12px;padding:44px 32px;transition:all 0.3s;position:relative}
        .pricing-card:hover{border-color:#2d73b1;transform:translateY(-4px)}
        .pricing-card.featured{border-color:#2d73b1;background:linear-gradient(135deg,#f0f6fb 0%,#f9fbfd 100%);transform:scale(1.04)}
        .pricing-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#2d73b1;color:#fff;padding:6px 18px;border-radius:100px;font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.5px}
        .pricing-name{font-size:1.3rem;font-weight:800;color:#1a1a2e;margin-bottom:4px}
        .pricing-subtitle{font-size:0.85rem;color:#999;margin-bottom:16px;font-weight:500}
        .pricing-value{font-size:2.8rem;font-weight:900;color:#1a1a2e;margin-bottom:4px}
        .pricing-value sup{font-size:1rem;font-weight:600}
        .pricing-setup{font-size:0.8rem;color:#aaa;margin-bottom:28px;font-weight:500}
        .pricing-features{list-style:none;padding:0;margin-bottom:32px;display:flex;flex-direction:column;gap:12px}
        .pricing-features li{font-size:0.9rem;color:#555;display:flex;gap:10px;align-items:flex-start}
        .pricing-features li:before{content:"✓";color:#2d73b1;font-weight:900;flex-shrink:0}
        
        /* ROI */
        .roi{background:#f9fafb;padding:100px 5%}
        .roi-content{max-width:680px;margin:0 auto}
        .roi-content h2{margin-bottom:20px;text-align:center}
        .roi-intro{text-align:center;color:#666;margin-bottom:52px;font-size:1rem;line-height:1.6}
        .roi-compare{display:grid;grid-template-columns:1fr 1fr;gap:40px;text-align:center;margin-bottom:48px;align-items:center}
        .roi-box{text-align:center}
        .roi-label{font-size:0.8rem;color:#aaa;font-weight:600;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.6px}
        .roi-value{font-size:2.6rem;font-weight:900;color:#1a1a2e;line-height:1}
        .roi-conclusion{text-align:center;font-size:0.96rem;color:#666;line-height:1.7;font-weight:500}
        
        /* WHY SUBSCRIPTION */
        .why{background:#fff;padding:120px 5%}
        .why-container{max-width:1000px;margin:0 auto}
        .why-intro{color:#666;margin-bottom:64px;max-width:720px;font-size:1rem;line-height:1.6}
        .why-content{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
        .why-col{padding:40px;border-radius:12px;background:#f9fafb}
        .why-col.new{background:linear-gradient(135deg,#f0f6fb 0%,#f9fbfd 100%);border:1px solid rgba(45,115,177,0.15)}
        .why-col h3{font-size:1.15rem;margin-bottom:28px;font-weight:800}
        .why-col h3.old{color:#1a1a2e}
        .why-col h3.new{color:#2d73b1}
        .why-list{list-style:none;padding:0;display:flex;flex-direction:column;gap:16px}
        .why-list li{font-size:0.93rem;color:#555;display:flex;gap:12px;align-items:flex-start;line-height:1.65;font-weight:500}
        .why-list li:before{content:"✓";color:#2d73b1;font-weight:900;flex-shrink:0;margin-top:1px}
        
        /* HOW IT WORKS */
        .how{background:#f9fafb;padding:120px 5%}
        .how-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:60px;max-width:1000px;margin-left:auto;margin-right:auto}
        .step{text-align:center}
        .step-number{width:50px;height:50px;background:#2d73b1;color:#fff;border-radius:50%;font-size:1.6rem;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}
        .step h3{margin-bottom:12px;font-size:1.05rem}
        .step p{font-size:0.9rem;color:#666;line-height:1.6}
        
        /* URGENCY */
        .urgency{background:#1a1a2e;color:#fff;padding:60px 5%;text-align:center;margin:60px 5%;border-radius:12px;max-width:900px;margin-left:auto;margin-right:auto}
        .urgency h3{color:#fff;font-size:1.4rem;margin-bottom:12px}
        .urgency p{color:rgba(255,255,255,0.85);font-size:0.95rem;max-width:600px;margin:0 auto}
        
        /* GUARANTEE */
        .guarantee{background:#f0f6fb;border-left:4px solid #2d73b1;padding:28px 24px;border-radius:8px;margin:40px auto;max-width:600px;margin-left:auto;margin-right:auto}
        .guarantee strong{color:#1a5a7a;display:block;margin-bottom:6px;font-size:0.95rem}
        .guarantee p{color:#2c3e50;font-size:0.9rem;margin:0}
        
        /* FINAL CTA */
        .cta{background:#1a1a2e;color:#fff;text-align:center;padding:120px 5%}
        .cta h2{color:#fff;margin-bottom:20px}
        .cta p{font-size:1rem;color:rgba(255,255,255,0.85);max-width:620px;margin:16px auto 48px}
        .cta-buttons{display:flex;gap:16px;justify-content:center;margin-bottom:40px;flex-wrap:wrap}
        .cta-buttons a{font-size:0.95rem}
        .cta-phone{color:rgba(255,255,255,0.75);font-size:0.9rem;margin-top:32px}
        .cta-phone strong{color:#4db8ff;display:block;font-size:1.1rem;margin-top:8px;font-weight:700}
        
        /* FOOTER */
        footer{background:#1a1a2e;color:rgba(255,255,255,0.6);padding:48px 5%;text-align:center;font-size:0.85rem;border-top:1px solid rgba(255,255,255,0.1)}
        footer strong{color:#fff}
        footer a{color:rgba(255,255,255,0.6);text-decoration:none;margin:0 12px;transition:color 0.2s}
        footer a:hover{color:#4db8ff}
        
        /* CHAT */
        .wa-fab{position:fixed;bottom:28px;right:28px;z-index:9999;font-family:'Inter',sans-serif}
        .wa-toggle{width:60px;height:60px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,0.4);display:flex;align-items:center;justify-content:center;transition:transform 0.2s}
        .wa-toggle:hover{transform:scale(1.08)}
        
        /* MOBILE */
        @media(max-width:1024px){
          .hero-container{grid-template-columns:1fr;gap:40px;padding:40px 0}
          .hero-content h1{font-size:2.6rem}
          .hero-visual{min-height:400px}
          .problem-grid{grid-template-columns:1fr}
          .results-grid{grid-template-columns:repeat(2,1fr)}
          .pricing-cards{grid-template-columns:1fr;max-width:500px}
          .pricing-card.featured{transform:scale(1)}
          .why-content{grid-template-columns:1fr;gap:40px}
          .how-steps{grid-template-columns:repeat(2,1fr)}
          .roi-compare{grid-template-columns:1fr}
        }
        @media(max-width:768px){
          section{padding:70px 5%}
          .hero{padding:60px 5%;min-height:auto}
          .hero-content h1{font-size:2.1rem}
          .hero-ctas{flex-direction:column;width:100%;max-width:300px}
          .hero-ctas a{width:100%;text-align:center}
          h2{font-size:2rem}
          .results-grid{grid-template-columns:1fr 1fr;gap:24px}
          .how-steps{grid-template-columns:1fr 1fr;gap:16px}
          .pricing-cards{grid-template-columns:1fr}
          .cta-buttons{flex-direction:column;align-items:center;width:100%}
          .cta-buttons a{max-width:300px;width:100%;text-align:center}
        }
        @media(max-width:480px){
          .hero{padding:50px 5%}
          h1{font-size:1.8rem !important}
          h2{font-size:1.5rem}
          section{padding:60px 5%}
          .hero-visual{min-height:300px;padding:40px 20px}
          .results-grid{grid-template-columns:1fr}
          .how-steps{grid-template-columns:1fr}
          .problem-item{padding:16px 0;border-bottom:none}
          .problem-grid{gap:20px}
        }
      `}</style>

      {/* 1. HERO */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Je website die klanten oplevert — binnen 48 uur live</h1>
            <p>Wij bouwen, lanceren en onderhouden. Jij krijgt klanten. Geen gedoe, geen vervelende developers. Pure focus op je bedrijf.</p>
            <div className="hero-bullets">
              <span>Online in 48 uur</span>
              <span>Alles geregeld voor je</span>
              <span>Geen technisch gedoe</span>
            </div>
            <div className="hero-ctas">
              <a href="#pricing" className="btn-primary">Start je website →</a>
              <a href="#cta" className="btn-secondary">Gratis kennismaking</a>
            </div>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(26,26,46,0.1)", display: "flex", gap: 20, fontSize: "0.82rem", color: "#666", fontWeight: 500 }}>
              <span>✓ Al gebruikt door 50+ lokale bedrijven</span>
              <span>✓ 7 dagen geld-terug garantie</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-content">
              <div className="hero-visual-mockup" style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
                {/* Mockup: Realistic barber website */}
                <div style={{ background: "linear-gradient(180deg,#0a1628,#0d2146)", padding: "24px", color: "#fff", textAlign: "center" }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: 20 }}>✂️ BARBERSHOP</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>Premium barbering seit 2015</div>
                  <button style={{ background: "#2d73b1", color: "#fff", padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", marginBottom: 8 }}>Afspraak maken</button>
                </div>
                <div style={{ padding: "20px", background: "#f9fafb", minHeight: 200 }}>
                  <div style={{ background: "#fff", borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ height: 8, background: "#2d73b1", borderRadius: 4, marginBottom: 8, width: "70%" }}></div>
                    <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, marginBottom: 6, width: "90%" }}></div>
                    <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, width: "60%" }}></div>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 10, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ height: 8, background: "#2d73b1", borderRadius: 4, marginBottom: 8, width: "60%" }}></div>
                    <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, marginBottom: 6, width: "85%" }}></div>
                    <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, width: "55%" }}></div>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: 16, fontSize: "0.82rem", color: "#94a3b8", textAlign: "center", fontWeight: 500 }}>Zo ziet jouw website eruit</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM */}
      <section className="problem">
        <div className="section-container">
          <h2>Je verliest klanten zonder dat je het doorhebt</h2>
          <p className="section-intro">Elke dag zonder goede website kost je potentiële klanten. Je concurrenten pakken ze in.</p>
          <div className="problem-grid">
            <div className="problem-item">
              <h3>🔍 Mensen vinden je niet</h3>
              <p>Ze zoeken online naar jouw bedrijf maar jij verschijnt niet. Je concurrent wel.</p>
            </div>
            <div className="problem-item">
              <h3>📱 Website ziet er verouderd uit</h3>
              <p>Of je hebt helemaal geen website. Klanten denken dat je niet meer actief bent.</p>
            </div>
            <div className="problem-item">
              <h3>📞 Geen manier om te boeken</h3>
              <p>Klanten kunnen niet bellen, reserveren of een bericht sturen. Ze geven het op.</p>
            </div>
            <div className="problem-item">
              <h3>⚖️ Minder vertrouwen</h3>
              <p>Geen website = minder geloofwaardig. Klanten kiezen liever een concurrent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="solution">
        <div className="section-container">
          <h2>Wij zorgen dat jouw website klanten oplevert</h2>
          <p className="section-intro">Website + hosting + updates + onderhoud. Alles in één. Nul zorgen.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div className="solution-text">
              <h3>Wat je krijgt</h3>
              <div className="solution-list">
                <div className="solution-list-item"><span>Website live in 48 uur</span></div>
                <div className="solution-list-item"><span>100% mobiel-vriendelijk</span></div>
                <div className="solution-list-item"><span>Hosting, domein, SSL inbegrepen</span></div>
                <div className="solution-list-item"><span>Maandelijkse updates & onderhoud</span></div>
                <div className="solution-list-item"><span>Google vindt je makkelijker</span></div>
                <div className="solution-list-item"><span>Alles gericht op meer klanten</span></div>
              </div>
            </div>
            <div className="solution-text">
              <h3>Wat je niet meer doet</h3>
              <div className="solution-list">
                <div className="solution-list-item"><span>Nooit meer naar developers bellen</span></div>
                <div className="solution-list-item"><span>Geen technische problemen meer</span></div>
                <div className="solution-list-item"><span>Geen gedoe met hosting</span></div>
                <div className="solution-list-item"><span>Geen verouderde website meer</span></div>
                <div className="solution-list-item"><span>Geen klanten meer verliezen</span></div>
                <div className="solution-list-item"><span>Pure focus op je bedrijf</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESULTS */}
      <section className="results">
        <div className="section-container">
          <h2>Dit levert het jou op</h2>
          <p className="results-intro">Stop met klanten verliezen. Begin met klanten winnen.</p>
          <div className="results-grid">
            <div className="result-item">
              <strong>+Afspraken</strong>
              <span>Direct geboekt</span>
            </div>
            <div className="result-item">
              <strong>+Aanvragen</strong>
              <span>Via formulier</span>
            </div>
            <div className="result-item">
              <strong>+Omzet</strong>
              <span>Extra klanten</span>
            </div>
            <div className="result-item">
              <strong>0 Gedoe</strong>
              <span>Wij regelen het</span>
            </div>
          </div>
          <p className="results-note">1–2 extra klanten per maand betaalt je hele website. Daarna is het puur winst.</p>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="pricing">
        <div className="section-container">
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Kies jouw pakket</h2>
          <p className="section-intro" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>Transparante prijzen. Geen verborgen kosten. Opzeggen wanneer je wil.</p>
          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-name">Starter</div>
              <div className="pricing-subtitle">Perfect om te beginnen</div>
              <div className="pricing-value">€99<sup>/m</sup></div>
              <div className="pricing-setup">+ €500 setup</div>
              <ul className="pricing-features">
                <li>1-2 pagina's</li>
                <li>Contactformulier</li>
                <li>Hosting & domein</li>
                <li>Mobile-optimized</li>
                <li>Email support</li>
              </ul>
              <a href="#cta" className="btn-primary" style={{ width: "100%", textAlign: "center", display: "block" }}>Kies Starter</a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Populair</div>
              <div className="pricing-name">Growth</div>
              <div className="pricing-subtitle">Voor serieuze groei</div>
              <div className="pricing-value">€149<sup>/m</sup></div>
              <div className="pricing-setup">+ €750 setup</div>
              <ul className="pricing-features">
                <li>Tot 5 pagina's</li>
                <li>Contactformulier + Maps</li>
                <li>Hosting & domein</li>
                <li>SEO basisoptimalisatie</li>
                <li>Email & phone support</li>
                <li>Maandelijks rapport</li>
              </ul>
              <a href="#cta" className="btn-primary" style={{ width: "100%", textAlign: "center", display: "block" }}>Kies Growth</a>
            </div>
            <div className="pricing-card">
              <div className="pricing-name">Pro</div>
              <div className="pricing-subtitle">Premium alles-inbegrepen</div>
              <div className="pricing-value">€249<sup>/m</sup></div>
              <div className="pricing-setup">+ €1000 setup</div>
              <ul className="pricing-features">
                <li>Tot 10 pagina's</li>
                <li>Custom design</li>
                <li>Alle functies</li>
                <li>Hosting & domein</li>
                <li>Volledige SEO</li>
                <li>Priority support</li>
              </ul>
              <a href="#cta" className="btn-primary" style={{ width: "100%", textAlign: "center", display: "block" }}>Kies Pro</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ROI */}
      <section className="roi">
        <div className="roi-content">
          <h2>📊 Wat is de ROI?</h2>
          <p className="roi-intro">Je hebt maar 1–2 extra klanten per maand nodig om je website terug te verdienen.</p>
          <div className="roi-compare">
            <div className="roi-box">
              <div className="roi-label">Jij betaalt:</div>
              <div className="roi-value">€149</div>
            </div>
            <div className="roi-box">
              <div className="roi-label">Jij verdient:</div>
              <div className="roi-value">€100–500+</div>
            </div>
          </div>
          <p className="roi-conclusion">Website betaalt zich terug in maand 1. Daarna is het puur winst.</p>
        </div>
      </section>

      {/* 6. WHY SUBSCRIPTION */}
      <section className="why">
        <div className="why-container">
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Waarom een abonnement beter is</h2>
          <p className="section-intro" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>Geen grote upfront kosten. Alles inbegrepen. Eenvoudig opzeggen.</p>
          <div className="why-content">
            <div className="why-col">
              <h3 className="old">Eenmalig betalen (oud model)</h3>
              <ul className="why-list">
                <li>€3000+ upfront betalen</li>
                <li>Hosting zelf zoeken & betalen</li>
                <li>Updates betalen per update</li>
                <li>Problemen? €500+ per reparatie</li>
                <li>Jij bent volledig verantwoordelijk</li>
              </ul>
            </div>
            <div className="why-col new">
              <h3 className="new">Abonnement (slim model)</h3>
              <ul className="why-list">
                <li>€99-249/m, alles inbegrepen</li>
                <li>Hosting, domein, SSL erbij</li>
                <li>Automatische updates & optimalisaties</li>
                <li>Problemen? Wij fixen gratis</li>
                <li>Jij focust op je bedrijf</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS */}
      <section className="how">
        <div className="section-container">
          <h2 style={{ textAlign: "center", marginBottom: 16 }}>Hoe het werkt</h2>
          <p className="section-intro" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>Vier eenvoudige stappen naar je website.</p>
          <div className="how-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Je belt ons</h3>
              <p>Korte kennismaking. Jij vertelt wat je bedrijf is, wij maken een plan.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Wij bouwen</h3>
              <p>48 uur later: website klaar, getest, beveiligd, snel.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Je gaat live</h3>
              <p>Klik. Website online. Klanten vinden en bellen jou.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Wij zorgen ervoor</h3>
              <p>Updates, onderhoud, optimalisaties — alles door ons.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. URGENCY + 11. GUARANTEE */}
      <section style={{ background: "#fff", padding: "60px 5%" }}>
        <div className="section-container">
          <div className="urgency">
            <h3>⚡ We nemen max 5 klanten per week aan</h3>
            <p>We geven elk project volle aandacht. Snelheid + kwaliteit. Als je nu belt, krijg jij een plek.</p>
          </div>
          <div className="guarantee">
            <strong>💰 7-daags geld-terug garantie</strong>
            <p>Niet tevreden? We geven je geld terug, geen vragen gesteld.</p>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section id="cta" className="cta">
        <div className="section-container">
          <h2>Klaar om meer klanten te krijgen?</h2>
          <p>Geen gedoe. Geen verplichtingen. Gewoon een gesprek over jouw website.</p>
          <div className="cta-buttons">
            <a href="#pricing" className="btn-primary">Start je website →</a>
            <a href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20ben%20geinteresseerd%20in%20een%20website." target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a>
          </div>
          <div className="cta-phone">
            Liever direct bellen?<br/>
            <strong>+31 6 26 21 99 89</strong>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 <strong>Vedantix</strong> — Website + hosting + onderhoud + support. Start €99/maand.</p>
        <div style={{ marginTop: 12 }}>
          <a href="#pricing">Prijzen</a>
          <a href="/Privacy">Privacy</a>
          <a href="/Voorwaarden">Voorwaarden</a>
        </div>
      </footer>


    </div>
  );
}