import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

import ExportButton, { exportToCSV, exportToPDF } from "./ExportButton";

const Payment = base44.entities.Payment;
const CustomerProfile = base44.entities.CustomerProfile;

const STATUS_COLORS = { openstaand: "#f59e0b", betaald: "#10b981", verlopen: "#ef4444", geannuleerd: "#94a3b8", gedeeltelijk_betaald: "#6366f1" };
const STATUS_LABELS = { openstaand: "Openstaand", betaald: "Betaald", verlopen: "Verlopen", geannuleerd: "Geannuleerd", gedeeltelijk_betaald: "Gedeeltelijk" };

export default function CRMFacturen() {
  const [facturen, setFacturen] = useState([]);
  const [klanten, setKlanten] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newFactuur, setNewFactuur] = useState({ customer_id: "", factuurnummer: "", beschrijving: "", bedrag: "", btw_bedrag: "", totaal_bedrag: "", factuurdatum: "", vervaldatum: "", status: "openstaand", opmerkingen: "" });

  const load = async () => {
    setLoading(true);
    const [f, k] = await Promise.all([Payment.list("-created_date", 200), CustomerProfile.list()]);
    setFacturen(f); setKlanten(k);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getKlant = (id) => klanten.find(k => k.id === id);

  const totaalOpen = facturen.filter(f => f.status === "openstaand").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);
  const totaalBetaald = facturen.filter(f => f.status === "betaald").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);
  const totaalVerlopen = facturen.filter(f => f.status === "verlopen").reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);

  const filtered = facturen.filter(f => !filterStatus || f.status === filterStatus);

  const handleExportCSV = () => {
    exportToCSV(filtered.map(f => ({
      Factuurnummer: f.factuurnummer,
      Klant: f.klant_naam || getKlant(f.customer_id)?.bedrijfsnaam || "",
      Beschrijving: f.beschrijving || "",
      "Bedrag (ex BTW)": f.bedrag || 0,
      "BTW": f.btw_bedrag || 0,
      Totaal: f.totaal_bedrag || f.bedrag || 0,
      Factuurdatum: f.factuurdatum || "",
      Vervaldatum: f.vervaldatum || "",
      Status: f.status,
    })), "facturen");
  };

  const handleExportPDF = () => {
    exportToPDF("Facturenoverzicht", [
      { header: "Factuurnr.", accessor: r => r.factuurnummer },
      { header: "Klant", accessor: r => r.klant_naam || getKlant(r.customer_id)?.bedrijfsnaam || "" },
      { header: "Omschrijving", accessor: r => r.beschrijving },
      { header: "Totaal", accessor: r => `€${(r.totaal_bedrag || r.bedrag || 0).toFixed(2)}` },
      { header: "Factuurdatum", accessor: r => r.factuurdatum ? new Date(r.factuurdatum).toLocaleDateString("nl-NL") : "" },
      { header: "Vervaldatum", accessor: r => r.vervaldatum ? new Date(r.vervaldatum).toLocaleDateString("nl-NL") : "" },
      { header: "Status", accessor: r => r.status },
    ], filtered, "facturen");
  };

  const createFactuur = async () => {
    const klant = getKlant(newFactuur.customer_id);
    await Payment.create({ ...newFactuur, bedrag: parseFloat(newFactuur.bedrag) || 0, btw_bedrag: parseFloat(newFactuur.btw_bedrag) || 0, totaal_bedrag: parseFloat(newFactuur.totaal_bedrag) || 0, klant_naam: klant?.bedrijfsnaam });
    setShowNew(false);
    setNewFactuur({ customer_id: "", factuurnummer: "", beschrijving: "", bedrag: "", btw_bedrag: "", totaal_bedrag: "", factuurdatum: "", vervaldatum: "", status: "openstaand", opmerkingen: "" });
    load();
  };

  const updateStatus = async (id, status) => {
    await Payment.update(id, { status, ...(status === "betaald" ? { betaaldatum: new Date().toISOString().split("T")[0] } : {}) });
    load();
    if (selected?.id === id) setSelected(p => ({ ...p, status }));
  };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.88rem", outline: "none", background: "#fff", fontFamily: "inherit" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Facturen</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <ExportButton onExportCSV={handleExportCSV} onExportPDF={handleExportPDF} />
          <button onClick={() => setShowNew(true)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>+ Nieuwe factuur</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Openstaand", value: totaalOpen, color: "#f59e0b" },
          { label: "Betaald", value: totaalBetaald, color: "#10b981" },
          { label: "Verlopen", value: totaalVerlopen, color: "#ef4444" }
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "18px 20px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#64748b", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color }}>€{s.value.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ marginBottom: 16 }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.88rem", background: "#fff", outline: "none" }}>
          <option value="">Alle statussen</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Factuurnummer", "Klant", "Beschrijving", "Bedrag", "Factuurdatum", "Vervaldatum", "Status", "Acties"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={8} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Laden...</td></tr> :
              filtered.length === 0 ? <tr><td colSpan={8} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Geen facturen</td></tr> :
              filtered.map(f => {
                const klant = getKlant(f.customer_id);
                const isVerlopen = f.status === "openstaand" && f.vervaldatum && new Date(f.vervaldatum) < new Date();
                return (
                  <tr key={f.id} style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer", background: isVerlopen ? "#fff5f5" : "" }}
                    onClick={() => setSelected(selected?.id === f.id ? null : f)}>
                    <td style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.85rem", color: "#1e293b" }}>{f.factuurnummer}</td>
                    <td style={{ padding: "12px 14px", fontSize: "0.85rem", color: "#374151" }}>{klant?.bedrijfsnaam || f.klant_naam || "–"}</td>
                    <td style={{ padding: "12px 14px", fontSize: "0.83rem", color: "#374151", maxWidth: 200 }}>{f.beschrijving}</td>
                    <td style={{ padding: "12px 14px", fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>€{(f.totaal_bedrag || f.bedrag || 0).toFixed(2)}</td>
                    <td style={{ padding: "12px 14px", fontSize: "0.83rem", color: "#374151" }}>{f.factuurdatum ? new Date(f.factuurdatum).toLocaleDateString("nl-NL") : "–"}</td>
                    <td style={{ padding: "12px 14px", fontSize: "0.83rem", color: isVerlopen ? "#ef4444" : "#374151", fontWeight: isVerlopen ? 700 : 400 }}>
                      {f.vervaldatum ? new Date(f.vervaldatum).toLocaleDateString("nl-NL") : "–"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ background: (STATUS_COLORS[f.status] || "#94a3b8") + "18", color: STATUS_COLORS[f.status] || "#94a3b8", padding: "4px 10px", borderRadius: 100, fontSize: "0.73rem", fontWeight: 700 }}>
                        {STATUS_LABELS[f.status] || f.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {f.status === "openstaand" && (
                        <button onClick={e => { e.stopPropagation(); updateStatus(f.id, "betaald"); }} style={{ background: "#d1fae5", color: "#065f46", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>
                          Betaald
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

      {/* New factuur modal */}
      {showNew && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 540, padding: 28, maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: "1.05rem" }}>Nieuwe factuur</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Klant</label>
                <select value={newFactuur.customer_id} onChange={e => setNewFactuur(p => ({ ...p, customer_id: e.target.value }))} style={inputStyle}>
                  <option value="">— Selecteer klant —</option>
                  {klanten.map(k => <option key={k.id} value={k.id}>{k.bedrijfsnaam}</option>)}
                </select>
              </div>
              {[
                ["Factuurnummer", "factuurnummer"], ["Beschrijving", "beschrijving"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>{label}</label>
                  <input value={newFactuur[key]} onChange={e => setNewFactuur(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[["Bedrag (ex BTW)", "bedrag"], ["BTW bedrag", "btw_bedrag"], ["Totaalbedrag", "totaal_bedrag"]].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>{label}</label>
                    <input type="number" value={newFactuur[key]} onChange={e => setNewFactuur(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Factuurdatum", "factuurdatum"], ["Vervaldatum", "vervaldatum"]].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>{label}</label>
                    <input type="date" value={newFactuur[key]} onChange={e => setNewFactuur(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button onClick={() => setShowNew(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer", color: "#374151" }}>Annuleren</button>
              <button onClick={createFactuur} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Aanmaken</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}