import { useState, useEffect } from "react";
import LiveChatWidget from "../components/LiveChatWidget";
import PortfolioSection from "../components/PortfolioSection";

if (typeof document !== "undefined") {
  let vp = document.querySelector('meta[name="viewport"]');
  if (!vp) {
    vp = document.createElement("meta");
    vp.name = "viewport";
    vp.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(vp);
  }
}

const NAV_LINKS = [
  { href: "#probleem", label: "Aanpak" },
  { href: "#resultaten", label: "Resultaten" },
  { href: "#case-study", label: "Case study" },
  { href: "#prijzen", label: "Prijzen" },
  { href: "#contact", label: "Contact" },
];

function Nav() {
  const [mob, setMob] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .vd-nav{position:fixed;top:0;left:0;right:0;z-index:200;transition:all 0.3s;padding:0 5%;display:flex;align-items:center;justify-content:space-between;height:64px}
        .vd-nav.scrolled{background:rgba(10,22,40,0.97);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.06)}
        .vd-nav.top{background:transparent}
        .vd-logo{color:#fff;font-weight:900;font-size:1.35rem;letter-spacing:-0.5px;text-decoration:none}
        .vd-logo span{color:#00c2ff}
        .vd-links{display:flex;gap:4px;list-style:none;align-items:center}
        .vd-link{color:rgba(255,255,255,0.7);text-decoration:none;font-size:0.88rem;font-weight:600;padding:8px 14px;border-radius:7px;transition:all 0.15s}
        .vd-link:hover{color:#fff;background:rgba(255,255,255,0.08)}
        .vd-cta{background:#1a73e8;color:#fff;padding:9px 22px;border-radius:8px;font-weight:700;font-size:0.87rem;text-decoration:none;transition:all 0.2s;white-space:nowrap}
        .vd-cta:hover{background:#00c2ff;transform:translateY(-1px)}
        .vd-hbg{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:4px}
        .vd-hbg span{display:block;width:22px;height:2px;background:#fff;border-radius:2px}
        .vd-mob{position:fixed;top:64px;left:0;right:0;background:#0a1628;border-top:1px solid rgba(255,255,255,0.08);padding:16px 5% 24px;z-index:199;display:flex;flex-direction:column;gap:4px}
        .vd-mob a{color:rgba(255,255,255,0.85);text-decoration:none;font-size:0.9rem;font-weight:600;padding:12px 8px;border-radius:8px;display:block}
        .vd-mob a:hover{background:rgba(255,255,255,0.07)}
        @media(max-width:768px){.vd-links{display:none}.vd-hbg{display:flex}}
      `}</style>
      <nav className={`vd-nav ${scrolled ? "scrolled" : "top"}`}>
        <a href="/Home" className="vd-logo">Vedantix<span>.</span></a>
        <ul className="vd-links">
          {NAV_LINKS.map(l => <li key={l.href}><a href={l.href} className="vd-link">{l.label}</a></li>)}
        </ul>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="#contact" className="vd-cta">Boek een gratis call →</a>
          <button className="vd-hbg" onClick={() => setMob(p => !p)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {mob && (
        <div className="vd-mob">
          {NAV_LINKS.map(l => <a key={l.href} href={l.href} onClick={() => setMob(false)}>{l.label}</a>)}
          <a href="#contact" onClick={() => setMob(false)} style={{ background: "#1a73e8", color: "#fff", marginTop: 8, borderRadius: 10, textAlign: "center" }}>
            Boek een gratis call →
          </a>
        </div>
      )}
    </>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [pakket, setPakket] = useState(() => {
    const hash = window.location.hash;
    const match = hash.match(/pakket=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : "";
  });

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/pakket=([^&]+)/);
      if (match) setPakket(decodeURIComponent(match[1]));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (sent) {
    return (
      <div style={{ background: "#f0fdf4", border: "2px solid #10b981", borderRadius: 12, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: 12 }}>✅</div>
        <h3 style={{ color: "#065f46", marginBottom: 8, fontWeight: 800 }}>Aanvraag ontvangen.</h3>
        <p style={{ color: "#047857" }}>We nemen binnen 24 uur contact op voor een strategiegesprek.</p>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <input type="text" placeholder="Naam" required style={iStyle} />
        <input type="text" placeholder="Bedrijfsnaam" style={iStyle} />
      </div>
      <input type="email" placeholder="E-mailadres" required style={iStyle} />
      <input type="tel" placeholder="Telefoonnummer" style={iStyle} />
      <select value={pakket} onChange={e => setPakket(e.target.value)} style={iStyle}>
        <option value="">Wat heb je nodig?</option>
        <option value="Website — vanaf €1.500">Professionele website — vanaf €1.500</option>
        <option value="AI-tool / webapp — vanaf €3.500">AI-tool / webapp — vanaf €3.500</option>
        <option value="Volledige digitale strategie — vanaf €5.000">Volledige digitale strategie — vanaf €5.000</option>
        <option value="Weet ik nog niet">Weet ik nog niet — vertel me wat je nodig hebt</option>
      </select>
      <textarea placeholder="Beschrijf kort je project en wat je wil bereiken..." rows={4} style={{ ...iStyle, resize: "vertical" }} />
      <button type="submit" style={{ background: "#1a73e8", color: "#fff", padding: "14px", borderRadius: 9, fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer" }}>
        Ja, ik wil een gratis strategiegesprek →
      </button>
      <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.78rem" }}>Geen verplichtingen. Geen verkooppraatje. Gewoon een eerlijk gesprek.</p>
    </form>
  );
}

const iStyle = { width: "100%", padding: "12px 15px", border: "2px solid #e5e7eb", borderRadius: 9, fontSize: "0.9rem", fontFamily: "inherit", outline: "none", background: "#f7f9fc" };

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1a2e", background: "#fff", lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        .tag{display:inline-block;background:rgba(26,115,232,0.1);color:#1a73e8;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:5px 14px;border-radius:100px;margin-bottom:16px}
        .tag-dark{background:rgba(0,194,255,0.12);color:#00c2ff}
        h2.section-title{font-size:clamp(1.8rem,3.5vw,2.4rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;margin-bottom:14px}
        .section-sub{color:#6b7280;font-size:1rem;max-width:560px;line-height:1.7}
        .center{text-align:center}.center .section-sub{margin:0 auto}

        /* HERO */
        .hero{min-height:100vh;background:linear-gradient(150deg,#050d1a 0%,#0a1628 50%,#071020 100%);display:flex;align-items:center;padding:120px 5% 80px;position:relative;overflow:hidden}
        .hero::before{content:'';position:absolute;top:-200px;right:-200px;width:700px;height:700px;background:radial-gradient(circle,rgba(0,194,255,0.07) 0%,transparent 65%);pointer-events:none}
        .hero::after{content:'';position:absolute;bottom:-100px;left:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(26,115,232,0.06) 0%,transparent 65%);pointer-events:none}
        .hero-inner{max-width:780px;position:relative;z-index:1}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,194,255,0.1);border:1px solid rgba(0,194,255,0.2);color:#00c2ff;padding:7px 18px;border-radius:100px;font-size:0.8rem;font-weight:700;margin-bottom:32px;letter-spacing:0.3px}
        .hero h1{font-size:clamp(2.6rem,6vw,4.2rem);color:#fff;font-weight:900;letter-spacing:-2px;line-height:1.05;margin-bottom:24px}
        .hero h1 em{font-style:normal;background:linear-gradient(90deg,#1a73e8,#00c2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-sub{color:rgba(255,255,255,0.6);font-size:1.15rem;max-width:580px;margin-bottom:40px;line-height:1.75}
        .hero-sub strong{color:rgba(255,255,255,0.9)}
        .hero-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:60px}
        .btn-primary{background:linear-gradient(135deg,#1a73e8,#0d5cbf);color:#fff;padding:15px 36px;border-radius:10px;font-weight:800;text-decoration:none;font-size:1rem;transition:all 0.2s;box-shadow:0 6px 24px rgba(26,115,232,0.4);letter-spacing:-0.2px}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(26,115,232,0.5)}
        .btn-ghost{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:15px 30px;border-radius:10px;font-weight:600;text-decoration:none;font-size:0.95rem;border:1px solid rgba(255,255,255,0.15);transition:all 0.2s}
        .btn-ghost:hover{background:rgba(255,255,255,0.12);color:#fff}
        .hero-stats{display:flex;gap:48px;flex-wrap:wrap;padding-top:48px;border-top:1px solid rgba(255,255,255,0.08)}
        .stat-val{font-size:2rem;font-weight:900;color:#fff;line-height:1;display:block}
        .stat-label{font-size:0.78rem;color:rgba(255,255,255,0.4);margin-top:5px;display:block;font-weight:600;letter-spacing:0.5px;text-transform:uppercase}

        /* PROBLEEM */
        .probleem-sec{background:#f7f9fc;padding:100px 5%}
        .two-col{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1100px;margin:0 auto}
        .pain-list{list-style:none;margin-top:28px}
        .pain-list li{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid #e5e7eb;font-size:0.95rem;color:#374151;line-height:1.6}
        .pain-list li:last-child{border-bottom:none}
        .pain-icon{width:36px;height:36px;background:#fee2e2;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
        .solution-card{background:#0a1628;border-radius:20px;padding:36px;color:#fff}
        .solution-item{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.07)}
        .solution-item:last-child{border-bottom:none}
        .sol-icon{width:36px;height:36px;background:rgba(0,194,255,0.12);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;border:1px solid rgba(0,194,255,0.2)}

        /* RESULTATEN */
        .resultaten-sec{padding:100px 5%;background:#fff}
        .benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;max-width:1100px;margin:52px auto 0}
        .benefit-card{background:#fff;border:1px solid #e5e7eb;border-radius:18px;padding:32px 28px;transition:all 0.2s}
        .benefit-card:hover{border-color:#1a73e8;transform:translateY(-4px);box-shadow:0 12px 40px rgba(26,115,232,0.1)}
        .benefit-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:20px}
        .benefit-card h3{font-size:1.1rem;font-weight:800;margin-bottom:10px}
        .benefit-card p{color:#6b7280;font-size:0.9rem;line-height:1.65}

        /* CASE STUDY */
        .case-sec{background:linear-gradient(150deg,#0a1628,#0d1f3c);padding:100px 5%}
        .case-inner{max-width:1000px;margin:0 auto}
        .case-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;margin-top:52px}
        .case-block{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px}
        .case-block h4{color:#00c2ff;font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px}
        .case-block p{color:rgba(255,255,255,0.7);font-size:0.92rem;line-height:1.7}
        .case-result{background:linear-gradient(135deg,rgba(26,115,232,0.15),rgba(0,194,255,0.1));border:1px solid rgba(0,194,255,0.25);border-radius:16px;padding:28px;margin-top:24px}
        .result-row{display:flex;align-items:center;gap:16px;padding:10px 0;border-bottom:1px solid rgba(0,194,255,0.1)}
        .result-row:last-child{border-bottom:none}
        .result-val{font-size:1.6rem;font-weight:900;color:#00c2ff;min-width:80px}
        .result-desc{color:rgba(255,255,255,0.75);font-size:0.88rem}

        /* HOE HET WERKT */
        .process-sec{background:#f7f9fc;padding:100px 5%}
        .steps-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px;max-width:1000px;margin:52px auto 0;position:relative}
        .steps-grid::before{content:'';position:absolute;top:40px;left:15%;right:15%;height:2px;background:linear-gradient(90deg,#1a73e8,#00c2ff);z-index:0;display:none}
        .step-card{background:#fff;border-radius:18px;padding:36px 28px;position:relative;margin:8px}
        .step-num{width:48px;height:48px;background:linear-gradient(135deg,#1a73e8,#00c2ff);border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.1rem;color:#fff;margin-bottom:20px}
        .step-card h3{font-weight:800;font-size:1.05rem;margin-bottom:10px}
        .step-card p{color:#6b7280;font-size:0.88rem;line-height:1.65}

        /* PRICING */
        .pricing-sec{background:#0a1628;padding:100px 5%}
        .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:1000px;margin:52px auto 0}
        .price-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:22px;padding:40px 32px;color:#fff;transition:all 0.2s;position:relative}
        .price-card:hover{transform:translateY(-4px);border-color:rgba(0,194,255,0.4)}
        .price-card.featured{background:linear-gradient(145deg,rgba(26,115,232,0.2),rgba(0,194,255,0.1));border-color:#00c2ff}
        .featured-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#1a73e8,#00c2ff);color:#fff;padding:4px 18px;border-radius:100px;font-size:0.74rem;font-weight:800;white-space:nowrap}
        .price-label{font-size:0.8rem;font-weight:700;color:#00c2ff;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
        .price-amount{font-size:clamp(2.2rem,4vw,3rem);font-weight:900;line-height:1;margin:12px 0 6px}
        .price-from{font-size:0.85rem;color:rgba(255,255,255,0.4);font-weight:500}
        .price-desc{color:rgba(255,255,255,0.45);font-size:0.85rem;margin-bottom:28px}
        .price-features{list-style:none;margin-bottom:32px}
        .price-features li{padding:8px 0;font-size:0.9rem;color:rgba(255,255,255,0.75);border-bottom:1px solid rgba(255,255,255,0.06);display:flex;gap:10px}
        .price-features li::before{content:"✓";color:#00c2ff;font-weight:800;flex-shrink:0}
        .price-btn{display:block;text-align:center;padding:14px;border-radius:10px;font-weight:700;text-decoration:none;font-size:0.92rem;transition:all 0.2s}
        .price-btn-outline{border:2px solid rgba(255,255,255,0.25);color:#fff}
        .price-btn-outline:hover{border-color:#00c2ff;color:#00c2ff}
        .price-btn-fill{background:linear-gradient(135deg,#1a73e8,#00c2ff);color:#fff}
        .price-btn-fill:hover{opacity:0.9;transform:translateY(-1px)}

        /* TESTIMONIALS */
        .social-sec{padding:100px 5%;background:#fff}
        .testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;max-width:1000px;margin:52px auto 0}
        .testimonial{background:#f7f9fc;border-radius:18px;padding:32px;border:1px solid #e5e7eb}
        .testimonial-quote{font-size:0.95rem;color:#374151;line-height:1.75;margin-bottom:24px;font-style:italic}
        .testimonial-author{display:flex;align-items:center;gap:12px}
        .author-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#1a73e8,#00c2ff);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:1rem;flex-shrink:0}
        .author-name{font-weight:700;font-size:0.9rem}
        .author-role{color:#94a3b8;font-size:0.78rem}

        /* CTA */
        .cta-sec{background:linear-gradient(150deg,#050d1a,#0a1628);padding:100px 5%;text-align:center;position:relative;overflow:hidden}
        .cta-sec::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:400px;background:radial-gradient(ellipse,rgba(0,194,255,0.06) 0%,transparent 70%);pointer-events:none}
        .cta-inner{max-width:680px;margin:0 auto;position:relative;z-index:1}
        .cta-sec h2{color:#fff;font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;margin-bottom:20px;line-height:1.1}
        .cta-sec p{color:rgba(255,255,255,0.55);font-size:1.05rem;margin-bottom:40px}
        .urgency{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#fca5a5;padding:7px 18px;border-radius:100px;font-size:0.8rem;font-weight:700;margin-bottom:28px}

        /* CONTACT */
        .contact-sec{padding:100px 5%;background:#fff}
        .contact-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;max-width:1000px;margin:0 auto}
        .contact-info h3{font-size:1.5rem;font-weight:900;margin-bottom:16px;line-height:1.25}
        .contact-info p{color:#6b7280;font-size:0.93rem;line-height:1.7;margin-bottom:28px}
        .contact-row{display:flex;align-items:center;gap:14px;margin-bottom:16px}
        .contact-icon{width:40px;height:40px;background:#f7f9fc;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;border:1px solid #e5e7eb}

        footer{background:#050d1a;color:rgba(255,255,255,0.35);padding:40px 5%;text-align:center;font-size:0.82rem}
        footer strong{color:rgba(255,255,255,0.75)}
        footer a{color:rgba(255,255,255,0.35);text-decoration:none}
        footer a:hover{color:#00c2ff}
        .footer-links{display:flex;justify-content:center;gap:24px;margin-top:14px;flex-wrap:wrap}

        @media(max-width:900px){
          .two-col{grid-template-columns:1fr;gap:48px}
          .case-grid{grid-template-columns:1fr;gap:28px}
          .contact-inner{grid-template-columns:1fr;gap:40px}
        }
        @media(max-width:768px){
          .hero h1{letter-spacing:-1px}
          .hero-stats{gap:24px}
          .hero-btns{flex-direction:column;align-items:flex-start}
          .btn-primary,.btn-ghost{width:100%;max-width:340px;text-align:center}
          .benefits-grid{grid-template-columns:1fr 1fr}
          .pricing-grid{grid-template-columns:1fr}
          .testimonials-grid{grid-template-columns:1fr}
          .steps-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:480px){
          .hero{padding:100px 5% 60px}
          .benefits-grid{grid-template-columns:1fr}
          .steps-grid{grid-template-columns:1fr}
          .hero-stats{gap:16px}
          .stat-val{font-size:1.6rem}
        }
      `}</style>

      <Nav />
      <LiveChatWidget />

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
            Wij hebben nog 2 plekken vrij in april
          </div>
          <h1>
            Jouw concurrenten<br />
            wachten <em>maanden</em>.<br />
            Jij bent live in een week.
          </h1>
          <p className="hero-sub">
            Vedantix bouwt professionele websites en AI-tools voor ondernemers die <strong>resultaat willen</strong> — geen ellenlange trajecten, geen vage offertes, geen verrassingen.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Boek een gratis strategiegesprek →</a>
            <a href="#case-study" className="btn-ghost">Bekijk een case study</a>
          </div>
          <div className="hero-stats">
            <div>
              <span className="stat-val">5–7</span>
              <span className="stat-label">Dagen tot live</span>
            </div>
            <div>
              <span className="stat-val">€1.5k</span>
              <span className="stat-label">Startprijs</span>
            </div>
            <div>
              <span className="stat-val">100%</span>
              <span className="stat-label">Op maat gemaakt</span>
            </div>
            <div>
              <span className="stat-val">AI-first</span>
              <span className="stat-label">Aanpak</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ PROBLEEM + OPLOSSING ═══════════════════════════════ */}
      <section id="probleem" className="probleem-sec">
        <div className="two-col">
          {/* Links: pijn */}
          <div>
            <span className="tag">Het probleem</span>
            <h2 className="section-title">Traditionele webdevelopment is gebroken.</h2>
            <p className="section-sub">
              Je vraagt een offerte aan. Twee weken later hoor je iets. Dan duurt het project vier maanden. En dan betaal je €15.000 voor iets wat net niet is wat je wilde.
            </p>
            <ul className="pain-list">
              {[
                ["😤", "3–6 maanden doorlooptijd voor een simpele website", "Terwijl jouw concurrenten die tijd wél benutten."],
                ["💸", "Offertes van €10k–€40k voor standaardwerk", "Je betaalt voor uren, niet voor resultaat."],
                ["🔁", "Eindeloze feedback-rondes zonder richting", "Zonder duidelijk proces gaat het nooit op tijd klaar."],
                ["📦", "Je levert op in een vacuüm", "Na lancering ben je op jezelf aangewezen."],
              ].map(([icon, title, sub]) => (
                <li key={title}>
                  <div className="pain-icon">{icon}</div>
                  <div>
                    <strong style={{ display: "block", marginBottom: 3 }}>{title}</strong>
                    <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{sub}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechts: oplossing */}
          <div>
            <div className="solution-card">
              <span className="tag tag-dark">Onze aanpak</span>
              <h2 className="section-title" style={{ color: "#fff", fontSize: "1.6rem" }}>Wij bouwen anders.</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 28 }}>
                Geen agentschapslagen. Geen junior developers. Wij combineren AI-tooling met senior expertise om sneller te leveren voor minder geld — zonder kwaliteitsverlies.
              </p>
              {[
                ["⚡", "Intake vandaag, ontwerp morgen, live volgende week", "Onze AI-assisted workflow comprimeeert maanden naar dagen."],
                ["🎯", "We starten met jouw businessdoel, niet met pixels", "Elke beslissing is gemotiveerd door conversie en resultaat."],
                ["🔧", "Alles inbegrepen: design, development, hosting", "Één contactpersoon. Geen verborgen kosten."],
                ["📈", "We meten. We optimaliseren. We blijven beschikbaar.", "Na lancering heb je een partner, geen factuur."],
              ].map(([icon, title, sub]) => (
                <div key={title} className="solution-item">
                  <div className="sol-icon">{icon}</div>
                  <div>
                    <strong style={{ color: "#fff", display: "block", fontSize: "0.92rem", marginBottom: 3 }}>{title}</strong>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ RESULTATEN ═══════════════════════════════ */}
      <section id="resultaten" className="resultaten-sec">
        <div className="center">
          <span className="tag">Resultaten</span>
          <h2 className="section-title">Wat je concreet krijgt.</h2>
          <p className="section-sub">Geen belofte. Geen vaag "we doen ons best". Hier is wat je van ons mag verwachten.</p>
        </div>
        <div className="benefits-grid">
          {[
            { icon: "⚡", bg: "#eff6ff", color: "#1a73e8", title: "Live in 5–7 werkdagen", body: "Van intake tot gepubliceerde website in één week. We houden ons aan deadlines omdat we weten dat jouw tijd geld kost." },
            { icon: "💰", bg: "#f0fdf4", color: "#10b981", title: "Tot 70% goedkoper dan een bureau", body: "Door slim gebruik van AI-tooling leveren we bureaukwaliteit voor een fractie van de prijs. Vanaf €1.500 voor een volledige website." },
            { icon: "🤖", bg: "#f5f3ff", color: "#7c3aed", title: "AI-tools die écht werken", body: "Wij bouwen niet alleen websites — we bouwen AI-tools die jouw bedrijfsprocessen automatiseren en nieuwe omzetstromen openen." },
            { icon: "📐", bg: "#fffbeb", color: "#d97706", title: "100% op maat, nul templates", body: "Geen WordPress-thema's. Geen Wix. Elke pixel is bedoeld voor jóúw publiek en jóúw conversiedoelen." },
            { icon: "🔒", bg: "#fef2f2", color: "#dc2626", title: "Hosting, SSL en updates inbegrepen", body: "Je hoeft nooit meer te bellen met een hostingpartij. Wij regelen de techniek. Jij regelt het businessresultaat." },
            { icon: "📞", bg: "#f0f9ff", color: "#0369a1", title: "Directe lijnen, geen ticketsysteem", body: "Eén contactpersoon. Directe toegang. Geen weken wachten op antwoord. We behandelen jouw project als ons eigen bedrijf." },
          ].map(b => (
            <div key={b.title} className="benefit-card">
              <div className="benefit-icon" style={{ background: b.bg, color: b.color }}>{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ CASE STUDY ═══════════════════════════════ */}
      <section id="case-study" className="case-sec">
        <div className="case-inner">
          <div className="center">
            <span className="tag tag-dark">Case study</span>
            <h2 className="section-title" style={{ color: "#fff" }}>Van idee naar werkend AI-product in 4 dagen.</h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,0.45)", margin: "0 auto" }}>
              Hoe we Vani bouwden — een AI-communicatieapp voor neurodivergente gebruikers — zonder maandenlang traject.
            </p>
          </div>

          <div className="case-grid">
            <div>
              <div className="case-block">
                <h4>Het probleem</h4>
                <p>De oprichter van Vani had een helder idee: een app die mensen met autisme of ADHD helpt om complexe communicatie te vereenvoudigen met AI. Maar elk traditioneel bureau gaf een offerte van 3–6 maanden en €25.000+. Het project lag stil.</p>
              </div>
              <div className="case-block" style={{ marginTop: 16 }}>
                <h4>Onze aanpak</h4>
                <p>In een intake van 2 uur definieerden we de kernfunctionaliteiten. Daarna gebruikten we onze AI-assisted development workflow om de app te bouwen: realtime tekstverwerking, gepersonaliseerde communicatieprofielen en een intuïtieve interface — allemaal iteratief in directe samenwerking met de oprichter.</p>
              </div>
            </div>

            <div>
              <div className="case-result">
                <h4 style={{ color: "#00c2ff", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>Resultaat</h4>
                {[
                  ["4 dagen", "Van eerste gesprek tot werkend product"],
                  ["€4.200", "All-in investering (vs. €25k+ bij een bureau)"],
                  ["83%", "Kostenbesparing t.o.v. traditionele offerte"],
                  ["Week 1", "Eerste echte gebruikers actief"],
                ].map(([val, desc]) => (
                  <div key={val} className="result-row">
                    <div className="result-val">{val}</div>
                    <div className="result-desc">{desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, marginTop: 16 }}>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.7 }}>
                  "Ik had dit project maanden voor me uitgeschoven omdat ik dacht dat het onbetaalbaar was. Vedantix liet me zien dat het anders kon — sneller, goedkoper en beter dan ik had durven hopen."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#1a73e8,#00c2ff)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 }}>V</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.88rem" }}>Oprichter, Vani App</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>AI-communicatieplatform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ HOE HET WERKT ═══════════════════════════════ */}
      <section id="proces" className="process-sec">
        <div className="center">
          <span className="tag">Hoe het werkt</span>
          <h2 className="section-title">Van gesprek naar live project.<br />In 4 stappen.</h2>
          <p className="section-sub">Geen ellenlange trajecten. Geen verrassingen. Geen onnodig gedoe.</p>
        </div>
        <div className="steps-grid">
          {[
            ["01", "Gratis strategiegesprek", "30 minuten. We leren jouw business kennen, definiëren het doel en geven direct eerlijk advies — ook als wij niet de juiste partner zijn."],
            ["02", "Voorstel binnen 24 uur", "Je ontvangt een concreet voorstel met scope, tijdlijn en vaste prijs. Geen verborgen uren, geen sluipende meerkosten."],
            ["03", "Wij bouwen, jij keurt goed", "Dagelijkse updates. Directe feedbackrondes. Jij ziet het product groeien en houdt controle zonder zelf te hoeven bouwen."],
            ["04", "Live — en we blijven beschikbaar", "Na lancering ben je niet alleen. We monitoren, optimaliseren en staan klaar voor aanpassingen. Jij groeit, wij schalen mee."],
          ].map(([num, title, body]) => (
            <div key={num} className="step-card">
              <div className="step-num">{num}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ PORTFOLIO ═══════════════════════════════ */}
      <PortfolioSection />

      {/* ═══════════════════════════════ PRICING ═══════════════════════════════ */}
      <section id="prijzen" className="pricing-sec">
        <div className="center">
          <span className="tag tag-dark">Investering</span>
          <h2 className="section-title" style={{ color: "#fff" }}>Transparante prijzen.<br />Geen verrassingen.</h2>
          <p className="section-sub" style={{ color: "rgba(255,255,255,0.45)", margin: "0 auto" }}>
            Vaste prijs. Geen uurtarief. Geen scope creep. Je weet van tevoren exact wat je betaalt.
          </p>
        </div>
        <div className="pricing-grid">
          {[
            {
              label: "Website", amount: "€1.500", from: "vaste prijs",
              desc: "Voor ondernemers die professioneel online willen staan.",
              features: ["Tot 5 pagina's op maat", "Mobielvriendelijk design", "SEO-basisoptimalisatie", "Contactformulier + Google Maps", "Hosting + SSL (1 jaar)", "Live binnen 7 werkdagen"],
              btn: "price-btn-outline", featured: false,
            },
            {
              label: "Webapp / AI-tool", amount: "€3.500", from: "vanaf",
              desc: "Voor bedrijven die een uniek digitaal product willen bouwen.",
              features: ["Custom design & development", "AI-integratie mogelijk", "Gebruikersaccounts / login", "Database & backend logica", "Hosting + onderhoud", "Live binnen 14 werkdagen"],
              btn: "price-btn-fill", featured: true,
            },
            {
              label: "Volledige strategie", amount: "€6.000", from: "vanaf",
              desc: "Voor ondernemers die digitaal willen opschalen.",
              features: ["Alles van Website + Webapp", "Digitale groeistrategie", "Marketing automation", "Maandelijkse optimalisatiesessies", "Prioriteit support", "Dedicated accountmanager"],
              btn: "price-btn-outline", featured: false,
            },
          ].map(p => (
            <div key={p.label} className={`price-card ${p.featured ? "featured" : ""}`}>
              {p.featured && <div className="featured-badge">MEEST GEKOZEN</div>}
              <div className="price-label">{p.label}</div>
              <div className="price-amount">{p.amount}</div>
              <div className="price-from">{p.from}</div>
              <div className="price-desc" style={{ marginTop: 10 }}>{p.desc}</div>
              <ul className="price-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#contact" className={`price-btn ${p.btn}`}>
                Start dit project →
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", marginTop: 32, fontSize: "0.85rem" }}>
          Alle prijzen zijn excl. BTW. Maatwerk? Stuur een bericht — we denken graag mee.
        </p>
      </section>

      {/* ═══════════════════════════════ TESTIMONIALS ═══════════════════════════════ */}
      <section id="social-proof" className="social-sec">
        <div className="center">
          <span className="tag">Wat klanten zeggen</span>
          <h2 className="section-title">Ze twijfelden ook eerst.</h2>
          <p className="section-sub">Totdat ze zagen hoe snel het kon.</p>
        </div>
        <div className="testimonials-grid">
          {[
            {
              quote: "Ik had drie offertes gevraagd bij andere bureaus. De laagste was €18.000 en 4 maanden. Vedantix leverde hetzelfde in 6 dagen voor €2.800. Ik had dit eerder moeten doen.",
              name: "Mark de Vries", role: "Eigenaar, bouwbedrijf",
            },
            {
              quote: "Het strategiegesprek alleen al was meer waard dan het gesprek dat ik had bij een groot bureau. Ze begrijpen business — niet alleen pixels.",
              name: "Sarah Jansen", role: "Oprichter, onlinesalon",
            },
            {
              quote: "We wilden een AI-tool die onze klantenservice automatiseert. In twee weken hadden we een werkend prototype. Onze klantcontacttijd daalde met 60%.",
              name: "Tom van Dijk", role: "Operations lead, e-commerce",
            },
          ].map(t => (
            <div key={t.name} className="testimonial">
              <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: "0.85rem" }}>★</span>)}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ CTA ═══════════════════════════════ */}
      <section className="cta-sec">
        <div className="cta-inner">
          <div className="urgency">
            🔴 &nbsp;Nog 2 projectplekken beschikbaar in april
          </div>
          <h2>Elke week dat je wacht,<br />loopt omzet weg.</h2>
          <p>Een gratis gesprek van 30 minuten. Geen verplichtingen. Wij vertellen je eerlijk of — en hoe — we je kunnen helpen.</p>
          <a href="#contact" className="btn-primary" style={{ display: "inline-block", fontSize: "1.05rem", padding: "16px 40px" }}>
            Boek jouw gratis strategiegesprek →
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════ CONTACT ═══════════════════════════════ */}
      <section id="contact" className="contact-sec">
        <div className="contact-inner">
          <div className="contact-info">
            <span className="tag">Start hier</span>
            <h3>Klaar om te bouwen?</h3>
            <p>
              Vertel ons over je project. We reageren binnen 4 uur op werkdagen en plannen een strategiegesprek in dat voor jou werkt.
            </p>
            <div className="contact-row">
              <div className="contact-icon">📧</div>
              <span style={{ fontWeight: 600, color: "#374151" }}>info@vedantix.nl</span>
            </div>
            <div className="contact-row">
              <div className="contact-icon">📱</div>
              <span style={{ fontWeight: 600, color: "#374151" }}>+31 6 26 21 99 89</span>
            </div>
            <div className="contact-row">
              <div className="contact-icon">🕐</div>
              <span style={{ fontWeight: 600, color: "#374151" }}>Ma–Vr: 09:00–18:00</span>
            </div>
            <div style={{ marginTop: 24 }}>
              <a href="/Planning" style={{ color: "#1a73e8", fontWeight: 700, textDecoration: "none", fontSize: "0.92rem" }}>
                📅 Liever direct een tijdslot kiezen? Plan hier →
              </a>
            </div>
            <div style={{ marginTop: 28, background: "#f7f9fc", borderRadius: 14, padding: "18px 20px", border: "1px solid #e5e7eb" }}>
              <p style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 8, color: "#0a1628" }}>In het gesprek bespreken we:</p>
              {["Jouw businessdoel en huidige situatie", "Wat haalbaar is in jouw budget en tijdlijn", "Of — en hoe — we je kunnen helpen"].map(i => (
                <p key={i} style={{ color: "#6b7280", fontSize: "0.83rem", marginBottom: 4, display: "flex", gap: 8 }}>
                  <span style={{ color: "#1a73e8", fontWeight: 700 }}>✓</span> {i}
                </p>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 <strong>Vedantix</strong> — Websites en AI-tools die groeien.</p>
        <div className="footer-links">
          <a href="/Privacy">Privacybeleid</a>
          <a href="/Voorwaarden">Algemene voorwaarden</a>
          <a href="/Planning">Afspraak plannen</a>
          <a href="/Templates">Templates</a>
          <a href="/Proces">Hoe het werkt</a>
        </div>
      </footer>
    </div>
  );
}