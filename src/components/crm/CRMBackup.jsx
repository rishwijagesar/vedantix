import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { exportToCSV } from "./ExportButton";
import { databaseBackup } from "@/functions/databaseBackup";

export default function CRMBackup() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await databaseBackup({ action: "list" });
    setBackups(res.data?.backups || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    setCreating(true);
    setMsg(null);
    const res = await databaseBackup({ action: "create" });
    if (res.data?.success) {
      setMsg({ type: "success", text: "Backup succesvol aangemaakt!" });
      load();
    } else {
      setMsg({ type: "error", text: "Fout bij aanmaken backup." });
    }
    setCreating(false);
  };

  const handleRestore = async (backup) => {
    if (!confirm(`Weet je zeker dat je de backup van ${new Date(backup.created_at).toLocaleString("nl-NL")} wilt terugzetten? Huidige data wordt overschreven.`)) return;
    setRestoring(backup.id);
    setMsg(null);
    const res = await restoreBackup({ backup_id: backup.id });
    if (res.data?.success) {
      setMsg({ type: "success", text: "Database succesvol teruggezet!" });
    } else {
      setMsg({ type: "error", text: "Fout bij terugzetten: " + (res.data?.error || "onbekend") });
    }
    setRestoring(null);
  };

  const handleDownload = (backup) => {
    if (!backup.data) return alert("Geen data beschikbaar voor download.");
    const jsonStr = JSON.stringify(backup.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vedantix-backup-${new Date(backup.created_at).toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Database Backup</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 4 }}>Automatische dagelijkse backup om 20:00 · Herstel eerdere versies</p>
        </div>
        <button onClick={handleCreate} disabled={creating} style={{ background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: "0.88rem", cursor: creating ? "not-allowed" : "pointer", opacity: creating ? 0.7 : 1 }}>
          {creating ? "Backup maken..." : "⬆ Nu backup maken"}
        </button>
      </div>

      {msg && (
        <div style={{ background: msg.type === "success" ? "#d1fae5" : "#fee2e2", color: msg.type === "success" ? "#065f46" : "#dc2626", padding: "12px 18px", borderRadius: 10, marginBottom: 20, fontWeight: 600, fontSize: "0.88rem" }}>
          {msg.type === "success" ? "✅" : "❌"} {msg.text}
        </div>
      )}

      {/* Info banner */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ fontSize: "1.2rem" }}>ℹ️</span>
        <div style={{ fontSize: "0.85rem", color: "#1e40af" }}>
          <strong>Automatische backup:</strong> Elke dag om 20:00 wordt automatisch een backup gemaakt van alle entiteiten. Backups worden 30 dagen bewaard. Je kunt ook handmatig een backup maken en elke backup terugzetten.
        </div>
      </div>

      {/* Backup list */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid #f1f5f9" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>Beschikbare backups</h3>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Laden...</div>
        ) : backups.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>💾</div>
            <div>Nog geen backups beschikbaar. Maak nu je eerste backup.</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Datum & tijd", "Type", "Entiteiten", "Acties"].map(h => (
                  <th key={h} style={{ padding: "10px 18px", textAlign: "left", fontSize: "0.73rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {backups.map(b => (
                <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1e293b" }}>
                      {new Date(b.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "#94a3b8" }}>
                      {new Date(b.created_at).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{ background: b.type === "auto" ? "#eff6ff" : "#f0fdf4", color: b.type === "auto" ? "#1d4ed8" : "#16a34a", padding: "3px 10px", borderRadius: 100, fontSize: "0.73rem", fontWeight: 700 }}>
                      {b.type === "auto" ? "⏱ Automatisch" : "👤 Handmatig"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "0.85rem", color: "#374151" }}>
                    {b.entity_count ? `${b.entity_count} entiteiten` : "–"}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => handleDownload(b)} style={{ background: "#f1f5f9", border: "none", borderRadius: 7, padding: "7px 12px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#374151" }}>
                        ⬇ Download
                      </button>
                      <button onClick={() => handleRestore(b)} disabled={restoring === b.id} style={{ background: "#fef3c7", border: "none", borderRadius: 7, padding: "7px 12px", fontSize: "0.78rem", fontWeight: 600, cursor: restoring === b.id ? "not-allowed" : "pointer", color: "#92400e", opacity: restoring === b.id ? 0.6 : 1 }}>
                        {restoring === b.id ? "Bezig..." : "↩ Terugzetten"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}