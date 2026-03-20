import { useState } from "react";
import { base44 } from "@/api/base44Client";

const CustomerProfile = base44.entities.CustomerProfile;

export default function PortalGegevens({ klant, user, onReload }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...klant });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const save = async () => {
    setSaving(true);
    await CustomerProfile.update(klant.id, form);
    setSaving(false);
    setSaved(true);
    setEditing(false);
    onReload();
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = (disabled) => ({
    width: "100%", padding: "10px 12px", border: `2px solid ${disabled ? "#f1f5f9" : "#e2e8f0"}`,
    borderRadius: 8, fontSize: "0.88rem", outline: "none",
    background: disabled ? "#f8fafc" : "#fff", fontFamily: "inherit", color: disabled ? "#94a3b8" : "#1e293b"
  });

  const Field = ({ label, field, type = "text" }) => (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: "0.75rem", color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</label>
      <input type={type} value={form[field] || ""} onChange={set(field)} disabled={!editing} style={inputStyle(!editing)} />
    </div>
  );

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Mijn gegevens</h1>
        <div style={{ display: "flex", gap: 10 }}>
          {saved && <span style={{ color: "#10b981", fontWeight: 600, fontSize: "0.85rem", alignSelf: "center" }}>✓ Opgeslagen!</span>}
          {editing ? (
            <>
              <button onClick={() => { setEditing(false); setForm({ ...klant }); }} style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: "9px 18px", fontWeight: 600, cursor: "pointer" }}>Annuleren</button>
              <button onClick={save} disabled={saving} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "9px 18px", fontWeight: 700, cursor: "pointer" }}>{saving ? "Opslaan..." : "Opslaan"}</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 9, padding: "9px 18px", fontWeight: 700, cursor: "pointer" }}>Bewerken</button>
          )}
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "28px 32px", marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 18 }}>Bedrijfsgegevens</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Bedrijfsnaam" field="bedrijfsnaam" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Voornaam" field="voornaam" />
            <Field label="Achternaam" field="achternaam" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="E-mailadres" field="email" type="email" />
            <Field label="Telefoonnummer" field="telefoon" />
          </div>
          <Field label="Domeinnaam" field="domeinnaam" />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "28px 32px", marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 18 }}>Adresgegevens</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Adres" field="adres" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Postcode" field="postcode" />
            <Field label="Plaats" field="plaats" />
          </div>
          <Field label="Land" field="land" />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "28px 32px", marginBottom: 28 }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 18 }}>Zakelijke gegevens</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="KvK-nummer" field="kvk_nummer" />
            <Field label="BTW-nummer" field="btw_nummer" />
          </div>
          <Field label="IBAN / Bankrekening" field="iban" />
        </div>
      </div>

      {/* Account verwijderen */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #fca5a5", padding: "22px 28px" }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#dc2626", marginBottom: 8 }}>⚠️ Gevaarlijke zone</h3>
        <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 14 }}>Het verwijderen van je account is onomkeerbaar. Al je data, facturen en bestanden worden permanent verwijderd.</p>
        {!deleteConfirm ? (
          <button onClick={() => setDeleteConfirm(true)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 9, padding: "9px 18px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
            Account verwijdering aanvragen
          </button>
        ) : (
          <div style={{ background: "#fef2f2", borderRadius: 10, padding: "16px 18px", border: "1px solid #fca5a5" }}>
            <div style={{ fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>Weet je het zeker?</div>
            <p style={{ fontSize: "0.83rem", color: "#b91c1c", marginBottom: 14 }}>
              Al je gegevens, facturen, tickets en documenten worden permanent verwijderd. Dit is niet ongedaan te maken. Neem contact op via info@vedantix.nl om je verzoek te bevestigen.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDeleteConfirm(false)} style={{ flex: 1, background: "#f1f5f9", border: "none", borderRadius: 8, padding: "9px", fontWeight: 600, cursor: "pointer" }}>Annuleren</button>
              <a href="mailto:info@vedantix.nl?subject=Accountverwijdering aanvragen&body=Ik wil mijn account bij Vedantix laten verwijderen." style={{ flex: 1, background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontWeight: 700, cursor: "pointer", textDecoration: "none", textAlign: "center", display: "block", lineHeight: "1.8" }}>
                Verzoek versturen
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}