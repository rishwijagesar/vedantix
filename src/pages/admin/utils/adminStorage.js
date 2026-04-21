export const STORAGE_KEYS = {
  settings: "vedantix_admin_settings_v10",
  customers: "vedantix_admin_customers_v10",
  expenses: "vedantix_admin_expenses_v10",
  requestLog: "vedantix_admin_request_log_v10",
  packageOptions: "vedantix_package_options_v2",
  extraOptions: "vedantix_extra_options_v2",
};

export const DEFAULT_PRICING_PACKAGES = [
  {
    code: "STARTER",
    label: "Starter",
    description: "Voor starters en kleine lokale bedrijven.",
    slug: "starter",
    monthlyPriceInclVat: 99,
    setupPriceInclVat: 500,
    monthlyInfraCostExclVat: 8,
    vatRate: 0.21,
    featured: false,
    isActive: true,
    sortOrder: 1,
    fit: "Snel live met een sterke basis",
    cancelNote: "Maandelijks opzegbaar na oplevering",
    cta: "Start met Starter",
    bullets: [
      "Professionele one-page of compacte website",
      "Mobielvriendelijk design",
      "Contactformulier en WhatsApp CTA",
    ],
    included: [
      "Hosting",
      "SSL",
      "Basis onderhoud",
    ],
    notIncluded: [
      "Maatwerk integraties",
    ],
    addons: [],
  },
  {
    code: "GROWTH",
    label: "Growth",
    description: "Voor bedrijven die meer pagina's en meer conversie willen.",
    slug: "growth",
    monthlyPriceInclVat: 149,
    setupPriceInclVat: 850,
    monthlyInfraCostExclVat: 12,
    vatRate: 0.21,
    featured: true,
    isActive: true,
    sortOrder: 2,
    fit: "Meer inhoud, meer vertrouwen, meer aanvragen",
    cancelNote: "Maandelijks opzegbaar na oplevering",
    cta: "Kies Growth",
    bullets: [
      "Meer pagina's en sterkere structuur",
      "FAQ, reviews en extra CTA's",
      "Beter geschikt voor lokale SEO",
    ],
    included: [
      "Hosting",
      "SSL",
      "Onderhoud",
      "Meer contentruimte",
    ],
    notIncluded: [
      "Complex maatwerk",
    ],
    addons: [],
  },
  {
    code: "PRO",
    label: "Pro",
    description: "Voor bedrijven die een sterkere maatwerkpresentatie willen.",
    slug: "pro",
    monthlyPriceInclVat: 249,
    setupPriceInclVat: 1250,
    monthlyInfraCostExclVat: 18,
    vatRate: 0.21,
    featured: false,
    isActive: true,
    sortOrder: 3,
    fit: "Meer autoriteit en zwaardere commerciële uitstraling",
    cancelNote: "Maandelijks opzegbaar na oplevering",
    cta: "Ga voor Pro",
    bullets: [
      "Uitgebreidere opbouw",
      "Sterkere positionering",
      "Meer ruimte voor maatwerk content",
    ],
    included: [
      "Hosting",
      "SSL",
      "Onderhoud",
      "Ruime contentopzet",
    ],
    notIncluded: [
      "Zware externe software-integraties",
    ],
    addons: [],
  },
];

export const DEFAULT_PRICING_ADDONS = [
  {
    code: "BLOG",
    label: "Blog / FAQ",
    description: "Extra contentsecties of kennisbank.",
    monthlyPriceInclVat: 15,
    setupPriceInclVat: 100,
    monthlyInfraCostExclVat: 0,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 1,
  },
  {
    code: "BOOKING",
    label: "Reserveringen",
    description: "Afspraak- of reserveringsflow.",
    monthlyPriceInclVat: 25,
    setupPriceInclVat: 250,
    monthlyInfraCostExclVat: 2,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 2,
  },
  {
    code: "ANALYTICS",
    label: "Analytics+",
    description: "Uitgebreidere metingen en rapportage.",
    monthlyPriceInclVat: 10,
    setupPriceInclVat: 50,
    monthlyInfraCostExclVat: 0,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 3,
  },
  {
    code: "CRM",
    label: "CRM module",
    description: "Leadopslag en opvolgstructuur.",
    monthlyPriceInclVat: 25,
    setupPriceInclVat: 300,
    monthlyInfraCostExclVat: 3,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 4,
  },
  {
    code: "FORMS",
    label: "Form opslag",
    description: "Opslag van ingestuurde formulierdata.",
    monthlyPriceInclVat: 12,
    setupPriceInclVat: 75,
    monthlyInfraCostExclVat: 1,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 5,
  },
  {
    code: "SEO_PLUS",
    label: "Local SEO+",
    description: "Sterkere lokale SEO-uitwerking.",
    monthlyPriceInclVat: 20,
    setupPriceInclVat: 150,
    monthlyInfraCostExclVat: 0,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 6,
  },
  {
    code: "EXTRA_MAILBOX",
    label: "Extra mailbox",
    description: "Extra mailbox boven pakketniveau.",
    monthlyPriceInclVat: 7,
    setupPriceInclVat: 0,
    monthlyInfraCostExclVat: 1,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 7,
  },
  {
    code: "PRIORITY_SUPPORT",
    label: "Priority support",
    description: "Snellere support en opvolging.",
    monthlyPriceInclVat: 35,
    setupPriceInclVat: 0,
    monthlyInfraCostExclVat: 0,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 8,
  },
];

export const DEFAULT_SETTINGS = {
  baseUrl: "https://api.vedantix.nl",
  apiKey: "",
  tenantId: "default",
  actorId: "admin-dashboard",
  source: "ADMIN_PANEL",
  autoIdempotency: true,
  autoProvisionMail: false,
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

export const STATUS_LABELS = {
  lead: "Lead",
  intake: "Intake",
  onboarding: "Onboarding",
  building: "In opbouw",
  awaiting_approval: "Wacht op akkoord",
  approved: "Goedgekeurd",
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
  building: "#2563eb",
  awaiting_approval: "#f59e0b",
  approved: "#22c55e",
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

export function dateLabel(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("nl-NL");
}

export function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function round2(value) {
  return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
}

export function calcExVatFromInc(amountInclVat, vatRate = 0.21) {
  const amount = Number(amountInclVat || 0);
  const rate = Number(vatRate || 0);
  if (!rate) return round2(amount);
  return round2(amount / (1 + rate));
}

export function calcVatFromInc(amountInclVat, vatRate = 0.21) {
  return round2(
    calcIncVatFromEx(calcExVatFromInc(amountInclVat, vatRate), vatRate) -
      calcExVatFromInc(amountInclVat, vatRate)
  );
}

export function calcIncVatFromEx(amountExclVat, vatRate = 0.21) {
  const amount = Number(amountExclVat || 0);
  const rate = Number(vatRate || 0);
  return round2(amount * (1 + rate));
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