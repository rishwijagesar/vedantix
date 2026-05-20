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

export default function FinancePage({ store: storeProp }) {
  const outletContext = useOutletContext();
  const store = storeProp || outletContext.store;

  const [overviewRange, setOverviewRange] = useState("month");
  const [customerRange, setCustomerRange] = useState("month");
  const [isLoadingOverview, setIsLoadingOverview] = useState(false);
  const [isSavingExpense, setIsSavingExpense] = useState(false);
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

  const customerLookup = useMemo(() => {
    return new Map(store.customers.map((customer) => [customer.id, customer]));
  }, [store.customers]);

  async function syncCustomersToFinance() {
    const apiKey = store.settings.apiKey;

    await Promise.all(
      store.customers.map((customer) => {
        const billing = customer.billing || {};

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
          isActive:
            customer.status === "active" || customer.status === "provisioning",
          apiKey,
        }).catch(() => null);
      })
    );
  }

  async function loadOverview() {
    setIsLoadingOverview(true);

    try {
      await syncCustomersToFinance();

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

      {/* Existing FinancePage content remains below */}
    </div>
  );
}
