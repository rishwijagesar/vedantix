import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Subscription = base44.entities.Subscription;
const CustomerProfile = base44.entities.CustomerProfile;

const STATUS_COLORS = { actief: "#10b981", gepauzeerd: "#f59e0b", opgezegd: "#ef4444", verlopen: "#94a3b8" };
const STATUS_LABELS = { actief: "Actief", gepauzeerd: "Gepauzeerd", opgezegd: "Opgezegd", verlopen: "Verlopen" };

export default function CRMAbonnementen() {
  const [abos, setAbos] = useState([]);
  const [klanten, setKlanten] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newAbo, setNewAbo] = useState({ customer_id: "", naam: "", maandbedrag: "", setup_kosten: "", startdatum: "", volgende_factuurdatum: "", status: "actief", notities: "" });

  const load = async () => {
    setLoading(true);
    const [a, k] = await Promise.all([Subscription.list("-created_date"), CustomerProfile.list()]);
    setAbos(a); setKlanten(k);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getKlant = (id) => klanten.find(k => k.id === id);

  const createAbo = async () => {
    await Subscription.create({ ...newAbo, maandbedrag: parseFloat(newAbo.maandbedrag) || 0, setup_kosten: parseFloat(newAbo.setup_kosten) || 0 });
    setShowNew(false);
    setNewAbo({ customer_id: "", naam: "", maandbedrag: "", setup_kosten: "", startdatum: "", volgende_factuurdatum: "", status: "actief", notities: "" });
    load();
  };

  const updateStatus = async (id, status) => {
    await Subscription.update(id, { status });
    load();
  };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.88rem", outline: "none", background: "#fff", fontFamily: "inherit" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Abonnementen</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 4 }}>{abos.filter(a => a.status === "actief").length} actieve abonnementen</p>
        </div>
        <button onClick={() => setShowNew(true)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>+ Nieuw abonnement</button>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
        {loading ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "#94a3b8" }}>Laden...</div> :
          abos.length === 0 ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "#94a3b8" }}>Geen abonnementen</div> :
          abos.map(a => {
            const klant = getKlant(a.customer_id);
            return (
              <div key={a.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "20px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1rem", color: "#0f172a" }}>{a.naam}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 3 }}>{klant?.bedrijfsnaam || "–"}</div>
                  </div>
                  <span style={{ background: (STATUS_COLORS[a.status] || "#94a3b8") + "18", color: STATUS_COLORS[a.status] || "#94a3b8", padding: "4px 12px", borderRadius: 100, fontSize: "0.73rem", fontWeight: 700 }}>
                    {STATUS_LABELS[a.status] || a.status}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Per maand</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginTop: 2 }}>€{a.maandbedrag}</div>
                  </div>
                  <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Setup</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginTop: 2 }}>€{a.setup_kosten || 0}</div>
                  </div>
                </div>

                <div style={{ fontSize: "0.8rem", color: "#64748b", display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                  {a.startdatum && <div>📅 Gestart: {new Date(a.startdatum).toLocaleDateString("nl-NL")}</div>}
                  {a.volgende_factuurdatum && <div>🔔 Volgende factuur: {new Date(a.volgende_factuurdatum).toLocaleDateString("nl-NL")}</div>}
                  {a.opzeg_datum && <div style={{ color: "#ef4444" }}>⚠️ Opgezegd per: {new Date(a.opzeg_datum).toLocaleDateString("nl-NL")}</div>}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  {a.status === "actief" && (
                    <button onClick={() => updateStatus(a.id, "opgezegd")} style={{ flex: 1, background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, padding: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Opzeggen</button>
                  )}
                  {a.status !== "actief" && (
                    <button onClick={() => updateStatus(a.id, "actief")} style={{ flex: 1, background: "#d1fae5", color: "#065f46", border: "none", borderRadius: 8, padding: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>Heractiveren</button>
                  )}
                </div>
              </div>
            );
          })
        }
      </div>

      {showNew && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 500, padding: 28 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20 }}>Nieuw abonnement</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Klant</label>
                <select value={newAbo.customer_id} onChange={e => setNewAbo(p => ({ ...p, customer_id: e.target.value }))} style={inputStyle}>
                  <option value="">— Selecteer klant —</option>
                  {klanten.map(k => <option key={k.id} value={k.id}>{k.bedrijfsnaam}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Naam abonnement</label>
                <input value={newAbo.naam} onChange={e => setNewAbo(p => ({ ...p, naam: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Maandbedrag (€)", "maandbedrag"], ["Setup kosten (€)", "setup_kosten"]].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>{label}</label>
                    <input type="number" value={newAbo[key]} onChange={e => setNewAbo(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Startdatum", "startdatum"], ["Volgende factuurdatum", "volgende_factuurdatum"]].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>{label}</label>
                    <input type="date" value={newAbo[key]} onChange={e => setNewAbo(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button onClick={() => setShowNew(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}>Annuleren</button>
              <button onClick={createAbo} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Aanmaken</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}