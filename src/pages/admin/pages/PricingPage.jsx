import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Card,
  SectionTitle,
  Button,
  Field,
  Input,
  StatCard,
  Textarea,
} from "../components/AdminUI";
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

function formatVatLabel(value) {
  const number = Number(value || 0);
  return `${Math.round(number * 100)}%`;
}

function TabButton({ active, children, ...props }) {
  return (
    <button
      {...props}
      type="button"
      style={{
        minHeight: 44,
        padding: "0 18px",
        borderRadius: 14,
        border: active ? "1px solid #0f172a" : "1px solid #dbe4ef",
        background: active ? "#0f172a" : "#ffffff",
        color: active ? "#ffffff" : "#334155",
        fontWeight: 800,
        fontSize: 14,
        cursor: "pointer",
        transition: "all .2s ease",
      }}
    >
      {children}
    </button>
  );
}

function FilterInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#94a3b8",
          fontSize: 14,
          pointerEvents: "none",
        }}
      >
        ⌕
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          minHeight: 44,
          borderRadius: 14,
          border: "1px solid #dbe4ef",
          background: "#f8fafc",
          padding: "0 14px 0 38px",
          color: "#0f172a",
          fontSize: 14,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function StatusPill({ active = false, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        background: active ? "#ecfdf5" : "#f8fafc",
        color: active ? "#059669" : "#64748b",
        border: active ? "1px solid #a7f3d0" : "1px solid #e2e8f0",
      }}
    >
      {children}
    </span>
  );
}

function SidebarItem({
  item,
  isSelected,
  type,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        width: "100%",
        textAlign: "left",
        border: isSelected ? "1px solid #3b82f6" : "1px solid #e2e8f0",
        background: isSelected ? "#f8fbff" : "#ffffff",
        borderRadius: 18,
        padding: 16,
        cursor: "pointer",
        display: "grid",
        gap: 10,
        boxShadow: isSelected ? "0 12px 30px rgba(59,130,246,0.10)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 900,
              color: "#0f172a",
              fontSize: 16,
              lineHeight: 1.2,
            }}
          >
            {item.label || item.code}
          </div>
          <div
            style={{
              color: "#64748b",
              fontSize: 13,
              marginTop: 4,
              fontWeight: 700,
            }}
          >
            {type === "package" ? item.code : `Extra · ${item.code}`}
          </div>
        </div>

        <StatusPill active={item.isActive !== false}>
          {item.isActive !== false ? "Actief" : "Inactief"}
        </StatusPill>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: type === "package" ? "1fr auto" : "1fr",
          gap: 10,
          alignItems: "end",
        }}
      >
        <div>
          <div
            style={{
              color: "#64748b",
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Prijs p/m
          </div>
          <div
            style={{
              color: "#0f172a",
              fontSize: 22,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {currency(item.monthlyPriceInclVat || 0)}
          </div>
        </div>

        {type === "package" ? (
          <div style={{ justifySelf: "end" }}>
            {item.featured ? (
              <StatusPill active>Meest gekozen</StatusPill>
            ) : (
              <StatusPill>Standaard</StatusPill>
            )}
          </div>
        ) : null}
      </div>
    </button>
  );
}

function MetricCard({ title, value, subtitle, tone = "#0f172a" }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        background: "#ffffff",
        padding: 16,
        display: "grid",
        gap: 8,
      }}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: 12,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: tone,
          fontSize: 30,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {subtitle ? (
        <div
          style={{
            color: "#94a3b8",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

function ToggleChip({ checked, label, onChange }) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        minHeight: 44,
        padding: "0 14px",
        borderRadius: 14,
        border: "1px solid #dbe4ef",
        background: "#ffffff",
        color: "#334155",
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

function EmptyState({ title, description }) {
  return (
    <div
      style={{
        border: "1px dashed #cbd5e1",
        borderRadius: 18,
        background: "#f8fafc",
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#0f172a",
          fontWeight: 900,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ color: "#64748b", lineHeight: 1.6 }}>{description}</div>
    </div>
  );
}

function PackageEditor({ item, onChange, type }) {
  const update = (key, value) => onChange(item.code, key, value);

  const pricingCards = useMemo(() => {
    if (type === "package") {
      return [
        {
          title: "Prijs p/m incl. btw",
          value: currency(item.monthlyPriceInclVat || 0),
          subtitle: "Direct zichtbaar in verkoop",
          tone: "#0f172a",
        },
        {
          title: "Setup incl. btw",
          value: currency(item.setupPriceInclVat || 0),
          subtitle: "Eenmalige opstart",
          tone: "#0f172a",
        },
        {
          title: "Infra excl. btw",
          value: currency(item.monthlyInfraCostExclVat || 0),
          subtitle: "Interne kostprijs",
          tone: "#f97316",
        },
        {
          title: "Btw tarief",
          value: formatVatLabel(item.vatRate || 0),
          subtitle: "Fiscale instelling",
          tone: "#2563eb",
        },
      ];
    }

    return [
      {
        title: "Prijs p/m incl. btw",
        value: currency(item.monthlyPriceInclVat || 0),
        subtitle: "Terugkerende omzet",
        tone: "#0f172a",
      },
      {
        title: "Setup incl. btw",
        value: currency(item.setupPriceInclVat || 0),
        subtitle: "Eenmalige omzet",
        tone: "#0f172a",
      },
      {
        title: "Infra excl. btw",
        value: currency(item.monthlyInfraCostExclVat || 0),
        subtitle: "Interne kostprijs",
        tone: "#f97316",
      },
      {
        title: "Btw tarief",
        value: formatVatLabel(item.vatRate || 0),
        subtitle: "Fiscale instelling",
        tone: "#2563eb",
      },
    ];
  }, [item, type]);

  return (
    <div
      style={{
        border: "1px solid #dbe4ef",
        borderRadius: 24,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          padding: 28,
          borderBottom: "1px solid #eef2f7",
          display: "grid",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#0f172a",
                  fontWeight: 900,
                  fontSize: 22,
                  lineHeight: 1.1,
                }}
              >
                {item.label || item.code}
              </h2>

              <StatusPill active={item.isActive !== false}>
                {item.isActive !== false ? "Actief" : "Inactief"}
              </StatusPill>
            </div>

            <p
              style={{
                margin: "8px 0 0",
                color: "#64748b",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 760,
              }}
            >
              {type === "package"
                ? item.fit || item.description || "Beheer hier alle verkoop- en presentatiegegevens van dit pakket."
                : item.description || "Beheer hier alle gegevens van deze extra optie."}
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {type === "package" ? (
              <ToggleChip
                checked={Boolean(item.featured)}
                label="Meest gekozen"
                onChange={(checked) => update("featured", checked)}
              />
            ) : null}

            <ToggleChip
              checked={item.isActive !== false}
              label="Actief"
              onChange={(checked) => update("isActive", checked)}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {pricingCards.map((card) => (
            <MetricCard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              tone={card.tone}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: 28, display: "grid", gap: 24 }}>
        <div style={{ display: "grid", gap: 14 }}>
          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 900,
            }}
          >
            Basis informatie
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 16,
            }}
          >
            <Field label="Naam">
              <Input
                value={item.label || ""}
                onChange={(e) => update("label", e.target.value)}
              />
            </Field>

            <Field label="Titel op kaart">
              <Input
                value={item.description || ""}
                onChange={(e) => update("description", e.target.value)}
              />
            </Field>

            <Field label="Volgorde">
              <Input
                type="number"
                min="0"
                value={item.sortOrder ?? 0}
                onChange={(e) => update("sortOrder", e.target.value)}
              />
            </Field>

            <Field label={type === "package" ? "CTA knoptekst" : "Korte omschrijving"}>
              <Input
                value={type === "package" ? item.cta || "" : item.description || ""}
                onChange={(e) =>
                  update(type === "package" ? "cta" : "description", e.target.value)
                }
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
          </div>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 900,
            }}
          >
            Prijsopbouw
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 16,
            }}
          >
            <Field label="Prijs p/m incl. btw">
              <Input
                type="number"
                min="0"
                value={item.monthlyPriceInclVat ?? 0}
                onChange={(e) => update("monthlyPriceInclVat", e.target.value)}
              />
            </Field>

            <Field label="Setup incl. btw">
              <Input
                type="number"
                min="0"
                value={item.setupPriceInclVat ?? 0}
                onChange={(e) => update("setupPriceInclVat", e.target.value)}
              />
            </Field>

            <Field label="Infra excl. btw">
              <Input
                type="number"
                min="0"
                value={item.monthlyInfraCostExclVat ?? 0}
                onChange={(e) => update("monthlyInfraCostExclVat", e.target.value)}
              />
            </Field>

            <Field label="Btw tarief">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={item.vatRate ?? 0}
                onChange={(e) => update("vatRate", e.target.value)}
              />
            </Field>
          </div>
        </div>

        {type === "package" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            <div>
              <Field label="Bullets op homepage (1 per regel)">
                <Textarea
                  value={linesToValue(item.bullets)}
                  onChange={(e) => update("bullets", valueToLines(e.target.value))}
                  rows={6}
                />
              </Field>
            </div>

            <div>
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
          <div>
            <Field label="Beschrijving">
              <Textarea
                value={item.description || ""}
                onChange={(e) => update("description", e.target.value)}
                rows={5}
              />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PricingPage({ store: storeProp }) {
  const outletContext = useOutletContext();
  const store = storeProp || /** @type {{ store: any }} */ (outletContext).store;

  const [packageQuery, setPackageQuery] = useState("");
  const [addonQuery, setAddonQuery] = useState("");
  const [selectedPackageCode, setSelectedPackageCode] = useState("");
  const [selectedAddonCode, setSelectedAddonCode] = useState("");

  const packageItems = useMemo(() => {
    const query = packageQuery.trim().toLowerCase();

    return store.packageDrafts
      .slice()
      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
      .filter((item) => {
        if (!query) return true;

        return [
          item.code,
          item.label,
          item.description,
          item.fit,
          item.cta,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      });
  }, [store.packageDrafts, packageQuery]);

  const addonItems = useMemo(() => {
    const query = addonQuery.trim().toLowerCase();

    return store.addonDrafts
      .slice()
      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
      .filter((item) => {
        if (!query) return true;

        return [item.code, item.label, item.description]
          .join(" ")
          .toLowerCase()
          .includes(query);
      });
  }, [store.addonDrafts, addonQuery]);

  const selectedPackage =
    packageItems.find((item) => item.code === selectedPackageCode) ||
    packageItems[0] ||
    null;

  const selectedAddon =
    addonItems.find((item) => item.code === selectedAddonCode) ||
    addonItems[0] ||
    null;

  const selectedItem = store.pricingTab === "packages" ? selectedPackage : selectedAddon;
  const selectedType = store.pricingTab === "packages" ? "package" : "addon";

  React.useEffect(() => {
    if (store.pricingTab === "packages" && selectedPackage && selectedPackage.code !== selectedPackageCode) {
      setSelectedPackageCode(selectedPackage.code);
    }
  }, [store.pricingTab, selectedPackage, selectedPackageCode]);

  React.useEffect(() => {
    if (store.pricingTab === "extras" && selectedAddon && selectedAddon.code !== selectedAddonCode) {
      setSelectedAddonCode(selectedAddon.code);
    }
  }, [store.pricingTab, selectedAddon, selectedAddonCode]);

  const totalPackageCount = store.packageDrafts.length;
  const totalAddonCount = store.addonDrafts.length;

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Card>
        <SectionTitle
          title="Prijzen beheren"
          subtitle="Beheer al je pakketten en extra's op één centrale plek."
          action={
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <TabButton
                active={store.pricingTab === "packages"}
                onClick={() => store.setPricingTab("packages")}
              >
                Pakketten
              </TabButton>

              <TabButton
                active={store.pricingTab === "extras"}
                onClick={() => store.setPricingTab("extras")}
              >
                Extra's
              </TabButton>

              <div
                style={{
                  width: 1,
                  alignSelf: "stretch",
                  background: "#e2e8f0",
                  margin: "0 4px",
                }}
              />

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
                Annuleren
              </Button>

              <Button
                tone="success"
                onClick={store.savePricingChanges}
                disabled={store.isPricingSaving || store.isPricingLoading}
              >
                {store.isPricingSaving ? "Opslaan..." : "Opslaan"}
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
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "340px minmax(0, 1fr)",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div
              style={{
                border: "1px solid #dbe4ef",
                borderRadius: 24,
                background: "#ffffff",
                padding: 20,
                display: "grid",
                gap: 16,
                minHeight: 760,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    color: "#0f172a",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  {store.pricingTab === "packages" ? "Pakketten" : "Extra's"}
                </div>

                <span
                  style={{
                    minWidth: 24,
                    height: 24,
                    padding: "0 8px",
                    borderRadius: 999,
                    background: "#f1f5f9",
                    color: "#64748b",
                    fontSize: 12,
                    fontWeight: 900,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {store.pricingTab === "packages" ? totalPackageCount : totalAddonCount}
                </span>
              </div>

              <FilterInput
                value={store.pricingTab === "packages" ? packageQuery : addonQuery}
                onChange={(e) =>
                  store.pricingTab === "packages"
                    ? setPackageQuery(e.target.value)
                    : setAddonQuery(e.target.value)
                }
                placeholder={
                  store.pricingTab === "packages"
                    ? "Zoek pakket..."
                    : "Zoek extra..."
                }
              />

              <div style={{ display: "grid", gap: 12 }}>
                {store.pricingTab === "packages" ? (
                  packageItems.length > 0 ? (
                    packageItems.map((item) => (
                      <SidebarItem
                        key={item.code}
                        item={item}
                        type="package"
                        isSelected={selectedPackage?.code === item.code}
                        onSelect={() => setSelectedPackageCode(item.code)}
                      />
                    ))
                  ) : (
                    <EmptyState
                      title="Geen pakketten gevonden"
                      description="Pas je zoekterm aan of herstel de standaarddata."
                    />
                  )
                ) : addonItems.length > 0 ? (
                  addonItems.map((item) => (
                    <SidebarItem
                      key={item.code}
                      item={item}
                      type="addon"
                      isSelected={selectedAddon?.code === item.code}
                      onSelect={() => setSelectedAddonCode(item.code)}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="Geen extra's gevonden"
                    description="Pas je zoekterm aan of herstel de standaarddata."
                  />
                )}
              </div>
            </div>

            <div>
              {selectedItem ? (
                <PackageEditor
                  item={selectedItem}
                  onChange={
                    selectedType === "package"
                      ? store.updatePackageDraft
                      : store.updateAddonDraft
                  }
                  type={selectedType}
                />
              ) : (
                <EmptyState
                  title="Niets geselecteerd"
                  description="Selecteer links een pakket of extra om de details te beheren."
                />
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}