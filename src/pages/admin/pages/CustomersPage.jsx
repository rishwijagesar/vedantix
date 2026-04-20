import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  SectionTitle,
  Button,
  StatCard,
  Input,
  Field,
  Select,
  Textarea,
} from "../components/AdminUI";
import {
  STATUS_COLORS,
  STATUS_LABELS,
  TIME_FILTERS,
  currency,
  dateLabel,
  pretty,
} from "../utils/adminStorage";
import { useOutletContext } from "react-router-dom";

function canMarkPreviewReady(customer) {
  return Boolean(customer?.base44?.appId);
}

function canApproveCustomer(customer) {
  return (
    Boolean(customer?.base44?.appId) &&
    Boolean(customer?.base44?.previewUrl) &&
    customer?.websiteBuildStatus === "PREVIEW_READY"
  );
}

function canDeployCustomer(customer) {
  return (
    Boolean(customer?.base44?.appId) &&
    Boolean(customer?.base44?.previewUrl) &&
    customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" &&
    customer?.contentSync?.status === "SYNCED"
  );
}

function canManageDeployment(customer) {
  return Boolean(customer?.deployment?.deploymentId);
}

function workflowTone(state) {
  if (state === "LIVE") return "#10b981";
  if (state === "DEPLOYING") return "#f59e0b";
  if (state === "APPROVED") return "#22c55e";
  if (state === "PREVIEW_READY") return "#2563eb";
  if (state === "CONTENT_SYNCED") return "#8b5cf6";
  if (state === "BUILDING") return "#0ea5e9";
  if (state === "FAILED") return "#ef4444";
  return "#94a3b8";
}

function deploymentTone(status) {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "SUCCEEDED") return "#10b981";
  if (normalized === "FAILED") return "#ef4444";
  if (
    normalized === "PENDING" ||
    normalized === "IN_PROGRESS" ||
    normalized === "RUNNING" ||
    normalized === "ROLLBACK_STARTED"
  ) {
    return "#f59e0b";
  }

  return "#94a3b8";
}

function formatStageLabel(stage) {
  if (!stage) return "—";
  return String(stage)
    .replace(/_/g, " ")
    .trim();
}

function buildChecklist(customer) {
  return [
    {
      key: "base44",
      label: "Base44 gekoppeld",
      done: Boolean(customer?.base44?.appId),
    },
    {
      key: "content",
      label: "GitHub sync klaar",
      done: customer?.contentSync?.status === "SYNCED",
    },
    {
      key: "preview",
      label: "Preview klaar",
      done:
        customer?.websiteBuildStatus === "PREVIEW_READY" ||
        customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" ||
        customer?.status === "active",
    },
    {
      key: "approval",
      label: "Klant akkoord",
      done:
        customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" ||
        customer?.status === "active",
    },
    {
      key: "live",
      label: "Live",
      done: customer?.status === "active",
    },
  ];
}

export default function CustomersPage({ store: storeProp }) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();
  const store = storeProp || outletContext.store;
  const checklist = buildChecklist(store.selectedCustomer);

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Card>
        <SectionTitle
          title="Klanten"
          subtitle="Overzicht van alle klanten met snelle acties."
          action={
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div style={{ minWidth: 360, position: "relative" }}>
                <Input
                  value={store.customerSearch}
                  onChange={(e) => store.setCustomerSearch(e.target.value)}
                  placeholder="Zoek op bedrijf, contact, domein..."
                  style={{
                    paddingLeft: 44,
                    borderRadius: 18,
                    minHeight: 54,
                    boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                    fontSize: 16,
                  }}
                >
                  ⌕
                </span>
              </div>

              <Button
                tone="primary"
                onClick={() => store.setIsCreateCustomerOpen(true)}
                style={{
                  minHeight: 54,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 18,
                }}
              >
                + Klant aanmaken
              </Button>

              <Button
                onClick={() => store.createCustomerAndStartBuild()}
                disabled={store.isProvisioning || store.isStartingBuildFlow}
                style={{
                  minHeight: 54,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 18,
                }}
              >
                {store.isProvisioning || store.isStartingBuildFlow
                  ? "Bezig..."
                  : "Klant aanmaken + start build"}
              </Button>

              <Button
                tone="soft"
                onClick={() => store.runAutoRefreshCycle()}
                disabled={store.isAutoRefreshing}
                style={{
                  minHeight: 54,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 18,
                }}
              >
                {store.isAutoRefreshing ? "Verversen..." : "Nu verversen"}
              </Button>
            </div>
          }
        />

        <div
          style={{
            overflowX: "auto",
            border: "1px solid #dbe4ef",
            borderRadius: 22,
            background: "#ffffff",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 1440,
              background: "#ffffff",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "linear-gradient(180deg, #f8fbff 0%, #f1f5f9 100%)",
                }}
              >
                {[
                  "Bedrijf",
                  "Contact",
                  "Domeinnaam",
                  "Pakket",
                  "Bouwfase",
                  "Workflow",
                  "Deployment stage",
                  "Preview",
                  "Omzet p/m",
                  "Acties",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      textAlign: "left",
                      padding: "16px 18px",
                      color: "#475569",
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #dbe4ef",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {store.filteredCustomers.map((customer) => {
                const workflowState = (() => {
                  if (customer?.status === "active") return "LIVE";
                  if (customer?.status === "failed") return "FAILED";
                  if (customer?.status === "provisioning") return "DEPLOYING";
                  if (customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION") return "APPROVED";
                  if (customer?.websiteBuildStatus === "PREVIEW_READY") return "PREVIEW_READY";
                  if (customer?.contentSync?.status === "SYNCED") return "CONTENT_SYNCED";
                  if (customer?.base44?.appId) return "BUILDING";
                  return "NOT_STARTED";
                })();

                return (
                  <tr
                    key={customer.id}
                    style={{
                      borderBottom: "1px solid #edf2f7",
                      cursor: "pointer",
                    }}
                    onClick={() => store.setSelectedCustomerId(customer.id)}
                  >
                    <td style={{ padding: "18px" }}>
                      <div style={{ fontWeight: 900 }}>{customer.companyName}</div>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{customer.id}</div>
                    </td>
                    <td style={{ padding: "18px" }}>
                      <div>{customer.contactName}</div>
                      <div style={{ color: "#64748b", fontSize: 13 }}>
                        {customer.email}
                      </div>
                    </td>
                    <td style={{ padding: "18px", fontWeight: 700 }}>
                      {customer.domain}
                    </td>
                    <td style={{ padding: "18px" }}>
                      {store.packageOptions.find((item) => item.code === customer.packageCode)?.label || customer.packageCode}
                    </td>
                    <td style={{ padding: "18px" }}>
                      <span
                        style={{
                          padding: "7px 12px",
                          borderRadius: 999,
                          background: `${STATUS_COLORS[customer.status] || "#94a3b8"}18`,
                          color: STATUS_COLORS[customer.status] || "#94a3b8",
                          fontWeight: 900,
                          fontSize: 12,
                          border: `1px solid ${STATUS_COLORS[customer.status] || "#94a3b8"}25`,
                        }}
                      >
                        {STATUS_LABELS[customer.status] || customer.status}
                      </span>
                    </td>
                    <td style={{ padding: "18px" }}>
                      <span
                        style={{
                          padding: "7px 12px",
                          borderRadius: 999,
                          background: `${workflowTone(workflowState)}18`,
                          color: workflowTone(workflowState),
                          fontWeight: 900,
                          fontSize: 12,
                          border: `1px solid ${workflowTone(workflowState)}25`,
                        }}
                      >
                        {workflowState}
                      </span>
                    </td>
                    <td style={{ padding: "18px" }}>
                      <span
                        style={{
                          padding: "7px 12px",
                          borderRadius: 999,
                          background: `${deploymentTone(customer?.deployment?.status)}18`,
                          color: deploymentTone(customer?.deployment?.status),
                          fontWeight: 900,
                          fontSize: 12,
                          border: `1px solid ${deploymentTone(customer?.deployment?.status)}25`,
                          display: "inline-block",
                        }}
                      >
                        {formatStageLabel(customer?.deployment?.currentStage)}
                      </span>
                    </td>
                    <td style={{ padding: "18px" }}>
                      {customer.preview?.fullUrl ? (
                        <a
                          href={customer.preview.fullUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: "#1d4ed8",
                            fontWeight: 800,
                            textDecoration: "none",
                          }}
                        >
                          {customer.preview.path || "Open preview"}
                        </a>
                      ) : (
                        <span style={{ color: "#94a3b8" }}>Nog niet klaar</span>
                      )}
                    </td>
                    <td style={{ padding: "18px", fontWeight: 900 }}>
                      {currency(store.calcMonthlyRevenue(customer))}
                    </td>
                    <td
                      style={{ padding: "18px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <Button
                          tone="soft"
                          onClick={() => store.setSelectedCustomerId(customer.id)}
                        >
                          Beheren
                        </Button>
                        {customer.base44?.editorUrl ? (
                          <Button onClick={() => store.openBase44Editor(customer)}>
                            Open Base44
                          </Button>
                        ) : null}
                        {canManageDeployment(customer) ? (
                          <Button
                            tone="soft"
                            onClick={() => store.redeployCustomer(customer)}
                            disabled={store.isUpdatingWorkflow}
                          >
                            Redeploy
                          </Button>
                        ) : null}
                        <Button
                          tone="danger"
                          onClick={() => store.requestDeleteCustomer(customer)}
                        >
                          Verwijderen
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {store.filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    style={{
                      padding: "34px 16px",
                      color: "#64748b",
                      textAlign: "center",
                      fontSize: 15,
                    }}
                  >
                    Geen klanten gevonden.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      {store.selectedCustomer ? (
        <Card>
          <SectionTitle
            title={`Klantdetail — ${store.selectedCustomer.companyName}`}
            subtitle="Alle klantgegevens, Base44-koppeling, preview en financieel overzicht per periode."
            action={
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <span
                  style={{
                    padding: "7px 12px",
                    borderRadius: 999,
                    background: `${workflowTone(store.selectedCustomerWorkflowState)}18`,
                    color: workflowTone(store.selectedCustomerWorkflowState),
                    fontWeight: 900,
                    fontSize: 12,
                    border: `1px solid ${workflowTone(store.selectedCustomerWorkflowState)}25`,
                  }}
                >
                  {store.selectedCustomerWorkflowState}
                </span>

                <span
                  style={{
                    padding: "7px 12px",
                    borderRadius: 999,
                    background: `${deploymentTone(store.selectedCustomer?.deployment?.status)}18`,
                    color: deploymentTone(store.selectedCustomer?.deployment?.status),
                    fontWeight: 900,
                    fontSize: 12,
                    border: `1px solid ${deploymentTone(store.selectedCustomer?.deployment?.status)}25`,
                  }}
                >
                  {store.selectedCustomer?.deployment?.status || "NO_DEPLOYMENT"}
                </span>

                <span
                  style={{
                    padding: "7px 12px",
                    borderRadius: 999,
                    background: "#0f172a10",
                    color: "#0f172a",
                    fontWeight: 900,
                    fontSize: 12,
                    border: "1px solid #0f172a15",
                  }}
                >
                  {formatStageLabel(store.selectedCustomer?.deployment?.currentStage)}
                </span>

                {store.isAutoRefreshing ? (
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: 999,
                      background: "#0f172a10",
                      color: "#0f172a",
                      fontWeight: 900,
                      fontSize: 12,
                      border: "1px solid #0f172a15",
                    }}
                  >
                    Auto-refresh actief
                  </span>
                ) : null}

                {store.selectedCustomer.base44?.editorUrl ? (
                  <Button tone="soft" onClick={() => store.openBase44Editor(store.selectedCustomer)}>
                    Open in Base44
                  </Button>
                ) : null}

                {store.selectedCustomer.preview?.fullUrl ? (
                  <Button onClick={() => window.open(store.selectedCustomer.preview.fullUrl, "_blank", "noopener,noreferrer")}>
                    Open preview
                  </Button>
                ) : null}
              </div>
            }
          />

          <Card style={{ marginBottom: 18 }}>
            <SectionTitle
              title="Workflow checklist"
              subtitle="Dit laat direct zien waar de klant zich in het proces bevindt."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {checklist.map((item) => (
                <div
                  key={item.key}
                  style={{
                    border: `1px solid ${item.done ? "#10b98125" : "#cbd5e1"}`,
                    borderRadius: 18,
                    padding: 14,
                    background: item.done ? "#10b98110" : "#f8fafc",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: item.done ? "#10b981" : "#64748b",
                      marginBottom: 6,
                    }}
                  >
                    {item.done ? "DONE" : "OPEN"}
                  </div>
                  <div style={{ fontWeight: 800 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ marginBottom: 18 }}>
            <SectionTitle
              title="Deployment status"
              subtitle="Actuele status van provisioning, stage en recovery-acties."
              action={
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Button
                    tone="soft"
                    onClick={() => store.runAutoRefreshCycle()}
                    disabled={store.isAutoRefreshing}
                  >
                    {store.isAutoRefreshing ? "Verversen..." : "Status verversen"}
                  </Button>

                  {canManageDeployment(store.selectedCustomer) ? (
                    <Button
                      tone="soft"
                      onClick={() => store.redeployCustomer(store.selectedCustomer)}
                      disabled={store.isUpdatingWorkflow}
                    >
                      {store.isUpdatingWorkflow ? "Bezig..." : "Redeploy"}
                    </Button>
                  ) : null}

                  {canManageDeployment(store.selectedCustomer) ? (
                    <Button
                      tone="danger"
                      onClick={() => store.rollbackCustomer(store.selectedCustomer)}
                      disabled={store.isUpdatingWorkflow}
                    >
                      {store.isUpdatingWorkflow ? "Bezig..." : "Rollback"}
                    </Button>
                  ) : null}
                </div>
              }
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 16,
              }}
            >
              <StatCard
                title="Deployment status"
                value={store.selectedCustomer?.deployment?.status || "—"}
                subtitle="Laatste backend status"
                tone={deploymentTone(store.selectedCustomer?.deployment?.status)}
              />
              <StatCard
                title="Current stage"
                value={formatStageLabel(store.selectedCustomer?.deployment?.currentStage)}
                subtitle="Huidige deployment stage"
                tone="#0ea5e9"
              />
              <StatCard
                title="Deployment ID"
                value={store.selectedCustomer?.deployment?.deploymentId || "—"}
                subtitle="Actieve deployment"
                tone="#8b5cf6"
              />
              <StatCard
                title="Live domein"
                value={store.selectedCustomer?.deployment?.liveDomain || store.selectedCustomer?.domain || "—"}
                subtitle="Doeldomein"
                tone="#10b981"
              />
            </div>
          </Card>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 16,
              marginBottom: 20,
            }}
          >
            <StatCard
              title="Maandprijs"
              value={currency(store.calcMonthlyRevenue(store.selectedCustomer))}
              subtitle="Pakket + extra's"
              tone="#0ea5e9"
            />
            <StatCard
              title="Setup"
              value={currency(store.calcSetupRevenue(store.selectedCustomer))}
              subtitle="Eenmalige opbrengst"
              tone="#8b5cf6"
            />
            <StatCard
              title="Kosten"
              value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.cost : 0)}
              subtitle="Per gekozen periode"
              tone="#f97316"
            />
            <StatCard
              title="Winst"
              value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.profit : 0)}
              subtitle="Geschat resultaat"
              tone="#10b981"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
              marginBottom: 18,
            }}
          >
            <Card
              style={{
                background:
                  "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(255,255,255,0.9) 100%)",
              }}
            >
              <SectionTitle title="Algemene gegevens" subtitle="Wijzigbare klantinformatie." />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 14,
                }}
              >
                <Field label="Bedrijfsnaam">
                  <Input
                    value={store.selectedCustomer.companyName}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        companyName: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Contactpersoon">
                  <Input
                    value={store.selectedCustomer.contactName}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        contactName: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="E-mail">
                  <Input
                    value={store.selectedCustomer.email}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        email: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Telefoon">
                  <Input
                    value={store.selectedCustomer.phone}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        phone: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Domeinnaam">
                  <Input
                    value={store.selectedCustomer.domain}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        domain: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Pakket">
                  <Select
                    value={store.selectedCustomer.packageCode}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        packageCode: e.target.value,
                      })
                    }
                  >
                    {store.packageOptions
                      .filter((item) => item.isActive !== false)
                      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
                      .map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.label}
                        </option>
                      ))}
                  </Select>
                </Field>

                <Field label="Adres">
                  <Input
                    value={store.selectedCustomer.address || ""}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        address: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Postcode">
                  <Input
                    value={store.selectedCustomer.postalCode || ""}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Plaats">
                  <Input
                    value={store.selectedCustomer.city || ""}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        city: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Land">
                  <Input
                    value={store.selectedCustomer.country || ""}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...store.selectedCustomer,
                        country: e.target.value,
                      })
                    }
                  />
                </Field>

                <Field label="Website build status">
                  <Input value={store.selectedCustomer.websiteBuildStatus || ""} readOnly />
                </Field>

                <Field label="Base44 status">
                  <Input value={store.selectedCustomer.base44?.status || ""} readOnly />
                </Field>

                <Field label="Preview pad">
                  <Input value={store.selectedCustomer.preview?.path || ""} readOnly />
                </Field>

                <Field label="Preview status">
                  <Input value={store.selectedCustomer.preview?.status || ""} readOnly />
                </Field>

                <Field label="Content sync">
                  <Input value={store.selectedCustomer.contentSync?.status || ""} readOnly />
                </Field>

                <Field label="GitHub repo">
                  <Input value={store.selectedCustomer.contentSync?.repositoryName || ""} readOnly />
                </Field>

                <Field label="Deployment status">
                  <Input value={store.selectedCustomer.deployment?.status || ""} readOnly />
                </Field>

                <Field label="Deployment ID">
                  <Input value={store.selectedCustomer.deployment?.deploymentId || ""} readOnly />
                </Field>

                <Field label="Huidige stage">
                  <Input value={formatStageLabel(store.selectedCustomer.deployment?.currentStage)} readOnly />
                </Field>

                <Field label="Live domein">
                  <Input value={store.selectedCustomer.deployment?.liveDomain || ""} readOnly />
                </Field>

                <Field label="Aangemaakt op">
                  <Input value={dateLabel(store.selectedCustomer.createdAt)} readOnly />
                </Field>

                <Field label="Setup prijs">
                  <Input value={currency(store.calcSetupRevenue(store.selectedCustomer))} readOnly />
                </Field>

                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Notities">
                    <Textarea
                      value={store.selectedCustomer.notes || ""}
                      onChange={(e) =>
                        store.saveCustomerEdits({
                          ...store.selectedCustomer,
                          notes: e.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
            </Card>

            <Card
              style={{
                background:
                  "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(255,255,255,0.9) 100%)",
              }}
            >
              <SectionTitle
                title="Base44 + GitHub sync workflow"
                subtitle="One-click buildflow voor klantwebsite."
                action={
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Button
                      tone="primary"
                      onClick={() => store.startBuildFlow(store.selectedCustomer)}
                      disabled={store.isStartingBuildFlow}
                    >
                      {store.isStartingBuildFlow ? "Bezig..." : "Start buildflow"}
                    </Button>
                    {store.selectedCustomer.base44?.editorUrl ? (
                      <Button tone="soft" onClick={() => store.openBase44Editor(store.selectedCustomer)}>
                        Open editor
                      </Button>
                    ) : null}
                    {store.selectedCustomer.preview?.fullUrl ? (
                      <Button onClick={() => window.open(store.selectedCustomer.preview.fullUrl, "_blank", "noopener,noreferrer")}>
                        Open preview
                      </Button>
                    ) : null}
                  </div>
                }
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 14,
                }}
              >
                <Field label="Base44 app ID">
                  <Input
                    value={store.base44LinkForm.appId}
                    onChange={(e) => store.updateBase44LinkForm("appId", e.target.value)}
                    placeholder="69b9b443c57eefc3d3bfafbf"
                  />
                </Field>

                <Field label="App naam">
                  <Input
                    value={store.base44LinkForm.appName}
                    onChange={(e) => store.updateBase44LinkForm("appName", e.target.value)}
                    placeholder="De Gouden Kapper"
                  />
                </Field>

                <Field label="Editor URL">
                  <Input
                    value={store.base44LinkForm.editorUrl}
                    onChange={(e) => store.updateBase44LinkForm("editorUrl", e.target.value)}
                    placeholder="https://app.base44.com/apps/..."
                  />
                </Field>

                <Field label="Preview URL">
                  <Input
                    value={store.base44LinkForm.previewUrl}
                    onChange={(e) => store.updateBase44LinkForm("previewUrl", e.target.value)}
                    placeholder="https://preview.vedantix.nl/degoudenkapper"
                  />
                </Field>

                <Field label="Niche">
                  <Input
                    value={store.base44LinkForm.niche}
                    onChange={(e) => store.updateBase44LinkForm("niche", e.target.value)}
                    placeholder="Kapper"
                  />
                </Field>

                <Field label="Template key">
                  <Input
                    value={store.base44LinkForm.templateKey}
                    onChange={(e) => store.updateBase44LinkForm("templateKey", e.target.value)}
                    placeholder="barbershop-v1"
                  />
                </Field>

                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Base44 prompt">
                    <Textarea
                      value={store.base44LinkForm.requestedPrompt}
                      onChange={(e) => store.updateBase44LinkForm("requestedPrompt", e.target.value)}
                      placeholder="Prompt voor deze klantwebsite..."
                    />
                  </Field>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Project ID voor GitHub sync">
                    <Input
                      value={store.contentSyncForm.projectId}
                      onChange={(e) => store.updateContentSyncForm("projectId", e.target.value)}
                      placeholder="base44 app id of project id"
                    />
                  </Field>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="index.html export">
                    <Textarea
                      value={store.contentSyncForm.indexHtml}
                      onChange={(e) => store.updateContentSyncForm("indexHtml", e.target.value)}
                      placeholder="<html>...</html>"
                      rows={10}
                    />
                  </Field>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Extra files JSON">
                    <Textarea
                      value={store.contentSyncForm.additionalFilesJson}
                      onChange={(e) => store.updateContentSyncForm("additionalFilesJson", e.target.value)}
                      placeholder='[{"path":"assets/app.js","content":"console.log(\"hi\")","encoding":"utf-8"}]'
                      rows={6}
                    />
                  </Field>
                </div>

                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Button
                      tone="primary"
                      onClick={() => store.startBuildFlow(store.selectedCustomer)}
                      disabled={store.isStartingBuildFlow}
                    >
                      {store.isStartingBuildFlow ? "Bezig..." : "Start buildflow"}
                    </Button>

                    <Button
                      tone="soft"
                      onClick={() => store.autoCreateBase44App(store.selectedCustomer)}
                      disabled={store.isAutoCreatingBase44}
                    >
                      {store.isAutoCreatingBase44 ? "Bezig..." : "Auto-create Base44 app"}
                    </Button>

                    <Button
                      tone="soft"
                      onClick={() => store.syncCustomerContent(store.selectedCustomer)}
                      disabled={store.isSyncingContent || !store.contentSyncForm.indexHtml.trim()}
                    >
                      {store.isSyncingContent ? "Bezig..." : "Sync naar GitHub"}
                    </Button>

                    <Button
                      onClick={() => store.markPreviewReady(store.selectedCustomer)}
                      disabled={
                        store.isUpdatingWorkflow ||
                        !canMarkPreviewReady(store.selectedCustomer)
                      }
                    >
                      {store.isUpdatingWorkflow ? "Bezig..." : "Preview klaarzetten"}
                    </Button>

                    <Button
                      onClick={() => store.approveCustomerForProduction(store.selectedCustomer)}
                      disabled={
                        store.isUpdatingWorkflow ||
                        !canApproveCustomer(store.selectedCustomer)
                      }
                    >
                      {store.isUpdatingWorkflow ? "Bezig..." : "Klant akkoord"}
                    </Button>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Button
                      tone="soft"
                      onClick={() => store.runAutoRefreshCycle()}
                      disabled={store.isAutoRefreshing}
                    >
                      {store.isAutoRefreshing ? "Verversen..." : "Status verversen"}
                    </Button>

                    {canManageDeployment(store.selectedCustomer) ? (
                      <Button
                        tone="soft"
                        onClick={() => store.redeployCustomer(store.selectedCustomer)}
                        disabled={store.isUpdatingWorkflow}
                      >
                        {store.isUpdatingWorkflow ? "Bezig..." : "Redeploy"}
                      </Button>
                    ) : null}

                    {canManageDeployment(store.selectedCustomer) ? (
                      <Button
                        tone="danger"
                        onClick={() => store.rollbackCustomer(store.selectedCustomer)}
                        disabled={store.isUpdatingWorkflow}
                      >
                        {store.isUpdatingWorkflow ? "Bezig..." : "Rollback"}
                      </Button>
                    ) : null}

                    <Button
                      tone="success"
                      onClick={() => store.deployCustomer(store.selectedCustomer)}
                      disabled={
                        store.isUpdatingWorkflow ||
                        !canDeployCustomer(store.selectedCustomer)
                      }
                    >
                      {store.isUpdatingWorkflow ? "Bezig..." : "Site live zetten"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card style={{ marginBottom: 18 }}>
            <SectionTitle
              title="Financieel overzicht per klant"
              subtitle="Wat deze klant kost en oplevert per geselecteerde periode."
              action={
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {TIME_FILTERS.map((item) => (
                    <Button
                      key={item.key}
                      tone={store.detailFilter === item.key ? "primary" : "default"}
                      onClick={() => store.setDetailFilter(item.key)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              }
            />

            <div style={{ width: "100%", height: 320, marginBottom: 18 }}>
              <ResponsiveContainer>
                <AreaChart data={store.selectedCustomerTrendData}>
                  <defs>
                    <linearGradient id="custRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.04} />
                    </linearGradient>
                    <linearGradient id="custProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="omzet"
                    stroke="#0ea5e9"
                    fill="url(#custRevenue)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="winst"
                    stroke="#10b981"
                    fill="url(#custProfit)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 16,
              }}
            >
              <StatCard
                title="Opbrengst"
                value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.revenue : 0)}
                subtitle="Pakket + extra's"
                tone="#0ea5e9"
              />
              <StatCard
                title="Infra"
                value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.infraCost : 0)}
                subtitle="Automatisch vanuit pakket + extra's"
                tone="#8b5cf6"
              />
              <StatCard
                title="Extra kosten"
                value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.directExpenses : 0)}
                subtitle="Handmatig gekoppelde uitgaven"
                tone="#f97316"
              />
              <StatCard
                title="Resultaat"
                value={currency(store.selectedCustomerStats ? store.selectedCustomerStats.profit : 0)}
                subtitle="Omzet minus kosten"
                tone="#10b981"
              />
            </div>
          </Card>

          <Card
            style={{
              background:
                "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(255,255,255,0.9) 100%)",
            }}
          >
            <SectionTitle
              title="Backend acties"
              subtitle="Laatste calls voor deze klant."
            />
            <div style={{ display: "grid", gap: 10 }}>
              {store.requestLog
                .filter((entry) => {
                  const payload = entry?.result?.data;
                  const serialized = JSON.stringify(payload || {});
                  return (
                    serialized.includes(store.selectedCustomer.id) ||
                    serialized.includes(store.selectedCustomer.domain) ||
                    serialized.includes(store.selectedCustomer.base44?.appId || "___no_app___") ||
                    serialized.includes(store.selectedCustomer.deployment?.deploymentId || "___no_deployment___")
                  );
                })
                .map((entry) => (
                  <div
                    key={entry.id}
                    style={{
                      borderRadius: 16,
                      border: "1px solid #e2e8f0",
                      background: "#ffffff",
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <strong>{entry.type}</strong>
                      <span
                        style={{
                          color: entry.result && entry.result.ok ? "#10b981" : "#ef4444",
                          fontWeight: 900,
                        }}
                      >
                        {(entry.result && entry.result.status) || "ERR"}
                      </span>
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "#334155",
                        fontSize: 12,
                      }}
                    >
                      {pretty(entry.result && entry.result.data)}
                    </pre>
                  </div>
                ))}

              {store.requestLog.filter((entry) => {
                const payload = entry?.result?.data;
                const serialized = JSON.stringify(payload || {});
                return (
                  serialized.includes(store.selectedCustomer.id) ||
                  serialized.includes(store.selectedCustomer.domain) ||
                  serialized.includes(store.selectedCustomer.base44?.appId || "___no_app___") ||
                  serialized.includes(store.selectedCustomer.deployment?.deploymentId || "___no_deployment___")
                );
              }).length === 0 ? (
                <div style={{ color: "#64748b" }}>Nog geen backend acties.</div>
              ) : null}
            </div>
          </Card>
        </Card>
      ) : null}
    </div>
  );
}