import { useEffect, useMemo, useState } from "react";
import { NICHE_DEMOS } from "../data/nicheDemoData";
import "../styles/niche-carousel.css";

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