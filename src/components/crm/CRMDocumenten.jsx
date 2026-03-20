import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Document = base44.entities.Document;
const CustomerProfile = base44.entities.CustomerProfile;

const TYPE_ICONS = { contract: "📄", factuur: "🧾", offerte: "📋", overig: "📁" };
const TYPE_LABELS = { contract: "Contract", factuur: "Factuur", offerte: "Offerte", overig: "Overig" };

export default function CRMDocumenten() {
  const [docs, setDocs] = useState([]);
  const [klanten, setKlanten] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [filterKlant, setFilterKlant] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newDoc, setNewDoc] = useState({ customer_id: "", naam: "", type: "contract", notities: "", is_zichtbaar_voor_klant: true });
  const [file, setFile] = useState(null);

  const load = async () => {
    setLoading(true);
    const [d, k] = await Promise.all([Document.list("-created_date"), CustomerProfile.list()]);
    setDocs(d); setKlanten(k);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getKlant = (id) => klanten.find(k => k.id === id);

  const uploadDoc = async () => {
    if (!newDoc.customer_id || !newDoc.naam) return;
    setUploading(true);
    let bestand_url = "";
    if (file) {
      const result = await base44.integrations.Core.UploadFile({ file });
      bestand_url = result.file_url;
    }
    await Document.create({ ...newDoc, bestand_url });
    setShowNew(false);
    setNewDoc({ customer_id: "", naam: "", type: "contract", notities: "", is_zichtbaar_voor_klant: true });
    setFile(null);
    setUploading(false);
    load();
  };

  const deleteDoc = async (id) => {
    if (!confirm("Document verwijderen?")) return;
    await Document.delete(id);
    load();
  };

  const filtered = docs.filter(d => {
    return (!filterType || d.type === filterType) && (!filterKlant || d.customer_id === filterKlant);
  });

  const inputStyle = { width: "100%", padding: "10px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.88rem", outline: "none", background: "#fff", fontFamily: "inherit" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Documenten</h1>
        <button onClick={() => setShowNew(true)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>+ Document uploaden</button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <select value={filterKlant} onChange={e => setFilterKlant(e.target.value)} style={{ padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.88rem", background: "#fff", outline: "none", flex: 1 }}>
          <option value="">Alle klanten</option>
          {klanten.map(k => <option key={k.id} value={k.id}>{k.bedrijfsnaam}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.88rem", background: "#fff", outline: "none" }}>
          <option value="">Alle types</option>
          {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {loading ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "#94a3b8" }}>Laden...</div> :
          filtered.length === 0 ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "#94a3b8" }}>Geen documenten</div> :
          filtered.map(d => {
            const klant = getKlant(d.customer_id);
            return (
              <div key={d.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ fontSize: "1.8rem" }}>{TYPE_ICONS[d.type]}</div>
                  <span style={{ background: "#f1f5f9", color: "#374151", padding: "2px 8px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 600 }}>{TYPE_LABELS[d.type]}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a", marginBottom: 4 }}>{d.naam}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 4 }}>{klant?.bedrijfsnaam || "–"}</div>
                {d.notities && <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: 10 }}>{d.notities}</div>}
                <div style={{ fontSize: "0.72rem", color: d.is_zichtbaar_voor_klant ? "#10b981" : "#94a3b8", fontWeight: 600, marginBottom: 12 }}>
                  {d.is_zichtbaar_voor_klant ? "✓ Zichtbaar voor klant" : "✗ Alleen intern"}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {d.bestand_url && (
                    <a href={d.bestand_url} target="_blank" rel="noreferrer" style={{ flex: 1, background: "#eff6ff", color: "#1d4ed8", border: "none", borderRadius: 8, padding: "7px 10px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", textDecoration: "none", textAlign: "center" }}>
                      ↓ Download
                    </a>
                  )}
                  <button onClick={() => deleteDoc(d.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, padding: "7px 10px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>🗑</button>
                </div>
              </div>
            );
          })
        }
      </div>

      {/* Upload modal */}
      {showNew && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 480, padding: 28 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20 }}>Document uploaden</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Klant</label>
                <select value={newDoc.customer_id} onChange={e => setNewDoc(p => ({ ...p, customer_id: e.target.value }))} style={inputStyle}>
                  <option value="">— Selecteer klant —</option>
                  {klanten.map(k => <option key={k.id} value={k.id}>{k.bedrijfsnaam}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Document naam</label>
                <input value={newDoc.naam} onChange={e => setNewDoc(p => ({ ...p, naam: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Type</label>
                <select value={newDoc.type} onChange={e => setNewDoc(p => ({ ...p, type: e.target.value }))} style={inputStyle}>
                  {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Bestand</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} style={{ ...inputStyle, padding: "8px 12px" }} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Notities</label>
                <input value={newDoc.notities} onChange={e => setNewDoc(p => ({ ...p, notities: e.target.value }))} style={inputStyle} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", cursor: "pointer" }}>
                <input type="checkbox" checked={newDoc.is_zichtbaar_voor_klant} onChange={e => setNewDoc(p => ({ ...p, is_zichtbaar_voor_klant: e.target.checked }))} />
                Zichtbaar voor klant
              </label>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button onClick={() => setShowNew(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}>Annuleren</button>
              <button onClick={uploadDoc} disabled={uploading} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>
                {uploading ? "Uploaden..." : "Uploaden"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}