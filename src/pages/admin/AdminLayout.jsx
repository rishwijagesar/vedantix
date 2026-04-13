import { Outlet, Link, useLocation } from "react-router-dom";
import VedantixLogo from "../../components/VedantixLogo";
import { useAdminStore } from "./hooks/useAdminStore";

export default function AdminLayout() {
  const location = useLocation();
  const store = useAdminStore();

  const navItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Klanten", path: "/admin/customers" },
    { label: "Financiën", path: "/admin/finance" },
    { label: "Prijzen", path: "/admin/pricing" },
    { label: "Instellingen", path: "/admin/settings" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <aside
        style={{
          width: 240,
          background: "#0f172a",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: 20,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <VedantixLogo variant="full" size="md" theme="light" />
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: active ? "#0f172a" : "#cbd5f5",
                  background: active ? "#fff" : "transparent",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 30 }}>
        <Outlet context={{ store }} />
      </main>
    </div>
  );
}