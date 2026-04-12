import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const STORAGE_KEYS = {
  settings: "vedantix_admin_settings_v5",
  customers: "vedantix_admin_customers_v5",
  expenses: "vedantix_admin_expenses_v5",
  requestLog: "vedantix_admin_request_log_v5",
};

const PACKAGE_OPTIONS = [
  { code: "STARTER", label: "Starter", monthlyPrice: 99 },
  { code: "GROWTH", label: "Growth", monthlyPrice: 149 },
  { code: "PRO", label: "Pro", monthlyPrice: 249 },
  { code: "CUSTOM", label: "Custom", monthlyPrice: 399 },
];

const EXTRA_OPTIONS = [
  { code: "BLOG", label: "Blog / FAQ", monthlyPrice: 15 },
  { code: "BOOKING", label: "Reserveringen", monthlyPrice: 25 },
  { code: "ANALYTICS", label: "Analytics+", monthlyPrice: 10 },
  { code: "CRM", label: "CRM module", monthlyPrice: 25 },
  { code: "FORMS", label: "Form opslag", monthlyPrice: 12 },
  { code: "SEO_PLUS", label: "Local SEO+", monthlyPrice: 20 },
  { code: "EXTRA_MAILBOX", label: "Extra mailbox", monthlyPrice: 7 },
  { code: "PRIORITY_SUPPORT", label: "Priority support", monthlyPrice: 35 },
];

const STATUS_LABELS = {
  lead: "Lead",
  intake: "Intake",
  onboarding: "Onboarding",
  provisioning: "Provisioning",
  active: "Live",
  warning: "Waarschuwing",
  failed: "Fout",
  paused: "Gepauzeerd",
  cancelled: "Opgezegd",
};

const STATUS_COLORS = {
  lead: "#64748b",
  intake: "#8b5cf6",
  onboarding: "#0ea5e9",
  provisioning: "#f59e0b",
  active: "#10b981",
  warning: "#f97316",
  failed: "#ef4444",
  paused: "#475569",
  cancelled: "#94a3b8",
};

const TIME_FILTERS = [
  { key: "day", label: "Dag" },
  { key: "week", label: "Week" },
  { key: "month", label: "Maand" },
  { key: "quarter", label: "Kwartaal" },
  { key: "halfyear", label: "Half jaar" },
  { key: "year", label: "Jaar" },
];

const DEFAULT_SETTINGS = {
  baseUrl: "/provisioning-api",
  apiKey: "",
  tenantId: "default",
  actorId: "admin-dashboard",
  source: "ADMIN_PANEL",
  autoIdempotency: true,
  autoProvisionMail: true,
  defaultMailboxLocalPart: "info",
};

const DEFAULT_CUSTOMER_FORM = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  domain: "",
  packageCode: "STARTER",
  extras: [],
  notes: "",
  monthlyInfraCost: 15,
};

const DEFAULT_EXPENSE_FORM = {
  title: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Overig",
};

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pretty(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function currency(value) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function dateLabel(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("nl-NL");
}

function packageMeta(packageCode) {
  return (
    PACKAGE_OPTIONS.find((item) => item.code === packageCode) || PACKAGE_OPTIONS[0]
  );
}

function extrasPrice(extras) {
  return (extras || []).reduce((sum, code) => {
    const item = EXTRA_OPTIONS.find((extra) => extra.code === code);
    return sum + (item?.monthlyPrice || 0);
  }, 0);
}

function calcMonthlyRevenue(customer) {
  return (
    (packageMeta(customer.packageCode).monthlyPrice || 0) +
    extrasPrice(customer.extras || [])
  );
}

function buildHeaders(settings, method) {
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": settings.apiKey || "",
    "X-Tenant-Id": settings.tenantId || "default",
    "X-Actor-Id": settings.actorId || "admin-dashboard",
    "X-Source": settings.source || "ADMIN_PANEL",
  };

  if (settings.autoIdempotency && method !== "GET") {
    headers["Idempotency-Key"] =
      (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
      `req-${Date.now()}`;
  }

  return headers;
}

async function apiRequest(settings, method, path, body) {
  const url = `${settings.baseUrl.replace(/\/$/, "")}${path}`;
  const response = await fetch(url, {
    method,
    headers: buildHeaders(settings, method),
    body: method === "GET" ? undefined : JSON.stringify(body || {}),
  });

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    url,
    method,
  };
}

function withinFilter(dateString, filterKey) {
  const d = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (filterKey === "day") return diffMs <= dayMs;
  if (filterKey === "week") return diffMs <= 7 * dayMs;
  if (filterKey === "month") return diffMs <= 31 * dayMs;
  if (filterKey === "quarter") return diffMs <= 92 * dayMs;
  if (filterKey === "halfyear") return diffMs <= 183 * dayMs;
  return diffMs <= 366 * dayMs;
}

function buildTrendData(customers, expenses, filterKey) {
  const days =
    filterKey === "day"
      ? 1
      : filterKey === "week"
        ? 7
        : filterKey === "month"
          ? 30
          : filterKey === "quarter"
            ? 12
            : filterKey === "halfyear"
              ? 6
              : 12;

  const useMonths =
    filterKey === "quarter" || filterKey === "halfyear" || filterKey === "year";

  const rows = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const base = new Date();

    if (useMonths) {
      base.setMonth(base.getMonth() - i);
      const month = base.getMonth();
      const year = base.getFullYear();

      const income = customers
        .filter((customer) => {
          const start = new Date(customer.createdAt);
          return start.getMonth() <= month || start.getFullYear() < year;
        })
        .reduce((sum, customer) => sum + calcMonthlyRevenue(customer), 0);

      const outgoing = expenses
        .filter((expense) => {
          const d = new Date(expense.date);
          return d.getMonth() === month && d.getFullYear() === year;
        })
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

      rows.push({
        label: base.toLocaleDateString("nl-NL", {
          month: "short",
          year: filterKey === "year" ? "2-digit" : undefined,
        }),
        omzet: income,
        uitgaven: outgoing,
        winst: income - outgoing,
      });
    } else {
      base.setDate(base.getDate() - i);
      const iso = base.toISOString().slice(0, 10);

      const income = customers
        .filter((customer) => {
          return new Date(customer.createdAt) <= new Date(`${iso}T23:59:59`);
        })
        .reduce((sum, customer) => sum + calcMonthlyRevenue(customer) / 30, 0);

      const outgoing = expenses
        .filter((expense) => String(expense.date).slice(0, 10) === iso)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

      rows.push({
        label: base.toLocaleDateString("nl-NL", {
          day: "2-digit",
          month: "2-digit",
        }),
        omzet: Math.round(income),
        uitgaven: outgoing,
        winst: Math.round(income - outgoing),
      });
    }
  }

  return rows;
}

function StatCard({ title, value, subtitle, tone = "#0ea5e9" }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        padding: 18,
        boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
      }}
    >
      <div style={{ color: "#64748b", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ color: "#0f172a", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ color: tone, fontSize: 13, fontWeight: 700 }}>{subtitle}</div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 22,
        padding: 20,
        boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ title, subtitle, action = null }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 18,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", marginBottom: 6 }}>
          {title}
        </h2>
        {subtitle ? (
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.5 }}>{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function Button(props) {
  const {
    children,
    onClick,
    tone = "default",
    disabled = false,
    type,
  } = props;

  const buttonType = type === "submit" || type === "reset" ? type : "button";

  const styles = {
    default: {
      background: "#ffffff",
      color: "#0f172a",
      border: "1px solid #cbd5e1",
    },
    primary: {
      background: "#0f172a",
      color: "#ffffff",
      border: "1px solid #0f172a",
    },
    success: {
      background: "#10b981",
      color: "#052e16",
      border: "1px solid #10b981",
    },
    danger: {
      background: "#ef4444",
      color: "#ffffff",
      border: "1px solid #ef4444",
    },
    soft: {
      background: "#eff6ff",
      color: "#1d4ed8",
      border: "1px solid #bfdbfe",
    },
  };

  const selected = styles[tone] || styles.default;

  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 12,
        fontWeight: 800,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...selected,
      }}
    >
      {children}
    </button>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        borderRadius: 14,
        border: "1px solid #cbd5e1",
        background: "#ffffff",
        padding: "12px 14px",
        color: "#0f172a",
        outline: "none",
        ...(props.style || {}),
      }}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        minHeight: 100,
        borderRadius: 14,
        border: "1px solid #cbd5e1",
        background: "#ffffff",
        padding: "12px 14px",
        color: "#0f172a",
        outline: "none",
        resize: "vertical",
        ...(props.style || {}),
      }}
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        borderRadius: 14,
        border: "1px solid #cbd5e1",
        background: "#ffffff",
        padding: "12px 14px",
        color: "#0f172a",
        outline: "none",
        ...(props.style || {}),
      }}
    />
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: "#334155", fontSize: 13, fontWeight: 800 }}>{label}</span>
      {children}
    </label>
  );
}

export default function AdminCRM() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settings, setSettings] = useState(() =>
    loadJson(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );
  const [customers, setCustomers] = useState(() =>
    loadJson(STORAGE_KEYS.customers, [])
  );
  const [expenses, setExpenses] = useState(() =>
    loadJson(STORAGE_KEYS.expenses, [])
  );
  const [requestLog, setRequestLog] = useState(() =>
    loadJson(STORAGE_KEYS.requestLog, [])
  );

  const [customerForm, setCustomerForm] = useState(DEFAULT_CUSTOMER_FORM);
  const [expenseForm, setExpenseForm] = useState(DEFAULT_EXPENSE_FORM);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [financeFilter, setFinanceFilter] = useState("month");
  const [isProvisioning, setIsProvisioning] = useState(false);

  useEffect(() => saveJson(STORAGE_KEYS.settings, settings), [settings]);
  useEffect(() => saveJson(STORAGE_KEYS.customers, customers), [customers]);
  useEffect(() => saveJson(STORAGE_KEYS.expenses, expenses), [expenses]);
  useEffect(() => saveJson(STORAGE_KEYS.requestLog, requestLog), [requestLog]);

  const filteredCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter((customer) =>
      [
        customer.companyName,
        customer.contactName,
        customer.email,
        customer.phone,
        customer.domain,
        customer.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [customers, customerSearch]);

  const selectedCustomer = useMemo(() => {
    return customers.find((item) => item.id === selectedCustomerId) || null;
  }, [customers, selectedCustomerId]);

  const financeExpenses = useMemo(() => {
    return expenses.filter((item) => withinFilter(item.date, financeFilter));
  }, [expenses, financeFilter]);

  const financeCustomers = useMemo(() => {
    return customers.filter((item) => withinFilter(item.createdAt, financeFilter));
  }, [customers, financeFilter]);

  const totalMonthlyRevenue = useMemo(() => {
    return customers.reduce((sum, customer) => sum + calcMonthlyRevenue(customer), 0);
  }, [customers]);

  const totalMonthlyCosts = useMemo(() => {
    const infra = customers.reduce(
      (sum, customer) => sum + Number(customer.monthlyInfraCost || 0),
      0
    );
    const manual = financeExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );
    return infra + manual;
  }, [customers, financeExpenses]);

  const activeCustomers = useMemo(() => {
    return customers.filter((item) => item.status === "active").length;
  }, [customers]);

  const failedCustomers = useMemo(() => {
    return customers.filter((item) => item.status === "failed").length;
  }, [customers]);

  const warningCustomers = useMemo(() => {
    return customers.filter((item) => item.status === "warning").length;
  }, [customers]);

  const statusChartData = useMemo(() => {
    const grouped = customers.reduce((acc, customer) => {
      const key = customer.status || "lead";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([key, value]) => ({
      name: STATUS_LABELS[key] || key,
      value,
      color: STATUS_COLORS[key] || "#94a3b8",
    }));
  }, [customers]);

  const packageChartData = useMemo(() => {
    const grouped = customers.reduce((acc, customer) => {
      acc[customer.packageCode] = (acc[customer.packageCode] || 0) + 1;
      return acc;
    }, {});

    return PACKAGE_OPTIONS.map((option) => ({
      name: option.label,
      klanten: grouped[option.code] || 0,
      omzet: customers
        .filter((customer) => customer.packageCode === option.code)
        .reduce((sum, customer) => sum + calcMonthlyRevenue(customer), 0),
    }));
  }, [customers]);

  const trendData = useMemo(() => {
    return buildTrendData(customers, expenses, financeFilter);
  }, [customers, expenses, financeFilter]);

  function updateCustomerForm(key, value) {
    setCustomerForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateSettings(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function toggleExtra(code) {
    setCustomerForm((prev) => {
      const exists = prev.extras.includes(code);
      return {
        ...prev,
        extras: exists
          ? prev.extras.filter((item) => item !== code)
          : [...prev.extras, code],
      };
    });
  }

  function createCustomerDraft() {
    const companySlug = slugify(customerForm.companyName);
    const domainSlug = slugify(customerForm.domain.split(".")[0] || customerForm.companyName);

    const customerId = `cust_${companySlug || domainSlug || Date.now()}`;

    return {
      id: customerId,
      companyName: customerForm.companyName,
      contactName: customerForm.contactName,
      email: customerForm.email,
      phone: customerForm.phone,
      domain: customerForm.domain.trim().toLowerCase(),
      packageCode: customerForm.packageCode,
      extras: customerForm.extras,
      notes: customerForm.notes,
      monthlyInfraCost: Number(customerForm.monthlyInfraCost || 0),
      status: "intake",
      createdAt: new Date().toISOString(),
      deploymentId: "",
      deploymentStatus: "NOT_STARTED",
      deploymentStage: null,
      mailProvisioned: false,
      mailDomainId: "",
      documents: [],
      requestHistory: [],
      finance: {
        monthlyRevenue: calcMonthlyRevenue(customerForm),
      },
    };
  }

  async function addCustomerAndProvision() {
    if (
      !customerForm.companyName ||
      !customerForm.contactName ||
      !customerForm.email ||
      !customerForm.domain
    ) {
      return;
    }

    setIsProvisioning(true);

    const customer = createCustomerDraft();
    setCustomers((prev) => [customer, ...prev]);
    setSelectedCustomerId(customer.id);

    const requestEntries = [];

    try {
      const deployResult = await apiRequest(settings, "POST", "/api/deployments", {
        customerId: customer.id,
        projectName: slugify(customer.companyName || customer.domain),
        domain: customer.domain,
        packageCode: customer.packageCode,
        addOns: customer.extras,
      });

      requestEntries.push({
        id:
          (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
          `req-${Date.now()}-1`,
        at: new Date().toISOString(),
        type: "CREATE_DEPLOYMENT",
        result: deployResult,
      });

      const deploymentId =
        (deployResult &&
          deployResult.data &&
          deployResult.data.data &&
          deployResult.data.data.deploymentId) ||
        (deployResult && deployResult.data && deployResult.data.deploymentId) ||
        "";

      const deploymentStatus =
        (deployResult &&
          deployResult.data &&
          deployResult.data.data &&
          deployResult.data.data.status) ||
        (deployResult && deployResult.data && deployResult.data.status) ||
        (deployResult.ok ? "PENDING" : "FAILED");

      setCustomers((prev) =>
        prev.map((item) =>
          item.id === customer.id
            ? {
                ...item,
                deploymentId,
                deploymentStatus,
                deploymentStage:
                  (deployResult &&
                    deployResult.data &&
                    deployResult.data.data &&
                    deployResult.data.data.currentStage) ||
                  (deployResult && deployResult.data && deployResult.data.currentStage) ||
                  null,
                status: deployResult.ok ? "provisioning" : "failed",
                requestHistory: requestEntries,
              }
            : item
        )
      );

      if (settings.autoProvisionMail) {
        const mailResult = await apiRequest(
          settings,
          "POST",
          `/api/customers/${customer.id}/provision-mail`,
          {
            domain: customer.domain,
            packageCode: customer.packageCode,
          }
        );

        requestEntries.push({
          id:
            (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
            `req-${Date.now()}-2`,
          at: new Date().toISOString(),
          type: "PROVISION_MAIL",
          result: mailResult,
        });

        setCustomers((prev) =>
          prev.map((item) =>
            item.id === customer.id
              ? {
                  ...item,
                  mailProvisioned: mailResult.ok,
                  status: deployResult.ok
                    ? mailResult.ok
                      ? "active"
                      : "warning"
                    : "failed",
                  requestHistory: requestEntries,
                }
              : item
          )
        );
      } else {
        setCustomers((prev) =>
          prev.map((item) =>
            item.id === customer.id
              ? {
                  ...item,
                  status: deployResult.ok ? "active" : "failed",
                  requestHistory: requestEntries,
                }
              : item
          )
        );
      }

      setRequestLog((prev) => [...requestEntries, ...prev].slice(0, 100));
      setCustomerForm(DEFAULT_CUSTOMER_FORM);
      setActiveTab("customers");
    } catch (error) {
      const failedEntry = {
        id:
          (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
          `req-${Date.now()}-x`,
        at: new Date().toISOString(),
        type: "UNKNOWN_ERROR",
        result: {
          ok: false,
          status: 0,
          data: {
            message: error instanceof Error ? error.message : "Unknown error",
          },
        },
      };

      requestEntries.push(failedEntry);
      setRequestLog((prev) => [failedEntry, ...prev].slice(0, 100));

      setCustomers((prev) =>
        prev.map((item) =>
          item.id === customer.id
            ? {
                ...item,
                status: "failed",
                requestHistory: requestEntries,
              }
            : item
        )
      );
    } finally {
      setIsProvisioning(false);
    }
  }

  async function refreshCustomerDeployment(customer) {
    if (!customer || !customer.deploymentId) return;

    const result = await apiRequest(
      settings,
      "GET",
      `/api/deployments/${customer.deploymentId}`
    );

    const deployment = (result && result.data && result.data.data) || result.data || {};
    const normalizedStatus = String(deployment.status || "").toUpperCase();

    let nextStatus = customer.status;
    if (normalizedStatus === "SUCCEEDED") nextStatus = "active";
    if (normalizedStatus === "FAILED") nextStatus = "failed";
    if (normalizedStatus === "IN_PROGRESS" || normalizedStatus === "PENDING") {
      nextStatus = "provisioning";
    }

    const historyEntry = {
      id:
        (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
        `refresh-${Date.now()}`,
      at: new Date().toISOString(),
      type: "GET_DEPLOYMENT",
      result,
    };

    setCustomers((prev) =>
      prev.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              deploymentStatus: deployment.status || item.deploymentStatus,
              deploymentStage: deployment.currentStage || item.deploymentStage,
              status: nextStatus,
              requestHistory: [historyEntry, ...(item.requestHistory || [])].slice(0, 20),
            }
          : item
      )
    );

    setRequestLog((prev) => [historyEntry, ...prev].slice(0, 100));
  }

  async function redeployCustomer(customer) {
    if (!customer || !customer.deploymentId) return;

    const result = await apiRequest(
      settings,
      "POST",
      `/api/deployments/${customer.deploymentId}/redeploy`,
      { mode: "CONTENT_ONLY" }
    );

    const historyEntry = {
      id:
        (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
        `redeploy-${Date.now()}`,
      at: new Date().toISOString(),
      type: "REDEPLOY",
      result,
    };

    setCustomers((prev) =>
      prev.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: result.ok ? "provisioning" : "failed",
              requestHistory: [historyEntry, ...(item.requestHistory || [])].slice(0, 20),
            }
          : item
      )
    );

    setRequestLog((prev) => [historyEntry, ...prev].slice(0, 100));
  }

  async function deleteCustomerDeployment(customer) {
    if (!customer || !customer.deploymentId) return;

    const result = await apiRequest(
      settings,
      "POST",
      `/api/deployments/${customer.deploymentId}/delete`,
      {}
    );

    const historyEntry = {
      id:
        (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
        `delete-${Date.now()}`,
      at: new Date().toISOString(),
      type: "DELETE_DEPLOYMENT",
      result,
    };

    setCustomers((prev) =>
      prev.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: result.ok ? "cancelled" : "failed",
              requestHistory: [historyEntry, ...(item.requestHistory || [])].slice(0, 20),
            }
          : item
      )
    );

    setRequestLog((prev) => [historyEntry, ...prev].slice(0, 100));
  }

  function saveCustomerEdits(nextCustomer) {
    setCustomers((prev) =>
      prev.map((item) => (item.id === nextCustomer.id ? nextCustomer : item))
    );
  }

  function removeCustomer(customerId) {
    setCustomers((prev) => prev.filter((item) => item.id !== customerId));
    if (selectedCustomerId === customerId) {
      setSelectedCustomerId(null);
    }
  }

  function addExpense() {
    if (!expenseForm.title || !expenseForm.amount) return;

    const nextExpense = {
      id:
        (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
        `exp-${Date.now()}`,
      title: expenseForm.title,
      amount: Number(expenseForm.amount),
      date: expenseForm.date,
      category: expenseForm.category,
      createdAt: new Date().toISOString(),
    };

    setExpenses((prev) => [nextExpense, ...prev]);
    setExpenseForm(DEFAULT_EXPENSE_FORM);
  }

  function uploadDocuments(customerId, files) {
    const fileArray = Array.from(files || []);

    Promise.all(
      fileArray.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id:
                  (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
                  `doc-${Date.now()}-${file.name}`,
                name: file.name,
                type: file.type,
                size: file.size,
                uploadedAt: new Date().toISOString(),
                dataUrl: typeof reader.result === "string" ? reader.result : "",
              });
            reader.readAsDataURL(file);
          })
      )
    ).then((docs) => {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === customerId
            ? {
                ...customer,
                documents: [...(customer.documents || []), ...docs],
              }
            : customer
        )
      );
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 22,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Vedantix Admin Dashboard
            </h1>
            <p style={{ color: "#64748b", fontSize: 15 }}>
              Overzichtelijke CRM, deployment monitoring en financieel dashboard.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 18,
              padding: 8,
              boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
            }}
          >
            {[
              ["dashboard", "Dashboard"],
              ["customers", "Klanten"],
              ["finance", "Financiën"],
              ["settings", "Instellingen"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                style={{
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  background: activeTab === key ? "#0f172a" : "transparent",
                  color: activeTab === key ? "#ffffff" : "#475569",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 16,
              }}
            >
              <StatCard
                title="Totaal klanten"
                value={customers.length}
                subtitle={`${activeCustomers} live`}
                tone="#10b981"
              />
              <StatCard
                title="MRR"
                value={currency(totalMonthlyRevenue)}
                subtitle="Maandelijkse omzet"
                tone="#0ea5e9"
              />
              <StatCard
                title="Uitgaven"
                value={currency(totalMonthlyCosts)}
                subtitle="Infra + handmatige kosten"
                tone="#f97316"
              />
              <StatCard
                title="Fouten"
                value={failedCustomers}
                subtitle="Sites met deployment issues"
                tone="#ef4444"
              />
              <StatCard
                title="Waarschuwingen"
                value={warningCustomers}
                subtitle="Aandacht vereist"
                tone="#f59e0b"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: 18,
              }}
            >
              <Card>
                <SectionTitle
                  title="Nieuwe klant"
                  subtitle="Vul alleen de essentiële gegevens in. Met één knop wordt deployment en optioneel mail gestart."
                  action={
                    <Button
                      tone="primary"
                      onClick={addCustomerAndProvision}
                      disabled={isProvisioning}
                    >
                      {isProvisioning ? "Bezig..." : "Klant aanmaken en regelen"}
                    </Button>
                  }
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
                      value={customerForm.companyName}
                      onChange={(e) => updateCustomerForm("companyName", e.target.value)}
                      placeholder="Vedantix Example"
                    />
                  </Field>

                  <Field label="Contactpersoon">
                    <Input
                      value={customerForm.contactName}
                      onChange={(e) => updateCustomerForm("contactName", e.target.value)}
                      placeholder="Rishwi Jagesar"
                    />
                  </Field>

                  <Field label="E-mail">
                    <Input
                      value={customerForm.email}
                      onChange={(e) => updateCustomerForm("email", e.target.value)}
                      placeholder="info@bedrijf.nl"
                    />
                  </Field>

                  <Field label="Telefoon">
                    <Input
                      value={customerForm.phone}
                      onChange={(e) => updateCustomerForm("phone", e.target.value)}
                      placeholder="+31 6 12345678"
                    />
                  </Field>

                  <Field label="Domeinnaam">
                    <Input
                      value={customerForm.domain}
                      onChange={(e) => updateCustomerForm("domain", e.target.value)}
                      placeholder="bedrijf.nl"
                    />
                  </Field>

                  <Field label="Pakket">
                    <Select
                      value={customerForm.packageCode}
                      onChange={(e) => updateCustomerForm("packageCode", e.target.value)}
                    >
                      {PACKAGE_OPTIONS.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.label} — {currency(item.monthlyPrice)}/m
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Geschatte infra-kosten p/m">
                    <Input
                      type="number"
                      min="0"
                      value={customerForm.monthlyInfraCost}
                      onChange={(e) =>
                        updateCustomerForm("monthlyInfraCost", e.target.value)
                      }
                    />
                  </Field>

                  <Field label="Extra’s">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: 10,
                        border: "1px solid #cbd5e1",
                        borderRadius: 14,
                        padding: 12,
                        background: "#ffffff",
                      }}
                    >
                      {EXTRA_OPTIONS.map((extra) => (
                        <label
                          key={extra.code}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            color: "#334155",
                            fontSize: 14,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={customerForm.extras.includes(extra.code)}
                            onChange={() => toggleExtra(extra.code)}
                          />
                          <span>
                            {extra.label} ({currency(extra.monthlyPrice)})
                          </span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <Field label="Notities">
                      <Textarea
                        value={customerForm.notes}
                        onChange={(e) => updateCustomerForm("notes", e.target.value)}
                        placeholder="Opmerkingen, wensen, intake-info..."
                      />
                    </Field>
                  </div>
                </div>
              </Card>

              <Card>
                <SectionTitle
                  title="Snelle status"
                  subtitle="Direct zicht op klanten die aandacht nodig hebben."
                />

                <div style={{ display: "grid", gap: 12 }}>
                  {customers.slice(0, 8).map((customer) => (
                    <div
                      key={customer.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        border: "1px solid #e2e8f0",
                        borderRadius: 16,
                        padding: 14,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedCustomerId(customer.id);
                        setActiveTab("customers");
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800 }}>{customer.companyName}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>{customer.domain}</div>
                      </div>
                      <div
                        style={{
                          padding: "6px 10px",
                          borderRadius: 999,
                          background: `${STATUS_COLORS[customer.status] || "#94a3b8"}20`,
                          color: STATUS_COLORS[customer.status] || "#94a3b8",
                          fontWeight: 800,
                          fontSize: 12,
                        }}
                      >
                        {STATUS_LABELS[customer.status] || customer.status}
                      </div>
                    </div>
                  ))}

                  {customers.length === 0 ? (
                    <div style={{ color: "#64748b" }}>Nog geen klanten toegevoegd.</div>
                  ) : null}
                </div>
              </Card>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: 18,
              }}
            >
              <Card>
                <SectionTitle
                  title="Omzet, uitgaven en winst"
                  subtitle="Grafiek op basis van klanten en handmatige uitgaven."
                  action={
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {TIME_FILTERS.map((item) => (
                        <Button
                          key={item.key}
                          tone={financeFilter === item.key ? "primary" : "default"}
                          onClick={() => setFinanceFilter(item.key)}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  }
                />

                <div style={{ width: "100%", height: 340 }}>
                  <ResponsiveContainer>
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorOmzet" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.03} />
                        </linearGradient>
                        <linearGradient id="colorWinst" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.03} />
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
                        fill="url(#colorOmzet)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="winst"
                        stroke="#10b981"
                        fill="url(#colorWinst)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <SectionTitle
                  title="Statusverdeling"
                  subtitle="Welke klanten live zijn, fouten hebben of aandacht nodig hebben."
                />

                <div style={{ width: "100%", height: 340 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={4}
                      >
                        {statusChartData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {statusChartData.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                        color: "#334155",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 999,
                            background: item.color,
                            display: "inline-block",
                          }}
                        />
                        {item.name}
                      </span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: selectedCustomer ? "0.95fr 1.05fr" : "1fr",
              gap: 18,
            }}
          >
            <Card>
              <SectionTitle
                title="Klanten"
                subtitle="Klik op een klant voor detailinformatie, documenten en acties."
                action={
                  <Input
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    placeholder="Zoek op bedrijf, contact, domein..."
                    style={{ minWidth: 280 }}
                  />
                }
              />

              <div style={{ display: "grid", gap: 12 }}>
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => setSelectedCustomerId(customer.id)}
                    style={{
                      border:
                        selectedCustomerId === customer.id
                          ? "2px solid #0f172a"
                          : "1px solid #e2e8f0",
                      borderRadius: 18,
                      padding: 16,
                      cursor: "pointer",
                      background: selectedCustomerId === customer.id ? "#f8fafc" : "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr auto auto",
                        gap: 16,
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 4 }}>
                          {customer.companyName}
                        </div>
                        <div style={{ color: "#64748b", fontSize: 14 }}>
                          {customer.contactName} · {customer.email}
                        </div>
                        <div style={{ color: "#334155", fontSize: 14, marginTop: 6 }}>
                          {customer.domain}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            background: `${STATUS_COLORS[customer.status] || "#94a3b8"}20`,
                            color: STATUS_COLORS[customer.status] || "#94a3b8",
                            fontWeight: 900,
                            fontSize: 12,
                            marginBottom: 8,
                          }}
                        >
                          {STATUS_LABELS[customer.status] || customer.status}
                        </div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>
                          {packageMeta(customer.packageCode).label}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 900, fontSize: 18 }}>
                          {currency(calcMonthlyRevenue(customer))}
                        </div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>per maand</div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredCustomers.length === 0 ? (
                  <div style={{ color: "#64748b" }}>Geen klanten gevonden.</div>
                ) : null}
              </div>
            </Card>

            {selectedCustomer ? (
              <Card>
                <SectionTitle
                  title={selectedCustomer.companyName}
                  subtitle={`${selectedCustomer.contactName} · ${selectedCustomer.email}`}
                  action={
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Button onClick={() => refreshCustomerDeployment(selectedCustomer)} tone="soft">
                        Refresh status
                      </Button>
                      <Button onClick={() => redeployCustomer(selectedCustomer)}>
                        Redeploy
                      </Button>
                      <Button
                        onClick={() => deleteCustomerDeployment(selectedCustomer)}
                        tone="danger"
                      >
                        Verwijder deployment
                      </Button>
                    </div>
                  }
                />

                <div style={{ display: "grid", gap: 18 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 14,
                    }}
                  >
                    <Field label="Bedrijfsnaam">
                      <Input
                        value={selectedCustomer.companyName}
                        onChange={(e) =>
                          saveCustomerEdits({
                            ...selectedCustomer,
                            companyName: e.target.value,
                          })
                        }
                      />
                    </Field>

                    <Field label="Contactpersoon">
                      <Input
                        value={selectedCustomer.contactName}
                        onChange={(e) =>
                          saveCustomerEdits({
                            ...selectedCustomer,
                            contactName: e.target.value,
                          })
                        }
                      />
                    </Field>

                    <Field label="E-mail">
                      <Input
                        value={selectedCustomer.email}
                        onChange={(e) =>
                          saveCustomerEdits({
                            ...selectedCustomer,
                            email: e.target.value,
                          })
                        }
                      />
                    </Field>

                    <Field label="Telefoon">
                      <Input
                        value={selectedCustomer.phone}
                        onChange={(e) =>
                          saveCustomerEdits({
                            ...selectedCustomer,
                            phone: e.target.value,
                          })
                        }
                      />
                    </Field>

                    <Field label="Domein">
                      <Input
                        value={selectedCustomer.domain}
                        onChange={(e) =>
                          saveCustomerEdits({
                            ...selectedCustomer,
                            domain: e.target.value,
                          })
                        }
                      />
                    </Field>

                    <Field label="Pakket">
                      <Select
                        value={selectedCustomer.packageCode}
                        onChange={(e) =>
                          saveCustomerEdits({
                            ...selectedCustomer,
                            packageCode: e.target.value,
                            finance: {
                              ...selectedCustomer.finance,
                              monthlyRevenue: calcMonthlyRevenue({
                                ...selectedCustomer,
                                packageCode: e.target.value,
                              }),
                            },
                          })
                        }
                      >
                        {PACKAGE_OPTIONS.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.label}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field label="Deployment ID">
                      <Input value={selectedCustomer.deploymentId || ""} readOnly />
                    </Field>

                    <Field label="Deployment status">
                      <Input value={selectedCustomer.deploymentStatus || ""} readOnly />
                    </Field>
                  </div>

                  <Card style={{ background: "#f8fafc", padding: 18 }}>
                    <SectionTitle
                      title="Documenten"
                      subtitle="Upload bijvoorbeeld contracten of intakebestanden."
                      action={
                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 14px",
                            borderRadius: 12,
                            border: "1px solid #cbd5e1",
                            background: "#ffffff",
                            cursor: "pointer",
                            fontWeight: 800,
                          }}
                        >
                          Upload document
                          <input
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) =>
                              uploadDocuments(selectedCustomer.id, e.target.files)
                            }
                          />
                        </label>
                      }
                    />

                    <div style={{ display: "grid", gap: 10 }}>
                      {(selectedCustomer.documents || []).map((doc) => (
                        <div
                          key={doc.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 16,
                            alignItems: "center",
                            padding: 14,
                            borderRadius: 14,
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

                      {(selectedCustomer.documents || []).length === 0 ? (
                        <div style={{ color: "#64748b" }}>Nog geen documenten.</div>
                      ) : null}
                    </div>
                  </Card>

                  <Card style={{ background: "#f8fafc", padding: 18 }}>
                    <SectionTitle
                      title="Recente backend acties"
                      subtitle="Laatste calls voor deze klant."
                    />
                    <div style={{ display: "grid", gap: 10 }}>
                      {(selectedCustomer.requestHistory || []).map((entry) => (
                        <div
                          key={entry.id}
                          style={{
                            borderRadius: 14,
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

                      {(selectedCustomer.requestHistory || []).length === 0 ? (
                        <div style={{ color: "#64748b" }}>Nog geen backend acties.</div>
                      ) : null}
                    </div>
                  </Card>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button tone="danger" onClick={() => removeCustomer(selectedCustomer.id)}>
                      Klant verwijderen
                    </Button>
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        )}

        {activeTab === "finance" && (
          <div style={{ display: "grid", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Financieel overzicht"
                subtitle="Inkomsten, uitgaven, omzet en winst met periodefilter."
                action={
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {TIME_FILTERS.map((item) => (
                      <Button
                        key={item.key}
                        tone={financeFilter === item.key ? "primary" : "default"}
                        onClick={() => setFinanceFilter(item.key)}
                      >
                        {item.label}
                      </Button>
                    ))}
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
                  title="Omzet"
                  value={currency(
                    financeCustomers.reduce(
                      (sum, customer) => sum + calcMonthlyRevenue(customer),
                      0
                    )
                  )}
                  subtitle={`Filter: ${TIME_FILTERS.find((i) => i.key === financeFilter)?.label}`}
                  tone="#0ea5e9"
                />
                <StatCard
                  title="Uitgaven"
                  value={currency(
                    financeExpenses.reduce(
                      (sum, expense) => sum + Number(expense.amount || 0),
                      0
                    ) +
                      customers.reduce(
                        (sum, customer) => sum + Number(customer.monthlyInfraCost || 0),
                        0
                      )
                  )}
                  subtitle="Handmatig + infra"
                  tone="#f97316"
                />
                <StatCard
                  title="Winst"
                  value={currency(
                    financeCustomers.reduce(
                      (sum, customer) => sum + calcMonthlyRevenue(customer),
                      0
                    ) -
                      (financeExpenses.reduce(
                        (sum, expense) => sum + Number(expense.amount || 0),
                        0
                      ) +
                        customers.reduce(
                          (sum, customer) =>
                            sum + Number(customer.monthlyInfraCost || 0),
                          0
                        ))
                  )}
                  subtitle="Geschat"
                  tone="#10b981"
                />
                <StatCard
                  title="Gemiddelde per klant"
                  value={currency(
                    customers.length ? totalMonthlyRevenue / customers.length : 0
                  )}
                  subtitle="MRR per klant"
                  tone="#8b5cf6"
                />
              </div>
            </Card>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: 18,
              }}
            >
              <Card>
                <SectionTitle
                  title="Pakketten en omzet"
                  subtitle="Aantal klanten en omzet per pakket."
                />
                <div style={{ width: "100%", height: 340 }}>
                  <ResponsiveContainer>
                    <BarChart data={packageChartData}>
                      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="klanten" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="omzet" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <SectionTitle
                  title="Uitgave toevoegen"
                  subtitle="Voeg handmatige kosten toe voor een compleet overzicht."
                  action={
                    <Button tone="primary" onClick={addExpense}>
                      Opslaan
                    </Button>
                  }
                />
                <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                  <Field label="Titel">
                    <Input
                      value={expenseForm.title}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Hosting, software, advertentie..."
                    />
                  </Field>

                  <Field label="Bedrag">
                    <Input
                      type="number"
                      min="0"
                      value={expenseForm.amount}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({ ...prev, amount: e.target.value }))
                      }
                      placeholder="0"
                    />
                  </Field>

                  <Field label="Datum">
                    <Input
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({ ...prev, date: e.target.value }))
                      }
                    />
                  </Field>

                  <Field label="Categorie">
                    <Select
                      value={expenseForm.category}
                      onChange={(e) =>
                        setExpenseForm((prev) => ({ ...prev, category: e.target.value }))
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
                </div>

                <div style={{ display: "grid", gap: 10, maxHeight: 300, overflow: "auto" }}>
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: 12,
                        borderRadius: 14,
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800 }}>{expense.title}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>
                          {expense.category} · {dateLabel(expense.date)}
                        </div>
                      </div>
                      <div style={{ fontWeight: 900 }}>{currency(expense.amount)}</div>
                    </div>
                  ))}

                  {expenses.length === 0 ? (
                    <div style={{ color: "#64748b" }}>Nog geen uitgaven toegevoegd.</div>
                  ) : null}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Backend instellingen"
                subtitle="Koppeling met de provisioning backend."
              />

              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Base URL">
                  <Input
                    value={settings.baseUrl}
                    onChange={(e) => updateSettings("baseUrl", e.target.value)}
                    placeholder="/provisioning-api"
                  />
                </Field>

                <Field label="API key">
                  <Input
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => updateSettings("apiKey", e.target.value)}
                    placeholder="PROVISIONING_API_KEY"
                  />
                </Field>

                <Field label="Tenant ID">
                  <Input
                    value={settings.tenantId}
                    onChange={(e) => updateSettings("tenantId", e.target.value)}
                    placeholder="default"
                  />
                </Field>

                <Field label="Actor ID">
                  <Input
                    value={settings.actorId}
                    onChange={(e) => updateSettings("actorId", e.target.value)}
                    placeholder="admin-dashboard"
                  />
                </Field>

                <Field label="Source">
                  <Select
                    value={settings.source}
                    onChange={(e) => updateSettings("source", e.target.value)}
                  >
                    <option value="ADMIN_PANEL">ADMIN_PANEL</option>
                    <option value="API">API</option>
                    <option value="SYSTEM">SYSTEM</option>
                    <option value="WORKER">WORKER</option>
                  </Select>
                </Field>

                <Field label="Standaard mailbox local part">
                  <Input
                    value={settings.defaultMailboxLocalPart}
                    onChange={(e) =>
                      updateSettings("defaultMailboxLocalPart", e.target.value)
                    }
                    placeholder="info"
                  />
                </Field>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#334155",
                    fontWeight: 800,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(settings.autoIdempotency)}
                    onChange={(e) =>
                      updateSettings("autoIdempotency", e.target.checked)
                    }
                  />
                  Automatisch idempotency key toevoegen
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#334155",
                    fontWeight: 800,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(settings.autoProvisionMail)}
                    onChange={(e) =>
                      updateSettings("autoProvisionMail", e.target.checked)
                    }
                  />
                  Automatisch mail provisioning starten na deploy
                </label>
              </div>
            </Card>

            <Card>
              <SectionTitle
                title="Laatste backend calls"
                subtitle="Globale log over alle uitgevoerde acties."
              />

              <div style={{ display: "grid", gap: 10, maxHeight: 560, overflow: "auto" }}>
                {requestLog.map((entry) => (
                  <div
                    key={entry.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 16,
                      padding: 14,
                      background: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                        marginBottom: 8,
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
                    <div style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>
                      {dateLabel(entry.at)}
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

                {requestLog.length === 0 ? (
                  <div style={{ color: "#64748b" }}>Nog geen backend calls.</div>
                ) : null}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}