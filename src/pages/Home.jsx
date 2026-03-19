import { useState } from "react";
import LiveChatWidget from "../components/LiveChatWidget";

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
          {open ? <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> : <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
        </button>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#2c3e50", background: "#fff", lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{margin:0;padding:0}
        section{padding:clamp(70px,10vw,110px) 5%}
        h1{font-size:clamp(2.4rem,5vw,3.8rem);font-weight:900;line-height:1.15;letter-spacing:-0.8px;color:#1a1a2e;margin-bottom:20px}
        h2{font-size:clamp(1.9rem,4vw,2.8rem);font-weight:900;line-height:1.2;color:#1a1a2e;margin-bottom:16px}
        h3{font-size:clamp(1.05rem,2vw,1.25rem);font-weight:700;color:#1a1a2e;margin-bottom:12px}
        p{font-size:clamp(0.95rem,1.1vw,1rem);line-height:1.65;color:#555;margin-bottom:12px}
        strong{font-weight:700;color:#1a1a2e}
        .container{max-width:1100px;margin:0 auto}
        .btn-primary{background:#1a1a2e;color:#fff;padding:clamp(13px,1.5vw,16px) clamp(28px,3vw,40px);border-radius:8px;font-weight:700;font-size:clamp(0.9rem,1vw,1rem);text-decoration:none;display:inline-block;transition:all 0.3s;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(26,26,46,0.2)}
        .btn-primary:hover{background:#2d2d4e;transform:translateY(-2px);box-shadow:0 6px 20px rgba(26,26,46,0.3)}
        .btn-secondary{background:transparent;color:#1a1a2e;border:2px solid #1a1a2e;padding:clamp(13px,1.5vw,16px) clamp(28px,3vw,40px);border-radius:8px;font-weight:700;font-size:clamp(0.9rem,1vw,1rem);text-decoration:none;display:inline-block;transition:all 0.3s;cursor:pointer}
        .btn-secondary:hover{background:#1a1a2e;color:#fff}
        
        .hero{background:#f8f9fa;padding:clamp(100px,12vw,150px) 5% !important;text-align:center}
        .hero h1{font-size:clamp(2.5rem,6vw,4.2rem);color:#1a1a2e}
        .hero .accent{color:#2d73b1}
        .hero > p{max-width:680px;margin:24px auto 32px;font-size:clamp(1rem,1.2vw,1.1rem);color:#555;line-height:1.7}
        .hero-ctas{display:flex;gap:14px;justify-content:center;margin-bottom:50px;flex-wrap:wrap}
        .hero-bullets{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-bottom:20px;max-width:800px;margin-left:auto;margin-right:auto;font-size:0.95rem}
        .hero-bullets span{display:flex;align-items:center;gap:8px;color:#555}
        .hero-bullets span:before{content:"✓";font-weight:900;color:#2d73b1;font-size:1.2rem}
        .hero-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:28px;max-width:700px;margin:70px auto 0;text-align:center}
        .stat-box{padding:24px 16px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04)}
        .stat-box strong{display:block;font-size:clamp(1.8rem,3vw,2.4rem);color:#2d73b1;margin-bottom:6px}
        .stat-box span{font-size:0.85rem;color:#999;font-weight:500}
        
        .pain-section{background:#fff;padding:clamp(70px,10vw,110px) 5% !important}
        .pain-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:42px}
        .pain-card{background:#f8f9fa;border-radius:12px;padding:32px 28px;box-shadow:0 2px 10px rgba(0,0,0,0.04);border-left:4px solid #e74c3c}
        .pain-card h3{color:#c0392b;margin-bottom:12px;font-size:1.1rem}
        .pain-card p{color:#666;font-size:0.95rem;line-height:1.6}
        
        .solution-section{background:#f8f9fa;padding:clamp(70px,10vw,110px) 5% !important}
        .solution-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;margin-top:44px}
        .solution-card{background:#fff;border-radius:12px;padding:32px 24px;box-shadow:0 2px 10px rgba(0,0,0,0.04);border-top:3px solid #2d73b1}
        .solution-card h3{font-size:1.05rem;margin-bottom:12px;color:#1a1a2e}
        .solution-card p{font-size:0.93rem;color:#666;line-height:1.6}
        
        .results-section{background:#1a1a2e;color:#fff;padding:clamp(70px,10vw,110px) 5% !important;text-align:center}
        .results-section h2{color:#fff}
        .results-section > p{color:rgba(255,255,255,0.85);max-width:600px;margin:20px auto 50px}
        .results-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;max-width:900px;margin:0 auto}
        .result-item{font-size:1.05rem}
        .result-item strong{display:block;font-size:clamp(2rem,3vw,2.6rem);color:#4db8ff;margin-bottom:8px}
        .result-item span{font-size:0.9rem;color:rgba(255,255,255,0.75);font-weight:500}
        
        .pricing-section{padding:clamp(70px,10vw,110px) 5% !important}
        .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;margin-top:50px;max-width:1000px;margin-left:auto;margin-right:auto}
        .pricing-card{border:2px solid #e0e0e0;border-radius:14px;padding:44px 34px;position:relative;transition:all 0.3s;background:#fff}
        .pricing-card:hover{border-color:#2d73b1;box-shadow:0 12px 32px rgba(45,115,177,0.12);transform:translateY(-4px)}
        .pricing-card.featured{border-color:#2d73b1;background:#f0f6fb;transform:scale(1.03)}
        .pricing-card .price{font-size:3rem;font-weight:900;color:#1a1a2e;margin:20px 0 8px}
        .pricing-card .price sup{font-size:1.3rem;font-weight:600}
        .pricing-card .setup{color:#999;font-size:0.9rem;margin-bottom:28px}
        .pricing-card ul{list-style:none;padding:0;margin-bottom:34px}
        .pricing-card li{padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);display:flex;gap:12px;font-size:0.95rem;color:#555}
        .pricing-card li:before{content:"✓";font-weight:900;color:#2d73b1;flex-shrink:0}
        .pricing-card .badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#2d73b1;color:#fff;padding:7px 24px;border-radius:100px;font-weight:700;font-size:0.77rem;text-transform:uppercase;letter-spacing:0.5px}
        
        .why-section{background:#f8f9fa;padding:clamp(70px,10vw,110px) 5% !important}
        .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;max-width:980px;margin:0 auto}
        .why-col h3{font-size:1.2rem;margin-bottom:24px;color:#1a1a2e}
        .why-col h3.red{color:#c0392b}
        .why-col h3.green{color:#27ae60}
        .why-col ul{list-style:none;padding:0}
        .why-col li{margin-bottom:18px;font-size:0.95rem;display:flex;gap:14px;align-items:flex-start;color:#555;line-height:1.6}
        .why-col li:before{content:"→";font-weight:900;color:#2d73b1;flex-shrink:0;margin-top:2px}
        
        .how-section{padding:clamp(70px,10vw,110px) 5% !important}
        .steps-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;margin-top:50px}
        .step{background:#f8f9fa;border-radius:12px;padding:36px 28px;text-align:center}
        .step-num{width:56px;height:56px;background:#2d73b1;color:#fff;border-radius:50%;font-size:1.8rem;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 18px}
        .step h3{margin-bottom:12px}
        .step p{font-size:0.92rem;color:#666}
        
        .urgency{background:linear-gradient(135deg,#e74c3c 0%,#c0392b 100%);color:#fff;padding:clamp(44px,6vw,64px) 5%;border-radius:14px;margin:0 5%;max-width:1000px;margin-left:auto;margin-right:auto}
        .urgency h3{color:#fff;font-size:clamp(1.4rem,2.5vw,2rem);margin-bottom:12px}
        .urgency p{color:rgba(255,255,255,0.95);font-size:0.96rem}
        
        .guarantee{background:#ecf9ff;border-left:4px solid #2d73b1;padding:28px 24px;border-radius:10px;margin:42px 0;max-width:600px;margin-left:auto;margin-right:auto}
        .guarantee strong{color:#1a5a7a;display:block;margin-bottom:8px;font-size:1rem}
        .guarantee p{color:#2c3e50;font-size:0.95rem}
        
        .cta-section{background:#1a1a2e;color:#fff;padding:clamp(80px,12vw,130px) 5%;text-align:center}
        .cta-section h2{color:#fff;margin-bottom:20px}
        .cta-section > p{color:rgba(255,255,255,0.85);max-width:620px;margin:16px auto 40px;font-size:1rem}
        .cta-buttons{display:flex;gap:16px;justify-content:center;margin-bottom:40px;flex-wrap:wrap}
        .cta-buttons a{font-size:clamp(0.95rem,1vw,1rem)}
        .phone-cta{color:rgba(255,255,255,0.85);font-size:0.95rem;margin-top:32px}
        .phone-cta strong{color:#4db8ff;font-size:1.1rem;display:block;margin-top:6px;font-weight:700}
        
        footer{background:#1a1a2e;color:rgba(255,255,255,0.6);padding:clamp(44px,6vw,60px) 5%;text-align:center;font-size:0.85rem;border-top:1px solid rgba(255,255,255,0.1)}
        footer strong{color:#fff}
        footer a{color:rgba(255,255,255,0.6);text-decoration:none;margin:0 12px;transition:color 0.2s}
        footer a:hover{color:#4db8ff}
        
        @media(max-width:768px){
          .hero-ctas{flex-direction:column;align-items:center}
          .hero-ctas .btn-primary,.hero-ctas .btn-secondary{width:100%;max-width:320px;text-align:center}
          .hero-bullets{flex-direction:column;gap:16px}
          .pain-grid{grid-template-columns:1fr}
          .solution-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
          .results-grid{grid-template-columns:repeat(2,1fr)}
          .pricing-card.featured{transform:scale(1)}
          .why-grid{grid-template-columns:1fr;gap:44px}
          .steps-grid{grid-template-columns:1fr 1fr}
          .cta-buttons{flex-direction:column;align-items:center}
          .cta-buttons a{width:100%;max-width:320px;text-align:center}
        }
        @media(max-width:480px){
          section{padding:50px 5%}
          h1{font-size:1.9rem}
          h2{font-size:1.5rem}
          .hero-stats{grid-template-columns:repeat(2,1fr);gap:16px;margin-top:50px}
          .results-grid{grid-template-columns:1fr}
          .pricing-grid{grid-template-columns:1fr}
          .steps-grid{grid-template-columns:1fr}
          .hero-bullets{flex-direction:column;gap:12px}
          .pain-card,.solution-card{padding:24px 20px}
        }
      `}</style>

      {/* 1. HERO */}
      <section className="hero">
        <div className="container">
          <h1>Meer klanten via je website — <span className="accent">binnen 48 uur live</span></h1>
          <p>Wij bouwen jouw website, zetten alles live en regelen daarna hosting, updates en onderhoud. Jij focust op je bedrijf. Geen gedoe.</p>
          <div className="hero-bullets">
            <span>48 uur online</span>
            <span>Alles inbegrepen</span>
            <span>Geen technisch gedoe</span>
          </div>
          <div className="hero-ctas">
            <a href="#pricing" className="btn-primary">Start je website →</a>
            <a href="#contact" className="btn-secondary">Plan gratis gesprek</a>
          </div>
          <div className="hero-stats">
            <div className="stat-box"><strong>48u</strong><span>Fully live</span></div>
            <div className="stat-box"><strong>€99/m</strong><span>Vanaf</span></div>
            <div className="stat-box"><strong>∞</strong><span>Updates erbij</span></div>
            <div className="stat-box"><strong>1</strong><span>Partner</span></div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM */}
      <section className="pain-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Je verliest klanten zonder dat je het doorhebt</h2>
          <p style={{ textAlign: "center", color: "#777", marginBottom: 40, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>Elke dag zonder goede website kost je potentiële klanten. Je concurrenten pakken ze in.</p>
          <div className="pain-grid">
            <div className="pain-card">
              <h3>🔍 Mensen vinden je niet</h3>
              <p>Ze zoeken online naar jouw bedrijf maar jij verschijnt niet. Je concurrent wel.</p>
            </div>
            <div className="pain-card">
              <h3>📱 Website ziet er verouderd uit</h3>
              <p>Of je hebt helemaal geen website. Klanten denken dat je niet meer actief bent.</p>
            </div>
            <div className="pain-card">
              <h3>📞 Geen manier om te boeken</h3>
              <p>Klanten kunnen niet bellen, reserveren of een bericht sturen. Ze geven het op.</p>
            </div>
            <div className="pain-card">
              <h3>⚖️ Minder vertrouwen</h3>
              <p>Geen website = minder geloofwaardig. Klanten kiezen liever een concurrent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="solution-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Wij zorgen dat jouw website klanten oplevert</h2>
          <p style={{ textAlign: "center", color: "#777", marginBottom: 42, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>Website + hosting + updates + onderhoud. Alles in één. Nul zorgen.</p>
          <div className="solution-grid">
            <div className="solution-card">
              <h3>⚡ Binnen 48 uur live</h3>
              <p>Niet maanden wachten. Wij bouwen en zetten je online. Klaar.</p>
            </div>
            <div className="solution-card">
              <h3>📱 Perfect op mobiel</h3>
              <p>Alles werkt op telefoon, tablet en computer. Klanten boeken direct.</p>
            </div>
            <div className="solution-card">
              <h3>🔧 Alles inbegrepen</h3>
              <p>Hosting, domein, SSL, updates, onderhoud. Je hebt niemand anders nodig.</p>
            </div>
            <div className="solution-card">
              <h3>📞 Klanten nemen contact op</h3>
              <p>Telefoon, contactformulier, WhatsApp. Nul fricties.</p>
            </div>
            <div className="solution-card">
              <h3>🔍 Google vindt je</h3>
              <p>Basisoptimalisatie inbegrepen. Je ranking stijgt automatisch.</p>
            </div>
            <div className="solution-card">
              <h3>🎯 Gericht op conversie</h3>
              <p>Niet mooi, maar werkend. Alles is gericht op meer klanten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESULTS */}
      <section className="results-section">
        <div className="container">
          <h2>Dit levert het jou op</h2>
          <p>Stop met klanten verliezen. Begin met klanten winnen.</p>
          <div className="results-grid">
            <div className="result-item">
              <strong>+Afspraken</strong>
              <span>Klanten boeken direct</span>
            </div>
            <div className="result-item">
              <strong>+Aanvragen</strong>
              <span>Formulieren vullen zich</span>
            </div>
            <div className="result-item">
              <strong>+Omzet</strong>
              <span>Extra klanten = inkomsten</span>
            </div>
            <div className="result-item">
              <strong>0 Gedoe</strong>
              <span>Wij regelen alles</span>
            </div>
          </div>
          <p style={{ fontSize: "1rem", maxWidth: 700, margin: "52px auto 0", fontWeight: 600, color: "#4db8ff" }}>💰 1–2 extra klanten per maand betaalt je hele website. Daarna is het puur winst.</p>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="pricing-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>Kies jouw pakket</h2>
          <p style={{ textAlign: "center", color: "#777", marginBottom: 50, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>Transparante prijzen. Geen verborgen kosten. Opzeggen wanneer je wil.</p>
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
                <a href="#contact" className="btn-primary" style={{ width: "100%", textAlign: "center", display: "block" }}>Kies {pkg.name}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY SUBSCRIPTION */}
      <section className="why-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 48 }}>Waarom een abonnement beter is</h2>
          <div className="why-grid">
            <div className="why-col">
              <h3 className="red">❌ Eenmalig betalen (oud model)</h3>
              <ul>
                <li>€3000+ upfront betalen</li>
                <li>Hosting zelf regelen (€10-50/m extra)</li>
                <li>Updates? Betaal per update</li>
                <li>Bug? €500+ reparatie</li>
                <li>Jij bent volledig verantwoordelijk</li>
              </ul>
            </div>
            <div className="why-col">
              <h3 className="green">✅ Abonnement (slim)</h3>
              <ul>
                <li>€99-249/m, alles inbegrepen</li>
                <li>Hosting, domein, updates in één prijs</li>
                <li>Automatische updates & optimalisaties</li>
                <li>Bug? We fixen het gratis</li>
                <li>Jij focust op bedrijf. Wij op website.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ROI */}
      <section style={{ background: "#ecf9ff", padding: "clamp(70px,10vw,110px) 5%", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "#1a5a7a", marginBottom: 20 }}>📊 Realistische ROI</h2>
          <p style={{ fontSize: "1.05rem", color: "#2c3e50", marginBottom: 32, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            Als je per maand <strong>maar 1 extra klant</strong> binnenhaalt die gemiddeld €100+ uitgeeft...
          </p>
          <div style={{ background: "#fff", border: "2px solid #2d73b1", borderRadius: 12, padding: "34px", maxWidth: 480, margin: "0 auto" }}>
            <p style={{ color: "#2d73b1", fontWeight: 600, fontSize: "0.9rem", marginBottom: 14 }}>JIJ BETAALT:</p>
            <p style={{ color: "#1a1a2e", fontSize: "1.6rem", fontWeight: 900, marginBottom: 24 }}>€149/m</p>
            <p style={{ color: "#2d73b1", fontWeight: 600, fontSize: "0.9rem", marginBottom: 8 }}>JIJ VERDIENT:</p>
            <p style={{ color: "#27ae60", fontSize: "1.6rem", fontWeight: 900 }}>€100–500+/m</p>
          </div>
          <p style={{ marginTop: 32, color: "#2c3e50", fontWeight: 600 }}>Website betaalt zich terug in maand 1. Daarna is het puur winst.</p>
        </div>
      </section>

      {/* 8. HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 48 }}>Hoe het werkt</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Je belt ons</h3>
              <p>Korte kennismaking. Jij vertelt wat je bedrijf is, wij maken een plan.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Wij bouwen</h3>
              <p>48 uur later: website klaar, getest, beveiligd, snel. Klaar.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Je gaat live</h3>
              <p>Klik. Website online. Klanten vinden en bellen jou.</p>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <h3>Wij zorgen ervoor</h3>
              <p>Updates, optimalisaties, onderhoud — alles door ons. Maandelijks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. URGENCY + 11. GUARANTEE */}
      <section style={{ padding: "clamp(70px,10vw,110px) 5%", textAlign: "center" }}>
        <div className="container">
          <div className="urgency">
            <h3>⚡ We nemen max 5 klanten per week aan</h3>
            <p>We geven elk project volle aandacht. Snelheid + kwaliteit. Niet beide tegelijk. Als je nu belt, krijg jij een plek.</p>
          </div>
          <div className="guarantee">
            <strong>💰 7-daags geld-terug garantie</strong>
            <p>Niet tevreden? We geven je geld terug, geen vragen gesteld. Nul risico.</p>
          </div>
        </div>
      </section>

      {/* 12. CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Klaar om meer klanten te krijgen?</h2>
          <p>Geen gedoe. Geen verplichtingen. Gewoon een gesprek over jouw website en hoe het je klanten oplevert.</p>
          <div className="cta-buttons">
            <a href="#contact" className="btn-primary">Start je website nu →</a>
            <a href="#contact" className="btn-secondary">Plan gratis gesprek</a>
          </div>
          <div className="phone-cta">
            Liever direct met ons praten?<br/>
            <strong>+31 6 26 21 99 89</strong>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 <strong>Vedantix</strong> — Website + hosting + onderhoud + support. Start €99/maand.</p>
        <div style={{ marginTop: 12 }}>
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