import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import NavBar from "../components/NavBar";
import { createBreadcrumbSchema } from "../utils/schema";

export default function Proces() {
  const [openFaq, setOpenFaq] = useState(null);

  const canonical = "https://vedantix.nl/proces";

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Proces", url: canonical },
  ]);

  const steps = [
    {
      num: 1,
      icon: "📋",
      title: "Offerte aanvragen",
      desc: "Vul het aanvraagformulier in of gebruik onze Starters-configurator. Geef aan wat voor bedrijf je hebt, welk pakket je wilt en welke extra wensen je hebt.",
      detail: "Je ontvangt binnen 24 uur een reactie met een vrijblijvende offerte op maat.",
      tags: ["Gratis", "Geen verplichting", "Binnen 24 uur reactie"],
    },
    {
      num: 2,
      icon: "🤝",
      title: "Akkoord en aanbetaling",
      desc: "Na akkoord op de offerte wordt een aanbetaling van 50% gefactureerd. Daarna gaan wij direct aan de slag.",
      detail: "Je ontvangt een bevestigingsmail met een samenvatting van jouw bestelling, inclusief pakket, functies en afgesproken levertijd.",
      tags: ["50% aanbetaling", "Direct bevestiging", "Factuur per mail"],
    },
    {
      num: 3,
      icon: "🚀",
      title: "Wij bouwen jouw website",
      desc: "Binnen 48 uur bouwen wij jouw professionele, mobielvriendelijke website. Domein, hosting en SSL worden volledig ingericht.",
      detail: "We werken met bewezen technologieën zodat jouw site snel, veilig en schaalbaar is, zonder dat jij er technisch iets voor hoeft te doen.",
      tags: ["48 uur levertijd", "Hosting inbegrepen", "SSL en domein"],
    },
    {
      num: 4,
      icon: "✅",
      title: "Oplevering en restbetaling",
      desc: "We sturen je een preview van de website. Na jouw akkoord gaat de site live en wordt het resterende bedrag van 50% gefactureerd.",
      detail: "Je ontvangt een opleveringsmail met de live URL, eventuele inloggegevens en informatie over jouw gratis wijzigingen.",
      tags: ["Preview eerst", "Dan live", "50% restbetaling"],
    },
    {
      num: 5,
      icon: "🔧",
      title: "Gratis wijzigingen",
      desc: "Elk pakket bevat een aantal gratis wijzigingen na oplevering. Starter: 0, Business: 1, Premium: 3.",
      detail: "Een gratis wijziging moet binnen 14 dagen na oplevering worden ingediend. Denk aan kleine aanpassingen zoals tekst, afbeeldingen of kleuren — geen nieuwe functionaliteiten.",
      tags: ["0–3 gratis", "Binnen 14 dagen", "Kleine aanpassingen"],
      highlight: true,
    },
    {
      num: 6,
      icon: "💶",
      title: "Betaalde wijzigingen daarna",
      desc: "Na gebruik van alle gratis wijzigingen, of na 14 dagen, worden verdere aanpassingen in rekening gebracht. Dit geldt ook voor nieuwe functionaliteiten.",
      detail: "De kosten zijn afhankelijk van het pakket: Starter €75 per uur, Business €65 per uur, Premium €55 per uur. Voor kleine standaardaanpassingen hanteren wij vaak een vast tarief vanaf €75.",
      tags: ["Vanaf €55 per uur", "Snel geregeld", "Transparant tarief"],
      highlight: true,
    },
    {
      num: 7,
      icon: "📅",
      title: "Hosting verlengen",
      desc: "Hosting is inbegrepen voor het eerste jaar. Daarna ontvang je een verlengingsvoorstel van ongeveer €50 per jaar.",
      detail: "Wil je overstappen naar eigen hosting? Geen probleem. Wij leveren de bestanden aan en helpen je bij de migratie.",
      tags: ["1 jaar inbegrepen", "Ongeveer €50 per jaar", "Of eigen hosting"],
    },
  ];

  const changeExamples = [
    { type: "✅ Gratis", example: "Tekst op de homepage aanpassen", desc: "Valt binnen gratis wijzigingen als die nog beschikbaar zijn" },
    { type: "✅ Gratis", example: "Foto of logo vervangen", desc: "Valt binnen gratis wijzigingen als die nog beschikbaar zijn" },
    { type: "✅ Gratis", example: "Contactgegevens bijwerken", desc: "Valt binnen gratis wijzigingen als die nog beschikbaar zijn" },
    { type: "💶 Betaald (€75)", example: "Nieuwe pagina toevoegen", desc: "Extra pagina buiten het pakket" },
    { type: "💶 Betaald (€75)", example: "Nieuw formulier of nieuwe sectie", desc: "Nieuwe functionaliteit" },
    { type: "💶 Betaald (€75+)", example: "Webshop of boekingssysteem", desc: "Complexe functionaliteit, prijs op aanvraag" },
    { type: "💶 Betaald (€75)", example: "4e wijziging bij Premium", desc: "Na gebruik van 3 gratis wijzigingen" },
    { type: "💶 Betaald (€75)", example: "2e wijziging bij Business", desc: "Na gebruik van 1 gratis wijziging" },
    { type: "💶 Betaald (€75)", example: "1e wijziging bij Starter", desc: "Starter bevat geen gratis wijzigingen" },
  ];

  const faqs = [
    [
      "Wat telt als een gratis wijziging?",
      "Een gratis wijziging is een kleine aanpassing aan bestaande inhoud, zoals tekst, een afbeelding of een kleur. Het toevoegen van een nieuwe pagina of functionaliteit valt hier niet onder.",
    ],
    [
      "Kan ik meerdere kleine aanpassingen in één keer indienen?",
      "Ja. Als je meerdere kleine aanpassingen tegelijk instuurt, telt dat doorgaans als één wijziging. Daarom is het slim om alles in één bericht te combineren.",
    ],
    [
      "Binnen welke termijn moet ik gratis wijzigingen indienen?",
      "Gratis wijzigingen moeten binnen 14 dagen na oplevering worden ingediend. Daarna gelden de standaard tarieven.",
    ],
    [
      "Hoelang duurt het voordat een betaalde wijziging klaar is?",
      "Kleine betaalde wijzigingen zijn doorgaans binnen 48 uur verwerkt. Grotere aanpassingen plannen we in overleg in.",
    ],
    [
      "Wat als ik meer opslagruimte nodig heb?",
      "Je kunt je opslagruimte uitbreiden. Neem contact op voor de actuele tarieven. In de meeste gevallen is uitbreiding snel geregeld.",
    ],
    [
      "Kan ik upgraden naar een hoger pakket?",
      "Ja. Je betaalt dan het prijsverschil tussen de pakketten, plus eventueel extra werk als er aanvullende pagina’s of functies moeten worden gebouwd.",
    ],
  ];

  return (
    <>
      <SEO
        title="Hoe het proces werkt | Vedantix"
        description="Bekijk stap voor stap hoe het proces bij Vedantix werkt: van offerte en aanbetaling tot oplevering, gratis wijzigingen, betaalde aanpassingen en hosting."
        canonical={canonical}
        schemas={[breadcrumbSchema]}
      />

      <WhatsAppWidget />

      <div
        style={{
          fontFamily: "'Inter',sans-serif",
          color: "#1a1a2e",
          minHeight: "100vh",
          background: "#f7f9fc",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          .step-card{background:#fff;border-radius:18px;padding:30px 28px;border:1px solid #e5e7eb;transition:box-shadow 0.2s}
          .step-card:hover{box-shadow:0 6px 20px rgba(0,0,0,0.08)}
          .step-card.highlight{border-color:#1a73e8;background:#eff6ff}
          .tag-pill{background:#f1f5f9;color:#475569;padding:4px 12px;border-radius:100px;font-size:0.76rem;font-weight:600}
          .step-card.highlight .tag-pill{background:#dbeafe;color:#1e40af}
          .faq-row{background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;margin-bottom:10px}
          .faq-q{padding:16px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:0.92rem;transition:background 0.15s}
          .faq-q:hover{background:#f8fafc}
          .faq-a{padding:0 20px 16px;color:#6b7280;font-size:0.88rem;line-height:1.7}
          .change-row{display:flex;align-items:flex-start;gap:14px;padding:12px 0;border-bottom:1px solid #f1f5f9}
          .change-row:last-child{border-bottom:none}
          @media(max-width:768px){
            .step-grid{grid-template-columns:1fr !important}
            .pkg-grid{grid-template-columns:1fr !important}
            h1{font-size:2rem !important}
            .hero-section{padding:96px 5% 44px !important}
            .inner-pad{padding:48px 5% !important}
          }
          @media(max-width:480px){
            h1{font-size:1.7rem !important}
            .step-card{padding:22px 18px !important}
            .cta-flex{flex-direction:column !important;align-items:center !important}
            .cta-flex a{width:100%;max-width:280px;text-align:center;box-sizing:border-box}
          }
        `}</style>

        <NavBar />

        <div
          className="hero-section"
          style={{
            background: "linear-gradient(135deg,#0a1628,#0d2146)",
            padding: "110px 5% 60px",
          }}
        >
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <Link
              to="/"
              style={{
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                fontSize: "0.88rem",
                display: "inline-block",
                marginBottom: 28,
              }}
            >
              ← Terug naar Vedantix
            </Link>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,194,255,0.1)",
                border: "1px solid rgba(0,194,255,0.3)",
                color: "#00c2ff",
                padding: "6px 18px",
                borderRadius: "100px",
                fontSize: "0.82rem",
                fontWeight: 700,
                marginBottom: 22,
              }}
            >
              Hoe het werkt
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem,5vw,3.2rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 18,
                letterSpacing: -1,
              }}
            >
              Van aanvraag tot live —<br />
              <span style={{ color: "#00c2ff" }}>alles uitgelegd</span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "1.05rem",
                maxWidth: 580,
                margin: "0 auto",
              }}
            >
              Transparant, duidelijk en zonder verrassingen. Zo werkt het proces bij Vedantix.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 5%" }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span
                style={{
                  color: "#1a73e8",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Het proces
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  fontWeight: 900,
                  marginTop: 8,
                  letterSpacing: -0.5,
                }}
              >
                Stap voor stap
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {steps.map((s) => (
                <div key={s.num} className={`step-card ${s.highlight ? "highlight" : ""}`}>
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        background: s.highlight
                          ? "#1a73e8"
                          : "linear-gradient(135deg,#0a1628,#1a73e8)",
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.3rem",
                        flexShrink: 0,
                      }}
                    >
                      {s.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            background: s.highlight ? "#1a73e8" : "#f1f5f9",
                            color: s.highlight ? "#fff" : "#64748b",
                            padding: "2px 10px",
                            borderRadius: 100,
                            fontSize: "0.72rem",
                            fontWeight: 800,
                          }}
                        >
                          Stap {s.num}
                        </span>
                        <h3
                          style={{
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            color: s.highlight ? "#1e40af" : "#0a1628",
                          }}
                        >
                          {s.title}
                        </h3>
                      </div>

                      <p style={{ color: "#374151", marginBottom: 8, lineHeight: 1.6 }}>
                        {s.desc}
                      </p>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.88rem",
                          marginBottom: 14,
                          lineHeight: 1.6,
                        }}
                      >
                        {s.detail}
                      </p>

                      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                        {s.tags.map((t) => (
                          <span key={t} className="tag-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "36px 32px",
              border: "1px solid #e5e7eb",
              marginBottom: 48,
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <span
                style={{
                  color: "#1a73e8",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Wijzigingen
              </span>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: 6, marginBottom: 8 }}>
                Gratis vs. betaald — zo werkt het
              </h2>
              <p style={{ color: "#6b7280" }}>
                Elk pakket bevat een aantal gratis wijzigingen. Zodra die op zijn,
                worden aanpassingen afzonderlijk in rekening gebracht.
              </p>
            </div>

            <div
              className="step-grid pkg-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28 }}
            >
              {[
                { name: "Starter", gratis: 0, color: "#6b7280", note: "Elke wijziging vanaf dag 1 is betaald" },
                { name: "Business", gratis: 1, color: "#1a73e8", note: "Wijziging 2 en verder is betaald" },
                { name: "Premium", gratis: 3, color: "#8b5cf6", note: "Wijziging 4 en verder is betaald" },
              ].map((pkg) => (
                <div
                  key={pkg.name}
                  style={{
                    background: "#f8fafc",
                    borderRadius: 14,
                    padding: "20px 16px",
                    textAlign: "center",
                    border: `2px solid ${pkg.color}20`,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      color: pkg.color,
                      fontSize: "0.85rem",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {pkg.name}
                  </div>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0a1628", lineHeight: 1 }}>
                    {pkg.gratis}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: 4, marginBottom: 10 }}>
                    gratis wijzigingen
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.75rem", lineHeight: 1.5 }}>
                    {pkg.note}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#fffbeb",
                border: "1px solid #fcd34d",
                borderRadius: 14,
                padding: "20px 22px",
                marginBottom: 24,
              }}
            >
              <p style={{ fontWeight: 700, color: "#92400e", marginBottom: 12 }}>
                Voorbeeld — Premium pakket (3 gratis)
              </p>

              {[
                { n: 1, label: "Tekst homepage aanpassen", cost: "Gratis", ok: true },
                { n: 2, label: "Logo vervangen", cost: "Gratis", ok: true },
                { n: 3, label: "Pagina herschrijven", cost: "Gratis", ok: true },
                { n: 4, label: "Nieuwe sectie toevoegen", cost: "€75", ok: false },
                { n: 5, label: "Extra contactpagina", cost: "€75", ok: false },
              ].map((r) => (
                <div
                  key={r.n}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: r.n < 5 ? "1px solid #fde68a" : "none",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span
                      style={{
                        background: r.ok ? "#d1fae5" : "#fee2e2",
                        color: r.ok ? "#065f46" : "#991b1b",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {r.n}
                    </span>
                    <span style={{ fontSize: "0.88rem", color: "#374151" }}>{r.label}</span>
                  </div>

                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: r.ok ? "#10b981" : "#ef4444",
                    }}
                  >
                    {r.cost}
                  </span>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: "1rem" }}>
              Voorbeelden van wijzigingen
            </h3>

            <div>
              {changeExamples.map((c, i) => (
                <div key={i} className="change-row">
                  <span
                    style={{
                      background: c.type.startsWith("✅") ? "#d1fae5" : "#fef3c7",
                      color: c.type.startsWith("✅") ? "#065f46" : "#92400e",
                      padding: "3px 10px",
                      borderRadius: 100,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.type}
                  </span>

                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.88rem" }}>{c.example}</p>
                    <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "36px 32px",
              border: "1px solid #e5e7eb",
              marginBottom: 48,
            }}
          >
            <span
              style={{
                color: "#1a73e8",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Database en opslag
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: 6, marginBottom: 8 }}>
              Opslagruimte per pakket
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 24 }}>
              Elke website krijgt opslagruimte voor formulierinzendingen, gegevens en content.
              Dit verschilt per pakket.
            </p>

            <div
              className="pkg-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                { name: "Starter", storage: "500 MB", color: "#6b7280", extra: "€15 per maand per extra GB", icon: "💾" },
                { name: "Business", storage: "2 GB", color: "#1a73e8", extra: "€12 per maand per extra GB", icon: "🗄️" },
                { name: "Premium", storage: "10 GB", color: "#8b5cf6", extra: "€10 per maand per extra GB", icon: "🏦" },
              ].map((p) => (
                <div
                  key={p.name}
                  style={{
                    background: "#f8fafc",
                    borderRadius: 14,
                    padding: "22px 18px",
                    border: `2px solid ${p.color}20`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{p.icon}</div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: p.color,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ fontWeight: 900, fontSize: "1.6rem", color: "#0a1628" }}>
                    {p.storage}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: "0.76rem", marginTop: 8, lineHeight: 1.5 }}>
                    Uitbreiden: {p.extra}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: 12,
                padding: "14px 18px",
              }}
            >
              <p style={{ color: "#0369a1", fontSize: "0.88rem" }}>
                In de meeste gevallen is 500 MB ruim voldoende voor een kleine website.
                Grotere webshops of sites met veel uploads hebben meer nodig. Wij informeren
                je proactief als je de limiet nadert.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 48 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: -0.5 }}>
                Veelgestelde vragen
              </h2>
            </div>

            {faqs.map(([q, a], i) => (
              <div key={i} className="faq-row">
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{q}</span>
                  <span style={{ color: "#1a73e8", fontWeight: 800, fontSize: "1.1rem" }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </div>
                {openFaq === i && <div className="faq-a">{a}</div>}
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#0a1628",
              borderRadius: 20,
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: "clamp(1.6rem,3vw,2.1rem)",
                marginBottom: 14,
              }}
            >
              Klaar om te beginnen?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
              Vraag gratis en vrijblijvend een offerte aan. Geen verrassingen en geen kleine lettertjes.
            </p>

            <div
              className="cta-flex"
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/starters"
                style={{
                  background: "#1a73e8",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Start configurator
              </Link>

              <Link
                to="/prijzen"
                style={{
                  background: "transparent",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: 10,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                Bekijk prijzen
              </Link>
            </div>
          </div>
        </div>

        <footer
          style={{
            background: "#0a1628",
            color: "rgba(255,255,255,0.45)",
            padding: "28px 5%",
            textAlign: "center",
            fontSize: "0.83rem",
          }}
        >
          <p>
            © 2026 <strong style={{ color: "#fff" }}>Vedantix</strong> —{" "}
            <Link to="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
              Home
            </Link>{" "}
            |{" "}
            <Link
              to="/prijzen"
              style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
            >
              Prijzen
            </Link>{" "}
            |{" "}
            <Link
              to="/privacy"
              style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
            >
              Privacy
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const url =
    "https://wa.me/310626219989?text=" +
    encodeURIComponent("Hallo Vedantix! Ik heb een vraag.");

  return (
    <>
      <style>{`
        .wa-fab{position:fixed;bottom:28px;right:28px;z-index:500}
        .wa-btn{width:58px;height:58px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,0.45);display:flex;align-items:center;justify-content:center;transition:transform 0.2s}
        .wa-btn:hover{transform:scale(1.08)}
        .wa-bubble{position:absolute;bottom:68px;right:0;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);width:290px;overflow:hidden;animation:waPop 0.2s ease}
        @keyframes waPop{from{opacity:0;transform:scale(0.92) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .wa-header{background:#075e54;padding:16px 18px;display:flex;align-items:center;gap:12px;position:relative}
        .wa-avatar{width:40px;height:40px;border-radius:50%;background:#128c7e;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .wa-body{padding:16px 18px}
        .wa-msg{background:#f0f0f0;border-radius:0 10px 10px 10px;padding:10px 13px;font-size:0.85rem;color:#1a1a2e;line-height:1.5;margin-bottom:14px}
        .wa-open{display:block;background:#25d366;color:#fff;text-align:center;padding:11px;border-radius:9px;font-weight:700;text-decoration:none;font-size:0.88rem}
        .wa-badge{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;width:18px;height:18px;border-radius:50%;font-size:0.65rem;font-weight:800;display:flex;align-items:center;justify-content:center}
      `}</style>

      <div className="wa-fab">
        {open && (
          <div className="wa-bubble">
            <div className="wa-header">
              <div className="wa-avatar">V</div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
                  Vedantix
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>
                  Gemiddeld binnen 1 uur
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ✕
              </button>
            </div>

            <div className="wa-body">
              <div className="wa-msg">
                Hallo! Heb je een vraag? Stuur ons een WhatsApp-bericht — we reageren snel.
              </div>
              <a href={url} target="_blank" rel="noreferrer" className="wa-open">
                Chat openen op WhatsApp
              </a>
            </div>
          </div>
        )}

        <button className="wa-btn" onClick={() => setOpen((p) => !p)} aria-label="WhatsApp">
          {!open && <div className="wa-badge">1</div>}
          <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>
    </>
  );
}