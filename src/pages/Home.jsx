import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import BigFooter from "../components/BigFooter";

const HOME_STYLES = `
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{margin:0;padding:0}

  .home-page{font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111827;background:#fff;line-height:1.6;overflow-x:hidden}
  .anchor-section{scroll-margin-top:100px}

  .btn-ghost{background:transparent;color:#111827;border:1.5px solid #d1d5db;padding:14px 28px;border-radius:10px;font-weight:700;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .25s;cursor:pointer}
  .btn-ghost:hover{border-color:#111827;background:#f9fafb}

  .btn-primary{background:#fff;color:#0f172a;padding:15px 30px;border-radius:10px;font-weight:800;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .25s cubic-bezier(.4,0,.2,1);border:none;cursor:pointer;letter-spacing:-.1px;box-shadow:0 4px 16px rgba(0,0,0,.25)}
  .btn-primary:hover{background:#f1f5f9;transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,0,0,.35)}
  .btn-wa{background:#25d366;color:#fff;padding:15px 30px;border-radius:10px;font-weight:800;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .25s cubic-bezier(.4,0,.2,1);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.3)}
  .btn-wa:hover{background:#22c55e;transform:translateY(-2px);box-shadow:0 10px 32px rgba(37,211,102,.4)}
  .btn-lead{background:#0f172a;color:#fff;padding:15px 28px;border-radius:10px;font-weight:800;font-size:.92rem;text-decoration:none;display:inline-block;transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.15)}
  .btn-lead:hover{background:#1e293b;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2)}

  .hero{background:linear-gradient(150deg,#060c1a 0%,#0a1428 40%,#0d1f3c 70%,#0f1e38 100%);min-height:100vh;display:flex;align-items:center;padding:140px 5% 100px;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 65% 38%,rgba(59,130,246,.13) 0%,transparent 58%),radial-gradient(ellipse at 20% 80%,rgba(99,102,241,.07) 0%,transparent 50%);pointer-events:none}
  .hero-container{max-width:1280px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 500px;gap:72px;align-items:center}
  .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.78);font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;padding:8px 18px;border-radius:100px;margin-bottom:24px}
  .hero-eyebrow::before{content:'';width:6px;height:6px;background:#22c55e;border-radius:50%;animation:pulse 2s infinite;flex-shrink:0}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  .hero h1{font-size:clamp(2.6rem,4.6vw,4.2rem);font-weight:900;line-height:1.06;color:#fff;margin-bottom:22px;letter-spacing:-2px;max-width:760px}
  .hero h1 span{background:linear-gradient(125deg,#60a5fa 0%,#818cf8 50%,#a78bfa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .hero-sub{font-size:1.03rem;color:rgba(255,255,255,.66);line-height:1.78;margin-bottom:20px;max-width:620px;font-weight:400}
  .hero-sub strong{color:#fff;font-weight:700}
  .hero-microcopy{font-size:.82rem;color:rgba(255,255,255,.45);margin-bottom:34px;font-weight:600}
  .hero-checks{margin-bottom:38px;display:grid;grid-template-columns:1fr 1fr;gap:12px 18px;max-width:700px}
  .hero-check{display:flex;align-items:flex-start;gap:12px;font-size:.88rem;color:rgba(255,255,255,.78);font-weight:600;letter-spacing:.1px}
  .hero-check::before{content:'✓';color:#22c55e;font-weight:900;font-size:.85rem;flex-shrink:0;background:rgba(34,197,94,.12);width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;line-height:20px;margin-top:1px}
  .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:18px}
  .hero-cta-note{font-size:.78rem;color:rgba(255,255,255,.42);font-weight:600;margin-bottom:38px}
  .hero-social-proof{display:flex;align-items:center;gap:20px;padding-top:28px;border-top:1px solid rgba(255,255,255,.07)}
  .hero-sp-stat{font-size:1rem;font-weight:800;color:#fff;line-height:1;margin-bottom:6px}
  .hero-sp-text{font-size:.76rem;color:rgba(255,255,255,.42);font-weight:500;line-height:1.5}

  .hero-mockup-wrap{position:relative}
  .hero-mockup-wrap::before{content:'';position:absolute;top:-30px;left:-30px;right:-30px;bottom:-30px;background:radial-gradient(ellipse at center,rgba(99,102,241,.18) 0%,rgba(59,130,246,.06) 45%,transparent 70%);pointer-events:none;z-index:0;border-radius:40px}
  .hero-mockup{background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.07),0 32px 80px rgba(0,0,0,.55),0 8px 24px rgba(0,0,0,.3);animation:float 5s ease-in-out infinite;position:relative;z-index:1}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  .mockup-bar{background:#141a27;padding:11px 16px;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,.04)}
  .mockup-dot{width:9px;height:9px;border-radius:50%}
  .mockup-url{flex:1;background:rgba(255,255,255,.06);border-radius:5px;height:20px;margin:0 14px;display:flex;align-items:center;padding:0 10px}
  .mockup-url span{font-size:.6rem;color:rgba(255,255,255,.35);font-weight:500}

  .section-wrap{max-width:1140px;margin:0 auto;width:100%}
  .section-header{max-width:700px;margin-bottom:56px}
  .section-header.centered{margin-left:auto;margin-right:auto;text-align:center}
  .section-h2{font-size:clamp(1.9rem,3vw,2.7rem);font-weight:900;color:#111827;letter-spacing:-.8px;line-height:1.15;margin-bottom:14px}
  .section-h2.light{color:#fff}
  .section-p{font-size:.96rem;color:#6b7280;line-height:1.75}
  .section-p.light{color:rgba(255,255,255,.56)}
  .section-label{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#6366f1;margin-bottom:14px}
  .section-label.light{color:#818cf8}

  .trusted{background:#f9fafb;padding:26px 5%;border-bottom:1px solid #f3f4f6}
  .trusted-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
  .trusted-label{font-size:.72rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;margin-right:8px}
  .trusted-pill{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:7px 14px;font-size:.78rem;font-weight:700;color:#6b7280}

  .problem-section{padding:100px 5%;background:#fff}
  .problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .problem-card{padding:32px 28px;background:#fafafa;border:1px solid #f3f4f6;border-radius:16px;transition:all .25s}
  .problem-card:hover{background:#fff;box-shadow:0 8px 32px rgba(0,0,0,.06);z-index:1;transform:translateY(-2px)}
  .problem-icon{font-size:1.6rem;margin-bottom:14px}
  .problem-card h3{font-size:1rem;font-weight:800;color:#111827;margin-bottom:8px}
  .problem-card p{font-size:.86rem;color:#6b7280;line-height:1.7}

  .difference-section{padding:100px 5%;background:#fff}
  .difference-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .difference-card{background:linear-gradient(180deg,#ffffff,#fafbff);border:1px solid #eef2ff;border-radius:18px;padding:28px 24px;box-shadow:0 8px 32px rgba(99,102,241,.04)}
  .difference-icon{width:42px;height:42px;border-radius:12px;background:#eef2ff;color:#6366f1;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:800;margin-bottom:16px}
  .difference-card h3{font-size:.98rem;font-weight:800;color:#111827;margin-bottom:8px}
  .difference-card p{font-size:.86rem;color:#6b7280;line-height:1.7}

  .demo-section{padding:100px 5%;background:#f8fafc}
  .demo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .demo-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.04);transition:all .25s}
  .demo-card:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.08)}
  .demo-top{padding:24px 22px;color:#fff}
  .demo-top.barber{background:linear-gradient(135deg,#0f172a,#1d4ed8)}
  .demo-top.restaurant{background:linear-gradient(135deg,#3f1d0f,#ea580c)}
  .demo-top.salon{background:linear-gradient(135deg,#4c1d95,#9333ea)}
  .demo-badge{display:inline-block;font-size:.68rem;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:rgba(255,255,255,.72);margin-bottom:10px}
  .demo-title{font-size:1.2rem;font-weight:900;line-height:1.2;margin-bottom:8px}
  .demo-sub{font-size:.82rem;color:rgba(255,255,255,.75);line-height:1.6}
  .demo-body{padding:22px}
  .demo-list{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:18px}
  .demo-list li{display:flex;gap:8px;align-items:flex-start;font-size:.84rem;color:#4b5563;line-height:1.55}
  .demo-list li::before{content:'✓';color:#6366f1;font-weight:900;flex-shrink:0}
  .demo-outcome{padding:12px 14px;border-radius:12px;background:#f8fafc;border:1px solid #eef2f7;font-size:.8rem;color:#334155;font-weight:700;line-height:1.55}
  .demo-cta{margin-top:18px;display:block;text-align:center;padding:12px;border-radius:10px;background:#111827;color:#fff;font-size:.85rem;font-weight:800;text-decoration:none}

  .solution-section{padding:100px 5%;background:linear-gradient(160deg,#0d1a3a,#111827)}
  .solution-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .solution-col{padding:36px;border-radius:16px}
  .solution-col.get{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
  .solution-col.skip{background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.15)}
  .solution-col h3{font-size:.9rem;font-weight:800;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.07)}
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
  .result-num{font-size:2rem;font-weight:900;color:#111827;letter-spacing:-1px;margin-bottom:8px;line-height:1.1}
  .result-label{font-size:.84rem;color:#6b7280;font-weight:600;line-height:1.6}

  .pricing-section{padding:100px 5%;background:#fff}
  .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .pricing-card{border-radius:20px;padding:40px 30px;border:1.5px solid #f3f4f6;transition:all .3s;position:relative;background:#fff}
  .pricing-card:hover{border-color:#e0e7ff;box-shadow:0 20px 60px rgba(99,102,241,.08);transform:translateY(-3px)}
  .pricing-card.featured{border-color:#6366f1;background:linear-gradient(160deg,#fafbff,#f0f1ff);box-shadow:0 24px 80px rgba(99,102,241,.14)}
  .pricing-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:5px 20px;border-radius:100px;font-weight:800;font-size:.68rem;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;box-shadow:0 4px 12px rgba(99,102,241,.3)}
  .p-tier{font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;margin-bottom:8px}
  .pricing-card.featured .p-tier{color:#6366f1}
  .p-name{font-size:1.2rem;font-weight:900;color:#111827;letter-spacing:-.5px;margin-bottom:6px}
  .p-sub{font-size:.8rem;color:#9ca3af;margin-bottom:20px;line-height:1.5;font-weight:600}
  .p-price{font-size:3rem;font-weight:900;color:#111827;letter-spacing:-2px;line-height:1;margin-bottom:4px}
  .p-price sup{font-size:1.1rem;font-weight:700;vertical-align:super;letter-spacing:0}
  .p-price span{font-size:1rem;font-weight:700;color:#9ca3af;letter-spacing:0}
  .p-setup{font-size:.75rem;color:#9ca3af;margin-bottom:22px;font-weight:600}
  .p-divider{height:1px;background:#f3f4f6;margin-bottom:22px}
  .pricing-card.featured .p-divider{background:#e0e7ff}
  .p-features{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
  .p-features li{font-size:.83rem;color:#4b5563;display:flex;gap:9px;align-items:flex-start;line-height:1.5}
  .p-features li::before{content:'✓';color:#6366f1;font-weight:900;flex-shrink:0;margin-top:1px;font-size:.8rem}
  .p-note{font-size:.75rem;color:#9ca3af;margin-bottom:18px;font-style:italic;line-height:1.5;min-height:32px}
  .pricing-card.featured .p-features li{color:#374151}
  .p-cta{display:block;text-align:center;padding:13px;border-radius:10px;font-weight:800;font-size:.88rem;text-decoration:none;transition:all .25s}
  .p-cta.default{background:#f9fafb;color:#374151;border:1.5px solid #e5e7eb}
  .p-cta.default:hover{background:#f3f4f6;border-color:#d1d5db}
  .p-cta.featured{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 4px 16px rgba(99,102,241,.25)}
  .p-cta.featured:hover{box-shadow:0 8px 28px rgba(99,102,241,.35);transform:translateY(-1px)}

  .pricing-details{margin-top:36px;display:grid;grid-template-columns:1fr;gap:10px}
  .pricing-help{margin-top:18px;font-size:.82rem;color:#9ca3af;text-align:center}
  .pricing-summary{font-size:.82rem;font-weight:800;color:#374151;padding:14px 0;user-select:none;list-style:none;cursor:pointer}
  .pricing-details-content{padding-top:4px;padding-bottom:12px;font-size:.83rem;color:#6b7280;line-height:1.7}

  .pricing-position{margin:28px auto 0;max-width:760px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:16px;padding:20px 22px;text-align:left}
  .pricing-position strong{display:block;color:#111827;font-size:.9rem;margin-bottom:8px}
  .pricing-position p{font-size:.84rem;color:#6b7280;line-height:1.7}

  .trust-strip{background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;padding:24px 5%}
  .trust-items{max-width:1100px;margin:0 auto;display:flex;justify-content:center;gap:40px;flex-wrap:wrap}
  .trust-item{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:#374151}
  .trust-icon{font-size:.95rem}

  .roi-section{padding:110px 5%;background:#fff}
  .roi-inner{max-width:760px;margin:0 auto;text-align:center}
  .roi-title{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#0f172a;letter-spacing:-1px;line-height:1.15;margin-bottom:16px}
  .roi-subtitle{font-size:.97rem;color:#6b7280;line-height:1.7;max-width:520px;margin:0 auto 64px}
  .roi-comparison{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:48px}
  .roi-block{flex:1;max-width:260px}
  .roi-value{font-size:clamp(2.4rem,5vw,3.6rem);font-weight:900;letter-spacing:-2px;line-height:1;margin-bottom:10px}
  .roi-value.invest{color:#0f172a}
  .roi-value.gain{color:#16a34a}
  .roi-block-label{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af}
  .roi-divider{display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 32px;flex-shrink:0}
  .roi-arrow-line{width:48px;height:2px;background:linear-gradient(90deg,#e5e7eb,#6366f1)}
  .roi-arrow-head{width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:8px solid #6366f1;margin-left:-1px}
  .roi-bottom-line{font-size:1rem;font-weight:800;color:#0f172a;margin-bottom:8px}
  .roi-note{font-size:.78rem;color:#9ca3af}

  .why-section{padding:100px 5%;background:#f9fafb}
  .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .why-col{padding:40px;border-radius:18px}
  .why-col.old{background:#fff;border:1px solid #f3f4f6}
  .why-col.new{background:linear-gradient(135deg,#eef2ff,#f5f3ff);border:1px solid #e0e7ff}
  .why-col h3{font-size:.9rem;font-weight:800;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid #f3f4f6}
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
  .how-step h3{font-size:.88rem;font-weight:800;color:#111827;margin-bottom:8px}
  .how-step p{font-size:.78rem;color:#9ca3af;line-height:1.6}

  .lead-magnet-section{padding:80px 5%;background:#f8fafc;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6}
  .lead-magnet-inner{max-width:800px;margin:0 auto;display:flex;align-items:center;gap:48px;flex-wrap:wrap}
  .lead-magnet-text{flex:1;min-width:260px}
  .lead-magnet-badge{display:inline-flex;align-items:center;gap:6px;background:#fef3c7;border:1px solid #fde68a;color:#92400e;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;padding:5px 12px;border-radius:100px;margin-bottom:14px}
  .lead-magnet-title{font-size:1.6rem;font-weight:900;color:#0f172a;letter-spacing:-.5px;line-height:1.2;margin-bottom:10px}
  .lead-magnet-sub{font-size:.88rem;color:#6b7280;line-height:1.7}
  .lead-magnet-cta{flex-shrink:0}
  .lead-magnet-note{font-size:.75rem;color:#9ca3af;margin-top:8px;text-align:center}

  .urgency-section{padding:80px 5%;background:#fff}
  .urgency-inner{max-width:840px;margin:0 auto}
  .urgency-box{background:#0f172a;border-radius:16px;padding:40px 48px;text-align:center;margin-bottom:20px;position:relative;overflow:hidden}
  .urgency-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,.12) 0%,transparent 65%);pointer-events:none}
  .urgency-pulse{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#fca5a5;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:100px;margin-bottom:16px}
  .urgency-pulse::before{content:'';width:7px;height:7px;background:#ef4444;border-radius:50%;animation:pulse 1.5s infinite}
  .urgency-box h3{color:#fff;font-size:1.3rem;font-weight:900;margin-bottom:10px;letter-spacing:-.5px}
  .urgency-spots{display:flex;justify-content:center;gap:8px;margin-bottom:16px}
  .spot{width:36px;height:8px;border-radius:100px}
  .spot.taken{background:#ef4444}
  .spot.free{background:rgba(255,255,255,.15)}
  .urgency-box p{color:rgba(255,255,255,.5);font-size:.85rem;line-height:1.65;max-width:480px;margin:0 auto}
  .guarantee-box{background:#f0fdf4;border-radius:14px;padding:24px 32px;display:flex;gap:16px;align-items:flex-start;border:1px solid #bbf7d0}
  .guarantee-icon{font-size:1.4rem;flex-shrink:0;margin-top:2px}
  .guarantee-box strong{display:block;color:#166534;font-size:.88rem;font-weight:800;margin-bottom:4px}
  .guarantee-box p{color:#166534;font-size:.82rem;margin:0;line-height:1.6;opacity:.8}

  .founder-note{padding:70px 5%;background:#fff}
  .founder-card{max-width:820px;margin:0 auto;background:#f8fafc;border:1px solid #e5e7eb;border-radius:18px;padding:28px 30px}
  .founder-card h3{font-size:1rem;font-weight:900;color:#111827;margin-bottom:10px}
  .founder-card p{font-size:.88rem;color:#6b7280;line-height:1.7}

  .cta-section{padding:120px 5%;background:linear-gradient(160deg,#0d1a3a 0%,#111827 100%);position:relative;overflow:hidden;text-align:center}
  .cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(99,102,241,.1) 0%,transparent 65%);pointer-events:none}
  .cta-section h2{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;letter-spacing:-1px;margin-bottom:16px;position:relative}
  .cta-section p{font-size:.95rem;color:rgba(255,255,255,.58);max-width:620px;margin:0 auto 48px;line-height:1.7;position:relative}
  .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative}
  .cta-phone{margin-top:48px;color:rgba(255,255,255,.35);font-size:.82rem;position:relative}
  .cta-phone strong{color:#60a5fa;display:block;font-size:1.05rem;margin-top:8px;font-weight:800}

  @media(max-width:1024px){
    .hero-container{grid-template-columns:1fr;gap:60px}
    .hero-mockup-wrap{max-width:520px;margin:0 auto}
    .hero-checks{grid-template-columns:1fr}
    .pricing-grid,.demo-grid,.difference-grid{grid-template-columns:1fr;max-width:520px;margin:0 auto}
    .solution-grid,.why-grid{grid-template-columns:1fr;max-width:560px;margin:0 auto}
    .results-row{grid-template-columns:1fr 1fr}
    .results-row .result-item:nth-child(2){border-right:none}
    .results-row .result-item:nth-child(3){border-right:none;border-top:1px solid #f3f4f6;grid-column:1/-1}
    .how-steps{grid-template-columns:1fr 1fr;gap:32px}
    .how-steps::before{display:none}
  }
  @media(max-width:768px){
    .hero{padding:100px 5% 70px;min-height:auto}
    .hero h1{font-size:2.3rem}
    .hero-ctas{flex-direction:column}
    .hero-ctas a{width:100%;text-align:center}
    .btn-primary,.btn-ghost,.btn-wa,.btn-lead{padding:13px 20px;font-size:.88rem}
    .problem-grid,.difference-grid,.demo-grid{grid-template-columns:1fr}
    .pricing-card{padding:32px 24px}
    .p-price{font-size:2.4rem}
    .how-steps{grid-template-columns:1fr}
    .trust-items{gap:20px}
    .urgency-box{padding:28px 20px}
    .cta-section{padding:80px 5%}
    .results-row{grid-template-columns:1fr;border-radius:16px}
    .result-item{border-right:none;border-bottom:1px solid #f3f4f6;padding:28px}
    .result-item:last-child{border-bottom:none}
    .problem-section,.difference-section,.demo-section,.solution-section,.results-section,.pricing-section,.roi-section,.why-section,.how-section,.urgency-section{padding:80px 5%}
  }
  @media(max-width:640px){
    .lead-magnet-inner{flex-direction:column;gap:24px;text-align:center}
    .lead-magnet-cta{width:100%}
    .btn-lead{display:block;text-align:center}
  }
  @media(max-width:480px){
    .hero h1{font-size:1.9rem;letter-spacing:-.8px}
    .hero-sub{font-size:.92rem}
    .hero-social-proof{flex-direction:column;align-items:flex-start;gap:10px}
    .problem-section,.difference-section,.demo-section,.solution-section,.results-section,.pricing-section,.roi-section,.why-section,.how-section,.urgency-section{padding:60px 5%}
    .trusted-inner{gap:12px}
    .guarantee-box{flex-direction:column;gap:10px;padding:20px}
    .cta-section h2{font-size:1.8rem}
    .section-header{margin-bottom:40px}
  }
`;

const HERO_CHECKS = [
  "Website, hosting en onderhoud onder één partij",
  "Gebouwd om contact, aanvragen of afspraken makkelijker te maken",
  "Snelle livegang zonder technisch gedoe aan jouw kant",
  "Later uitbreidbaar met extra pagina’s of functionaliteit",
];

const TRUSTED_BY = ["Kappers", "Restaurants", "Klusbedrijven", "Schoonheidssalons", "Fotografen", "ZZP'ers"];

const PROBLEMS = [
  [
    "🔍",
    "Je eerste indruk gebeurt online",
    "Voor veel lokale ondernemers is de website het eerste serieuze contactmoment. Als die niet duidelijk of professioneel voelt, verlies je al vertrouwen voordat iemand belt of appt.",
  ],
  [
    "📱",
    "Een verouderde site kost je aanvragen",
    "Een website die traag, rommelig of verouderd oogt, laat bezoekers sneller afhaken. Zeker op mobiel wordt daar hard op afgerekend.",
  ],
  [
    "📞",
    "Te weinig sturing naar actie",
    "Als bellen, WhatsAppen, reserveren of aanvragen niet duidelijk genoeg naar voren komt, verdwijnt interesse zonder dat je het merkt.",
  ],
  [
    "🛠️",
    "Na oplevering begint vaak het gedoe",
    "Hosting, updates, domeinbeheer en kleine wijzigingen zijn precies de dingen waar ondernemers geen tijd voor willen vrijmaken.",
  ],
];

const DIFFERENCE_POINTS = [
  [
    "01",
    "Niet alleen een mooie site",
    "Vedantix positioneert je website als praktisch verkoopmiddel: duidelijk, snel en gericht op contact, aanvragen of afspraken.",
  ],
  [
    "02",
    "Geen losse technische puzzel",
    "Je hoeft niet zelf hosting, domein, updates en support te coördineren. Dat blijft op één plek geregeld.",
  ],
  [
    "03",
    "Snel aanpasbaar als je groeit",
    "Nieuwe pagina, extra dienst, formulier of uitbreiding nodig? Het model is juist ingericht om vlot door te ontwikkelen.",
  ],
];

const DEMOS = [
  {
    tone: "barber",
    label: "Demo concept",
    title: "Barbershop / kapper",
    subtitle: "Voor ondernemers die meer afspraken en een sterkere eerste indruk willen.",
    bullets: [
      "Hero met directe CTA naar afspraak of WhatsApp",
      "Prijslijst en behandelingen overzichtelijk in beeld",
      "Mobiel eerst ontworpen voor snelle actie",
      "Galerij en openingstijden duidelijk zichtbaar",
    ],
    outcome: "Sterk voor kappers en barbershops die professioneel willen ogen zonder onnodige complexiteit.",
  },
  {
    tone: "restaurant",
    label: "Demo concept",
    title: "Restaurant / food concept",
    subtitle: "Voor zaken die sfeer willen tonen én reserveringen of contact willen stimuleren.",
    bullets: [
      "Visuele homepage met menukaart en sfeerbeelden",
      "CTA naar reserveren, bellen of route",
      "Secties voor reviews, openingstijden en specials",
      "Heldere opbouw voor mobiel gebruik onderweg",
    ],
    outcome: "Geschikt voor restaurants, lunchrooms en afhaalconcepten die beter zichtbaar willen zijn.",
  },
  {
    tone: "salon",
    label: "Demo concept",
    title: "Salon / beauty",
    subtitle: "Voor salons die rust, kwaliteit en vertrouwen willen uitstralen.",
    bullets: [
      "Rustige premium uitstraling met duidelijke diensten",
      "CTA’s voor intake, WhatsApp en offerte",
      "Ruimte voor behandelingen, FAQ en resultaten",
      "Later uit te breiden met reserveringen of intakeflows",
    ],
    outcome: "Sterk voor schoonheidssalons en andere servicebedrijven die professioneel willen overkomen.",
  },
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
  ["Meer vertrouwen", "Een website die professioneler en duidelijker overkomt"],
  ["Meer actie", "Sterkere focus op bellen, WhatsAppen of aanvragen"],
  ["Meer rust", "Onderhoud, updates en support blijven geregeld"],
];

const PACKAGES = [
  {
    tier: "Starter",
    name: "Voor professioneel online zichtbaar zijn",
    subtitle: "Sterke basis voor ondernemers die vooral een nette en goed beheerde website willen.",
    price: "99",
    setup: "€500 eenmalige setup",
    featured: false,
    bullets: [
      "Professionele website",
      "1 domein, hosting en SSL",
      "1 mailbox",
      "Contactformulier",
      "Basis analytics en basis SEO",
    ],
    note: "Geen database, login of complexe reserveringsmodule standaard inbegrepen.",
    cta: "Plan kennismaking →",
  },
  {
    tier: "Growth",
    name: "Voor meer inhoud en groeiruimte",
    subtitle: "Voor bedrijven die hun website serieuzer willen inzetten als online basis.",
    price: "149",
    setup: "€750 eenmalige setup",
    featured: true,
    bullets: [
      "Alles uit Starter",
      "5 mailboxen",
      "Blog/FAQ module",
      "Light formulieren-opslag",
      "Meer servicepagina’s en SEO templates",
    ],
    note: "Geschikt als je meer structuur, inhoud en uitbreidbaarheid wilt.",
    cta: "Plan kennismaking →",
  },
  {
    tier: "Pro",
    name: "Voor functionaliteit en doorontwikkeling",
    subtitle: "Voor bedrijven die meer nodig hebben dan een standaard informatieve site.",
    price: "249",
    setup: "€1000 eenmalige setup",
    featured: false,
    bullets: [
      "Alles uit Growth",
      "10 mailboxen",
      "Login en dashboard",
      "Reserveringen / intake / workflows",
      "Data-opslag en technische monitoring",
    ],
    note: "Voor websites die een serieuzer onderdeel van je bedrijfsproces worden.",
    cta: "Plan kennismaking →",
  },
];

const PACKAGE_DETAILS = {
  starter: {
    included: [
      "Professionele website",
      "1 domein",
      "Hosting",
      "SSL-certificaat",
      "DNS-beheer",
      "1 mailbox",
      "Contactformulier",
      "Basis analytics",
      "Basis SEO-profiel",
      "Handmatige redeploy via admin portal",
    ],
    notIncluded: [
      "Geen database standaard",
      "Geen login/auth",
      "Geen dashboard",
      "Geen maatwerk backend",
      "Geen complex reserveringssysteem",
    ],
    addons: [
      "Extra mailboxbundels",
      "Local SEO uitbreiding",
      "Blog/FAQ module",
      "Light formulieren-opslag",
      "Eenvoudige reserveringswidget van derde partij",
    ],
  },
  growth: {
    included: [
      "Alles uit Starter",
      "5 mailboxen",
      "Blog/FAQ module",
      "Formulieren met opslag (light)",
      "Uitgebreidere SEO templates",
      "Meerdere servicepagina’s",
    ],
    notIncluded: [
      "Geen zware database standaard",
      "Geen complex login/dashboard standaard",
      "Geen uitgebreide maatwerkfunctionaliteit standaard",
    ],
    addons: [
      "Reserveringsmodule",
      "Database light",
      "Extra mailboxbundels",
      "Extra landingspagina’s",
    ],
  },
  pro: {
    included: [
      "Alles uit Growth",
      "10 mailboxen",
      "Maatwerk functionaliteit mogelijk",
      "Data-opslag voor formulieren en workflows inbegrepen",
      "Login/auth",
      "Dashboardfunctionaliteit",
      "Reserveringen / intake / workflowmodules",
      "Technische monitoring op de achtergrond",
    ],
    addons: [
      "PostgreSQL / RDS premium add-on",
      "Extra mailboxbundels",
      "Extra data/storage bundels",
      "Security add-on zoals WAF",
    ],
  },
};

const PACKAGE_BASICS = [
  "Professionele website",
  "Hosting geregeld",
  "Domein en DNS geregeld",
  "SSL geregeld",
  "Onderhoud en support vanuit één partij",
  "Geen technisch gedoe voor de klant",
  "Duidelijke vaste structuur",
];

const MAILBOX_BUNDLES = [
  "Starter: 1 mailbox inbegrepen",
  "Growth: 5 mailboxen inbegrepen",
  "Pro: 10 mailboxen inbegrepen",
  "Extra mailboxen als bundels: +1, +5 of +10",
  "Aliassen zoals info@, hello@ of noreply@ kunnen slim worden ingezet om kosten beter beheersbaar te houden",
];

const DATA_RULES = [
  "Starter: standaard geen database",
  "Growth: light data-opslag als add-on",
  "Pro: serverless data standaard inbegrepen",
  "PostgreSQL / RDS alleen als premium add-on",
  "Werk altijd met limieten op opslag, requests en retention",
];

const MOCKUP_SERVICES = [
  ["✂️", "Knippen", "vanaf €18"],
  ["🧔", "Baardverzorging", "vanaf €12"],
  ["💈", "Fade & Styling", "vanaf €22"],
];

const TRUST_ITEMS = [
  ["✔", "Duidelijke maandprijs"],
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
  ["1", "Kennismaking", "We bespreken kort je bedrijf, doelgroep en wat je website praktisch moet doen."],
  ["2", "Ontwerp & opbouw", "Wij bouwen een professionele basis die past bij jouw branche en uitstraling."],
  ["3", "Livegang", "We zetten je website netjes live en zorgen dat alles technisch goed staat."],
  ["4", "Onderhoud & updates", "Na livegang blijven we betrokken voor beheer, kleine wijzigingen en doorontwikkeling."],
];

const URGENCY_SPOTS = [1, 2, 3, 4, 5];
const CTA_META = [
  "Vrijblijvende kennismaking",
  "Heldere maandprijs",
  "Onderhoud inbegrepen",
  "Snel schakelen via WhatsApp",
];

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
                <div className="hero-eyebrow">Voor kappers, salons, restaurants en lokale bedrijven</div>
                <h1>
                  Een website die <span>professioneel oogt</span>
                  <br />
                  en sneller tot actie leidt
                </h1>
                <p className="hero-sub">
                  Vedantix bouwt websites voor lokale ondernemers die <strong>duidelijker, sterker en makkelijker benaderbaar</strong> willen zijn.
                  Jij focust op je bedrijf, wij regelen de techniek, hosting, onderhoud en doorlopende ondersteuning.
                </p>
                <div className="hero-microcopy">Geen lange trajecten. Geen technisch gedoe. Wel een site die beter voor je werkt.</div>

                <div className="hero-checks">
                  {HERO_CHECKS.map((item) => (
                    <div key={item} className="hero-check">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="hero-ctas">
                  <a href="#cta" className="btn-primary">
                    Plan gratis kennismaking →
                  </a>
                  <a href="#demo" className="btn-ghost">
                    Bekijk demo concepten →
                  </a>
                  <a
                    href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20kennismaking%20voor%20mijn%20website."
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wa"
                  >
                    💬 Start via WhatsApp
                  </a>
                </div>
                <div className="hero-cta-note">Vrijblijvend gesprek · heldere pakketten · ook geschikt als je nog niet precies weet wat je nodig hebt</div>

                <div className="hero-social-proof">
                  <div>
                    <div className="hero-sp-stat">Duidelijk</div>
                    <div className="hero-sp-text">Sterkere boodschap en betere structuur</div>
                  </div>
                  <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)" }} />
                  <div>
                    <div className="hero-sp-stat">Praktisch</div>
                    <div className="hero-sp-text">Gebouwd voor contact, aanvragen en afspraken</div>
                  </div>
                  <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)" }} />
                  <div>
                    <div className="hero-sp-stat">Onderhouden</div>
                    <div className="hero-sp-text">Niet alleen opleveren, maar ook blijven beheren</div>
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

                <p style={{ marginTop: 16, fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textAlign: "center", fontWeight: 600 }}>
                  Demo mockup • bedoeld om richting en stijl te laten zien
                </p>
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
                <h2 className="section-h2">De meeste websites van lokale ondernemers laten kansen liggen</h2>
                <p className="section-p">
                  Niet omdat het bedrijf niet goed is, maar omdat de website te weinig vertrouwen opwekt, te weinig richting geeft en na oplevering vaak stil blijft staan.
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

          <section className="difference-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Waarom Vedantix</div>
                <h2 className="section-h2">Zo onderscheid je je van standaard webbouwers</h2>
                <p className="section-p">
                  Niet concurreren op alleen “mooie websites”, maar op duidelijkheid, snelheid, onderhoud en praktische waarde voor de ondernemer.
                </p>
              </div>

              <div className="difference-grid">
                {DIFFERENCE_POINTS.map(([icon, title, text]) => (
                  <div key={title} className="difference-card">
                    <div className="difference-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="demo" className="demo-section anchor-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Demo concepten</div>
                <h2 className="section-h2">Voorbeelden van richtingen die wij kunnen bouwen</h2>
                <p className="section-p">
                  Omdat je nog geen klantcases hebt, moet je wél laten zien wat voor type websites je kunt neerzetten. Deze demo’s vullen dat gat op.
                </p>
              </div>

              <div className="demo-grid">
                {DEMOS.map((demo) => (
                  <div key={demo.title} className="demo-card">
                    <div className={`demo-top ${demo.tone}`}>
                      <div className="demo-badge">{demo.label}</div>
                      <div className="demo-title">{demo.title}</div>
                      <div className="demo-sub">{demo.subtitle}</div>
                    </div>
                    <div className="demo-body">
                      <ul className="demo-list">
                        {demo.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <div className="demo-outcome">{demo.outcome}</div>
                      <a href="#cta" className="demo-cta">Ik wil ook zo’n richting →</a>
                    </div>
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
                  <h3>→ Wat je niet meer hoeft te doen</h3>
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
                <h2 className="section-h2">Wat dit model je oplevert</h2>
                <p className="section-p">
                  Niet alleen een nette site, maar vooral een sterkere eerste indruk, meer richting naar actie en minder technisch gedoe na livegang.
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

          <section id="pricing" className="pricing-section anchor-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Pakketten</div>
                <h2 className="section-h2">Kies het pakket dat bij jouw bedrijf past</h2>
                <p className="section-p">
                  Heldere maandprijzen, eenmalige setup en ruimte om later op te schalen met add-ons of extra functionaliteit.
                </p>
              </div>

              <div className="pricing-grid">
                {PACKAGES.map((pkg) => (
                  <div key={pkg.tier} className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
                    {pkg.featured && <div className="pricing-badge">Meest gekozen</div>}

                    <div className="p-tier">{pkg.tier}</div>
                    <div className="p-name">{pkg.name}</div>
                    <div className="p-sub">{pkg.subtitle}</div>

                    <div className="p-price">
                      <sup>€</sup>
                      {pkg.price}
                      <span>/m</span>
                    </div>
                    <div className="p-setup">+ {pkg.setup}</div>

                    <div className="p-divider" />

                    <ul className="p-features">
                      {pkg.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <p className="p-note" style={pkg.featured ? { color: "#6366f1" } : undefined}>
                      {pkg.note}
                    </p>

                    <a href="#cta" className={`p-cta ${pkg.featured ? "featured" : "default"}`}>
                      {pkg.cta}
                    </a>
                  </div>
                ))}
              </div>

              <div className="pricing-position">
                <strong>Belangrijk voor je prijspositionering</strong>
                <p>
                  Je huidige prijsniveau is verdedigbaar zolang je niet verkoopt als “alleen een website”, maar als een combinatie van website + hosting + onderhoud + snelle hulp + doorontwikkeling. Voor veel kleine ondernemers is €300 per maand inderdaad te hoog als de waarde niet concreet voelt. €99–€149 is psychologisch veel makkelijker te verkopen. De stap naar €249 moet je daarom alleen koppelen aan duidelijke extra functionaliteit of bedrijfswaarde.
                </p>
              </div>

              <div className="pricing-details">
                <details>
                  <summary className="pricing-summary">Starter — volledige inhoud bekijken</summary>
                  <div className="pricing-details-content">
                    <strong>Inbegrepen</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 12px" }}>
                      {PACKAGE_DETAILS.starter.included.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                    <strong>Niet inbegrepen</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 12px" }}>
                      {PACKAGE_DETAILS.starter.notIncluded.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                    <strong>Mogelijke add-ons</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 0" }}>
                      {PACKAGE_DETAILS.starter.addons.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details>
                  <summary className="pricing-summary">Growth — volledige inhoud bekijken</summary>
                  <div className="pricing-details-content">
                    <strong>Inbegrepen</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 12px" }}>
                      {PACKAGE_DETAILS.growth.included.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                    <strong>Niet standaard inbegrepen</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 12px" }}>
                      {PACKAGE_DETAILS.growth.notIncluded.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                    <strong>Mogelijke add-ons</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 0" }}>
                      {PACKAGE_DETAILS.growth.addons.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details>
                  <summary className="pricing-summary">Pro — volledige inhoud bekijken</summary>
                  <div className="pricing-details-content">
                    <strong>Inbegrepen</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 12px" }}>
                      {PACKAGE_DETAILS.pro.included.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                    <strong>Mogelijke add-ons</strong>
                    <ul style={{ paddingLeft: 18, margin: "8px 0 0" }}>
                      {PACKAGE_DETAILS.pro.addons.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details>
                  <summary className="pricing-summary">Belangrijke nuance over mailboxen</summary>
                  <div className="pricing-details-content">
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {MAILBOX_BUNDLES.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details>
                  <summary className="pricing-summary">Belangrijke nuance over database en data-opslag</summary>
                  <div className="pricing-details-content">
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {DATA_RULES.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details>
                  <summary className="pricing-summary">Wat in alle pakketten centraal staat</summary>
                  <div className="pricing-details-content">
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {PACKAGE_BASICS.map((item) => (
                        <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>

              <div className="pricing-help">
                Twijfel je tussen twee pakketten? Kies de basis die nu past — uitbreiden kan later altijd.
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
                <div className="roi-block" style={{ textAlign: "right" }}>
                  <div className="roi-value invest">
                    Vast
                    <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#9ca3af" }}> per maand</span>
                  </div>
                  <div className="roi-block-label">Duidelijke kosten</div>
                </div>

                <div className="roi-divider">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="roi-arrow-line" />
                    <div className="roi-arrow-head" />
                  </div>
                </div>

                <div className="roi-block" style={{ textAlign: "left" }}>
                  <div className="roi-value gain">
                    Rust
                    <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#86efac" }}> & continuïteit</span>
                  </div>
                  <div className="roi-block-label">Doorlopend geregeld</div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 32 }}>
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
                <p className="section-p">Vier duidelijke stappen van kennismaking tot livegang en onderhoud.</p>
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
                <div className="lead-magnet-title">Ontvang een eerlijke scan van je huidige website</div>
                <div className="lead-magnet-sub">
                  We kijken vrijblijvend naar je online presentatie en laten concreet zien waar winst zit in duidelijkheid,
                  uitstraling, mobiele gebruikservaring en CTA’s.
                </div>
              </div>

              <div className="lead-magnet-cta">
                <a
                  href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20gratis%20website%20scan."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lead"
                >
                  Vraag gratis website scan aan →
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
                <p>Zo houden we ruimte voor kwaliteit, snelle communicatie en doorlopende aandacht na livegang.</p>
              </div>

              <div className="guarantee-box">
                <div className="guarantee-icon">🤝</div>
                <div>
                  <strong>Vrijblijvend kennismaken</strong>
                  <p>Eerst bespreken we rustig wat bij jouw bedrijf past. Pas daarna beslis je of je verder wilt.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="founder-note">
            <div className="founder-card">
              <h3>Net gestart? Dan is eerlijkheid sterker dan geforceerde social proof.</h3>
              <p>
                Omdat er nog geen klantcases of reviews zijn, is het slimmer om demo’s, heldere uitleg en een sterke eerste indruk te gebruiken als vertrouwenstriggers. Voeg zodra je eerste projecten live staan direct screenshots, korte resultaten en echte klantreacties toe. Tot die tijd werkt transparantie beter dan lege claims.
              </p>
            </div>
          </section>

          <section id="cta" className="cta-section anchor-section">
            <h2>Klaar om je website professioneler en duidelijker neer te zetten?</h2>
            <p>
              Plan een vrijblijvende kennismaking en ontdek welk pakket, welke stijl en welke richting het beste past bij jouw bedrijf.
            </p>

            <div className="cta-btns">
              <a
                href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20een%20vrijblijvende%20kennismaking%20voor%20mijn%20website."
                target="_blank"
                rel="noreferrer"
                className="btn-wa"
              >
                💬 Plan gratis kennismaking
              </a>
              <a href="#demo" className="btn-primary">
                Bekijk eerst demo’s →
              </a>
            </div>

            <div
              style={{
                marginTop: 32,
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              {CTA_META.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#22c55e" }}>✓</span> {item}
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
