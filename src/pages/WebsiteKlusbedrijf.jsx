import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";
import { cities, blogPosts } from "../data/seoData";

export default function WebsiteKlusbedrijf() {
  const canonical = "https://vedantix.nl/website-klusbedrijf";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor klusbedrijven",
    slug: "website-klusbedrijf",
    description:
      "Vedantix maakt professionele, snelle en mobielvriendelijke websites voor klusbedrijven die meer offerteaanvragen willen ontvangen en lokaal beter gevonden willen worden.",
    audienceType: "Klusbedrijven",
    serviceType: "Website development voor klusbedrijven",
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Website Klusbedrijf", url: canonical },
  ]);

  const pageTitle = "Website laten maken voor klusbedrijven | Vedantix";
  const pageDescription =
    "Professionele website laten maken voor een klusbedrijf? Vedantix bouwt snelle websites waarmee je beter zichtbaar wordt, vertrouwen opbouwt en meer aanvragen ontvangt.";

  const relatedCities = cities.slice(0, 6);
  const relatedBlogs = blogPosts
    .filter((post) => post.niche === "klusbedrijf")
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

          .klus-page-shell {
            max-width: 980px;
            margin: 0 auto;
            padding: 110px 20px 60px;
          }

          .klus-hero {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #fff;
            border-radius: 20px;
            padding: 48px 32px;
            margin-top: 24px;
            box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
          }

          .klus-content-grid {
            display: grid;
            grid-template-columns: 1.4fr 0.9fr;
            gap: 28px;
            margin-top: 32px;
          }

          .klus-card {
            background: #fff;
            border-radius: 18px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          }

          .klus-cta-row {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-top: 28px;
          }

          .klus-pill-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .klus-bottom-cta {
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

          .klus-blog-grid {
            display: grid;
            gap: 14px;
          }

          @media (max-width: 900px) {
            .klus-content-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .klus-page-shell {
              padding: 96px 16px 48px;
            }

            .klus-hero,
            .klus-card,
            .klus-bottom-cta {
              padding: 24px 20px;
              border-radius: 16px;
            }

            .klus-cta-row a {
              width: 100%;
              text-align: center;
            }

            .klus-bottom-cta a {
              width: 100%;
              text-align: center;
            }
          }

          @media (max-width: 480px) {
            .klus-page-shell {
              padding: 90px 14px 40px;
            }

            .klus-hero h1 {
              font-size: 1.9rem !important;
            }

            .klus-card h2 {
              font-size: 1.25rem !important;
            }
          }
        `}</style>

        <NavBar />

        <div className="klus-page-shell">
          <section className="klus-hero">
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
                Websites voor klusbedrijven
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: 1.05,
                  fontWeight: 800,
                }}
              >
                Website laten maken voor klusbedrijven
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
                Wil je als klusbedrijf meer opdrachten binnenhalen via Google en
                professioneler overkomen op nieuwe klanten? Dan heb je een
                website nodig die vertrouwen wekt, jouw werkzaamheden helder
                presenteert en bezoekers snel laat aanvragen.
              </p>

              <div className="klus-cta-row">
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

          <section className="klus-content-grid">
            <div className="klus-card">
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "1.6rem",
                }}
              >
                Meer offerteaanvragen via een professionele website
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Veel mensen zoeken online naar een klusbedrijf, aannemer of
                vakman in de buurt. Op dat moment wil je direct een betrouwbare
                indruk maken. Een goede website laat zien wat je doet, welke
                projecten je hebt uitgevoerd en hoe klanten eenvoudig contact
                met je kunnen opnemen.
              </p>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Vedantix bouwt websites voor klusbedrijven die gericht zijn op
                zichtbaarheid, vertrouwen en conversie. Geen simpele online
                visitekaart, maar een website die helpt om nieuwe aanvragen
                binnen te halen.
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
                <li>Een duidelijke pagina met jouw diensten en werkzaamheden</li>
                <li>Een contactformulier voor offerteaanvragen</li>
                <li>Projecten of afgeronde klussen als referentie</li>
                <li>Mobielvriendelijk design voor bezoekers op smartphone</li>
                <li>Google Maps en contactgegevens</li>
                <li>Snelle laadtijd en sterke basis voor lokale SEO</li>
              </ul>
            </div>

            <div className="klus-card" style={{ alignSelf: "start" }}>
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "12px",
                  fontSize: "1.25rem",
                }}
              >
                Waarom een website belangrijk is voor klusbedrijven
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8 }}>
                Klanten vergelijken vaak meerdere bedrijven voordat ze contact
                opnemen. Zonder verzorgde website kiezen ze sneller voor een
                concurrent die online betrouwbaarder oogt en duidelijker laat
                zien wat hij doet.
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
                  Allround klusbedrijven, renovatiespecialisten, timmermannen,
                  montagebedrijven, onderhoudsbedrijven en zelfstandige vakmannen.
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

          <section className="klus-card" style={{ marginTop: "28px" }}>
            <h2
              style={{
                marginTop: 0,
                marginBottom: "14px",
                fontSize: "1.6rem",
              }}
            >
              Wat wij bouwen voor klusbedrijven
            </h2>

            <p style={{ color: "#475569", lineHeight: 1.8 }}>
              Onze websites voor klusbedrijven zijn ontworpen om werk op te
              leveren. Ze combineren een professionele uitstraling met duidelijke
              informatie, snelle contactmogelijkheden en een sterke basis voor
              lokale zichtbaarheid.
            </p>

            <ul
              style={{
                paddingLeft: "20px",
                color: "#334155",
                lineHeight: 1.9,
                marginBottom: 0,
              }}
            >
              <li>Contactformulier voor nieuwe aanvragen</li>
              <li>Project showcase of afgeronde klussen</li>
              <li>SEO basisoptimalisatie</li>
              <li>Mobielvriendelijk design</li>
              <li>Google Maps integratie</li>
              <li>Snelle laadtijd</li>
              <li>Duidelijke call-to-actions voor bellen of WhatsApp</li>
            </ul>
          </section>

          <section
            id="analyse"
            className="klus-card"
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
              Wil je weten hoe jouw klusbedrijf online meer offerteaanvragen kan
              krijgen? Laat ons kijken naar jouw huidige zichtbaarheid en
              website. Je ontvangt vrijblijvend inzicht in verbeterpunten voor
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
                placeholder="Naam klusbedrijf"
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

          <section className="klus-card" style={{ marginTop: "32px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.35rem" }}>
              Klusbedrijven per stad
            </h2>

            <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "18px" }}>
              Zoek je een pagina gericht op jouw regio? Bekijk ook onze lokale
              pagina’s voor klusbedrijven in verschillende steden.
            </p>

            <div className="klus-pill-links">
              {relatedCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/website/klusbedrijf/${city.slug}`}
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
                  Klusbedrijf in {city.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="klus-card" style={{ marginTop: "28px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "16px", fontSize: "1.35rem" }}>
              Gerelateerde blogs
            </h2>

            <div className="klus-blog-grid">
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

          <section className="klus-bottom-cta">
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
                een website voor je klusbedrijf.
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