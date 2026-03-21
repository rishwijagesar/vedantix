import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import BigFooter from "../components/BigFooter";

const HOME_STYLES = `
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{margin:0;padding:0}

  .home-page{font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111827;background:#fff;line-height:1.6;overflow-x:hidden}
  .anchor-section{scroll-margin-top:100px}

  .btn-ghost{background:transparent;color:#111827;border:1.5px solid #d1d5db;padding:14px 28px;border-radius:10px;font-weight:600;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .25s;cursor:pointer}
  .btn-ghost:hover{border-color:#111827;background:#f9fafb}

  .hero{background:linear-gradient(150deg,#060c1a 0%,#0a1428 40%,#0d1f3c 70%,#0f1e38 100%);min-height:100vh;display:flex;align-items:center;padding:140px 5% 100px;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 65% 38%,rgba(59,130,246,.13) 0%,transparent 58%),radial-gradient(ellipse at 20% 80%,rgba(99,102,241,.07) 0%,transparent 50%);pointer-events:none}
  .hero-container{max-width:1280px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 480px;gap:80px;align-items:center}
  .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:1.8px;padding:8px 18px;border-radius:100px;margin-bottom:32px}
  .hero-eyebrow::before{content:'';width:6px;height:6px;background:#22c55e;border-radius:50%;animation:pulse 2s infinite;flex-shrink:0}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  .hero h1{font-size:clamp(2.5rem,4.5vw,4rem);font-weight:900;line-height:1.12;color:#fff;margin-bottom:28px;letter-spacing:-2px}
  .hero h1 span{background:linear-gradient(125deg,#60a5fa 0%,#818cf8 50%,#a78bfa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .hero-sub{font-size:1.05rem;color:rgba(255,255,255,.55);line-height:1.75;margin-bottom:40px;max-width:460px;font-weight:400}
  .hero-checks{margin-bottom:44px;display:flex;flex-direction:column;gap:13px}
  .hero-check{display:flex;align-items:center;gap:12px;font-size:.88rem;color:rgba(255,255,255,.7);font-weight:600;letter-spacing:.1px}
  .hero-check::before{content:'✓';color:#22c55e;font-weight:900;font-size:.85rem;flex-shrink:0;background:rgba(34,197,94,.12);width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;line-height:20px}
  .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:52px}
  .hero-social-proof{display:flex;align-items:center;gap:20px;padding-top:32px;border-top:1px solid rgba(255,255,255,.07)}
  .hero-sp-text{font-size:.76rem;color:rgba(255,255,255,.4);font-weight:500;line-height:1.5}
  .hero-sp-stars{color:#fbbf24;font-size:.88rem;letter-spacing:1.5px;margin-bottom:4px}

  .btn-primary{background:#fff;color:#0f172a;padding:15px 30px;border-radius:10px;font-weight:700;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .25s cubic-bezier(.4,0,.2,1);border:none;cursor:pointer;letter-spacing:-.1px;box-shadow:0 4px 16px rgba(0,0,0,.25)}
  .btn-primary:hover{background:#f1f5f9;transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,0,0,.35)}
  .btn-wa{background:#25d366;color:#fff;padding:15px 30px;border-radius:10px;font-weight:700;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .25s cubic-bezier(.4,0,.2,1);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.3)}
  .btn-wa:hover{background:#22c55e;transform:translateY(-2px);box-shadow:0 10px 32px rgba(37,211,102,.4)}

  .hero-mockup-wrap{position:relative}
  .hero-mockup-wrap::before{content:'';position:absolute;top:-30px;left:-30px;right:-30px;bottom:-30px;background:radial-gradient(ellipse at center,rgba(99,102,241,.18) 0%,rgba(59,130,246,.06) 45%,transparent 70%);pointer-events:none;z-index:0;border-radius:40px}
  .hero-mockup{background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.07),0 32px 80px rgba(0,0,0,.55),0 8px 24px rgba(0,0,0,.3);animation:float 5s ease-in-out infinite;position:relative;z-index:1}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  .mockup-bar{background:#141a27;padding:11px 16px;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,.04)}
  .mockup-dot{width:9px;height:9px;border-radius:50%}
  .mockup-url{flex:1;background:rgba(255,255,255,.06);border-radius:5px;height:20px;margin:0 14px;display:flex;align-items:center;padding:0 10px}
  .mockup-url span{font-size:.6rem;color:rgba(255,255,255,.35);font-weight:500}

  .section-wrap{max-width:1100px;margin:0 auto;width:100%}
  .section-header{max-width:580px;margin-bottom:56px}
  .section-header.centered{margin-left:auto;margin-right:auto;text-align:center}
  .section-h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#111827;letter-spacing:-.8px;line-height:1.15;margin-bottom:14px}
  .section-h2.light{color:#fff}
  .section-p{font-size:.95rem;color:#6b7280;line-height:1.7}
  .section-p.light{color:rgba(255,255,255,.5)}

  .trusted{background:#f9fafb;padding:26px 5%;border-bottom:1px solid #f3f4f6}
  .trusted-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
  .trusted-label{font-size:.72rem;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;margin-right:8px}
  .trusted-pill{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:7px 14px;font-size:.78rem;font-weight:600;color:#6b7280}

  .section-label{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#6366f1;margin-bottom:14px}
  .section-label.light{color:#818cf8}

  .problem-section{padding:100px 5%;background:#fff}
  .problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px}
  .problem-card{padding:36px 32px;background:#fafafa;border:1px solid #f3f4f6;transition:all .25s}
  .problem-card:hover{background:#fff;box-shadow:0 8px 32px rgba(0,0,0,.06);z-index:1;transform:translateY(-2px)}
  .problem-card:nth-child(1){border-radius:16px 0 0 0}
  .problem-card:nth-child(2){border-radius:0 16px 0 0}
  .problem-card:nth-child(3){border-radius:0 0 0 16px}
  .problem-card:nth-child(4){border-radius:0 0 16px 0}
  .problem-icon{font-size:1.6rem;margin-bottom:14px}
  .problem-card h3{font-size:.95rem;font-weight:700;color:#111827;margin-bottom:8px}
  .problem-card p{font-size:.85rem;color:#6b7280;line-height:1.65}

  .solution-section{padding:100px 5%;background:linear-gradient(160deg,#0d1a3a,#111827)}
  .solution-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .solution-col{padding:36px;border-radius:16px}
  .solution-col.get{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
  .solution-col.skip{background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.15)}
  .solution-col h3{font-size:.88rem;font-weight:700;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.07)}
  .solution-col.get h3{color:rgba(255,255,255,.9)}
  .solution-col.skip h3{color:#a78bfa}
  .sol-item{display:flex;gap:10px;align-items:flex-start;margin-bottom:14px;font-size:.85rem;line-height:1.6}
  .sol-item:last-child{margin-bottom:0}
  .sol-check{flex-shrink:0;margin-top:2px;font-size:.8rem}
  .solution-col.get .sol-item{color:rgba(255,255,255,.65)}
  .solution-col.skip .sol-item{color:rgba(255,255,255,.55)}

  .results-section{padding:100px 5%;background:#fff}
  .results-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid #f3f4f6;border-radius:20px;overflow:hidden}
  .result-item{padding:40px 32px;text-align:center;border-right:1px solid #f3f4f6}
  .result-item:last-child{border-right:none}
  .result-num{font-size:2.4rem;font-weight:900;color:#111827;letter-spacing:-1px;margin-bottom:4px;line-height:1}
  .result-label{font-size:.8rem;color:#9ca3af;font-weight:500}

  .testimonials-section{padding:100px 5%;background:#f9fafb}
  .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .testimonial-card{background:#fff;border-radius:14px;padding:28px;border:1px solid #f3f4f6;transition:box-shadow .25s}
  .testimonial-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.07)}
  .t-stars{color:#fbbf24;font-size:.85rem;margin-bottom:12px;letter-spacing:1px}
  .t-quote{font-size:.88rem;color:#374151;line-height:1.65;margin-bottom:16px;font-style:italic}
  .t-author{display:flex;align-items:center;gap:10px}
  .t-avatar{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;color:#fff;flex-shrink:0}
  .t-name{font-size:.8rem;font-weight:700;color:#111827}
  .t-role{font-size:.73rem;color:#9ca3af}

  .pricing-section{padding:100px 5%;background:#fff}
  .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .pricing-card{border-radius:20px;padding:44px 36px;border:1.5px solid #f3f4f6;transition:all .3s;position:relative;background:#fff}
  .pricing-card:hover{border-color:#e0e7ff;box-shadow:0 20px 60px rgba(99,102,241,.08);transform:translateY(-3px)}
  .pricing-card.featured{border-color:#6366f1;background:linear-gradient(160deg,#fafbff,#f0f1ff);box-shadow:0 24px 80px rgba(99,102,241,.14)}
  .pricing-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:5px 20px;border-radius:100px;font-weight:700;font-size:.68rem;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;box-shadow:0 4px 12px rgba(99,102,241,.3)}
  .p-tier{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;margin-bottom:8px}
  .pricing-card.featured .p-tier{color:#6366f1}
  .p-name{font-size:1.4rem;font-weight:900;color:#111827;letter-spacing:-.5px;margin-bottom:6px}
  .p-sub{font-size:.8rem;color:#9ca3af;margin-bottom:24px;line-height:1.5;font-weight:500}
  .p-price{font-size:3rem;font-weight:900;color:#111827;letter-spacing:-2px;line-height:1;margin-bottom:4px}
  .p-price sup{font-size:1.1rem;font-weight:700;vertical-align:super;letter-spacing:0}
  .p-price span{font-size:1rem;font-weight:600;color:#9ca3af;letter-spacing:0}
  .p-setup{font-size:.75rem;color:#9ca3af;margin-bottom:28px;font-weight:500}
  .p-divider{height:1px;background:#f3f4f6;margin-bottom:28px}
  .pricing-card.featured .p-divider{background:#e0e7ff}
  .p-features{list-style:none;padding:0;display:flex;flex-direction:column;gap:11px;margin-bottom:32px}
  .p-features li{font-size:.83rem;color:#4b5563;display:flex;gap:9px;align-items:flex-start;line-height:1.5}
  .p-features li::before{content:'✓';color:#6366f1;font-weight:900;flex-shrink:0;margin-top:1px;font-size:.8rem}
  .p-note{font-size:.75rem;color:#9ca3af;margin-bottom:20px;font-style:italic;line-height:1.5;min-height:32px}
  .pricing-card.featured .p-features li{color:#374151}
  .p-cta{display:block;text-align:center;padding:13px;border-radius:10px;font-weight:700;font-size:.88rem;text-decoration:none;transition:all .25s}
  .p-cta.default{background:#f9fafb;color:#374151;border:1.5px solid #e5e7eb}
  .p-cta.default:hover{background:#f3f4f6;border-color:#d1d5db}
  .p-cta.featured{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 4px 16px rgba(99,102,241,.25)}
  .p-cta.featured:hover{box-shadow:0 8px 28px rgba(99,102,241,.35);transform:translateY(-1px)}

  .trust-strip{background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;padding:24px 5%}
  .trust-items{max-width:1100px;margin:0 auto;display:flex;justify-content:center;gap:40px;flex-wrap:wrap}
  .trust-item{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:600;color:#374151}
  .trust-icon{font-size:.95rem}

  .roi-section{padding:120px 5%;background:#fff}
  .roi-inner{max-width:740px;margin:0 auto;text-align:center}
  .roi-title{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#0f172a;letter-spacing:-1px;line-height:1.15;margin-bottom:16px}
  .roi-subtitle{font-size:.97rem;color:#6b7280;line-height:1.7;max-width:460px;margin:0 auto 64px}
  .roi-comparison{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:48px}
  .roi-block{flex:1;max-width:240px}
  .roi-value{font-size:clamp(2.4rem,5vw,3.6rem);font-weight:900;letter-spacing:-2px;line-height:1;margin-bottom:10px}
  .roi-value.invest{color:#0f172a}
  .roi-value.gain{color:#16a34a}
  .roi-block-label{font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af}
  .roi-divider{display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 32px;flex-shrink:0}
  .roi-arrow-line{width:48px;height:2px;background:linear-gradient(90deg,#e5e7eb,#6366f1)}
  .roi-arrow-head{width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:8px solid #6366f1;margin-left:-1px}
  .roi-bottom-line{font-size:1rem;font-weight:700;color:#0f172a;margin-bottom:8px}
  .roi-note{font-size:.78rem;color:#9ca3af}

  .why-section{padding:100px 5%;background:#f9fafb}
  .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .why-col{padding:40px;border-radius:18px}
  .why-col.old{background:#fff;border:1px solid #f3f4f6}
  .why-col.new{background:linear-gradient(135deg,#eef2ff,#f5f3ff);border:1px solid #e0e7ff}
  .why-col h3{font-size:.88rem;font-weight:700;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid #f3f4f6}
  .why-col.old h3{color:#9ca3af}
  .why-col.new h3{color:#6366f1;border-color:#e0e7ff}
  .why-li{display:flex;gap:9px;align-items:flex-start;margin-bottom:12px;font-size:.83rem;line-height:1.6}
  .why-li:last-child{margin-bottom:0}
  .why-col.old .why-li{color:#9ca3af}
  .why-col.new .why-li{color:#374151}
  .why-col.old .why-li::before{content:'×';color:#fca5a5;font-weight:700;flex-shrink:0}
  .why-col.new .why-li::before{content:'✓';color:#6366f1;font-weight:700;flex-shrink:0}

  .how-section{padding:100px 5%;background:#fff}
  .how-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:56px;position:relative}
  .how-steps::before{content:'';position:absolute;top:24px;left:calc(12.5% + 20px);right:calc(12.5% + 20px);height:1px;background:linear-gradient(90deg,#e0e7ff,#c7d2fe,#e0e7ff);z-index:0}
  .how-step{text-align:center;padding:0 20px;position:relative;z-index:1}
  .step-num{width:48px;height:48px;background:#fff;border:2px solid #e0e7ff;border-radius:50%;font-size:.95rem;font-weight:900;color:#6366f1;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 4px 12px rgba(99,102,241,.12)}
  .how-step h3{font-size:.88rem;font-weight:700;color:#111827;margin-bottom:8px}
  .how-step p{font-size:.78rem;color:#9ca3af;line-height:1.6}

  .lead-magnet-section{padding:80px 5%;background:#f8fafc;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .lead-magnet-inner{max-width:760px;margin:0 auto;display:flex;align-items:center;gap:48px;flex-wrap:wrap}
  .lead-magnet-text{flex:1;min-width:260px}
  .lead-magnet-badge{display:inline-flex;align-items:center;gap:6px;background:#fef3c7;border:1px solid #fde68a;color:#92400e;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:5px 12px;border-radius:100px;margin-bottom:14px}
  .lead-magnet-title{font-size:1.5rem;font-weight:900;color:#0f172a;letter-spacing:-.5px;line-height:1.2;margin-bottom:10px}
  .lead-magnet-sub{font-size:.88rem;color:#6b7280;line-height:1.6}
  .lead-magnet-cta{flex-shrink:0}
  .btn-lead{background:#0f172a;color:#fff;padding:15px 28px;border-radius:10px;font-weight:700;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.15)}
  .btn-lead:hover{background:#1e293b;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2)}
  .lead-magnet-note{font-size:.75rem;color:#9ca3af;margin-top:8px;text-align:center}

  .urgency-section{padding:80px 5%;background:#fff}
  .urgency-inner{max-width:800px;margin:0 auto}
  .urgency-box{background:#0f172a;border-radius:16px;padding:40px 48px;text-align:center;margin-bottom:20px;position:relative;overflow:hidden}
  .urgency-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,.12) 0%,transparent 65%);pointer-events:none}
  .urgency-pulse{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#fca5a5;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:100px;margin-bottom:16px}
  .urgency-pulse::before{content:'';width:7px;height:7px;background:#ef4444;border-radius:50%;animation:pulse 1.5s infinite}
  .urgency-box h3{color:#fff;font-size:1.3rem;font-weight:900;margin-bottom:10px;letter-spacing:-.5px}
  .urgency-spots{display:flex;justify-content:center;gap:8px;margin-bottom:16px}
  .spot{width:36px;height:8px;border-radius:100px}
  .spot.taken{background:#ef4444}
  .spot.free{background:rgba(255,255,255,.15)}
  .urgency-box p{color:rgba(255,255,255,.5);font-size:.85rem;line-height:1.65;max-width:460px;margin:0 auto}
  .guarantee-box{background:#f0fdf4;border-radius:14px;padding:24px 32px;display:flex;gap:16px;align-items:flex-start;border:1px solid #bbf7d0}
  .guarantee-icon{font-size:1.4rem;flex-shrink:0;margin-top:2px}
  .guarantee-box strong{display:block;color:#166534;font-size:.88rem;font-weight:700;margin-bottom:4px}
  .guarantee-box p{color:#166534;font-size:.82rem;margin:0;line-height:1.6;opacity:.8}

  .cta-section{padding:120px 5%;background:linear-gradient(160deg,#0d1a3a 0%,#111827 100%);position:relative;overflow:hidden;text-align:center}
  .cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(99,102,241,.1) 0%,transparent 65%);pointer-events:none}
  .cta-section h2{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;letter-spacing:-1px;margin-bottom:16px;position:relative}
  .cta-section p{font-size:.95rem;color:rgba(255,255,255,.55);max-width:540px;margin:0 auto 48px;line-height:1.7;position:relative}
  .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative}
  .cta-phone{margin-top:48px;color:rgba(255,255,255,.35);font-size:.82rem;position:relative}
  .cta-phone strong{color:#60a5fa;display:block;font-size:1.05rem;margin-top:8px;font-weight:700}

  footer{background:#0a0f1e;color:rgba(255,255,255,.35);padding:40px 5%;text-align:center;font-size:.8rem;border-top:1px solid rgba(255,255,255,.05)}
  footer strong{color:rgba(255,255,255,.7)}
  footer a{color:rgba(255,255,255,.35);text-decoration:none;margin:0 14px;transition:color .2s}
  footer a:hover{color:#60a5fa}

  @media(max-width:1024px){
    .hero-container{grid-template-columns:1fr;gap:60px}
    .hero-mockup-wrap{max-width:480px;margin:0 auto}
    .pricing-grid{grid-template-columns:1fr;max-width:460px;margin:0 auto}
    .testimonials-grid{grid-template-columns:1fr}
    .solution-grid{grid-template-columns:1fr;max-width:520px}
    .why-grid{grid-template-columns:1fr;max-width:520px}
    .results-row{grid-template-columns:1fr 1fr}
    .results-row .result-item:nth-child(2){border-right:none}
    .results-row .result-item:nth-child(3){border-right:none;border-top:1px solid #f3f4f6;grid-column:1/-1}
    .how-steps{grid-template-columns:1fr 1fr;gap:32px}
    .how-steps::before{display:none}
  }
  @media(max-width:768px){
    .hero{padding:100px 5% 70px;min-height:auto}
    .hero h1{font-size:2.2rem}
    .hero-ctas{flex-direction:column}
    .hero-ctas a{width:100%;text-align:center}
    .btn-primary,.btn-ghost,.btn-wa{padding:13px 20px;font-size:.88rem}
    .problem-grid{grid-template-columns:1fr;gap:0}
    .problem-card:nth-child(n){border-radius:0}
    .problem-card:first-child{border-radius:16px 16px 0 0}
    .problem-card:last-child{border-radius:0 0 16px 16px}
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
    .problem-section,.solution-section,.results-section,.testimonials-section,.pricing-section,.roi-section,.why-section,.how-section,.urgency-section{padding:80px 5%}
  }
  @media(max-width:640px){
    .lead-magnet-inner{flex-direction:column;gap:24px;text-align:center}
    .lead-magnet-cta{width:100%}
    .btn-lead{display:block;text-align:center}
  }
  @media(max-width:480px){
    .hero h1{font-size:1.8rem;letter-spacing:-.8px}
    .hero-sub{font-size:.9rem}
    .hero-social-proof{flex-direction:column;align-items:flex-start;gap:8px}
    .problem-section,.solution-section,.results-section,.testimonials-section,.pricing-section,.roi-section,.why-section,.how-section,.urgency-section{padding:60px 5%}
    .trusted-inner{gap:12px}
    .guarantee-box{flex-direction:column;gap:10px;padding:20px}
    .cta-section h2{font-size:1.8rem}
    .section-header{margin-bottom:40px}
  }
`;

/** @type {import('react').CSSProperties} */
const HERO_DIVIDER_STYLE = { width: 1, height: 36, background: "rgba(255,255,255,0.08)" };
/** @type {import('react').CSSProperties} */
const HERO_VALUE_STYLE = { fontSize: "1rem", fontWeight: 800, color: "#fff", lineHeight: 1 };
/** @type {import('react').CSSProperties} */
const MOCKUP_HEADER_STYLE = {
  background: "linear-gradient(135deg,#0a1628,#0d2146)",
  padding: "28px 24px",
  color: "#fff",
  textAlign: "center",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_EYEBROW_STYLE = {
  fontSize: "0.65rem",
  fontWeight: 700,
  color: "rgba(255,255,255,0.45)",
  textTransform: "uppercase",
  letterSpacing: 1.5,
  marginBottom: 10,
};
/** @type {import('react').CSSProperties} */
const MOCKUP_TITLE_STYLE = {
  fontSize: "1.4rem",
  fontWeight: 900,
  marginBottom: 6,
  letterSpacing: -0.5,
};
/** @type {import('react').CSSProperties} */
const MOCKUP_SUBTITLE_STYLE = {
  fontSize: "0.82rem",
  color: "rgba(255,255,255,0.6)",
  marginBottom: 16,
};
/** @type {import('react').CSSProperties} */
const MOCKUP_META_ROW_STYLE = {
  display: "flex",
  justifyContent: "center",
  gap: 16,
  paddingTop: 12,
  borderTop: "1px solid rgba(255,255,255,0.08)",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_META_TEXT_STYLE = {
  fontSize: "0.72rem",
  color: "rgba(255,255,255,0.7)",
  fontWeight: 600,
};
/** @type {import('react').CSSProperties} */
const MOCKUP_LIST_WRAP_STYLE = {
  padding: "20px 20px",
  background: "#f9fafb",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_LIST_STYLE = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
/** @type {import('react').CSSProperties} */
const MOCKUP_ITEM_STYLE = {
  background: "#fff",
  padding: "10px 13px",
  borderRadius: 10,
  display: "flex",
  gap: 10,
  alignItems: "center",
  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  border: "1px solid #f3f4f6",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_ITEM_NAME_STYLE = {
  fontSize: "0.78rem",
  fontWeight: 700,
  color: "#111827",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_ITEM_PRICE_STYLE = {
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "#6366f1",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_FOOTER_STYLE = {
  padding: "14px 20px",
  background: "#fff",
  borderTop: "1px solid #f3f4f6",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_BUTTON_ROW_STYLE = {
  display: "flex",
  gap: 8,
};
/** @type {import('react').CSSProperties} */
const MOCKUP_DARK_BUTTON_STYLE = {
  flex: 1,
  background: "#111827",
  color: "#fff",
  padding: "9px 10px",
  borderRadius: 9,
  border: "none",
  fontWeight: 700,
  fontSize: "0.72rem",
  cursor: "pointer",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_WHATSAPP_BUTTON_STYLE = {
  ...MOCKUP_DARK_BUTTON_STYLE,
  background: "#25d366",
};
/** @type {import('react').CSSProperties} */
const MOCKUP_CAPTION_STYLE = {
  marginTop: 16,
  fontSize: "0.75rem",
  color: "rgba(255,255,255,0.35)",
  textAlign: "center",
  fontWeight: 500,
};
/** @type {import('react').CSSProperties} */
const DETAILS_SUMMARY_STYLE = {
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#9ca3af",
  padding: "10px 0",
  userSelect: "none",
  listStyle: "none",
};
/** @type {import('react').CSSProperties} */
const DETAILS_CONTENT_STYLE = {
  paddingTop: 8,
  paddingBottom: 12,
  fontSize: "0.82rem",
  color: "#9ca3af",
  lineHeight: 1.7,
};
/** @type {import('react').CSSProperties} */
const ROI_LEFT_STYLE = { textAlign: "right" };
/** @type {import('react').CSSProperties} */
const ROI_RIGHT_STYLE = { textAlign: "left" };
/** @type {import('react').CSSProperties} */
const ROI_INVEST_SUFFIX_STYLE = { fontSize: "1.2rem", fontWeight: 700, color: "#9ca3af" };
/** @type {import('react').CSSProperties} */
const ROI_GAIN_SUFFIX_STYLE = { fontSize: "1.2rem", fontWeight: 700, color: "#86efac" };
/** @type {import('react').CSSProperties} */
const ROI_DIVIDER_ROW_STYLE = { display: "flex", alignItems: "center" };
/** @type {import('react').CSSProperties} */
const ROI_BOTTOM_STYLE = { borderTop: "1px solid #f3f4f6", paddingTop: 32 };
/** @type {import('react').CSSProperties} */
const CTA_META_ROW_STYLE = {
  marginTop: 32,
  display: "flex",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
  position: "relative",
};
/** @type {import('react').CSSProperties} */
const CTA_META_ITEM_STYLE = {
  fontSize: "0.78rem",
  color: "rgba(255,255,255,0.4)",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 6,
};
/** @type {import('react').CSSProperties} */
const CTA_META_CHECK_STYLE = { color: "#22c55e" };
/** @type {import('react').CSSProperties} */
const FOOTER_LINK_ROW_STYLE = { marginTop: 14 };

const HERO_CHECKS = [
  "Professionele website, hosting en onderhoud in één abonnement",
  "Snelle livegang zonder technisch gedoe",
  "Updates, support en doorontwikkeling onder één vast aanspreekpunt",
];

const TRUSTED_BY = ["Kappers", "Restaurants", "Klusbedrijven", "Schoonheidssalons", "Fotografen", "ZZP'ers"];

const PROBLEMS = [
  [
    "🔍",
    "Je bedrijf oogt minder professioneel",
    "Zonder sterke website missen bezoekers vaak het vertrouwen dat nodig is om contact op te nemen of een afspraak te maken.",
  ],
  [
    "📱",
    "Je online presentatie loopt achter",
    "Een verouderde of ontbrekende website geeft al snel de indruk dat je minder actief of minder betrouwbaar bent dan je concurrent.",
  ],
  [
    "📞",
    "Klanten weten niet goed wat de volgende stap is",
    "Als bellen, mailen, reserveren of aanvragen niet duidelijk geregeld is, haken bezoekers sneller af.",
  ],
  [
    "🛠️",
    "Alles blijft op jouw bord liggen",
    "Hosting, updates, kleine aanpassingen en technische vragen kosten tijd die je liever in je bedrijf stopt.",
  ],
];

const SOLUTION_GET = [
  "Een professionele website die past bij jouw branche",
  "Hosting, domein, SSL en technisch beheer onder één dak",
  "Een duidelijke structuur gericht op contact, aanvragen of afspraken",
  "Snelle hulp bij updates en kleine wijzigingen",
  "Een website die netjes werkt op mobiel, tablet en desktop",
  "Eén vast traject zonder losse technische puzzelstukjes",
];

const SOLUTION_SKIP = [
  "Zelf hosting en techniek uitzoeken",
  "Steeds opnieuw offertes opvragen voor kleine aanpassingen",
  "Onzekerheid over wie iets moet oplossen",
  "Gedoe met verschillende partijen voor website, domein en onderhoud",
  "Een site die na oplevering langzaam veroudert",
  "Tijd verliezen aan technische zaken buiten je vakgebied",
];

const RESULTS = [
  ["Professioneel", "Sterkere eerste indruk"],
  ["Duidelijk", "Meer rust en structuur voor bezoekers"],
  ["Ontzorgd", "Beheer, updates en support op één plek"],
];

const TESTIMONIALS = [
  {
    stars: "★★★★★",
    quote:
      "Prettige samenwerking en vooral fijn dat alles op één plek geregeld is. Ik hoef niet meer na te denken over hosting, updates of kleine aanpassingen.",
    name: "Sander K.",
    role: "Kapper, Amsterdam",
    color: "#6366f1",
  },
  {
    stars: "★★★★★",
    quote:
      "De website ziet er verzorgd uit en past veel beter bij mijn salon dan wat ik eerst had. Het voelt professioneler en duidelijker voor klanten.",
    name: "Fatima O.",
    role: "Schoonheidssalon, Rotterdam",
    color: "#8b5cf6",
  },
  {
    stars: "★★★★★",
    quote:
      "Wat ik vooral waardeer is de rust: één partij die bouw, onderhoud en updates regelt. Dat werkt voor mij veel beter dan alles los organiseren.",
    name: "Tom V.",
    role: "Klusbedrijf, Utrecht",
    color: "#6366f1",
  },
];

const MOCKUP_SERVICES = [
  ["✂️", "Klassieke Kapsel", "vanaf €18"],
  ["🧔", "Baardverzorging", "vanaf €12"],
  ["💈", "Fade & Design", "vanaf €22"],
];

const TRUST_ITEMS = [
  ["✔", "Duidelijke vaste maandprijs"],
  ["✔", "Hosting en onderhoud inbegrepen"],
  ["✔", "Eén aanspreekpunt"],
  ["✔", "Doorlopende ondersteuning"],
  ["✔", "Gebouwd voor lokale ondernemers"],
];

const WHY_OLD = [
  "Na oplevering zelf alles regelen",
  "Los betalen voor hosting, onderhoud en wijzigingen",
  "Technische zaken bij meerdere partijen onderbrengen",
  "Onzekerheid over wie verantwoordelijk is bij problemen",
  "Website veroudert sneller zonder doorlopend beheer",
];

const WHY_NEW = [
  "Website, hosting en onderhoud in één abonnement",
  "Duidelijke vaste kosten per maand",
  "Snelle hulp bij kleine wijzigingen",
  "Doorlopende technische zorg en beheer",
  "Meer rust, continuïteit en een professionelere uitstraling",
];

const HOW_STEPS = [
  [
    "1",
    "Kennismaking",
    "We bespreken kort je bedrijf, doelgroep en wat je website praktisch moet doen.",
  ],
  [
    "2",
    "Ontwerp & opbouw",
    "Wij bouwen een professionele basis die past bij jouw branche en uitstraling.",
  ],
  [
    "3",
    "Livegang",
    "We zetten je website netjes live en zorgen dat alles technisch goed staat.",
  ],
  [
    "4",
    "Onderhoud & updates",
    "Na livegang blijven we betrokken voor beheer, kleine wijzigingen en doorontwikkeling.",
  ],
];

const URGENCY_SPOTS = [1, 2, 3, 4, 5];
const CTA_META = ["Duidelijke maandprijs", "Onderhoud inbegrepen", "Vast aanspreekpunt", "Vrijblijvende kennismaking"];

export default function Home() {
  return (
    <>
      <SEO
        title="Website laten maken voor kappers, salons en lokale bedrijven | Vedantix"
        description="Professionele websites voor kappers, salons, restaurants en lokale ondernemers. Inclusief hosting, onderhoud en doorlopende ondersteuning in één helder abonnement."
        canonical="https://vedantix.nl/"
      />

      <style>{HOME_STYLES}</style>

      <div className="home-page">
        <NavBar />

        <main>
          <section className="hero">
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-eyebrow">Voor kappers, salons & lokale bedrijven</div>
                <h1>
                  Een professionele website —<br />
                  <span>zonder technisch gedoe</span>
                </h1>
                <p className="hero-sub">
                  Vedantix bouwt en beheert websites voor lokale ondernemers. Jij focust op je bedrijf, wij regelen de techniek, updates en online presentatie.
                </p>
                <div className="hero-checks">
                  {HERO_CHECKS.map((item) => (
                    <div key={item} className="hero-check">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="hero-ctas">
                  <a href="#pricing" className="btn-primary">
                    Bekijk de pakketten →
                  </a>
                  <a
                    href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20ben%20geinteresseerd%20in%20een%20website."
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wa"
                  >
                    💬 Gratis gesprek
                  </a>
                </div>
                <div className="hero-social-proof">
                  <div>
                    <div className="hero-sp-stars">★★★★★</div>
                    <div className="hero-sp-text">Gebouwd voor lokale ondernemers die ontzorgd willen worden</div>
                  </div>
                  <div style={HERO_DIVIDER_STYLE} />
                  <div>
                    <div style={HERO_VALUE_STYLE}>Snel</div>
                    <div className="hero-sp-text">Snelle livegang mogelijk</div>
                  </div>
                  <div style={HERO_DIVIDER_STYLE} />
                  <div>
                    <div style={HERO_VALUE_STYLE}>Vrijblijvend</div>
                    <div className="hero-sp-text">Kennismaking zonder verplichting</div>
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
                  <div style={MOCKUP_HEADER_STYLE}>
                    <div style={MOCKUP_EYEBROW_STYLE}>Premium Barbershop</div>
                    <div style={MOCKUP_TITLE_STYLE}>Barbershop Amsterdam</div>
                    <div style={MOCKUP_SUBTITLE_STYLE}>Klassieke kapsels & scheerbeurt</div>
                    <div style={MOCKUP_META_ROW_STYLE}>
                      <span style={MOCKUP_META_TEXT_STYLE}>⭐ Goede eerste indruk</span>
                      <span style={MOCKUP_META_TEXT_STYLE}>📱 Mobielvriendelijk</span>
                    </div>
                  </div>
                  <div style={MOCKUP_LIST_WRAP_STYLE}>
                    <div style={MOCKUP_LIST_STYLE}>
                      {MOCKUP_SERVICES.map(([icon, name, price]) => (
                        <div key={name} style={MOCKUP_ITEM_STYLE}>
                          <span style={{ fontSize: "1rem" }}>{icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={MOCKUP_ITEM_NAME_STYLE}>{name}</div>
                          </div>
                          <span style={MOCKUP_ITEM_PRICE_STYLE}>{price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={MOCKUP_FOOTER_STYLE}>
                    <div style={MOCKUP_BUTTON_ROW_STYLE}>
                      <button type="button" style={MOCKUP_DARK_BUTTON_STYLE}>
                        📅 Afspraak maken
                      </button>
                      <button type="button" style={MOCKUP_WHATSAPP_BUTTON_STYLE}>
                        💬 WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
                <p style={MOCKUP_CAPTION_STYLE}>Jij kiest een stijl • Wij regelen de rest</p>
              </div>
            </div>
          </section>

          <div className="trusted">
            <div className="trusted-inner">
              <span className="trusted-label">Gebouwd voor</span>
              {TRUSTED_BY.map((item) => (
                <span key={item} className="trusted-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <section className="problem-section">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label">Het probleem</div>
                <h2 className="section-h2">Een goede website is geen luxe meer</h2>
                <p className="section-p">
                  Voor veel lokale ondernemers is de website het eerste serieuze contactmoment. Dan moet die professioneel, duidelijk en betrouwbaar aanvoelen.
                </p>
              </div>
              <div className="problem-grid">
                {PROBLEMS.map(([icon, title, text]) => (
                  <div key={title} className="problem-card">
                    <div className="problem-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="solution-section">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label light">De oplossing</div>
                <h2 className="section-h2 light">Alles onder één dak geregeld</h2>
                <p className="section-p light">
                  Website, hosting, onderhoud en ondersteuning in één duidelijk abonnement. Geen losse partijen, geen technisch gedoe.
                </p>
              </div>
              <div className="solution-grid">
                <div className="solution-col get">
                  <h3>✓ Wat je krijgt</h3>
                  {SOLUTION_GET.map((item) => (
                    <div key={item} className="sol-item">
                      <span className="sol-check">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="solution-col skip">
                  <h3>👍 Wat je niet meer doet</h3>
                  {SOLUTION_SKIP.map((item) => (
                    <div key={item} className="sol-item">
                      <span className="sol-check">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="results-section">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label">De meerwaarde</div>
                <h2 className="section-h2">Wat een goed website-abonnement je oplevert</h2>
                <p className="section-p">
                  Niet alleen een mooie website, maar vooral continuïteit, duidelijkheid en een professionele online basis.
                </p>
              </div>
              <div className="results-row">
                {RESULTS.map(([number, label]) => (
                  <div key={number} className="result-item">
                    <div className="result-num">{number}</div>
                    <div className="result-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="testimonials-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Wat klanten zeggen</div>
                <h2 className="section-h2">Ondernemers zoals jij gingen je voor</h2>
              </div>
              <div className="testimonials-grid">
                {TESTIMONIALS.map((item) => (
                  <div key={item.name} className="testimonial-card">
                    <div className="t-stars">{item.stars}</div>
                    <p className="t-quote">"{item.quote}"</p>
                    <div className="t-author">
                      <div className="t-avatar" style={{ background: item.color }}>
                        {item.name[0]}
                      </div>
                      <div>
                        <div className="t-name">{item.name}</div>
                        <div className="t-role">{item.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="pricing-section anchor-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Tarieven</div>
                <h2 className="section-h2">Kies jouw pakket</h2>
                <p className="section-p">
                  Kies het pakket dat past bij jouw bedrijf. Heldere maandkosten, vaste ondersteuning en ruimte om later door te groeien.
                </p>
              </div>
              <div className="pricing-grid">
                <div className="pricing-card">
                  <div className="p-tier">Starter</div>
                  <div className="p-name">Sterke basis</div>
                  <div className="p-sub">Voor ondernemers die professioneel online zichtbaar willen zijn</div>
                  <div className="p-price">
                    <sup>€</sup>99<span>/m</span>
                  </div>
                  <div className="p-setup">+ €500 eenmalige setup</div>
                  <div className="p-divider" />
                  <ul className="p-features">
                    <li>1–2 pagina website</li>
                    <li>Mobielvriendelijk design</li>
                    <li>Contactformulier</li>
                    <li>Hosting + domein koppeling</li>
                    <li>SSL beveiliging</li>
                    <li>Basis SEO setup</li>
                    <li>Support binnen 48 uur</li>
                  </ul>
                  <p className="p-note">Een nette, verzorgde basis waarmee je bedrijf professioneel online staat</p>
                  <a href="#cta" className="p-cta default">
                    Kies Starter →
                  </a>
                </div>

                <div className="pricing-card featured">
                  <div className="pricing-badge">Meest gekozen</div>
                  <div className="p-tier">Growth</div>
                  <div className="p-name">Groei & vertrouwen</div>
                  <div className="p-sub">Voor bedrijven die meer structuur, inhoud en begeleiding willen</div>
                  <div className="p-price">
                    <sup>€</sup>149<span>/m</span>
                  </div>
                  <div className="p-setup">+ €750 eenmalige setup</div>
                  <div className="p-divider" />
                  <ul className="p-features">
                    <li>Tot 5 pagina&apos;s</li>
                    <li>Alles van Starter</li>
                    <li>Google Maps integratie</li>
                    <li>Conversiegerichte opbouw</li>
                    <li>SEO basisoptimalisatie</li>
                    <li>Maandelijkse performance check</li>
                    <li>Support binnen 24 uur</li>
                    <li>Kleine updates inbegrepen</li>
                  </ul>
                  <p className="p-note" style={{ color: "#6366f1" }}>
                    Meer ruimte voor inhoud, doorontwikkeling en een sterkere online presentatie
                  </p>
                  <a href="#cta" className="p-cta featured">
                    Kies Growth →
                  </a>
                </div>

                <div className="pricing-card">
                  <div className="p-tier">Pro</div>
                  <div className="p-name">Maatwerk & doorontwikkeling</div>
                  <div className="p-sub">Voor bedrijven die meer functionaliteit en meer snelheid willen</div>
                  <div className="p-price">
                    <sup>€</sup>249<span>/m</span>
                  </div>
                  <div className="p-setup">+ €1000 eenmalige setup</div>
                  <div className="p-divider" />
                  <ul className="p-features">
                    <li>Tot 10 pagina&apos;s</li>
                    <li>Custom design op maat</li>
                    <li>Geavanceerde functies (boekingen / formulieren)</li>
                    <li>Alles van Growth</li>
                    <li>Volledige SEO optimalisatie</li>
                    <li>Priority support (binnen 12 uur)</li>
                    <li>Snelle aanpassingen mogelijk</li>
                  </ul>
                  <p className="p-note">Voor ondernemers die hun website als serieus onderdeel van hun bedrijf zien</p>
                  <a href="#cta" className="p-cta default">
                    Kies Pro →
                  </a>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <details style={{ cursor: "pointer" }}>
                  <summary style={DETAILS_SUMMARY_STYLE}>
                    💡 Wat valt onder kleine updates en wijzigingen?
                  </summary>
                  <div style={DETAILS_CONTENT_STYLE}>
                    Teksten aanpassen, foto&apos;s vervangen, kleine layout-wijzigingen, contactgegevens updaten.
                    Grote wijzigingen zoals nieuwe modules, extra pagina&apos;s of uitgebreid maatwerk bespreken we altijd vooraf.
                  </div>
                </details>
              </div>
            </div>
          </section>

          <div className="trust-strip">
            <div className="trust-items">
              {TRUST_ITEMS.map(([icon, text]) => (
                <div key={text} className="trust-item">
                  <span className="trust-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <section className="roi-section">
            <div className="roi-inner">
              <h2 className="roi-title">Waarom een abonnement voor veel ondernemers beter werkt</h2>
              <p className="roi-subtitle">
                Je koopt niet alleen een website, maar ook rust, continuïteit en een partij die jouw online basis blijft beheren.
              </p>

              <div className="roi-comparison">
                <div className="roi-block" style={ROI_LEFT_STYLE}>
                  <div className="roi-value invest">
                    Vast<span style={ROI_INVEST_SUFFIX_STYLE}> per maand</span>
                  </div>
                  <div className="roi-block-label">Duidelijke kosten</div>
                </div>

                <div className="roi-divider">
                  <div style={ROI_DIVIDER_ROW_STYLE}>
                    <div className="roi-arrow-line" />
                    <div className="roi-arrow-head" />
                  </div>
                </div>

                <div className="roi-block" style={ROI_RIGHT_STYLE}>
                  <div className="roi-value gain">
                    Rust<span style={ROI_GAIN_SUFFIX_STYLE}> & continuïteit</span>
                  </div>
                  <div className="roi-block-label">Doorlopend geregeld</div>
                </div>
              </div>

              <div style={ROI_BOTTOM_STYLE}>
                <div className="roi-bottom-line">
                  Geen losse kosten voor hosting, onderhoud en kleine updates bij verschillende partijen.
                </div>
                <div className="roi-note">
                  Een helder abonnement werkt vaak prettiger dan een website die na oplevering aan je wordt overgedragen zonder vervolg.
                </div>
              </div>
            </div>
          </section>

          <section className="why-section">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label">Waarom abonnement</div>
                <h2 className="section-h2">Waarom dit model prettig werkt</h2>
                <p className="section-p">
                  Voor veel ondernemers is een abonnement overzichtelijker: één partij, één maandprijs en doorlopende ondersteuning.
                </p>
              </div>
              <div className="why-grid">
                <div className="why-col old">
                  <h3>Losse website zonder vervolg</h3>
                  {WHY_OLD.map((item) => (
                    <div key={item} className="why-li">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="why-col new">
                  <h3>Abonnement met doorlopende ondersteuning</h3>
                  {WHY_NEW.map((item) => (
                    <div key={item} className="why-li">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="how" className="how-section anchor-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Werkwijze</div>
                <h2 className="section-h2">Hoe het werkt</h2>
                <p className="section-p">Vier eenvoudige stappen naar jouw nieuwe website.</p>
              </div>
              <div className="how-steps">
                {HOW_STEPS.map(([number, title, text]) => (
                  <div key={number} className="how-step">
                    <div className="step-num">{number}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="lead-magnet-section">
            <div className="lead-magnet-inner">
              <div className="lead-magnet-text">
                <div className="lead-magnet-badge">🎁 Gratis — geen verplichtingen</div>
                <div className="lead-magnet-title">Ontvang een eerlijke blik op je huidige website</div>
                <div className="lead-magnet-sub">
                  We kijken vrijblijvend naar je online presentatie en laten zien waar winst zit in duidelijkheid, uitstraling en gebruiksgemak.
                </div>
              </div>
              <div className="lead-magnet-cta">
                <a
                  href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20website%20analyse."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lead"
                >
                  Gratis website analyse →
                </a>
                <div className="lead-magnet-note">Reactie binnen 24 uur · Helemaal vrijblijvend</div>
              </div>
            </div>
          </section>

          <section className="urgency-section">
            <div className="urgency-inner">
              <div className="urgency-box">
                <div className="urgency-pulse">Persoonlijke aanpak</div>
                <h3>Wij werken bewust met een beperkt aantal trajecten tegelijk</h3>
                <div className="urgency-spots">
                  {URGENCY_SPOTS.map((item) => (
                    <div key={item} className={`spot ${item <= 3 ? "taken" : "free"}`} />
                  ))}
                </div>
                <p>
                  Zo houden we ruimte voor kwaliteit, snelle communicatie en doorlopende aandacht na livegang.
                </p>
              </div>
              <div className="guarantee-box">
                <div className="guarantee-icon">🤝</div>
                <div>
                  <strong>Vrijblijvend kennismaken</strong>
                  <p>
                    Eerst bespreken we rustig wat bij jouw bedrijf past. Pas daarna beslis je of je verder wilt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="cta" className="cta-section anchor-section">
            <h2>Laat je website professioneel voor je werken</h2>
            <p>
              Kies voor een website die niet alleen mooi oogt, maar ook goed onderhouden blijft en past bij hoe jij wilt ondernemen.
            </p>
            <div className="cta-btns">
              <a href="#pricing" className="btn-primary">
                Bekijk jouw pakket →
              </a>
              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20ben%20geinteresseerd%20in%20een%20website."
                target="_blank"
                rel="noreferrer"
                className="btn-wa"
              >
                💬 Plan gratis gesprek
              </a>
            </div>
            <div style={CTA_META_ROW_STYLE}>
              {CTA_META.map((item) => (
                <span key={item} style={CTA_META_ITEM_STYLE}>
                  <span style={CTA_META_CHECK_STYLE}>✓</span> {item}
                </span>
              ))}
            </div>
            <div className="cta-phone">
              Liever direct bellen?
              <strong>+31 6 26 21 99 89</strong>
            </div>
          </section>
        </main>

        <BigFooter />
      </div>
    </>
  );
}