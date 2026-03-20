import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Document = base44.entities.Document;

const TYPE_ICONS = { contract: "📄", factuur: "🧾", offerte: "📋", overig: "📁" };
const TYPE_LABELS = { contract: "Contract", factuur: "Factuur", offerte: "Offerte", overig: "Overig" };

export default function PortalDocumenten({ klant }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Document.filter({ customer_id: klant.id, is_zichtbaar_voor_klant: true }).then(d => {
      setDocs(d);
      setLoading(false);
    });
  }, [klant]);

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Documenten</h1>
      <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: 24 }}>Jouw contracten, offertes en overige bestanden.</p>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Laden...</div>
      ) : docs.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📁</div>
          <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Geen documenten</div>
          <p style={{ color: "#64748b", fontSize: "0.88rem" }}>Er zijn nog geen documenten beschikbaar voor jouw account.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
          {docs.map(d => (
            <div key={d.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "20px 22px" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{TYPE_ICONS[d.type] || "📁"}</div>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a", marginBottom: 4 }}>{d.naam}</div>
              <div style={{ background: "#f1f5f9", color: "#374151", padding: "2px 8px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 600, display: "inline-block", marginBottom: 10 }}>
                {TYPE_LABELS[d.type] || d.type}
              </div>
              {d.notities && <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: 12, lineHeight: 1.5 }}>{d.notities}</p>}
              <div style={{ fontSize: "0.73rem", color: "#94a3b8", marginBottom: 12 }}>
                Toegevoegd: {new Date(d.created_date).toLocaleDateString("nl-NL")}
              </div>
              {d.bestand_url ? (
                <a href={d.bestand_url} target="_blank" rel="noreferrer" style={{ display: "block", background: "#eff6ff", color: "#1d4ed8", borderRadius: 8, padding: "9px", textDecoration: "none", fontWeight: 700, fontSize: "0.82rem", textAlign: "center" }}>
                  ↓ Downloaden
                </a>
              ) : (
                <div style={{ background: "#f8fafc", color: "#94a3b8", borderRadius: 8, padding: "9px", fontSize: "0.82rem", textAlign: "center" }}>Geen bestand</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}