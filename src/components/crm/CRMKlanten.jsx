import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import KlantModal from "./KlantModal";
import ExportButton, { exportToCSV, exportToPDF } from "./ExportButton";

const CustomerProfile = base44.entities.CustomerProfile;

const STATUS_COLORS = {
  nieuw: "#3b82f6", intake: "#8b5cf6", in_opbouw: "#f59e0b",
  wachten_op_klant: "#f97316", live: "#10b981", onderhoud: "#6366f1",
  opgezegd: "#ef4444", gearchiveerd: "#94a3b8"
};
const STATUS_LABELS = {
  nieuw: "Nieuw", intake: "Intake", in_opbouw: "In opbouw",
  wachten_op_klant: "Wachten", live: "Live", onderhoud: "Onderhoud",
  opgezegd: "Opgezegd", gearchiveerd: "Gearchiveerd"
};

export default function CRMKlanten() {
  const [klanten, setKlanten] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedKlant, setSelectedKlant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await CustomerProfile.list("-created_date", 200);
    setKlanten(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = klanten.filter(k => {
    const matchSearch = !search || k.bedrijfsnaam?.toLowerCase().includes(search.toLowerCase()) || k.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || k.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleExportCSV = () => {
    const data = filtered.map(k => ({
      Bedrijfsnaam: k.bedrijfsnaam,
      Voornaam: k.voornaam || "",
      Achternaam: k.achternaam || "",
      Email: k.email,
      Telefoon: k.telefoon || "",
      Domeinnaam: k.domeinnaam || "",
      Status: k.status,
      Startdatum: k.startdatum || "",
      Plaats: k.plaats || "",
    }));
    exportToCSV(data, "klanten");
  };

  const handleExportPDF = () => {
    exportToPDF(
      "Klantenlijst",
      [
        { header: "Bedrijf", accessor: r => r.bedrijfsnaam },
        { header: "Contactpersoon", accessor: r => `${r.voornaam || ""} ${r.achternaam || ""}`.trim() },
        { header: "E-mail", accessor: r => r.email },
        { header: "Telefoon", accessor: r => r.telefoon },
        { header: "Domein", accessor: r => r.domeinnaam },
        { header: "Status", accessor: r => r.status },
        { header: "Startdatum", accessor: r => r.startdatum ? new Date(r.startdatum).toLocaleDateString("nl-NL") : "" },
      ],
      filtered,
      "klanten"
    );
  };

  const openNew = () => { setSelectedKlant(null); setIsNew(true); setShowModal(true); };
  const openEdit = (k) => { setSelectedKlant(k); setIsNew(false); setShowModal(true); };

  const handleSave = async (data) => {
    if (isNew) await CustomerProfile.create(data);
    else await CustomerProfile.update(selectedKlant.id, data);
    setShowModal(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Weet je zeker dat je deze klant wilt verwijderen?")) return;
    await CustomerProfile.delete(id);
    setShowModal(false);
    load();
  };

  const berekenDuur = (startdatum) => {
    if (!startdatum) return "–";
    const start = new Date(startdatum);
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (months < 1) return "< 1 maand";
    if (months < 12) return `${months} maanden`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem ? `${years}j ${rem}m` : `${years} jaar`;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Klanten</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 4 }}>{klanten.length} klanten in totaal</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <ExportButton onExportCSV={handleExportCSV} onExportPDF={handleExportPDF} />
          <button onClick={openNew} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>+ Nieuwe klant</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Zoek op naam of e-mail..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 220, padding: "10px 16px", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.88rem", outline: "none", background: "#fff" }}
        />
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
              {["Bedrijf", "Contactpersoon", "E-mail", "Abonnement", "Klant sinds", "Status", ""].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Laden...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Geen klanten gevonden</td></tr>
            ) : filtered.map(k => (
              <tr key={k.id} style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
                onClick={() => openEdit(k)}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1e293b" }}>{k.bedrijfsnaam}</div>
                  {k.domeinnaam && <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{k.domeinnaam}</div>}
                </td>
                <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#374151" }}>{k.voornaam} {k.achternaam}</td>
                <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#374151" }}>{k.email}</td>
                <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#374151" }}>
                  {k.huidig_abonnement || <span style={{ color: "#94a3b8" }}>–</span>}
                </td>
                <td style={{ padding: "14px 16px", fontSize: "0.83rem", color: "#374151" }}>
                  {k.startdatum ? (
                    <div>
                      <div>{new Date(k.startdatum).toLocaleDateString("nl-NL")}</div>
                      <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{berekenDuur(k.startdatum)}</div>
                    </div>
                  ) : "–"}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: (STATUS_COLORS[k.status] || "#94a3b8") + "18", color: STATUS_COLORS[k.status] || "#94a3b8", padding: "4px 12px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700 }}>
                    {STATUS_LABELS[k.status] || k.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={e => { e.stopPropagation(); openEdit(k); }} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: "0.78rem", cursor: "pointer", color: "#374151", fontWeight: 600 }}>Bewerken</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <KlantModal
          klant={selectedKlant}
          isNew={isNew}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}