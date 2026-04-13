import React, { useEffect, useMemo } from "react";
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
  TIME_FILTERS,
  currency,
  dateLabel,
  pretty,
} from "../utils/adminStorage";
import { useOutletContext, useParams } from "react-router-dom";

export default function CustomerDetailPage({
  store: storeProp,
  customerId: customerIdProp = null,
}) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();

  const { id } = useParams();
  const store = storeProp || outletContext.store;
  const customerId = customerIdProp || id;
  useEffect(() => {
    if (customerId) {
      store.setSelectedCustomerId(customerId);
    }
  }, [customerId, store]);

  const customer = useMemo(() => {
    if (customerId) {
      return store.customers.find((item) => item.id === customerId) || null;
    }
    return store.selectedCustomer || null;
  }, [customerId, store.customers, store.selectedCustomer]);

  const selectedPackageOptions = useMemo(() => {
    return [...store.packageOptions]
      .filter((item) => item.isActive !== false)
      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
  }, [store.packageOptions]);

  if (!customer) {
    return (
      <Card>
        <SectionTitle
          title="Klantdetail"
          subtitle="Er is geen klant geselecteerd."
        />
        <div style={{ color: "#64748b" }}>
          Selecteer eerst een klant om de detailpagina te bekijken.
        </div>
      </Card>
    );
  }

  const customerStats =
    store.selectedCustomer?.id === customer.id
      ? store.selectedCustomerStats
      : null;

  const trendData =
    store.selectedCustomer?.id === customer.id
      ? store.selectedCustomerTrendData
      : [];

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Card>
        <SectionTitle
          title={`Klantdetail — ${customer.companyName}`}
          subtitle="Alle klantgegevens, documenten en financieel overzicht per periode."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button
                tone="soft"
                onClick={() => store.refreshCustomerDeployment(customer)}
              >
                Refresh status
              </Button>
              <Button onClick={() => store.redeployCustomer(customer)}>
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
            value={currency(store.calcMonthlyRevenue(customer))}
            subtitle="Pakket + extra's"
            tone="#0ea5e9"
          />
          <StatCard
            title="Setup"
            value={currency(store.calcSetupRevenue(customer))}
            subtitle="Eenmalige opbrengst"
            tone="#8b5cf6"
          />
          <StatCard
            title="Kosten"
            value={currency(customerStats ? customerStats.cost : 0)}
            subtitle="Per gekozen periode"
            tone="#f97316"
          />
          <StatCard
            title="Winst"
            value={currency(customerStats ? customerStats.profit : 0)}
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
            <SectionTitle
              title="Algemene gegevens"
              subtitle="Wijzigbare klantinformatie."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              <Field label="Bedrijfsnaam">
                <Input
                  value={customer.companyName}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      companyName: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Contactpersoon">
                <Input
                  value={customer.contactName}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      contactName: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="E-mail">
                <Input
                  value={customer.email}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      email: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Telefoon">
                <Input
                  value={customer.phone}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      phone: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Domeinnaam">
                <Input
                  value={customer.domain}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      domain: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Pakket">
                <Select
                  value={customer.packageCode}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      packageCode: e.target.value,
                    })
                  }
                >
                  {selectedPackageOptions.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Adres">
                <Input
                  value={customer.address || ""}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      address: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Postcode">
                <Input
                  value={customer.postalCode || ""}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      postalCode: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Plaats">
                <Input
                  value={customer.city || ""}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      city: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Land">
                <Input
                  value={customer.country || ""}
                  onChange={(e) =>
                    store.saveCustomerEdits({
                      ...customer,
                      country: e.target.value,
                    })
                  }
                />
              </Field>

              <Field label="Deployment status">
                <Input value={customer.deploymentStatus || ""} readOnly />
              </Field>

              <Field label="Deployment ID">
                <Input value={customer.deploymentId || ""} readOnly />
              </Field>

              <Field label="Aangemaakt op">
                <Input value={dateLabel(customer.createdAt)} readOnly />
              </Field>

              <Field label="Setup prijs">
                <Input value={currency(store.calcSetupRevenue(customer))} readOnly />
              </Field>

              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="Notities">
                  <Textarea
                    value={customer.notes || ""}
                    onChange={(e) =>
                      store.saveCustomerEdits({
                        ...customer,
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
                    onChange={(e) => store.uploadDocuments(customer.id, e.target.files)}
                  />
                </label>
              }
            />

            <div style={{ display: "grid", gap: 10 }}>
              {(customer.documents || []).map((doc) => (
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

              {(customer.documents || []).length === 0 ? (
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
              <AreaChart data={trendData}>
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
              value={currency(customerStats ? customerStats.revenue : 0)}
              subtitle="Pakket + extra's"
              tone="#0ea5e9"
            />
            <StatCard
              title="Infra"
              value={currency(customerStats ? customerStats.infraCost : 0)}
              subtitle="Automatisch vanuit pakket + extra's"
              tone="#8b5cf6"
            />
            <StatCard
              title="Extra kosten"
              value={currency(customerStats ? customerStats.directExpenses : 0)}
              subtitle="Handmatig gekoppelde uitgaven"
              tone="#f97316"
            />
            <StatCard
              title="Resultaat"
              value={currency(customerStats ? customerStats.profit : 0)}
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
            {(customer.requestHistory || []).map((entry) => (
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

            {(customer.requestHistory || []).length === 0 ? (
              <div style={{ color: "#64748b" }}>Nog geen backend acties.</div>
            ) : null}
          </div>
        </Card>
      </Card>
    </div>
  );
}