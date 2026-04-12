import { useEffect, useMemo, useState } from "react";
import { NICHE_DEMOS } from "../data/nicheDemoData";

const CAROUSEL_STYLES = `
  .niche-carousel{
    width:100%;
  }

  .niche-carousel-top{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:16px;
    margin-bottom:24px;
    flex-wrap:wrap;
  }

  .niche-carousel-meta{
    font-size:.82rem;
    color:#64748b;
    font-weight:700;
  }

  .niche-carousel-controls{
    display:flex;
    align-items:center;
    gap:10px;
  }

  .niche-carousel-btn{
    width:42px;
    height:42px;
    border-radius:12px;
    border:1px solid #e5e7eb;
    background:#fff;
    color:#111827;
    font-size:1rem;
    font-weight:800;
    cursor:pointer;
    transition:all .2s;
    box-shadow:0 4px 12px rgba(0,0,0,.04);
  }

  .niche-carousel-btn:hover{
    transform:translateY(-1px);
    border-color:#d1d5db;
    box-shadow:0 8px 18px rgba(0,0,0,.06);
  }

  .niche-carousel-track{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px;
    align-items:stretch;
  }

  .niche-card{
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,.04);
    transition:all .25s;
    height:100%;
    display:flex;
    flex-direction:column;
  }

  .niche-card:hover{
    transform:translateY(-3px);
    box-shadow:0 16px 40px rgba(0,0,0,.08);
  }

  .niche-card-top{
    padding:24px 22px;
    color:#fff;
  }

  .niche-card-top.barber{background:linear-gradient(135deg,#0f172a,#1d4ed8)}
  .niche-card-top.restaurant{background:linear-gradient(135deg,#3f1d0f,#ea580c)}
  .niche-card-top.salon{background:linear-gradient(135deg,#4c1d95,#9333ea)}
  .niche-card-top.photography{background:linear-gradient(135deg,#111827,#374151)}
  .niche-card-top.services{background:linear-gradient(135deg,#0f766e,#14b8a6)}
  .niche-card-top.coach{background:linear-gradient(135deg,#1d4ed8,#06b6d4)}

  .niche-card-badge{
    display:inline-block;
    font-size:.68rem;
    font-weight:800;
    letter-spacing:1.4px;
    text-transform:uppercase;
    color:rgba(255,255,255,.72);
    margin-bottom:10px;
  }

  .niche-card-title{
    font-size:1.16rem;
    font-weight:900;
    line-height:1.2;
    margin-bottom:8px;
    min-height:2.8em;
  }

  .niche-card-sub{
    font-size:.82rem;
    color:rgba(255,255,255,.78);
    line-height:1.6;
    min-height:4.5em;
  }

  .niche-card-body{
    padding:22px;
    display:flex;
    flex-direction:column;
    flex:1;
  }

  .niche-card-list{
    list-style:none;
    display:flex;
    flex-direction:column;
    gap:10px;
    margin-bottom:18px;
    padding:0;
    flex:1;
  }

  .niche-card-list li{
    display:flex;
    gap:8px;
    align-items:flex-start;
    font-size:.84rem;
    color:#4b5563;
    line-height:1.55;
  }

  .niche-card-list li::before{
    content:'✓';
    color:#6366f1;
    font-weight:900;
    flex-shrink:0;
  }

  .niche-card-outcome{
    padding:12px 14px;
    border-radius:12px;
    background:#f8fafc;
    border:1px solid #eef2f7;
    font-size:.8rem;
    color:#334155;
    font-weight:700;
    line-height:1.55;
    min-height:88px;
  }

  .niche-card-cta{
    margin-top:18px;
    display:block;
    text-align:center;
    padding:12px;
    border-radius:10px;
    background:#111827;
    color:#fff;
    font-size:.85rem;
    font-weight:800;
    text-decoration:none;
    transition:all .2s;
  }

  .niche-card-cta:hover{
    background:#0f172a;
    transform:translateY(-1px);
  }

  .niche-carousel-dots{
    display:flex;
    justify-content:center;
    gap:8px;
    margin-top:22px;
  }

  .niche-carousel-dot{
    width:9px;
    height:9px;
    border-radius:999px;
    background:#d1d5db;
    border:none;
    cursor:pointer;
    transition:all .2s;
  }

  .niche-carousel-dot.active{
    background:#6366f1;
    transform:scale(1.08);
  }

  @media(max-width:1024px){
    .niche-carousel-track{
      grid-template-columns:repeat(2,1fr);
    }

    .niche-card-title,
    .niche-card-sub,
    .niche-card-outcome{
      min-height:auto;
    }
  }

  @media(max-width:768px){
    .niche-carousel-top{
      justify-content:flex-end;
    }

    .niche-carousel-meta{
      width:100%;
    }

    .niche-carousel-track{
      grid-template-columns:1fr;
    }
  }
`;

function getVisibleCount(width) {
  if (width <= 768) return 1;
  if (width <= 1024) return 2;
  return 3;
}

export default function NicheCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== "undefined" ? getVisibleCount(window.innerWidth) : 3
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, NICHE_DEMOS.length - visibleCount);

  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [startIndex, maxIndex]);

  const visibleItems = useMemo(
    () => NICHE_DEMOS.slice(startIndex, startIndex + visibleCount),
    [startIndex, visibleCount]
  );

  const totalPages = Math.ceil(NICHE_DEMOS.length / visibleCount);
  const currentPage = Math.floor(startIndex / visibleCount);

  const handlePrev = () => {
    setStartIndex((prev) => {
      const next = prev - visibleCount;
      return next < 0 ? maxIndex : next;
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      const next = prev + visibleCount;
      return next > maxIndex ? 0 : next;
    });
  };

  const goToPage = (pageIndex) => {
    const nextIndex = pageIndex * visibleCount;
    setStartIndex(nextIndex > maxIndex ? maxIndex : nextIndex);
  };

  return (
    <div className="niche-carousel">
      <style>{CAROUSEL_STYLES}</style>

      <div className="niche-carousel-top">
        <div className="niche-carousel-meta">
          Kies een branche en krijg sneller gevoel bij wat voor jouw bedrijf werkt.
        </div>

        <div className="niche-carousel-controls">
          <button
            type="button"
            className="niche-carousel-btn"
            onClick={handlePrev}
            aria-label="Vorige voorbeelden"
          >
            ←
          </button>
          <button
            type="button"
            className="niche-carousel-btn"
            onClick={handleNext}
            aria-label="Volgende voorbeelden"
          >
            →
          </button>
        </div>
      </div>

      <div className="niche-carousel-track">
        {visibleItems.map((demo) => (
          <div key={demo.slug} className="niche-card">
            <div className={`niche-card-top ${demo.theme}`}>
              <div className="niche-card-badge">{demo.label}</div>
              <div className="niche-card-title">{demo.title}</div>
              <div className="niche-card-sub">{demo.subtitle}</div>
            </div>

            <div className="niche-card-body">
              <ul className="niche-card-list">
                {demo.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="niche-card-outcome">{demo.outcome}</div>

              <a
                href={`https://wa.me/310626219989?text=${encodeURIComponent(demo.whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                className="niche-card-cta"
              >
                Bespreek dit voorbeeld →
              </a>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="niche-carousel-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`niche-carousel-dot ${index === currentPage ? "active" : ""}`}
              onClick={() => goToPage(index)}
              aria-label={`Ga naar voorbeeld ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}