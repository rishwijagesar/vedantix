export const STORAGE_KEYS = {
  settings: "vedantix_admin_settings_v9",
  customers: "vedantix_admin_customers_v9",
  expenses: "vedantix_admin_expenses_v9",
  requestLog: "vedantix_admin_request_log_v9",
};

export const DEFAULT_SETTINGS = {
  baseUrl: "/provisioning-api",
  apiKey: "d1e07740dce2a9102635aee441926de52e341fde95cfa10778e465d64d0f6251",
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

export const DEFAULT_PRICING_PACKAGES = [
  {
    code: "STARTER",
    label: "Starter",
    description: "Sterke basis voor kleine bedrijven die professioneel online zichtbaar willen zijn.",
    slug: "starter",
    monthlyPriceInclVat: 99,
    setupPriceInclVat: 349,
    monthlyInfraCostExclVat: 12,
    vatRate: 0.21,
    featured: false,
    isActive: true,
    sortOrder: 1,
    fit: "Voor een duidelijke bedrijfswebsite zonder extra complexiteit.",
    cancelNote: "Maandelijks opzegbaar na de afgesproken startperiode.",
    cta: "Plan gratis intake",
    bullets: [
      "Professionele website",
      "Tot 5 pagina’s",
      "1 zakelijk mailadres",
      "Onderhoud en kleine updates",
    ],
    included: [
      "Professionele website",
      "Tot 5 pagina’s",
      "1 zakelijk mailadres",
      "Mobielvriendelijk ontwerp",
      "Contactformulier en WhatsApp-knop",
      "Onderhoud en kleine updates",
      "Je website blijft online en veilig",
    ],
    notIncluded: [
      "Geen klantomgeving of login",
      "Geen uitgebreide reserveringsmodule",
      "Geen maatwerk functionaliteit",
      "Niet bedoeld voor complexe processen",
    ],
    addons: [
      "Extra mailadressen",
      "Extra pagina’s",
      "Lokale SEO uitbreiding",
      "Blog of FAQ uitbreiding",
      "Extra formulieren of secties",
    ],
  },
  {
    code: "GROWTH",
    label: "Growth",
    description: "Meer inhoud, meer groeiruimte en een sterkere commerciële basis.",
    slug: "growth",
    monthlyPriceInclVat: 149,
    setupPriceInclVat: 499,
    monthlyInfraCostExclVat: 18,
    vatRate: 0.21,
    featured: true,
    isActive: true,
    sortOrder: 2,
    fit: "Beste balans tussen prijs, inhoud en groeiruimte.",
    cancelNote: "Maandelijks opzegbaar na de afgesproken startperiode.",
    cta: "Plan gratis intake",
    bullets: [
      "Alles uit Starter",
      "Meer pagina’s en inhoud",
      "5 zakelijke mailadressen",
      "Meer SEO-ruimte",
    ],
    included: [
      "Alles uit Starter",
      "Meer pagina’s en meer inhoud",
      "5 zakelijke mailadressen",
      "Blog of FAQ mogelijk",
      "Sterkere SEO-opbouw",
      "Meer ruimte voor dienstenpagina’s en landingspagina’s",
    ],
    notIncluded: [
      "Geen uitgebreide klantomgeving standaard",
      "Geen zwaar maatwerk standaard",
      "Niet bedoeld voor complexe interne workflows",
    ],
    addons: [
      "Extra pagina’s",
      "Extra mailadressen",
      "Reserveringsmodule",
      "Uitgebreidere leadformulieren",
      "Extra SEO-landingspagina’s",
    ],
  },
  {
    code: "PRO",
    label: "Pro",
    description: "Voor bedrijven die hun website ook als proces- of salesmachine willen inzetten.",
    slug: "pro",
    monthlyPriceInclVat: 249,
    setupPriceInclVat: 749,
    monthlyInfraCostExclVat: 28,
    vatRate: 0.21,
    featured: false,
    isActive: true,
    sortOrder: 3,
    fit: "Voor bedrijven die processen, aanvragen of reserveringen online willen ondersteunen.",
    cancelNote: "Maandelijks opzegbaar na de afgesproken startperiode.",
    cta: "Plan gratis intake",
    bullets: [
      "Alles uit Growth",
      "10 zakelijke mailadressen",
      "Dashboard of klantomgeving mogelijk",
      "Meer maatwerk",
    ],
    included: [
      "Alles uit Growth",
      "10 zakelijke mailadressen",
      "Klantomgeving of dashboard mogelijk",
      "Reserveringen, intake of workflows mogelijk",
      "Meer maatwerk en doorontwikkeling",
      "Geschikt voor bedrijven die online processen willen ondersteunen",
    ],
    notIncluded: [
      "Zeer specialistisch maatwerk alleen op offertebasis",
    ],
    addons: [
      "Extra mailadressen",
      "Extra opslag of uitgebreide formulieren",
      "Extra beveiliging",
      "Extra maatwerk modules",
    ],
  },
];

export const DEFAULT_PRICING_ADDONS = [
  {
    code: "EXTRA_MAILBOX",
    label: "Extra mailadres",
    description: "Extra zakelijk mailadres",
    monthlyPriceInclVat: 7,
    setupPriceInclVat: 0,
    monthlyInfraCostExclVat: 1,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 1,
  },
  {
    code: "EXTRA_PAGE",
    label: "Extra pagina",
    description: "Losse extra pagina",
    monthlyPriceInclVat: 10,
    setupPriceInclVat: 49,
    monthlyInfraCostExclVat: 0,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 2,
  },
  {
    code: "LOCAL_SEO",
    label: "Lokale SEO uitbreiding",
    description: "Extra lokale SEO-pagina’s en optimalisatie",
    monthlyPriceInclVat: 29,
    setupPriceInclVat: 99,
    monthlyInfraCostExclVat: 2,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 3,
  },
  {
    code: "BOOKING_MODULE",
    label: "Reserveringsmodule",
    description: "Booking of intake flow",
    monthlyPriceInclVat: 39,
    setupPriceInclVat: 149,
    monthlyInfraCostExclVat: 4,
    vatRate: 0.21,
    isActive: true,
    sortOrder: 4,
  },
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