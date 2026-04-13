import { useEffect, useMemo, useState } from "react";
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

export function useAdminStore() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pricingTab, setPricingTab] = useState("packages");

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
  const [vatFilter, setVatFilter] = useState("month");

  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const [packageOptions, setPackageOptions] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [packageDrafts, setPackageDrafts] = useState([]);
  const [addonDrafts, setAddonDrafts] = useState([]);

  const [isPricingLoading, setIsPricingLoading] = useState(false);
  const [isPricingSaving, setIsPricingSaving] = useState(false);
  const [pricingSaveMessage, setPricingSaveMessage] = useState("");
  const [pricingError, setPricingError] = useState("");

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
  
      const incomingPackages = Array.isArray(summary?.packages) ? summary.packages : [];
      const incomingAddons = Array.isArray(summary?.addons) ? summary.addons : [];
  
      if (incomingPackages.length === 0 && incomingAddons.length === 0) {
        throw new Error("Lege pricing response van backend.");
      }
  
      const packages = clonePricingData(incomingPackages);
      const addons = clonePricingData(incomingAddons);
  
      setPackageOptions(packages);
      setExtraOptions(addons);
      setPackageDrafts(clonePricingData(packages));
      setAddonDrafts(clonePricingData(addons));
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

  useEffect(() => {
    loadPricingFromBackend();
  }, []);

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
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [customers, customerSearch]);

  const selectedCustomer = useMemo(() => {
    return customers.find((item) => item.id === selectedCustomerId) || null;
  }, [customers, selectedCustomerId]);

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
    return customers.reduce((sum, customer) => sum + calcMonthlyRevenue(customer), 0);
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
    setCustomerForm(DEFAULT_CUSTOMER_FORM);
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

  function createCustomerDraft() {
    const companySlug = slugify(customerForm.companyName);
    const domainSlug = slugify(
      customerForm.domain.split(".")[0] || customerForm.companyName
    );
    const customerId = `cust_${companySlug || domainSlug || Date.now()}`;

    const monthlyRevenue =
      Number(getPackageByCode(customerForm.packageCode)?.monthlyPriceInclVat || 0) +
      (customerForm.extras || []).reduce((sum, code) => {
        const addon = getAddonByCode(code);
        return sum + Number(addon?.monthlyPriceInclVat || 0);
      }, 0);

    const monthlyInfraCost =
      Number(getPackageByCode(customerForm.packageCode)?.monthlyInfraCostInclVat || 0) +
      (customerForm.extras || []).reduce((sum, code) => {
        const addon = getAddonByCode(code);
        return sum + Number(addon?.monthlyInfraCostInclVat || 0);
      }, 0);

    const oneTimeSetupCost =
      Number(getPackageByCode(customerForm.packageCode)?.setupPriceInclVat || 0) +
      (customerForm.extras || []).reduce((sum, code) => {
        const addon = getAddonByCode(code);
        return sum + Number(addon?.setupPriceInclVat || 0);
      }, 0);

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

      requestEntries.push({
        id: createId("req-1"),
        at: new Date().toISOString(),
        type: "CREATE_DEPLOYMENT",
        result: deployResult,
      });

      const deploymentId =
        deployResult?.data?.data?.deploymentId ||
        deployResult?.data?.deploymentId ||
        "";

      const deploymentStatus =
        deployResult?.data?.data?.status ||
        deployResult?.data?.status ||
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

        requestEntries.push({
          id: createId("req-2"),
          at: new Date().toISOString(),
          type: "PROVISION_MAIL",
          result: mailResult,
        });

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
                  deployResult?.data?.data?.currentStage ||
                  deployResult?.data?.currentStage ||
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
    if (!customer || !customer.deploymentId) {
      return;
    }

    const result = await apiRequest(
      settings,
      "GET",
      `/api/deployments/${customer.deploymentId}`
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
    if (!customer || !customer.deploymentId) {
      return;
    }

    const result = await apiRequest(
      settings,
      "POST",
      `/api/deployments/${customer.deploymentId}/redeploy`,
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
    if (!deleteCandidate) {
      return;
    }

    const customerId = deleteCandidate.id;

    setCustomers((prev) => prev.filter((item) => item.id !== customerId));

    if (selectedCustomerId === customerId) {
      setSelectedCustomerId(null);
    }

    setDeleteCandidate(null);
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
    isCreateCustomerOpen,
    setIsCreateCustomerOpen,
    deleteCandidate,
    setDeleteCandidate,
    customerForm,
    updateCustomerForm,
    toggleExtra,
    resetCustomerForm,
    addCustomerAndProvision,
    refreshCustomerDeployment,
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
  };
}