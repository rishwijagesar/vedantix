import { Helmet } from "react-helmet-async";
import NavBar from "../components/NavBar";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";

export default function WebsiteFotograaf() {
  const canonical = "https://vedantix.nl/website-fotograaf";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor fotografen",
    slug: "website-fotograaf",
    description:
      "Vedantix maakt professionele, snelle en mobielvriendelijke websites voor fotografen die meer boekingen willen ontvangen via hun portfolio en online zichtbaarheid.",
    audienceType: "Fotografen",
    serviceType: "Website development voor fotografen"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Website Fotograaf", url: canonical }
  ]);

  const pageTitle = "Website laten maken voor fotografen | Vedantix";
  const pageDescription =
    "Professionele website laten maken voor fotografen? Vedantix bouwt snelle portfolio websites waarmee je meer zichtbaarheid, vertrouwen en aanvragen krijgt.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://vedantix.nl/preview.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://vedantix.nl/preview.png" />

        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          color: "#0f172a"
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px 60px" }}>
          <NavBar />

          <section
            style={{
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              color: "#fff",
              borderRadius: "20px",
              padding: "48px 32px",
              marginTop: "24px",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.18)"
            }}
          >
            <div style={{ maxWidth: 720 }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#93c5fd"
                }}
              >
                Websites voor fotografen
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: 1.05,
                  fontWeight: 800
                }}
              >
                Website laten maken voor fotografen
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: 640
                }}
              >
                Wil je meer shoots boeken en professioneler overkomen als
                fotograaf? Dan heb je een website nodig die jouw portfolio sterk
                presenteert, vertrouwen opbouwt en bezoekers overtuigt om
                contact op te nemen.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "28px"
                }}
              >
                <a
                  href="#analyse"
                  style={{
                    display: "inline-block",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "14px 20px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    textDecoration: "none"
                  }}
                >
                  Vraag gratis analyse aan
                </a>

                <a
                  href="https://wa.me/310626219989"
                  style={{
                    display: "inline-block",
                    background: "transparent",
                    color: "#fff",
                    padding: "14px 20px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.25)"
                  }}
                >
                  Stuur direct een WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.9fr",
              gap: "28px",
              marginTop: "32px"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "32px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)"
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "1.6rem"
                }}
              >
                Meer klanten via een sterke portfolio website
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Veel mensen zoeken online naar een fotograaf voor een bruiloft,
                portretshoot, zakelijke reportage of evenement. Op dat moment
                wil je direct professioneel overkomen. Een goede website laat
                niet alleen je werk zien, maar maakt ook duidelijk waarom iemand
                voor jou moet kiezen.
              </p>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Vedantix bouwt websites voor fotografen die gericht zijn op
                presentatie, snelheid en conversie. Jouw beelden krijgen de
                ruimte, terwijl de website bezoekers helpt om snel contact op te
                nemen of een aanvraag te doen.
              </p>

              <h2
                style={{
                  marginTop: "30px",
                  marginBottom: "14px",
                  fontSize: "1.35rem"
                }}
              >
                Wat jouw website minimaal moet kunnen
              </h2>

              <ul
                style={{
                  paddingLeft: "20px",
                  color: "#334155",
                  lineHeight: 1.9,
                  marginBottom: 0
                }}
              >
                <li>Een professionele portfolio pagina met jouw beste werk</li>
                <li>Een duidelijke dienstenpagina per type fotografie</li>
                <li>Een contactformulier voor nieuwe aanvragen</li>
                <li>Mobielvriendelijk design voor bezoekers op smartphone</li>
                <li>Snelle laadtijd voor betere gebruikservaring</li>
                <li>WhatsApp integratie voor laagdrempelig contact</li>
              </ul>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "28px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                alignSelf: "start"
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "12px",
                  fontSize: "1.25rem"
                }}
              >
                Waarom fotografen een website nodig hebben
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Social media is nuttig, maar meestal niet genoeg. Een eigen
                website geeft meer vertrouwen, betere vindbaarheid in Google en
                een centrale plek waar klanten jouw stijl, werkwijze en
                contactinformatie direct kunnen vinden.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "#eff6ff",
                  border: "1px solid #dbeafe"
                }}
              >
                <strong style={{ display: "block", marginBottom: "8px" }}>
                  Geschikt voor onder andere:
                </strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                  Bruiloftsfotografen, portretfotografen, familiefotografen,
                  vastgoedfotografen, eventfotografen en zakelijke fotografen.
                </p>
              </div>
            </div>
          </section>

          <section
            id="analyse"
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              marginTop: "28px"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "1.6rem"
              }}
            >
              Vraag gratis een website analyse aan
            </h2>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.8,
                maxWidth: 720,
                marginBottom: "24px"
              }}
            >
              Wil je weten hoe jouw fotografiebedrijf online sterker kan
              presteren? Laat ons kijken naar jouw huidige situatie. Je ontvangt
              vrijblijvend inzicht in verbeterpunten voor zichtbaarheid,
              uitstraling en conversie.
            </p>

            <form
              action="https://formspree.io/f/mqeyjgna"
              method="POST"
              style={{
                display: "grid",
                gap: "12px",
                maxWidth: "480px"
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Naam"
                required
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem"
                }}
              />

              <input
                type="email"
                name="email"
                placeholder="E-mailadres"
                required
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem"
                }}
              />

              <input
                type="text"
                name="business"
                placeholder="Type fotografie (bijv. bruiloft, portret, events)"
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem"
                }}
              />

              <button
                type="submit"
                style={{
                  background: "#111827",
                  color: "#fff",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem"
                }}
              >
                Gratis analyse aanvragen →
              </button>
            </form>

            <p
              style={{
                fontSize: "0.85rem",
                color: "#64748b",
                marginTop: "12px",
                marginBottom: 0
              }}
            >
              Reactie binnen 24 uur • Vrijblijvend • 100% gratis
            </p>
          </section>

          <section
            style={{
              marginTop: "28px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
              borderRadius: "18px",
              padding: "28px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <h2 style={{ margin: "0 0 10px", fontSize: "1.4rem" }}>
                Liever direct contact?
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.7
                }}
              >
                Stuur direct een WhatsApp-bericht en bespreek jouw wensen voor
                een fotografie website.
              </p>
            </div>

            <a
              href="https://wa.me/310626219989"
              style={{
                display: "inline-block",
                background: "#fff",
                color: "#15803d",
                padding: "14px 20px",
                borderRadius: "10px",
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap"
              }}
            >
              WhatsApp Vedantix →
            </a>
          </section>
        </div>
      </div>
    </>
  );
}