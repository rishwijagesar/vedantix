import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function MeerBoekingenFotograaf() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/blog" style={{ color: "#6b7280", textDecoration: "none" }}>Blog</Link>
      </div>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>Meer boekingen voor fotografen</h1>

      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
        Als fotograaf verkoop je in feite vertrouwen, stijl en kwaliteit. Je website moet dus niet alleen je portfolio tonen,
        maar ook bezoekers overtuigen om contact op te nemen.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>1. Laat je beste werk meteen zien</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Je homepage en portfolio moeten direct duidelijk maken welke stijl je hebt en voor welk type opdrachten je beschikbaar bent.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>2. Maak het eenvoudig om te boeken</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Voeg een duidelijke CTA toe, een contactformulier en een WhatsApp-link. Elke extra stap verlaagt de kans op een aanvraag.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>3. Gebruik lokale pagina’s</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Door te targeten op steden zoals Amsterdam of Utrecht vergroot je de kans dat je gevonden wordt door klanten in jouw regio.
      </p>

      <div style={{ marginTop: 34 }}>
        <Link
          to="/website/fotograaf/amsterdam"
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
          Bekijk fotograaf-pagina Amsterdam →
        </Link>
      </div>
    </div>
  );
}