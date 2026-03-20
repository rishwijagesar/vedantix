import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";

export default function WebsiteKlusbedrijf() {
  const canonical = "https://vedantix.nl/website-klusbedrijf";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor klusbedrijven",
    slug: "website-klusbedrijf",
    description:
      "Vedantix maakt professionele, snelle en mobielvriendelijke websites voor klusbedrijven die meer offerteaanvragen willen ontvangen en lokaal beter gevonden willen worden.",
    audienceType: "Klusbedrijven",
    serviceType: "Website development voor klusbedrijven"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Website Klusbedrijf", url: canonical }
  ]);

  const pageTitle = "Website laten maken voor klusbedrijven | Vedantix";
  const pageDescription =
    "Professionele website laten maken voor een klusbedrijf? Vedantix bouwt snelle websites waarmee je beter zichtbaar wordt, vertrouwen opbouwt en meer aanvragen ontvangt.";

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
            <div style={{ maxWidth: 760 }}>
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
                Websites voor klusbedrijven
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: 1.05,
                  fontWeight: 800
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
                  maxWidth: 680
                }}
              >
                Wil je als klusbedrijf meer opdrachten binnenhalen via Google en
                professioneler overkomen op nieuwe klanten? Dan heb je een
                website nodig die vertrouwen wekt, jouw werkzaamheden helder
                presenteert en bezoekers snel laat aanvragen.
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
                  fontSize: "1.35rem"
                }}
              >
                Wat jouw website minimaal moet bevatten
              </h2>

              <ul
                style={{
                  paddingLeft: "20px",
                  color: "#334155",
                  lineHeight: 1.9,
                  marginBottom: 0
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
                  border: "1px solid #dbeafe"
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
                  border: "1px solid #e2e8f0"
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

          <section
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
                marginBottom: "14px",
                fontSize: "1.6rem"
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
                marginBottom: 0
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
                placeholder="Naam klusbedrijf"
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
                een website voor je klusbedrijf.
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