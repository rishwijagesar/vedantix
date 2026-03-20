import VedantixLogo from "../VedantixLogo";

export default function CRMSidebar({ activeTab, onTabChange, user, isOpen, onToggle }) {
  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "klanten", icon: "👥", label: "Klanten" },
    { id: "tickets", icon: "🎫", label: "Tickets" },
    { id: "facturen", icon: "🧾", label: "Facturen" },
    { id: "financien", icon: "💰", label: "Financiën" },
    { id: "abonnementen", icon: "📦", label: "Abonnementen" },
    { id: "documenten", icon: "📁", label: "Documenten" },
    { id: "backup", icon: "💾", label: "Backup" },
  ];

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
      width: isOpen ? 260 : 72,
      background: "#0f172a",
      transition: "width 0.25s ease",
      display: "flex", flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", minHeight: 70 }}>
        {isOpen
          ? <VedantixLogo variant="full" size={34} theme="light" />
          : <VedantixLogo variant="icon" size={34} theme="light" />
        }
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 12px", borderRadius: 10, border: "none",
              cursor: "pointer", transition: "all 0.15s",
              background: activeTab === item.id ? "rgba(59,130,246,0.15)" : "transparent",
              color: activeTab === item.id ? "#60a5fa" : "rgba(255,255,255,0.55)",
              fontWeight: activeTab === item.id ? 700 : 500,
              fontSize: "0.88rem",
              borderLeft: activeTab === item.id ? "2px solid #3b82f6" : "2px solid transparent",
              whiteSpace: "nowrap", overflow: "hidden",
              width: "100%", textAlign: "left"
            }}
          >
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      {isOpen && (
        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600 }}>
            ← Terug naar website
          </a>
        </div>
      )}
    </div>
  );
}