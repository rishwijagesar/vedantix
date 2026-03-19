import { useState, useEffect } from "react";
import LiveChatWidget from "../components/LiveChatWidget";

// Ensure mobile viewport
if (typeof document !== "undefined") {
  let vp = document.querySelector('meta[name="viewport"]');
  if (!vp) {
    vp = document.createElement("meta");
    vp.name = "viewport";
    vp.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(vp);
  }
}

function WAWidget() {
  const [open, setOpen] = useState(false);
  const url = "https://wa.me/310626219989?text=" + encodeURIComponent("Hallo! Ik ben geïnteresseerd in een website.");

  return (
    <>
      <style>{`
        .wa-fab{position:fixed;bottom:28px;right:28px;z-index:9999;font-family:'Inter',sans-serif}
        .wa-toggle{width:60px;height:60px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 4px 24px rgba(37,211,102,0.5);display:flex;align-items:center;justify-content:center;transition:transform 0.2s;position:relative}
        .wa-toggle:hover{transform:scale(1.08)}
        .wa-badge{position:absolute;top:-3px;right:-3px;background:#ef4444;color:#fff;width:20px;height:20px;border-radius:50%;font-size:0.65rem;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
        .wa-popup{position:absolute;bottom:74px;right:0;width:320px;background:#fff;border-radius:18px;box-shadow:0 12px 48px rgba(0,0,0,0.18);overflow:hidden;animation:waPop 0.22s cubic-bezier(.34,1.56,.64,1)}
        @keyframes waPop{from{opacity:0;transform:scale(0.88) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .wa-head{background:linear-gradient(135deg,#075e54,#128c7e);padding:16px 18px;display:flex;align-items:center;gap:12px}
        .wa-body{background:#e5ddd5;padding:14px;min-height:100px;max-height:180px;overflow-y:auto}
        .wa-msg{background:#fff;border-radius:0 10px 10px 10px;padding:9px 13px;font-size:0.84rem;color:#1a1a2e;line-height:1.5;margin-bottom:8px;box-shadow:0 1px 2px rgba(0,0,0,0.08)}
        .wa-footer{padding:10px 12px;background:#fff;border-top:1px solid #e0e0e0}
        .wa-btn{display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;border-radius:10px;padding:10px;text-decoration:none;font-weight:700;font-size:0.85rem;transition:background 0.15s}
        .wa-btn:hover{background:#1da851}
        @media(max-width:420px){.wa-popup{width:calc(100vw - 40px);right:-14px}}
      `}</style>
      <div className="wa-fab">
        {open && (
          <div className="wa-popup">
            <div className="wa-head">
              <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"1.1rem",color:"#fff"}}>V</div>
              <div style={{flex:1}}>
                <div style={{color:"#fff",fontWeight:700,fontSize:"0.95rem"}}>Vedantix</div>
                <div style={{color:"rgba(255,255,255,0.7)",fontSize:"0.73rem"}}>Gemiddeld binnen 1 uur</div>
              </div>
              <button onClick={() => setOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:"1.1rem",padding:4}}>✕</button>
            </div>
            <div className="wa-body">
              <div className="wa-msg">👋 Hallo! Heb je vragen of wil je een website? Laat een bericht achter.</div>
            </div>
            <div className="wa-footer">
              <a href={url} target="_blank" rel="noreferrer" className="wa-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat op WhatsApp
              </a>
            </div>
          </div>
        )}
        <button className="wa-toggle" onClick={() => setOpen(p => !p)} aria-label="WhatsApp">
          {!open && <div className="wa-badge">1</div>}
          {open
            ? <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            : <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          }
        </button>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1a2e", background: "#fff", lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{margin:0;padding:0}
        section{padding:clamp(60px,8vw,100px) 5%}
        h1{font-size:clamp(2.2rem,5vw,4rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px}
        h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;margin-bottom:16px}
        h3{font-size:clamp(1rem,2.5vw,1.3rem);font-weight:800;margin-bottom:12px}
        p{font-size:clamp(0.95rem,1.2vw,1.05rem);line-height:1.65;margin-bottom:12px;color:#475569}
        strong{font-weight:700}
        em{font-style:normal;color:#ef4444}
        .container{max-width:1100px;margin:0 auto}
        .btn-primary{background:#1a1a2e;color:#fff;padding:clamp(12px,2vw,16px) clamp(24px,4vw,40px);border-radius:10px;font-weight:700;font-size:clamp(0.9rem,1vw,1rem);text-decoration:none;display:inline-block;transition:all 0.2s;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(26,26,46,0.3)}
        .btn-primary:hover{background:#2d2d4e;transform:translateY(-2px)}
        .btn-secondary{background:transparent;color:#1a1a2e;border:2px solid #1a1a2e;padding:clamp(12px,2vw,16px) clamp(24px,4vw,40px);border-radius:10px;font-weight:700;font-size:clamp(0.9rem,1vw,1rem);text-decoration:none;display:inline-block;transition:all 0.2s;cursor:pointer}
        .btn-secondary:hover{background:#1a1a2e;color:#fff}
        .hero{background:linear-gradient(135deg,#0a0a14 0%,#1a1a2e 100%);color:#fff;text-align:center;padding:clamp(80px,10vw,140px) 5% !important}
        .hero h1{color:#fff;font-size:clamp(2.4rem,6vw,4.2rem)}
        .hero h1 em{color:#ff6b35;font-style:normal}
        .hero p{color:rgba(255,255,255,0.8);font-size:clamp(1rem,1.3vw,1.2rem);max-width:700px;margin:20px auto 32px}
        .hero-ctas{display:flex;gap:16px;justify-content:center;margin-bottom:40px;flex-wrap:wrap}
        .hero-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:24px;max-width:700px;margin:60px auto 0;text-align:center}
        .stat-box{font-size:1.1rem}
        .stat-box strong{display:block;font-size:clamp(1.8rem,3vw,2.2rem);color:#ff6b35;margin-bottom:4px}
        .stat-box span{font-size:0.85rem;color:rgba(255,255,255,0.6)}
        .pain-section{background:#fff3f0;padding:clamp(60px,8vw,100px) 5% !important}
        .pain-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-top:40px}
        .pain-card{background:#fff;border:2px solid #ffccc7;border-radius:16px;padding:32px 24px;box-shadow:0 2px 8px rgba(0,0,0,0.05)}
        .pain-card h3{color:#b71c1c;margin-bottom:12px}
        .pain-card p{color:#424242;font-size:0.95rem}
        .solution-section{background:#f5f5f5;padding:clamp(60px,8vw,100px) 5% !important}
        .solution-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:40px}
        .solution-card{background:#fff;border-radius:12px;padding:28px 20px;box-shadow:0 2px 12px rgba(0,0,0,0.08);border-left:4px solid #1a1a2e}
        .solution-card h3{font-size:1rem;margin-bottom:10px}
        .solution-card p{font-size:0.9rem;color:#666}
        .results-section{background:#1a1a2e;color:#fff;padding:clamp(60px,8vw,100px) 5% !important;text-align:center}
        .results-section h2{color:#fff}
        .results-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px;margin-top:50px;max-width:900px;margin-left:auto;margin-right:auto}
        .result-item{font-size:1.1rem}
        .result-item strong{display:block;font-size:clamp(2rem,3vw,2.5rem);color:#ff6b35;margin-bottom:8px}
        .pricing-section{padding:clamp(60px,8vw,100px) 5% !important}
        .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-top:50px;max-width:1000px;margin-left:auto;margin-right:auto}
        .pricing-card{border:2px solid #e0e0e0;border-radius:16px;padding:40px 30px;position:relative;transition:all 0.2s}
        .pricing-card:hover{border-color:#1a1a2e;transform:translateY(-4px)}
        .pricing-card.featured{border-color:#ff6b35;background:#fff8f4;transform:scale(1.02)}
        .pricing-card .price{font-size:2.8rem;font-weight:900;color:#1a1a2e;margin:20px 0 8px}
        .pricing-card .price sup{font-size:1.2rem;font-weight:600}
        .pricing-card .setup{color:#666;font-size:0.9rem;margin-bottom:24px}
        .pricing-card ul{list-style:none;padding:0;margin-bottom:32px}
        .pricing-card li{padding:10px 0;border-bottom:1px solid #e0e0e0;display:flex;gap:10px;font-size:0.95rem}
        .pricing-card li:before{content:"✓";font-weight:900;color:#ff6b35;flex-shrink:0}
        .pricing-card .badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#ff6b35;color:#fff;padding:6px 20px;border-radius:100px;font-weight:700;font-size:0.8rem;text-transform:uppercase}
        .why-section{background:#f5f5f5;padding:clamp(60px,8vw,100px) 5% !important}
        .why-content{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;max-width:1000px;margin:0 auto}
        .why-content ul{list-style:none;padding:0}
        .why-content li{margin-bottom:16px;font-size:0.95rem;display:flex;gap:12px;align-items:flex-start}
        .why-content li:before{content:"→";font-weight:900;color:#ff6b35;flex-shrink:0;margin-top:2px}
        .how-it-works{padding:clamp(60px,8vw,100px) 5% !important;background:#fff}
        .steps-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-top:50px}
        .step{background:#f5f5f5;border-radius:12px;padding:32px 24px;text-align:center;position:relative}
        .step-num{width:50px;height:50px;background:#1a1a2e;color:#fff;border-radius:50%;font-size:1.6rem;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
        .step h3{margin:12px 0 8px}
        .step p{font-size:0.9rem;color:#666}
        .urgency{background:linear-gradient(135deg,#ff6b35 0%,#ff8c59 100%);color:#fff;padding:clamp(40px,6vw,60px) 5%;text-align:center;border-radius:16px;margin:0 5%;max-width:1000px;margin-left:auto;margin-right:auto}
        .urgency h3{color:#fff;font-size:clamp(1.4rem,2.5vw,2rem)}
        .urgency p{color:rgba(255,255,255,0.95);font-size:0.95rem;margin-top:10px}
        .guarantee{background:#e3f2fd;border-left:4px solid #1976d2;padding:24px 20px;border-radius:8px;margin:40px 0;max-width:600px;margin-left:auto;margin-right:auto}
        .guarantee strong{color:#1565c0;display:block;margin-bottom:6px}
        .cta-section{background:#1a1a2e;color:#fff;padding:clamp(60px,8vw,100px) 5%;text-align:center}
        .cta-section h2{color:#fff;margin-bottom:24px}
        .cta-buttons{display:flex;gap:16px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
        .cta-buttons a{font-size:clamp(0.95rem,1.1vw,1rem)}
        footer{background:#1a1a2e;color:rgba(255,255,255,0.5);padding:clamp(40px,6vw,60px) 5%;text-align:center;font-size:0.85rem;border-top:1px solid rgba(255,255,255,0.1)}
        footer strong{color:#fff}
        footer a{color:rgba(255,255,255,0.5);text-decoration:none;margin:0 12px}
        footer a:hover{color:#ff6b35}
        @media(max-width:768px){
          .hero-ctas{flex-direction:column;align-items:center}
          .hero-ctas .btn-primary,.hero-ctas .btn-secondary{width:100%;max-width:300px;text-align:center}
          .pain-grid{grid-template-columns:1fr}
          .solution-grid{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}
          .results-grid{grid-template-columns:repeat(2,1fr)}
          .pricing-card.featured{transform:scale(1)}
          .why-content{grid-template-columns:1fr;gap:40px}
          .steps-grid{grid-template-columns:1fr 1fr}
          .cta-buttons{flex-direction:column;align-items:center}
          .cta-buttons a{width:100%;max-width:300px;text-align:center}
        }
        @media(max-width:480px){
          section{padding:40px 5%}
          h1{font-size:1.8rem}
          h2{font-size:1.5rem}
          .hero-stats{grid-template-columns:repeat(2,1fr);gap:16px}
          .results-grid{grid-template-columns:1fr}
          .pricing-grid{grid-template-columns:1fr}
          .steps-grid{grid-template-columns:1fr}
          .why-content li{font-size:0.9rem}
        }
      `}</style>

      {/* 1. HERO */}
      <section className="hero">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Krijg meer klanten via je website — <em>binnen 48 uur live</em></h1>
          <p>Geen gedoe. Geen technische problemen. Wij zorgen dat jouw website klanten oplevert. Alles inbegrepen. Maandelijks opzeggen.</p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">Start je website →</a>
            <a href="#contact" className="btn-secondary">Plan gratis gesprek</a>
          </div>
          <div className="hero-stats">
            <div className="stat-box"><strong>48u</strong><span>Live</span></div>
            <div className="stat-box"><strong>€99/m</strong><span>All-in</span></div>
            <div className="stat-box"><strong>∞</strong><span>Updates</span></div>
            <div className="stat-box"><strong>1 partner</strong><span>Klaar</span></div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM */}
      <section className="pain-section">
        <div className="container">
          <h2 style={{ color: "#b71c1c", textAlign: "center" }}>Je verliest klanten zonder dat je het doorhebt</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 40 }}>Elke dag dat je geen goede website hebt, gaan potentiële klanten naar je concurrent.</p>
          <div className="pain-grid">
            <div className="pain-card">
              <h3>🔍 Mensen vinden je niet</h3>
              <p>Ze zoeken online naar "kapperszaak Amsterdam" maar jij verschijnt niet. Je concurrent wel.</p>
            </div>
            <div className="pain-card">
              <h3>📱 Website ziet er verouderd uit</h3>
              <p>Of je hebt helemaal geen website. Klanten denken: "Dit bedrijf is niet meer actief."</p>
            </div>
            <div className="pain-card">
              <h3>📞 Geen manier om direct contact op te nemen</h3>
              <p>Potentiële klanten kunnen niet bellen, een afspraak plannen of een bericht sturen. Ze geven het op.</p>
            </div>
            <div className="pain-card">
              <h3>⚖️ Minder professioneel</h3>
              <p>Geen website = minder vertrouwen. Klanten kiezen liever een concurrent met een goede website.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="solution-section">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Wij zorgen dat jouw website klanten oplevert</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 40 }}>Alles wat je nodig hebt — website, hosting, onderhoud — in één pakket.</p>
          <div className="solution-grid">
            <div className="solution-card">
              <h3>⚡ 48 uur live</h3>
              <p>Je hebt niet maanden nodig. Wij bouwen en zetten je online. Klaar.</p>
            </div>
            <div className="solution-card">
              <h3>📱 100% mobiel-vriendelijk</h3>
              <p>Alles werkt perfect op telefoon, tablet en computer. Klanten boeken onderweg.</p>
            </div>
            <div className="solution-card">
              <h3>🔧 Alles inbegrepen</h3>
              <p>Hosting, domein, SSL, updates, onderhoud. Je hebt niemand anders nodig.</p>
            </div>
            <div className="solution-card">
              <h3>📞 Klanten kunnen direct contact opnemen</h3>
              <p>Telefoonnummer, contactformulier, WhatsApp link. Nul fricties.</p>
            </div>
            <div className="solution-card">
              <h3>🔍 Google vindt je makkelijker</h3>
              <p>Basisoptimalisatie inbegrepen. Jouw bedrijf verschijnt hoger in zoekresultaten.</p>
            </div>
            <div className="solution-card">
              <h3>🎯 Ontworpen voor conversie</h3>
              <p>Niet mooi, maar ineffectief. Alles is gericht op meer boekingen en aanvragen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESULTS */}
      <section className="results-section">
        <div className="container">
          <h2>Dit levert het jou op</h2>
          <p style={{ fontSize: "1.05rem", maxWidth: 600, margin: "20px auto 40px", color: "rgba(255,255,255,0.9)" }}>Stop met klanten verliezen. Begin met klanten winnen.</p>
          <div className="results-grid">
            <div className="result-item">
              <strong>+Afspraken</strong>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Klanten boeken direct</span>
            </div>
            <div className="result-item">
              <strong>+Aanvragen</strong>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Contactformulieren vullen zich</span>
            </div>
            <div className="result-item">
              <strong>+Omzet</strong>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Extra klanten = extra inkomsten</span>
            </div>
            <div className="result-item">
              <strong>0 Gedoe</strong>
              <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>Wij regelen alles</span>
            </div>
          </div>
          <p style={{ fontSize: "1rem", maxWidth: 700, margin: "50px auto 0", color: "rgba(255,255,255,0.85)" }}>
            <strong>💰 Gemiddeld: 1–2 extra klanten per maand betaalt je hele website.</strong> Daarna is het puur winst.
          </p>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="pricing-section">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Kies jouw pakket</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 50 }}>Transparante prijzen. Geen verborgen kosten. Maandelijks opzeggen.</p>
          <div className="pricing-grid">
            {[
              { name: "Starter", price: "99", setup: "500", features: ["1-2 pagina's", "Contactformulier", "Hosting & domein", "Mobile-optimized", "Email support"] },
              { name: "Growth", price: "149", setup: "750", features: ["Tot 5 pagina's", "Contactformulier + Maps", "Hosting & domein", "SEO basisoptimalisatie", "Email & phone support", "Maandelijks rapport"], featured: true },
              { name: "Pro", price: "249", setup: "1000", features: ["Tot 10 pagina's", "Custom design", "Alle functies", "Hosting & domein", "Volledige SEO", "Priority support", "Maandelijkse optimalisatie"] }
            ].map(pkg => (
              <div key={pkg.name} className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
                {pkg.featured && <div className="badge">Populair</div>}
                <h3 style={{ marginBottom: 8 }}>{pkg.name}</h3>
                <div className="price">€{pkg.price}<sup>/m</sup></div>
                <div className="setup">Setup: €{pkg.setup}</div>
                <ul>
                  {pkg.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <a href="#contact" className="btn-primary" style={{ width: "100%", textAlign: "center" }}>Kies {pkg.name}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY SUBSCRIPTION */}
      <section className="why-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 40 }}>Waarom een abonnement werkt beter</h2>
          <div className="why-content">
            <div>
              <h3 style={{ color: "#b71c1c", marginBottom: 20 }}>❌ Eenmalig betalen (oud model)</h3>
              <ul>
                <li>€3000+ upfront betalen</li>
                <li>Hosting zelf zoeken en betalen (€10-50/m extra)</li>
                <li>Updates? Betaal per update</li>
                <li>Iets kapot? €500+ reparatie</li>
                <li>Jij bent volledig zelf verantwoordelijk</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: "#1a7f34", marginBottom: 20 }}>✅ Abonnement (slim)</h3>
              <ul>
                <li>€99-249/m, alles inbegrepen</li>
                <li>Hosting, domein, updates — allemaal in één prijs</li>
                <li>Automatische updates & optimalisaties</li>
                <li>Iets kapot? We fixen het gratis</li>
                <li>Jij focust op je bedrijf. Wij op jouw website.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ROI */}
      <section style={{ background: "#e3f2fd", padding: "clamp(60px,8vw,100px) 5%", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "#1565c0", marginBottom: 20 }}>📊 Realistische ROI</h2>
          <p style={{ fontSize: "1.05rem", color: "#1976d2", marginBottom: 30 }}>
            Als je per maand <strong>slechts 1 extra klant</strong> binnenhaalt die gemiddeld €100+ uitgeeft...
          </p>
          <div style={{ background: "#fff", border: "2px solid #1976d2", borderRadius: 16, padding: "30px", maxWidth: 500, margin: "0 auto" }}>
            <p style={{ color: "#1565c0", fontWeight: 700, fontSize: "0.9rem", marginBottom: 16 }}>Jij betaalt:</p>
            <p style={{ color: "#333", fontSize: "1.5rem", fontWeight: 900, marginBottom: 20 }}>€149/m</p>
            <p style={{ color: "#1565c0", fontWeight: 700, fontSize: "0.9rem", marginBottom: 8 }}>Jij verdient:</p>
            <p style={{ color: "#1a7f34", fontSize: "1.5rem", fontWeight: 900 }}>€100–500+/m</p>
          </div>
          <p style={{ marginTop: 30, color: "#1565c0", fontWeight: 600 }}>Website betaalt zich zelf terug in de eerste maand. Daarna is het puur winst.</p>
        </div>
      </section>

      {/* 8. HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 50 }}>Hoe het werkt</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Je belt of chatten</h3>
              <p>Korte kennismaking. Jij vertelt wat je bedrijf is, wij maken een plan.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Wij bouwen</h3>
              <p>48 uur later: website klaar, getest, beveiligd, snel. Nul problemen.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Je gaat live</h3>
              <p>Klik. Website online. Klanten kunnen je vinden en contact opnemen.</p>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <h3>Wij zorgen ervoor</h3>
              <p>Updates, optimalisaties, onderhoud — alles door ons. Maandelijks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. URGENCY + GUARANTEE */}
      <section style={{ padding: "clamp(60px,8vw,100px) 5%", textAlign: "center" }}>
        <div className="container">
          <div className="urgency">
            <h3>⚡ We nemen max 5 klanten per week aan</h3>
            <p>We geven elk project volle aandacht. Snelheid + kwaliteit. Niet beide tegelijk met meer klanten. Als je nu belt, krijg jij een plek.</p>
          </div>
          <div className="guarantee">
            <strong>💰 7-daags geld-terug garantie</strong>
            <p>Niet tevreden? We geven je geld terug, geen vragen. Nul risico.</p>
          </div>
        </div>
      </section>

      {/* 12. CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Klaar om meer klanten te krijgen?</h2>
          <p style={{ fontSize: "1.05rem", maxWidth: 600, margin: "20px auto 40px", color: "rgba(255,255,255,0.9)" }}>
            Geen gedoe. Geen verplichtingen. Gewoon een gesprek over jouw website en hoe het je klanten oplevert.
          </p>
          <div className="cta-buttons">
            <a href="#contact" className="btn-primary">Start je website nu →</a>
            <a href="#contact" className="btn-secondary">Plan gratis gesprek</a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
            Liever direct met ons praten?<br/>
            <strong style={{ color: "#fff", fontSize: "1rem" }}>+31 6 26 21 99 89</strong>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 <strong>Vedantix</strong> — Website + hosting + onderhoud + support. Start €99/maand.</p>
        <div>
          <a href="#pricing">Prijzen</a>
          <a href="#contact">Contact</a>
          <a href="/Privacy">Privacy</a>
          <a href="/Voorwaarden">Voorwaarden</a>
        </div>
      </footer>

      <LiveChatWidget />
      <WAWidget />
    </div>
  );
}