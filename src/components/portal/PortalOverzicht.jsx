import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const Payment = base44.entities.Payment;
const Ticket = base44.entities.Ticket;
const Subscription = base44.entities.Subscription;

const WEBSITE_LABELS = { offline: "Offline", in_aanbouw: "In aanbouw", online: "Online", probleem: "Probleem" };
const WEBSITE_COLORS = { offline: "#94a3b8", in_aanbouw: "#f59e0b", online: "#10b981", probleem: "#ef4444" };
const STATUS_LABELS = { nieuw: "Nieuw", intake: "Intake", in_opbouw: "In opbouw", wachten_op_klant: "Wachten op klant", live: "Live", onderhoud: "Onderhoud" };

export default function PortalOverzicht({ klant, user, onNavigate }) {
  const [facturen, setFacturen] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [abonnement, setAbonnement] = useState(null);

  useEffect(() => {
    if (!klant) return;
    Promise.all([
      Payment.filter({ customer_id: klant.id }),
      Ticket.filter({ customer_id: klant.id }),
      Subscription.filter({ customer_id: klant.id })
    ]).then(([f, t, a]) => {
      setFacturen(f);
      setTickets(t);
      setAbonnement(a.find(s => s.status === "actief") || a[0] || null);
    });
  }, [klant]);

  const openFacturen = facturen.filter(f => f.status === "openstaand");
  const openTickets = tickets.filter(t => !["afgerond", "gesloten"].includes(t.status));
  const berekenDuur = () => {
    if (!klant.startdatum) return null;
    const start = new Date(klant.startdatum);
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (months < 1) return "Minder dan 1 maand";
    if (months < 12) return `${months} maanden`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem ? `${years} jaar en ${rem} maanden` : `${years} jaar`;
  };

  return (
    <div>
      {/* Welcome */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 16, padding: "28px 32px", marginBottom: 28, color: "#fff" }}>
        <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: 8 }}>Welkom terug</div>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 900, letterSpacing: -0.5, marginBottom: 8 }}>{klant.bedrijfsnaam}</h1>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 16 }}>
          {klant.startdatum && (
            <div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.5 }}>Klant sinds</div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{new Date(klant.startdatum).toLocaleDateString("nl-NL", { month: "long", year: "numeric" })} ({berekenDuur()})</div>
            </div>
          )}
          {abonnement && (
            <div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.5 }}>Abonnement</div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{abonnement.naam} — €{abonnement.maandbedrag}/m</div>
            </div>
          )}
          <div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.5 }}>Website</div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: WEBSITE_COLORS[klant.website_status] || "#fff" }}>
              ● {WEBSITE_LABELS[klant.website_status] || "–"}
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { icon: "💶", label: "Openstaande facturen", value: openFacturen.length, sub: `€${openFacturen.reduce((s, f) => s + (f.totaal_bedrag || 0), 0).toFixed(0)}`, color: openFacturen.length ? "#f59e0b" : "#10b981", nav: "facturen" },
          { icon: "🎫", label: "Open tickets", value: openTickets.length, sub: `${tickets.length} in totaal`, color: openTickets.length ? "#3b82f6" : "#10b981", nav: "tickets" },
          { icon: "💰", label: "Totaal betaald", value: `€${facturen.filter(f => f.status === "betaald").reduce((s, f) => s + (f.totaal_bedrag || 0), 0).toFixed(0)}`, sub: "Alle facturen", color: "#10b981", nav: "facturen" },
        ].map(c => (
          <button key={c.label} onClick={() => onNavigate(c.nav)} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "20px 22px", cursor: "pointer", textAlign: "left", transition: "box-shadow 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
            <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: c.color, marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#64748b" }}>{c.label}</div>
            <div style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: 2 }}>{c.sub}</div>
          </button>
        ))}
      </div>

      {/* Recent tickets */}
      {openTickets.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>Lopende verzoeken</h3>
            <button onClick={() => onNavigate("tickets")} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Alle tickets →</button>
          </div>
          {openTickets.slice(0, 3).map(t => (
            <div key={t.id} style={{ padding: "12px 20px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.87rem", color: "#1e293b" }}>{t.titel}</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{new Date(t.created_date).toLocaleDateString("nl-NL")}</div>
              </div>
              <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "3px 10px", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700 }}>
                {t.status?.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Open facturen */}
      {openFacturen.length > 0 && (
        <div style={{ background: "#fffbeb", borderRadius: 12, border: "1px solid #fde68a", padding: "16px 20px" }}>
          <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>⚠️ Openstaande facturen</div>
          <p style={{ color: "#b45309", fontSize: "0.85rem" }}>Je hebt {openFacturen.length} openstaande factuur/facturen voor een totaalbedrag van €{openFacturen.reduce((s, f) => s + (f.totaal_bedrag || 0), 0).toFixed(2)}.</p>
          <button onClick={() => onNavigate("facturen")} style={{ marginTop: 12, background: "#f59e0b", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 700, fontSize: "0.83rem", cursor: "pointer" }}>Facturen bekijken</button>
        </div>
      )}
    </div>
  );
}