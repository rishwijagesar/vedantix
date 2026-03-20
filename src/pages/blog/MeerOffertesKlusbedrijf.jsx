import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function MeerOffertesKlusbedrijf() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/blog" style={{ color: "#6b7280", textDecoration: "none" }}>Blog</Link>
      </div>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>Meer offerteaanvragen voor klusbedrijven</h1>

      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
        Als klusbedrijf wil je een constante stroom aan nieuwe aanvragen. Een goede website helpt je om vertrouwen op te
        bouwen, projecten te tonen en bezoekers om te zetten in offerteaanvragen.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>1. Laat je werk zien</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Foto’s van afgeronde klussen, duidelijke dienstenpagina’s en korte beschrijvingen helpen bezoekers om snel te
        begrijpen wat je doet.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>2. Maak een aanvraag eenvoudig</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Geef mensen de mogelijkheid om direct via een formulier, WhatsApp of telefoon contact op te nemen. Hoe eenvoudiger,
        hoe beter de conversie.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>3. Werk per stad</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Lokale pagina’s zoals “website klusbedrijf utrecht” helpen om zichtbaar te worden voor mensen die echt in jouw regio zoeken.
      </p>

      <div style={{ marginTop: 34 }}>
        <Link
          to="/website/klusbedrijf/utrecht"
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
          Bekijk klusbedrijf-pagina Utrecht →
        </Link>
      </div>
    </div>
  );
}