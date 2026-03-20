import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default function MeerKlantenSchoonmaakbedrijf() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <NavBar />

      <div style={{ marginBottom: 18, fontSize: 14, color: "#6b7280" }}>
        <Link to="/blog" style={{ color: "#6b7280", textDecoration: "none" }}>Blog</Link>
      </div>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>Meer klanten voor schoonmaakbedrijven</h1>

      <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 18 }}>
        Voor schoonmaakbedrijven is online vertrouwen cruciaal. Klanten willen direct zien welke diensten je aanbiedt,
        in welke regio je werkt en hoe ze eenvoudig contact kunnen opnemen.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>1. Maak je diensten glashelder</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Zet duidelijk op je website of je werkt voor kantoren, woningen, VvE’s of andere doelgroepen. Hoe duidelijker dit is,
        hoe sneller bezoekers aanvragen doen.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>2. Gebruik vertrouwen als verkoopmiddel</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Reviews, keurmerken, duidelijke contactgegevens en een nette uitstraling helpen enorm om twijfelende bezoekers over de streep te trekken.
      </p>

      <h2 style={{ marginTop: 28, marginBottom: 12 }}>3. Denk lokaal</h2>
      <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
        Met stadspagina’s kun je beter ranken op zoekopdrachten uit jouw regio en meer aanvragen binnenhalen zonder extra advertentiebudget.
      </p>

      <div style={{ marginTop: 34 }}>
        <Link
          to="/website/schoonmaakbedrijf/amsterdam"
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
          Bekijk schoonmaakbedrijf-pagina Amsterdam →
        </Link>
      </div>
    </div>
  );
}