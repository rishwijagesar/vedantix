import { useState } from "react";

const HERHALING_LABELS = {
  eenmalig: "Eenmalig",
  dagelijks: "Dagelijks",
  wekelijks: "Wekelijks",
  maandelijks: "Maandelijks",
  kwartaal: "Per kwartaal",
  halfjaar: "Per halfjaar",
  jaarlijks: "Jaarlijks",
};

const inputStyle = {
  width: "100%", padding: "10px 12px", border: "2px solid #e2e8f0",
  borderRadius: 8, fontSize: "0.88rem", outline: "none",
  background: "#fff", fontFamily: "inherit"
};

const EMPTY = {
  type: "inkomst", omschrijving: "", bedrag: "",
  datum: new Date().toISOString().split("T")[0],
  herhaling: "eenmalig", categorie: "", notities: ""
};

export default function FinancieelItemModal({ onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSave = async () => {
    if (!form.omschrijving || !form.bedrag) return;
    setSaving(true);
    await onSave({ ...form, bedrag: parseFloat(form.bedrag) });
    setSaving(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 480, padding: 28 }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 20, color: "#0f172a" }}>
          Item toevoegen
        </h3>

        {/* Type toggle */}
        <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 10, padding: 4, marginBottom: 18 }}>
          {["inkomst", "uitgave"].map(t => (
            <button key={t} onClick={() => set("type", t)} style={{
              flex: 1, padding: "9px", borderRadius: 8, border: "none", cursor: "pointer",
              background: form.type === t ? (t === "inkomst" ? "#10b981" : "#ef4444") : "transparent",
              color: form.type === t ? "#fff" : "#64748b",
              fontWeight: 700, fontSize: "0.88rem", transition: "all 0.15s"
            }}>
              {t === "inkomst" ? "💰 Inkomst" : "💸 Uitgave"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Omschrijving *</label>
            <input value={form.omschrijving} onChange={e => set("omschrijving", e.target.value)} placeholder="bijv. Hosting kosten, Klantbetaling..." style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Bedrag (€) *</label>
              <input type="number" min="0" step="0.01" value={form.bedrag} onChange={e => set("bedrag", e.target.value)} placeholder="0.00" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Datum *</label>
              <input type="date" value={form.datum} onChange={e => set("datum", e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Frequentie</label>
            <select value={form.herhaling} onChange={e => set("herhaling", e.target.value)} style={inputStyle}>
              {Object.entries(HERHALING_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            {form.herhaling !== "eenmalig" && (
              <p style={{ fontSize: "0.74rem", color: "#f59e0b", marginTop: 5, fontWeight: 600 }}>
                ⚠️ Terugkerend item — wordt meegeteld voor elke periode dat het van toepassing is.
              </p>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Categorie</label>
            <input value={form.categorie} onChange={e => set("categorie", e.target.value)} placeholder="bijv. Software, Hosting, Loon..." style={inputStyle} />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5 }}>Notities</label>
            <textarea value={form.notities} onChange={e => set("notities", e.target.value)} rows={2} style={{ ...inputStyle, resize: "none" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, cursor: "pointer", color: "#374151" }}>Annuleren</button>
          <button onClick={handleSave} disabled={saving || !form.omschrijving || !form.bedrag} style={{
            background: form.type === "inkomst" ? "#10b981" : "#ef4444",
            color: "#fff", border: "none", borderRadius: 9, padding: "10px 22px",
            fontWeight: 700, cursor: "pointer", opacity: (!form.omschrijving || !form.bedrag) ? 0.5 : 1
          }}>
            {saving ? "Opslaan..." : "Toevoegen"}
          </button>
        </div>
      </div>
    </div>
  );
}