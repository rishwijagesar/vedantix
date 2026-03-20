import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";

export default function WebsiteSchoonmaakbedrijf() {
  const canonical = "https://vedantix.nl/website-schoonmaakbedrijf";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor schoonmaakbedrijven",
    slug: "website-schoonmaakbedrijf",
    description:
      "Vedantix maakt professionele websites voor schoonmaakbedrijven die meer aanvragen willen ontvangen en online vertrouwen willen opbouwen.",
    audienceType: "Schoonmaakbedrijven",
    serviceType: "Website development voor schoonmaakbedrijven"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    {
      name: "Website Schoonmaakbedrijf",
      url: canonical
    }
  ]);

  return (
    <>
      <SEO
        title="Website laten maken voor schoonmaakbedrijven | Vedantix"
        description="Professionele website laten maken voor een schoonmaakbedrijf? Vedantix bouwt snelle websites die zorgen voor meer vertrouwen en meer aanvragen."
        canonical={canonical}
        schemas={[serviceSchema, breadcrumbSchema]}
      />

      <div style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
        <NavBar />

        <h1>Website laten maken voor schoonmaakbedrijven</h1>

        <p>
          Wil je als schoonmaakbedrijf meer aanvragen ontvangen en professioneler
          overkomen? Dan is een sterke website onmisbaar. Veel klanten zoeken
          online naar een betrouwbaar schoonmaakbedrijf voordat ze contact
          opnemen.
        </p>

        <h2>Meer aanvragen via een professionele website</h2>
        <p>
          Een goede website maakt direct duidelijk welke schoonmaakdiensten je
          aanbiedt, voor welke klanten je werkt en hoe eenvoudig contact kan
          worden opgenomen. Zo verlaag je de drempel voor nieuwe aanvragen.
        </p>

        <ul>
          <li>Duidelijk overzicht van jouw schoonmaakdiensten</li>
          <li>Professionele uitstraling en vertrouwen</li>
          <li>Contactformulier voor aanvragen</li>
          <li>Mobielvriendelijk design</li>
          <li>Supersnelle laadtijd</li>
        </ul>

        <h2>Waarom een website belangrijk is voor schoonmaakbedrijven</h2>
        <p>
          Klanten willen snel weten wat je doet, in welke regio je werkt en hoe
          ze je kunnen bereiken. Een verzorgde website helpt je betrouwbaarder
          en professioneler over te komen dan alleen een telefoonnummer of
          social media pagina.
        </p>

        <h2>Vraag gratis website analyse aan</h2>
        <p>
          Wil je weten hoe jouw schoonmaakbedrijf online meer klanten kan
          aantrekken? Vraag een gratis analyse aan en ontvang gericht advies.
        </p>

        <form
          action="https://formspree.io/f/mqeyjgna"
          method="POST"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
            maxWidth: "400px"
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Naam"
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
          />

          <input
            type="text"
            name="business"
            placeholder="Bedrijfsnaam of type schoonmaak"
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
          />

          <button
            type="submit"
            style={{
              background: "#111827",
              color: "#fff",
              padding: "14px",
              borderRadius: "8px",
              fontWeight: "700",
              border: "none",
              cursor: "pointer"
            }}
          >
            Gratis analyse aanvragen →
          </button>
        </form>

        <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "10px" }}>
          Reactie binnen 24 uur • 100% gratis
        </p>

        <div style={{ marginTop: "30px" }}>
          <a
            href="https://wa.me/310626219989"
            style={{
              display: "inline-block",
              background: "#25d366",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: "700",
              textDecoration: "none"
            }}
          >
            Of stuur direct een WhatsApp →
          </a>
        </div>
      </div>
    </>
  );
}