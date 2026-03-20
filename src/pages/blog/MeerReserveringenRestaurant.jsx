import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function MeerReserveringenRestaurant() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/blog" style={{ color: "#6b7280", textDecoration: "none" }}>Blog</Link>
      </div>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>Meer reserveringen voor restaurants</h1>

      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
        Een restaurantwebsite moet niet alleen mooi zijn, maar vooral reserveringen opleveren. Door de juiste informatie
        direct zichtbaar te maken, verlaag je de drempel voor nieuwe gasten.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>1. Toon direct wat je restaurant bijzonder maakt</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Denk aan sfeerfoto’s, je menu, openingstijden, locatie en een duidelijke reserveringsknop bovenaan de pagina.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>2. Zorg dat mobiel perfect werkt</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Veel mensen zoeken onderweg naar een restaurant. Als je website op mobiel traag of onduidelijk is, verlies je direct reserveringen.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>3. Maak lokale SEO slim</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Pagina’s per stad helpen om meer zichtbaar te zijn op zoekopdrachten zoals “restaurant website amsterdam” of
        “meer reserveringen restaurant rotterdam”.
      </p>

      <div style={{ marginTop: 34 }}>
        <Link
          to="/website/restaurant/amsterdam"
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
          Bekijk restaurant-pagina Amsterdam →
        </Link>
      </div>
    </div>
  );
}