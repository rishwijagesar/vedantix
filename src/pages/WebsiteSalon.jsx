import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";
import { cities, blogPosts } from "../data/seoData";

export default function WebsiteSalon() {
  const canonical = "https://vedantix.nl/website-salon";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor salons",
    slug: "website-salon",
    description:
      "Vedantix maakt professionele, snelle en mobielvriendelijke websites voor salons die meer boekingen willen ontvangen en online meer vertrouwen willen opbouwen.",
    audienceType: "Salons",
    serviceType: "Website development voor salons",
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Website Salon", url: canonical },
  ]);

  const pageTitle = "Website laten maken voor salons | Vedantix";
  const pageDescription =
    "Professionele website laten maken voor een salon? Vedantix bouwt snelle websites waarmee je meer boekingen ontvangt, vertrouwen opbouwt en beter zichtbaar wordt.";

  const relatedCities = cities.slice(0, 6);
  const relatedBlogs = blogPosts
    .filter((post) => post.niche === "salon")
    .slice(0, 3);

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        schemas={[serviceSchema, breadcrumbSchema]}
      />

      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          color: "#0f172a",
        }}
      >
        <style>{`
          * { box-sizing: border-box; }

          .salon-page-shell {
            max-width: 980px;
            margin: 0 auto;
            padding: 110px 20px 60px;
          }

          .salon-hero {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #fff;
            border-radius: 20px;
            padding: 48px 32px;
            margin-top: 24px;
            box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
          }

          .salon-content-grid {
            display: grid;
            grid-template-columns: 1.4fr 0.9fr;
            gap: 28px;
            margin-top: 32px;
          }

          .salon-card {
            background: #fff;
            border-radius: 18px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          }

          .salon-cta-row {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-top: 28px;
          }

          .salon-pill-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .salon-bottom-cta {
            margin-top: 28px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #fff;
            border-radius: 18px;
            padding: 28px 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
          }

          .salon-blog-grid {
            display: grid;
            gap: 14px;
          }

          @media (max-width: 900px) {
            .salon-content-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .salon-page-shell {
              padding: 96px 16px 48px;
            }

            .salon-hero,
            .salon-card,
            .salon-bottom-cta {
              padding: 24px 20px;
              border-radius: 16px;
            }

            .salon-cta-row a {
              width: 100%;
              text-align: center;
            }

            .salon-bottom-cta a {
              width: 100%;
              text-align: center;
            }
          }

          @media (max-width: 480px) {
            .salon-page-shell {
              padding: 90px 14px 40px;
            }

            .salon-hero h1 {
              font-size: 1.9rem !important;
            }

            .salon-card h2 {
              font-size: 1.25rem !important;
            }
          }
        `}</style>

        <NavBar />

        <div className="salon-page-shell">
          <section className="salon-hero">
            <div style={{ maxWidth: 760 }}>
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#93c5fd",
                }}
              >
                Websites voor salons
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: 1.05,
                  fontWeight: 800,
                }}
              >
                Website laten maken voor salons
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: 680,
                }}
              >
                Wil je meer boekingen voor jouw schoonheidssalon, nagelstudio of
                beautysalon? Dan heb je een website nodig die vertrouwen
                uitstraalt, jouw behandelingen duidelijk presenteert en bezoekers
                eenvoudig laat contact opnemen of een afspraak aanvragen.
              </p>

              <div className="salon-cta-row">
                <a
                  href="#analyse"
                  style={{
                    display: "inline-block",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "14px 20px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Vraag gratis analyse aan
                </a>

                <a
                  href="https://wa.me/310626219989"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    background: "transparent",
                    color: "#fff",
                    padding: "14px 20px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  Stuur direct een WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section className="salon-content-grid">
            <div className="salon-card">
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "1.6rem",
                }}
              >
                Meer boekingen via een professionele salonwebsite
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Veel klanten zoeken online naar een salon in de buurt voordat ze
                een afspraak maken. Op dat moment wil je direct een verzorgde en
                professionele indruk maken. Een goede website laat zien welke
                behandelingen je aanbiedt, wat jouw stijl is en hoe eenvoudig
                klanten een afspraak kunnen aanvragen.
              </p>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Vedantix bouwt websites voor salons die gericht zijn op
                uitstraling, gebruiksgemak en conversie. Zo krijgt jouw salon
                een website die niet alleen mooi oogt, maar ook helpt om meer
                aanvragen en boekingen binnen te halen.
              </p>

              <h2
                style={{
                  marginTop: "30px",
                  marginBottom: "14px",
                  fontSize: "1.35rem",
                }}
              >
                Wat jouw website minimaal moet bevatten
              </h2>

              <ul
                style={{
                  paddingLeft: "20px",
                  color: "#334155",
                  lineHeight: 1.9,
                  marginBottom: 0,
                }}
              >
                <li>Een overzichtelijke pagina met behandelingen en tarieven</li>
                <li>Een duidelijke boekingsknop of afspraakverzoek</li>
                <li>Mobielvriendelijk design voor bezoekers op smartphone</li>
                <li>WhatsApp integratie voor snel contact</li>
                <li>Google Maps en contactgegevens</li>
                <li>Snelle laadtijd en sterke basis voor lokale vindbaarheid</li>
              </ul>
            </div>

            <div className="salon-card" style={{ alignSelf: "start" }}>
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "12px",
                  fontSize: "1.25rem",
                }}
              >
                Waarom een website belangrijk is voor salons
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Klanten vergelijken vaak meerdere salons voordat ze kiezen.
                Zonder professionele website kiezen ze sneller voor een
                concurrent die online verzorgder oogt en makkelijker te vinden
                is.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "#eff6ff",
                  border: "1px solid #dbeafe",
                }}
              >
                <strong style={{ display: "block", marginBottom: "8px" }}>
                  Geschikt voor onder andere:
                </strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                  Schoonheidssalons, nagelstudio’s, beautysalons, brow bars,
                  lash salons en huidverzorgingsstudio’s.
                </p>
              </div>

              <div
                style={{
                  marginTop: "18px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <strong style={{ display: "block", marginBottom: "8px" }}>
                  Vanaf
                </strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                  Pakketten vanaf €99 per maand, inclusief hosting en support.
                </p>
              </div>
            </div>
          </section>

          <section className="salon-card" style={{ marginTop: "28px" }}>
            <h2
              style={{
                marginTop: 0,
                marginBottom: "14px",
                fontSize: "1.6rem",
              }}
            >
              Wat wij bouwen voor salons
            </h2>

            <p style={{ color: "#475569", lineHeight: 1.8 }}>
              Onze websites voor salons zijn ontworpen om meer afspraken op te
              leveren. Ze combineren een verzorgde uitstraling met duidelijke
              informatie, snelle contactmogelijkheden en een prettige ervaring
              op mobiel en desktop.
            </p>

            <ul
              style={{
                paddingLeft: "20px",
                color: "#334155",
                lineHeight: 1.9,
                marginBottom: 0,
              }}
            >
              <li>Mobielvriendelijke website</li>
              <li>Boekingsknop of afspraakverzoek</li>
              <li>WhatsApp integratie</li>
              <li>Google Maps integratie</li>
              <li>Snelle laadtijd</li>
              <li>Duidelijke call-to-actions voor contact en afspraken</li>
            </ul>
          </section>

          <section
            id="analyse"
            className="salon-card"
            style={{
              scrollMarginTop: "100px",
              marginTop: "28px",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "12px",
                fontSize: "1.6rem",
              }}
            >
              Vraag gratis een website analyse aan
            </h2>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.8,
                maxWidth: 720,
                marginBottom: "24px",
              }}
            >
              Wil je weten hoe jouw salon online meer boekingen kan krijgen?
              Laat ons kijken naar jouw huidige website of online zichtbaarheid.
              Je ontvangt vrijblijvend inzicht in verbeterpunten voor
              uitstraling, vindbaarheid en conversie.
            </p>

            <form
              action="https://formspree.io/f/mqeyjgna"
              method="POST"
              style={{
                display: "grid",
                gap: "12px",
                maxWidth: "480px",
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
                  fontSize: "0.95rem",
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
                  fontSize: "0.95rem",
                }}
              />

              <input
                type="text"
                name="business"
                placeholder="Naam salon"
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
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
                  fontSize: "0.95rem",
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
                marginBottom: 0,
              }}
            >
              Reactie binnen 24 uur • Vrijblijvend • 100% gratis
            </p>
          </section>

          <section className="salon-card" style={{ marginTop: "32px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.35rem" }}>
              Salons per stad
            </h2>

            <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "18px" }}>
              Zoek je een pagina gericht op jouw regio? Bekijk ook onze lokale
              pagina’s voor salons in verschillende steden.
            </p>

            <div className="salon-pill-links">
              {relatedCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/website/salon/${city.slug}`}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    background: "#f3f4f6",
                    color: "#111827",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Salon in {city.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="salon-card" style={{ marginTop: "28px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.35rem" }}>
              Gerelateerde blogs
            </h2>

            <div className="salon-blog-grid">
              {relatedBlogs.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  style={{
                    display: "block",
                    padding: 18,
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    textDecoration: "none",
                    color: "#111827",
                    background: "#fff",
                  }}
                >
                  <strong style={{ display: "block", marginBottom: 6 }}>
                    {post.title}
                  </strong>
                  <span style={{ color: "#6b7280", lineHeight: 1.6 }}>
                    {post.intro}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="salon-bottom-cta">
            <div style={{ maxWidth: 620 }}>
              <h2 style={{ margin: "0 0 10px", fontSize: "1.4rem" }}>
                Liever direct contact?
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.7,
                }}
              >
                Stuur direct een WhatsApp-bericht en bespreek jouw wensen voor
                een website voor je salon.
              </p>
            </div>

            <a
              href="https://wa.me/310626219989"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                background: "#fff",
                color: "#15803d",
                padding: "14px 20px",
                borderRadius: "10px",
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
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