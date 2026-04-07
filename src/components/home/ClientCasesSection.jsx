import { useEffect, useRef, useState } from "react";

const CLIENT_CASES = [
  {
    name: "Horeca Topper",
    logo: "/logos/HorecaToppers.svg",
    website: "https://www.horeca-topper.nl/",
    domainLabel: "horeca-topper.nl",
    branch: "Horeca / dienstverlening",
    status: "Live",
    summary:
      "Professionele website gerealiseerd met een duidelijke uitstraling, logische structuur en sterke mobiele weergave.",
  },
];

export default function ClientCasesSection() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();

    const el = trackRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByAmount = (direction) => {
    const el = trackRef.current;
    if (!el) return;

    const amount = Math.min(380, el.clientWidth * 0.9);

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section style={styles.section}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div style={styles.headerContent}>
            <div style={styles.eyebrow}>KLANTEN</div>
            <h2 style={styles.title}>Websites die al live staan</h2>
            <p style={styles.subtitle}>
              Echte klanten, echte websites. Een compacte selectie van projecten
              die we hebben gerealiseerd.
            </p>
          </div>

          <div style={styles.controls}>
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              style={{
                ...styles.navButton,
                ...(!canScrollLeft ? styles.navButtonDisabled : {}),
              }}
              disabled={!canScrollLeft}
              aria-label="Scroll naar links"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              style={{
                ...styles.navButton,
                ...(!canScrollRight ? styles.navButtonDisabled : {}),
              }}
              disabled={!canScrollRight}
              aria-label="Scroll naar rechts"
            >
              →
            </button>
          </div>
        </div>

        <div ref={trackRef} style={styles.carousel} aria-label="Klantcases">
          {CLIENT_CASES.map((client) => (
            <article key={client.name} style={styles.card}>
              <div style={styles.logoWrap}>
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  style={styles.logo}
                />
              </div>

              <div style={styles.cardTop}>
                <div style={styles.metaRow}>
                  <span style={styles.statusBadge}>{client.status}</span>
                  <span style={styles.branch}>{client.branch}</span>
                </div>

                <h3 style={styles.cardTitle}>{client.name}</h3>

                <a
                  href={client.website}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.domainLink}
                >
                  {client.domainLabel}
                </a>
              </div>

              <p style={styles.summary}>{client.summary}</p>

              <div style={styles.cardFooter}>
                <a
                  href={client.website}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.primaryButton}
                >
                  Bekijk website
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** @type {Record<string, import("react").CSSProperties>} */
const styles = {
  section: {
    position: "relative",
    overflow: "hidden",
    padding: "88px 20px",
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.10), transparent 28%), #07111f",
    color: "#ffffff",
  },
  glowOne: {
    position: "absolute",
    top: "-120px",
    left: "-120px",
    width: "300px",
    height: "300px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.12)",
    filter: "blur(90px)",
    pointerEvents: "none",
  },
  glowTwo: {
    position: "absolute",
    right: "-100px",
    bottom: "-100px",
    width: "260px",
    height: "260px",
    borderRadius: "999px",
    background: "rgba(168,85,247,0.12)",
    filter: "blur(90px)",
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1240px",
    margin: "0 auto",
  },
  headerRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "28px",
  },
  headerContent: {
    maxWidth: "760px",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "34px",
    padding: "0 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.78)",
    marginBottom: "16px",
  },
  title: {
    margin: "0 0 12px 0",
    fontSize: "clamp(30px, 4vw, 46px)",
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },
  subtitle: {
    margin: 0,
    fontSize: "17px",
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.72)",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navButton: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  navButtonDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
  },
  carousel: {
    display: "flex",
    gap: "18px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    paddingBottom: "8px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  card: {
    flex: "0 0 360px",
    minHeight: "100%",
    borderRadius: "26px",
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
    boxShadow: "0 24px 60px rgba(0,0,0,0.26)",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  },
  logoWrap: {
    width: "72px",
    height: "72px",
    borderRadius: "18px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    marginBottom: "18px",
    overflow: "hidden",
  },
  logo: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    display: "block",
  },
  cardTop: {
    marginBottom: "14px",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "30px",
    padding: "0 10px",
    borderRadius: "999px",
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.26)",
    color: "#86efac",
    fontSize: "12px",
    fontWeight: 700,
  },
  branch: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.68)",
  },
  cardTitle: {
    margin: "0 0 6px 0",
    fontSize: "24px",
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  domainLink: {
    display: "inline-block",
    fontSize: "14px",
    color: "#93c5fd",
    textDecoration: "none",
    wordBreak: "break-word",
  },
  summary: {
    margin: "0 0 18px 0",
    fontSize: "15px",
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.82)",
  },
  cardFooter: {
    marginTop: "auto",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "44px",
    padding: "0 16px",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#09111f",
    textDecoration: "none",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
};