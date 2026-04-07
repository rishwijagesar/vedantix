import { useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import BigFooter from "../components/BigFooter";
import NicheCarousel from "./NicheCarousel";
import HomeHero, { HOME_HERO_STYLES } from "./HomeHero";

const HOME_STYLES = `
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{margin:0;padding:0}

  .home-page{
    font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    color:#111827;
    background:#fff;
    line-height:1.6;
    overflow-x:hidden
  }

  .anchor-section{scroll-margin-top:100px}

  .section-wrap{max-width:1140px;margin:0 auto;width:100%}
  .section-header{
    max-width:760px;
    margin-bottom:56px;
    text-align:left
  }
  .section-header.centered{
    margin-left:auto;
    margin-right:auto;
    text-align:center
  }
  .section-header.centered .section-p{
    margin-left:auto;
    margin-right:auto
  }

  .section-h2{
    font-size:clamp(1.95rem,3vw,2.75rem);
    font-weight:900;
    color:#111827;
    letter-spacing:-.8px;
    line-height:1.15;
    margin-bottom:14px
  }

  .section-p{
    font-size:.96rem;
    color:#6b7280;
    line-height:1.75;
    max-width:680px
  }

  .section-label{
    font-size:.72rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:2px;
    color:#6366f1;
    margin-bottom:14px
  }

  .btn-lead{
    background:#0f172a;
    color:#fff;
    padding:15px 28px;
    border-radius:10px;
    font-weight:800;
    font-size:.92rem;
    text-decoration:none;
    display:inline-block;
    transition:all .2s;
    box-shadow:0 4px 16px rgba(0,0,0,.15)
  }

  .btn-lead:hover{
    background:#1e293b;
    transform:translateY(-2px);
    box-shadow:0 8px 24px rgba(0,0,0,.2)
  }

  .btn-outline{
    background:#fff;
    color:#111827;
    padding:14px 22px;
    border-radius:10px;
    border:1px solid #e5e7eb;
    font-weight:800;
    font-size:.88rem;
    text-decoration:none;
    display:inline-block;
    transition:all .2s
  }

  .btn-outline:hover{
    background:#f8fafc;
    border-color:#cbd5e1
  }

  .trusted{
    background:#f9fafb;
    padding:22px 5%;
    border-bottom:1px solid #f3f4f6;
    margin-top:0
  }

  .trusted-inner{
    max-width:1100px;
    margin:0 auto;
    display:flex;
    align-items:center;
    gap:24px;
    flex-wrap:wrap
  }

  .trusted-label{
    font-size:.72rem;
    font-weight:700;
    color:#9ca3af;
    text-transform:uppercase;
    letter-spacing:1px;
    white-space:nowrap;
    margin-right:8px
  }

  .trusted-pill{
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:8px;
    padding:7px 14px;
    font-size:.78rem;
    font-weight:700;
    color:#6b7280
  }

  .niche-fit-section{
    padding:96px 5%;
    background:#fff
  }

  .niche-fit-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:18px;
    margin-top:28px
  }

  .niche-fit-card{
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:20px;
    padding:24px;
    transition:all .25s;
    cursor:pointer
  }

  .niche-fit-card:hover{
    transform:translateY(-2px);
    box-shadow:0 12px 30px rgba(15,23,42,.06);
    border-color:#c7d2fe
  }

  .niche-fit-card.active{
    border-color:#6366f1;
    background:linear-gradient(160deg,#fafbff,#f5f3ff);
    box-shadow:0 16px 36px rgba(99,102,241,.1)
  }

  .niche-fit-top{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
    margin-bottom:14px
  }

  .niche-fit-name{
    font-size:1rem;
    font-weight:900;
    color:#111827
  }

  .niche-fit-icon{
    width:42px;
    height:42px;
    border-radius:12px;
    background:#eef2ff;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.1rem
  }

  .niche-fit-problem{
    font-size:.84rem;
    color:#6b7280;
    line-height:1.7;
    margin-bottom:16px
  }

  .niche-fit-tag{
    display:inline-flex;
    align-items:center;
    padding:7px 12px;
    border-radius:999px;
    background:#eef2ff;
    color:#4338ca;
    font-size:.73rem;
    font-weight:800;
    margin-bottom:12px
  }

  .niche-fit-link{
    display:inline-flex;
    align-items:center;
    gap:6px;
    text-decoration:none;
    color:#6366f1;
    font-size:.84rem;
    font-weight:800
  }

  .niche-highlight{
    margin-top:28px;
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:24px;
    padding:30px;
    display:grid;
    grid-template-columns:1.15fr .85fr;
    gap:24px;
    align-items:start
  }

  .niche-highlight-box{
    background:#f8fafc;
    border:1px solid #e5e7eb;
    border-radius:18px;
    padding:22px
  }

  .niche-highlight-box h3{
    font-size:1rem;
    font-weight:900;
    color:#111827;
    margin-bottom:8px
  }

  .niche-highlight-box p{
    font-size:.88rem;
    color:#6b7280;
    line-height:1.75
  }

  .niche-highlight-points{
    display:flex;
    flex-direction:column;
    gap:10px;
    margin-top:14px
  }

  .niche-highlight-point{
    display:flex;
    gap:10px;
    align-items:flex-start;
    font-size:.84rem;
    color:#374151;
    line-height:1.6
  }

  .niche-highlight-point::before{
    content:'✓';
    color:#6366f1;
    font-weight:900;
    flex-shrink:0
  }

  .niche-highlight-cta{
    display:flex;
    flex-direction:column;
    gap:12px
  }

  .niche-highlight-note{
    font-size:.8rem;
    color:#9ca3af;
    line-height:1.6
  }

  .problem-section{
    padding:96px 5%;
    background:#f8fafc
  }

  .problem-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:16px
  }

  .problem-card{
    padding:32px 28px;
    background:#fff;
    border:1px solid #f3f4f6;
    border-radius:16px;
    transition:all .25s
  }

  .problem-card:hover{
    box-shadow:0 8px 32px rgba(0,0,0,.06);
    transform:translateY(-2px)
  }

  .problem-icon{
    font-size:1.6rem;
    margin-bottom:14px
  }

  .problem-card h3{
    font-size:1rem;
    font-weight:800;
    color:#111827;
    margin-bottom:8px
  }

  .problem-card p{
    font-size:.86rem;
    color:#6b7280;
    line-height:1.7
  }

  .difference-section{
    padding:96px 5%;
    background:#fff
  }

  .difference-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px
  }

  .difference-card{
    background:linear-gradient(180deg,#ffffff,#fafbff);
    border:1px solid #eef2ff;
    border-radius:18px;
    padding:28px 24px;
    box-shadow:0 8px 32px rgba(99,102,241,.04)
  }

  .difference-icon{
    width:42px;
    height:42px;
    border-radius:12px;
    background:#eef2ff;
    color:#6366f1;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.1rem;
    font-weight:800;
    margin-bottom:16px
  }

  .difference-card h3{
    font-size:.98rem;
    font-weight:800;
    color:#111827;
    margin-bottom:8px
  }

  .difference-card p{
    font-size:.86rem;
    color:#6b7280;
    line-height:1.7
  }

  .pricing-section{
    padding:88px 5%;
    background:#fff
  }

  .pricing-intro{
    max-width:760px;
    margin:0 auto 14px;
    text-align:center
  }

  .pricing-kicker{
    display:inline-block;
    margin-bottom:12px;
    padding:8px 14px;
    border-radius:999px;
    background:#eef2ff;
    color:#4338ca;
    font-size:.72rem;
    font-weight:800;
    letter-spacing:1px;
    text-transform:uppercase
  }

  .pricing-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:18px;
    align-items:stretch
  }

  .pricing-card{
    border-radius:22px;
    padding:28px 24px;
    border:1.5px solid #eceff5;
    transition:all .25s;
    position:relative;
    background:#fff;
    display:flex;
    flex-direction:column;
    min-height:100%
  }

  .pricing-card:hover{
    border-color:#dbe4ff;
    box-shadow:0 18px 46px rgba(99,102,241,.08);
    transform:translateY(-2px)
  }

  .pricing-card.featured{
    border-color:#6366f1;
    background:linear-gradient(160deg,#fafbff,#f4f3ff);
    box-shadow:0 20px 56px rgba(99,102,241,.14)
  }

  .pricing-badge{
    position:absolute;
    top:-12px;
    left:50%;
    transform:translateX(-50%);
    background:linear-gradient(135deg,#6366f1,#8b5cf6);
    color:#fff;
    padding:5px 16px;
    border-radius:999px;
    font-weight:800;
    font-size:.67rem;
    text-transform:uppercase;
    letter-spacing:1px;
    white-space:nowrap;
    box-shadow:0 4px 12px rgba(99,102,241,.3)
  }

  .p-tier{
    font-size:.68rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.5px;
    color:#9ca3af;
    margin-bottom:8px
  }

  .pricing-card.featured .p-tier{
    color:#6366f1
  }

  .p-name{
    font-size:1.22rem;
    font-weight:900;
    color:#111827;
    letter-spacing:-.5px;
    line-height:1.2;
    margin-bottom:10px
  }

  .p-fit{
    display:inline-flex;
    align-items:center;
    padding:8px 12px;
    border-radius:999px;
    background:#f8fafc;
    border:1px solid #e5e7eb;
    color:#475569;
    font-size:.72rem;
    font-weight:800;
    line-height:1.45;
    margin-bottom:18px
  }

  .pricing-card.featured .p-fit{
    background:#eef2ff;
    border-color:#c7d2fe;
    color:#4338ca
  }

  .p-price-row{
    display:flex;
    align-items:flex-end;
    gap:10px;
    margin-bottom:8px
  }

  .p-price{
    font-size:3rem;
    font-weight:900;
    color:#111827;
    letter-spacing:-2px;
    line-height:1
  }

  .p-price sup{
    font-size:1rem;
    font-weight:700;
    vertical-align:super;
    letter-spacing:0
  }

  .p-price span{
    font-size:.96rem;
    font-weight:700;
    color:#9ca3af;
    letter-spacing:0
  }

  .p-setup{
    font-size:.78rem;
    color:#94a3b8;
    font-weight:700;
    margin-bottom:14px
  }

  .p-terms{
    margin-bottom:18px;
    padding:10px 12px;
    border-radius:12px;
    background:#f8fafc;
    border:1px solid #e5e7eb;
    font-size:.74rem;
    color:#475569;
    line-height:1.5;
    font-weight:700
  }

  .pricing-card.featured .p-terms{
    background:#eef2ff;
    border-color:#c7d2fe;
    color:#4338ca
  }

  .p-divider{
    height:1px;
    background:#eef2f7;
    margin-bottom:18px
  }

  .pricing-card.featured .p-divider{
    background:#dbe4ff
  }

  .p-features{
    list-style:none;
    padding:0;
    margin:0 0 20px 0;
    display:flex;
    flex-direction:column;
    gap:10px;
    flex:1
  }

  .p-features li{
    font-size:.83rem;
    color:#475569;
    display:flex;
    gap:8px;
    align-items:flex-start;
    line-height:1.55
  }

  .p-features li::before{
    content:'✓';
    color:#6366f1;
    font-weight:900;
    flex-shrink:0;
    margin-top:1px;
    font-size:.8rem
  }

  .pricing-card.featured .p-features li{
    color:#374151
  }

  .p-cta{
    display:block;
    text-align:center;
    padding:13px;
    border-radius:12px;
    font-weight:800;
    font-size:.88rem;
    text-decoration:none;
    transition:all .25s;
    margin-top:auto
  }

  .p-cta.default{
    background:#f8fafc;
    color:#374151;
    border:1.5px solid #e5e7eb
  }

  .p-cta.default:hover{
    background:#f3f4f6;
    border-color:#d1d5db
  }

  .p-cta.featured{
    background:linear-gradient(135deg,#6366f1,#8b5cf6);
    color:#fff;
    box-shadow:0 4px 16px rgba(99,102,241,.25)
  }

  .p-cta.featured:hover{
    box-shadow:0 8px 24px rgba(99,102,241,.34);
    transform:translateY(-1px)
  }

  .pricing-help{
    margin-top:22px;
    font-size:.84rem;
    color:#6b7280;
    text-align:center
  }

  .pricing-help a{
    color:#6366f1;
    font-weight:800;
    text-decoration:none
  }

  .pricing-help a:hover{
    text-decoration:underline
  }

  .pricing-decision{
    max-width:760px;
    margin:24px auto 0;
    padding:20px 22px;
    border-radius:18px;
    background:#f8fafc;
    border:1px solid #e5e7eb;
    text-align:center
  }

  .pricing-decision h3{
    font-size:1rem;
    font-weight:900;
    color:#111827;
    margin-bottom:8px
  }

  .pricing-decision p{
    font-size:.86rem;
    color:#6b7280;
    line-height:1.7
  }

  .comparison-section{
    padding:96px 5%;
    background:#f9fafb
  }

  .comparison-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px
  }

  .comparison-col{
    border-radius:20px;
    padding:32px 28px
  }

  .comparison-col.self{
    background:#fff;
    border:1px solid #e5e7eb
  }

  .comparison-col.vedantix{
    background:linear-gradient(135deg,#eef2ff,#f5f3ff);
    border:1px solid #c7d2fe
  }

  .comparison-col h3{
    font-size:1rem;
    font-weight:900;
    margin-bottom:18px
  }

  .comparison-col.self h3{color:#9ca3af}
  .comparison-col.vedantix h3{color:#4338ca}

  .comparison-item{
    display:flex;
    gap:10px;
    align-items:flex-start;
    margin-bottom:12px;
    font-size:.84rem;
    line-height:1.6
  }

  .comparison-item:last-child{margin-bottom:0}

  .comparison-col.self .comparison-item{color:#6b7280}
  .comparison-col.vedantix .comparison-item{color:#374151}

  .comparison-col.self .comparison-item::before{
    content:'×';
    color:#f87171;
    font-weight:900;
    flex-shrink:0
  }

  .comparison-col.vedantix .comparison-item::before{
    content:'✓';
    color:#6366f1;
    font-weight:900;
    flex-shrink:0
  }

  .demo-section{
    padding:96px 5%;
    background:#fff
  }

  .how-section{
    padding:96px 5%;
    background:#fff
  }

  .how-steps{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:0;
    margin-top:56px;
    position:relative
  }

  .how-steps::before{
    content:'';
    position:absolute;
    top:24px;
    left:calc(12.5% + 20px);
    right:calc(12.5% + 20px);
    height:1px;
    background:linear-gradient(90deg,#e0e7ff,#c7d2fe,#e0e7ff);
    z-index:0
  }

  .how-step{
    text-align:center;
    padding:0 20px;
    position:relative;
    z-index:1
  }

  .step-num{
    width:48px;
    height:48px;
    background:#fff;
    border:2px solid #e0e7ff;
    border-radius:50%;
    font-size:.95rem;
    font-weight:900;
    color:#6366f1;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0 auto 20px;
    box-shadow:0 4px 12px rgba(99,102,241,.12)
  }

  .how-step h3{
    font-size:.88rem;
    font-weight:800;
    color:#111827;
    margin-bottom:8px
  }

  .how-step p{
    font-size:.78rem;
    color:#9ca3af;
    line-height:1.6
  }

  .results-section{
    padding:96px 5%;
    background:#fff
  }

  .results-row{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:0;
    border:1px solid #f3f4f6;
    border-radius:20px;
    overflow:hidden
  }

  .result-item{
    padding:40px 32px;
    text-align:center;
    border-right:1px solid #f3f4f6
  }

  .result-item:last-child{border-right:none}

  .result-num{
    font-size:2rem;
    font-weight:900;
    color:#111827;
    letter-spacing:-1px;
    margin-bottom:8px;
    line-height:1.1
  }

  .result-label{
    font-size:.84rem;
    color:#6b7280;
    font-weight:600;
    line-height:1.6
  }

  .founder-section{
    padding:96px 5%;
    background:#f9fafb
  }

  .founder-grid{
    max-width:1100px;
    margin:0 auto;
    display:grid;
    grid-template-columns:320px 1fr;
    gap:32px;
    align-items:stretch
  }

  .founder-photo{
    background:linear-gradient(145deg,#e0e7ff,#f5f3ff);
    border:1px solid #e0e7ff;
    border-radius:24px;
    min-height:320px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0;
    overflow:hidden
  }

  .founder-image{
    width:100%;
    height:100%;
    min-height:320px;
    object-fit:cover;
    object-position:center top;
    display:block
  }

  .founder-card{
    background:#fff;
    border:1px solid #eef2ff;
    border-radius:24px;
    padding:40px
  }

  .founder-card p{
    font-size:.95rem;
    color:#4b5563;
    line-height:1.9;
    margin-bottom:16px;
    max-width:680px
  }

  .founder-points{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:12px 18px;
    margin-top:24px
  }

  .founder-point{
    display:flex;
    gap:10px;
    align-items:flex-start;
    font-size:.86rem;
    color:#374151;
    font-weight:600
  }

  .founder-point::before{
    content:'✓';
    color:#6366f1;
    font-weight:900;
    flex-shrink:0
  }

  .founder-mini-testimonial{
    margin-top:28px;
    padding:22px;
    background:linear-gradient(135deg,#f8fafc,#eef2ff);
    border:1px solid #e0e7ff;
    border-radius:20px;
    box-shadow:0 8px 24px rgba(99,102,241,.06)
  }

  .founder-mini-head{
    display:flex;
    align-items:center;
    gap:12px;
    margin-bottom:14px
  }

  .founder-mini-avatar{
    width:56px;
    height:56px;
    border-radius:50%;
    object-fit:cover;
    object-position:center top;
    border:2px solid #fff;
    box-shadow:0 4px 12px rgba(0,0,0,.08);
    flex-shrink:0
  }

  .founder-mini-meta{
    display:flex;
    flex-direction:column;
    gap:2px
  }

  .founder-mini-meta strong{
    font-size:.94rem;
    color:#111827;
    font-weight:800;
    line-height:1.2
  }

  .founder-mini-meta span{
    font-size:.78rem;
    color:#6b7280;
    font-weight:600;
    line-height:1.3
  }

  .founder-mini-quote{
    margin:0;
    font-size:.92rem;
    line-height:1.8;
    color:#374151;
    font-style:italic;
    position:relative
  }

  .founder-mini-quote::before{
    content:'“';
    font-size:2rem;
    line-height:1;
    color:#818cf8;
    font-weight:900;
    margin-right:4px;
    vertical-align:top
  }

  .trust-strip{
    background:#f9fafb;
    border-top:1px solid #f3f4f6;
    border-bottom:1px solid #f3f4f6;
    padding:24px 5%
  }

  .trust-items{
    max-width:1100px;
    margin:0 auto;
    display:flex;
    justify-content:center;
    gap:40px;
    flex-wrap:wrap
  }

  .trust-item{
    display:flex;
    align-items:center;
    gap:8px;
    font-size:.82rem;
    font-weight:700;
    color:#374151
  }

  .trust-icon{font-size:.95rem}

  .roi-section{
    padding:100px 5%;
    background:#fff
  }

  .roi-inner{
    max-width:760px;
    margin:0 auto;
    text-align:center
  }

  .roi-title{
    font-size:clamp(1.8rem,3vw,2.4rem);
    font-weight:900;
    color:#0f172a;
    letter-spacing:-1px;
    line-height:1.15;
    margin-bottom:16px
  }

  .roi-subtitle{
    font-size:.97rem;
    color:#6b7280;
    line-height:1.7;
    max-width:520px;
    margin:0 auto 64px
  }

  .roi-comparison{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:0;
    margin-bottom:48px
  }

  .roi-block{
    flex:1;
    max-width:260px
  }

  .roi-value{
    font-size:clamp(2.4rem,5vw,3.6rem);
    font-weight:900;
    letter-spacing:-2px;
    line-height:1;
    margin-bottom:10px
  }

  .roi-value.invest{color:#0f172a}
  .roi-value.gain{color:#16a34a}

  .roi-block-label{
    font-size:.72rem;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:1.5px;
    color:#9ca3af
  }

  .roi-divider{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:4px;
    padding:0 32px;
    flex-shrink:0
  }

  .roi-arrow-line{
    width:48px;
    height:2px;
    background:linear-gradient(90deg,#e5e7eb,#6366f1)
  }

  .roi-arrow-head{
    width:0;
    height:0;
    border-top:6px solid transparent;
    border-bottom:6px solid transparent;
    border-left:8px solid #6366f1;
    margin-left:-1px
  }

  .roi-bottom-line{
    font-size:1rem;
    font-weight:800;
    color:#0f172a;
    margin-bottom:8px
  }

  .roi-note{
    font-size:.78rem;
    color:#9ca3af
  }

  .why-section{
    padding:96px 5%;
    background:#f9fafb
  }

  .why-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px
  }

  .why-col{
    padding:40px;
    border-radius:18px
  }

  .why-col.old{
    background:#fff;
    border:1px solid #f3f4f6
  }

  .why-col.new{
    background:linear-gradient(135deg,#eef2ff,#f5f3ff);
    border:1px solid #e0e7ff
  }

  .why-col h3{
    font-size:.9rem;
    font-weight:800;
    margin-bottom:20px;
    padding-bottom:14px;
    border-bottom:1px solid #f3f4f6
  }

  .why-col.old h3{color:#9ca3af}

  .why-col.new h3{
    color:#6366f1;
    border-color:#e0e7ff
  }

  .why-li{
    display:flex;
    gap:9px;
    align-items:flex-start;
    margin-bottom:12px;
    font-size:.83rem;
    line-height:1.6
  }

  .why-li:last-child{margin-bottom:0}

  .why-col.old .why-li{color:#9ca3af}
  .why-col.new .why-li{color:#374151}

  .why-col.old .why-li::before{
    content:'×';
    color:#fca5a5;
    font-weight:700;
    flex-shrink:0
  }

  .why-col.new .why-li::before{
    content:'✓';
    color:#6366f1;
    font-weight:700;
    flex-shrink:0
  }

  .lead-magnet-section{
    padding:80px 5%;
    background:#f8fafc;
    border-top:1px solid #f3f4f6;
    border-bottom:1px solid #f3f4f6
  }

  .lead-magnet-inner{
    max-width:860px;
    margin:0 auto;
    display:flex;
    align-items:center;
    gap:48px;
    flex-wrap:wrap
  }

  .lead-magnet-text{
    flex:1;
    min-width:260px
  }

  .lead-magnet-badge{
    display:inline-flex;
    align-items:center;
    gap:6px;
    background:#fef3c7;
    border:1px solid #fde68a;
    color:#92400e;
    font-size:.7rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.5px;
    padding:5px 12px;
    border-radius:100px;
    margin-bottom:14px
  }

  .lead-magnet-title{
    font-size:1.6rem;
    font-weight:900;
    color:#0f172a;
    letter-spacing:-.5px;
    line-height:1.2;
    margin-bottom:10px
  }

  .lead-magnet-sub{
    font-size:.88rem;
    color:#6b7280;
    line-height:1.7
  }

  .lead-magnet-cta{
    flex-shrink:0
  }

  .lead-magnet-note{
    font-size:.75rem;
    color:#9ca3af;
    margin-top:8px;
    text-align:center
  }

  .urgency-section{
    padding:80px 5%;
    background:#fff
  }

  .urgency-inner{
    max-width:840px;
    margin:0 auto
  }

  .urgency-box{
    background:#0f172a;
    border-radius:16px;
    padding:40px 48px;
    text-align:center;
    margin-bottom:20px;
    position:relative;
    overflow:hidden
  }

  .urgency-box::before{
    content:'';
    position:absolute;
    inset:0;
    background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,.12) 0%,transparent 65%);
    pointer-events:none
  }

  .urgency-pulse{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:rgba(239,68,68,.12);
    border:1px solid rgba(239,68,68,.25);
    color:#fca5a5;
    font-size:.7rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:1.5px;
    padding:6px 14px;
    border-radius:100px;
    margin-bottom:16px
  }

  .urgency-pulse::before{
    content:'';
    width:7px;
    height:7px;
    background:#ef4444;
    border-radius:50%;
    animation:pulse 1.5s infinite
  }

  .urgency-box h3{
    color:#fff;
    font-size:1.3rem;
    font-weight:900;
    margin-bottom:10px;
    letter-spacing:-.5px
  }

  .urgency-spots{
    display:flex;
    justify-content:center;
    gap:8px;
    margin-bottom:16px
  }

  .spot{
    width:36px;
    height:8px;
    border-radius:100px
  }

  .spot.taken{background:#ef4444}
  .spot.free{background:rgba(255,255,255,.15)}

  .urgency-box p{
    color:rgba(255,255,255,.5);
    font-size:.85rem;
    line-height:1.65;
    max-width:480px;
    margin:0 auto
  }

  .guarantee-box{
    background:#f0fdf4;
    border-radius:14px;
    padding:24px 32px;
    display:flex;
    gap:16px;
    align-items:flex-start;
    border:1px solid #bbf7d0
  }

  .guarantee-icon{
    font-size:1.4rem;
    flex-shrink:0;
    margin-top:2px
  }

  .guarantee-box strong{
    display:block;
    color:#166534;
    font-size:.88rem;
    font-weight:800;
    margin-bottom:4px
  }

  .guarantee-box p{
    color:#166534;
    font-size:.82rem;
    margin:0;
    line-height:1.6;
    opacity:.8
  }

  .cta-section{
    padding:120px 5%;
    background:linear-gradient(160deg,#0d1a3a 0%,#111827 100%);
    position:relative;
    overflow:hidden;
    text-align:center
  }

  .cta-section::before{
    content:'';
    position:absolute;
    inset:0;
    background:radial-gradient(ellipse at center,rgba(99,102,241,.1) 0%,transparent 65%);
    pointer-events:none
  }

  .cta-section h2{
    font-size:clamp(2rem,4vw,3rem);
    font-weight:900;
    color:#fff;
    letter-spacing:-1px;
    margin-bottom:16px;
    position:relative
  }

  .cta-section p{
    font-size:.95rem;
    color:rgba(255,255,255,.58);
    max-width:620px;
    margin:0 auto 48px;
    line-height:1.7;
    position:relative
  }

  .cta-btns{
    display:flex;
    gap:12px;
    justify-content:center;
    flex-wrap:wrap;
    position:relative
  }

  .cta-phone{
    margin-top:48px;
    color:rgba(255,255,255,.35);
    font-size:.82rem;
    position:relative
  }

  .cta-phone strong{
    color:#60a5fa;
    display:block;
    font-size:1.05rem;
    margin-top:8px;
    font-weight:800
  }

  @media(max-width:1024px){
    .niche-fit-grid,
    .pricing-grid,
    .difference-grid{
      grid-template-columns:1fr;
      max-width:620px;
      margin:0 auto
    }

    .problem-grid,
    .comparison-grid,
    .why-grid,
    .niche-highlight{
      grid-template-columns:1fr;
      max-width:720px;
      margin:0 auto
    }

    .results-row{
      grid-template-columns:1fr 1fr
    }

    .results-row .result-item:nth-child(2){
      border-right:none
    }

    .results-row .result-item:nth-child(3){
      border-right:none;
      border-top:1px solid #f3f4f6;
      grid-column:1/-1
    }

    .how-steps{
      grid-template-columns:1fr 1fr;
      gap:32px
    }

    .how-steps::before{
      display:none
    }

    .founder-grid{
      grid-template-columns:1fr;
      max-width:720px
    }
  }

  @media(max-width:768px){
    .how-steps{
      grid-template-columns:1fr
    }

    .trust-items{
      gap:20px
    }

    .urgency-box{
      padding:28px 20px
    }

    .cta-section{
      padding:80px 5%
    }

    .cta-btns{
      flex-direction:column
    }

    .cta-btns a{
      width:100%;
      max-width:420px;
      margin:0 auto;
      text-align:center
    }

    .results-row{
      grid-template-columns:1fr;
      border-radius:16px
    }

    .result-item{
      border-right:none;
      border-bottom:1px solid #f3f4f6;
      padding:28px
    }

    .result-item:last-child{
      border-bottom:none
    }

    .problem-section,
    .difference-section,
    .demo-section,
    .pricing-section,
    .roi-section,
    .why-section,
    .how-section,
    .urgency-section,
    .comparison-section,
    .niche-fit-section,
    .results-section,
    .founder-section{
      padding:80px 5%
    }

    .founder-card{
      padding:32px 24px
    }

    .founder-points{
      grid-template-columns:1fr
    }
  }

  @media(max-width:640px){
    .lead-magnet-inner{
      flex-direction:column;
      gap:24px;
      text-align:center
    }

    .lead-magnet-cta{
      width:100%
    }

    .btn-lead,
    .btn-outline{
      display:block;
      text-align:center
    }
  }

  @media(max-width:480px){
    .problem-section,
    .difference-section,
    .demo-section,
    .pricing-section,
    .roi-section,
    .why-section,
    .how-section,
    .urgency-section,
    .comparison-section,
    .niche-fit-section,
    .results-section,
    .founder-section{
      padding:60px 5%
    }

    .trusted-inner{
      gap:12px
    }

    .guarantee-box{
      flex-direction:column;
      gap:10px;
      padding:20px
    }

    .cta-section h2{
      font-size:1.8rem
    }

    .section-header{
      margin-bottom:40px
    }

    .founder-mini-testimonial{
      padding:18px
    }
  }
`;

const TRUSTED_BY = ["Kappers", "Restaurants", "Klusbedrijven", "Schoonheidssalons", "Fotografen", "ZZP'ers"];

const NICHE_OPTIONS = [
  {
    key: "kappers",
    icon: "✂️",
    name: "Kappers",
    problem: "Je wilt meer afspraken en een website die direct vertrouwen geeft.",
    bestFit: "Groei past het vaakst bij kappers",
    href: "/website-kapper",
    highlightTitle: "Meer afspraken zonder gedoe met je website",
    highlightText:
      "Voor kappers draait je website niet alleen om mooi zijn, maar vooral om sneller overtuigen en makkelijker contact laten opnemen.",
    points: [
      "Duidelijke knoppen voor bellen, WhatsApp of afspraak aanvragen",
      "Professionele uitstraling die past bij jouw salon",
      "Meer ruimte voor behandelingen, tarieven en reviews",
    ],
  },
  {
    key: "restaurants",
    icon: "🍽️",
    name: "Restaurants",
    problem: "Je wilt meer reserveringen en minder afhankelijk zijn van externe platforms.",
    bestFit: "Automatiseren of Groei past vaak het best",
    href: "/website-restaurant",
    highlightTitle: "Meer reserveringen via je eigen website",
    highlightText:
      "Een restaurantwebsite moet sfeer uitstralen, maar vooral gasten overtuigen om direct te reserveren of contact op te nemen.",
    points: [
      "Duidelijke menukaart, sfeer en contactopties",
      "Sterkere focus op reserveringen en directe omzet",
      "Mogelijkheid om reserveringsflow later uit te bouwen",
    ],
  },
  {
    key: "klusbedrijven",
    icon: "🔨",
    name: "Klusbedrijven",
    problem: "Je wilt meer offerte-aanvragen en professioneler overkomen bij nieuwe klanten.",
    bestFit: "Groei past het vaakst bij klusbedrijven",
    href: "/website-klusbedrijf",
    highlightTitle: "Meer aanvragen voor klussen en offertes",
    highlightText:
      "Voor een klusbedrijf moet je website direct duidelijk maken wat je doet, waar je werkt en hoe iemand je kan inschakelen.",
    points: [
      "Sterke dienstenpagina’s en lokale zichtbaarheid",
      "Duidelijke focus op aanvragen en offerteformulieren",
      "Meer vertrouwen bij nieuwe klanten",
    ],
  },
  {
    key: "schoonheidssalons",
    icon: "💅",
    name: "Schoonheidssalons",
    problem: "Je wilt meer boekingen en een uitstraling die rust, kwaliteit en vertrouwen uitstraalt.",
    bestFit: "Groei past het vaakst bij salons",
    href: "/website-salon",
    highlightTitle: "Meer boekingen met een rustige, luxe uitstraling",
    highlightText:
      "Voor een schoonheidssalon moet je website professioneel ogen, behandelingen duidelijk tonen en klanten soepel naar contact of boeking leiden.",
    points: [
      "Duidelijke behandelingen en contactopties",
      "Sterke uitstraling voor mobiel en desktop",
      "Minder chaos via losse DM’s en berichten",
    ],
  },
  {
    key: "fotografen",
    icon: "📸",
    name: "Fotografen",
    problem: "Je wilt portfolio en vertrouwen combineren met meer boekingen.",
    bestFit: "Groei past het vaakst bij fotografen",
    href: "/website-fotograaf",
    highlightTitle: "Portfolio én meer boekingen in één website",
    highlightText:
      "Voor fotografen moet je website niet alleen werk tonen, maar vooral bezoekers overtuigen om een shoot of opdracht aan te vragen.",
    points: [
      "Sterke portfolio-opbouw met duidelijke CTA’s",
      "Professionelere uitstraling dan alleen social media",
      "Meer aanvragen voor shoots en opdrachten",
    ],
  },
  {
    key: "zzpers",
    icon: "🧑‍💼",
    name: "ZZP'ers",
    problem: "Je wilt professioneler overkomen en makkelijker nieuwe klanten aantrekken.",
    bestFit: "Zichtbaar of Groei past vaak het best",
    href: "/website-zzp",
    highlightTitle: "Meer vertrouwen en meer leads voor zelfstandigen",
    highlightText:
      "Als zzp’er is je website vaak je eerste indruk. Die moet meteen duidelijk maken wat je doet en waarom iemand juist jou moet benaderen.",
    points: [
      "Sterke eerste indruk zonder technisch gedoe",
      "Meer focus op leads, bellen of aanvragen",
      "Makkelijk mee te laten groeien met je bedrijf",
    ],
  },
];

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
    "Veel ondernemers willen geen tijd verliezen aan wijzigingen, beheer of technische vragen. Dat moet gewoon geregeld blijven.",
  ],
];

const DIFFERENCE_POINTS = [
  [
    "01",
    "Gebouwd voor lokale ondernemers",
    "Geen algemene websites voor iedereen, maar een aanpak voor bedrijven die lokaal gevonden willen worden en meer aanvragen willen krijgen.",
  ],
  [
    "02",
    "Snel live en makkelijk starten",
    "Je hoeft niet eerst een groot traject in. We houden het simpel, duidelijk en praktisch zodat je snel online staat.",
  ],
  [
    "03",
    "Maandelijkse ondersteuning in plaats van losse oplevering",
    "Je website blijft niet aan je lot overgelaten. Updates, onderhoud en kleine wijzigingen blijven gewoon doorlopen.",
  ],
];

const PACKAGES = [
  {
    tier: "Zichtbaar",
    name: "Professioneel online zonder gedoe",
    fit: "Voor starters, zzp’ers en kleine bedrijven",
    price: "99",
    setup: "€500 setup",
    featured: false,
    cancelNote: "Opzegbaar vanaf 6 maanden",
    bullets: [
      "Website tot 5 pagina’s",
      "Mobielvriendelijk ontwerp",
      "WhatsApp, bellen en formulier",
      "Onderhoud inbegrepen",
    ],
    cta: "Kies Zichtbaar →",
  },
  {
    tier: "Groei",
    name: "Meer aanvragen via je website",
    fit: "Meest gekozen door kappers, salons en klusbedrijven",
    price: "149",
    setup: "€750 setup",
    featured: true,
    cancelNote: "Opzegbaar vanaf 6 maanden",
    bullets: [
      "Alles uit Zichtbaar",
      "Meer pagina’s en SEO-structuur",
      "Blog of FAQ mogelijk",
      "Meer ruimte voor diensten",
    ],
    cta: "Kies Groei →",
  },
  {
    tier: "Automatiseren",
    name: "Je website laten meewerken",
    fit: "Voor reserveringen, intake en workflows",
    price: "249",
    setup: "€1000 setup",
    featured: false,
    cancelNote: "Opzegbaar vanaf maand 3",
    bullets: [
      "Alles uit Groei",
      "Dashboard of klantomgeving",
      "Reserveringen of intake mogelijk",
      "Meer maatwerk en doorontwikkeling",
    ],
    cta: "Kies Automatiseren →",
  },
];

const COMPARE_SELF = [
  "Zelf tools, hosting of bouwers uitzoeken",
  "Tijd kwijt aan ontwerp, inhoud en techniek",
  "Geen duidelijke structuur voor meer aanvragen",
  "Bij problemen zelf zoeken wie iets oplost",
  "Vaak starten met goedkoop, maar later alsnog gedoe",
];

const COMPARE_VEDANTIX = [
  "Alles vanuit één partij geregeld",
  "Gebouwd met focus op aanvragen, contact en vertrouwen",
  "Persoonlijke hulp in plaats van een anoniem ticketsysteem",
  "Onderhoud en kleine updates blijven doorlopen",
  "Snel live en makkelijk op te schalen als je groeit",
];

const RESULTS = [
  ["Meer vertrouwen", "Een website die professioneler en duidelijker overkomt"],
  ["Meer actie", "Sterkere focus op bellen, WhatsAppen of aanvragen"],
  ["Meer rust", "Onderhoud, updates en support blijven geregeld"],
];

const FOUNDER_POINTS = [
  "Direct contact zonder lagen of accountmanagers",
  "Snelle communicatie via WhatsApp of telefoon",
  "Praktische focus op duidelijke websites die verkopen",
  "Ook geschikt als je nog geen bestaande website hebt",
];

const TRUST_ITEMS = [
  ["✔", "Gebouwd voor lokale ondernemers"],
  ["✔", "Duidelijke maandprijs"],
  ["✔", "Persoonlijk contact"],
  ["✔", "Onderhoud inbegrepen"],
  ["✔", "Flexibel op te schalen"],
];

const WHY_OLD = [
  "Na oplevering zelf alles regelen",
  "Los betalen voor hosting, onderhoud en wijzigingen",
  "Technische zaken bij meerdere partijen onderbrengen",
  "Onzekerheid over wie verantwoordelijk is bij problemen",
  "Website veroudert sneller zonder doorlopend beheer",
];

const WHY_NEW = [
  "Je website blijft onderhouden en actueel",
  "Je hebt één partij voor alles rondom je website",
  "Kleine wijzigingen kunnen snel worden opgepakt",
  "Je weet vooraf wat je maandelijks betaalt",
  "Je kunt later makkelijk doorgroeien naar meer functionaliteit",
];

const HOW_STEPS = [
  ["1", "Kennismaking", "We bespreken kort je bedrijf, doelgroep en wat je website praktisch moet doen."],
  ["2", "Ontwerp & opbouw", "Wij bouwen een professionele basis die past bij jouw branche en uitstraling."],
  ["3", "Feedback & livegang", "Je geeft feedback, wij scherpen aan en zetten je website netjes live."],
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
  const [selectedNiche, setSelectedNiche] = useState(NICHE_OPTIONS[0].key);

  const activeNiche = useMemo(
    () => NICHE_OPTIONS.find((item) => item.key === selectedNiche) || NICHE_OPTIONS[0],
    [selectedNiche]
  );

  return (
    <>
      <SEO
        title="Website laten maken voor kappers, restaurants en lokale bedrijven | Vedantix"
        description="Binnen 48 uur een professionele website voor kappers, restaurants, klusbedrijven, schoonheidssalons, fotografen en zzp’ers. Gericht op meer aanvragen, minder gedoe en doorlopende ondersteuning."
        canonical="https://vedantix.nl/"
      />

      <style>{HOME_STYLES + HOME_HERO_STYLES}</style>

      <div className="home-page">
        <NavBar />

        <main>
          <HomeHero />

          <div className="trusted">
            <div className="trusted-inner">
              <span className="trusted-label">Geschikt voor</span>
              {TRUSTED_BY.map((item) => (
                <span key={item} className="trusted-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <section className="niche-fit-section anchor-section" id="voor-wie">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Wat past bij jou?</div>
                <h2 className="section-h2">Kies jouw branche en zie direct wat meestal het beste past</h2>
                <p className="section-p">
                  Een kapper, restaurant of zzp’er zoekt niet hetzelfde. Daarom zie je hieronder per niche meteen waar de meeste winst zit
                  en welk pakket meestal het beste aansluit.
                </p>
              </div>

              <div className="niche-fit-grid">
                {NICHE_OPTIONS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`niche-fit-card ${selectedNiche === item.key ? "active" : ""}`}
                    onClick={() => setSelectedNiche(item.key)}
                    style={{ textAlign: "left" }}
                  >
                    <div className="niche-fit-top">
                      <div className="niche-fit-name">{item.name}</div>
                      <div className="niche-fit-icon">{item.icon}</div>
                    </div>

                    <p className="niche-fit-problem">{item.problem}</p>
                    <div className="niche-fit-tag">{item.bestFit}</div>
                    <div className="niche-fit-link">Bekijk richting →</div>
                  </button>
                ))}
              </div>

              <div className="niche-highlight">
                <div className="niche-highlight-box">
                  <div className="section-label" style={{ marginBottom: 10 }}>
                    Voor {activeNiche.name.toLowerCase()}
                  </div>
                  <h3>{activeNiche.highlightTitle}</h3>
                  <p>{activeNiche.highlightText}</p>

                  <div className="niche-highlight-points">
                    {activeNiche.points.map((point) => (
                      <div key={point} className="niche-highlight-point">
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="niche-highlight-cta">
                  <a href="#pricing" className="btn-lead">
                    Bekijk passende pakketten →
                  </a>

                  <a href={activeNiche.href} className="btn-outline">
                    Bekijk pagina voor {activeNiche.name.toLowerCase()} →
                  </a>

                  <div className="niche-highlight-note">
                    Deze nichepagina’s helpen bezoekers zichzelf sneller te herkennen en werken ook sterk voor SEO.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="problem-section">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label">Het probleem</div>
                <h2 className="section-h2">De meeste websites van lokale ondernemers laten klanten liggen</h2>
                <p className="section-p">
                  Niet omdat het bedrijf niet goed is, maar omdat de website te weinig vertrouwen opwekt, te weinig richting geeft en
                  na oplevering vaak stil blijft staan.
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
                <h2 className="section-h2">Geen tool of los product, maar een website die beter verkoopt</h2>
                <p className="section-p">
                  Vedantix is er voor lokale ondernemers die geen zin hebben in technisch gedoe, lange trajecten of vage prijzen.
                  Je krijgt een website die duidelijk oogt, sneller tot actie leidt en gewoon doorlopend wordt bijgehouden.
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

          <section id="pricing" className="pricing-section anchor-section">
            <div className="section-wrap">
              <div className="pricing-intro">
                <div className="pricing-kicker">Je kiest geen website. Je kiest hoeveel je eruit wilt halen.</div>
              </div>

              <div className="section-header centered">
                <div className="section-label">Pakketten</div>
                <h2 className="section-h2">Kies het pakket dat bij jouw bedrijf past</h2>
                <p className="section-p">
                  Eerst professioneel zichtbaar zijn, daarna meer aanvragen of uiteindelijk processen laten meewerken.
                  De pakketten zijn bewust simpel gehouden zodat je snel ziet wat bij jouw fase past.
                </p>
              </div>

              <div className="pricing-grid">
                {PACKAGES.map((pkg) => (
                  <div key={pkg.tier} className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
                    {pkg.featured && <div className="pricing-badge">Meest gekozen</div>}

                    <div className="p-tier">{pkg.tier}</div>
                    <div className="p-name">{pkg.name}</div>
                    <div className="p-fit">{pkg.fit}</div>

                    <div className="p-price-row">
                      <div className="p-price">
                        <sup>€</sup>
                        {pkg.price}
                        <span>/m</span>
                      </div>
                    </div>

                    <div className="p-setup">+ {pkg.setup}</div>
                    <div className="p-terms">{pkg.cancelNote}</div>
                    <div className="p-divider" />

                    <ul className="p-features">
                      {pkg.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/310626219989?text=Hallo%20Vedantix%2C%20ik%20wil%20graag%20meer%20weten%20over%20het%20pakket%20dat%20bij%20mijn%20bedrijf%20past."
                      target="_blank"
                      rel="noreferrer"
                      className={`p-cta ${pkg.featured ? "featured" : "default"}`}
                    >
                      {pkg.cta}
                    </a>
                  </div>
                ))}
              </div>

              <div className="pricing-decision">
                <h3>Twijfel je?</h3>
                <p>
                  De meeste ondernemers kiezen voor <strong>Groei</strong>. Daar zit meestal alles in om meer klanten, afspraken of aanvragen
                  te krijgen zonder dat het meteen complex wordt.
                </p>
              </div>

              <div className="pricing-help">
                <a href="/pakketvergelijking">Bekijk de uitgebreide pakketvergelijking →</a>
              </div>
            </div>
          </section>

          <section className="comparison-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Waarom niet zelf bouwen?</div>
                <h2 className="section-h2">Het verschil zit niet in de tool, maar in het resultaat</h2>
                <p className="section-p">
                  Veel ondernemers vergelijken zichzelf onbewust met goedkope builders of hostingpartijen. Maar de echte keuze is vaak:
                  zelf uitzoeken of alles in één keer goed laten regelen.
                </p>
              </div>

              <div className="comparison-grid">
                <div className="comparison-col self">
                  <h3>Zelf doen of losse tools combineren</h3>
                  {COMPARE_SELF.map((item) => (
                    <div key={item} className="comparison-item">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="comparison-col vedantix">
                  <h3>Vedantix</h3>
                  {COMPARE_VEDANTIX.map((item) => (
                    <div key={item} className="comparison-item">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="demo" className="demo-section anchor-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Demo concepten</div>
                <h2 className="section-h2">Voorbeelden van richtingen die wij kunnen bouwen</h2>
                <p className="section-p">
                  Goede demo’s laten snel zien welke stijl, opbouw en richting mogelijk is voor jouw branche, ook als je nog geen groot portfolio hebt bekeken.
                </p>
              </div>

              <NicheCarousel />
            </div>
          </section>

          <section id="how" className="how-section anchor-section">
            <div className="section-wrap">
              <div className="section-header centered">
                <div className="section-label">Werkwijze</div>
                <h2 className="section-h2">Van eerste bericht naar live website in 4 stappen</h2>
                <p className="section-p">
                  Een duidelijk proces werkt beter dan vage beloftes. Zo weet een klant precies wat hij kan verwachten.
                </p>
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

          <section className="results-section">
            <div className="section-wrap">
              <div className="section-header">
                <div className="section-label">Wat dit oplevert</div>
                <h2 className="section-h2">Een betere eerste indruk, meer actie en minder twijfel</h2>
                <p className="section-p">
                  Je website hoeft niet alleen mooi te zijn. Hij moet iemand snel overtuigen om te bellen, appen, reserveren of een aanvraag te doen.
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

          <section className="founder-section">
            <div className="founder-grid">
              <div className="founder-photo">
                <img
                  src="/images/founder_long.jpeg"
                  alt="Rishwi van Vedantix"
                  className="founder-image"
                />
              </div>

              <div className="founder-card">
                <div className="section-label">Achter Vedantix</div>
                <h2 className="section-h2">Persoonlijk contact, snelle oplevering en focus op resultaat</h2>

                <p>
                  Vedantix is er voor lokale ondernemers die een professionele website willen zonder lang traject,
                  vage communicatie of technisch gedoe.
                </p>

                <p>
                  Je hebt direct contact, een duidelijke prijs en een praktische aanpak. Het doel is simpel:
                  een website neerzetten die professioneel oogt en sneller tot actie leidt.
                </p>

                <p>
                  Heb je nog geen bestaande website, geen reviews of nog geen uitgebreide content? Dan bouwen we juist
                  vanuit eenvoud en duidelijkheid een sterke basis.
                </p>

                <div className="founder-points">
                  {FOUNDER_POINTS.map((item) => (
                    <div key={item} className="founder-point">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="founder-mini-testimonial">
                  <div className="founder-mini-head">
                    <img
                      src="/images/founder.jpeg"
                      alt="Rishwi van Vedantix"
                      className="founder-mini-avatar"
                    />

                    <div className="founder-mini-meta">
                      <strong>Rishwi</strong>
                      <span>Founder van Vedantix</span>
                    </div>
                  </div>

                  <p className="founder-mini-quote">
                    Ik help lokale ondernemers aan een website die niet alleen mooi oogt, maar vooral
                    duidelijker vertrouwen opwekt en sneller tot contact of aanvragen leidt.
                  </p>
                </div>
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
              <h2 className="roi-title">Waarom dit voor veel ondernemers fijner werkt dan een losse oplevering</h2>
              <p className="roi-subtitle">
                Je betaalt niet alleen voor het bouwen van een website, maar ook voor het bijhouden, ondersteunen en verbeteren ervan.
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
                  Geen losse website die je daarna zelf moet beheren of ergens anders moet onderbrengen.
                </div>
                <div className="roi-note">
                  Vooral voor drukke ondernemers is het prettig als onderhoud, updates en ondersteuning gewoon doorlopen.
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

          <section className="lead-magnet-section">
            <div className="lead-magnet-inner">
              <div className="lead-magnet-text">
                <div className="lead-magnet-badge">🎁 Gratis — geen verplichtingen</div>
                <div className="lead-magnet-title">Ontvang een eerlijke scan van je huidige website</div>
                <div className="lead-magnet-sub">
                  We kijken vrijblijvend naar je online presentatie en laten concreet zien waar winst zit in duidelijkheid,
                  uitstraling, mobiele gebruikservaring en call-to-actions.
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
                  <strong>Geen druk, wel duidelijkheid</strong>
                  <p>Eerst bespreken we wat bij jouw bedrijf past. Daarna beslis jij rustig of je verder wilt.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="cta" className="cta-section anchor-section">
            <h2>Klaar om je website professioneler en overtuigender neer te zetten?</h2>
            <p>
              Plan een vrijblijvende intake en ontdek welk pakket, welke stijl en welke richting het beste past bij jouw bedrijf.
            </p>

            <div className="cta-btns">
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

              <a href="#voor-wie" className="btn-ghost" style={{ textAlign: "center" }}>
                Bekijk wat bij jou past →
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