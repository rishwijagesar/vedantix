import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Payment = base44.entities.Payment;

const STATUS_COLORS = { openstaand: "#f59e0b", betaald: "#10b981", verlopen: "#ef4444", geannuleerd: "#94a3b8", gedeeltelijk_betaald: "#6366f1" };
const STATUS_LABELS = { openstaand: "Openstaand", betaald: "Betaald", verlopen: "Verlopen", geannuleerd: "Geannuleerd", gedeeltelijk_betaald: "Gedeeltelijk betaald" };

export default function PortalFacturen({ klant }) {
  const [facturen, setFacturen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("alle");

  useEffect(() => {
    Payment.filter({ customer_id: klant.id }).then(f => {
      setFacturen(f.sort((a, b) => new Date(b.factuurdatum) - new Date(a.factuurdatum)));
      setLoading(false);
    });
  }, [klant]);

  const totaalBetaald = facturen.filter(f => f.status === "betaald").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);
  const totaalOpen = facturen.filter(f => f.status === "openstaand").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);

  const filtered = facturen.filter(f => filter === "alle" || f.status === filter);

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>Facturen</h1>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24, maxWidth: 460 }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "18px 20px" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Totaal betaald</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#10b981" }}>€{totaalBetaald.toFixed(2)}</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "18px 20px" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 }}>Openstaand</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: totaalOpen > 0 ? "#f59e0b" : "#10b981" }}>€{totaalOpen.toFixed(2)}</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[["alle", "Alle"], ["openstaand", "Openstaand"], ["betaald", "Betaald"], ["verlopen", "Verlopen"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{ padding: "8px 16px", borderRadius: 100, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", background: filter === val ? "#0f172a" : "#f1f5f9", color: filter === val ? "#fff" : "#64748b" }}>{label}</button>
        ))}
      </div>

      {loading ? <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>Laden...</div> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#94a3b8", background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0" }}>Geen facturen</div>
          ) : filtered.map(f => (
            <div key={f.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>{f.factuurnummer}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 2 }}>{f.beschrijving}</div>
                <div style={{ fontSize: "0.76rem", color: "#94a3b8", marginTop: 2 }}>
                  {f.factuurdatum ? new Date(f.factuurdatum).toLocaleDateString("nl-NL") : "–"}
                  {f.vervaldatum ? ` · Vervalt: ${new Date(f.vervaldatum).toLocaleDateString("nl-NL")}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#0f172a" }}>€{(f.totaal_bedrag || f.bedrag || 0).toFixed(2)}</div>
                  <span style={{ background: (STATUS_COLORS[f.status] || "#94a3b8") + "18", color: STATUS_COLORS[f.status] || "#94a3b8", padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700 }}>
                    {STATUS_LABELS[f.status] || f.status}
                  </span>
                </div>
                {f.pdf_url && (
                  <a href={f.pdf_url} target="_blank" rel="noreferrer" style={{ background: "#eff6ff", color: "#1d4ed8", padding: "8px 14px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: "0.8rem" }}>↓ PDF</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}