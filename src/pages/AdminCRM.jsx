import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const STORAGE_KEYS = {
  settings: "vedantix_admin_settings_v8",
  customers: "vedantix_admin_customers_v8",
  expenses: "vedantix_admin_expenses_v8",
  requestLog: "vedantix_admin_request_log_v8",
  packageOptions: "vedantix_package_options_v2",
  extraOptions: "vedantix_extra_options_v2",
};

const DEFAULT_PACKAGE_OPTIONS = [
  {
    code: "STARTER",
    label: "Starter",
    monthlyPrice: 99,
    setupPrice: 500,
    monthlyInfraCost: 8,
    isActive: true,
    sortOrder: 1,
  },
  {
    code: "GROWTH",
    label: "Growth",
    monthlyPrice: 149,
    setupPrice: 850,
    monthlyInfraCost: 12,
    isActive: true,
    sortOrder: 2,
  },
  {
    code: "PRO",
    label: "Pro",
    monthlyPrice: 249,
    setupPrice: 1250,
    monthlyInfraCost: 18,
    isActive: true,
    sortOrder: 3,
  },
  {
    code: "CUSTOM",
    label: "Custom",
    monthlyPrice: 399,
    setupPrice: 2000,
    monthlyInfraCost: 25,
    isActive: true,
    sortOrder: 4,
  },
];

const DEFAULT_EXTRA_OPTIONS = [
  {
    code: "BLOG",
    label: "Blog / FAQ",
    monthlyPrice: 15,
    setupPrice: 100,
    monthlyInfraCost: 0,
    isActive: true,
    sortOrder: 1,
  },
  {
    code: "BOOKING",
    label: "Reserveringen",
    monthlyPrice: 25,
    setupPrice: 250,
    monthlyInfraCost: 2,
    isActive: true,
    sortOrder: 2,
  },
  {
    code: "ANALYTICS",
    label: "Analytics+",
    monthlyPrice: 10,
    setupPrice: 50,
    monthlyInfraCost: 0,
    isActive: true,
    sortOrder: 3,
  },
  {
    code: "CRM",
    label: "CRM module",
    monthlyPrice: 25,
    setupPrice: 300,
    monthlyInfraCost: 3,
    isActive: true,
    sortOrder: 4,
  },
  {
    code: "FORMS",
    label: "Form opslag",
    monthlyPrice: 12,
    setupPrice: 75,
    monthlyInfraCost: 1,
    isActive: true,
    sortOrder: 5,
  },
  {
    code: "SEO_PLUS",
    label: "Local SEO+",
    monthlyPrice: 20,
    setupPrice: 150,
    monthlyInfraCost: 0,
    isActive: true,
    sortOrder: 6,
  },
  {
    code: "EXTRA_MAILBOX",
    label: "Extra mailbox",
    monthlyPrice: 7,
    setupPrice: 0,
    monthlyInfraCost: 1,
    isActive: true,
    sortOrder: 7,
  },
  {
    code: "PRIORITY_SUPPORT",
    label: "Priority support",
    monthlyPrice: 35,
    setupPrice: 0,
    monthlyInfraCost: 0,
    isActive: true,
    sortOrder: 8,
  },
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
  apiKey: "d1e07740dce2a9102635aee441926de52e341fde95cfa10778e465d64d0f6251",
  tenantId: "default",
  actorId: "admin-dashboard",
  source: "ADMIN_PANEL",
  autoIdempotency: true,
  autoProvisionMail: true,
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
  address: "",
  postalCode: "",
  city: "",
  country: "Nederland",
};

const DEFAULT_EXPENSE_FORM = {
  title: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Overig",
  customerId: "",
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

function activePackageOptions(options) {
  return [...options]
    .filter((item) => item.isActive !== false)
    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
}

function activeExtraOptions(options) {
  return [...options]
    .filter((item) => item.isActive !== false)
    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
}

function packageMeta(packageCode, packageOptions) {
  return (
    packageOptions.find((item) => item.code === packageCode) ||
    packageOptions[0] ||
    DEFAULT_PACKAGE_OPTIONS[0]
  );
}

function extraMeta(code, extraOptions) {
  return extraOptions.find((item) => item.code === code) || null;
}

function extrasMonthlyPrice(extras, extraOptions) {
  return (extras || []).reduce((sum, code) => {
    const item = extraMeta(code, extraOptions);
    return sum + Number(item?.monthlyPrice || 0);
  }, 0);
}

function extrasSetupPrice(extras, extraOptions) {
  return (extras || []).reduce((sum, code) => {
    const item = extraMeta(code, extraOptions);
    return sum + Number(item?.setupPrice || 0);
  }, 0);
}

function extrasInfraCost(extras, extraOptions) {
  return (extras || []).reduce((sum, code) => {
    const item = extraMeta(code, extraOptions);
    return sum + Number(item?.monthlyInfraCost || 0);
  }, 0);
}

function calcMonthlyRevenue(customer, packageOptions, extraOptions) {
  return (
    Number(packageMeta(customer.packageCode, packageOptions).monthlyPrice || 0) +
    extrasMonthlyPrice(customer.extras || [], extraOptions)
  );
}

function calcSetupRevenue(customer, packageOptions, extraOptions) {
  return (
    Number(packageMeta(customer.packageCode, packageOptions).setupPrice || 0) +
    extrasSetupPrice(customer.extras || [], extraOptions)
  );
}

function calcMonthlyInfraCost(customer, packageOptions, extraOptions) {
  return (
    Number(packageMeta(customer.packageCode, packageOptions).monthlyInfraCost || 0) +
    extrasInfraCost(customer.extras || [], extraOptions)
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

function periodMultiplier(filterKey) {
  if (filterKey === "day") return 1 / 30;
  if (filterKey === "week") return 7 / 30;
  if (filterKey === "month") return 1;
  if (filterKey === "quarter") return 3;
  if (filterKey === "halfyear") return 6;
  return 12;
}

function isWithinFilter(dateString, filterKey) {
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

function buildCustomerPeriodStats(
  customer,
  expenses,
  filterKey,
  packageOptions,
  extraOptions
) {
  const multiplier = periodMultiplier(filterKey);
  const revenue = calcMonthlyRevenue(customer, packageOptions, extraOptions) * multiplier;
  const infraCost = calcMonthlyInfraCost(customer, packageOptions, extraOptions) * multiplier;

  const directExpenses = expenses
    .filter((expense) => expense.customerId === customer.id)
    .filter((expense) => isWithinFilter(expense.date, filterKey))
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const totalCost = infraCost + directExpenses;

  return {
    revenue,
    cost: totalCost,
    profit: revenue - totalCost,
    directExpenses,
    infraCost,
  };
}

function buildCustomerTrendData(
  customer,
  expenses,
  filterKey,
  packageOptions,
  extraOptions
) {
  const useMonths =
    filterKey === "quarter" || filterKey === "halfyear" || filterKey === "year";

  const points =
    filterKey === "day"
      ? 1
      : filterKey === "week"
        ? 7
        : filterKey === "month"
          ? 30
          : filterKey === "quarter"
            ? 3
            : filterKey === "halfyear"
              ? 6
              : 12;

  const rows = [];

  for (let i = points - 1; i >= 0; i -= 1) {
    const base = new Date();

    if (useMonths) {
      base.setMonth(base.getMonth() - i);
      const month = base.getMonth();
      const year = base.getFullYear();

      const revenue = calcMonthlyRevenue(customer, packageOptions, extraOptions);
      const infraCost = calcMonthlyInfraCost(customer, packageOptions, extraOptions);

      const directExpenses = expenses
        .filter((expense) => expense.customerId === customer.id)
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
        omzet: revenue,
        kosten: infraCost + directExpenses,
        winst: revenue - (infraCost + directExpenses),
      });
    } else {
      base.setDate(base.getDate() - i);
      const iso = base.toISOString().slice(0, 10);
      const revenue = calcMonthlyRevenue(customer, packageOptions, extraOptions) / 30;
      const infraCost = calcMonthlyInfraCost(customer, packageOptions, extraOptions) / 30;

      const directExpenses = expenses
        .filter((expense) => expense.customerId === customer.id)
        .filter((expense) => String(expense.date).slice(0, 10) === iso)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

      rows.push({
        label: base.toLocaleDateString("nl-NL", {
          day: "2-digit",
          month: "2-digit",
        }),
        omzet: Math.round(revenue),
        kosten: Math.round(infraCost + directExpenses),
        winst: Math.round(revenue - (infraCost + directExpenses)),
      });
    }
  }

  return rows;
}

function buildDashboardTrendData(
  customers,
  expenses,
  filterKey,
  packageOptions,
  extraOptions
) {
  const useMonths =
    filterKey === "quarter" || filterKey === "halfyear" || filterKey === "year";

  const points =
    filterKey === "day"
      ? 1
      : filterKey === "week"
        ? 7
        : filterKey === "month"
          ? 30
          : filterKey === "quarter"
            ? 3
            : filterKey === "halfyear"
              ? 6
              : 12;

  const rows = [];

  for (let i = points - 1; i >= 0; i -= 1) {
    const base = new Date();

    if (useMonths) {
      base.setMonth(base.getMonth() - i);
      const month = base.getMonth();
      const year = base.getFullYear();

      const revenue = customers.reduce(
        (sum, customer) => sum + calcMonthlyRevenue(customer, packageOptions, extraOptions),
        0
      );

      const infraCost = customers.reduce(
        (sum, customer) => sum + calcMonthlyInfraCost(customer, packageOptions, extraOptions),
        0
      );

      const directExpenses = expenses
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
        omzet: revenue,
        kosten: infraCost + directExpenses,
        winst: revenue - (infraCost + directExpenses),
      });
    } else {
      base.setDate(base.getDate() - i);
      const iso = base.toISOString().slice(0, 10);

      const revenue =
        customers.reduce(
          (sum, customer) => sum + calcMonthlyRevenue(customer, packageOptions, extraOptions),
          0
        ) / 30;

      const infraCost =
        customers.reduce(
          (sum, customer) => sum + calcMonthlyInfraCost(customer, packageOptions, extraOptions),
          0
        ) / 30;

      const directExpenses = expenses
        .filter((expense) => String(expense.date).slice(0, 10) === iso)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

      rows.push({
        label: base.toLocaleDateString("nl-NL", {
          day: "2-digit",
          month: "2-digit",
        }),
        omzet: Math.round(revenue),
        kosten: Math.round(infraCost + directExpenses),
        winst: Math.round(revenue - (infraCost + directExpenses)),
      });
    }
  }

  return rows;
}

function BrandLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 18,
          background:
            "linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #38bdf8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 16px 40px rgba(29,78,216,0.24)",
          color: "#ffffff",
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: "-0.03em",
        }}
      >
        V
      </div>

      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#0f172a",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          Vedantix
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#64748b",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Admin dashboard
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, tone = "#0ea5e9" }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
        border: "1px solid #dbe4ef",
        borderRadius: 22,
        padding: 20,
        boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ color: "#64748b", fontSize: 13, fontWeight: 800, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ color: "#0f172a", fontSize: 30, fontWeight: 900, marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ color: tone, fontSize: 13, fontWeight: 800 }}>{subtitle}</div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,252,255,0.98) 100%)",
        border: "1px solid #dbe4ef",
        borderRadius: 28,
        padding: 22,
        boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
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
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#0f172a",
            marginBottom: 8,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>{subtitle}</p>
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
    style = {},
  } = props;

  const buttonType = type === "submit" || type === "reset" ? type : "button";

  const styles = {
    default: {
      background: "#ffffff",
      color: "#0f172a",
      border: "1px solid #cbd5e1",
      boxShadow: "0 8px 20px rgba(15,23,42,0.05)",
    },
    primary: {
      background: "linear-gradient(135deg, #0f172a 0%, #172554 100%)",
      color: "#ffffff",
      border: "1px solid #0f172a",
      boxShadow: "0 14px 30px rgba(15,23,42,0.18)",
    },
    success: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "#ffffff",
      border: "1px solid #059669",
      boxShadow: "0 14px 30px rgba(16,185,129,0.2)",
    },
    danger: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      color: "#ffffff",
      border: "1px solid #dc2626",
      boxShadow: "0 14px 30px rgba(239,68,68,0.16)",
    },
    soft: {
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      color: "#1d4ed8",
      border: "1px solid #bfdbfe",
      boxShadow: "0 10px 22px rgba(59,130,246,0.08)",
    },
  };

  const selected = styles[tone] || styles.default;

  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "11px 16px",
        borderRadius: 14,
        fontWeight: 800,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.18s ease",
        ...selected,
        ...style,
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
        borderRadius: 18,
        border: "1px solid #cbd5e1",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        padding: "14px 16px",
        color: "#0f172a",
        outline: "none",
        fontSize: 15,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
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
        borderRadius: 18,
        border: "1px solid #cbd5e1",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        padding: "14px 16px",
        color: "#0f172a",
        outline: "none",
        fontSize: 15,
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
        borderRadius: 18,
        border: "1px solid #cbd5e1",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        padding: "14px 16px",
        color: "#0f172a",
        outline: "none",
        fontSize: 15,
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

function Modal({ open, title, children, onClose, maxWidth = 900 }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth,
          maxHeight: "90vh",
          overflow: "auto",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
          borderRadius: 30,
          padding: 26,
          border: "1px solid rgba(219,228,239,0.95)",
          boxShadow: "0 40px 100px rgba(15,23,42,0.22)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <h3
            style={{
              fontSize: 28,
              fontWeight: 900,
              margin: 0,
              color: "#0f172a",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid #dbe4ef",
              background: "#ffffff",
              width: 44,
              height: 44,
              borderRadius: 14,
              cursor: "pointer",
              fontSize: 18,
              fontWeight: 900,
              boxShadow: "0 10px 20px rgba(15,23,42,0.06)",
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminCRM() {
  const [packageOptions, setPackageOptions] = useState(() =>
    loadJson(STORAGE_KEYS.packageOptions, DEFAULT_PACKAGE_OPTIONS)
  );
  const [extraOptions, setExtraOptions] = useState(() =>
    loadJson(STORAGE_KEYS.extraOptions, DEFAULT_EXTRA_OPTIONS)
  );
  const [pricingTab, setPricingTab] = useState("packages");
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
  const [detailFilter, setDetailFilter] = useState("month");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  useEffect(() => saveJson(STORAGE_KEYS.settings, settings), [settings]);
  useEffect(() => saveJson(STORAGE_KEYS.customers, customers), [customers]);
  useEffect(() => saveJson(STORAGE_KEYS.expenses, expenses), [expenses]);
  useEffect(() => saveJson(STORAGE_KEYS.requestLog, requestLog), [requestLog]);
  useEffect(() => saveJson(STORAGE_KEYS.packageOptions, packageOptions), [packageOptions]);
  useEffect(() => saveJson(STORAGE_KEYS.extraOptions, extraOptions), [extraOptions]);

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
    return expenses.filter((item) => isWithinFilter(item.date, financeFilter));
  }, [expenses, financeFilter]);

  const totalMonthlyRevenue = useMemo(() => {
    return customers.reduce(
      (sum, customer) => sum + calcMonthlyRevenue(customer, packageOptions, extraOptions),
      0
    );
  }, [customers, packageOptions, extraOptions]);

  const totalMonthlyCosts = useMemo(() => {
    const infra = customers.reduce(
      (sum, customer) => sum + Number(calcMonthlyInfraCost(customer, packageOptions, extraOptions) || 0),
      0
    );
    const manual = financeExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );
    return infra + manual;
  }, [customers, financeExpenses, packageOptions, extraOptions]);

  const activeCustomers = useMemo(() => {
    return customers.filter((item) => item.status === "active").length;
  }, [customers]);

  const failedCustomers = useMemo(() => {
    return customers.filter((item) => item.status === "failed").length;
  }, [customers]);

  const warningCustomers = useMemo(() => {
    return customers.filter((item) => item.status === "warning").length;
  }, [customers]);

  const packageChartData = useMemo(() => {
    const grouped = customers.reduce((acc, customer) => {
      acc[customer.packageCode] = (acc[customer.packageCode] || 0) + 1;
      return acc;
    }, {});

    return activePackageOptions(packageOptions).map((option) => ({
      name: option.label,
      klanten: grouped[option.code] || 0,
      omzet: customers
        .filter((customer) => customer.packageCode === option.code)
        .reduce(
          (sum, customer) => sum + calcMonthlyRevenue(customer, packageOptions, extraOptions),
          0
        ),
    }));
  }, [customers, packageOptions, extraOptions]);

  const dashboardTrendData = useMemo(() => {
    return buildDashboardTrendData(
      customers,
      expenses,
      financeFilter,
      packageOptions,
      extraOptions
    );
  }, [customers, expenses, financeFilter, packageOptions, extraOptions]);

  const selectedCustomerStats = useMemo(() => {
    if (!selectedCustomer) return null;
    return buildCustomerPeriodStats(
      selectedCustomer,
      expenses,
      detailFilter,
      packageOptions,
      extraOptions
    );
  }, [selectedCustomer, expenses, detailFilter, packageOptions, extraOptions]);

  const selectedCustomerTrendData = useMemo(() => {
    if (!selectedCustomer) return [];
    return buildCustomerTrendData(
      selectedCustomer,
      expenses,
      detailFilter,
      packageOptions,
      extraOptions
    );
  }, [selectedCustomer, expenses, detailFilter, packageOptions, extraOptions]);

  function pushRequestLogEntries(entries) {
    const nextEntries = Array.isArray(entries)
      ? entries.filter(Boolean)
      : [entries].filter(Boolean);

    if (nextEntries.length === 0) return;

    setRequestLog((prev) => [...nextEntries, ...prev].slice(0, 100));
  }

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

  function resetCustomerForm() {
    setCustomerForm(DEFAULT_CUSTOMER_FORM);
  }

  function updatePackageOption(code, key, value) {
    setPackageOptions((prev) =>
      prev.map((item) =>
        item.code === code
          ? {
              ...item,
              [key]:
                key === "monthlyPrice" ||
                key === "setupPrice" ||
                key === "monthlyInfraCost" ||
                key === "sortOrder"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  }

  function updateExtraOption(code, key, value) {
    setExtraOptions((prev) =>
      prev.map((item) =>
        item.code === code
          ? {
              ...item,
              [key]:
                key === "monthlyPrice" ||
                key === "setupPrice" ||
                key === "monthlyInfraCost" ||
                key === "sortOrder"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  }

  function createCustomerDraft() {
    const companySlug = slugify(customerForm.companyName);
    const domainSlug = slugify(
      customerForm.domain.split(".")[0] || customerForm.companyName
    );

    const customerId = `cust_${companySlug || domainSlug || Date.now()}`;
    const selectedPackage = packageMeta(customerForm.packageCode, packageOptions);
    const selectedExtras = (customerForm.extras || [])
      .map((code) => extraMeta(code, extraOptions))
      .filter(Boolean);

    const monthlyRevenue =
      Number(selectedPackage?.monthlyPrice || 0) +
      selectedExtras.reduce((sum, item) => sum + Number(item.monthlyPrice || 0), 0);

    const monthlyInfraCost =
      Number(selectedPackage?.monthlyInfraCost || 0) +
      selectedExtras.reduce((sum, item) => sum + Number(item.monthlyInfraCost || 0), 0);

    const oneTimeSetupCost =
      Number(selectedPackage?.setupPrice || 0) +
      selectedExtras.reduce((sum, item) => sum + Number(item.setupPrice || 0), 0);

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
      monthlyInfraCost,
      oneTimeSetupCost,
      address: customerForm.address,
      postalCode: customerForm.postalCode,
      city: customerForm.city,
      country: customerForm.country,
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
        monthlyRevenue,
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

      const deployEntry = {
        id:
          (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
          `req-${Date.now()}-1`,
        at: new Date().toISOString(),
        type: "CREATE_DEPLOYMENT",
        result: deployResult,
      };

      requestEntries.push(deployEntry);

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

      let nextStatus = deployResult.ok ? "provisioning" : "failed";
      let mailProvisioned = false;

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

        const mailEntry = {
          id:
            (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
            `req-${Date.now()}-2`,
          at: new Date().toISOString(),
          type: "PROVISION_MAIL",
          result: mailResult,
        };

        requestEntries.push(mailEntry);

        mailProvisioned = mailResult.ok;
        nextStatus = deployResult.ok
          ? mailResult.ok
            ? "active"
            : "warning"
          : "failed";
      } else {
        nextStatus = deployResult.ok ? "active" : "failed";
      }

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
                mailProvisioned,
                status: nextStatus,
                requestHistory: requestEntries,
              }
            : item
        )
      );

      pushRequestLogEntries(requestEntries);

      resetCustomerForm();
      setIsCreateCustomerOpen(false);
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

      pushRequestLogEntries(requestEntries);
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

    pushRequestLogEntries(historyEntry);
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

    pushRequestLogEntries(historyEntry);
  }

  function saveCustomerEdits(nextCustomer) {
    setCustomers((prev) =>
      prev.map((item) => (item.id === nextCustomer.id ? nextCustomer : item))
    );
  }

  function requestDeleteCustomer(customer) {
    setDeleteCandidate(customer);
  }

  function confirmDeleteCustomer() {
    if (!deleteCandidate) return;

    const customerId = deleteCandidate.id;
    setCustomers((prev) => prev.filter((item) => item.id !== customerId));

    if (selectedCustomerId === customerId) {
      setSelectedCustomerId(null);
    }

    setDeleteCandidate(null);
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
      customerId: expenseForm.customerId,
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
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.12) 0%, transparent 26%), radial-gradient(circle at top right, rgba(14,165,233,0.08) 0%, transparent 22%), linear-gradient(180deg, #f8fbff 0%, #f5f7fb 100%)",
        color: "#0f172a",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1680, margin: "0 auto", padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 26,
          }}
        >
          <div>
            <BrandLogo />
            <div style={{ marginTop: 14 }}>
              <h1
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: 10,
                  letterSpacing: "-0.04em",
                }}
              >
                Vedantix Admin Dashboard
              </h1>
              <p style={{ color: "#64748b", fontSize: 16 }}>
                CRM, deployment monitoring en financieel overzicht.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
              border: "1px solid #dbe4ef",
              borderRadius: 22,
              padding: 10,
              boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
            }}
          >
            {[
              ["dashboard", "Dashboard"],
              ["customers", "Klanten"],
              ["finance", "Financiën"],
              ["pricing", "Prijzen"],
              ["settings", "Instellingen"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                style={{
                  border: "none",
                  borderRadius: 16,
                  padding: "13px 18px",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  background:
                    activeTab === key
                      ? "linear-gradient(135deg, #0f172a 0%, #172554 100%)"
                      : "transparent",
                  color: activeTab === key ? "#ffffff" : "#475569",
                  boxShadow:
                    activeTab === key
                      ? "0 14px 30px rgba(15,23,42,0.18)"
                      : "none",
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
                subtitle="Infra + extra kosten"
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
                  title="Omzet, kosten en winst"
                  subtitle="Totaal overzicht van al je klanten."
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
                    <AreaChart data={dashboardTrendData}>
                      <defs>
                        <linearGradient id="dashRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.04} />
                        </linearGradient>
                        <linearGradient id="dashProfit" x1="0" y1="0" x2="0" y2="1">
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
                        fill="url(#dashRevenue)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="winst"
                        stroke="#10b981"
                        fill="url(#dashProfit)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <SectionTitle
                  title="Pakketten"
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
            </div>
          </div>
        )}

        {activeTab === "customers" && (
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
                    <div
                      style={{
                        minWidth: 360,
                        position: "relative",
                      }}
                    >
                      <Input
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
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
                      onClick={() => setIsCreateCustomerOpen(true)}
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
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        style={{
                          borderBottom: "1px solid #edf2f7",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedCustomerId(customer.id)}
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
                          {packageMeta(customer.packageCode, packageOptions).label}
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
                          {currency(calcMonthlyRevenue(customer, packageOptions, extraOptions))}
                        </td>
                        <td
                          style={{ padding: "18px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <Button
                              tone="soft"
                              onClick={() => setSelectedCustomerId(customer.id)}
                            >
                              Beheren
                            </Button>
                            <Button onClick={() => refreshCustomerDeployment(customer)}>
                              Refresh
                            </Button>
                            <Button
                              tone="danger"
                              onClick={() => requestDeleteCustomer(customer)}
                            >
                              Verwijderen
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredCustomers.length === 0 ? (
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

            {selectedCustomer ? (
              <Card>
                <SectionTitle
                  title={`Klantdetail — ${selectedCustomer.companyName}`}
                  subtitle="Alle klantgegevens, documenten en financieel overzicht per periode."
                  action={
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Button tone="soft" onClick={() => refreshCustomerDeployment(selectedCustomer)}>
                        Refresh status
                      </Button>
                      <Button onClick={() => redeployCustomer(selectedCustomer)}>
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
                    value={currency(calcMonthlyRevenue(selectedCustomer, packageOptions, extraOptions))}
                    subtitle="Pakket + extra's"
                    tone="#0ea5e9"
                  />
                  <StatCard
                    title="Setup"
                    value={currency(calcSetupRevenue(selectedCustomer, packageOptions, extraOptions))}
                    subtitle="Eenmalige opbrengst"
                    tone="#8b5cf6"
                  />
                  <StatCard
                    title="Kosten"
                    value={currency(selectedCustomerStats ? selectedCustomerStats.cost : 0)}
                    subtitle="Per gekozen periode"
                    tone="#f97316"
                  />
                  <StatCard
                    title="Winst"
                    value={currency(selectedCustomerStats ? selectedCustomerStats.profit : 0)}
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

                      <Field label="Domeinnaam">
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
                            })
                          }
                        >
                          {activePackageOptions(packageOptions).map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.label}
                            </option>
                          ))}
                        </Select>
                      </Field>

                      <Field label="Adres">
                        <Input
                          value={selectedCustomer.address || ""}
                          onChange={(e) =>
                            saveCustomerEdits({
                              ...selectedCustomer,
                              address: e.target.value,
                            })
                          }
                        />
                      </Field>

                      <Field label="Postcode">
                        <Input
                          value={selectedCustomer.postalCode || ""}
                          onChange={(e) =>
                            saveCustomerEdits({
                              ...selectedCustomer,
                              postalCode: e.target.value,
                            })
                          }
                        />
                      </Field>

                      <Field label="Plaats">
                        <Input
                          value={selectedCustomer.city || ""}
                          onChange={(e) =>
                            saveCustomerEdits({
                              ...selectedCustomer,
                              city: e.target.value,
                            })
                          }
                        />
                      </Field>

                      <Field label="Land">
                        <Input
                          value={selectedCustomer.country || ""}
                          onChange={(e) =>
                            saveCustomerEdits({
                              ...selectedCustomer,
                              country: e.target.value,
                            })
                          }
                        />
                      </Field>

                      <Field label="Deployment status">
                        <Input value={selectedCustomer.deploymentStatus || ""} readOnly />
                      </Field>

                      <Field label="Deployment ID">
                        <Input value={selectedCustomer.deploymentId || ""} readOnly />
                      </Field>

                      <Field label="Aangemaakt op">
                        <Input value={dateLabel(selectedCustomer.createdAt)} readOnly />
                      </Field>

                      <Field label="Setup prijs">
                        <Input
                          value={currency(calcSetupRevenue(selectedCustomer, packageOptions, extraOptions))}
                          readOnly
                        />
                      </Field>

                      <div style={{ gridColumn: "1 / -1" }}>
                        <Field label="Notities">
                          <Textarea
                            value={selectedCustomer.notes || ""}
                            onChange={(e) =>
                              saveCustomerEdits({
                                ...selectedCustomer,
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

                      {(selectedCustomer.documents || []).length === 0 ? (
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
                            tone={detailFilter === item.key ? "primary" : "default"}
                            onClick={() => setDetailFilter(item.key)}
                          >
                            {item.label}
                          </Button>
                        ))}
                      </div>
                    }
                  />

                  <div style={{ width: "100%", height: 320, marginBottom: 18 }}>
                    <ResponsiveContainer>
                      <AreaChart data={selectedCustomerTrendData}>
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
                      value={currency(selectedCustomerStats ? selectedCustomerStats.revenue : 0)}
                      subtitle="Pakket + extra's"
                      tone="#0ea5e9"
                    />
                    <StatCard
                      title="Infra"
                      value={currency(selectedCustomerStats ? selectedCustomerStats.infraCost : 0)}
                      subtitle="Automatisch vanuit pakket + extra's"
                      tone="#8b5cf6"
                    />
                    <StatCard
                      title="Extra kosten"
                      value={currency(
                        selectedCustomerStats ? selectedCustomerStats.directExpenses : 0
                      )}
                      subtitle="Handmatig gekoppelde uitgaven"
                      tone="#f97316"
                    />
                    <StatCard
                      title="Resultaat"
                      value={currency(selectedCustomerStats ? selectedCustomerStats.profit : 0)}
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
                    {(selectedCustomer.requestHistory || []).map((entry) => (
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

                    {(selectedCustomer.requestHistory || []).length === 0 ? (
                      <div style={{ color: "#64748b" }}>Nog geen backend acties.</div>
                    ) : null}
                  </div>
                </Card>
              </Card>
            ) : null}
          </div>
        )}

        {activeTab === "finance" && (
          <div style={{ display: "grid", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Uitgave toevoegen"
                subtitle="Voeg algemene of klantgebonden kosten toe."
                action={
                  <Button tone="primary" onClick={addExpense}>
                    Opslaan
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
                    value={expenseForm.title}
                    onChange={(e) =>
                      setExpenseForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Hosting, tool, advertentie..."
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

                <Field label="Klant koppelen">
                  <Select
                    value={expenseForm.customerId}
                    onChange={(e) =>
                      setExpenseForm((prev) => ({ ...prev, customerId: e.target.value }))
                    }
                  >
                    <option value="">Geen specifieke klant</option>
                    {customers.map((customer) => (
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
                title="Uitgaven"
                subtitle="Alle geregistreerde kosten."
              />
              <div style={{ display: "grid", gap: 10 }}>
                {expenses.map((expense) => {
                  const customer = customers.find((item) => item.id === expense.customerId);

                  return (
                    <div
                      key={expense.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: 14,
                        borderRadius: 16,
                        border: "1px solid #e2e8f0",
                        background: "#ffffff",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800 }}>{expense.title}</div>
                        <div style={{ color: "#64748b", fontSize: 13 }}>
                          {expense.category} · {dateLabel(expense.date)}
                          {customer ? ` · ${customer.companyName}` : ""}
                        </div>
                      </div>
                      <div style={{ fontWeight: 900 }}>{currency(expense.amount)}</div>
                    </div>
                  );
                })}

                {expenses.length === 0 ? (
                  <div style={{ color: "#64748b" }}>Nog geen uitgaven toegevoegd.</div>
                ) : null}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "pricing" && (
          <div style={{ display: "grid", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Prijzen beheren"
                subtitle="Centrale plek voor pakketten en extra's."
                action={
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Button
                      tone={pricingTab === "packages" ? "primary" : "default"}
                      onClick={() => setPricingTab("packages")}
                    >
                      Pakketten
                    </Button>
                    <Button
                      tone={pricingTab === "extras" ? "primary" : "default"}
                      onClick={() => setPricingTab("extras")}
                    >
                      Extra's
                    </Button>
                  </div>
                }
              />

              {pricingTab === "packages" && (
                <div style={{ display: "grid", gap: 12 }}>
                  {packageOptions
                    .slice()
                    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
                    .map((item) => (
                      <div
                        key={item.code}
                        style={{
                          border: "1px solid #dbe4ef",
                          borderRadius: 20,
                          padding: 18,
                          background: "#ffffff",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1.2fr 1fr 1fr 1fr auto auto",
                            gap: 12,
                            alignItems: "end",
                          }}
                        >
                          <Field label="Naam">
                            <Input
                              value={item.label}
                              onChange={(e) =>
                                updatePackageOption(item.code, "label", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Prijs p/m">
                            <Input
                              type="number"
                              min="0"
                              value={item.monthlyPrice}
                              onChange={(e) =>
                                updatePackageOption(item.code, "monthlyPrice", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Setup prijs">
                            <Input
                              type="number"
                              min="0"
                              value={item.setupPrice}
                              onChange={(e) =>
                                updatePackageOption(item.code, "setupPrice", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Infra kosten p/m">
                            <Input
                              type="number"
                              min="0"
                              value={item.monthlyInfraCost}
                              onChange={(e) =>
                                updatePackageOption(item.code, "monthlyInfraCost", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Volgorde">
                            <Input
                              type="number"
                              min="0"
                              value={item.sortOrder}
                              onChange={(e) =>
                                updatePackageOption(item.code, "sortOrder", e.target.value)
                              }
                            />
                          </Field>

                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              color: "#334155",
                              fontWeight: 800,
                              minHeight: 54,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={item.isActive !== false}
                              onChange={(e) =>
                                updatePackageOption(item.code, "isActive", e.target.checked)
                              }
                            />
                            Actief
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {pricingTab === "extras" && (
                <div style={{ display: "grid", gap: 12 }}>
                  {extraOptions
                    .slice()
                    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
                    .map((item) => (
                      <div
                        key={item.code}
                        style={{
                          border: "1px solid #dbe4ef",
                          borderRadius: 20,
                          padding: 18,
                          background: "#ffffff",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1.2fr 1fr 1fr 1fr auto auto",
                            gap: 12,
                            alignItems: "end",
                          }}
                        >
                          <Field label="Naam">
                            <Input
                              value={item.label}
                              onChange={(e) =>
                                updateExtraOption(item.code, "label", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Prijs p/m">
                            <Input
                              type="number"
                              min="0"
                              value={item.monthlyPrice}
                              onChange={(e) =>
                                updateExtraOption(item.code, "monthlyPrice", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Setup prijs">
                            <Input
                              type="number"
                              min="0"
                              value={item.setupPrice}
                              onChange={(e) =>
                                updateExtraOption(item.code, "setupPrice", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Infra kosten p/m">
                            <Input
                              type="number"
                              min="0"
                              value={item.monthlyInfraCost}
                              onChange={(e) =>
                                updateExtraOption(item.code, "monthlyInfraCost", e.target.value)
                              }
                            />
                          </Field>

                          <Field label="Volgorde">
                            <Input
                              type="number"
                              min="0"
                              value={item.sortOrder}
                              onChange={(e) =>
                                updateExtraOption(item.code, "sortOrder", e.target.value)
                              }
                            />
                          </Field>

                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              color: "#334155",
                              fontWeight: 800,
                              minHeight: 54,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={item.isActive !== false}
                              onChange={(e) =>
                                updateExtraOption(item.code, "isActive", e.target.checked)
                              }
                            />
                            Actief
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Card>
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

      <Modal
        open={isCreateCustomerOpen}
        title="Nieuwe klant aanmaken"
        onClose={() => {
          setIsCreateCustomerOpen(false);
          resetCustomerForm();
        }}
      >
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
              {activePackageOptions(packageOptions).map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label} — {currency(item.monthlyPrice)}/m — setup {currency(item.setupPrice)}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Adres">
            <Input
              value={customerForm.address}
              onChange={(e) => updateCustomerForm("address", e.target.value)}
              placeholder="Straat 1"
            />
          </Field>

          <Field label="Postcode">
            <Input
              value={customerForm.postalCode}
              onChange={(e) => updateCustomerForm("postalCode", e.target.value)}
              placeholder="1234 AB"
            />
          </Field>

          <Field label="Plaats">
            <Input
              value={customerForm.city}
              onChange={(e) => updateCustomerForm("city", e.target.value)}
              placeholder="Utrecht"
            />
          </Field>

          <Field label="Land">
            <Input
              value={customerForm.country}
              onChange={(e) => updateCustomerForm("country", e.target.value)}
              placeholder="Nederland"
            />
          </Field>

          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Extra's">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 10,
                  border: "1px solid #dbe4ef",
                  borderRadius: 18,
                  padding: 14,
                  background: "#ffffff",
                }}
              >
                {activeExtraOptions(extraOptions).map((extra) => (
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
                      {extra.label} ({currency(extra.monthlyPrice)}/m · setup {currency(extra.setupPrice)})
                    </span>
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <Card
              style={{
                borderRadius: 20,
                padding: 18,
                background:
                  "linear-gradient(180deg, rgba(239,246,255,0.85) 0%, rgba(255,255,255,0.98) 100%)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 14,
                }}
              >
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Maandprijs
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
                    {currency(
                      calcMonthlyRevenue(
                        customerForm,
                        packageOptions,
                        extraOptions
                      )
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Setup prijs
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
                    {currency(
                      calcSetupRevenue(
                        customerForm,
                        packageOptions,
                        extraOptions
                      )
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Infra p/m
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
                    {currency(
                      calcMonthlyInfraCost(
                        customerForm,
                        packageOptions,
                        extraOptions
                      )
                    )}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>
                    Brutomarge p/m
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#10b981" }}>
                    {currency(
                      calcMonthlyRevenue(
                        customerForm,
                        packageOptions,
                        extraOptions
                      ) -
                        calcMonthlyInfraCost(
                          customerForm,
                          packageOptions,
                          extraOptions
                        )
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Notities">
              <Textarea
                value={customerForm.notes}
                onChange={(e) => updateCustomerForm("notes", e.target.value)}
                placeholder="Intake-info, afspraken, bijzonderheden..."
              />
            </Field>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 24,
          }}
        >
          <Button
            onClick={() => {
              setIsCreateCustomerOpen(false);
              resetCustomerForm();
            }}
          >
            Annuleren
          </Button>
          <Button tone="primary" onClick={addCustomerAndProvision} disabled={isProvisioning}>
            {isProvisioning ? "Bezig..." : "Klant aanmaken"}
          </Button>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleteCandidate)}
        title="Klant verwijderen?"
        onClose={() => setDeleteCandidate(null)}
        maxWidth={560}
      >
        <div
          style={{
            padding: 4,
            display: "grid",
            gap: 18,
          }}
        >
          <div
            style={{
              borderRadius: 20,
              padding: 18,
              background: "linear-gradient(180deg, #fff1f2 0%, #ffffff 100%)",
              border: "1px solid #fecdd3",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: "#991b1b",
                marginBottom: 8,
              }}
            >
              Let op
            </div>
            <div style={{ color: "#475569", lineHeight: 1.7 }}>
              Je staat op het punt om{" "}
              <strong>{deleteCandidate ? deleteCandidate.companyName : ""}</strong>{" "}
              te verwijderen uit het dashboard. Dit kan niet automatisch ongedaan worden gemaakt.
            </div>
          </div>

          <div style={{ color: "#475569", lineHeight: 1.7 }}>
            Controleer eerst of je echt deze klant wilt verwijderen. Gebruik{" "}
            <strong>Beheren</strong> als je alleen gegevens wilt aanpassen.
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <Button onClick={() => setDeleteCandidate(null)}>Annuleren</Button>
            <Button tone="danger" onClick={confirmDeleteCustomer}>
              Ja, verwijder klant
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}