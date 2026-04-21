import { readAdminSessionToken } from "../pages/admin/auth/adminAuth";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || "https://api.vedantix.nl").replace(/\/$/, "");

function getHeaders() {
  const token = readAdminSessionToken();

  return {
    "Content-Type": "application/json",
    "X-Tenant-Id": "default",
    "X-Actor-Id": "admin-panel",
    "X-Source": "ADMIN_PANEL",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function fetchFinanceOverview(range = "month") {
  const res = await fetch(
    `${API_BASE}/api/finance/overview?range=${range}`,
    {
      headers: getHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}

export async function fetchFinanceCustomerDetails(customerId, range = "month") {
  const res = await fetch(
    `${API_BASE}/api/finance/customer/${customerId}?range=${range}`,
    {
      headers: getHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}

export async function createFinanceExpense(payload) {
  const res = await fetch(`${API_BASE}/api/finance/expense`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create expense");
  }

  return res.json();
}