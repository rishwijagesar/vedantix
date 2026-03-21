import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";
import { cities, blogPosts } from "../data/seoData";

export default function WebsiteRestaurant() {
  const canonical = "https://vedantix.nl/website-restaurant";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor restaurants",
    slug: "website-restaurant",
    description:
      "Vedantix maakt snelle en professionele websites voor restaurants met duidelijke menukaarten, contactinformatie en een sterke lokale uitstraling.",
    audienceType: "Restaurants",
    serviceType: "Website development voor restaurants",
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Website Restaurant", url: canonical },
  ]);

  const relatedCities = cities.slice(0, 6);
  const relatedBlogs = blogPosts
    .filter((post) => post.niche === "restaurant")
    .slice(0, 3);

  return (
    <>
      <SEO
        title="Website laten maken voor restaurants | Vedantix"
        description="Professionele website laten maken voor restaurants? Vedantix bouwt snelle websites met menukaart, contactinformatie en sterke lokale zichtbaarheid."
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

          .restaurant-page-shell {
            max-width: 980px;
            margin: 0 auto;
            padding: 110px 20px 60px;
          }

          .restaurant-hero {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #fff;
            border-radius: 20px;
            padding: 48px 32px;
            margin-top: 24px;
            box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
          }

          .restaurant-content-grid {
            display: grid;
            grid-template-columns: 1.4fr 0.9fr;
            gap: 28px;
            margin-top: 32px;
          }

          .restaurant-card {
            background: #fff;
            border-radius: 18px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          }

          .restaurant-cta-row {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-top: 28px;
          }

          .restaurant-pill-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .restaurant-bottom-cta {
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

          .restaurant-blog-grid {
            display: grid;
            gap: 14px;
          }

          @media (max-width: 900px) {
            .restaurant-content-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .restaurant-page-shell {
              padding: 96px 16px 48px;
            }

            .restaurant-hero,
            .restaurant-card,
            .restaurant-bottom-cta {
              padding: 24px 20px;
              border-radius: 16px;
            }

            .restaurant-cta-row a {
              width: 100%;
              text-align: center;
            }

            .restaurant-bottom-cta a {
              width: 100%;
              text-align: center;
            }
          }

          @media (max-width: 480px) {
            .restaurant-page-shell {
              padding: 90px 14px 40px;
            }

            .restaurant-hero h1 {
              font-size: 1.9rem !important;
            }

            .restaurant-card h2 {
              font-size: 1.25rem !important;
            }
          }
        `}</style>

        <NavBar />

        <div className="restaurant-page-shell">
          <section className="restaurant-hero">
            <div style={{ maxWidth: 720 }}>
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
                Websites voor restaurants
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: 1.05,
                  fontWeight: 800,
                }}
              >
                Website laten maken voor restaurants
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: 640,
                }}
              >
                Wil je meer reserveringen en beter zichtbaar zijn in Google?
                Dan is een professionele restaurantwebsite essentieel. Gasten
                zoeken online naar menukaarten, openingstijden en
                contactinformatie voordat ze een keuze maken.
              </p>

              <div className="restaurant-cta-row">
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

          <section className="restaurant-content-grid">
            <div className="restaurant-card">
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "1.6rem",
                }}
              >
                Meer reserveringen via jouw website
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Een sterke restaurantwebsite laat direct jouw sfeer, gerechten
                en praktische informatie zien. Dat helpt bezoekers sneller
                beslissen om contact op te nemen of een tafel te reserveren.
              </p>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Vedantix bouwt websites voor restaurants die gericht zijn op
                uitstraling, gebruiksgemak en lokale vindbaarheid. Geen losse
                pagina zonder richting, maar een website die vertrouwen opbouwt
                en gasten helpt om snel te reserveren of contact op te nemen.
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
                <li>Duidelijke menukaart of aanbod</li>
                <li>Openingstijden en locatie</li>
                <li>Contactformulier of reserveringsmogelijkheid</li>
                <li>Mobielvriendelijk design</li>
                <li>Supersnelle laadtijd</li>
                <li>Google Maps en WhatsApp integratie</li>
              </ul>
            </div>

            <div className="restaurant-card" style={{ alignSelf: "start" }}>
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "12px",
                  fontSize: "1.25rem",
                }}
              >
                Waarom een website belangrijk is voor restaurants
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Veel potentiële gasten bekijken eerst online of jouw restaurant
                bij hen past. Zonder verzorgde website mis je kansen om
                vertrouwen te wekken en reserveringen binnen te halen.
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
                  Restaurants, bistro’s, eetcafés, lunchrooms, grillrooms,
                  bezorgrestaurants en lokale horecaondernemers.
                </p>
              </div>
            </div>
          </section>

          <section
            id="analyse"
            className="restaurant-card"
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
              Vraag gratis website analyse aan
            </h2>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.8,
                maxWidth: 720,
                marginBottom: "24px",
              }}
            >
              Benieuwd hoe jouw restaurant online sterker kan presteren? Vraag
              een gratis analyse aan en ontdek waar kansen liggen op het gebied
              van uitstraling, vindbaarheid en reserveringen.
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
                placeholder="Naam van je restaurant"
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

          <section className="restaurant-card" style={{ marginTop: "32px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.35rem" }}>
              Restaurants per stad
            </h2>

            <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "18px" }}>
              Zoek je een pagina gericht op jouw regio? Bekijk ook onze lokale
              pagina’s voor restaurants in verschillende steden.
            </p>

            <div className="restaurant-pill-links">
              {relatedCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/website/restaurant/${city.slug}`}
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
                  Restaurant in {city.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="restaurant-card" style={{ marginTop: "28px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.35rem" }}>
              Gerelateerde blogs
            </h2>

            <div className="restaurant-blog-grid">
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

          <section className="restaurant-bottom-cta">
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
                een restaurantwebsite.
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