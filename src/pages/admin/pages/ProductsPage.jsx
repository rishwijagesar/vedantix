import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Button,
  Card,
  Field,
  Input,
  SectionTitle,
  StatCard,
  Textarea,
} from "../components/AdminUI";
import { currency, dateLabel } from "../utils/adminStorage";
import {
  fetchCatalogProducts,
  saveCatalogProduct,
  syncCatalogProduct,
} from "../../../api/catalog.api";
import {
  notifyError,
  notifyInfo,
  notifySuccess,
} from "../utils/adminNotifications";

const EMPTY_PRODUCT = {
  code: "",
  name: "",
  description: "",
  monthlyPrice: "",
  setupPrice: "",
  stripeProductId: "",
  stripeMonthlyPriceId: "",
  stripeSetupPriceId: "",
  updatedAt: "",
};

function normalizeDraft(product) {
  return {
    ...EMPTY_PRODUCT,
    ...product,
    monthlyPrice:
      product?.monthlyPrice === 0 || product?.monthlyPrice
        ? String(product.monthlyPrice)
        : "",
    setupPrice:
      product?.setupPrice === 0 || product?.setupPrice
        ? String(product.setupPrice)
        : "",
  };
}

function buildEnvVars(product) {
  const code = String(product?.code || "").trim().toUpperCase();

  if (!code) return [];

  return [
    {
      key: `STRIPE_PRICE_${code}`,
      value: product?.stripeMonthlyPriceId || "",
    },
    {
      key: `STRIPE_PRICE_${code}_SETUP`,
      value: product?.stripeSetupPriceId || "",
    },
  ];
}

function productFromPricingPackage(item) {
  const code = String(item?.code || "").trim().toUpperCase();
  const label = String(item?.label || code).trim();

  return {
    code,
    name: label.startsWith("Vedantix") ? label : `Vedantix ${label}`,
    description: item?.description || "",
    monthlyPrice: Number(item?.monthlyPriceInclVat || 0),
    setupPrice: Number(item?.setupPriceInclVat || 0),
    stripeProductId: "",
    stripeMonthlyPriceId: "",
    stripeSetupPriceId: "",
    createdAt: item?.createdAt || "",
    updatedAt: item?.updatedAt || "",
  };
}

function buildProductsFromPricingPackages(packageOptions = []) {
  return packageOptions
    .map(productFromPricingPackage)
    .filter((product) => product.code);
}

function mergeProducts(catalogProducts = [], fallbackProducts = []) {
  const byCode = new Map();

  for (const product of fallbackProducts) {
    byCode.set(product.code, product);
  }

  for (const product of catalogProducts) {
    const code = String(product?.code || "").trim().toUpperCase();
    if (!code) continue;
    byCode.set(code, {
      ...byCode.get(code),
      ...product,
      code,
    });
  }

  return Array.from(byCode.values()).sort((a, b) =>
    String(a.code).localeCompare(String(b.code))
  );
}

function validateDraft(draft) {
  const code = String(draft.code || "").trim().toUpperCase();
  const name = String(draft.name || "").trim();
  const monthlyPrice = Number(draft.monthlyPrice);
  const setupPrice = Number(draft.setupPrice);

  if (!code) return "Code is verplicht.";
  if (!name) return "Naam is verplicht.";
  if (Number.isNaN(monthlyPrice) || monthlyPrice < 0) {
    return "Maandelijkse prijs moet 0 of hoger zijn.";
  }
  if (Number.isNaN(setupPrice) || setupPrice < 0) {
    return "Setup prijs moet 0 of hoger zijn.";
  }

  return "";
}

function draftToProductPayload(draft) {
  return {
    code: String(draft.code || "").trim().toUpperCase(),
    name: String(draft.name || "").trim(),
    description: String(draft.description || "").trim(),
    monthlyPrice: Number(draft.monthlyPrice),
    setupPrice: Number(draft.setupPrice),
  };
}

function ProductStatus({ product }) {
  const synced = Boolean(
    product?.stripeProductId &&
      product?.stripeMonthlyPriceId &&
      product?.stripeSetupPriceId
  );

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 900,
        background: synced ? "#ecfdf5" : "#fff7ed",
        color: synced ? "#059669" : "#c2410c",
        border: synced ? "1px solid #a7f3d0" : "1px solid #fed7aa",
      }}
    >
      {synced ? "Gesynchroniseerd" : "Nog niet gesynct"}
    </span>
  );
}

function ProductTable({ products, selectedCode, onSelect, onSync, isSyncing }) {
  return (
    <Card>
      <SectionTitle
        title="Productcatalogus"
        subtitle="Beheer Vedantix producten, Stripe prices en App Runner env vars."
      />

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            minWidth: 980,
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Product", "Maand", "Setup", "Stripe", "Updated", "Acties"].map(
                (header) => (
                  <th
                    key={header}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      color: "#64748b",
                      fontSize: 11,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #dbe4ef",
                    }}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.code}
                onClick={() => onSelect(product)}
                style={{
                  cursor: "pointer",
                  background:
                    selectedCode === product.code ? "#f8fbff" : "#ffffff",
                  borderBottom: "1px solid #edf2f7",
                }}
              >
                <td style={{ padding: "11px 12px" }}>
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    {product.name || product.code}
                  </div>
                  <div style={{ color: "#64748b", fontWeight: 800 }}>
                    {product.code}
                  </div>
                </td>
                <td style={{ padding: "11px 12px", fontWeight: 900 }}>
                  {currency(product.monthlyPrice || 0)}
                </td>
                <td style={{ padding: "11px 12px", fontWeight: 900 }}>
                  {currency(product.setupPrice || 0)}
                </td>
                <td style={{ padding: "11px 12px" }}>
                  <ProductStatus product={product} />
                </td>
                <td style={{ padding: "11px 12px", color: "#64748b" }}>
                  {dateLabel(product.updatedAt)}
                </td>
                <td style={{ padding: "11px 12px" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Button tone="soft" onClick={() => onSelect(product)}>
                      Bewerken
                    </Button>
                    <Button
                      tone="primary"
                      onClick={() => onSync(product)}
                      disabled={isSyncing === product.code}
                    >
                      {isSyncing === product.code ? "Sync..." : "Sync Stripe & AWS"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 ? (
          <div style={{ padding: 18, color: "#64748b", textAlign: "center" }}>
            Nog geen producten.
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export default function ProductsPage({ store: storeProp }) {
  const outletContext = /** @type {{ store: any }} */ (useOutletContext());
  const store = storeProp || outletContext.store;
  const [products, setProducts] = useState([]);
  const [draft, setDraft] = useState(EMPTY_PRODUCT);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState("");
  const [lastSync, setLastSync] = useState(null);

  const localPricingProducts = useMemo(() => {
    return buildProductsFromPricingPackages(store.packageOptions);
  }, [store.packageOptions]);

  const selectedProduct = useMemo(() => {
    return products.find((product) => product.code === draft.code) || draft;
  }, [products, draft]);

  const envVars = useMemo(() => {
    return lastSync?.product?.code === selectedProduct.code
      ? Object.entries(lastSync.environmentVariables || {}).map(([key, value]) => ({
          key,
          value,
        }))
      : buildEnvVars(selectedProduct);
  }, [lastSync, selectedProduct]);

  async function loadProducts() {
    setIsLoading(true);

    try {
      const data = await fetchCatalogProducts({ apiKey: store.settings.apiKey });
      const nextProducts = mergeProducts(
        Array.isArray(data) ? data : [],
        localPricingProducts
      );
      setProducts(nextProducts);

      if (!draft.code && nextProducts.length > 0) {
        setDraft(normalizeDraft(nextProducts[0]));
      }
    } catch (error) {
      console.error(error);
      if (localPricingProducts.length > 0) {
        setProducts(localPricingProducts);
        if (!draft.code) {
          setDraft(normalizeDraft(localPricingProducts[0]));
        }
        notifyInfo(
          "Backend productcatalogus kon niet laden; bestaande prijsproducten zijn getoond."
        );
      } else {
        notifyError("Producten laden is mislukt.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 || localPricingProducts.length === 0) {
      return;
    }

    setProducts(localPricingProducts);
    if (!draft.code) {
      setDraft(normalizeDraft(localPricingProducts[0]));
    }
  }, [draft.code, localPricingProducts, products.length]);

  function updateDraft(field, value) {
    setDraft((prev) => ({
      ...prev,
      [field]: field === "code" ? String(value || "").toUpperCase() : value,
    }));
  }

  function handleNewProduct() {
    setDraft(EMPTY_PRODUCT);
    setLastSync(null);
  }

  function selectProduct(product) {
    setDraft(normalizeDraft(product));
    setLastSync(null);
  }

  async function handleSave() {
    const validationMessage = validateDraft(draft);
    if (validationMessage) {
      notifyInfo(validationMessage);
      return null;
    }

    setIsSaving(true);

    try {
      const product = await saveCatalogProduct({
        apiKey: store.settings.apiKey,
        product: draftToProductPayload(draft),
      });

      setProducts((prev) => {
        const exists = prev.some((item) => item.code === product.code);
        const next = exists
          ? prev.map((item) => (item.code === product.code ? product : item))
          : [...prev, product];
        return next.sort((a, b) => String(a.code).localeCompare(String(b.code)));
      });
      setDraft(normalizeDraft(product));
      notifySuccess("Product opgeslagen.");
      return product;
    } catch (error) {
      console.error(error);
      notifyError(error instanceof Error ? error.message : "Product opslaan is mislukt.");
      return null;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSync(productInput = selectedProduct) {
    let product = productInput;

    if (productInput.code === draft.code) {
      const validationMessage = validateDraft(draft);
      if (validationMessage) {
        notifyInfo(validationMessage);
        return;
      }

      product = await handleSave();
      if (!product) {
        product = draftToProductPayload(draft);
        notifyInfo(
          "Product opslaan lukte niet; ik probeer direct te synchroniseren."
        );
      }
    }

    setIsSyncing(product.code);

    try {
      const result = await syncCatalogProduct({
        code: product.code,
        product,
        apiKey: store.settings.apiKey,
      });
      const syncedProduct = result?.product || null;

      if (syncedProduct) {
        setProducts((prev) =>
          prev.map((item) => (item.code === syncedProduct.code ? syncedProduct : item))
        );
        setDraft(normalizeDraft(syncedProduct));
      }

      setLastSync(result);
      const warnings = [
        ...(Array.isArray(result?.warnings) ? result.warnings : []),
        result?.appRunner?.warning
          ? `App Runner: ${result.appRunner.warning}`
          : "",
      ].filter(Boolean);

      if (warnings.length > 0) {
        notifyInfo(
          `Stripe Price IDs zijn aangemaakt. Let op: ${warnings[0]}`
        );
      } else {
        notifySuccess("Product gesynchroniseerd met Stripe en App Runner.");
      }
    } catch (error) {
      console.error(error);
      notifyError(
        error instanceof Error
          ? error.message
          : "Synchroniseren met Stripe en AWS is mislukt."
      );
    } finally {
      setIsSyncing("");
    }
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Card>
        <SectionTitle
          title="Products"
          subtitle="Centrale catalogus voor producten, Stripe Price IDs en App Runner configuratie."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button onClick={handleNewProduct}>Nieuw product</Button>
              <Button tone="soft" onClick={loadProducts} disabled={isLoading}>
                {isLoading ? "Laden..." : "Verversen"}
              </Button>
              <Button tone="primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Opslaan..." : "Opslaan"}
              </Button>
              <Button
                tone="success"
                onClick={() => handleSync()}
                disabled={isSaving || isSyncing === draft.code || !draft.code}
              >
                {isSyncing === draft.code ? "Sync..." : "Synchroniseer met Stripe & AWS"}
              </Button>
            </div>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          <StatCard title="Producten" value={String(products.length)} subtitle="Catalogus" />
          <StatCard
            title="Gesynct"
            value={String(
              products.filter(
                (product) =>
                  product.stripeProductId &&
                  product.stripeMonthlyPriceId &&
                  product.stripeSetupPriceId
              ).length
            )}
            subtitle="Met Stripe IDs"
            tone="#10b981"
          />
          <StatCard
            title="Monthly env"
            value={envVars[0]?.key || "—"}
            subtitle={envVars[0]?.value || "Geen Price ID"}
            tone="#0ea5e9"
          />
          <StatCard
            title="Setup env"
            value={envVars[1]?.key || "—"}
            subtitle={envVars[1]?.value || "Geen Price ID"}
            tone="#8b5cf6"
          />
        </div>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 14,
        }}
      >
        <Card>
          <SectionTitle
            title={draft.code ? `Product ${draft.code}` : "Nieuw product"}
            subtitle="Sla eerst op, synchroniseer daarna met Stripe en AWS."
          />

          <div style={{ display: "grid", gap: 12 }}>
            <Field label="Code">
              <Input
                value={draft.code}
                onChange={(e) => updateDraft("code", e.target.value)}
                placeholder="STARTER"
              />
            </Field>
            <Field label="Naam">
              <Input
                value={draft.name}
                onChange={(e) => updateDraft("name", e.target.value)}
                placeholder="Vedantix Starter"
              />
            </Field>
            <Field label="Beschrijving">
              <Textarea
                value={draft.description}
                onChange={(e) => updateDraft("description", e.target.value)}
                placeholder="Professionele website voor starters"
              />
            </Field>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 12,
              }}
            >
              <Field label="Maandelijkse prijs">
                <Input
                  type="number"
                  min="0"
                  value={draft.monthlyPrice}
                  onChange={(e) => updateDraft("monthlyPrice", e.target.value)}
                />
              </Field>
              <Field label="Setup prijs">
                <Input
                  type="number"
                  min="0"
                  value={draft.setupPrice}
                  onChange={(e) => updateDraft("setupPrice", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Stripe & App Runner"
            subtitle="IDs en environment variables die door sync worden gegenereerd."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <Field label="Stripe Product ID">
              <Input value={selectedProduct.stripeProductId || ""} readOnly />
            </Field>
            <Field label="Monthly Price ID">
              <Input value={selectedProduct.stripeMonthlyPriceId || ""} readOnly />
            </Field>
            <Field label="Setup Price ID">
              <Input value={selectedProduct.stripeSetupPriceId || ""} readOnly />
            </Field>
            <Field label="Laatst bijgewerkt">
              <Input value={dateLabel(selectedProduct.updatedAt)} readOnly />
            </Field>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {envVars.map((item) => (
              <div
                key={item.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(220px, 0.8fr) minmax(0, 1.2fr)",
                  gap: 10,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  alignItems: "center",
                }}
              >
                <code style={{ fontWeight: 900, color: "#0f172a" }}>{item.key}</code>
                <code style={{ color: item.value ? "#0f172a" : "#94a3b8" }}>
                  {item.value || "Wordt gevuld na sync"}
                </code>
              </div>
            ))}
          </div>

          {lastSync?.appRunner ? (
            <div
              style={{
                marginTop: 14,
                borderRadius: 10,
                border: "1px solid #dbeafe",
                background: "#eff6ff",
                padding: 12,
                color: "#1e3a8a",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              App Runner update:{" "}
              <strong>{lastSync.appRunner.updateOperationId || "gestart"}</strong>
              {lastSync.appRunner.deploymentOperationId ? (
                <>
                  {" "}
                  · redeploy:{" "}
                  <strong>{lastSync.appRunner.deploymentOperationId}</strong>
                </>
              ) : null}
              {lastSync.appRunner.warning ? (
                <div style={{ marginTop: 6 }}>{lastSync.appRunner.warning}</div>
              ) : null}
            </div>
          ) : null}
        </Card>
      </div>

      <ProductTable
        products={products}
        selectedCode={draft.code}
        onSelect={selectProduct}
        onSync={handleSync}
        isSyncing={isSyncing}
      />
    </div>
  );
}
