import React from "react";
import { useAdminStore } from "./hooks/useAdminStore";
import { BrandLogo, Button, Modal, Field, Input, Select, Textarea, Card } from "./components/AdminUI";
import { currency } from "./utils/adminStorage";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import FinancePage from "./pages/FinancePage";
import PricingPage from "./pages/PricingPage";
import SettingsPage from "./pages/SettingsPage";

export default function AdminCRM() {
  const store = useAdminStore();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.12) 0%, transparent 26%), radial-gradient(circle at top right, rgba(14,165,233,0.08) 0%, transparent 22%), linear-gradient(180deg, #f8fbff 0%, #f5f7fb 100%)",
        color: "#0f172a",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1680, margin: "0 auto", padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 26,
          }}
        >
          <div>
            <BrandLogo />
            <div style={{ marginTop: 14 }}>
              <h1
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 10,
                  letterSpacing: "-0.04em",
                }}
              >
                Vedantix Admin Dashboard
              </h1>
              <p style={{ color: "#64748b", fontSize: 16 }}>
                CRM, deployment monitoring en financieel overzicht.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
              border: "1px solid #dbe4ef",
              borderRadius: 22,
              padding: 10,
              boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
            }}
          >
            {[
              ["dashboard", "Dashboard"],
              ["customers", "Klanten"],
              ["finance", "Financiën"],
              ["pricing", "Prijzen"],
              ["settings", "Instellingen"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => store.setActiveTab(key)}
                style={{
                  border: "none",
                  borderRadius: 16,
                  padding: "13px 18px",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  background:
                    store.activeTab === key
                      ? "linear-gradient(135deg, #0f172a 0%, #172554 100%)"
                      : "transparent",
                  color: store.activeTab === key ? "#ffffff" : "#475569",
                  boxShadow:
                    store.activeTab === key
                      ? "0 14px 30px rgba(15,23,42,0.18)"
                      : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {store.activeTab === "dashboard" && <DashboardPage store={store} />}
        {store.activeTab === "customers" && <CustomersPage store={store} />}
        {store.activeTab === "finance" && <FinancePage store={store} />}
        {store.activeTab === "pricing" && <PricingPage store={store} />}
        {store.activeTab === "settings" && <SettingsPage store={store} />}
      </div>

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
              Je staat op het punt om{" "}
              <strong>{store.deleteCandidate ? store.deleteCandidate.companyName : ""}</strong>{" "}
              te verwijderen uit het dashboard. Dit kan niet automatisch ongedaan worden gemaakt.
            </div>
          </div>

          <div style={{ color: "#475569", lineHeight: 1.7 }}>
            Controleer eerst of je echt deze klant wilt verwijderen. Gebruik{" "}
            <strong>Beheren</strong> als je alleen gegevens wilt aanpassen.
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