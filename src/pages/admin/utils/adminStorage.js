export const STORAGE_KEYS = {
    settings: "vedantix_admin_settings_v9",
    customers: "vedantix_admin_customers_v9",
    expenses: "vedantix_admin_expenses_v9",
    requestLog: "vedantix_admin_request_log_v9",
  };
  
  export const DEFAULT_SETTINGS = {
    baseUrl: "/provisioning-api",
    apiKey: "",
    tenantId: "default",
    actorId: "admin-dashboard",
    source: "ADMIN_PANEL",
    autoIdempotency: true,
    autoProvisionMail: true,
  };
  
  export const DEFAULT_CUSTOMER_FORM = {
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
  
  export const DEFAULT_EXPENSE_FORM = {
    title: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category: "Overig",
    customerId: "",
  };
  
  export function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  
  export function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  
  export function pretty(value) {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  
  export function currency(value) {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));
  }
  
  export function currency2(value) {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value || 0));
  }
  
  export function dateLabel(value) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("nl-NL");
  }
  
  export function toNumber(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  
  export function round2(value) {
    return Number(toNumber(value).toFixed(2));
  }
  
  export function calcExVatFromInc(inc, vatRate = 0.21) {
    return round2(toNumber(inc) / (1 + toNumber(vatRate || 0.21)));
  }
  
  export function calcVatFromInc(inc, vatRate = 0.21) {
    return round2(toNumber(inc) - calcExVatFromInc(inc, vatRate));
  }
  
  export function calcIncVatFromEx(ex, vatRate = 0.21) {
    return round2(toNumber(ex) * (1 + toNumber(vatRate || 0.21)));
  }
  
  export function periodMultiplier(filterKey) {
    if (filterKey === "day") return 1 / 30;
    if (filterKey === "week") return 7 / 30;
    if (filterKey === "month") return 1;
    if (filterKey === "quarter") return 3;
    if (filterKey === "halfyear") return 6;
    return 12;
  }
  
  export function isWithinFilter(dateString, filterKey) {
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
  
  export const STATUS_LABELS = {
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
  
  export const STATUS_COLORS = {
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
  
  export const TIME_FILTERS = [
    { key: "day", label: "Dag" },
    { key: "week", label: "Week" },
    { key: "month", label: "Maand" },
    { key: "quarter", label: "Kwartaal" },
    { key: "halfyear", label: "Half jaar" },
    { key: "year", label: "Jaar" },
  ];