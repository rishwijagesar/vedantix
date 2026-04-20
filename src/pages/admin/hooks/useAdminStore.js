import { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchPricingSummary,
  updatePricingPackage,
  updatePricingAddon,
} from "../../../api/pricing.api";
import {
  STORAGE_KEYS,
  DEFAULT_SETTINGS,
  DEFAULT_CUSTOMER_FORM,
  DEFAULT_EXPENSE_FORM,
  DEFAULT_PRICING_PACKAGES,
  DEFAULT_PRICING_ADDONS,
  loadJson,
  saveJson,
  slugify,
  toNumber,
  round2,
  calcExVatFromInc,
  calcVatFromInc,
  calcIncVatFromEx,
  periodMultiplier,
  isWithinFilter,
} from "../utils/adminStorage";

import { updateCustomer, deleteCustomer } from "../../../api/customers.api";

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
  const url = `${String(settings.baseUrl || "").replace(/\/$/, "")}${path}`;

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

function createId(prefix) {
  return (
    (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
    `${prefix}-${Date.now()}`
  );
}

function withDerivedPricingValues(item) {
  const vatRate = toNumber(item.vatRate || 0.21);
  const monthlyPriceInclVat = toNumber(
    item.monthlyPriceInclVat ?? item.monthlyPrice ?? 0
  );
  const setupPriceInclVat = toNumber(
    item.setupPriceInclVat ?? item.setupPrice ?? 0
  );
  const monthlyInfraCostExclVat = toNumber(
    item.monthlyInfraCostExclVat ?? item.monthlyInfraCost ?? 0
  );

  return {
    ...item,
    vatRate,
    monthlyPriceInclVat,
    monthlyPriceExclVat: calcExVatFromInc(monthlyPriceInclVat, vatRate),
    monthlyVatAmount: calcVatFromInc(monthlyPriceInclVat, vatRate),
    setupPriceInclVat,
    setupPriceExclVat: calcExVatFromInc(setupPriceInclVat, vatRate),
    setupVatAmount: calcVatFromInc(setupPriceInclVat, vatRate),
    monthlyInfraCostExclVat,
    monthlyInfraCostVatAmount: round2(monthlyInfraCostExclVat * vatRate),
    monthlyInfraCostInclVat: calcIncVatFromEx(monthlyInfraCostExclVat, vatRate),
  };
}

function clonePricingData(items = []) {
  return items.map((item) => withDerivedPricingValues({ ...item }));
}

function getFallbackPricingState() {
  return {
    packages: clonePricingData(DEFAULT_PRICING_PACKAGES),
    addons: clonePricingData(DEFAULT_PRICING_ADDONS),
  };
}

function normalizePricingSummary(summary) {
  const incomingPackages = Array.isArray(summary?.packages) ? summary.packages : [];
  const incomingAddons = Array.isArray(summary?.addons) ? summary.addons : [];

  if (incomingPackages.length === 0 && incomingAddons.length === 0) {
    return {
      ...getFallbackPricingState(),
      usedFallback: true,
    };
  }

  return {
    packages: clonePricingData(incomingPackages),
    addons: clonePricingData(incomingAddons),
    usedFallback: false,
  };
}

function toEditableValue(key, value) {
  if (
    key === "monthlyPriceInclVat" ||
    key === "setupPriceInclVat" ||
    key === "monthlyInfraCostExclVat" ||
    key === "sortOrder" ||
    key === "vatRate"
  ) {
    return toNumber(value);
  }

  return value;
}

function buildInitialSettings() {
  const loaded = loadJson(STORAGE_KEYS.settings, {});
  return {
    ...DEFAULT_SETTINGS,
    ...loaded,
    apiKey: loaded?.apiKey || DEFAULT_SETTINGS.apiKey || "",
    tenantId: loaded?.tenantId || DEFAULT_SETTINGS.tenantId || "default",
    actorId: loaded?.actorId || DEFAULT_SETTINGS.actorId || "admin-dashboard",
    source: loaded?.source || DEFAULT_SETTINGS.source || "ADMIN_PANEL",
  };
}

function buildBase44Prompt(form) {
  const niche = String(form.niche || "").trim();
  const companyName = String(form.companyName || "").trim();
  const city = String(form.city || "").trim();
  const packageCode = String(form.packageCode || "").trim().toUpperCase();
  const extras = Array.isArray(form.extras) ? form.extras.join(", ") : "";

  return [
    `Maak een conversiegerichte website voor ${companyName || "deze klant"} in Nederland.`,
    niche ? `Niche: ${niche}.` : "",
    city ? `Vestigingsplaats: ${city}.` : "",
    packageCode ? `Pakket: ${packageCode}.` : "",
    extras ? `Extra's: ${extras}.` : "",
    "Gebruik een professionele homepage met hero, diensten, reviews, FAQ, contact en duidelijke CTA's.",
    "De site is bedoeld als klantpreview en moet later op een eigen domein live kunnen.",
  ]
    .filter(Boolean)
    .join(" ");
}

function deriveWorkflowStateLabel(customer) {
  if (customer?.status === "active") return "LIVE";
  if (customer?.status === "provisioning") return "DEPLOYING";
  if (customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION") return "APPROVED";
  if (customer?.websiteBuildStatus === "PREVIEW_READY") return "PREVIEW_READY";
  if (customer?.contentSync?.status === "SYNCED") return "CONTENT_SYNCED";
  if (customer?.base44?.appId) return "BUILDING";
  return "NOT_STARTED";
}

function isCustomerBusy(customer) {
  const workflow = deriveWorkflowStateLabel(customer);
  return workflow === "BUILDING" || workflow === "DEPLOYING";
}

export function useAdminStore() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pricingTab, setPricingTab] = useState("packages");

  const [settings, setSettings] = useState(buildInitialSettings);
  const [customers, setCustomers] = useState(() =>
    loadJson(STORAGE_KEYS.customers, [])
  );
  const [expenses, setExpenses] = useState(() =>
    loadJson(STORAGE_KEYS.expenses, [])
  );
  const [requestLog, setRequestLog] = useState(() =>
    loadJson(STORAGE_KEYS.requestLog, [])
  );

  const [customerForm, setCustomerForm] = useState({
    ...DEFAULT_CUSTOMER_FORM,
    niche: "",
    templateKey: "",
  });
  const [expenseForm, setExpenseForm] = useState(DEFAULT_EXPENSE_FORM);

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [financeFilter, setFinanceFilter] = useState("month");
  const [detailFilter, setDetailFilter] = useState("month");
  const [vatFilter, setVatFilter] = useState("month");

  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isLinkingBase44, setIsLinkingBase44] = useState(false);
  const [isAutoCreatingBase44, setIsAutoCreatingBase44] = useState(false);
  const [isSyncingContent, setIsSyncingContent] = useState(false);
  const [isStartingBuildFlow, setIsStartingBuildFlow] = useState(false);
  const [isUpdatingWorkflow, setIsUpdatingWorkflow] = useState(false);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const [packageOptions, setPackageOptions] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [packageDrafts, setPackageDrafts] = useState([]);
  const [addonDrafts, setAddonDrafts] = useState([]);

  const [isPricingLoading, setIsPricingLoading] = useState(false);
  const [isPricingSaving, setIsPricingSaving] = useState(false);
  const [pricingSaveMessage, setPricingSaveMessage] = useState("");
  const [pricingError, setPricingError] = useState("");

  const [base44LinkForm, setBase44LinkForm] = useState({
    appId: "",
    appName: "",
    editorUrl: "",
    previewUrl: "",
    niche: "",
    templateKey: "",
    requestedPrompt: "",
  });

  const [contentSyncForm, setContentSyncForm] = useState({
    projectId: "",
    indexHtml: "",
    additionalFilesJson: "[]",
  });

  const pollingRef = useRef(null);

  useEffect(() => {
    saveJson(STORAGE_KEYS.settings, settings);
  }, [settings]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.customers, customers);
  }, [customers]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.expenses, expenses);
  }, [expenses]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.requestLog, requestLog);
  }, [requestLog]);

  async function loadPricingFromBackend() {
    setIsPricingLoading(true);
    setPricingError("");
    setPricingSaveMessage("");

    try {
      const summary = await fetchPricingSummary();
      const normalized = normalizePricingSummary(summary);

      setPackageOptions(normalized.packages);
      setExtraOptions(normalized.addons);
      setPackageDrafts(clonePricingData(normalized.packages));
      setAddonDrafts(clonePricingData(normalized.addons));

      if (normalized.usedFallback) {
        setPricingSaveMessage(
          "Standaard pakketten zijn geladen omdat de backend geen bruikbare pricing teruggaf."
        );
      }
    } catch (error) {
      const fallback = getFallbackPricingState();

      setPackageOptions(fallback.packages);
      setExtraOptions(fallback.addons);
      setPackageDrafts(clonePricingData(fallback.packages));
      setAddonDrafts(clonePricingData(fallback.addons));
      setPricingError(
        error instanceof Error
          ? error.message
          : "Backend pricing kon niet geladen worden."
      );
      setPricingSaveMessage(
        "Standaard pakketten zijn geladen omdat de backend geen bruikbare pricing teruggaf."
      );
    } finally {
      setIsPricingLoading(false);
    }
  }

  async function loadCustomersFromBackend() {
    try {
      const result = await apiRequest(settings, "GET", "/api/customers");
      const nextCustomers = result?.data?.data || [];

      if (result.ok && Array.isArray(nextCustomers)) {
        setCustomers(nextCustomers);
      }
    } catch {
      // keep local fallback
    }
  }

  async function getFreshPricingSnapshot() {
    try {
      const summary = await fetchPricingSummary();
      const normalized = normalizePricingSummary(summary);

      setPackageOptions(normalized.packages);
      setExtraOptions(normalized.addons);
      setPackageDrafts(clonePricingData(normalized.packages));
      setAddonDrafts(clonePricingData(normalized.addons));

      return normalized;
    } catch {
      const fallback = getFallbackPricingState();

      setPackageOptions(fallback.packages);
      setExtraOptions(fallback.addons);
      setPackageDrafts(clonePricingData(fallback.packages));
      setAddonDrafts(clonePricingData(fallback.addons));

      return {
        ...fallback,
        usedFallback: true,
      };
    }
  }

  useEffect(() => {
    loadPricingFromBackend();
  }, []);

  useEffect(() => {
    loadCustomersFromBackend();
  }, [settings.baseUrl, settings.apiKey, settings.tenantId, settings.actorId, settings.source]);

  const filteredCustomers = useMemo(() => {
    const query = customerSearch.trim().toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) =>
      [
        customer.companyName,
        customer.contactName,
        customer.email,
        customer.phone,
        customer.domain,
        customer.status,
        customer.base44?.appName,
        customer.base44?.appId,
        customer.contentSync?.repositoryName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [customers, customerSearch]);

  const selectedCustomer = useMemo(() => {
    return customers.find((item) => item.id === selectedCustomerId) || null;
  }, [customers, selectedCustomerId]);

  useEffect(() => {
    if (!selectedCustomer) {
      setBase44LinkForm({
        appId: "",
        appName: "",
        editorUrl: "",
        previewUrl: "",
        niche: "",
        templateKey: "",
        requestedPrompt: "",
      });
      setContentSyncForm({
        projectId: "",
        indexHtml: "",
        additionalFilesJson: "[]",
      });
      return;
    }

    setBase44LinkForm({
      appId: selectedCustomer.base44?.appId || "",
      appName: selectedCustomer.base44?.appName || selectedCustomer.companyName || "",
      editorUrl: selectedCustomer.base44?.editorUrl || "",
      previewUrl: selectedCustomer.base44?.previewUrl || "",
      niche: selectedCustomer.base44?.niche || selectedCustomer.niche || "",
      templateKey: selectedCustomer.base44?.templateKey || selectedCustomer.templateKey || "",
      requestedPrompt:
        selectedCustomer.base44?.requestedPrompt ||
        buildBase44Prompt({
          ...selectedCustomer,
          niche: selectedCustomer.base44?.niche || selectedCustomer.niche || "",
          templateKey:
            selectedCustomer.base44?.templateKey || selectedCustomer.templateKey || "",
        }),
    });

    setContentSyncForm({
      projectId:
        selectedCustomer.base44?.appId ||
        selectedCustomer.contentSync?.repositoryName ||
        "",
      indexHtml: "",
      additionalFilesJson: "[]",
    });
  }, [selectedCustomer]);

  const financeExpenses = useMemo(() => {
    return expenses.filter((item) => isWithinFilter(item.date, financeFilter));
  }, [expenses, financeFilter]);

  function getPackageByCode(code) {
    return packageOptions.find((item) => item.code === code) || null;
  }

  function getAddonByCode(code) {
    return extraOptions.find((item) => item.code === code) || null;
  }

  function calcMonthlyRevenue(customer) {
    const pkg = getPackageByCode(customer.packageCode);
    const packageAmount = Number(pkg?.monthlyPriceInclVat || 0);

    const extrasAmount = (customer.extras || []).reduce((sum, code) => {
      const addon = getAddonByCode(code);
      return sum + Number(addon?.monthlyPriceInclVat || 0);
    }, 0);

    return packageAmount + extrasAmount;
  }

  function calcSetupRevenue(customer) {
    const pkg = getPackageByCode(customer.packageCode);
    const packageAmount = Number(pkg?.setupPriceInclVat || 0);

    const extrasAmount = (customer.extras || []).reduce((sum, code) => {
      const addon = getAddonByCode(code);
      return sum + Number(addon?.setupPriceInclVat || 0);
    }, 0);

    return packageAmount + extrasAmount;
  }

  function calcMonthlyInfraCost(customer) {
    const pkg = getPackageByCode(customer.packageCode);
    const packageAmount = Number(pkg?.monthlyInfraCostInclVat || 0);

    const extrasAmount = (customer.extras || []).reduce((sum, code) => {
      const addon = getAddonByCode(code);
      return sum + Number(addon?.monthlyInfraCostInclVat || 0);
    }, 0);

    return packageAmount + extrasAmount;
  }

  const totalMonthlyRevenue = useMemo(() => {
    return customers.reduce(
      (sum, customer) => sum + calcMonthlyRevenue(customer),
      0
    );
  }, [customers, packageOptions, extraOptions]);

  const totalMonthlyCosts = useMemo(() => {
    const infra = customers.reduce(
      (sum, customer) => sum + calcMonthlyInfraCost(customer),
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

    return [...packageOptions]
      .filter((item) => item.isActive !== false)
      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0))
      .map((option) => ({
        name: option.label,
        klanten: grouped[option.code] || 0,
        omzet: customers
          .filter((customer) => customer.packageCode === option.code)
          .reduce((sum, customer) => sum + calcMonthlyRevenue(customer), 0),
      }));
  }, [customers, packageOptions, extraOptions]);

  function buildCustomerPeriodStats(customer, filterKey) {
    const multiplier = periodMultiplier(filterKey);
    const revenue = calcMonthlyRevenue(customer) * multiplier;
    const infraCost = calcMonthlyInfraCost(customer) * multiplier;

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

  const selectedCustomerStats = useMemo(() => {
    if (!selectedCustomer) {
      return null;
    }

    return buildCustomerPeriodStats(selectedCustomer, detailFilter);
  }, [selectedCustomer, expenses, detailFilter, packageOptions, extraOptions]);

  function buildDashboardTrendData(filterKey) {
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
          (sum, customer) => sum + calcMonthlyRevenue(customer),
          0
        );
        const infraCost = customers.reduce(
          (sum, customer) => sum + calcMonthlyInfraCost(customer),
          0
        );

        const directExpenses = expenses
          .filter((expense) => {
            const date = new Date(expense.date);
            return date.getMonth() === month && date.getFullYear() === year;
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
          customers.reduce((sum, customer) => sum + calcMonthlyRevenue(customer), 0) / 30;
        const infraCost =
          customers.reduce((sum, customer) => sum + calcMonthlyInfraCost(customer), 0) / 30;

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

  function buildCustomerTrendData(customer, filterKey) {
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

        const revenue = calcMonthlyRevenue(customer);
        const infraCost = calcMonthlyInfraCost(customer);

        const directExpenses = expenses
          .filter((expense) => expense.customerId === customer.id)
          .filter((expense) => {
            const date = new Date(expense.date);
            return date.getMonth() === month && date.getFullYear() === year;
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

        const revenue = calcMonthlyRevenue(customer) / 30;
        const infraCost = calcMonthlyInfraCost(customer) / 30;

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

  const dashboardTrendData = useMemo(() => {
    return buildDashboardTrendData(financeFilter);
  }, [customers, expenses, financeFilter, packageOptions, extraOptions]);

  const selectedCustomerTrendData = useMemo(() => {
    if (!selectedCustomer) {
      return [];
    }

    return buildCustomerTrendData(selectedCustomer, detailFilter);
  }, [selectedCustomer, expenses, detailFilter, packageOptions, extraOptions]);

  function pushRequestLogEntries(entries) {
    const nextEntries = Array.isArray(entries)
      ? entries.filter(Boolean)
      : [entries].filter(Boolean);

    if (nextEntries.length === 0) {
      return;
    }

    setRequestLog((prev) => [...nextEntries, ...prev].slice(0, 100));
  }

  function updateCustomerForm(key, value) {
    setCustomerForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateBase44LinkForm(key, value) {
    setBase44LinkForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateContentSyncForm(key, value) {
    setContentSyncForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateSettings(key, value) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
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
    setCustomerForm({
      ...DEFAULT_CUSTOMER_FORM,
      niche: "",
      templateKey: "",
    });
  }

  function updatePackageDraft(code, key, value) {
    setPackageDrafts((prev) =>
      prev.map((item) =>
        item.code === code
          ? withDerivedPricingValues({
              ...item,
              [key]: toEditableValue(key, value),
            })
          : item
      )
    );
  }

  function updateAddonDraft(code, key, value) {
    setAddonDrafts((prev) =>
      prev.map((item) =>
        item.code === code
          ? withDerivedPricingValues({
              ...item,
              [key]: toEditableValue(key, value),
            })
          : item
      )
    );
  }

  function resetPricingDrafts() {
    setPackageDrafts(clonePricingData(packageOptions));
    setAddonDrafts(clonePricingData(extraOptions));
    setPricingSaveMessage("");
    setPricingError("");
  }

  function restoreDefaultPricing() {
    const fallback = getFallbackPricingState();

    setPackageOptions(fallback.packages);
    setExtraOptions(fallback.addons);
    setPackageDrafts(clonePricingData(fallback.packages));
    setAddonDrafts(clonePricingData(fallback.addons));
    setPricingError("");
    setPricingSaveMessage(
      "Standaard pakketten en extra's zijn hersteld. Klik op Save om dit definitief op te slaan."
    );
  }

  async function savePricingChanges() {
    setIsPricingSaving(true);
    setPricingError("");
    setPricingSaveMessage("");

    try {
      await Promise.all(
        packageDrafts.map((item) =>
          updatePricingPackage({
            code: item.code,
            apiKey: settings.apiKey,
            tenantId: settings.tenantId,
            actorId: settings.actorId,
            source: settings.source,
            payload: {
              label: item.label,
              description: item.description || item.label,
              slug: item.slug || String(item.code || "").toLowerCase(),
              monthlyPriceInclVat: toNumber(item.monthlyPriceInclVat),
              setupPriceInclVat: toNumber(item.setupPriceInclVat),
              monthlyInfraCostExclVat: toNumber(item.monthlyInfraCostExclVat),
              vatRate: toNumber(item.vatRate || 0.21),
              featured: Boolean(item.featured),
              isActive: item.isActive !== false,
              sortOrder: toNumber(item.sortOrder || 0),
              fit: item.fit || "",
              cancelNote: item.cancelNote || "",
              cta: item.cta || "",
              bullets: Array.isArray(item.bullets) ? item.bullets : [],
              included: Array.isArray(item.included) ? item.included : [],
              notIncluded: Array.isArray(item.notIncluded) ? item.notIncluded : [],
              addons: Array.isArray(item.addons) ? item.addons : [],
            },
          })
        )
      );

      await Promise.all(
        addonDrafts.map((item) =>
          updatePricingAddon({
            code: item.code,
            apiKey: settings.apiKey,
            tenantId: settings.tenantId,
            actorId: settings.actorId,
            source: settings.source,
            payload: {
              label: item.label,
              description: item.description || item.label,
              monthlyPriceInclVat: toNumber(item.monthlyPriceInclVat),
              setupPriceInclVat: toNumber(item.setupPriceInclVat),
              monthlyInfraCostExclVat: toNumber(item.monthlyInfraCostExclVat),
              vatRate: toNumber(item.vatRate || 0.21),
              isActive: item.isActive !== false,
              sortOrder: toNumber(item.sortOrder || 0),
            },
          })
        )
      );

      await loadPricingFromBackend();
      setPricingSaveMessage("Prijzen succesvol opgeslagen.");
    } catch (error) {
      setPricingError(
        error instanceof Error ? error.message : "Opslaan van pricing is mislukt."
      );
    } finally {
      setIsPricingSaving(false);
    }
  }

  async function addCustomerAndProvision() {
    if (
      !customerForm.companyName ||
      !customerForm.contactName ||
      !customerForm.email ||
      !customerForm.domain
    ) {
      return null;
    }

    setIsProvisioning(true);
    setPricingError("");

    const pricingSnapshot =
      packageOptions.length > 0
        ? {
            packages: packageOptions,
            addons: extraOptions,
          }
        : await getFreshPricingSnapshot();

    const selectedPackage =
      pricingSnapshot.packages.find(
        (item) => item.code === customerForm.packageCode
      ) || null;

    if (!selectedPackage) {
      setPricingError("Geselecteerd pakket kon niet geladen worden.");
      setIsProvisioning(false);
      return null;
    }

    const monthlyRevenueInclVat =
      Number(selectedPackage?.monthlyPriceInclVat || 0) +
      (customerForm.extras || []).reduce((sum, code) => {
        const addon =
          pricingSnapshot.addons.find((item) => item.code === code) || null;
        return sum + Number(addon?.monthlyPriceInclVat || 0);
      }, 0);

    const monthlyInfraCostInclVat =
      Number(selectedPackage?.monthlyInfraCostInclVat || 0) +
      (customerForm.extras || []).reduce((sum, code) => {
        const addon =
          pricingSnapshot.addons.find((item) => item.code === code) || null;
        return sum + Number(addon?.monthlyInfraCostInclVat || 0);
      }, 0);

    const oneTimeSetupInclVat =
      Number(selectedPackage?.setupPriceInclVat || 0) +
      (customerForm.extras || []).reduce((sum, code) => {
        const addon =
          pricingSnapshot.addons.find((item) => item.code === code) || null;
        return sum + Number(addon?.setupPriceInclVat || 0);
      }, 0);

    const createPayload = {
      companyName: customerForm.companyName,
      contactName: customerForm.contactName,
      email: customerForm.email,
      phone: customerForm.phone,
      domain: customerForm.domain,
      packageCode: customerForm.packageCode,
      extras: customerForm.extras || [],
      notes: customerForm.notes,
      address: customerForm.address,
      postalCode: customerForm.postalCode,
      city: customerForm.city,
      country: customerForm.country,
      monthlyRevenueInclVat,
      monthlyInfraCostInclVat,
      oneTimeSetupInclVat,
      vatRate: Number(selectedPackage?.vatRate || 0.21),
    };

    const requestEntries = [];

    try {
      const createCustomerResult = await apiRequest(
        settings,
        "POST",
        "/api/customers",
        createPayload
      );

      requestEntries.push({
        id: createId("req-customer"),
        at: new Date().toISOString(),
        type: "CREATE_CUSTOMER",
        result: createCustomerResult,
      });

      const createdCustomer = createCustomerResult?.data?.data || null;

      if (!createCustomerResult.ok || !createdCustomer?.id) {
        throw new Error(
          createCustomerResult?.data?.error ||
            createCustomerResult?.data?.message ||
            "Klant aanmaken is mislukt."
        );
      }

      const nextCustomer = {
        ...createdCustomer,
        niche: customerForm.niche || "",
        templateKey: customerForm.templateKey || "",
      };

      setCustomers((prev) => [nextCustomer, ...prev.filter((item) => item.id !== nextCustomer.id)]);
      setSelectedCustomerId(nextCustomer.id);

      setBase44LinkForm({
        appId: "",
        appName: nextCustomer.companyName || "",
        editorUrl: "",
        previewUrl: "",
        niche: customerForm.niche || "",
        templateKey: customerForm.templateKey || "",
        requestedPrompt: buildBase44Prompt(customerForm),
      });

      setContentSyncForm({
        projectId: "",
        indexHtml: "",
        additionalFilesJson: "[]",
      });

      pushRequestLogEntries(requestEntries);
      resetCustomerForm();
      setIsCreateCustomerOpen(false);
      setActiveTab("customers");
      return nextCustomer;
    } catch (error) {
      const failedEntry = {
        id: createId("req-x"),
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
      pushRequestLogEntries(requestEntries);
      setPricingError(
        error instanceof Error ? error.message : "Klant aanmaken is mislukt."
      );
      return null;
    } finally {
      setIsProvisioning(false);
    }
  }

  async function autoCreateBase44App(customer) {
    if (!customer?.id) {
      return;
    }

    setIsAutoCreatingBase44(true);

    const result = await apiRequest(
      settings,
      "POST",
      `/api/customers/${customer.id}/base44-app/auto`,
      {
        niche: base44LinkForm.niche,
        templateKey: base44LinkForm.templateKey,
        requestedPrompt:
          base44LinkForm.requestedPrompt ||
          buildBase44Prompt({
            ...customer,
            niche: base44LinkForm.niche,
            templateKey: base44LinkForm.templateKey,
          }),
      }
    );

    const historyEntry = {
      id: createId("base44-auto"),
      at: new Date().toISOString(),
      type: "AUTO_CREATE_BASE44_APP",
      result,
    };

    if (result.ok && result?.data?.data) {
      const updatedCustomer = result.data.data;

      setCustomers((prev) =>
        prev.map((item) => (item.id === updatedCustomer.id ? updatedCustomer : item))
      );
    }

    pushRequestLogEntries(historyEntry);
    setIsAutoCreatingBase44(false);
  }

  async function startBuildFlow(customer) {
    if (!customer?.id) {
      return;
    }

    setIsStartingBuildFlow(true);

    let additionalFiles = [];
    try {
      additionalFiles = JSON.parse(contentSyncForm.additionalFilesJson || "[]");
    } catch {
      additionalFiles = [];
    }

    const result = await apiRequest(
      settings,
      "POST",
      `/api/customers/${customer.id}/start-build`,
      {
        niche: base44LinkForm.niche,
        templateKey: base44LinkForm.templateKey,
        requestedPrompt:
          base44LinkForm.requestedPrompt ||
          buildBase44Prompt({
            ...customer,
            niche: base44LinkForm.niche,
            templateKey: base44LinkForm.templateKey,
          }),
        projectId: contentSyncForm.projectId || customer.base44?.appId || "",
        indexHtml: contentSyncForm.indexHtml,
        additionalFiles,
      }
    );

    const historyEntry = {
      id: createId("start-build"),
      at: new Date().toISOString(),
      type: "START_BUILD_FLOW",
      result,
    };

    if (result.ok && result?.data?.data?.customer) {
      const updatedCustomer = result.data.data.customer;
      setCustomers((prev) =>
        prev.map((item) => (item.id === updatedCustomer.id ? updatedCustomer : item))
      );
      setSelectedCustomerId(updatedCustomer.id);
    }

    pushRequestLogEntries(historyEntry);
    setIsStartingBuildFlow(false);
  }

  async function createCustomerAndStartBuild() {
    const draftSnapshot = {
      niche: customerForm.niche,
      templateKey: customerForm.templateKey,
      requestedPrompt: buildBase44Prompt(customerForm),
    };

    const createdCustomer = await addCustomerAndProvision();
    if (!createdCustomer?.id) {
      return;
    }

    const customerForBuild = {
      ...createdCustomer,
      niche: draftSnapshot.niche || createdCustomer.niche || "",
      templateKey: draftSnapshot.templateKey || createdCustomer.templateKey || "",
    };

    setBase44LinkForm((prev) => ({
      ...prev,
      niche: draftSnapshot.niche || prev.niche,
      templateKey: draftSnapshot.templateKey || prev.templateKey,
      requestedPrompt: draftSnapshot.requestedPrompt || prev.requestedPrompt,
    }));

    await startBuildFlow(customerForBuild);
  }

  async function syncCustomerContent(customer) {
    if (!customer?.id || !contentSyncForm.indexHtml.trim()) {
      return;
    }

    setIsSyncingContent(true);

    let additionalFiles = [];
    try {
      additionalFiles = JSON.parse(contentSyncForm.additionalFilesJson || "[]");
    } catch {
      additionalFiles = [];
    }

    const result = await apiRequest(
      settings,
      "POST",
      `/api/customers/${customer.id}/content-sync`,
      {
        projectId: contentSyncForm.projectId || customer.base44?.appId || "",
        indexHtml: contentSyncForm.indexHtml,
        additionalFiles,
      }
    );

    const historyEntry = {
      id: createId("content-sync"),
      at: new Date().toISOString(),
      type: "SYNC_CUSTOMER_CONTENT",
      result,
    };

    if (result.ok && result?.data?.data?.customer) {
      const updatedCustomer = result.data.data.customer;
      setCustomers((prev) =>
        prev.map((item) => (item.id === updatedCustomer.id ? updatedCustomer : item))
      );
    }

    pushRequestLogEntries(historyEntry);
    setIsSyncingContent(false);
  }

  async function linkBase44App(customer) {
    if (!customer?.id || !base44LinkForm.appId) {
      return;
    }

    setIsLinkingBase44(true);

    const result = await apiRequest(
      settings,
      "POST",
      `/api/customers/${customer.id}/base44-app`,
      {
        appId: base44LinkForm.appId,
        appName: base44LinkForm.appName || customer.companyName,
        editorUrl: base44LinkForm.editorUrl,
        previewUrl: base44LinkForm.previewUrl,
        templateKey: base44LinkForm.templateKey,
        niche: base44LinkForm.niche,
        requestedPrompt:
          base44LinkForm.requestedPrompt ||
          buildBase44Prompt({
            ...customer,
            niche: base44LinkForm.niche,
            templateKey: base44LinkForm.templateKey,
          }),
      }
    );

    const historyEntry = {
      id: createId("base44-link"),
      at: new Date().toISOString(),
      type: "LINK_BASE44_APP",
      result,
    };

    if (result.ok && result?.data?.data) {
      const updatedCustomer = result.data.data;

      setCustomers((prev) =>
        prev.map((item) => (item.id === updatedCustomer.id ? updatedCustomer : item))
      );
    }

    pushRequestLogEntries(historyEntry);
    setIsLinkingBase44(false);
  }

  async function markPreviewReady(customer) {
    if (!customer?.id) {
      return;
    }

    setIsUpdatingWorkflow(true);

    const result = await apiRequest(
      settings,
      "POST",
      `/api/customers/${customer.id}/preview-ready`,
      {
        previewUrl:
          base44LinkForm.previewUrl || customer?.base44?.previewUrl || "",
      }
    );

    const historyEntry = {
      id: createId("preview-ready"),
      at: new Date().toISOString(),
      type: "MARK_PREVIEW_READY",
      result,
    };

    if (result.ok && result?.data?.data) {
      const updatedCustomer = result.data.data;
      setCustomers((prev) =>
        prev.map((item) => (item.id === updatedCustomer.id ? updatedCustomer : item))
      );
    }

    pushRequestLogEntries(historyEntry);
    setIsUpdatingWorkflow(false);
  }

  async function approveCustomerForProduction(customer) {
    if (!customer?.id) {
      return;
    }

    setIsUpdatingWorkflow(true);

    const result = await apiRequest(
      settings,
      "POST",
      `/api/customers/${customer.id}/approve`,
      {
        previewUrl:
          base44LinkForm.previewUrl || customer?.base44?.previewUrl || "",
      }
    );

    const historyEntry = {
      id: createId("approve-customer"),
      at: new Date().toISOString(),
      type: "APPROVE_CUSTOMER_FOR_PRODUCTION",
      result,
    };

    if (result.ok && result?.data?.data) {
      const updatedCustomer = result.data.data;
      setCustomers((prev) =>
        prev.map((item) => (item.id === updatedCustomer.id ? updatedCustomer : item))
      );
    }

    pushRequestLogEntries(historyEntry);
    setIsUpdatingWorkflow(false);
  }

  async function deployCustomer(customer) {
    if (!customer?.id) {
      return;
    }

    setIsUpdatingWorkflow(true);

    const result = await apiRequest(
      settings,
      "POST",
      `/api/customers/${customer.id}/deploy`,
      {
        projectName: slugify(customer.companyName || customer.domain),
      }
    );

    const historyEntry = {
      id: createId("deploy-customer"),
      at: new Date().toISOString(),
      type: "DEPLOY_CUSTOMER",
      result,
    };

    if (result.ok && result?.data?.data?.customer) {
      const updatedCustomer = result.data.data.customer;
      setCustomers((prev) =>
        prev.map((item) => (item.id === updatedCustomer.id ? updatedCustomer : item))
      );
    }

    pushRequestLogEntries(historyEntry);
    setIsUpdatingWorkflow(false);
  }

  function openBase44Editor(customer) {
    const url = customer?.base44?.editorUrl;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  function openBase44Preview(customer) {
    const url = customer?.preview?.fullUrl || customer?.base44?.previewUrl;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  async function refreshCustomerDeployment(customer) {
    if (!customer || !customer.deployment?.deploymentId) {
      return;
    }

    const result = await apiRequest(
      settings,
      "GET",
      `/api/deployments/${customer.deployment.deploymentId}`
    );

    const deployment = result?.data?.data || result?.data || {};
    const normalizedStatus = String(deployment.status || "").toUpperCase();

    let nextStatus = customer.status;

    if (normalizedStatus === "SUCCEEDED") {
      nextStatus = "active";
    }

    if (normalizedStatus === "FAILED") {
      nextStatus = "failed";
    }

    if (normalizedStatus === "IN_PROGRESS" || normalizedStatus === "PENDING") {
      nextStatus = "provisioning";
    }

    const historyEntry = {
      id: createId("refresh"),
      at: new Date().toISOString(),
      type: "GET_DEPLOYMENT",
      result,
    };

    setCustomers((prev) =>
      prev.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: nextStatus,
              deployment: {
                ...(item.deployment || {}),
                status: deployment.status || item.deployment?.status,
                currentStage: deployment.currentStage || item.deployment?.currentStage,
                deploymentId:
                  item.deployment?.deploymentId || deployment.deploymentId || "",
              },
            }
          : item
      )
    );

    pushRequestLogEntries(historyEntry);
  }

  async function refreshSingleCustomer(customerId) {
    if (!customerId) {
      return;
    }

    const result = await apiRequest(settings, "GET", `/api/customers/${customerId}`);
    const nextCustomer = result?.data?.data || null;

    if (result.ok && nextCustomer?.id) {
      setCustomers((prev) =>
        prev.map((item) => (item.id === nextCustomer.id ? nextCustomer : item))
      );
    }
  }

  async function runAutoRefreshCycle() {
    const busyCustomers = customers.filter(
      (customer) =>
        isCustomerBusy(customer) ||
        customer?.deployment?.status === "PENDING" ||
        customer?.deployment?.status === "IN_PROGRESS"
    );

    if (busyCustomers.length === 0) {
      return;
    }

    setIsAutoRefreshing(true);

    try {
      await Promise.all(
        busyCustomers.map(async (customer) => {
          await refreshSingleCustomer(customer.id);
          if (customer?.deployment?.deploymentId) {
            await refreshCustomerDeployment(customer);
          }
        })
      );
    } finally {
      setIsAutoRefreshing(false);
    }
  }

  useEffect(() => {
    const hasBusyCustomers = customers.some(
      (customer) =>
        isCustomerBusy(customer) ||
        customer?.deployment?.status === "PENDING" ||
        customer?.deployment?.status === "IN_PROGRESS"
    );

    if (!hasBusyCustomers) {
      if (pollingRef.current) {
        window.clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    if (!pollingRef.current) {
      pollingRef.current = window.setInterval(() => {
        runAutoRefreshCycle();
      }, 10000);
    }

    return () => {
      if (pollingRef.current) {
        window.clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [customers, settings.baseUrl, settings.apiKey, settings.tenantId, settings.actorId, settings.source]);

  async function redeployCustomer(customer) {
    if (!customer || !customer.deployment?.deploymentId) {
      return;
    }

    const result = await apiRequest(
      settings,
      "POST",
      `/api/deployments/${customer.deployment.deploymentId}/redeploy`,
      { mode: "CONTENT_ONLY" }
    );

    const historyEntry = {
      id: createId("redeploy"),
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
            }
          : item
      )
    );

    pushRequestLogEntries(historyEntry);
  }

  async function saveCustomerEdits(updatedCustomer) {
    try {
      const apiKey = settings.apiKey;
  
      const saved = await updateCustomer({
        id: updatedCustomer.id,
        payload: updatedCustomer,
        apiKey,
      });
  
      setCustomers((prev) =>
        prev.map((c) => (c.id === saved.id ? saved : c))
      );
    } catch (e) {
      console.error(e);
      alert("Opslaan mislukt");
    }
  }

  function requestDeleteCustomer(customer) {
    setDeleteCandidate(customer);
  }

  async function confirmDeleteCustomer() {
    if (!deleteCandidate) return;
  
    try {
      const apiKey = settings.apiKey;
  
      await deleteCustomer({
        id: deleteCandidate.id,
        apiKey,
      });
  
      setCustomers((prev) =>
        prev.filter((c) => c.id !== deleteCandidate.id)
      );
  
      setDeleteCandidate(null);
    } catch (e) {
      console.error(e);
      alert("Verwijderen mislukt");
    }
  }

  function addExpense() {
    if (!expenseForm.title || !expenseForm.amount) {
      return;
    }

    const nextExpense = {
      id: createId("exp"),
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

            reader.onload = () => {
              resolve({
                id: createId(`doc-${file.name}`),
                name: file.name,
                type: file.type,
                size: file.size,
                uploadedAt: new Date().toISOString(),
                dataUrl: typeof reader.result === "string" ? reader.result : "",
              });
            };

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

  const pricingVatSummary = useMemo(() => {
    const multiplier =
      vatFilter === "month" ? 1 : vatFilter === "quarter" ? 3 : 12;

    const outputVatPackages = customers.reduce((sum, customer) => {
      const pkg = getPackageByCode(customer.packageCode);
      const packageVat = Number(pkg?.monthlyVatAmount || 0) * multiplier;

      const addonVat = (customer.extras || []).reduce((addonSum, code) => {
        const addon = getAddonByCode(code);
        return addonSum + Number(addon?.monthlyVatAmount || 0) * multiplier;
      }, 0);

      return sum + packageVat + addonVat;
    }, 0);

    const inputVatInfra = customers.reduce((sum, customer) => {
      const pkg = getPackageByCode(customer.packageCode);
      const packageVat = Number(pkg?.monthlyInfraCostVatAmount || 0) * multiplier;

      const addonVat = (customer.extras || []).reduce((addonSum, code) => {
        const addon = getAddonByCode(code);
        return addonSum + Number(addon?.monthlyInfraCostVatAmount || 0) * multiplier;
      }, 0);

      return sum + packageVat + addonVat;
    }, 0);

    const manualExpenseVat = financeExpenses.reduce((sum, expense) => {
      const amountInclVat = Number(expense.amount || 0);
      return sum + calcVatFromInc(amountInclVat, 0.21);
    }, 0);

    const outputVat = round2(outputVatPackages);
    const inputVat = round2(inputVatInfra + manualExpenseVat);
    const payableVat = round2(outputVat - inputVat);

    return {
      outputVat,
      inputVat,
      payableVat,
    };
  }, [customers, packageOptions, extraOptions, financeExpenses, vatFilter]);

  const selectedCustomerWorkflowState = useMemo(() => {
    if (!selectedCustomer) {
      return "NOT_SELECTED";
    }
    return deriveWorkflowStateLabel(selectedCustomer);
  }, [selectedCustomer]);

  return {
    activeTab,
    setActiveTab,
    pricingTab,
    setPricingTab,
    settings,
    updateSettings,
    customers,
    filteredCustomers,
    selectedCustomer,
    selectedCustomerWorkflowState,
    setSelectedCustomerId,
    customerSearch,
    setCustomerSearch,
    expenses,
    expenseForm,
    setExpenseForm,
    requestLog,
    financeFilter,
    setFinanceFilter,
    detailFilter,
    setDetailFilter,
    vatFilter,
    setVatFilter,
    isProvisioning,
    isLinkingBase44,
    isAutoCreatingBase44,
    isSyncingContent,
    isStartingBuildFlow,
    isUpdatingWorkflow,
    isCreateCustomerOpen,
    setIsCreateCustomerOpen,
    isAutoRefreshing,
    deleteCandidate,
    setDeleteCandidate,
    customerForm,
    updateCustomerForm,
    toggleExtra,
    resetCustomerForm,
    addCustomerAndProvision,
    createCustomerAndStartBuild,
    refreshCustomerDeployment,
    refreshSingleCustomer,
    runAutoRefreshCycle,
    redeployCustomer,
    saveCustomerEdits,
    requestDeleteCustomer,
    confirmDeleteCustomer,
    addExpense,
    uploadDocuments,
    packageOptions,
    extraOptions,
    packageDrafts,
    addonDrafts,
    updatePackageDraft,
    updateAddonDraft,
    resetPricingDrafts,
    restoreDefaultPricing,
    savePricingChanges,
    pricingSaveMessage,
    pricingError,
    isPricingLoading,
    isPricingSaving,
    totalMonthlyRevenue,
    totalMonthlyCosts,
    activeCustomers,
    failedCustomers,
    warningCustomers,
    packageChartData,
    dashboardTrendData,
    selectedCustomerStats,
    selectedCustomerTrendData,
    pricingVatSummary,
    calcMonthlyRevenue,
    calcSetupRevenue,
    calcMonthlyInfraCost,
    loadPricingFromBackend,
    loadCustomersFromBackend,
    base44LinkForm,
    updateBase44LinkForm,
    contentSyncForm,
    updateContentSyncForm,
    autoCreateBase44App,
    startBuildFlow,
    syncCustomerContent,
    linkBase44App,
    markPreviewReady,
    approveCustomerForProduction,
    deployCustomer,
    openBase44Editor,
    openBase44Preview,
  };
}