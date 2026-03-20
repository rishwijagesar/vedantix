import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function MeerKlantenKapper() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/blog" style={{ color: "#6b7280", textDecoration: "none" }}>Blog</Link>
      </div>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>Meer klanten krijgen als kapper</h1>

      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
        Als kapper wil je een volle agenda. De snelste manier om dat te bereiken is door lokaal goed zichtbaar te zijn in Google
        en bezoekers via je website om te zetten in afspraken.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>1. Zorg dat je lokaal vindbaar bent</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Pagina’s zoals “website-kapper-amsterdam” of “kapper in Rotterdam” helpen om lokale zoekopdrachten te targeten.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>2. Maak boeken makkelijk</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Voeg een duidelijke afspraakknop, WhatsApp-link en contactformulier toe zodat bezoekers direct actie kunnen nemen.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>3. Gebruik interne links</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Link vanuit blogs naar je lokale landingspagina’s en terug. Dat helpt gebruikers én Google om je site beter te begrijpen.
      </p>

      <div style={{ marginTop: 34 }}>
        <Link
          to="/website/kapper/amsterdam"
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
          Bekijk kapper-pagina Amsterdam →
        </Link>
      </div>
    </div>
  );
}