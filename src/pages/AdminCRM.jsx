import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEYS = {
  settings: "vedantix_admin_settings_v3",
  customers: "vedantix_admin_customers_v3",
  history: "vedantix_admin_request_history_v3",
};

const DEFAULT_SETTINGS = {
  baseUrl: "/provisioning-api",
  apiKey: "",
  tenantId: "default",
  actorId: "admin-dashboard",
  source: "ADMIN_PANEL",
  autoIdempotency: true,
};

const DEFAULT_CUSTOMER = {
  id: "",
  name: "",
  projectName: "",
  domain: "",
  packageCode: "STARTER",
  addOnsCsv: "",
  deploymentId: "",
  mailDomainId: "",
  mailboxLocalPart: "",
  mailboxDisplayName: "",
  mailboxPassword: "",
};

const STAGES = [
  "DOMAIN_CHECK",
  "GITHUB_PROVISION",
  "S3_BUCKET",
  "ACM_REQUEST",
  "ACM_VALIDATION_RECORDS",
  "ACM_DNS_PROPAGATION",
  "ACM_WAIT",
  "CLOUDFRONT",
  "ROUTE53_ALIAS",
  "GITHUB_DISPATCH",
  "DYNAMODB",
  "SQS",
  "DELETE_DOMAIN_ALIAS",
  "DISABLE_CLOUDFRONT",
  "WAIT_CLOUDFRONT_DISABLED",
  "DELETE_CLOUDFRONT",
  "EMPTY_S3_BUCKET",
  "DELETE_S3_BUCKET",
  "DELETE_ACM_VALIDATION_RECORDS",
  "DELETE_ACM_CERTIFICATE",
  "FINALIZE_DELETE",
];

const PACKAGE_CODES = ["STARTER", "GROWTH", "PRO", "CUSTOM"];
const REDEPLOY_MODES = ["CONTENT_ONLY", "REPAIR_INFRA", "FULL_RECONCILE"];

const ENDPOINT_PRESETS = [
  {
    key: "health",
    label: "Health",
    method: "GET",
    path: "/health",
    body: "",
    category: "System",
  },
  {
    key: "ready",
    label: "Ready",
    method: "GET",
    path: "/ready",
    body: "",
    category: "System",
  },
  {
    key: "create-deployment-v2",
    label: "Create deployment (v2)",
    method: "POST",
    path: "/api/deployments",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        projectName: "vedantix-test-project",
        domain: "test.vedantix.nl",
        packageCode: "STARTER",
        addOns: [],
      },
      null,
      2
    ),
    category: "Deployments v2",
  },
  {
    key: "get-deployment-v2",
    label: "Get deployment (v2)",
    method: "GET",
    path: "/api/deployments/:deploymentId",
    body: "",
    category: "Deployments v2",
  },
  {
    key: "resume-deployment-v2",
    label: "Resume deployment (v2)",
    method: "POST",
    path: "/api/deployments/:deploymentId/resume",
    body: "{}",
    category: "Deployments v2",
  },
  {
    key: "redeploy-deployment-v2",
    label: "Redeploy deployment (v2)",
    method: "POST",
    path: "/api/deployments/:deploymentId/redeploy",
    body: JSON.stringify({ mode: "CONTENT_ONLY" }, null, 2),
    category: "Deployments v2",
  },
  {
    key: "retry-stage-v2",
    label: "Retry stage (v2)",
    method: "POST",
    path: "/api/deployments/:deploymentId/retry/:stage",
    body: "{}",
    category: "Deployments v2",
  },
  {
    key: "deployment-operations-v2",
    label: "Deployment operations (v2)",
    method: "GET",
    path: "/api/deployments/:deploymentId/operations",
    body: "",
    category: "Deployments v2",
  },
  {
    key: "deployment-audit-v2",
    label: "Deployment audit (v2)",
    method: "GET",
    path: "/api/deployments/:deploymentId/audit",
    body: "",
    category: "Deployments v2",
  },
  {
    key: "rollback-v2",
    label: "Rollback deployment (v2)",
    method: "POST",
    path: "/api/deployments/:deploymentId/rollback",
    body: JSON.stringify({ rollbackRef: "" }, null, 2),
    category: "Deployments v2",
  },
  {
    key: "delete-v2",
    label: "Delete deployment (v2)",
    method: "POST",
    path: "/api/deployments/:deploymentId/delete",
    body: "{}",
    category: "Deployments v2",
  },
  {
    key: "get-operation-v2",
    label: "Get operation (v2)",
    method: "GET",
    path: "/api/operations/:operationId",
    body: "",
    category: "Deployments v2",
  },
  {
    key: "cleanup-candidates",
    label: "Cleanup candidates",
    method: "GET",
    path: "/api/admin/cleanup-candidates",
    body: "",
    category: "Admin",
  },
  {
    key: "cleanup-run",
    label: "Run cleanup",
    method: "POST",
    path: "/api/admin/cleanup/run",
    body: JSON.stringify({ dryRun: true }, null, 2),
    category: "Admin",
  },
  {
    key: "orphans",
    label: "Scan orphans",
    method: "GET",
    path: "/api/admin/orphans",
    body: "",
    category: "Admin",
  },
  {
    key: "reconcile-admin",
    label: "Reconcile deployment",
    method: "POST",
    path: "/api/admin/deployments/:deploymentId/reconcile",
    body: "{}",
    category: "Admin",
  },
  {
    key: "consistency-admin",
    label: "Deployment consistency",
    method: "GET",
    path: "/api/admin/deployments/:deploymentId/consistency",
    body: "",
    category: "Admin",
  },
  {
    key: "mail-domain-create",
    label: "Create mail domain",
    method: "POST",
    path: "/api/mail/domains",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        domain: "mail.vedantix.nl",
      },
      null,
      2
    ),
    category: "Mail",
  },
  {
    key: "mail-domain-dns",
    label: "Mail domain DNS records",
    method: "GET",
    path: "/api/mail/domains/:mailDomainId/dns-records",
    body: "",
    category: "Mail",
  },
  {
    key: "mail-domain-reconcile",
    label: "Reconcile mail domain",
    method: "POST",
    path: "/api/mail/domains/:mailDomainId/reconcile",
    body: "{}",
    category: "Mail",
  },
  {
    key: "mailbox-create",
    label: "Create mailbox",
    method: "POST",
    path: "/api/mail/mailboxes",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        mailDomainId: "mail-domain-id",
        localPart: "info",
        displayName: "Info",
        includedStorageGb: 5,
        extraStorageGb: 0,
        password: "SterkTijdelijkWachtwoord123!",
      },
      null,
      2
    ),
    category: "Mail",
  },
  {
    key: "mailbox-disable",
    label: "Disable mailbox",
    method: "POST",
    path: "/api/mail/mailboxes/:mailboxId/disable",
    body: JSON.stringify({ reason: "temporary" }, null, 2),
    category: "Mail",
  },
  {
    key: "mailbox-enable",
    label: "Enable mailbox",
    method: "POST",
    path: "/api/mail/mailboxes/:mailboxId/enable",
    body: "{}",
    category: "Mail",
  },
  {
    key: "mailbox-delete",
    label: "Delete mailbox",
    method: "DELETE",
    path: "/api/mail/mailboxes/:mailboxId",
    body: "",
    category: "Mail",
  },
  {
    key: "customer-provision-mail",
    label: "Provision customer mail",
    method: "POST",
    path: "/api/customers/:customerId/provision-mail",
    body: JSON.stringify(
      {
        domain: "vedantix.nl",
        packageCode: "STARTER",
      },
      null,
      2
    ),
    category: "Mail",
  },
  {
    key: "legacy-deploy",
    label: "Legacy deploy",
    method: "POST",
    path: "/api/deploy",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        projectName: "vedantix-test-project",
        domain: "test.vedantix.nl",
        packageCode: "STARTER",
        addOns: [],
      },
      null,
      2
    ),
    category: "Legacy",
  },
  {
    key: "legacy-check-domain",
    label: "Legacy domain check",
    method: "POST",
    path: "/api/domains/check",
    body: JSON.stringify({ domain: "test.vedantix.nl" }, null, 2),
    category: "Legacy",
  },
  {
    key: "legacy-add-domain",
    label: "Legacy add domain",
    method: "POST",
    path: "/api/domains",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        deploymentId: "deployment-id",
        domain: "extra.vedantix.nl",
      },
      null,
      2
    ),
    category: "Legacy",
  },
  {
    key: "legacy-upgrade-package",
    label: "Legacy package upgrade",
    method: "POST",
    path: "/api/package-upgrades",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        deploymentId: "deployment-id",
        targetPackageCode: "PRO",
        addOns: [],
      },
      null,
      2
    ),
    category: "Legacy",
  },
  {
    key: "legacy-add-mailbox",
    label: "Legacy add mailbox",
    method: "POST",
    path: "/api/mailboxes",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        deploymentId: "deployment-id",
        domain: "vedantix.nl",
        mailboxLocalPart: "sales",
        quantity: 1,
      },
      null,
      2
    ),
    category: "Legacy",
  },
  {
    key: "legacy-delete-everything",
    label: "Legacy delete everything",
    method: "POST",
    path: "/api/delete-everything",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        deploymentId: "deployment-id",
        confirm: true,
      },
      null,
      2
    ),
    category: "Legacy",
  },
  {
    key: "legacy-redeploy",
    label: "Legacy redeploy",
    method: "POST",
    path: "/api/redeploy",
    body: JSON.stringify(
      {
        customerId: "cust_test_001",
        deploymentId: "deployment-id",
      },
      null,
      2
    ),
    category: "Legacy",
  },
];

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

function pretty(value) {
  if (typeof value === "string") {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }
  return JSON.stringify(value, null, 2);
}

function buildHeaders(settings, method, extra = {}) {
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": settings.apiKey || "",
    "X-Tenant-Id": settings.tenantId || "default",
    "X-Actor-Id": settings.actorId || "admin-dashboard",
    "X-Source": settings.source || "ADMIN_PANEL",
    ...extra,
  };

  if (settings.autoIdempotency && method !== "GET") {
    headers["Idempotency-Key"] =
      extra["Idempotency-Key"] ||
      (window.crypto?.randomUUID?.() ?? `req-${Date.now()}`);
  }

  return headers;
}

async function callProvisioningApi(settings, method, path, bodyText = "") {
  const url = `${settings.baseUrl.replace(/\/$/, "")}${path}`;
  const headers = buildHeaders(settings, method);
  const options = {
    method,
    headers,
  };

  if (method !== "GET" && bodyText && bodyText.trim()) {
    options.body = bodyText;
  }

  const response = await fetch(url, options);
  const text = await response.text();

  let data = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    url,
    headers,
    data,
  };
}

function SectionTitle(props) {
  const { title, subtitle, action = null } = props;

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
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#e2e8f0",
            marginBottom: 6,
          }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p style={{ color: "#94a3b8", fontSize: 14 }}>{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function TabButton(props) {
  const { active, children, onClick } = props;

  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid",
        borderColor: active ? "#38bdf8" : "#334155",
        background: active ? "rgba(56,189,248,0.12)" : "#0f172a",
        color: active ? "#e0f2fe" : "#94a3b8",
        borderRadius: 12,
        padding: "10px 14px",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function SmallButton(props) {
  const { children, onClick, tone = "default", disabled = false, type = "button" } = props;

  const tones = {
    default: {
      background: "#0f172a",
      border: "#334155",
      color: "#e2e8f0",
    },
    primary: {
      background: "#0ea5e9",
      border: "#0ea5e9",
      color: "#082f49",
    },
    success: {
      background: "#10b981",
      border: "#10b981",
      color: "#052e16",
    },
    danger: {
      background: "#ef4444",
      border: "#ef4444",
      color: "#450a0a",
    },
    muted: {
      background: "#1e293b",
      border: "#334155",
      color: "#cbd5e1",
    },
  };

  const palette = tones[tone] || tones.default;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        background: palette.background,
        color: palette.color,
        border: `1px solid ${palette.border}`,
        borderRadius: 10,
        padding: "9px 12px",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}

function Field(props) {
  const { label, children } = props;

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 700 }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        background: "#020617",
        color: "#e2e8f0",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "11px 12px",
        outline: "none",
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
        background: "#020617",
        color: "#e2e8f0",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "11px 12px",
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
        minHeight: 140,
        resize: "vertical",
        background: "#020617",
        color: "#e2e8f0",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "11px 12px",
        outline: "none",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        ...(props.style || {}),
      }}
    />
  );
}

function Card(props) {
  const { children, style = {} } = props;

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #1f2937",
        borderRadius: 18,
        padding: 18,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function AdminCRM() {
  const [activeTab, setActiveTab] = useState("overview");
  const [settings, setSettings] = useState(() =>
    loadJson(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );
  const [customers, setCustomers] = useState(() =>
    loadJson(STORAGE_KEYS.customers, [])
  );
  const [history, setHistory] = useState(() =>
    loadJson(STORAGE_KEYS.history, [])
  );

  const [customerForm, setCustomerForm] = useState(DEFAULT_CUSTOMER);

  const [selectedPresetKey, setSelectedPresetKey] = useState(
    ENDPOINT_PRESETS[0].key
  );
  const [requestPath, setRequestPath] = useState(ENDPOINT_PRESETS[0].path);
  const [requestMethod, setRequestMethod] = useState(ENDPOINT_PRESETS[0].method);
  const [requestBody, setRequestBody] = useState(ENDPOINT_PRESETS[0].body);

  const [responseState, setResponseState] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const [deploymentLookupId, setDeploymentLookupId] = useState("");
  const [operationLookupId, setOperationLookupId] = useState("");
  const [mailDomainLookupId, setMailDomainLookupId] = useState("");
  const [mailboxLookupId, setMailboxLookupId] = useState("");
  const [retryStage, setRetryStage] = useState(STAGES[0]);
  const [redeployMode, setRedeployMode] = useState(REDEPLOY_MODES[0]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    saveJson(STORAGE_KEYS.settings, settings);
  }, [settings]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.customers, customers);
  }, [customers]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.history, history);
  }, [history]);

  const selectedPreset = useMemo(() => {
    return ENDPOINT_PRESETS.find((item) => item.key === selectedPresetKey);
  }, [selectedPresetKey]);

  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter((customer) => {
      return [
        customer.name,
        customer.id,
        customer.domain,
        customer.projectName,
        customer.deploymentId,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [customers, search]);

  const groupedPresets = useMemo(() => {
    return ENDPOINT_PRESETS.reduce((acc, preset) => {
      if (!acc[preset.category]) {
        acc[preset.category] = [];
      }
      acc[preset.category].push(preset);
      return acc;
    }, {});
  }, []);

  function updateCustomerForm(key, value) {
    setCustomerForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateSettings(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function resetRequestFromPreset(preset) {
    setSelectedPresetKey(preset.key);
    setRequestMethod(preset.method);
    setRequestPath(preset.path);
    setRequestBody(preset.body);
  }

  function applyCustomerToRequest(customer, presetKey) {
    const addOns = String(customer.addOnsCsv || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const map = {
      "create-deployment-v2": {
        path: "/api/deployments",
        method: "POST",
        body: pretty({
          customerId: customer.id,
          projectName: customer.projectName || customer.name || customer.id,
          domain: customer.domain,
          packageCode: customer.packageCode || "STARTER",
          addOns,
        }),
      },
      "get-deployment-v2": {
        path: `/api/deployments/${customer.deploymentId || ":deploymentId"}`,
        method: "GET",
        body: "",
      },
      "redeploy-deployment-v2": {
        path: `/api/deployments/${customer.deploymentId || ":deploymentId"}/redeploy`,
        method: "POST",
        body: pretty({ mode: redeployMode }),
      },
      "deployment-operations-v2": {
        path: `/api/deployments/${customer.deploymentId || ":deploymentId"}/operations`,
        method: "GET",
        body: "",
      },
      "deployment-audit-v2": {
        path: `/api/deployments/${customer.deploymentId || ":deploymentId"}/audit`,
        method: "GET",
        body: "",
      },
      "legacy-check-domain": {
        path: "/api/domains/check",
        method: "POST",
        body: pretty({ domain: customer.domain }),
      },
      "legacy-deploy": {
        path: "/api/deploy",
        method: "POST",
        body: pretty({
          customerId: customer.id,
          projectName: customer.projectName || customer.name || customer.id,
          domain: customer.domain,
          packageCode: customer.packageCode || "STARTER",
          addOns: [],
        }),
      },
      "legacy-redeploy": {
        path: "/api/redeploy",
        method: "POST",
        body: pretty({
          customerId: customer.id,
          deploymentId: customer.deploymentId,
        }),
      },
      "legacy-delete-everything": {
        path: "/api/delete-everything",
        method: "POST",
        body: pretty({
          customerId: customer.id,
          deploymentId: customer.deploymentId,
          confirm: true,
        }),
      },
      "mail-domain-create": {
        path: "/api/mail/domains",
        method: "POST",
        body: pretty({
          customerId: customer.id,
          domain: customer.domain,
        }),
      },
      "customer-provision-mail": {
        path: `/api/customers/${customer.id}/provision-mail`,
        method: "POST",
        body: pretty({
          domain: customer.domain,
          packageCode: customer.packageCode || "STARTER",
        }),
      },
      "mailbox-create": {
        path: "/api/mail/mailboxes",
        method: "POST",
        body: pretty({
          customerId: customer.id,
          mailDomainId: customer.mailDomainId || "mail-domain-id",
          localPart: customer.mailboxLocalPart || "info",
          displayName: customer.mailboxDisplayName || customer.name || "Mailbox",
          includedStorageGb: 5,
          extraStorageGb: 0,
          password: customer.mailboxPassword || "SterkTijdelijkWachtwoord123!",
        }),
      },
    };

    const next = map[presetKey];
    if (!next) return;

    setRequestMethod(next.method);
    setRequestPath(next.path);
    setRequestBody(next.body);
    setActiveTab("playground");
  }

  function saveCustomer() {
    if (!customerForm.id || !customerForm.name || !customerForm.domain) return;

    setCustomers((prev) => {
      const exists = prev.some((item) => item.id === customerForm.id);

      if (exists) {
        return prev.map((item) =>
          item.id === customerForm.id ? { ...customerForm } : item
        );
      }

      return [{ ...customerForm }, ...prev];
    });

    setCustomerForm(DEFAULT_CUSTOMER);
  }

  function editCustomer(customer) {
    setCustomerForm(customer);
    setActiveTab("customers");
  }

  function removeCustomer(customerId) {
    setCustomers((prev) => prev.filter((item) => item.id !== customerId));
  }

  function clearHistory() {
    setHistory([]);
  }

  async function sendRequest(custom = null) {
    const method = custom?.method || requestMethod;
    const path = custom?.path || requestPath;
    const body = custom?.body ?? requestBody;

    setIsSending(true);
    setResponseState(null);

    try {
      const result = await callProvisioningApi(settings, method, path, body);

      const historyEntry = {
        id: window.crypto?.randomUUID?.() ?? `h-${Date.now()}`,
        at: new Date().toISOString(),
        method,
        path,
        status: result.status,
        ok: result.ok,
        data: result.data,
      };

      setResponseState(historyEntry);
      setHistory((prev) => [historyEntry, ...prev].slice(0, 30));
    } catch (error) {
      const failed = {
        id: window.crypto?.randomUUID?.() ?? `h-${Date.now()}`,
        at: new Date().toISOString(),
        method,
        path,
        status: 0,
        ok: false,
        data: {
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };

      setResponseState(failed);
      setHistory((prev) => [failed, ...prev].slice(0, 30));
    } finally {
      setIsSending(false);
    }
  }

  async function quickGetDeployment() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "GET",
      path: `/api/deployments/${deploymentLookupId}`,
      body: "",
    });
  }

  async function quickListOperations() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "GET",
      path: `/api/deployments/${deploymentLookupId}/operations`,
      body: "",
    });
  }

  async function quickAudit() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "GET",
      path: `/api/deployments/${deploymentLookupId}/audit`,
      body: "",
    });
  }

  async function quickResume() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/deployments/${deploymentLookupId}/resume`,
      body: "{}",
    });
  }

  async function quickRedeploy() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/deployments/${deploymentLookupId}/redeploy`,
      body: pretty({ mode: redeployMode }),
    });
  }

  async function quickRetryStage() {
    if (!deploymentLookupId || !retryStage) return;
    await sendRequest({
      method: "POST",
      path: `/api/deployments/${deploymentLookupId}/retry/${retryStage}`,
      body: "{}",
    });
  }

  async function quickRollback() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/deployments/${deploymentLookupId}/rollback`,
      body: pretty({ rollbackRef: "" }),
    });
  }

  async function quickDelete() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/deployments/${deploymentLookupId}/delete`,
      body: "{}",
    });
  }

  async function quickConsistency() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "GET",
      path: `/api/admin/deployments/${deploymentLookupId}/consistency`,
      body: "",
    });
  }

  async function quickReconcile() {
    if (!deploymentLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/admin/deployments/${deploymentLookupId}/reconcile`,
      body: "{}",
    });
  }

  async function quickGetOperation() {
    if (!operationLookupId) return;
    await sendRequest({
      method: "GET",
      path: `/api/operations/${operationLookupId}`,
      body: "",
    });
  }

  async function quickMailDns() {
    if (!mailDomainLookupId) return;
    await sendRequest({
      method: "GET",
      path: `/api/mail/domains/${mailDomainLookupId}/dns-records`,
      body: "",
    });
  }

  async function quickMailReconcile() {
    if (!mailDomainLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/mail/domains/${mailDomainLookupId}/reconcile`,
      body: "{}",
    });
  }

  async function quickMailboxDisable() {
    if (!mailboxLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/mail/mailboxes/${mailboxLookupId}/disable`,
      body: pretty({ reason: "temporary" }),
    });
  }

  async function quickMailboxEnable() {
    if (!mailboxLookupId) return;
    await sendRequest({
      method: "POST",
      path: `/api/mail/mailboxes/${mailboxLookupId}/enable`,
      body: "{}",
    });
  }

  async function quickMailboxDelete() {
    if (!mailboxLookupId) return;
    await sendRequest({
      method: "DELETE",
      path: `/api/mail/mailboxes/${mailboxLookupId}`,
      body: "",
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(14,165,233,0.12), transparent 30%), #020617",
        color: "#e2e8f0",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
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
                color: "#f8fafc",
                marginBottom: 8,
              }}
            >
              Vedantix Admin Control Center
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 15 }}>
              Klantenbeheer en provisioning backend tester in één dashboard.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Overzicht
            </TabButton>
            <TabButton
              active={activeTab === "customers"}
              onClick={() => setActiveTab("customers")}
            >
              Klanten
            </TabButton>
            <TabButton
              active={activeTab === "deployments"}
              onClick={() => setActiveTab("deployments")}
            >
              Deployments
            </TabButton>
            <TabButton
              active={activeTab === "mail"}
              onClick={() => setActiveTab("mail")}
            >
              Mail
            </TabButton>
            <TabButton
              active={activeTab === "playground"}
              onClick={() => setActiveTab("playground")}
            >
              Endpoint tester
            </TabButton>
            <TabButton
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            >
              Instellingen
            </TabButton>
          </div>
        </div>

        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Snelstart"
                subtitle="Gebruik opgeslagen klanten om direct een request klaar te zetten."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 14,
                }}
              >
                {filteredCustomers.length === 0 ? (
                  <Card style={{ background: "#0f172a" }}>
                    <div style={{ color: "#94a3b8" }}>
                      Geen klanten opgeslagen.
                    </div>
                  </Card>
                ) : (
                  filteredCustomers.slice(0, 6).map((customer) => (
                    <Card
                      key={customer.id}
                      style={{ background: "#0b1220", padding: 16 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          marginBottom: 12,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: 16,
                              color: "#f8fafc",
                            }}
                          >
                            {customer.name}
                          </div>
                          <div style={{ color: "#94a3b8", fontSize: 13 }}>
                            {customer.id}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#7dd3fc",
                          }}
                        >
                          {customer.packageCode || "STARTER"}
                        </div>
                      </div>

                      <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 12 }}>
                        {customer.domain || "—"}
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        <SmallButton
                          tone="primary"
                          onClick={() =>
                            applyCustomerToRequest(customer, "create-deployment-v2")
                          }
                        >
                          New deploy
                        </SmallButton>
                        <SmallButton
                          onClick={() =>
                            applyCustomerToRequest(customer, "get-deployment-v2")
                          }
                        >
                          Get deployment
                        </SmallButton>
                        <SmallButton
                          onClick={() =>
                            applyCustomerToRequest(customer, "deployment-audit-v2")
                          }
                        >
                          Audit
                        </SmallButton>
                        <SmallButton
                          onClick={() =>
                            applyCustomerToRequest(customer, "mail-domain-create")
                          }
                        >
                          Mail domain
                        </SmallButton>
                        <SmallButton
                          tone="danger"
                          onClick={() =>
                            applyCustomerToRequest(
                              customer,
                              "legacy-delete-everything"
                            )
                          }
                        >
                          Delete legacy
                        </SmallButton>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <SectionTitle
                title="Laatste responses"
                subtitle="Meest recente verzoeken en statussen."
                action={
                  <SmallButton tone="muted" onClick={clearHistory}>
                    Wis historie
                  </SmallButton>
                }
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {history.length === 0 ? (
                  <div style={{ color: "#94a3b8" }}>Nog geen requests uitgevoerd.</div>
                ) : (
                  history.slice(0, 10).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setResponseState(item)}
                      style={{
                        textAlign: "left",
                        background: "#0b1220",
                        border: "1px solid #1e293b",
                        borderRadius: 14,
                        padding: 14,
                        color: "#e2e8f0",
                        cursor: "pointer",
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
                        <div style={{ fontWeight: 800 }}>
                          {item.method} {item.path}
                        </div>
                        <div
                          style={{
                            color: item.ok ? "#34d399" : "#f87171",
                            fontWeight: 800,
                          }}
                        >
                          {item.status || "ERR"}
                        </div>
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: 12 }}>
                        {new Date(item.at).toLocaleString("nl-NL")}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </Card>

            <Card style={{ gridColumn: "1 / -1" }}>
              <SectionTitle
                title="Response viewer"
                subtitle="Altijd de laatste response of geselecteerde history-entry."
              />
              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#cbd5e1",
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: 14,
                  padding: 16,
                  minHeight: 240,
                  overflow: "auto",
                }}
              >
                {responseState ? pretty(responseState) : "Nog geen response."}
              </pre>
            </Card>
          </div>
        )}

        {activeTab === "customers" && (
          <div style={{ display: "grid", gridTemplateColumns: "440px 1fr", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Klant opslaan"
                subtitle="Frontend-klantenkaart voor snelle backend-acties."
              />

              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Customer ID">
                  <Input
                    value={customerForm.id}
                    onChange={(e) => updateCustomerForm("id", e.target.value)}
                    placeholder="cust_test_001"
                  />
                </Field>

                <Field label="Naam">
                  <Input
                    value={customerForm.name}
                    onChange={(e) => updateCustomerForm("name", e.target.value)}
                    placeholder="Bedrijfsnaam"
                  />
                </Field>

                <Field label="Project name">
                  <Input
                    value={customerForm.projectName}
                    onChange={(e) =>
                      updateCustomerForm("projectName", e.target.value)
                    }
                    placeholder="vedantix-test-project"
                  />
                </Field>

                <Field label="Domein">
                  <Input
                    value={customerForm.domain}
                    onChange={(e) => updateCustomerForm("domain", e.target.value)}
                    placeholder="test.vedantix.nl"
                  />
                </Field>

                <Field label="Package">
                  <Select
                    value={customerForm.packageCode}
                    onChange={(e) =>
                      updateCustomerForm("packageCode", e.target.value)
                    }
                  >
                    {PACKAGE_CODES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="Add-ons CSV">
                  <Input
                    value={customerForm.addOnsCsv}
                    onChange={(e) =>
                      updateCustomerForm("addOnsCsv", e.target.value)
                    }
                    placeholder="BLOG,BOOKING,ANALYTICS"
                  />
                </Field>

                <Field label="Deployment ID">
                  <Input
                    value={customerForm.deploymentId}
                    onChange={(e) =>
                      updateCustomerForm("deploymentId", e.target.value)
                    }
                    placeholder="deployment-id"
                  />
                </Field>

                <Field label="Mail domain ID">
                  <Input
                    value={customerForm.mailDomainId}
                    onChange={(e) =>
                      updateCustomerForm("mailDomainId", e.target.value)
                    }
                    placeholder="mail-domain-id"
                  />
                </Field>

                <Field label="Mailbox local part">
                  <Input
                    value={customerForm.mailboxLocalPart}
                    onChange={(e) =>
                      updateCustomerForm("mailboxLocalPart", e.target.value)
                    }
                    placeholder="info"
                  />
                </Field>

                <Field label="Mailbox display name">
                  <Input
                    value={customerForm.mailboxDisplayName}
                    onChange={(e) =>
                      updateCustomerForm("mailboxDisplayName", e.target.value)
                    }
                    placeholder="Info"
                  />
                </Field>

                <Field label="Mailbox password">
                  <Input
                    type="password"
                    value={customerForm.mailboxPassword}
                    onChange={(e) =>
                      updateCustomerForm("mailboxPassword", e.target.value)
                    }
                    placeholder="SterkTijdelijkWachtwoord123!"
                  />
                </Field>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <SmallButton tone="primary" onClick={saveCustomer}>
                    Opslaan
                  </SmallButton>
                  <SmallButton
                    tone="muted"
                    onClick={() => setCustomerForm(DEFAULT_CUSTOMER)}
                  >
                    Leegmaken
                  </SmallButton>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle
                title="Klantenoverzicht"
                subtitle="Zoek, bewerk en open direct een endpoint-flow."
                action={
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Zoek klant..."
                    style={{ minWidth: 240 }}
                  />
                }
              />

              <div style={{ display: "grid", gap: 12 }}>
                {filteredCustomers.length === 0 ? (
                  <div style={{ color: "#94a3b8" }}>Geen klanten gevonden.</div>
                ) : (
                  filteredCustomers.map((customer) => (
                    <Card
                      key={customer.id}
                      style={{ background: "#0b1220", padding: 16 }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1.4fr 1fr auto",
                          gap: 16,
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: 800,
                              color: "#f8fafc",
                              fontSize: 16,
                              marginBottom: 4,
                            }}
                          >
                            {customer.name}
                          </div>
                          <div style={{ color: "#94a3b8", fontSize: 13 }}>
                            {customer.id}
                          </div>
                          <div style={{ color: "#cbd5e1", marginTop: 6 }}>
                            {customer.domain}
                          </div>
                          {customer.deploymentId ? (
                            <div
                              style={{
                                color: "#7dd3fc",
                                fontSize: 13,
                                marginTop: 4,
                              }}
                            >
                              deployment: {customer.deploymentId}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <div style={{ color: "#cbd5e1", fontSize: 13 }}>
                            package: {customer.packageCode || "STARTER"}
                          </div>
                          <div
                            style={{
                              color: "#cbd5e1",
                              fontSize: 13,
                              marginTop: 4,
                            }}
                          >
                            project: {customer.projectName || "—"}
                          </div>
                          <div
                            style={{
                              color: "#cbd5e1",
                              fontSize: 13,
                              marginTop: 4,
                            }}
                          >
                            mailDomainId: {customer.mailDomainId || "—"}
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <SmallButton onClick={() => editCustomer(customer)}>
                            Bewerk
                          </SmallButton>
                          <SmallButton
                            tone="primary"
                            onClick={() =>
                              applyCustomerToRequest(customer, "create-deployment-v2")
                            }
                          >
                            Deploy
                          </SmallButton>
                          <SmallButton
                            onClick={() =>
                              applyCustomerToRequest(customer, "deployment-operations-v2")
                            }
                          >
                            Ops
                          </SmallButton>
                          <SmallButton
                            onClick={() =>
                              applyCustomerToRequest(customer, "customer-provision-mail")
                            }
                          >
                            Mail
                          </SmallButton>
                          <SmallButton
                            tone="danger"
                            onClick={() => removeCustomer(customer.id)}
                          >
                            Verwijder
                          </SmallButton>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "deployments" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Deployment acties"
                subtitle="Voor de nieuwe deployment-flow."
              />
              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Deployment ID">
                  <Input
                    value={deploymentLookupId}
                    onChange={(e) => setDeploymentLookupId(e.target.value)}
                    placeholder="deployment-id"
                  />
                </Field>

                <Field label="Redeploy mode">
                  <Select
                    value={redeployMode}
                    onChange={(e) => setRedeployMode(e.target.value)}
                  >
                    {REDEPLOY_MODES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="Retry stage">
                  <Select
                    value={retryStage}
                    onChange={(e) => setRetryStage(e.target.value)}
                  >
                    {STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </Select>
                </Field>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <SmallButton tone="primary" onClick={quickGetDeployment}>
                    Get deployment
                  </SmallButton>
                  <SmallButton onClick={quickListOperations}>Operations</SmallButton>
                  <SmallButton onClick={quickAudit}>Audit</SmallButton>
                  <SmallButton tone="success" onClick={quickResume}>
                    Resume
                  </SmallButton>
                  <SmallButton tone="success" onClick={quickRedeploy}>
                    Redeploy
                  </SmallButton>
                  <SmallButton onClick={quickRetryStage}>Retry stage</SmallButton>
                  <SmallButton onClick={quickRollback}>Rollback</SmallButton>
                  <SmallButton tone="danger" onClick={quickDelete}>
                    Delete
                  </SmallButton>
                  <SmallButton onClick={quickConsistency}>Consistency</SmallButton>
                  <SmallButton onClick={quickReconcile}>Reconcile</SmallButton>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle
                title="Operation lookup"
                subtitle="Bekijk losse operation records."
              />
              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Operation ID">
                  <Input
                    value={operationLookupId}
                    onChange={(e) => setOperationLookupId(e.target.value)}
                    placeholder="operation-id"
                  />
                </Field>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <SmallButton tone="primary" onClick={quickGetOperation}>
                    Get operation
                  </SmallButton>
                  <SmallButton onClick={() => setActiveTab("playground")}>
                    Open endpoint tester
                  </SmallButton>
                </div>
              </div>
            </Card>

            <Card style={{ gridColumn: "1 / -1" }}>
              <SectionTitle
                title="Response"
                subtitle="Laatste deployment-gerelateerde response."
              />
              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#cbd5e1",
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: 14,
                  padding: 16,
                  minHeight: 260,
                  overflow: "auto",
                }}
              >
                {responseState ? pretty(responseState) : "Nog geen response."}
              </pre>
            </Card>
          </div>
        )}

        {activeTab === "mail" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Mail domain acties"
                subtitle="DNS records en reconciliatie."
              />
              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Mail domain ID">
                  <Input
                    value={mailDomainLookupId}
                    onChange={(e) => setMailDomainLookupId(e.target.value)}
                    placeholder="mail-domain-id"
                  />
                </Field>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <SmallButton tone="primary" onClick={quickMailDns}>
                    DNS records
                  </SmallButton>
                  <SmallButton tone="success" onClick={quickMailReconcile}>
                    Reconcile domain
                  </SmallButton>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle
                title="Mailbox acties"
                subtitle="Disable, enable en delete mailbox."
              />
              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Mailbox ID">
                  <Input
                    value={mailboxLookupId}
                    onChange={(e) => setMailboxLookupId(e.target.value)}
                    placeholder="mailbox-id"
                  />
                </Field>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <SmallButton onClick={quickMailboxDisable}>Disable</SmallButton>
                  <SmallButton tone="success" onClick={quickMailboxEnable}>
                    Enable
                  </SmallButton>
                  <SmallButton tone="danger" onClick={quickMailboxDelete}>
                    Delete
                  </SmallButton>
                </div>
              </div>
            </Card>

            <Card style={{ gridColumn: "1 / -1" }}>
              <SectionTitle
                title="Mail presets"
                subtitle="Klik een preset en stuur hem daarna vanuit de endpoint tester."
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 12,
                }}
              >
                {ENDPOINT_PRESETS.filter((item) => item.category === "Mail").map(
                  (preset) => (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => {
                        resetRequestFromPreset(preset);
                        setActiveTab("playground");
                      }}
                      style={{
                        background: "#0b1220",
                        border: "1px solid #1e293b",
                        borderRadius: 14,
                        color: "#e2e8f0",
                        padding: 16,
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 800, marginBottom: 6 }}>
                        {preset.label}
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: 13 }}>
                        {preset.method} {preset.path}
                      </div>
                    </button>
                  )
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "playground" && (
          <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Endpoint presets"
                subtitle="Alle provisioning endpoints, inclusief legacy."
              />
              <div style={{ display: "grid", gap: 14 }}>
                {Object.entries(groupedPresets).map(([category, presets]) => (
                  <div key={category}>
                    <div
                      style={{
                        color: "#7dd3fc",
                        fontWeight: 800,
                        marginBottom: 8,
                        fontSize: 13,
                        textTransform: "uppercase",
                        letterSpacing: 0.6,
                      }}
                    >
                      {category}
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {presets.map((preset) => (
                        <button
                          key={preset.key}
                          type="button"
                          onClick={() => resetRequestFromPreset(preset)}
                          style={{
                            textAlign: "left",
                            background:
                              selectedPresetKey === preset.key
                                ? "rgba(14,165,233,0.12)"
                                : "#0b1220",
                            border:
                              selectedPresetKey === preset.key
                                ? "1px solid #38bdf8"
                                : "1px solid #1e293b",
                            borderRadius: 12,
                            padding: 12,
                            color: "#e2e8f0",
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ fontWeight: 800, marginBottom: 4 }}>
                            {preset.label}
                          </div>
                          <div style={{ color: "#94a3b8", fontSize: 12 }}>
                            {preset.method} {preset.path}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle
                title="Request editor"
                subtitle="Pas path en body aan en verstuur direct."
                action={
                  <div style={{ display: "flex", gap: 8 }}>
                    <SmallButton
                      tone="muted"
                      onClick={() =>
                        selectedPreset && resetRequestFromPreset(selectedPreset)
                      }
                    >
                      Reset preset
                    </SmallButton>
                    <SmallButton
                      tone="primary"
                      onClick={() => sendRequest()}
                      disabled={isSending}
                    >
                      {isSending ? "Versturen..." : "Verstuur request"}
                    </SmallButton>
                  </div>
                }
              />

              <div style={{ display: "grid", gap: 12 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr",
                    gap: 12,
                  }}
                >
                  <Field label="Method">
                    <Select
                      value={requestMethod}
                      onChange={(e) => setRequestMethod(e.target.value)}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="DELETE">DELETE</option>
                    </Select>
                  </Field>

                  <Field label="Path">
                    <Input
                      value={requestPath}
                      onChange={(e) => setRequestPath(e.target.value)}
                      placeholder="/api/deployments/..."
                    />
                  </Field>
                </div>

                <Field label="JSON body">
                  <Textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    placeholder="{}"
                  />
                </Field>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 18,
                    marginTop: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        color: "#cbd5e1",
                        marginBottom: 8,
                      }}
                    >
                      Headers
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontSize: 12,
                        lineHeight: 1.6,
                        color: "#cbd5e1",
                        background: "#020617",
                        border: "1px solid #1e293b",
                        borderRadius: 14,
                        padding: 14,
                        minHeight: 180,
                        overflow: "auto",
                      }}
                    >
                      {pretty(buildHeaders(settings, requestMethod))}
                    </pre>
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        color: "#cbd5e1",
                        marginBottom: 8,
                      }}
                    >
                      Response
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontSize: 12,
                        lineHeight: 1.6,
                        color: "#cbd5e1",
                        background: "#020617",
                        border: "1px solid #1e293b",
                        borderRadius: 14,
                        padding: 14,
                        minHeight: 180,
                        overflow: "auto",
                      }}
                    >
                      {responseState ? pretty(responseState) : "Nog geen response."}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <Card>
              <SectionTitle
                title="Backend verbinding"
                subtitle="Deze waarden worden lokaal in localStorage opgeslagen."
              />
              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Base URL">
                  <Input
                    value={settings.baseUrl}
                    onChange={(e) => updateSettings("baseUrl", e.target.value)}
                    placeholder="/provisioning-api"
                  />
                </Field>

                <Field label="X-Api-Key">
                  <Input
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => updateSettings("apiKey", e.target.value)}
                    placeholder="PROVISIONING_API_KEY"
                  />
                </Field>

                <Field label="X-Tenant-Id">
                  <Input
                    value={settings.tenantId}
                    onChange={(e) => updateSettings("tenantId", e.target.value)}
                    placeholder="default"
                  />
                </Field>

                <Field label="X-Actor-Id">
                  <Input
                    value={settings.actorId}
                    onChange={(e) => updateSettings("actorId", e.target.value)}
                    placeholder="admin-dashboard"
                  />
                </Field>

                <Field label="X-Source">
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
                    color: "#cbd5e1",
                    fontWeight: 700,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(settings.autoIdempotency)}
                    onChange={(e) =>
                      updateSettings("autoIdempotency", e.target.checked)
                    }
                  />
                  Automatisch Idempotency-Key toevoegen op non-GET requests
                </label>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <SmallButton
                    tone="primary"
                    onClick={() => setActiveTab("playground")}
                  >
                    Open endpoint tester
                  </SmallButton>
                  <SmallButton
                    onClick={() =>
                      setSettings({
                        ...DEFAULT_SETTINGS,
                        apiKey: settings.apiKey,
                      })
                    }
                  >
                    Reset defaults
                  </SmallButton>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle
                title="Connection checks"
                subtitle="Snelle checks voor /health en /ready."
              />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <SmallButton
                  tone="primary"
                  onClick={() =>
                    sendRequest({ method: "GET", path: "/health", body: "" })
                  }
                >
                  Check health
                </SmallButton>
                <SmallButton
                  tone="primary"
                  onClick={() =>
                    sendRequest({ method: "GET", path: "/ready", body: "" })
                  }
                >
                  Check ready
                </SmallButton>
              </div>

              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#cbd5e1",
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: 14,
                  padding: 16,
                  minHeight: 260,
                  overflow: "auto",
                }}
              >
                {responseState ? pretty(responseState) : "Nog geen response."}
              </pre>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}