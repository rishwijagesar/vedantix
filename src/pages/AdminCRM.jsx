import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import CRMSidebar from "../components/crm/CRMSidebar";
import CRMDashboard from "../components/crm/CRMDashboard";
import CRMKlanten from "../components/crm/CRMKlanten";
import CRMTickets from "../components/crm/CRMTickets";
import CRMFacturen from "../components/crm/CRMFacturen";
import CRMAbonnementen from "../components/crm/CRMAbonnementen";
import CRMDocumenten from "../components/crm/CRMDocumenten";

export default function AdminCRM() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(u => {
        setUser(u || { full_name: "Admin", role: "admin" });
        setAuthChecked(true);
      })
      .catch(() => {
        setUser({ full_name: "Admin", role: "admin" });
        setAuthChecked(true);
      });
  }, []);

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.2)", borderTop: "3px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif" }}>Laden...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  const tabs = {
    dashboard: <CRMDashboard onNavigate={setActiveTab} />,
    klanten: <CRMKlanten />,
    tickets: <CRMTickets />,
    facturen: <CRMFacturen />,
    abonnementen: <CRMAbonnementen />,
    documenten: <CRMDocumenten />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .crm-fade{animation:fadeIn 0.2s ease}
      `}</style>
      <CRMSidebar activeTab={activeTab} onTabChange={setActiveTab} user={user} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(p => !p)} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", marginLeft: sidebarOpen ? 260 : 72, transition: "margin-left 0.25s ease" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#64748b" }}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "#1e3a5f", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
              {user?.full_name?.[0] || "A"}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1e293b" }}>{user?.full_name || "Admin"}</div>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Beheerder</div>
            </div>
            <button onClick={() => base44.auth.logout("/")} style={{ marginLeft: 8, background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 12px", fontSize: "0.78rem", color: "#64748b", cursor: "pointer", fontWeight: 600 }}>Uitloggen</button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "28px" }} className="crm-fade">
          {tabs[activeTab] || <CRMDashboard onNavigate={setActiveTab} />}
        </div>
      </div>
    </div>
  );
}