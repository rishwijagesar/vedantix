const RAW_API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://api.vedantix.nl";

const API_BASE = String(RAW_API_BASE).replace(/\/$/, "");
const DEFAULT_TENANT_ID = import.meta.env.VITE_TENANT_ID || "default";

function headers({ apiKey, actorId = "admin-dashboard", source = "ADMIN_PANEL" }) {
  return {
    "Content-Type": "application/json",
    "X-Api-Key": apiKey || "",
    "X-Tenant-Id": DEFAULT_TENANT_ID,
    "X-Actor-Id": actorId,
    "X-Source": source,
  };
}

async function parse(res) {
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function updateCustomer({ id, payload, apiKey }) {
  const res = await fetch(`${API_BASE}/api/customers/${id}`, {
    method: "PUT",
    headers: headers({ apiKey }),
    body: JSON.stringify(payload),
  });

  const json = await parse(res);
  if (!res.ok) throw new Error(json?.error || "Update failed");

  return json.data;
}

export async function deleteCustomer({ id, apiKey }) {
  const res = await fetch(`${API_BASE}/api/customers/${id}`, {
    method: "DELETE",
    headers: headers({ apiKey }),
  });

  const json = await parse(res);
  if (!res.ok) throw new Error(json?.error || "Delete failed");

  return json.data;
}