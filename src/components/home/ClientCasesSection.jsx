import { useEffect, useRef, useState } from "react";

const CLIENT_CASES = [
  {
    name: "Horeca Topper",
    logo: "/logos/horeca-topper.svg",
    website: "https://www.horeca-topper.nl/",
    domainLabel: "horeca-topper.nl",
    branch: "Horeca / dienstverlening",
    status: "Live",
    summary:
      "Professionele website met sterke uitstraling, duidelijke structuur en optimale mobiele weergave.",
  },
];

export default function ClientCasesSection() {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;

    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;

    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.eyebrow}>KLANTEN</div>
          <h2 style={styles.title}>Websites die al live staan</h2>
          <p style={styles.subtitle}>
            Echte klanten, echte resultaten. Een selectie van projecten die we
            recent hebben opgeleverd.
          </p>
        </div>

        {/* CONTROLS */}
        <div style={styles.controls}>
          <button
            onClick={() => scroll("left")}
            style={{
              ...styles.navBtn,
              ...(!canLeft ? styles.disabled : {}),
            }}
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            style={{
              ...styles.navBtn,
              ...(!canRight ? styles.disabled : {}),
            }}
          >
            →
          </button>
        </div>

        {/* CAROUSEL */}
        <div ref={trackRef} style={styles.carousel}>
          {CLIENT_CASES.map((c) => (
            <div key={c.name} style={styles.card}>
              <div style={styles.logoWrap}>
                <img src={c.logo} alt={c.name} style={styles.logo} />
              </div>

              <div style={styles.meta}>
                <span style={styles.status}>{c.status}</span>
                <span style={styles.branch}>{c.branch}</span>
              </div>

              <h3 style={styles.name}>{c.name}</h3>

              <a href={c.website} target="_blank" style={styles.link}>
                {c.domainLabel}
              </a>

              <p style={styles.summary}>{c.summary}</p>

              <a href={c.website} target="_blank" style={styles.button}>
                Bekijk website
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** @type {Record<string, import("react").CSSProperties>} */
const styles = {
  section: {
    padding: "80px 20px",
    background: "#f8fafc",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    maxWidth: "700px",
    marginBottom: "30px",
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#64748b",
    marginBottom: "10px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 800,
    marginBottom: "10px",
    color: "#0f172a",
  },
  subtitle: {
    color: "#475569",
    lineHeight: 1.6,
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  navBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    cursor: "pointer",
  },
  disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  carousel: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    scrollBehavior: "smooth",
  },
  card: {
    flex: "0 0 320px",
    background: "#0f172a",
    borderRadius: "20px",
    padding: "20px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "all 0.2s ease",
  },
  logoWrap: {
    width: "60px",
    height: "60px",
    borderRadius: "14px",
    background: "#ffffff",
    padding: "8px",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  meta: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "12px",
  },
  status: {
    background: "rgba(34,197,94,0.2)",
    padding: "4px 8px",
    borderRadius: "999px",
    color: "#4ade80",
  },
  branch: {
    color: "rgba(255,255,255,0.6)",
  },
  name: {
    fontSize: "20px",
    fontWeight: 700,
  },
  link: {
    color: "#60a5fa",
    fontSize: "14px",
    textDecoration: "none",
  },
  summary: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.6,
  },
  button: {
    marginTop: "auto",
    background: "#ffffff",
    color: "#0f172a",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: 600,
  },
};