import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import PortalOverzicht from "../components/portal/PortalOverzicht";
import PortalAbonnement from "../components/portal/PortalAbonnement";
import PortalFacturen from "../components/portal/PortalFacturen";
import PortalTickets from "../components/portal/PortalTickets";
import PortalGegevens from "../components/portal/PortalGegevens";
import PortalDocumenten from "../components/portal/PortalDocumenten";

const CustomerProfile = base44.entities.CustomerProfile;

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [klant, setKlant] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("overzicht");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(async u => {
      if (!u) { base44.auth.redirectToLogin(window.location.href); return; }
      setUser(u);
      // Admin redirect to CRM
      if (u.role === "admin") { window.location.href = "/CRM"; return; }
      // Find customer profile linked to this user
      const profiles = await CustomerProfile.filter({ user_id: u.id });
      if (profiles.length > 0) setKlant(profiles[0]);
      setAuthChecked(true);
    }).catch(() => base44.auth.redirectToLogin(window.location.href));
  }, []);

  const reloadKlant = async () => {
    if (!user) return;
    const profiles = await CustomerProfile.filter({ user_id: user.id });
    if (profiles.length > 0) setKlant(profiles[0]);
  };

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#fff", fontFamily: "'Inter',sans-serif", textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.2)", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Laden...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  if (!klant) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 400, padding: 32 }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
          <h2 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#0f172a", marginBottom: 8 }}>Account niet gevonden</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>Er is geen klantprofiel gekoppeld aan jouw account. Neem contact op met Vedantix.</p>
          <a href="mailto:info@vedantix.nl" style={{ background: "#1e3a5f", color: "#fff", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>Contact opnemen</a>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "overzicht", icon: "⊞", label: "Overzicht" },
    { id: "abonnement", icon: "📦", label: "Abonnement" },
    { id: "facturen", icon: "🧾", label: "Facturen" },
    { id: "tickets", icon: "🎫", label: "Tickets" },
    { id: "gegevens", icon: "👤", label: "Mijn gegevens" },
    { id: "documente", icon: "📁", label: "Documenten" },
  ];

  const tabs = {
    overzicht: <PortalOverzicht klant={klant} user={user} onNavigate={setActiveTab} />,
    abonnement: <PortalAbonnement klant={klant} onReload={reloadKlant} />,
    facturen: <PortalFacturen klant={klant} />,
    tickets: <PortalTickets klant={klant} />,
    gegevens: <PortalGegevens klant={klant} user={user} onReload={reloadKlant} />,
    documenten: <PortalDocumenten klant={klant} />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .portal-fade{animation:fadeIn 0.2s ease}
        @media(max-width:768px){
          .portal-sidebar{display:none !important}
          .portal-content{margin-left:0 !important}
        }
      `}</style>

      {/* Sidebar */}
      <div className="portal-sidebar" style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 240, background: "#0f172a", zIndex: 100, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "22px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#3b82f6,#6366f1)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "0.9rem" }}>V</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.88rem" }}>Vedantix</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem" }}>Klantportaal</div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{klant.bedrijfsnaam}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", marginTop: 2 }}>{user?.email}</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer",
              background: activeTab === item.id ? "rgba(59,130,246,0.15)" : "transparent",
              color: activeTab === item.id ? "#60a5fa" : "rgba(255,255,255,0.55)",
              fontWeight: activeTab === item.id ? 700 : 500, fontSize: "0.87rem",
              borderLeft: activeTab === item.id ? "2px solid #3b82f6" : "2px solid transparent",
              textAlign: "left", width: "100%"
            }}>
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={() => base44.auth.logout("/")} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
            Uitloggen
          </button>
        </div>
      </div>

      {/* Mobile top nav */}
      <div style={{ display: "none", position: "sticky", top: 0, zIndex: 50, background: "#0f172a", padding: "12px 16px", justifyContent: "space-between", alignItems: "center" }} className="portal-mobile-nav">
        <div style={{ color: "#fff", fontWeight: 800 }}>Vedantix</div>
        <button onClick={() => setMobileMenuOpen(p => !p)} style={{ background: "none", border: "none", color: "#fff", fontSize: "1.4rem", cursor: "pointer" }}>☰</button>
      </div>

      {/* Content */}
      <div className="portal-content" style={{ marginLeft: 240, padding: "32px 28px", minHeight: "100vh" }}>
        <div className="portal-fade" key={activeTab}>
          {tabs[activeTab]}
        </div>
      </div>
    </div>
  );
}