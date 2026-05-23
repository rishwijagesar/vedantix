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
  deleteFinanceCustomer,
  deleteFinanceExpense,
  fetchFinanceCustomerDetails,
  fetchFinanceOverview,
  fetchStripeFinanceSummary,
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

function isLiveFinanceCustomer(customer) {
  return (
    customer?.status === "active" ||
    customer?.websiteBuildStatus === "LIVE" ||
    String(customer?.deployment?.status || "").toUpperCase() === "SUCCEEDED"
  );
}

export default function FinancePage({ store: storeProp }) {
  const outletContext = /** @type {{ store: any }} */ (useOutletContext());
  const store = storeProp || outletContext.store;

  const [overviewRange, setOverviewRange] = useState("month");
  const [customerRange, setCustomerRange] = useState("month");
  const [isLoadingOverview, setIsLoadingOverview] = useState(false);
  const [isSavingExpense, setIsSavingExpense] = useState(false);
  const [deletingFinanceCustomerId, setDeletingFinanceCustomerId] = useState("");
  const [deletingExpenseId, setDeletingExpenseId] = useState("");
  const [stripeSummary, setStripeSummary] = useState(null);
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
  const [selectedFinanceCustomerDetails, setSelectedFinanceCustomerDetails] = useState(null);
  const [deletedFinanceCustomerIds, setDeletedFinanceCustomerIds] = useState(
    () => new Set()
  );

  const customerLookup = useMemo(() => {
    return new Map(store.customers.map((customer) => [customer.id, customer]));
  }, [store.customers]);

  const financeEligibleCustomers = useMemo(
    () => store.customers.filter((customer) => isLiveFinanceCustomer(customer)),
    [store.customers]
  );

  function buildLocalOverviewFallback() {
    const customers = financeEligibleCustomers.map((customer) => {
      const revenue = Number(store.calcMonthlyRevenue(customer) || 0);
      const costs = Number(store.calcMonthlyInfraCost(customer) || 0);
      const billing = customer.billing || {};

      return {
        customerId: customer.id,
        companyName: customer.companyName,
        packageCode: customer.packageCode,
        revenue,
        costs,
        profit: revenue - costs,
        monthlyRevenue: revenue,
        monthlyInfraCost: costs,
        stripeCustomerId: customer.stripeCustomerId || billing.stripeCustomerId || "",
        stripeSubscriptionId:
          customer.stripeSubscriptionId || billing.stripeSubscriptionId || "",
        subscriptionStatus:
          customer.subscriptionStatus || billing.subscriptionStatus || "",
        paymentStatus: customer.paymentStatus || billing.paymentStatus || "",
      };
    });

    const totals = customers.reduce(
      (acc, item) => {
        const customer = customerLookup.get(item.customerId);
        acc.revenue += item.revenue;
        acc.costs += item.costs;
        acc.profit += item.profit;
        acc.customers += 1;
        if (isLiveFinanceCustomer(customer)) {
          acc.activeCustomers += 1;
        }
        return acc;
      },
      {
        revenue: 0,
        costs: 0,
        profit: 0,
        activeCustomers: 0,
        customers: 0,
      }
    );

    return {
      range: overviewRange,
      totals,
      customers,
      source: "local-fallback",
    };
  }

  function buildLocalCustomerDetailsFallback(customerId) {
    const customer = customerLookup.get(customerId);
    if (!customer || !isLiveFinanceCustomer(customer)) return null;

    const monthlyRevenue = Number(store.calcMonthlyRevenue(customer) || 0);
    const monthlyInfraCost = Number(store.calcMonthlyInfraCost(customer) || 0);
    const revenue = monthlyRevenue;
    const infraCosts = monthlyInfraCost;
    const expenses = store.expenses.filter((expense) => expense.customerId === customerId);
    const directExpenses = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );
    const billing = customer.billing || {};

    return {
      range: customerRange,
      customer: {
        customerId: customer.id,
        companyName: customer.companyName,
        packageCode: customer.packageCode,
        extras: customer.extras || [],
        monthlyRevenue,
        monthlyInfraCost,
        oneTimeSetupCost: Number(store.calcSetupRevenue(customer) || 0),
        stripeCustomerId: customer.stripeCustomerId || billing.stripeCustomerId || "",
        stripeSubscriptionId:
          customer.stripeSubscriptionId || billing.stripeSubscriptionId || "",
        subscriptionStatus:
          customer.subscriptionStatus || billing.subscriptionStatus || "",
        paymentStatus: customer.paymentStatus || billing.paymentStatus || "",
        isActive: isLiveFinanceCustomer(customer),
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      },
      totals: {
        revenue,
        costs: infraCosts + directExpenses,
        profit: revenue - infraCosts - directExpenses,
        infraCosts,
        directExpenses,
      },
      expenses,
      source: "local-fallback",
    };
  }

  async function syncCustomersToFinance(skipCustomerIds = deletedFinanceCustomerIds) {
    const apiKey = store.settings.apiKey;
    const financeEligibleIds = new Set(
      financeEligibleCustomers.map((customer) => customer.id)
    );

    await Promise.all(
      store.customers
        .filter((customer) => !skipCustomerIds.has(customer.id))
        .map((customer) => {
          const billing = customer.billing || {};

          if (!financeEligibleIds.has(customer.id)) {
            return deleteFinanceCustomer({
              customerId: customer.id,
              apiKey,
            }).catch(() => null);
          }

          return bootstrapFinanceCustomer({
            customerId: customer.id,
            companyName: customer.companyName,
            packageCode: customer.packageCode,
            extras: Array.isArray(customer.extras) ? customer.extras : [],
            monthlyRevenue: Number(store.calcMonthlyRevenue(customer) || 0),
            monthlyInfraCost: Number(store.calcMonthlyInfraCost(customer) || 0),
            oneTimeSetupCost: Number(store.calcSetupRevenue(customer) || 0),
            stripeCustomerId: customer.stripeCustomerId || billing.stripeCustomerId || "",
            stripeSubscriptionId:
              customer.stripeSubscriptionId || billing.stripeSubscriptionId || "",
            subscriptionStatus:
              customer.subscriptionStatus || billing.subscriptionStatus || "",
            paymentStatus: customer.paymentStatus || billing.paymentStatus || "",
            isActive: true,
            customerStatus: customer.status,
            websiteBuildStatus: customer.websiteBuildStatus,
            deploymentStatus: customer.deployment?.status || "",
            apiKey,
          }).catch(() => null);
        })
    );
  }

  async function loadOverview(options = {}) {
    setIsLoadingOverview(true);

    try {
      await syncCustomersToFinance(
        options.skipCustomerIds || deletedFinanceCustomerIds
      );

      const [overviewData, stripeData] = await Promise.all([
        fetchFinanceOverview({
          range: overviewRange,
          apiKey: store.settings.apiKey,
        }),
        fetchStripeFinanceSummary({
          apiKey: store.settings.apiKey,
        }).catch(() => null),
      ]);

      setOverview(
        overviewData || {
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

      setStripeSummary(stripeData);
    } catch (error) {
      console.error(error);
      setOverview(buildLocalOverviewFallback());
      setStripeSummary(null);
      notifyInfo("Backend finance kon niet laden; lokaal overzicht is getoond.");
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
      setSelectedFinanceCustomerDetails(buildLocalCustomerDetailsFallback(customerId));
      notifyInfo("Backend klantdetails konden niet laden; lokale details zijn getoond.");
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

  async function handleDeleteFinanceCustomer(customerId, companyName) {
    if (!customerId) return;

    const confirmed = window.confirm(
      `Finance record voor ${companyName || customerId} verwijderen? Gekoppelde uitgaven worden ook verwijderd.`
    );

    if (!confirmed) return;

    const nextDeletedIds = new Set(deletedFinanceCustomerIds);
    nextDeletedIds.add(customerId);
    setDeletingFinanceCustomerId(customerId);

    try {
      await deleteFinanceCustomer({
        customerId,
        apiKey: store.settings.apiKey,
      });

      setDeletedFinanceCustomerIds(nextDeletedIds);
      setOverview((prev) => ({
        ...prev,
        customers: (prev?.customers || []).filter(
          (item) => item.customerId !== customerId
        ),
      }));

      if (selectedFinanceCustomerId === customerId) {
        setSelectedFinanceCustomerId("");
        setSelectedFinanceCustomerDetails(null);
      }

      notifySuccess("Finance record verwijderd.");
      await loadOverview({ skipCustomerIds: nextDeletedIds });
    } catch (error) {
      console.error(error);
      notifyError("Finance record verwijderen is mislukt.");
    } finally {
      setDeletingFinanceCustomerId("");
    }
  }

  async function handleDeleteFinanceExpense(expense) {
    if (!expense?.id) return;

    const confirmed = window.confirm(
      `Uitgave "${expense.title || expense.id}" verwijderen?`
    );

    if (!confirmed) return;

    setDeletingExpenseId(expense.id);

    try {
      await deleteFinanceExpense({
        expenseId: expense.id,
        apiKey: store.settings.apiKey,
      });

      notifySuccess("Uitgave verwijderd.");
      await loadOverview();

      if (selectedFinanceCustomerId) {
        await loadCustomerDetails(selectedFinanceCustomerId);
      }
    } catch (error) {
      console.error(error);
      notifyError("Uitgave verwijderen is mislukt.");
    } finally {
      setDeletingExpenseId("");
    }
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {stripeSummary ? (
        <Card>
          <SectionTitle
            title="Stripe Live Metrics"
            subtitle="Realtime data uit Stripe Billing."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            <StatCard
              title="MRR"
              value={currency(stripeSummary.mrr || 0)}
              subtitle="Monthly Recurring Revenue"
              tone="#0ea5e9"
            />
            <StatCard
              title="Omzet deze maand"
              value={currency(stripeSummary.monthlyRevenue || 0)}
              subtitle="Betaalde facturen"
              tone="#10b981"
            />
            <StatCard
              title="Openstaand"
              value={currency(stripeSummary.outstandingRevenue || 0)}
              subtitle="Nog te ontvangen"
              tone="#f97316"
            />
            <StatCard
              title="Actieve abonnementen"
              value={String(stripeSummary.activeSubscriptions || 0)}
              subtitle="Stripe subscriptions"
              tone="#8b5cf6"
            />
            <StatCard
              title="Mislukte betalingen"
              value={String(stripeSummary.failedPayments || 0)}
              subtitle="Aandacht vereist"
              tone="#ef4444"
            />
          </div>

          {(stripeSummary.recentInvoices || []).length > 0 ? (
            <div style={{ marginTop: 20, display: "grid", gap: 8 }}>
              <div style={{ fontWeight: 900, color: "#0f172a" }}>
                Recente facturen
              </div>
              {(stripeSummary.recentInvoices || []).slice(0, 5).map((invoice) => (
                <div
                  key={invoice.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 12,
                    borderRadius: 10,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>
                      {invoice.customerName || "Onbekende klant"}
                    </div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>
                      {invoice.number || invoice.id} · {invoice.status}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontWeight: 900 }}>
                      {currency(invoice.amountPaid || invoice.amountDue || 0)}
                    </div>
                    {invoice.hostedInvoiceUrl ? (
                      <Button
                        tone="soft"
                        onClick={() =>
                          window.open(
                            invoice.hostedInvoiceUrl,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        Open
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      ) : null}

      <Card>
        <SectionTitle
          title="Finance overzicht"
          subtitle="Omzet, kosten en winst voor klanten waarvan de website live staat."
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
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
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
          subtitle="Voeg algemene kosten toe of koppel kosten aan een live klant."
          action={
            <Button tone="primary" onClick={handleCreateExpense} disabled={isSavingExpense}>
              {isSavingExpense ? "Opslaan..." : "Opslaan"}
            </Button>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 12,
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
              {financeEligibleCustomers.map((customer) => (
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
          subtitle="Alleen klanten die live staan worden naar finance gesynchroniseerd."
        />

        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr auto",
              gap: 10,
              padding: "0 10px",
              minWidth: 1080,
              color: "#64748b",
              fontSize: 11,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            <span>Klant</span>
            <span>Omzet</span>
            <span>Kosten</span>
            <span>Stripe</span>
            <span>Status</span>
            <span>Winst</span>
            <span>Acties</span>
          </div>

          <div style={{ display: "grid", gap: 8, minWidth: 1080, marginTop: 8 }}>
            {(overview?.customers || []).map((item) => {
              const customer = customerLookup.get(item.customerId);

              return (
                <div
                  key={item.customerId}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr auto",
                    gap: 10,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    alignItems: "center",
                    fontSize: 13,
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
                      fontWeight: 800,
                      color: item.stripeCustomerId ? "#0f172a" : "#94a3b8",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.stripeCustomerId || "Geen Stripe"}
                  </div>
                  <div style={{ fontWeight: 800, color: "#475569" }}>
                    {item.subscriptionStatus || item.paymentStatus || "—"}
                  </div>
                  <div
                    style={{
                      fontWeight: 900,
                      color: (item.profit || 0) >= 0 ? "#10b981" : "#ef4444",
                    }}
                  >
                    {currency(item.profit || 0)}
                  </div>
                  <Button
                    tone="danger"
                    onClick={() =>
                      handleDeleteFinanceCustomer(
                        item.customerId,
                        item.companyName || customer?.companyName
                      )
                    }
                    disabled={deletingFinanceCustomerId === item.customerId}
                  >
                    {deletingFinanceCustomerId === item.customerId
                      ? "Verwijderen..."
                      : "Verwijderen"}
                  </Button>
                </div>
              );
            })}
          </div>

          {(overview?.customers || []).length === 0 ? (
            <div style={{ color: "#64748b" }}>Nog geen finance records gevonden.</div>
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

              {selectedFinanceCustomerId ? (
                <Button
                  tone="danger"
                  onClick={() =>
                    handleDeleteFinanceCustomer(
                      selectedFinanceCustomerId,
                      selectedFinanceCustomerDetails?.customer?.companyName
                    )
                  }
                  disabled={deletingFinanceCustomerId === selectedFinanceCustomerId}
                >
                  {deletingFinanceCustomerId === selectedFinanceCustomerId
                    ? "Verwijderen..."
                    : "Finance verwijderen"}
                </Button>
              ) : null}
            </div>
          }
        />

        {selectedFinanceCustomerDetails ? (
          <div style={{ display: "grid", gap: 14 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 12,
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
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 14,
              }}
            >
              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  padding: 12,
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
                    <strong>Stripe:</strong>{" "}
                    {selectedFinanceCustomerDetails?.customer?.stripeCustomerId ||
                      "Geen Stripe klant"}
                  </div>
                  <div>
                    <strong>Subscription:</strong>{" "}
                    {selectedFinanceCustomerDetails?.customer?.subscriptionStatus || "—"}
                  </div>
                  <div>
                    <strong>Payment:</strong>{" "}
                    {selectedFinanceCustomerDetails?.customer?.paymentStatus || "—"}
                  </div>
                  <div>
                    <strong>Stripe subscription:</strong>{" "}
                    {selectedFinanceCustomerDetails?.customer?.stripeSubscriptionId ||
                      "—"}
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
                  borderRadius: 10,
                  padding: 12,
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
                        borderRadius: 10,
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          flexWrap: "wrap",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div style={{ fontWeight: 900 }}>
                          {currency(expense.amount || 0)}
                        </div>
                        <Button
                          tone="danger"
                          onClick={() => handleDeleteFinanceExpense(expense)}
                          disabled={deletingExpenseId === expense.id}
                        >
                          {deletingExpenseId === expense.id
                            ? "Verwijderen..."
                            : "Verwijderen"}
                        </Button>
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
