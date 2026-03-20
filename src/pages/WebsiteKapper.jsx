import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";

export default function WebsiteKapper() {
  const canonical = "https://vedantix.nl/website-kapper";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor kappers",
    slug: "website-kapper",
    description:
      "Vedantix maakt professionele, snelle en mobielvriendelijke websites voor kappers die lokaal beter gevonden willen worden en meer afspraken willen ontvangen.",
    audienceType: "Kappers",
    serviceType: "Website development voor kappers"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Website Kapper", url: canonical }
  ]);

  return (
    <>
      <SEO
        title="Website laten maken voor kappers | Vedantix"
        description="Professionele website laten maken voor kappers? Vedantix bouwt snelle websites waarmee je lokaal beter gevonden wordt en meer afspraken krijgt."
        canonical={canonical}
        schemas={[serviceSchema, breadcrumbSchema]}
      />

      <div style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
        <NavBar />

        <h1>Website laten maken voor kappers</h1>

        <p>
          Wil je als kapper meer afspraken via Google en je website ontvangen?
          Dan is een professionele website onmisbaar. Veel mensen zoeken online
          naar een kapper in de buurt. Zonder sterke website loop je klanten mis.
        </p>

        <h2>Meer afspraken via een professionele website</h2>
        <p>
          Een goede kapperswebsite laat direct zien wie je bent, welke
          behandelingen je aanbiedt en hoe klanten eenvoudig een afspraak kunnen
          maken. Zo straal je vertrouwen uit en verhoog je de kans op nieuwe
          boekingen.
        </p>

        <ul>
          <li>Duidelijke behandelingen en tarieven</li>
          <li>Afspraakmogelijkheden of contactformulier</li>
          <li>Mobielvriendelijk design</li>
          <li>Snelle laadtijd</li>
          <li>WhatsApp integratie</li>
        </ul>

        <h2>Waarom een website belangrijk is voor kappers</h2>
        <p>
          Klanten vergelijken vaak meerdere salons voordat ze kiezen. Een
          verzorgde website helpt om professioneler over te komen en sneller
          vertrouwen op te bouwen dan alleen een social media profiel.
        </p>

        <h2>Vraag gratis website analyse aan</h2>
        <p>
          Benieuwd hoe jouw salon online meer zichtbaar kan worden? Vraag een
          gratis analyse aan en ontdek wat er beter kan.
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
            placeholder="Naam van je salon"
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