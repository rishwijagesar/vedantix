/// <reference types="vite/client" />

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "/provisioning-api";

const DEFAULT_TENANT_ID = import.meta.env.VITE_TENANT_ID || "default";

async function parseJson(res) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Expected JSON but received: ${text.slice(0, 120)}`);
  }
}

function buildPublicHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Tenant-Id": DEFAULT_TENANT_ID,
  };
}

export async function fetchPricingSummary() {
  const res = await fetch(`${API_BASE}/api/pricing`, {
    method: "GET",
    headers: buildPublicHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch pricing summary (${res.status})`);
  }

  const json = await parseJson(res);
  return json?.data || json || { packages: [], addons: [] };
}

export async function fetchPackages() {
  const summary = await fetchPricingSummary();
  return summary?.packages || [];
}

export async function updatePricingPackage({
  code,
  payload,
  apiKey,
  tenantId = DEFAULT_TENANT_ID,
  actorId = "admin-dashboard",
  source = "ADMIN_PANEL",
}) {
  const res = await fetch(`${API_BASE}/api/pricing/packages/${code}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey || "",
      "X-Tenant-Id": tenantId,
      "X-Actor-Id": actorId,
      "X-Source": source,
      "Idempotency-Key":
        (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
        `pricing-package-${code}-${Date.now()}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await parseJson(res);

  if (!res.ok) {
    throw new Error(
      json?.message || json?.error || `Failed to update package ${code}`
    );
  }

  return json?.data || json;
}

export async function updatePricingAddon({
  code,
  payload,
  apiKey,
  tenantId = DEFAULT_TENANT_ID,
  actorId = "admin-dashboard",
  source = "ADMIN_PANEL",
}) {
  const res = await fetch(`${API_BASE}/api/pricing/addons/${code}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey || "",
      "X-Tenant-Id": tenantId,
      "X-Actor-Id": actorId,
      "X-Source": source,
      "Idempotency-Key":
        (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
        `pricing-addon-${code}-${Date.now()}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await parseJson(res);

  if (!res.ok) {
    throw new Error(
      json?.message || json?.error || `Failed to update addon ${code}`
    );
  }

  return json?.data || json;
}