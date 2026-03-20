import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "nieuw", label: "Nieuw" }, { value: "intake", label: "Intake" },
  { value: "in_opbouw", label: "In opbouw" }, { value: "wachten_op_klant", label: "Wachten op klant" },
  { value: "live", label: "Live" }, { value: "onderhoud", label: "Onderhoud" },
  { value: "opgezegd", label: "Opgezegd" }, { value: "gearchiveerd", label: "Gearchiveerd" }
];

function Field({ label, value, onChange, type = "text", as = "input", options = [], required }) {
  const style = { width: "100%", padding: "10px 12px", border: "2px solid #e2e8f0", borderRadius: 8, fontSize: "0.88rem", outline: "none", background: "#fff", fontFamily: "inherit", transition: "border-color 0.15s" };
  if (as === "textarea") return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}{required && " *"}</label>
      <textarea value={value || ""} onChange={e => onChange(e.target.value)} style={{ ...style, minHeight: 80, resize: "vertical" }} />
    </div>
  );
  if (as === "select") return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</label>
      <select value={value || ""} onChange={e => onChange(e.target.value)} style={style}>
        <option value="">— Selecteer —</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
  return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: "0.78rem", color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}{required && " *"}</label>
      <input type={type} value={value || ""} onChange={e => onChange(e.target.value)} style={style} />
    </div>
  );
}

export default function KlantModal({ klant, isNew, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(klant || {
    bedrijfsnaam: "", voornaam: "", achternaam: "", email: "", telefoon: "",
    adres: "", postcode: "", plaats: "", land: "Nederland",
    kvk_nummer: "", btw_nummer: "", iban: "", domeinnaam: "",
    huidig_abonnement: "", status: "nieuw", website_status: "offline",
    project_status: "nieuw", startdatum: "", contract_status: "geen",
    opzeg_status: "actief", interne_notities: "", totaal_betaald: 0, openstaand_bedrag: 0
  });
  const [activeSection, setActiveSection] = useState("basis");

  const set = (key) => (val) => setForm(p => ({ ...p, [key]: val }));

  const sections = ["basis", "adres", "financieel", "project", "notities"];
  const sectionLabels = { basis: "Basisgegevens", adres: "Adres & KvK", financieel: "Financieel", project: "Project & Status", notities: "Notities" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "20px", overflowY: "auto" }}>
      <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 700, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ padding: "22px 28px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{isNew ? "Nieuwe klant" : `Klant bewerken — ${klant?.bedrijfsnaam}`}</h2>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: "1.1rem", color: "#64748b" }}>✕</button>
        </div>

        {/* Section tabs */}
        <div style={{ padding: "0 28px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 4 }}>
          {sections.map(s => (
            <button key={s} onClick={() => setActiveSection(s)} style={{ padding: "12px 14px", border: "none", background: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, color: activeSection === s ? "#3b82f6" : "#64748b", borderBottom: activeSection === s ? "2px solid #3b82f6" : "2px solid transparent" }}>
              {sectionLabels[s]}
            </button>
          ))}
        </div>

        <div style={{ padding: "24px 28px" }}>
          {activeSection === "basis" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="Bedrijfsnaam" value={form.bedrijfsnaam} onChange={set("bedrijfsnaam")} required />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Voornaam" value={form.voornaam} onChange={set("voornaam")} />
                <Field label="Achternaam" value={form.achternaam} onChange={set("achternaam")} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="E-mailadres" value={form.email} onChange={set("email")} type="email" required />
                <Field label="Telefoonnummer" value={form.telefoon} onChange={set("telefoon")} />
              </div>
              <Field label="Domeinnaam" value={form.domeinnaam} onChange={set("domeinnaam")} />
              <Field label="Huidig abonnement" value={form.huidig_abonnement} onChange={set("huidig_abonnement")} />
            </div>
          )}

          {activeSection === "adres" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="Adres" value={form.adres} onChange={set("adres")} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Postcode" value={form.postcode} onChange={set("postcode")} />
                <Field label="Plaats" value={form.plaats} onChange={set("plaats")} />
              </div>
              <Field label="Land" value={form.land} onChange={set("land")} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="KvK-nummer" value={form.kvk_nummer} onChange={set("kvk_nummer")} />
                <Field label="BTW-nummer" value={form.btw_nummer} onChange={set("btw_nummer")} />
              </div>
              <Field label="IBAN / Bankrekeningnummer" value={form.iban} onChange={set("iban")} />
            </div>
          )}

          {activeSection === "financieel" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Totaal betaald (€)" value={form.totaal_betaald} onChange={val => set("totaal_betaald")(parseFloat(val) || 0)} type="number" />
                <Field label="Openstaand bedrag (€)" value={form.openstaand_bedrag} onChange={val => set("openstaand_bedrag")(parseFloat(val) || 0)} type="number" />
              </div>
              <Field label="Contract status" value={form.contract_status} onChange={set("contract_status")} as="select" options={[
                { value: "geen", label: "Geen" }, { value: "verzonden", label: "Verzonden" },
                { value: "getekend", label: "Getekend" }, { value: "verlopen", label: "Verlopen" }
              ]} />
              <Field label="Opzegstatus" value={form.opzeg_status} onChange={set("opzeg_status")} as="select" options={[
                { value: "actief", label: "Actief" }, { value: "opzegging_aangevraagd", label: "Opzegging aangevraagd" },
                { value: "opgezegd", label: "Opgezegd" }
              ]} />
              {form.opzeg_status !== "actief" && <Field label="Opzegdatum" value={form.opzeg_datum} onChange={set("opzeg_datum")} type="date" />}
            </div>
          )}

          {activeSection === "project" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="Klant status" value={form.status} onChange={set("status")} as="select" options={STATUS_OPTIONS} />
              <Field label="Website status" value={form.website_status} onChange={set("website_status")} as="select" options={[
                { value: "offline", label: "Offline" }, { value: "in_aanbouw", label: "In aanbouw" },
                { value: "online", label: "Online" }, { value: "probleem", label: "Probleem" }
              ]} />
              <Field label="Project status" value={form.project_status} onChange={set("project_status")} as="select" options={[
                { value: "nieuw", label: "Nieuw" }, { value: "in_progress", label: "In uitvoering" },
                { value: "afgerond", label: "Afgerond" }, { value: "on_hold", label: "On hold" }
              ]} />
              <Field label="Startdatum klant" value={form.startdatum} onChange={set("startdatum")} type="date" />
            </div>
          )}

          {activeSection === "notities" && (
            <Field label="Interne notities" value={form.interne_notities} onChange={set("interne_notities")} as="textarea" />
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {!isNew && <button onClick={() => onDelete(klant.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, padding: "9px 16px", fontWeight: 600, fontSize: "0.83rem", cursor: "pointer" }}>Verwijderen</button>}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", color: "#374151" }}>Annuleren</button>
            <button onClick={() => onSave(form)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
              {isNew ? "Klant aanmaken" : "Opslaan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}