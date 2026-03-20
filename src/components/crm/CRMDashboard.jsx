import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const CustomerProfile = base44.entities.CustomerProfile;
const Ticket = base44.entities.Ticket;
const Payment = base44.entities.Payment;

function StatCard({ label, value, icon, color, sub }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", border: "1px solid #e2e8f0", display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748b", marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

export default function CRMDashboard({ onNavigate }) {
  const [data, setData] = useState({ klanten: [], tickets: [], facturen: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      CustomerProfile.list("-created_date", 100),
      Ticket.list("-created_date", 50),
      Payment.list("-created_date", 100)
    ]).then(([klanten, tickets, facturen]) => {
      setData({ klanten, tickets, facturen });
      setLoading(false);
    });
  }, []);

  const actief = data.klanten.filter(k => k.status === "live").length;
  const openTickets = data.tickets.filter(t => !["afgerond","gesloten"].includes(t.status)).length;
  const openFacturen = data.facturen.filter(f => f.status === "openstaand");
  const openBedrag = openFacturen.reduce((s, f) => s + (f.totaal_bedrag || f.bedrag || 0), 0);
  const nieuweKlanten = data.klanten.filter(k => k.status === "nieuw" || k.status === "intake").length;

  const recentTickets = data.tickets.slice(0, 5);
  const recentKlanten = data.klanten.slice(0, 5);

  const statusColors = {
    nieuw: "#3b82f6", intake: "#8b5cf6", in_opbouw: "#f59e0b",
    wachten_op_klant: "#f97316", live: "#10b981", onderhoud: "#6366f1",
    opgezegd: "#ef4444", gearchiveerd: "#94a3b8"
  };
  const statusLabels = {
    nieuw: "Nieuw", intake: "Intake", in_opbouw: "In opbouw",
    wachten_op_klant: "Wachten", live: "Live", onderhoud: "Onderhoud",
    opgezegd: "Opgezegd", gearchiveerd: "Gearchiveerd"
  };
  const prioriteitColors = { laag: "#94a3b8", normaal: "#3b82f6", hoog: "#f59e0b", spoed: "#ef4444" };
  const prioriteitLabels = { laag: "Laag", normaal: "Normaal", hoog: "Hoog", spoed: "Spoed" };

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>Laden...</div>;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 4 }}>Overzicht van je klanten, tickets en financiën</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard label="Totaal klanten" value={data.klanten.length} icon="👥" color="#3b82f6" sub={`${actief} actief`} />
        <StatCard label="Open tickets" value={openTickets} icon="🎫" color="#f59e0b" sub={`${data.tickets.length} totaal`} />
        <StatCard label="Openstaand" value={`€${openBedrag.toFixed(0)}`} icon="💶" color="#ef4444" sub={`${openFacturen.length} facturen`} />
        <StatCard label="Nieuwe klanten" value={nieuweKlanten} icon="✨" color="#10b981" sub="Intake & nieuw" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent klanten */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>Recente klanten</h3>
            <button onClick={() => onNavigate("klanten")} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Alle klanten →</button>
          </div>
          {recentKlanten.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "#94a3b8", fontSize: "0.88rem" }}>Nog geen klanten</div>
          ) : (
            recentKlanten.map(k => (
              <div key={k.id} style={{ padding: "13px 20px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1e293b" }}>{k.bedrijfsnaam}</div>
                  <div style={{ fontSize: "0.76rem", color: "#94a3b8" }}>{k.email}</div>
                </div>
                <span style={{ background: (statusColors[k.status] || "#94a3b8") + "15", color: statusColors[k.status] || "#94a3b8", padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700 }}>
                  {statusLabels[k.status] || k.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Recent tickets */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>Recente tickets</h3>
            <button onClick={() => onNavigate("tickets")} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Alle tickets →</button>
          </div>
          {recentTickets.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "#94a3b8", fontSize: "0.88rem" }}>Nog geen tickets</div>
          ) : (
            recentTickets.map(t => (
              <div key={t.id} style={{ padding: "13px 20px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1e293b" }}>{t.titel}</div>
                  <div style={{ fontSize: "0.76rem", color: "#94a3b8" }}>{t.klant_naam}</div>
                </div>
                <span style={{ background: (prioriteitColors[t.prioriteit] || "#94a3b8") + "20", color: prioriteitColors[t.prioriteit] || "#94a3b8", padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700 }}>
                  {prioriteitLabels[t.prioriteit] || t.prioriteit}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}