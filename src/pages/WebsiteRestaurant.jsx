import NavBar from "../components/NavBar";
import SEO from "../components/SEO";
import { createServiceSchema, createBreadcrumbSchema } from "../utils/schema";

export default function WebsiteRestaurant() {
  const canonical = "https://vedantix.nl/website-restaurant";

  const serviceSchema = createServiceSchema({
    name: "Website laten maken voor restaurants",
    slug: "website-restaurant",
    description:
      "Vedantix maakt snelle en professionele websites voor restaurants met duidelijke menukaarten, contactinformatie en een sterke lokale uitstraling.",
    audienceType: "Restaurants",
    serviceType: "Website development voor restaurants"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://vedantix.nl/" },
    { name: "Website Restaurant", url: canonical }
  ]);

  return (
    <>
      <SEO
        title="Website laten maken voor restaurants | Vedantix"
        description="Professionele website laten maken voor restaurants? Vedantix bouwt snelle websites met menukaart, contactinformatie en sterke lokale zichtbaarheid."
        canonical={canonical}
        schemas={[serviceSchema, breadcrumbSchema]}
      />

      <div style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
        <NavBar />

        <h1>Website laten maken voor restaurants</h1>

        <p>
          Wil je meer reserveringen en beter zichtbaar zijn in Google? Dan is
          een professionele restaurantwebsite essentieel. Gasten zoeken online
          naar menukaarten, openingstijden en contactinformatie voordat ze een
          keuze maken.
        </p>

        <h2>Meer reserveringen via jouw website</h2>
        <p>
          Een sterke restaurantwebsite laat direct jouw sfeer, gerechten en
          praktische informatie zien. Dat helpt bezoekers sneller beslissen om
          contact op te nemen of een tafel te reserveren.
        </p>

        <ul>
          <li>Duidelijke menukaart of aanbod</li>
          <li>Openingstijden en locatie</li>
          <li>Contactformulier of reserveringsmogelijkheid</li>
          <li>Mobielvriendelijk design</li>
          <li>Supersnelle laadtijd</li>
        </ul>

        <h2>Waarom een website belangrijk is voor restaurants</h2>
        <p>
          Veel potentiële gasten bekijken eerst online of jouw restaurant bij
          hen past. Zonder verzorgde website mis je kansen om vertrouwen te
          wekken en reserveringen binnen te halen.
        </p>

        <h2>Vraag gratis website analyse aan</h2>
        <p>
          Benieuwd hoe jouw restaurant online sterker kan presteren? Vraag een
          gratis analyse aan en ontdek waar kansen liggen.
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
            placeholder="Naam van je restaurant"
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