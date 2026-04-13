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

export default function CustomersPage({ store: storeProp }) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();

  const store = storeProp || outletContext.store;
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
              minWidth: 980,
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
                  "Status",
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
              {store.filteredCustomers.map((customer) => (
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
                      <Button onClick={() => store.refreshCustomerDeployment(customer)}>
                        Refresh
                      </Button>
                      <Button
                        tone="danger"
                        onClick={() => store.requestDeleteCustomer(customer)}
                      >
                        Verwijderen
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {store.filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
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
            subtitle="Alle klantgegevens, documenten en financieel overzicht per periode."
            action={
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button tone="soft" onClick={() => store.refreshCustomerDeployment(store.selectedCustomer)}>
                  Refresh status
                </Button>
                <Button onClick={() => store.redeployCustomer(store.selectedCustomer)}>
                  Redeploy
                </Button>
              </div>
            }
          />

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

                <Field label="Deployment status">
                  <Input value={store.selectedCustomer.deploymentStatus || ""} readOnly />
                </Field>

                <Field label="Deployment ID">
                  <Input value={store.selectedCustomer.deploymentId || ""} readOnly />
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
                title="Documenten"
                subtitle="Upload bijvoorbeeld contracten of intakebestanden."
                action={
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 14px",
                      borderRadius: 14,
                      border: "1px solid #dbe4ef",
                      background: "#ffffff",
                      cursor: "pointer",
                      fontWeight: 800,
                      boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
                    }}
                  >
                    Upload document
                    <input
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) =>
                        store.uploadDocuments(store.selectedCustomer.id, e.target.files)
                      }
                    />
                  </label>
                }
              />

              <div style={{ display: "grid", gap: 10 }}>
                {(store.selectedCustomer.documents || []).map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      alignItems: "center",
                      padding: 14,
                      borderRadius: 16,
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800 }}>{doc.name}</div>
                      <div style={{ color: "#64748b", fontSize: 13 }}>
                        {Math.round(doc.size / 1024)} KB · {dateLabel(doc.uploadedAt)}
                      </div>
                    </div>
                    {doc.dataUrl ? (
                      <a
                        href={doc.dataUrl}
                        download={doc.name}
                        style={{
                          color: "#1d4ed8",
                          fontWeight: 800,
                          textDecoration: "none",
                        }}
                      >
                        Download
                      </a>
                    ) : null}
                  </div>
                ))}

                {(store.selectedCustomer.documents || []).length === 0 ? (
                  <div style={{ color: "#64748b" }}>Nog geen documenten.</div>
                ) : null}
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
              {(store.selectedCustomer.requestHistory || []).map((entry) => (
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

              {(store.selectedCustomer.requestHistory || []).length === 0 ? (
                <div style={{ color: "#64748b" }}>Nog geen backend acties.</div>
              ) : null}
            </div>
          </Card>
        </Card>
      ) : null}
    </div>
  );
}