import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  SectionTitle,
  Button,
  Field,
  Input,
  Select,
  StatCard,
} from "../components/AdminUI";
import { currency, dateLabel } from "../utils/adminStorage";
import { useOutletContext } from "react-router-dom";
import {
  bootstrapFinanceCustomer,
  createFinanceExpense,
  fetchFinanceCustomerDetails,
  fetchFinanceOverview,
} from "../../../api/finance.api";
import {
  notifyError,
  notifyInfo,
  notifySuccess,
} from "../utils/adminNotifications";

function mapRangeLabel(key) {
  if (key === "month") return "Maand";
  if (key === "quarter") return "Kwartaal";
  if (key === "year") return "Jaar";
  return key;
}

export default function FinancePage({ store: storeProp }) {
  /** @type {{ store: any }} */
  const outletContext = useOutletContext();
  const store = storeProp || outletContext.store;

  const [overviewRange, setOverviewRange] = useState("month");
  const [customerRange, setCustomerRange] = useState("month");
  const [isLoadingOverview, setIsLoadingOverview] = useState(false);
  const [isSavingExpense, setIsSavingExpense] = useState(false);
  const [overview, setOverview] = useState({
    totals: {
      revenue: 0,
      costs: 0,
      profit: 0,
      activeCustomers: 0,
      customers: 0,
    },
    customers: [],
  });
  const [selectedFinanceCustomerId, setSelectedFinanceCustomerId] = useState("");
  const [selectedFinanceCustomerDetails, setSelectedFinanceCustomerDetails] =
    useState(null);

  const customerLookup = useMemo(() => {
    return new Map(store.customers.map((customer) => [customer.id, customer]));
  }, [store.customers]);

  async function syncCustomersToFinance() {
    const apiKey = store.settings.apiKey;

    await Promise.all(
      store.customers.map((customer) =>
        bootstrapFinanceCustomer({
          customerId: customer.id,
          companyName: customer.companyName,
          packageCode: customer.packageCode,
          extras: Array.isArray(customer.extras) ? customer.extras : [],
          monthlyInfraCost: Number(store.calcMonthlyInfraCost(customer) || 0),
          oneTimeSetupCost: Number(store.calcSetupRevenue(customer) || 0),
          isActive:
            customer.status === "active" || customer.status === "provisioning",
          apiKey,
        }).catch(() => null)
      )
    );
  }

  async function loadOverview() {
    setIsLoadingOverview(true);

    try {
      await syncCustomersToFinance();

      const data = await fetchFinanceOverview({
        range: overviewRange,
        apiKey: store.settings.apiKey,
      });

      setOverview(
        data || {
          totals: {
            revenue: 0,
            costs: 0,
            profit: 0,
            activeCustomers: 0,
            customers: 0,
          },
          customers: [],
        }
      );
    } catch (error) {
      console.error(error);
      notifyError("Finance overzicht laden is mislukt.");
    } finally {
      setIsLoadingOverview(false);
    }
  }

  async function loadCustomerDetails(customerId) {
    if (!customerId) {
      setSelectedFinanceCustomerDetails(null);
      return;
    }

    try {
      await syncCustomersToFinance();

      const data = await fetchFinanceCustomerDetails({
        customerId,
        range: customerRange,
        apiKey: store.settings.apiKey,
      });

      setSelectedFinanceCustomerDetails(data || null);
    } catch (error) {
      console.error(error);
      setSelectedFinanceCustomerDetails(null);
      notifyError("Finance klantdetails laden is mislukt.");
    }
  }

  useEffect(() => {
    void loadOverview();
  }, [overviewRange, store.customers.length]);

  useEffect(() => {
    if (!selectedFinanceCustomerId && overview.customers?.length > 0) {
      setSelectedFinanceCustomerId(overview.customers[0].customerId);
    }
  }, [overview.customers, selectedFinanceCustomerId]);

  useEffect(() => {
    void loadCustomerDetails(selectedFinanceCustomerId);
  }, [selectedFinanceCustomerId, customerRange]);

  async function handleCreateExpense() {
    if (!store.expenseForm.title || !store.expenseForm.amount) {
      notifyInfo("Vul eerst titel en bedrag in.");
      return;
    }

    setIsSavingExpense(true);

    try {
      await createFinanceExpense({
        title: store.expenseForm.title,
        amount: Number(store.expenseForm.amount),
        category: store.expenseForm.category,
        expenseDate: store.expenseForm.date,
        customerId: store.expenseForm.customerId,
        apiKey: store.settings.apiKey,
      });

      store.setExpenseForm({
        title: "",
        amount: "",
        date: new Date().toISOString().slice(0, 10),
        category: "Overig",
        customerId: "",
      });

      notifySuccess("Uitgave opgeslagen.");
      await loadOverview();

      if (selectedFinanceCustomerId) {
        await loadCustomerDetails(selectedFinanceCustomerId);
      }
    } catch (error) {
      console.error(error);
      notifyError("Uitgave opslaan is mislukt.");
    } finally {
      setIsSavingExpense(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Card>
        <SectionTitle
          title="Finance overzicht"
          subtitle="Server-side omzet, kosten en winst op basis van backend finance records."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["month", "quarter", "year"].map((key) => (
                <Button
                  key={key}
                  tone={overviewRange === key ? "primary" : "default"}
                  onClick={() => setOverviewRange(key)}
                  disabled={isLoadingOverview}
                >
                  {mapRangeLabel(key)}
                </Button>
              ))}
              <Button
                tone="soft"
                onClick={() => loadOverview()}
                disabled={isLoadingOverview}
              >
                {isLoadingOverview ? "Laden..." : "Verversen"}
              </Button>
            </div>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          <StatCard
            title="Omzet"
            value={currency(overview?.totals?.revenue || 0)}
            subtitle="Server-side berekend"
            tone="#0ea5e9"
          />
          <StatCard
            title="Kosten"
            value={currency(overview?.totals?.costs || 0)}
            subtitle="Infra + directe uitgaven"
            tone="#f97316"
          />
          <StatCard
            title="Winst"
            value={currency(overview?.totals?.profit || 0)}
            subtitle="Omzet minus kosten"
            tone={(overview?.totals?.profit || 0) >= 0 ? "#10b981" : "#ef4444"}
          />
          <StatCard
            title="Actieve klanten"
            value={String(overview?.totals?.activeCustomers || 0)}
            subtitle="Volgens finance backend"
            tone="#8b5cf6"
          />
          <StatCard
            title="Klanten totaal"
            value={String(overview?.totals?.customers || 0)}
            subtitle="Met finance record"
            tone="#0f172a"
          />
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Uitgave toevoegen"
          subtitle="Voeg algemene of klantgebonden kosten toe via de finance backend."
          action={
            <Button tone="primary" onClick={handleCreateExpense} disabled={isSavingExpense}>
              {isSavingExpense ? "Opslaan..." : "Opslaan"}
            </Button>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <Field label="Titel">
            <Input
              value={store.expenseForm.title}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Hosting, tool, advertentie..."
            />
          </Field>

          <Field label="Bedrag">
            <Input
              type="number"
              min="0"
              value={store.expenseForm.amount}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, amount: e.target.value }))
              }
            />
          </Field>

          <Field label="Datum">
            <Input
              type="date"
              value={store.expenseForm.date}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </Field>

          <Field label="Categorie">
            <Select
              value={store.expenseForm.category}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option>Overig</option>
              <option>Hosting</option>
              <option>Software</option>
              <option>Marketing</option>
              <option>Freelance</option>
              <option>Hardware</option>
            </Select>
          </Field>

          <Field label="Klant koppelen">
            <Select
              value={store.expenseForm.customerId}
              onChange={(e) =>
                store.setExpenseForm((prev) => ({ ...prev, customerId: e.target.value }))
              }
            >
              <option value="">Geen specifieke klant</option>
              {store.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.companyName}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Klanten op basis van finance backend"
          subtitle="Dit overzicht komt uit /api/finance/overview en niet uit lokale berekeningen."
        />

        <div style={{ display: "grid", gap: 10 }}>
          {(overview?.customers || []).map((item) => {
            const customer = customerLookup.get(item.customerId);

            return (
              <div
                key={item.customerId}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  gap: 12,
                  padding: 14,
                  borderRadius: 16,
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 800 }}>
                    {item.companyName || customer?.companyName || item.customerId}
                  </div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>
                    {item.packageCode}
                  </div>
                </div>

                <div style={{ fontWeight: 800 }}>{currency(item.revenue || 0)}</div>
                <div style={{ fontWeight: 800 }}>{currency(item.costs || 0)}</div>
                <div
                  style={{
                    fontWeight: 900,
                    color: (item.profit || 0) >= 0 ? "#10b981" : "#ef4444",
                  }}
                >
                  {currency(item.profit || 0)}
                </div>
              </div>
            );
          })}

          {(overview?.customers || []).length === 0 ? (
            <div style={{ color: "#64748b" }}>
              Nog geen finance records gevonden.
            </div>
          ) : null}
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="Klantdetail uit finance backend"
          subtitle="Server-side detailweergave inclusief directe uitgaven."
          action={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Select
                value={selectedFinanceCustomerId}
                onChange={(e) => setSelectedFinanceCustomerId(e.target.value)}
                style={{ minWidth: 260 }}
              >
                <option value="">Selecteer klant</option>
                {(overview?.customers || []).map((item) => (
                  <option key={item.customerId} value={item.customerId}>
                    {item.companyName}
                  </option>
                ))}
              </Select>

              {["month", "quarter", "year"].map((key) => (
                <Button
                  key={key}
                  tone={customerRange === key ? "primary" : "default"}
                  onClick={() => setCustomerRange(key)}
                >
                  {mapRangeLabel(key)}
                </Button>
              ))}
            </div>
          }
        />

        {selectedFinanceCustomerDetails ? (
          <div style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 16,
              }}
            >
              <StatCard
                title="Opbrengst"
                value={currency(selectedFinanceCustomerDetails?.totals?.revenue || 0)}
                subtitle="Server-side"
                tone="#0ea5e9"
              />
              <StatCard
                title="Infra"
                value={currency(selectedFinanceCustomerDetails?.totals?.infraCosts || 0)}
                subtitle="Server-side"
                tone="#8b5cf6"
              />
              <StatCard
                title="Directe kosten"
                value={currency(
                  selectedFinanceCustomerDetails?.totals?.directExpenses || 0
                )}
                subtitle="Gekoppelde uitgaven"
                tone="#f97316"
              />
              <StatCard
                title="Winst"
                value={currency(selectedFinanceCustomerDetails?.totals?.profit || 0)}
                subtitle="Server-side"
                tone={
                  (selectedFinanceCustomerDetails?.totals?.profit || 0) >= 0
                    ? "#10b981"
                    : "#ef4444"
                }
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 18,
              }}
            >
              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 18,
                  padding: 16,
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    color: "#0f172a",
                    marginBottom: 12,
                  }}
                >
                  Klantrecord
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  <div>
                    <strong>Bedrijf:</strong>{" "}
                    {selectedFinanceCustomerDetails?.customer?.companyName}
                  </div>
                  <div>
                    <strong>Pakket:</strong>{" "}
                    {selectedFinanceCustomerDetails?.customer?.packageCode}
                  </div>
                  <div>
                    <strong>Monthly revenue:</strong>{" "}
                    {currency(
                      selectedFinanceCustomerDetails?.customer?.monthlyRevenue || 0
                    )}
                  </div>
                  <div>
                    <strong>Monthly infra:</strong>{" "}
                    {currency(
                      selectedFinanceCustomerDetails?.customer?.monthlyInfraCost || 0
                    )}
                  </div>
                  <div>
                    <strong>Setup cost:</strong>{" "}
                    {currency(
                      selectedFinanceCustomerDetails?.customer?.oneTimeSetupCost || 0
                    )}
                  </div>
                  <div>
                    <strong>Aangemaakt:</strong>{" "}
                    {dateLabel(selectedFinanceCustomerDetails?.customer?.createdAt)}
                  </div>
                  <div>
                    <strong>Bijgewerkt:</strong>{" "}
                    {dateLabel(selectedFinanceCustomerDetails?.customer?.updatedAt)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 18,
                  padding: 16,
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    color: "#0f172a",
                    marginBottom: 12,
                  }}
                >
                  Uitgaven
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {(selectedFinanceCustomerDetails?.expenses || []).map((expense) => (
                    <div
                      key={expense.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: 12,
                        borderRadius: 14,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800 }}>{expense.title}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>
                          {expense.category} · {dateLabel(expense.expenseDate)}
                        </div>
                      </div>
                      <div style={{ fontWeight: 900 }}>
                        {currency(expense.amount || 0)}
                      </div>
                    </div>
                  ))}

                  {(selectedFinanceCustomerDetails?.expenses || []).length === 0 ? (
                    <div style={{ color: "#64748b" }}>
                      Geen directe uitgaven in deze periode.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: "#64748b" }}>
            Selecteer een klant om finance details te laden.
          </div>
        )}
      </Card>
    </div>
  );
}