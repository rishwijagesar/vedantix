import React from "react";
import { useOutletContext } from "react-router-dom";
import { Card, SectionTitle, Button, Field, Input, StatCard, Textarea } from "../components/AdminUI";
import { currency } from "../utils/adminStorage";

function linesToValue(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function valueToLines(value) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function PricingMetricGrid({ item }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 12,
      }}
    >
      <StatCard
        title="Maand excl. btw"
        value={currency(item.monthlyPriceExclVat)}
        subtitle="Afgeleid"
        tone="#0ea5e9"
      />
      <StatCard
        title="Btw p/m"
        value={currency(item.monthlyVatAmount)}
        subtitle="Afgeleid"
        tone="#8b5cf6"
      />
      <StatCard
        title="Setup excl. btw"
        value={currency(item.setupPriceExclVat)}
        subtitle="Afgeleid"
        tone="#0ea5e9"
      />
      <StatCard
        title="Btw setup"
        value={currency(item.setupVatAmount)}
        subtitle="Afgeleid"
        tone="#8b5cf6"
      />
      <StatCard
        title="Infra btw"
        value={currency(item.monthlyInfraCostVatAmount)}
        subtitle="Afgeleid"
        tone="#f97316"
      />
      <StatCard
        title="Infra incl. btw"
        value={currency(item.monthlyInfraCostInclVat)}
        subtitle="Afgeleid"
        tone="#10b981"
      />
    </div>
  );
}

function PackageCard({ item, onChange, type = "package" }) {
  const update = (key, value) => onChange(item.code, key, value);

  return (
    <div
      style={{
        border: "1px solid #dbe4ef",
        borderRadius: 24,
        padding: 22,
        background: "#ffffff",
        display: "grid",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.1,
            }}
          >
            {item.label || item.code}
          </div>
          <div
            style={{
              marginTop: 6,
              color: "#64748b",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {type === "package" ? item.code : `Addon · ${item.code}`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {type === "package" ? (
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#334155",
                fontWeight: 800,
                background: "#f8fafc",
                border: "1px solid #dbe4ef",
                borderRadius: 999,
                padding: "10px 14px",
              }}
            >
              <input
                type="checkbox"
                checked={Boolean(item.featured)}
                onChange={(e) => update("featured", e.target.checked)}
              />
              Meest gekozen
            </label>
          ) : null}

          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#334155",
              fontWeight: 800,
              background: "#f8fafc",
              border: "1px solid #dbe4ef",
              borderRadius: 999,
              padding: "10px 14px",
            }}
          >
            <input
              type="checkbox"
              checked={item.isActive !== false}
              onChange={(e) => update("isActive", e.target.checked)}
            />
            Actief
          </label>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14,
        }}
      >
        <Field label="Naam">
          <Input
            value={item.label || ""}
            onChange={(e) => update("label", e.target.value)}
          />
        </Field>

        <Field label="Volgorde">
          <Input
            type="number"
            min="0"
            value={item.sortOrder}
            onChange={(e) => update("sortOrder", e.target.value)}
          />
        </Field>

        <Field label="Prijs p/m incl. btw">
          <Input
            type="number"
            min="0"
            value={item.monthlyPriceInclVat}
            onChange={(e) => update("monthlyPriceInclVat", e.target.value)}
          />
        </Field>

        <Field label="Setup incl. btw">
          <Input
            type="number"
            min="0"
            value={item.setupPriceInclVat}
            onChange={(e) => update("setupPriceInclVat", e.target.value)}
          />
        </Field>

        <Field label="Infra excl. btw">
          <Input
            type="number"
            min="0"
            value={item.monthlyInfraCostExclVat}
            onChange={(e) => update("monthlyInfraCostExclVat", e.target.value)}
          />
        </Field>

        <Field label="Btw tarief">
          <Input
            type="number"
            min="0"
            step="0.01"
            value={item.vatRate}
            onChange={(e) => update("vatRate", e.target.value)}
          />
        </Field>
      </div>

      {type === "package" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <Field label="Titel op kaart">
            <Input
              value={item.description || ""}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>

          <Field label="Subtekst / doelgroep">
            <Input
              value={item.fit || ""}
              onChange={(e) => update("fit", e.target.value)}
            />
          </Field>

          <Field label="Opzeg / voorwaarden">
            <Input
              value={item.cancelNote || ""}
              onChange={(e) => update("cancelNote", e.target.value)}
            />
          </Field>

          <Field label="CTA knoptekst">
            <Input
              value={item.cta || ""}
              onChange={(e) => update("cta", e.target.value)}
            />
          </Field>

          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Bullets op homepage (1 per regel)">
              <Textarea
                value={linesToValue(item.bullets)}
                onChange={(e) => update("bullets", valueToLines(e.target.value))}
                rows={6}
              />
            </Field>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Inbegrepen op pakketvergelijking (1 per regel)">
              <Textarea
                value={linesToValue(item.included)}
                onChange={(e) => update("included", valueToLines(e.target.value))}
                rows={6}
              />
            </Field>
          </div>

          <div>
            <Field label="Niet inbegrepen (1 per regel)">
              <Textarea
                value={linesToValue(item.notIncluded)}
                onChange={(e) => update("notIncluded", valueToLines(e.target.value))}
                rows={5}
              />
            </Field>
          </div>

          <div>
            <Field label="Uitbreidingen / addons tekst (1 per regel)">
              <Textarea
                value={linesToValue(item.addons)}
                onChange={(e) => update("addons", valueToLines(e.target.value))}
                rows={5}
              />
            </Field>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 14,
          }}
        >
          <Field label="Beschrijving">
            <Input
              value={item.description || ""}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>
        </div>
      )}

      <PricingMetricGrid item={item} />
    </div>
  );
}

export default function PricingPage({ store: storeProp }) {
  const outletContext = useOutletContext();
  const store = storeProp || /** @type {{ store: any }} */ (outletContext).store;

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
          <div style={{ display: "grid", gap: 16 }}>
            {store.packageDrafts
              .slice()
              .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
              .map((item) => (
                <PackageCard
                  key={item.code}
                  item={item}
                  onChange={store.updatePackageDraft}
                  type="package"
                />
              ))}
          </div>
        )}

        {!store.isPricingLoading && store.pricingTab === "extras" && (
          <div style={{ display: "grid", gap: 16 }}>
            {store.addonDrafts
              .slice()
              .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
              .map((item) => (
                <PackageCard
                  key={item.code}
                  item={item}
                  onChange={store.updateAddonDraft}
                  type="addon"
                />
              ))}
          </div>
        )}
      </Card>
    </div>
  );
}