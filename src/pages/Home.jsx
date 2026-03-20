import { useState } from "react";
import NavBar from "../components/NavBar";

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
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#111827", background: "#fff", lineHeight: 1.6, overflowX: "hidden" }}>
      <NavBar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{margin:0;padding:0}

        /* BUTTONS (non-hero — dark bg context) */
        .btn-ghost{background:transparent;color:#111827;border:1.5px solid #d1d5db;padding:14px 28px;border-radius:10px;font-weight:600;font-size:0.92rem;text-decoration:none;display:inline-block;transition:all 0.25s;cursor:pointer}
        .btn-ghost:hover{border-color:#111827;background:#f9fafb}

        /* HERO */
        .hero{background:linear-gradient(150deg,#060c1a 0%,#0a1428 40%,#0d1f3c 70%,#0f1e38 100%);min-height:100vh;display:flex;align-items:center;padding:110px 5% 90px;position:relative;overflow:hidden}
        .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 65% 38%,rgba(59,130,246,0.13) 0%,transparent 58%),radial-gradient(ellipse at 20% 80%,rgba(99,102,241,0.07) 0%,transparent 50%);pointer-events:none}
        .hero-container{max-width:1280px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 480px;gap:80px;align-items:center}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:1.8px;padding:8px 18px;border-radius:100px;margin-bottom:32px}
        .hero-eyebrow::before{content:'';width:6px;height:6px;background:#22c55e;border-radius:50%;animation:pulse 2s infinite;flex-shrink:0}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        .hero h1{font-size:clamp(2.5rem,4.5vw,4rem);font-weight:900;line-height:1.12;color:#fff;margin-bottom:28px;letter-spacing:-2px}
        .hero h1 span{background:linear-gradient(125deg,#60a5fa 0%,#818cf8 50%,#a78bfa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-sub{font-size:1.05rem;color:rgba(255,255,255,0.55);line-height:1.75;margin-bottom:40px;max-width:460px;font-weight:400}
        .hero-checks{margin-bottom:44px;display:flex;flex-direction:column;gap:13px}
        .hero-check{display:flex;align-items:center;gap:12px;font-size:0.88rem;color:rgba(255,255,255,0.7);font-weight:600;letter-spacing:0.1px}
        .hero-check::before{content:'✓';color:#22c55e;font-weight:900;font-size:0.85rem;flex-shrink:0;background:rgba(34,197,94,0.12);width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;line-height:20px}
        .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:52px}
        .hero-social-proof{display:flex;align-items:center;gap:20px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.07)}
        .hero-sp-text{font-size:0.76rem;color:rgba(255,255,255,0.4);font-weight:500;line-height:1.5}
        .hero-sp-stars{color:#fbbf24;font-size:0.88rem;letter-spacing:1.5px;margin-bottom:4px}

        /* BUTTONS in hero */
        .btn-primary{background:#fff;color:#0f172a;padding:15px 30px;border-radius:10px;font-weight:700;font-size:0.92rem;text-decoration:none;display:inline-block;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);border:none;cursor:pointer;letter-spacing:-0.1px;box-shadow:0 4px 16px rgba(0,0,0,0.25)}
        .btn-primary:hover{background:#f1f5f9;transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,0,0,0.35)}
        .btn-wa{background:#25d366;color:#fff;padding:15px 30px;border-radius:10px;font-weight:700;font-size:0.92rem;text-decoration:none;display:inline-block;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,0.3)}
        .btn-wa:hover{background:#22c55e;transform:translateY(-2px);box-shadow:0 10px 32px rgba(37,211,102,0.4)}

        /* HERO MOCKUP */
        .hero-mockup-wrap{position:relative}
        .hero-mockup-wrap::before{content:'';position:absolute;top:-30px;left:-30px;right:-30px;bottom:-30px;background:radial-gradient(ellipse at center,rgba(99,102,241,0.18) 0%,rgba(59,130,246,0.06) 45%,transparent 70%);pointer-events:none;z-index:0;border-radius:40px}
        .hero-mockup{background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,0.07),0 32px 80px rgba(0,0,0,0.55),0 8px 24px rgba(0,0,0,0.3);animation:float 5s ease-in-out infinite;position:relative;z-index:1}
        @keyframes float{0%,100%{transform:translateY(0px)}50%{transform:translateY(-12px)}}
        .mockup-bar{background:#141a27;padding:11px 16px;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.04)}
        .mockup-dot{width:9px;height:9px;border-radius:50%}
        .mockup-url{flex:1;background:rgba(255,255,255,0.06);border-radius:5px;height:20px;margin:0 14px;display:flex;align-items:center;padding:0 10px}
        .mockup-url span{font-size:0.6rem;color:rgba(255,255,255,0.35);font-weight:500}

        /* TRUSTED BY */
        .trusted{background:#f9fafb;padding:28px 5%;border-bottom:1px solid #f3f4f6}
        .trusted-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:32px;justify-content:center;flex-wrap:wrap}
        .trusted-label{font-size:0.75rem;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;white-space:nowrap}
        .trusted-pill{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:8px 16px;font-size:0.78rem;font-weight:600;color:#6b7280}

        /* SECTION STYLES */
        .section-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#6366f1;margin-bottom:14px}
        .section-label.light{color:#818cf8}

        /* PROBLEM */
        .problem-section{padding:100px 5%;background:#fff}
        .problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;max-width:880px}
        .problem-card{padding:36px 32px;background:#fafafa;border:1px solid #f3f4f6;transition:all 0.25s}
        .problem-card:hover{background:#fff;box-shadow:0 8px 32px rgba(0,0,0,0.06);z-index:1;transform:translateY(-2px)}
        .problem-card:nth-child(1){border-radius:16px 0 0 0}
        .problem-card:nth-child(2){border-radius:0 16px 0 0}
        .problem-card:nth-child(3){border-radius:0 0 0 16px}
        .problem-card:nth-child(4){border-radius:0 0 16px 0}
        .problem-icon{font-size:1.6rem;margin-bottom:14px}
        .problem-card h3{font-size:0.95rem;font-weight:700;color:#111827;margin-bottom:8px}
        .problem-card p{font-size:0.85rem;color:#6b7280;line-height:1.65}

        /* SOLUTION */
        .solution-section{padding:100px 5%;background:linear-gradient(160deg,#0d1a3a,#111827)}
        .solution-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:860px}
        .solution-col{padding:36px;border-radius:16px}
        .solution-col.get{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)}
        .solution-col.skip{background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.15)}
        .solution-col h3{font-size:0.88rem;font-weight:700;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.07)}
        .solution-col.get h3{color:rgba(255,255,255,0.9)}
        .solution-col.skip h3{color:#a78bfa}
        .sol-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:14px;font-size:0.85rem;line-height:1.6}
        .sol-item:last-child{margin-bottom:0}
        .sol-check{flex-shrink:0;margin-top:2px;font-size:0.8rem}
        .solution-col.get .sol-item{color:rgba(255,255,255,0.65)}
        .solution-col.skip .sol-item{color:rgba(255,255,255,0.55)}

        /* RESULTS */
        .results-section{padding:100px 5%;background:#fff}
        .results-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;max-width:800px;border:1px solid #f3f4f6;border-radius:20px;overflow:hidden}
        .result-item{padding:40px 32px;text-align:center;border-right:1px solid #f3f4f6}
        .result-item:last-child{border-right:none}
        .result-num{font-size:2.4rem;font-weight:900;color:#111827;letter-spacing:-1px;margin-bottom:4px;line-height:1}
        .result-label{font-size:0.8rem;color:#9ca3af;font-weight:500}

        /* TESTIMONIALS */
        .testimonials-section{padding:80px 5%;background:#f9fafb}
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:1000px;margin:0 auto}
        .testimonial-card{background:#fff;border-radius:14px;padding:28px;border:1px solid #f3f4f6;transition:box-shadow 0.25s}
        .testimonial-card:hover{box-shadow:0 8px 32px rgba(0,0,0,0.07)}
        .t-stars{color:#fbbf24;font-size:0.85rem;margin-bottom:12px;letter-spacing:1px}
        .t-quote{font-size:0.88rem;color:#374151;line-height:1.65;margin-bottom:16px;font-style:italic}
        .t-author{display:flex;align-items:center;gap:10px}
        .t-avatar{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fff;flex-shrink:0}
        .t-name{font-size:0.8rem;font-weight:700;color:#111827}
        .t-role{font-size:0.73rem;color:#9ca3af}

        /* PRICING */
        .pricing-section{padding:110px 5%;background:#fff}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1020px;margin:0 auto}
        .pricing-card{border-radius:20px;padding:44px 36px;border:1.5px solid #f3f4f6;transition:all 0.3s;position:relative;background:#fff}
        .pricing-card:hover{border-color:#e0e7ff;box-shadow:0 20px 60px rgba(99,102,241,0.08);transform:translateY(-3px)}
        .pricing-card.featured{border-color:#6366f1;background:linear-gradient(160deg,#fafbff,#f0f1ff);box-shadow:0 24px 80px rgba(99,102,241,0.14)}
        .pricing-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:5px 20px;border-radius:100px;font-weight:700;font-size:0.68rem;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;box-shadow:0 4px 12px rgba(99,102,241,0.3)}
        .p-tier{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;margin-bottom:8px}
        .pricing-card.featured .p-tier{color:#6366f1}
        .p-name{font-size:1.4rem;font-weight:900;color:#111827;letter-spacing:-0.5px;margin-bottom:6px}
        .p-sub{font-size:0.8rem;color:#9ca3af;margin-bottom:24px;line-height:1.5;font-weight:500}
        .p-price{font-size:3rem;font-weight:900;color:#111827;letter-spacing:-2px;line-height:1;margin-bottom:4px}
        .p-price sup{font-size:1.1rem;font-weight:700;vertical-align:super;letter-spacing:0}
        .p-price span{font-size:1rem;font-weight:600;color:#9ca3af;letter-spacing:0}
        .p-setup{font-size:0.75rem;color:#9ca3af;margin-bottom:28px;font-weight:500}
        .p-divider{height:1px;background:#f3f4f6;margin-bottom:28px}
        .pricing-card.featured .p-divider{background:#e0e7ff}
        .p-features{list-style:none;padding:0;display:flex;flex-direction:column;gap:11px;margin-bottom:32px}
        .p-features li{font-size:0.83rem;color:#4b5563;display:flex;gap:9px;align-items:flex-start;line-height:1.5}
        .p-features li::before{content:'✓';color:#6366f1;font-weight:900;flex-shrink:0;margin-top:1px;font-size:0.8rem}
        .p-note{font-size:0.75rem;color:#9ca3af;margin-bottom:20px;font-style:italic;line-height:1.5;min-height:32px}
        .pricing-card.featured .p-features li{color:#374151}
        .p-cta{display:block;text-align:center;padding:13px;border-radius:10px;font-weight:700;font-size:0.88rem;text-decoration:none;transition:all 0.25s}
        .p-cta.default{background:#f9fafb;color:#374151;border:1.5px solid #e5e7eb}
        .p-cta.default:hover{background:#f3f4f6;border-color:#d1d5db}
        .p-cta.featured{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 4px 16px rgba(99,102,241,0.25)}
        .p-cta.featured:hover{box-shadow:0 8px 28px rgba(99,102,241,0.35);transform:translateY(-1px)}

        /* TRUST STRIP */
        .trust-strip{background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;padding:24px 5%}
        .trust-items{max-width:900px;margin:0 auto;display:flex;justify-content:center;gap:40px;flex-wrap:wrap}
        .trust-item{display:flex;align-items:center;gap:8px;font-size:0.82rem;font-weight:600;color:#374151}
        .trust-icon{font-size:0.95rem}

        /* ROI */
        .roi-section{padding:100px 5%;background:#fff}
        .roi-box{background:linear-gradient(160deg,#0d1a3a,#111827);border-radius:24px;padding:64px;max-width:800px;margin:0 auto;text-align:center}
        .roi-vs{display:grid;grid-template-columns:1fr auto 1fr;gap:32px;align-items:center;margin:40px 0}
        .roi-col{text-align:center}
        .roi-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.4);margin-bottom:12px}
        .roi-num{font-size:2.8rem;font-weight:900;letter-spacing:-2px;line-height:1}
        .roi-arrow{font-size:1.6rem;color:rgba(255,255,255,0.25)}
        .roi-conclusion{font-size:0.88rem;color:rgba(255,255,255,0.5);line-height:1.7;max-width:480px;margin:0 auto}

        /* WHY */
        .why-section{padding:100px 5%;background:#f9fafb}
        .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:860px}
        .why-col{padding:40px;border-radius:18px}
        .why-col.old{background:#fff;border:1px solid #f3f4f6}
        .why-col.new{background:linear-gradient(135deg,#eef2ff,#f5f3ff);border:1px solid #e0e7ff}
        .why-col h3{font-size:0.88rem;font-weight:700;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid #f3f4f6}
        .why-col.old h3{color:#9ca3af}
        .why-col.new h3{color:#6366f1;border-color:#e0e7ff}
        .why-li{display:flex;gap:9px;align-items:flex-start;margin-bottom:12px;font-size:0.83rem;line-height:1.6}
        .why-li:last-child{margin-bottom:0}
        .why-col.old .why-li{color:#9ca3af}
        .why-col.new .why-li{color:#374151}
        .why-col.old .why-li::before{content:'×';color:#fca5a5;font-weight:700;flex-shrink:0}
        .why-col.new .why-li::before{content:'✓';color:#6366f1;font-weight:700;flex-shrink:0}

        /* HOW */
        .how-section{padding:100px 5%;background:#fff}
        .how-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;max-width:1000px;margin:56px auto 0;position:relative}
        .how-steps::before{content:'';position:absolute;top:24px;left:calc(12.5% + 20px);right:calc(12.5% + 20px);height:1px;background:linear-gradient(90deg,#e0e7ff,#c7d2fe,#e0e7ff);z-index:0}
        .how-step{text-align:center;padding:0 20px;position:relative;z-index:1}
        .step-num{width:48px;height:48px;background:#fff;border:2px solid #e0e7ff;border-radius:50%;font-size:0.95rem;font-weight:900;color:#6366f1;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 4px 12px rgba(99,102,241,0.12)}
        .how-step h3{font-size:0.88rem;font-weight:700;color:#111827;margin-bottom:8px}
        .how-step p{font-size:0.78rem;color:#9ca3af;line-height:1.6}

        /* URGENCY */
        .urgency-section{padding:60px 5%;background:#fff}
        .urgency-inner{max-width:740px;margin:0 auto}
        .urgency-box{background:#111827;border-radius:16px;padding:40px 48px;text-align:center;margin-bottom:20px}
        .urgency-box h3{color:#fff;font-size:1.2rem;font-weight:800;margin-bottom:10px;letter-spacing:-0.3px}
        .urgency-box p{color:rgba(255,255,255,0.55);font-size:0.85rem;line-height:1.65;max-width:520px;margin:0 auto}
        .guarantee-box{background:#f0fdf4;border-radius:14px;padding:24px 32px;display:flex;gap:16px;align-items:flex-start;border:1px solid #bbf7d0}
        .guarantee-icon{font-size:1.4rem;flex-shrink:0;margin-top:2px}
        .guarantee-box strong{display:block;color:#166534;font-size:0.88rem;font-weight:700;margin-bottom:4px}
        .guarantee-box p{color:#166534;font-size:0.82rem;margin:0;line-height:1.6;opacity:0.8}

        /* CTA */
        .cta-section{padding:120px 5%;background:linear-gradient(160deg,#0d1a3a 0%,#111827 100%);position:relative;overflow:hidden;text-align:center}
        .cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(99,102,241,0.1) 0%,transparent 65%);pointer-events:none}
        .cta-section h2{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;letter-spacing:-1px;margin-bottom:16px;position:relative}
        .cta-section p{font-size:0.95rem;color:rgba(255,255,255,0.55);max-width:540px;margin:0 auto 48px;line-height:1.7;position:relative}
        .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative}
        .cta-phone{margin-top:48px;color:rgba(255,255,255,0.35);font-size:0.82rem;position:relative}
        .cta-phone strong{color:#60a5fa;display:block;font-size:1.05rem;margin-top:8px;font-weight:700}

        /* FOOTER */
        footer{background:#0a0f1e;color:rgba(255,255,255,0.35);padding:40px 5%;text-align:center;font-size:0.8rem;border-top:1px solid rgba(255,255,255,0.05)}
        footer strong{color:rgba(255,255,255,0.7)}
        footer a{color:rgba(255,255,255,0.35);text-decoration:none;margin:0 14px;transition:color 0.2s}
        footer a:hover{color:#60a5fa}

        /* RESPONSIVE */
        @media(max-width:1024px){
          .hero-container{grid-template-columns:1fr;gap:60px}
          .hero-mockup-wrap{max-width:480px;margin:0 auto}
          .pricing-grid{grid-template-columns:1fr;max-width:460px}
          .testimonials-grid{grid-template-columns:1fr}
          .solution-grid{grid-template-columns:1fr;max-width:500px}
          .why-grid{grid-template-columns:1fr;max-width:500px}
          .results-row{grid-template-columns:1fr 1fr}
          .results-row .result-item:nth-child(2){border-right:none}
          .results-row .result-item:nth-child(3){border-right:none;border-top:1px solid #f3f4f6;grid-column:1/-1}
          .how-steps{grid-template-columns:1fr 1fr;gap:32px}
          .how-steps::before{display:none}
          .roi-vs{grid-template-columns:1fr;gap:20px}
          .roi-arrow{transform:rotate(90deg);display:block}
          .roi-box{padding:40px 24px}
        }
        @media(max-width:768px){
          .hero{padding:80px 5% 60px;min-height:auto}
          .hero h1{font-size:2.2rem}
          .hero-ctas{flex-direction:column}
          .hero-ctas a{width:100%;text-align:center}
          .btn-primary,.btn-ghost,.btn-wa{padding:13px 20px;font-size:0.88rem}
          .problem-grid{grid-template-columns:1fr;gap:0}
          .problem-card:nth-child(n){border-radius:0}
          .problem-card:first-child{border-radius:16px 16px 0 0}
          .problem-card:last-child{border-radius:0 0 16px 16px}
          .pricing-section{padding:70px 5%}
          .pricing-card{padding:32px 24px}
          .p-price{font-size:2.4rem}
          .testimonials-grid{grid-template-columns:1fr}
          .how-steps{grid-template-columns:1fr}
          .trust-items{gap:20px}
          .urgency-box{padding:28px 20px}
          .cta-section{padding:80px 5%}
          .results-row{grid-template-columns:1fr;border-radius:16px}
          .result-item{border-right:none;border-bottom:1px solid #f3f4f6;padding:28px}
          .result-item:last-child{border-bottom:none}
        }
        @media(max-width:480px){
          .hero h1{font-size:1.8rem;letter-spacing:-0.8px}
          .hero-sub{font-size:0.9rem}
          .hero-social-proof{flex-direction:column;align-items:flex-start;gap:8px}
          .problem-section,.solution-section,.results-section,.testimonials-section,.pricing-section,.roi-section,.why-section,.how-section,.urgency-section{padding:60px 5%}
          .trusted-inner{gap:12px}
          .roi-box{padding:32px 16px;border-radius:16px}
          .roi-num{font-size:2.2rem}
          .guarantee-box{flex-direction:column;gap:10px;padding:20px}
          .cta-section h2{font-size:1.8rem}
        }
      `}</style>

      {/* ─── 1. HERO ─── */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">Voor lokale bedrijven</div>
            <h1>
              Website die klanten<br />
              oplevert — <span>live in 48 uur</span>
            </h1>
            <p className="hero-sub">
              Wij bouwen, lanceren en onderhouden jouw website. Jij focust op je bedrijf. Geen gedoe, geen technische kennis nodig.
            </p>
            <div className="hero-checks">
              <div className="hero-check">Online in 48 uur — wij regelen alles</div>
              <div className="hero-check">Hosting, domein en SSL inbegrepen</div>
              <div className="hero-check">Maandelijks opzegbaar, geen risico</div>
            </div>
            <div className="hero-ctas">
              <a href="#pricing" className="btn-primary">Start je website →</a>
              <a href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20ben%20geinteresseerd%20in%20een%20website." target="_blank" rel="noreferrer" className="btn-wa">💬 Plan gratis gesprek</a>
            </div>
            <div className="hero-social-proof">
              <div>
                <div className="hero-sp-stars">★★★★★</div>
                <div className="hero-sp-text">Beoordeeld met 5.0 door lokale ondernemers</div>
              </div>
              <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)" }} />
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>48 uur</div>
                <div className="hero-sp-text">Gemiddelde levertijd</div>
              </div>
              <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)" }} />
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>7 dagen</div>
                <div className="hero-sp-text">Geld-terug garantie</div>
              </div>
            </div>
          </div>

          <div className="hero-mockup-wrap">
            <div className="hero-mockup">
              <div className="mockup-bar">
                <div className="mockup-dot" style={{ background: "#ff5f57" }} />
                <div className="mockup-dot" style={{ background: "#febc2e" }} />
                <div className="mockup-dot" style={{ background: "#28c840" }} />
                <div className="mockup-url"><span>barbershop-amsterdam.nl</span></div>
              </div>
              <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2146)", padding: "28px 24px", color: "#fff", textAlign: "center" }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Premium Barbershop</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: 6, letterSpacing: -0.5 }}>Barbershop Amsterdam</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Klassieke kapsels & scheerbeurt</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>⭐ 4.9 (87 reviews)</span>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>👥 500+ klanten</span>
                </div>
              </div>
              <div style={{ padding: "20px 20px", background: "#f9fafb" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[["✂️","Klassieke Kapsel","€18"],["🧔","Baardverzorging","€12"],["💈","Fade & Design","€22"]].map(([ic,name,price]) => (
                    <div key={name} style={{ background: "#fff", padding: "10px 13px", borderRadius: 10, display: "flex", gap: 10, alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #f3f4f6" }}>
                      <span style={{ fontSize: "1rem" }}>{ic}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#111827" }}>{name}</div>
                      </div>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6366f1" }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "14px 20px", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, background: "#111827", color: "#fff", padding: "9px 10px", borderRadius: 9, border: "none", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer" }}>📅 Afspraak maken</button>
                  <button style={{ flex: 1, background: "#25d366", color: "#fff", padding: "9px 10px", borderRadius: 9, border: "none", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer" }}>💬 WhatsApp</button>
                </div>
              </div>
            </div>
            <p style={{ marginTop: 16, fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textAlign: "center", fontWeight: 500 }}>Jij kiest een stijl • Wij regelen de rest</p>
          </div>
        </div>
      </section>

      {/* ─── TRUSTED BY ─── */}
      <div className="trusted">
        <div className="trusted-inner">
          <span className="trusted-label">Vertrouwd door</span>
          {["Kappers","Restaurants","Klusbedrijven","Schoonheidssalons","Fotografen","ZZP'ers"].map(t => (
            <span key={t} className="trusted-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* ─── 2. PROBLEM ─── */}
      <section className="problem-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: 56 }}>
            <div className="section-label">Het probleem</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 14 }}>
              Je verliest klanten zonder dat je het doorhebt
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7 }}>
              Elke dag zonder goede website kost je klanten. Je concurrent pakt ze.
            </p>
          </div>
          <div className="problem-grid">
            {[
              ["🔍","Mensen vinden je niet","Ze zoeken online naar jouw bedrijf maar jij verschijnt niet. Je concurrent wel."],
              ["📱","Website ziet er verouderd uit","Of je hebt helemaal geen website. Klanten denken dat je niet meer actief bent."],
              ["📞","Geen manier om te boeken","Klanten kunnen niet bellen, reserveren of een bericht sturen. Ze geven het op."],
              ["⚖️","Minder vertrouwen","Geen website = minder geloofwaardig. Klanten kiezen liever een concurrent."],
            ].map(([ic, h, p]) => (
              <div key={h} className="problem-card">
                <div className="problem-icon">{ic}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. SOLUTION ─── */}
      <section className="solution-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: 56 }}>
            <div className="section-label light">De oplossing</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 14 }}>
              Wij zorgen dat jouw website klanten oplevert
            </h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              Website + hosting + updates + onderhoud. Alles in één. Nul zorgen.
            </p>
          </div>
          <div className="solution-grid">
            <div className="solution-col get">
              <h3>✓ Wat je krijgt</h3>
              {["Website live in 48 uur","100% mobielvriendelijk","Hosting, domein, SSL inbegrepen","Maandelijkse updates & onderhoud","Google vindt je makkelijker","Alles gericht op meer klanten"].map(i => (
                <div key={i} className="sol-item"><span className="sol-check">✓</span><span>{i}</span></div>
              ))}
            </div>
            <div className="solution-col skip">
              <h3>👍 Wat je niet meer doet</h3>
              {["Nooit meer naar developers bellen","Geen technische problemen meer","Geen gedoe met hosting","Geen verouderde website meer","Geen klanten meer verliezen","Pure focus op je bedrijf"].map(i => (
                <div key={i} className="sol-item"><span className="sol-check">→</span><span>{i}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. RESULTS ─── */}
      <section className="results-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: 56 }}>
            <div className="section-label">Dit levert het op</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 14 }}>
              Stop met klanten verliezen
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7 }}>
              1–2 extra klanten per maand betaalt je hele website. Daarna is het puur winst.
            </p>
          </div>
          <div className="results-row">
            {[
              ["+Afspraken","Direct geboekt via jouw site"],
              ["+Aanvragen","Via contactformulier"],
              ["0 Gedoe","Wij regelen alles"],
            ].map(([n, l]) => (
              <div key={n} className="result-item">
                <div className="result-num">{n}</div>
                <div className="result-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS ─── */}
      <section className="testimonials-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
            <div className="section-label" style={{ textAlign: "center" }}>Wat klanten zeggen</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.5px" }}>
              Ondernemers zoals jij gingen je voor
            </h2>
          </div>
          <div className="testimonials-grid">
            {[
              { stars: "★★★★★", quote: "Binnen 2 dagen had ik een website die er echt professioneel uitziet. Sindsdien krijg ik elke week nieuwe klanten via de site.", name: "Sander K.", role: "Kapper, Amsterdam", color: "#6366f1" },
              { stars: "★★★★★", quote: "Ik had verwacht dat het ingewikkeld zou zijn, maar Vedantix regelt alles. Ik hoef er zelf niks aan te doen.", name: "Fatima O.", role: "Schoonheidssalon, Rotterdam", color: "#8b5cf6" },
              { stars: "★★★★★", quote: "Mijn oude website leverde niets op. Nu krijg ik gemiddeld 3-4 aanvragen per week via het contactformulier.", name: "Tom V.", role: "Klusbedrijf, Utrecht", color: "#6366f1" },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="t-stars">{t.stars}</div>
                <p className="t-quote">"{t.quote}"</p>
                <div className="t-author">
                  <div className="t-avatar" style={{ background: t.color }}>{t.name[0]}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section id="pricing" className="pricing-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}>
            <div className="section-label" style={{ textAlign: "center" }}>Tarieven</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.8px", marginBottom: 14 }}>
              Kies jouw pakket
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7 }}>
              Geen verborgen kosten. Alles inbegrepen. Opzeggen wanneer je wilt.
            </p>
          </div>
          <div className="pricing-grid">
            {/* STARTER */}
            <div className="pricing-card">
              <div className="p-tier">Starter</div>
              <div className="p-name">Online Aanwezig</div>
              <div className="p-sub">Voor ondernemers die gewoon online willen staan</div>
              <div className="p-price"><sup>€</sup>99<span>/m</span></div>
              <div className="p-setup">+ €500 eenmalige setup</div>
              <div className="p-divider" />
              <ul className="p-features">
                <li>1–2 pagina website</li>
                <li>Mobielvriendelijk design</li>
                <li>Contactformulier (leads naar jouw mail)</li>
                <li>Hosting + domein koppeling</li>
                <li>SSL beveiliging</li>
                <li>Basis SEO setup</li>
                <li>Support binnen 48 uur</li>
              </ul>
              <p className="p-note">Perfect om snel online te zijn en gevonden te worden</p>
              <a href="#cta" className="p-cta default">Start met Starter →</a>
            </div>

            {/* GROWTH - FEATURED */}
            <div className="pricing-card featured">
              <div className="pricing-badge">Meest gekozen</div>
              <div className="p-tier">Growth</div>
              <div className="p-name">Klanten Winnen</div>
              <div className="p-sub">Voor bedrijven die actief klanten willen binnenhalen</div>
              <div className="p-price"><sup>€</sup>149<span>/m</span></div>
              <div className="p-setup">+ €750 eenmalige setup</div>
              <div className="p-divider" />
              <ul className="p-features">
                <li>Tot 5 pagina's</li>
                <li>Alles van Starter</li>
                <li>Google Maps integratie</li>
                <li>Conversiegerichte opbouw</li>
                <li>SEO basisoptimalisatie</li>
                <li>Maandelijkse performance check</li>
                <li>Support binnen 24 uur</li>
                <li>Kleine updates inbegrepen</li>
              </ul>
              <p className="p-note" style={{ color: "#6366f1" }}>Voor bedrijven die hun website echt laten werken</p>
              <a href="#cta" className="p-cta featured">Start met Growth →</a>
            </div>

            {/* PRO */}
            <div className="pricing-card">
              <div className="p-tier">Pro</div>
              <div className="p-name">Serieus Groeien</div>
              <div className="p-sub">Voor bedrijven die serieus willen groeien</div>
              <div className="p-price"><sup>€</sup>249<span>/m</span></div>
              <div className="p-setup">+ €1000 eenmalige setup</div>
              <div className="p-divider" />
              <ul className="p-features">
                <li>Tot 10 pagina's</li>
                <li>Custom design op maat</li>
                <li>Geavanceerde functies (boekingen / formulieren)</li>
                <li>Alles van Growth</li>
                <li>Volledige SEO optimalisatie</li>
                <li>Priority support (binnen 12 uur)</li>
                <li>Snelle aanpassingen (zelfde dag mogelijk)</li>
              </ul>
              <p className="p-note">Maximale groei, minimale zorgen</p>
              <a href="#cta" className="p-cta default">Start met Pro →</a>
            </div>
          </div>

          {/* Updates clarification */}
          <div style={{ maxWidth: 860, margin: "32px auto 0", padding: "0 8px" }}>
            <details style={{ cursor: "pointer" }}>
              <summary style={{ fontSize: "0.8rem", fontWeight: 600, color: "#9ca3af", padding: "10px 0", userSelect: "none", listStyle: "none" }}>
                💡 Wat valt onder kleine updates en wijzigingen?
              </summary>
              <div style={{ paddingTop: 8, paddingBottom: 12, fontSize: "0.82rem", color: "#9ca3af", lineHeight: 1.7 }}>
                Teksten aanpassen, foto's vervangen, kleine layout-wijzigingen, contactgegevens updaten.
                Grote wijzigingen (nieuwe pagina's, geavanceerde functies) worden vooraf besproken.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <div className="trust-strip">
        <div className="trust-items">
          {[["✔","Geen verborgen kosten"],["✔","Maandelijks opzegbaar"],["✔","48 uur levertijd"],["✔","7 dagen geld-terug"],["✔","Alles inbegrepen"]].map(([ic,t]) => (
            <div key={t} className="trust-item"><span className="trust-icon">{ic}</span><span>{t}</span></div>
          ))}
        </div>
      </div>

      {/* ─── 7. ROI ─── */}
      <section className="roi-section">
        <div className="roi-box">
          <div className="section-label light" style={{ textAlign: "center" }}>Jouw ROI</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: 8, marginTop: 8 }}>
            Dit is je investering vs. opbrengst
          </h2>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", marginBottom: 0 }}>
            Je hebt maar 1–2 extra klanten per maand nodig om je website terug te verdienen.
          </p>
          <div className="roi-vs">
            <div className="roi-col">
              <div className="roi-label">Maandelijkse investering</div>
              <div className="roi-num" style={{ color: "#fff" }}>€149<span style={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>/m</span></div>
            </div>
            <div className="roi-arrow">→</div>
            <div className="roi-col">
              <div className="roi-label">Potentiële extra omzet</div>
              <div className="roi-num" style={{ color: "#22c55e" }}>€500–2000+<span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>/m</span></div>
            </div>
          </div>
          <p className="roi-conclusion">Website betaalt zich terug in maand 1. Daarna is het puur winst.</p>
        </div>
      </section>

      {/* ─── 8. WHY SUBSCRIPTION ─── */}
      <section className="why-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: 56 }}>
            <div className="section-label">Waarom abonnement</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 14 }}>
              Waarom een abonnement beter is
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7 }}>
              Geen grote upfront kosten. Alles inbegrepen. Eenvoudig opzeggen.
            </p>
          </div>
          <div className="why-grid">
            <div className="why-col old">
              <h3>Eenmalig betalen (oud model)</h3>
              {["€3000+ upfront betalen","Hosting zelf zoeken & betalen","Updates betalen per update","Problemen? €500+ per reparatie","Jij bent volledig verantwoordelijk"].map(i => (
                <div key={i} className="why-li"><span>{i}</span></div>
              ))}
            </div>
            <div className="why-col new">
              <h3>Abonnement bij Vedantix</h3>
              {["€99–249/m, alles inbegrepen","Hosting, domein, SSL erbij","Automatische updates & optimalisaties","Problemen? Wij fixen gratis","Jij focust op je bedrijf"].map(i => (
                <div key={i} className="why-li"><span>{i}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. HOW IT WORKS ─── */}
      <section id="how" className="how-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <div className="section-label" style={{ textAlign: "center" }}>Werkwijze</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "#111827", letterSpacing: "-0.8px", marginBottom: 14 }}>
              Hoe het werkt
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7 }}>
              Vier eenvoudige stappen naar jouw nieuwe website.
            </p>
          </div>
          <div className="how-steps">
            {[
              ["1","Je belt ons","Korte kennismaking. Jij vertelt wat je bedrijf is, wij maken een plan."],
              ["2","Wij bouwen","48 uur later: website klaar, getest, beveiligd, snel."],
              ["3","Je gaat live","Website online. Klanten vinden en bellen jou."],
              ["4","Wij zorgen ervoor","Updates, onderhoud, optimalisaties — alles door ons."],
            ].map(([n, h, p]) => (
              <div key={n} className="how-step">
                <div className="step-num">{n}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. URGENCY + GUARANTEE ─── */}
      <section className="urgency-section">
        <div className="urgency-inner">
          <div className="urgency-box">
            <h3>⚡ We nemen max 5 klanten per week aan</h3>
            <p>We geven elk project volle aandacht. Snelheid + kwaliteit. Als je nu belt, krijg jij een plek.</p>
          </div>
          <div className="guarantee-box">
            <div className="guarantee-icon">💰</div>
            <div>
              <strong>7-daags geld-terug garantie</strong>
              <p>Niet tevreden? We geven je geld terug, geen vragen gesteld.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL CTA ─── */}
      <section id="cta" className="cta-section">
        <h2>Klaar om meer klanten te krijgen?</h2>
        <p>Geen gedoe. Geen verplichtingen. Gewoon een gesprek over jouw website.</p>
        <div className="cta-btns">
          <a href="#pricing" className="btn-primary">Start je website →</a>
          <a href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20ben%20geinteresseerd%20in%20een%20website." target="_blank" rel="noreferrer" className="btn-wa">💬 Plan gratis gesprek</a>
        </div>
        <div className="cta-phone">
          Liever direct bellen?
          <strong>+31 6 26 21 99 89</strong>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <p>© 2026 <strong>Vedantix</strong> — Website + hosting + onderhoud + support. Start €99/maand.</p>
        <div style={{ marginTop: 14 }}>
          <a href="#pricing">Prijzen</a>
          <a href="/Privacy">Privacy</a>
          <a href="/Voorwaarden">Voorwaarden</a>
        </div>
      </footer>
    </div>
  );
}