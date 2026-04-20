import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import VedantixLogo from "../../components/VedantixLogo";
import { useAdminStore } from "./hooks/useAdminStore";
import { useAdminAuth } from "./auth/adminAuth";
import {
  Button,
  Modal,
  Field,
  Input,
  Select,
  Textarea,
  Card,
} from "./components/AdminUI";
import NotificationCenter from "./components/NotificationCenter";
import { currency } from "./utils/adminStorage";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useAdminStore();
  const { logout } = useAdminAuth();

  const navItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Klanten", path: "/admin/customers" },
    { label: "Financiën", path: "/admin/finance" },
    { label: "Prijzen", path: "/admin/pricing" },
    { label: "Instellingen", path: "/admin/settings" },
  ];

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <NotificationCenter />

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

        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {navItems.map((item) => {
            const active =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.path);

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

        <Button
          tone="soft"
          onClick={handleLogout}
          style={{
            width: "100%",
            marginTop: 20,
            borderRadius: 14,
          }}
        >
          Uitloggen
        </Button>
      </aside>

      <main style={{ flex: 1, padding: 30 }}>
        <Outlet context={{ store }} />
      </main>

      <Modal
        open={store.isCreateCustomerOpen}
        title="Nieuwe klant aanmaken"
        onClose={() => {
          store.setIsCreateCustomerOpen(false);
          store.resetCustomerForm();
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <Field label="Bedrijfsnaam">
            <Input
              value={store.customerForm.companyName}
              onChange={(e) => store.updateCustomerForm("companyName", e.target.value)}
              placeholder="Vedantix Example"
            />
          </Field>

          <Field label="Contactpersoon">
            <Input
              value={store.customerForm.contactName}
              onChange={(e) => store.updateCustomerForm("contactName", e.target.value)}
              placeholder="Rishwi Jagesar"
            />
          </Field>

          <Field label="E-mail">
            <Input
              value={store.customerForm.email}
              onChange={(e) => store.updateCustomerForm("email", e.target.value)}
              placeholder="info@bedrijf.nl"
            />
          </Field>

          <Field label="Telefoon">
            <Input
              value={store.customerForm.phone}
              onChange={(e) => store.updateCustomerForm("phone", e.target.value)}
              placeholder="+31 6 12345678"
            />
          </Field>

          <Field label="Domeinnaam">
            <Input
              value={store.customerForm.domain}
              onChange={(e) => store.updateCustomerForm("domain", e.target.value)}
              placeholder="bedrijf.nl"
            />
          </Field>

          <Field label="Pakket">
            <Select
              value={store.customerForm.packageCode}
              onChange={(e) => store.updateCustomerForm("packageCode", e.target.value)}
            >
              {store.packageOptions
                .filter((item) => item.isActive !== false)
                .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
                .map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label} — {currency(item.monthlyPriceInclVat)}/m — setup {currency(item.setupPriceInclVat)}
                  </option>
                ))}
            </Select>
          </Field>

          <Field label="Niche">
            <Input
              value={store.customerForm.niche || ""}
              onChange={(e) => store.updateCustomerForm("niche", e.target.value)}
              placeholder="Kapper, restaurant, fotograaf..."
            />
          </Field>

          <Field label="Template key">
            <Input
              value={store.customerForm.templateKey || ""}
              onChange={(e) => store.updateCustomerForm("templateKey", e.target.value)}
              placeholder="barbershop-v1"
            />
          </Field>

          <Field label="Adres">
            <Input
              value={store.customerForm.address}
              onChange={(e) => store.updateCustomerForm("address", e.target.value)}
              placeholder="Straat 1"
            />
          </Field>

          <Field label="Postcode">
            <Input
              value={store.customerForm.postalCode}
              onChange={(e) => store.updateCustomerForm("postalCode", e.target.value)}
              placeholder="1234 AB"
            />
          </Field>

          <Field label="Plaats">
            <Input
              value={store.customerForm.city}
              onChange={(e) => store.updateCustomerForm("city", e.target.value)}
              placeholder="Utrecht"
            />
          </Field>

          <Field label="Land">
            <Input
              value={store.customerForm.country}
              onChange={(e) => store.updateCustomerForm("country", e.target.value)}
              placeholder="Nederland"
            />
          </Field>

          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Extra's">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 10,
                  border: "1px solid #dbe4ef",
                  borderRadius: 18,
                  padding: 14,
                  background: "#ffffff",
                }}
              >
                {store.extraOptions
                  .filter((item) => item.isActive !== false)
                  .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
                  .map((extra) => (
                    <label
                      key={extra.code}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#334155",
                        fontSize: 14,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={store.customerForm.extras.includes(extra.code)}
                        onChange={() => store.toggleExtra(extra.code)}
                      />
                      <span>
                        {extra.label} ({currency(extra.monthlyPriceInclVat)}/m · setup {currency(extra.setupPriceInclVat)})
                      </span>
                    </label>
                  ))}
              </div>
            </Field>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <Card
              style={{
                borderRadius: 20,
                padding: 18,
                background:
                  "linear-gradient(180deg, rgba(239,246,255,0.85) 0%, rgba(255,255,255,0.98) 100%)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 14,
                }}
              >
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Maandprijs
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
                    {currency(store.calcMonthlyRevenue(store.customerForm))}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Setup prijs
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
                    {currency(store.calcSetupRevenue(store.customerForm))}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Infra p/m
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
                    {currency(store.calcMonthlyInfraCost(store.customerForm))}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Brutomarge p/m
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#10b981" }}>
                    {currency(
                      store.calcMonthlyRevenue(store.customerForm) -
                        store.calcMonthlyInfraCost(store.customerForm)
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Notities">
              <Textarea
                value={store.customerForm.notes}
                onChange={(e) => store.updateCustomerForm("notes", e.target.value)}
                placeholder="Intake-info, afspraken, bijzonderheden..."
              />
            </Field>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 24,
          }}
        >
          <Button
            onClick={() => {
              store.setIsCreateCustomerOpen(false);
              store.resetCustomerForm();
            }}
          >
            Annuleren
          </Button>
          <Button tone="primary" onClick={store.addCustomerAndProvision} disabled={store.isProvisioning}>
            {store.isProvisioning ? "Bezig..." : "Klant aanmaken"}
          </Button>
        </div>
      </Modal>

      <Modal
        open={Boolean(store.deleteCandidate)}
        title="Klant verwijderen?"
        onClose={() => store.setDeleteCandidate(null)}
        maxWidth={560}
      >
        <div
          style={{
            padding: 4,
            display: "grid",
            gap: 18,
          }}
        >
          <div
            style={{
              borderRadius: 20,
              padding: 18,
              background: "linear-gradient(180deg, #fff1f2 0%, #ffffff 100%)",
              border: "1px solid #fecdd3",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: "#991b1b",
                marginBottom: 8,
              }}
            >
              Let op
            </div>
            <div style={{ color: "#475569", lineHeight: 1.7 }}>
              Je staat op het punt om <strong>{store.deleteCandidate ? store.deleteCandidate.companyName : ""}</strong> te verwijderen uit het dashboard. Dit kan niet automatisch ongedaan worden gemaakt.
            </div>
          </div>

          <div style={{ color: "#475569", lineHeight: 1.7 }}>
            Controleer eerst of je echt deze klant wilt verwijderen. Gebruik <strong>Beheren</strong> als je alleen gegevens wilt aanpassen.
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <Button onClick={() => store.setDeleteCandidate(null)}>Annuleren</Button>
            <Button tone="danger" onClick={store.confirmDeleteCustomer}>
              Ja, verwijder klant
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}