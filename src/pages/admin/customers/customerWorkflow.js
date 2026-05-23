export function canMarkPreviewReady(customer) {
  return Boolean(customer?.base44?.appId);
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  try {
    return new URL(raw);
  } catch {
    if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) {
      try {
        return new URL(`https://${raw}`);
      } catch {
        return null;
      }
    }
  }

  return null;
}

function isBase44PublicHost(hostname) {
  return String(hostname || "").toLowerCase().endsWith(".base44.app");
}

function isUnsafePreviewTarget(url) {
  const hostname = String(url?.hostname || "").toLowerCase();
  return (
    hostname === "app.base44.com" ||
    hostname === "preview.vedantix.nl" ||
    String(url?.pathname || "").toLowerCase().includes("/editor")
  );
}

function normalizeBase44PublicUrl(value) {
  const url = parseUrl(value);
  if (!url || !isBase44PublicHost(url.hostname)) return "";
  return url.origin;
}

function normalizeSafePreviewTarget(value) {
  const url = parseUrl(value);
  if (!url || isUnsafePreviewTarget(url)) return "";
  url.hash = "";
  return url.toString();
}

function buildBase44PublicUrlFromName(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  const publicUrl = normalizeBase44PublicUrl(raw);
  if (publicUrl) return publicUrl;

  if (parseUrl(raw)) return "";

  const withoutHost = raw.replace(/\.base44\.app$/i, "");
  if (!/^[a-z0-9-]+$/i.test(withoutHost)) return "";

  const slug = slugify(withoutHost);
  if (!slug || /^app-/.test(slug)) return "";

  return `https://${slug}.base44.app`;
}

function buildBase44PublicUrlFromEditorUrl(value) {
  const url = parseUrl(value);
  if (!url) return "";

  if (isBase44PublicHost(url.hostname)) return url.origin;

  const parts = String(url.pathname || "").split("/").filter(Boolean);
  const appsIndex = parts.findIndex((part) => part.toLowerCase() === "apps");
  const slug = slugify(appsIndex >= 0 ? parts[appsIndex + 1] : "");

  if (!slug || /^app-/.test(slug) || /^[a-f0-9-]{16,}$/i.test(slug)) {
    return "";
  }

  return `https://${slug}.base44.app`;
}

export function deriveBase44PreviewUrl(editorUrl, appName) {
  return (
    buildBase44PublicUrlFromName(appName) ||
    buildBase44PublicUrlFromEditorUrl(editorUrl)
  );
}

export function resolveBase44PreviewUrl(customer, input) {
  const directInput = String(input || "").trim();
  const storedPreviewUrl = String(customer?.base44?.previewUrl || "").trim();
  const storedTargetUrl = String(customer?.preview?.targetUrl || "").trim();

  return (
    normalizeBase44PublicUrl(directInput) ||
    buildBase44PublicUrlFromName(directInput) ||
    normalizeSafePreviewTarget(directInput) ||
    normalizeBase44PublicUrl(storedPreviewUrl) ||
    deriveBase44PreviewUrl(customer?.base44?.editorUrl, customer?.base44?.appName) ||
    normalizeSafePreviewTarget(storedPreviewUrl) ||
    normalizeSafePreviewTarget(storedTargetUrl)
  );
}

export function canApproveCustomer(customer) {
  return (
    Boolean(customer?.base44?.appId) &&
    Boolean(resolveBase44PreviewUrl(customer)) &&
    customer?.websiteBuildStatus === "PREVIEW_READY"
  );
}

export function canDeployCustomer(customer) {
  return (
    Boolean(customer?.base44?.appId) &&
    Boolean(resolveBase44PreviewUrl(customer)) &&
    customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" &&
    customer?.contentSync?.status === "SYNCED"
  );
}

export function canManageDeployment(customer) {
  return Boolean(customer?.deployment?.deploymentId);
}

export function canStartBuildFlow(customer) {
  return Boolean(customer?.base44?.appId);
}

export function workflowTone(state) {
  if (state === "LIVE") return "#10b981";
  if (state === "DEPLOYING") return "#f59e0b";
  if (state === "APPROVED") return "#22c55e";
  if (state === "PREVIEW_READY") return "#2563eb";
  if (state === "CONTENT_SYNCED") return "#8b5cf6";
  if (state === "BUILD_REQUESTED") return "#0ea5e9";
  if (state === "APP_LINKED") return "#0ea5e9";
  if (state === "FAILED") return "#ef4444";
  return "#94a3b8";
}

export function deploymentTone(status) {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "SUCCEEDED") return "#10b981";
  if (normalized === "FAILED") return "#ef4444";
  if (
    normalized === "PENDING" ||
    normalized === "IN_PROGRESS" ||
    normalized === "RUNNING" ||
    normalized === "ROLLBACK_STARTED" ||
    normalized === "RETRY_STAGE_STARTED" ||
    normalized === "REDEPLOY_STARTED"
  ) {
    return "#f59e0b";
  }

  return "#94a3b8";
}

export function operationTone(status) {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "SUCCEEDED" || normalized === "COMPLETED") return "#10b981";
  if (normalized === "FAILED") return "#ef4444";
  if (normalized === "RUNNING" || normalized === "PENDING" || normalized === "ACCEPTED") {
    return "#f59e0b";
  }

  return "#94a3b8";
}

export function formatStageLabel(stage) {
  if (!stage) return "—";
  return String(stage).replace(/_/g, " ").trim();
}

export function formatEventLabel(eventType) {
  if (!eventType) return "—";
  return String(eventType).replace(/_/g, " ").trim();
}

export function getWorkflowState(customer) {
  if (customer?.status === "active") return "LIVE";
  if (customer?.status === "failed") return "FAILED";
  if (customer?.status === "provisioning") return "DEPLOYING";
  if (customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION") return "APPROVED";
  if (customer?.websiteBuildStatus === "PREVIEW_READY") return "PREVIEW_READY";
  if (customer?.contentSync?.status === "SYNCED") return "CONTENT_SYNCED";
  if (customer?.base44?.appId) return "APP_LINKED";
  if (
    customer?.websiteBuildStatus === "APP_REQUESTED" ||
    customer?.base44?.status === "CREATING"
  ) {
    return "BUILD_REQUESTED";
  }
  return "NOT_STARTED";
}

export function buildChecklist(customer) {
  return [
    {
      key: "request",
      label: "Buildverzoek opgeslagen",
      done:
        customer?.websiteBuildStatus === "APP_REQUESTED" ||
        Boolean(customer?.base44?.appId),
    },
    {
      key: "base44",
      label: "Base44 app gekoppeld",
      done: Boolean(customer?.base44?.appId),
    },
    {
      key: "content",
      label: "GitHub sync klaar",
      done: customer?.contentSync?.status === "SYNCED",
    },
    {
      key: "preview",
      label: "Preview klaar",
      done:
        customer?.websiteBuildStatus === "PREVIEW_READY" ||
        customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" ||
        customer?.status === "active",
    },
    {
      key: "approval",
      label: "Klant akkoord / live",
      done:
        customer?.websiteBuildStatus === "APPROVED_FOR_PRODUCTION" ||
        customer?.status === "active",
    },
  ];
}

export function getCustomerRequestEntries(requestLog, customer) {
  if (!customer) return [];

  return requestLog.filter((entry) => {
    const payload = entry?.result?.data;
    const serialized = JSON.stringify(payload || {});

    return (
      serialized.includes(customer.id) ||
      serialized.includes(customer.domain) ||
      serialized.includes(customer.base44?.appId || "___no_app___") ||
      serialized.includes(customer.deployment?.deploymentId || "___no_deployment___")
    );
  });
}
