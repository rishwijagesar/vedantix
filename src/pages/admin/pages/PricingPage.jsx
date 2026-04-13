import React from "react";
import { Card, SectionTitle, Button, Field, Input, StatCard } from "../components/AdminUI";
import { currency } from "../utils/adminStorage";
import { useOutletContext } from "react-router-dom";

export default function PricingPage({ store: storeProp }) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();

  const store = storeProp || outletContext.store;
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Card>
        <SectionTitle
          title="Prijzen beheren"
          subtitle="Centrale plek voor pakketten en extra's. Wijzigingen zijn pas definitief na opslaan."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button
                tone={store.pricingTab === "packages" ? "primary" : "default"}
                onClick={() => store.setPricingTab("packages")}
              >
                Pakketten
              </Button>
              <Button
                tone={store.pricingTab === "extras" ? "primary" : "default"}
                onClick={() => store.setPricingTab("extras")}
              >
                Extra's
              </Button>
              <Button
                onClick={store.restoreDefaultPricing}
                disabled={store.isPricingSaving || store.isPricingLoading}
              >
                Herstel standaard
              </Button>
              <Button
                onClick={store.resetPricingDrafts}
                disabled={store.isPricingSaving || store.isPricingLoading}
              >
                Cancel
              </Button>
              <Button
                tone="success"
                onClick={store.savePricingChanges}
                disabled={store.isPricingSaving || store.isPricingLoading}
              >
                {store.isPricingSaving ? "Opslaan..." : "Save"}
              </Button>
            </div>
          }
        />

        {store.pricingError ? (
          <div
            style={{
              marginBottom: 16,
              padding: 14,
              borderRadius: 16,
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              color: "#9f1239",
              fontWeight: 700,
            }}
          >
            {store.pricingError}
          </div>
        ) : null}

        {store.pricingSaveMessage ? (
          <div
            style={{
              marginBottom: 16,
              padding: 14,
              borderRadius: 16,
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              color: "#065f46",
              fontWeight: 700,
            }}
          >
            {store.pricingSaveMessage}
          </div>
        ) : null}

        {store.isPricingLoading ? (
          <div style={{ color: "#64748b", fontWeight: 700 }}>Pricing laden...</div>
        ) : null}

        {!store.isPricingLoading && store.pricingTab === "packages" && (
          <div style={{ display: "grid", gap: 12 }}>
            {store.packageDrafts
              .slice()
              .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
              .map((item) => (
                <div
                  key={item.code}
                  style={{
                    border: "1px solid #dbe4ef",
                    borderRadius: 20,
                    padding: 18,
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.15fr 0.8fr 0.8fr 0.8fr 0.7fr auto",
                      gap: 12,
                      alignItems: "end",
                      marginBottom: 14,
                    }}
                  >
                    <Field label="Naam">
                      <Input
                        value={item.label || ""}
                        onChange={(e) =>
                          store.updatePackageDraft(item.code, "label", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Prijs p/m incl. btw">
                      <Input
                        type="number"
                        min="0"
                        value={item.monthlyPriceInclVat}
                        onChange={(e) =>
                          store.updatePackageDraft(item.code, "monthlyPriceInclVat", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Setup incl. btw">
                      <Input
                        type="number"
                        min="0"
                        value={item.setupPriceInclVat}
                        onChange={(e) =>
                          store.updatePackageDraft(item.code, "setupPriceInclVat", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Infra excl. btw">
                      <Input
                        type="number"
                        min="0"
                        value={item.monthlyInfraCostExclVat}
                        onChange={(e) =>
                          store.updatePackageDraft(
                            item.code,
                            "monthlyInfraCostExclVat",
                            e.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Volgorde">
                      <Input
                        type="number"
                        min="0"
                        value={item.sortOrder}
                        onChange={(e) =>
                          store.updatePackageDraft(item.code, "sortOrder", e.target.value)
                        }
                      />
                    </Field>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#334155",
                        fontWeight: 800,
                        minHeight: 54,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={item.isActive !== false}
                        onChange={(e) =>
                          store.updatePackageDraft(item.code, "isActive", e.target.checked)
                        }
                      />
                      Actief
                    </label>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                      gap: 12,
                    }}
                  >
                    <StatCard title="Maand excl. btw" value={currency(item.monthlyPriceExclVat)} subtitle="Afgeleid" tone="#0ea5e9" />
                    <StatCard title="Btw p/m" value={currency(item.monthlyVatAmount)} subtitle="Afgeleid" tone="#8b5cf6" />
                    <StatCard title="Setup excl. btw" value={currency(item.setupPriceExclVat)} subtitle="Afgeleid" tone="#0ea5e9" />
                    <StatCard title="Btw setup" value={currency(item.setupVatAmount)} subtitle="Afgeleid" tone="#8b5cf6" />
                    <StatCard title="Infra btw" value={currency(item.monthlyInfraCostVatAmount)} subtitle="Afgeleid" tone="#f97316" />
                    <StatCard title="Infra incl. btw" value={currency(item.monthlyInfraCostInclVat)} subtitle="Afgeleid" tone="#10b981" />
                  </div>
                </div>
              ))}
          </div>
        )}

        {!store.isPricingLoading && store.pricingTab === "extras" && (
          <div style={{ display: "grid", gap: 12 }}>
            {store.addonDrafts
              .slice()
              .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
              .map((item) => (
                <div
                  key={item.code}
                  style={{
                    border: "1px solid #dbe4ef",
                    borderRadius: 20,
                    padding: 18,
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.15fr 0.8fr 0.8fr 0.8fr 0.7fr auto",
                      gap: 12,
                      alignItems: "end",
                      marginBottom: 14,
                    }}
                  >
                    <Field label="Naam">
                      <Input
                        value={item.label || ""}
                        onChange={(e) =>
                          store.updateAddonDraft(item.code, "label", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Prijs p/m incl. btw">
                      <Input
                        type="number"
                        min="0"
                        value={item.monthlyPriceInclVat}
                        onChange={(e) =>
                          store.updateAddonDraft(item.code, "monthlyPriceInclVat", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Setup incl. btw">
                      <Input
                        type="number"
                        min="0"
                        value={item.setupPriceInclVat}
                        onChange={(e) =>
                          store.updateAddonDraft(item.code, "setupPriceInclVat", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Infra excl. btw">
                      <Input
                        type="number"
                        min="0"
                        value={item.monthlyInfraCostExclVat}
                        onChange={(e) =>
                          store.updateAddonDraft(item.code, "monthlyInfraCostExclVat", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Volgorde">
                      <Input
                        type="number"
                        min="0"
                        value={item.sortOrder}
                        onChange={(e) =>
                          store.updateAddonDraft(item.code, "sortOrder", e.target.value)
                        }
                      />
                    </Field>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#334155",
                        fontWeight: 800,
                        minHeight: 54,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={item.isActive !== false}
                        onChange={(e) =>
                          store.updateAddonDraft(item.code, "isActive", e.target.checked)
                        }
                      />
                      Actief
                    </label>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                      gap: 12,
                    }}
                  >
                    <StatCard title="Maand excl. btw" value={currency(item.monthlyPriceExclVat)} subtitle="Afgeleid" tone="#0ea5e9" />
                    <StatCard title="Btw p/m" value={currency(item.monthlyVatAmount)} subtitle="Afgeleid" tone="#8b5cf6" />
                    <StatCard title="Setup excl. btw" value={currency(item.setupPriceExclVat)} subtitle="Afgeleid" tone="#0ea5e9" />
                    <StatCard title="Btw setup" value={currency(item.setupVatAmount)} subtitle="Afgeleid" tone="#8b5cf6" />
                    <StatCard title="Infra btw" value={currency(item.monthlyInfraCostVatAmount)} subtitle="Afgeleid" tone="#f97316" />
                    <StatCard title="Infra incl. btw" value={currency(item.monthlyInfraCostInclVat)} subtitle="Afgeleid" tone="#10b981" />
                  </div>
                </div>
              ))}
          </div>
        )}
      </Card>
    </div>
  );
}