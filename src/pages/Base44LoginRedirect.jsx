import { useEffect } from "react";

import VedantixLogo from "../components/VedantixLogo";
import { redirectToBase44Login } from "../api/base44Client";

export default function Base44LoginRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    redirectToBase44Login(params.get("from_url") || "/klantenportaal");
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <VedantixLogo variant="full" size={38} theme="light" />
        </div>
        <h1 style={{ fontSize: "1.25rem", margin: "0 0 8px", fontWeight: 800 }}>
          Klantlogin openen
        </h1>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.62)" }}>
          Je wordt doorgestuurd naar de beveiligde login.
        </p>
      </div>
    </main>
  );
}
