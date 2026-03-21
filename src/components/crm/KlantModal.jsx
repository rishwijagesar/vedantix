import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "nieuw", label: "Nieuw" },
  { value: "intake", label: "Intake" },
  { value: "in_opbouw", label: "In opbouw" },
  { value: "wachten_op_klant", label: "Wachten op klant" },
  { value: "live", label: "Live" },
  { value: "onderhoud", label: "Onderhoud" },
  { value: "opgezegd", label: "Opgezegd" },
  { value: "gearchiveerd", label: "Gearchiveerd" },
];

const ABONNEMENT_OPTIONS = [
  { value: "STARTER", label: "Starter" },
  { value: "GROWTH", label: "Growth" },
  { value: "PRO", label: "Pro" },
];

function createInitialForm(klant) {
  if (klant) {
    return {
      bedrijfsnaam: klant.bedrijfsnaam || "",
      voornaam: klant.voornaam || "",
      achternaam: klant.achternaam || "",
      email: klant.email || "",
      telefoon: klant.telefoon || "",
      adres: klant.adres || "",
      postcode: klant.postcode || "",
      plaats: klant.plaats || "",
      land: klant.land || "Nederland",
      kvk_nummer: klant.kvk_nummer || "",
      btw_nummer: klant.btw_nummer || "",
      iban: klant.iban || "",
      domeinnaam: klant.domeinnaam || "",
      huidig_abonnement: klant.huidig_abonnement || "",
      status: klant.status || "nieuw",
      website_status: klant.website_status || "offline",
      project_status: klant.project_status || "nieuw",
      startdatum: klant.startdatum || "",
      contract_status: klant.contract_status || "geen",
      opzeg_status: klant.opzeg_status || "actief",
      opzeg_datum: klant.opzeg_datum || "",
      interne_notities: klant.interne_notities || "",
      totaal_betaald:
        typeof klant.totaal_betaald === "number" ? klant.totaal_betaald : 0,
      openstaand_bedrag:
        typeof klant.openstaand_bedrag === "number" ? klant.openstaand_bedrag : 0,
    };
  }

  return {
    bedrijfsnaam: "",
    voornaam: "",
    achternaam: "",
    email: "",
    telefoon: "",
    adres: "",
    postcode: "",
    plaats: "",
    land: "Nederland",
    kvk_nummer: "",
    btw_nummer: "",
    iban: "",
    domeinnaam: "",
    huidig_abonnement: "",
    status: "nieuw",
    website_status: "offline",
    project_status: "nieuw",
    startdatum: "",
    contract_status: "geen",
    opzeg_status: "actief",
    opzeg_datum: "",
    interne_notities: "",
    totaal_betaald: 0,
    openstaand_bedrag: 0,
  };
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  as = "input",
  options = [],
  required = false,
}) {
  const style = {
    width: "100%",
    padding: "10px 12px",
    border: "2px solid #e2e8f0",
    borderRadius: 8,
    fontSize: "0.88rem",
    outline: "none",
    background: "#fff",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    display: "block",
    fontWeight: 600,
    fontSize: "0.78rem",
    color: "#374151",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  };

  if (as === "textarea") {
    return (
      <div>
        <label style={labelStyle}>
          {label}
          {required && " *"}
        </label>
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...style, minHeight: 80, resize: "vertical" }}
        />
      </div>
    );
  }

  if (as === "select") {
    return (
      <div>
        <label style={labelStyle}>
          {label}
          {required && " *"}
        </label>
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          style={style}
        >
          <option value="">— Selecteer —</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={style}
      />
    </div>
  );
}

export default function KlantModal({
  klant,
  isNew,
  onSave,
  onDelete,
  onClose,
}) {
  const [form, setForm] = useState(createInitialForm(klant));
  const [activeSection, setActiveSection] = useState("basis");

  const setField = (key) => (val) => {
    setForm((prev) => {
      if (key === "totaal_betaald" || key === "openstaand_bedrag") {
        return {
          ...prev,
          [key]: parseFloat(val) || 0,
        };
      }

      return {
        ...prev,
        [key]: val,
      };
    });
  };

  const sections = ["basis", "adres", "financieel", "project", "notities"];

  const sectionLabels = {
    basis: "Basisgegevens",
    adres: "Adres & KvK",
    financieel: "Financieel",
    project: "Project & Status",
    notities: "Notities",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          width: "100%",
          maxWidth: 700,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            padding: "22px 28px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#0f172a",
              }}
            >
              {isNew ? "Nieuwe klant" : `Klant bewerken — ${klant?.bedrijfsnaam || ""}`}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: 8,
              width: 34,
              height: 34,
              cursor: "pointer",
              fontSize: "1.1rem",
              color: "#64748b",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            padding: "0 28px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                padding: "12px 14px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: activeSection === section ? "#3b82f6" : "#64748b",
                borderBottom:
                  activeSection === section
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
              }}
            >
              {sectionLabels[section]}
            </button>
          ))}
        </div>

        <div style={{ padding: "24px 28px" }}>
          {activeSection === "basis" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field
                label="Bedrijfsnaam"
                value={form.bedrijfsnaam}
                onChange={setField("bedrijfsnaam")}
                required
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field
                  label="Voornaam"
                  value={form.voornaam}
                  onChange={setField("voornaam")}
                />
                <Field
                  label="Achternaam"
                  value={form.achternaam}
                  onChange={setField("achternaam")}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field
                  label="E-mailadres"
                  value={form.email}
                  onChange={setField("email")}
                  type="email"
                  required
                />
                <Field
                  label="Telefoonnummer"
                  value={form.telefoon}
                  onChange={setField("telefoon")}
                />
              </div>

              <Field
                label="Domeinnaam"
                value={form.domeinnaam}
                onChange={setField("domeinnaam")}
              />

              <Field
                label="Huidig abonnement"
                value={form.huidig_abonnement}
                onChange={setField("huidig_abonnement")}
                as="select"
                options={ABONNEMENT_OPTIONS}
                required
              />
            </div>
          )}

          {activeSection === "adres" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field
                label="Adres"
                value={form.adres}
                onChange={setField("adres")}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field
                  label="Postcode"
                  value={form.postcode}
                  onChange={setField("postcode")}
                />
                <Field
                  label="Plaats"
                  value={form.plaats}
                  onChange={setField("plaats")}
                />
              </div>

              <Field
                label="Land"
                value={form.land}
                onChange={setField("land")}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field
                  label="KvK-nummer"
                  value={form.kvk_nummer}
                  onChange={setField("kvk_nummer")}
                />
                <Field
                  label="BTW-nummer"
                  value={form.btw_nummer}
                  onChange={setField("btw_nummer")}
                />
              </div>

              <Field
                label="IBAN / Bankrekeningnummer"
                value={form.iban}
                onChange={setField("iban")}
              />
            </div>
          )}

          {activeSection === "financieel" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Field
                  label="Totaal betaald (€)"
                  value={form.totaal_betaald}
                  onChange={setField("totaal_betaald")}
                  type="number"
                />
                <Field
                  label="Openstaand bedrag (€)"
                  value={form.openstaand_bedrag}
                  onChange={setField("openstaand_bedrag")}
                  type="number"
                />
              </div>

              <Field
                label="Contract status"
                value={form.contract_status}
                onChange={setField("contract_status")}
                as="select"
                options={[
                  { value: "geen", label: "Geen" },
                  { value: "verzonden", label: "Verzonden" },
                  { value: "getekend", label: "Getekend" },
                  { value: "verlopen", label: "Verlopen" },
                ]}
              />

              <Field
                label="Opzegstatus"
                value={form.opzeg_status}
                onChange={setField("opzeg_status")}
                as="select"
                options={[
                  { value: "actief", label: "Actief" },
                  { value: "opzegging_aangevraagd", label: "Opzegging aangevraagd" },
                  { value: "opgezegd", label: "Opgezegd" },
                ]}
              />

              {form.opzeg_status !== "actief" && (
                <Field
                  label="Opzegdatum"
                  value={form.opzeg_datum}
                  onChange={setField("opzeg_datum")}
                  type="date"
                />
              )}
            </div>
          )}

          {activeSection === "project" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field
                label="Klant status"
                value={form.status}
                onChange={setField("status")}
                as="select"
                options={STATUS_OPTIONS}
              />

              <Field
                label="Website status"
                value={form.website_status}
                onChange={setField("website_status")}
                as="select"
                options={[
                  { value: "offline", label: "Offline" },
                  { value: "in_aanbouw", label: "In aanbouw" },
                  { value: "online", label: "Online" },
                  { value: "probleem", label: "Probleem" },
                ]}
              />

              <Field
                label="Project status"
                value={form.project_status}
                onChange={setField("project_status")}
                as="select"
                options={[
                  { value: "nieuw", label: "Nieuw" },
                  { value: "in_progress", label: "In uitvoering" },
                  { value: "afgerond", label: "Afgerond" },
                  { value: "on_hold", label: "On hold" },
                ]}
              />

              <Field
                label="Startdatum klant"
                value={form.startdatum}
                onChange={setField("startdatum")}
                type="date"
              />
            </div>
          )}

          {activeSection === "notities" && (
            <Field
              label="Interne notities"
              value={form.interne_notities}
              onChange={setField("interne_notities")}
              as="textarea"
            />
          )}
        </div>

        <div
          style={{
            padding: "16px 28px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {!isNew && klant && (
              <button
                onClick={() => onDelete(klant.id)}
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 16px",
                  fontWeight: 600,
                  fontSize: "0.83rem",
                  cursor: "pointer",
                }}
              >
                Verwijderen
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onClose}
              style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: 9,
                padding: "10px 20px",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
                color: "#374151",
              }}
            >
              Annuleren
            </button>

            <button
              onClick={() => onSave(form)}
              style={{
                background: "#1e3a5f",
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "10px 20px",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
              }}
            >
              {isNew ? "Klant aanmaken" : "Opslaan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}