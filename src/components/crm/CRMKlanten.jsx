import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import KlantModal from "./KlantModal";
import ExportButton, { exportToCSV, exportToPDF } from "./ExportButton";

const CustomerProfile = base44.entities.CustomerProfile;

const STATUS_COLORS = {
  nieuw: "#3b82f6",
  intake: "#8b5cf6",
  in_opbouw: "#f59e0b",
  wachten_op_klant: "#f97316",
  live: "#10b981",
  onderhoud: "#6366f1",
  opgezegd: "#ef4444",
  gearchiveerd: "#94a3b8",
};

const STATUS_LABELS = {
  nieuw: "Nieuw",
  intake: "Intake",
  in_opbouw: "In opbouw",
  wachten_op_klant: "Wachten",
  live: "Live",
  onderhoud: "Onderhoud",
  opgezegd: "Opgezegd",
  gearchiveerd: "Gearchiveerd",
};

const SUBSCRIPTION_LABELS = {
  STARTER: "Starter",
  GROWTH: "Growth",
  PRO: "Pro",
};

export default function CRMKlanten() {
  const [klanten, setKlanten] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedKlant, setSelectedKlant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await CustomerProfile.list("-created_date", 200);
      setKlanten(data || []);
    } catch (error) {
      console.error("Laden van klanten mislukt", error);
      setKlanten([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = klanten.filter((k) => {
    const searchValue = search.toLowerCase();

    const matchSearch =
      !search ||
      k.bedrijfsnaam?.toLowerCase().includes(searchValue) ||
      k.email?.toLowerCase().includes(searchValue);

    const matchStatus = !filterStatus || k.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const handleExportCSV = () => {
    const data = filtered.map((k) => ({
      Bedrijfsnaam: k.bedrijfsnaam,
      Voornaam: k.voornaam || "",
      Achternaam: k.achternaam || "",
      Email: k.email,
      Telefoon: k.telefoon || "",
      Domeinnaam: k.domeinnaam || "",
      Abonnement:
        SUBSCRIPTION_LABELS[k.huidig_abonnement] || k.huidig_abonnement || "",
      Status: STATUS_LABELS[k.status] || k.status,
      Startdatum: k.startdatum || "",
      Plaats: k.plaats || "",
    }));

    exportToCSV(data, "klanten");
  };

  const handleExportPDF = () => {
    exportToPDF(
      "Klantenlijst",
      [
        { header: "Bedrijf", accessor: (r) => r.bedrijfsnaam },
        {
          header: "Contactpersoon",
          accessor: (r) => `${r.voornaam || ""} ${r.achternaam || ""}`.trim(),
        },
        { header: "E-mail", accessor: (r) => r.email },
        { header: "Telefoon", accessor: (r) => r.telefoon },
        { header: "Domein", accessor: (r) => r.domeinnaam },
        {
          header: "Abonnement",
          accessor: (r) =>
            SUBSCRIPTION_LABELS[r.huidig_abonnement] ||
            r.huidig_abonnement ||
            "–",
        },
        {
          header: "Status",
          accessor: (r) => STATUS_LABELS[r.status] || r.status,
        },
        {
          header: "Startdatum",
          accessor: (r) =>
            r.startdatum
              ? new Date(r.startdatum).toLocaleDateString("nl-NL")
              : "",
        },
      ],
      filtered,
      "klanten"
    );
  };

  const openNew = () => {
    setSelectedKlant(null);
    setIsNew(true);
    setShowModal(true);
  };

  const openEdit = (klant) => {
    setSelectedKlant(klant);
    setIsNew(false);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    try {
      if (isNew) {
        await CustomerProfile.create(data);
      } else if (selectedKlant?.id) {
        await CustomerProfile.update(selectedKlant.id, data);
      }

      setShowModal(false);
      await load();
    } catch (error) {
      console.error("Opslaan mislukt", error);
      alert("Opslaan mislukt.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Weet je zeker dat je deze klant wilt verwijderen?")) return;

    try {
      await CustomerProfile.delete(id);
      setShowModal(false);
      await load();
    } catch (error) {
      console.error("Verwijderen van klant mislukt", error);
      alert("Verwijderen mislukt.");
    }
  };

  const berekenDuur = (startdatum) => {
    if (!startdatum) return "–";

    const start = new Date(startdatum);
    const now = new Date();

    const months =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());

    if (months < 1) return "< 1 maand";
    if (months < 12) return `${months} maanden`;

    const years = Math.floor(months / 12);
    const rem = months % 12;

    return rem ? `${years}j ${rem}m` : `${years} jaar`;
  };

  const updateDeploymentState = async (klantId, deploymentState) => {
    await CustomerProfile.update(klantId, {
      deployment_state: deploymentState,
    });
  };

  const handleDeploy = async (klant) => {
    try {
      setActionLoadingId(`${klant.id}-deploy`);

      // TODO: vervang dit later door echte backend/function call
      // await base44.functions.invoke("deploy_customer_website", { customerId: klant.id })

      await updateDeploymentState(klant.id, "deploying");
      alert(`Deploy gestart voor ${klant.bedrijfsnaam}`);
      await load();
    } catch (error) {
      console.error("Deploy mislukt", error);
      alert("Deploy mislukt.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleStop = async (klant) => {
    const confirmed = confirm(
      `Weet je zeker dat je de website van ${klant.bedrijfsnaam} offline wilt halen en de services wilt stoppen?`
    );
    if (!confirmed) return;

    try {
      setActionLoadingId(`${klant.id}-stop`);

      // TODO: vervang dit later door echte backend/function call
      // await base44.functions.invoke("stop_customer_website", { customerId: klant.id });

      await updateDeploymentState(klant.id, "stopped");
      alert(`Stopactie uitgevoerd voor ${klant.bedrijfsnaam}`);
      await load();
    } catch (error) {
      console.error("Stoppen mislukt", error);
      alert("Stoppen mislukt.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRedeploy = async (klant) => {
    try {
      setActionLoadingId(`${klant.id}-redeploy`);

      // TODO: vervang dit later door echte backend/function call
      // await base44.functions.invoke("redeploy_customer_website", { customerId: klant.id });

      await updateDeploymentState(klant.id, "redeploying");
      alert(`Herdeploy gestart voor ${klant.bedrijfsnaam}`);
      await load();
    } catch (error) {
      console.error("Herdeploy mislukt", error);
      alert("Herdeploy mislukt.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDestroy = async (klant) => {
    const confirmed = confirm(
      `Weet je zeker dat je ALLES van ${klant.bedrijfsnaam} wilt verwijderen? Dit is bedoeld voor volledige teardown van website en infrastructuur.`
    );
    if (!confirmed) return;

    const typed = prompt(
      `Typ VERWIJDER om definitief alles van ${klant.bedrijfsnaam} te verwijderen.`
    );

    if (typed !== "VERWIJDER") {
      alert("Verwijderen geannuleerd.");
      return;
    }

    try {
      setActionLoadingId(`${klant.id}-destroy`);

      // TODO: vervang dit later door echte backend/function call
      // await base44.functions.invoke("destroy_customer_website", { customerId: klant.id });

      await updateDeploymentState(klant.id, "destroying");
      alert(`Verwijderactie gestart voor ${klant.bedrijfsnaam}`);
      await load();
    } catch (error) {
      console.error("Volledig verwijderen mislukt", error);
      alert("Volledig verwijderen mislukt.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const renderActionButton = (label, onClick, isLoading, style = {}) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      style={{
        background: "#f8fafc",
        border: "1px solid #cbd5e1",
        borderRadius: 8,
        padding: "6px 10px",
        fontSize: "0.76rem",
        cursor: isLoading ? "not-allowed" : "pointer",
        color: "#334155",
        fontWeight: 700,
        opacity: isLoading ? 0.7 : 1,
        ...style,
      }}
    >
      {isLoading ? "Bezig..." : label}
    </button>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Klanten
          </h1>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.9rem",
              marginTop: 4,
            }}
          >
            {klanten.length} klanten in totaal
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <ExportButton
            onExportCSV={handleExportCSV}
            onExportPDF={handleExportPDF}
          />
          <button
            onClick={openNew}
            style={{
              background: "#1e3a5f",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "11px 20px",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            + Nieuwe klant
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Zoek op naam of e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 220,
            padding: "10px 16px",
            border: "2px solid #e2e8f0",
            borderRadius: 10,
            fontSize: "0.88rem",
            outline: "none",
            background: "#fff",
          }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "10px 14px",
            border: "2px solid #e2e8f0",
            borderRadius: 10,
            fontSize: "0.88rem",
            background: "#fff",
            outline: "none",
          }}
        >
          <option value="">Alle statussen</option>
          {Object.entries(STATUS_LABELS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              {[
                "Bedrijf",
                "Contactpersoon",
                "E-mail",
                "Abonnement",
                "Klant sinds",
                "Status",
                "Acties",
                "",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    padding: 40,
                    textAlign: "center",
                    color: "#94a3b8",
                  }}
                >
                  Laden...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    padding: 40,
                    textAlign: "center",
                    color: "#94a3b8",
                  }}
                >
                  Geen klanten gevonden
                </td>
              </tr>
            ) : (
              filtered.map((k) => (
                <tr
                  key={k.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                  }}
                  onClick={() => openEdit(k)}
                >
                  <td style={{ padding: "14px 16px" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: "#1e293b",
                      }}
                    >
                      {k.bedrijfsnaam}
                    </div>
                    {k.domeinnaam && (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#94a3b8",
                        }}
                      >
                        {k.domeinnaam}
                      </div>
                    )}
                  </td>

                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "0.85rem",
                      color: "#374151",
                    }}
                  >
                    {k.voornaam} {k.achternaam}
                  </td>

                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "0.85rem",
                      color: "#374151",
                    }}
                  >
                    {k.email}
                  </td>

                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "0.85rem",
                      color: "#374151",
                    }}
                  >
                    {SUBSCRIPTION_LABELS[k.huidig_abonnement] ||
                      k.huidig_abonnement || (
                        <span style={{ color: "#94a3b8" }}>–</span>
                      )}
                  </td>

                  <td
                    style={{
                      padding: "14px 16px",
                      fontSize: "0.83rem",
                      color: "#374151",
                    }}
                  >
                    {k.startdatum ? (
                      <div>
                        <div>
                          {new Date(k.startdatum).toLocaleDateString("nl-NL")}
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "#94a3b8",
                          }}
                        >
                          {berekenDuur(k.startdatum)}
                        </div>
                      </div>
                    ) : (
                      "–"
                    )}
                  </td>

                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        background:
                          (STATUS_COLORS[k.status] || "#94a3b8") + "18",
                        color: STATUS_COLORS[k.status] || "#94a3b8",
                        padding: "4px 12px",
                        borderRadius: 100,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {STATUS_LABELS[k.status] || k.status}
                    </span>
                  </td>

                  <td
                    style={{ padding: "14px 16px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {renderActionButton(
                        "Deploy",
                        () => handleDeploy(k),
                        actionLoadingId === `${k.id}-deploy`,
                        {
                          background: "#ecfeff",
                          border: "1px solid #a5f3fc",
                          color: "#155e75",
                        }
                      )}

                      {renderActionButton(
                        "Stop",
                        () => handleStop(k),
                        actionLoadingId === `${k.id}-stop`,
                        {
                          background: "#fff7ed",
                          border: "1px solid #fdba74",
                          color: "#9a3412",
                        }
                      )}

                      {renderActionButton(
                        "Herdeploy",
                        () => handleRedeploy(k),
                        actionLoadingId === `${k.id}-redeploy`,
                        {
                          background: "#eff6ff",
                          border: "1px solid #93c5fd",
                          color: "#1d4ed8",
                        }
                      )}

                      {renderActionButton(
                        "Verwijderen",
                        () => handleDestroy(k),
                        actionLoadingId === `${k.id}-destroy`,
                        {
                          background: "#fef2f2",
                          border: "1px solid #fca5a5",
                          color: "#b91c1c",
                        }
                      )}
                    </div>
                  </td>

                  <td
                    style={{ padding: "14px 16px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => openEdit(k)}
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        color: "#374151",
                        fontWeight: 600,
                      }}
                    >
                      Bewerken
                    </button>
                  </td>
                </tr>
              ))
            )}
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