import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function MeerKlantenSalon() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/blog" style={{ color: "#6b7280", textDecoration: "none" }}>Blog</Link>
      </div>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>Meer klanten krijgen als salon</h1>

      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
        Als salon wil je een volle agenda en terugkerende klanten. Een sterke website helpt je om lokaal beter
        gevonden te worden en meer boekingen te krijgen zonder volledig afhankelijk te zijn van sociale media.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>1. Zorg dat klanten direct kunnen boeken</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Hoe minder stappen iemand hoeft te zetten, hoe groter de kans op een afspraak. Voeg daarom een duidelijke
        boekingsknop, WhatsApp-link en contactformulier toe.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>2. Laat direct vertrouwen zien</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Toon behandelingen, prijzen, reviews en foto’s van je salon. Daarmee maak je het voor nieuwe klanten makkelijker
        om voor jou te kiezen.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>3. Werk lokaal met SEO</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Pagina’s zoals “website salon amsterdam” of “website salon rotterdam” helpen je om lokaal te ranken op relevante
        zoekopdrachten.
      </p>

      <div style={{ marginTop: 34 }}>
        <Link
          to="/website/salon/amsterdam"
          style={{
            display: "inline-block",
            background: "#111827",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Bekijk salon-pagina Amsterdam →
        </Link>
      </div>
    </div>
  );
}