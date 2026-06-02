import { API_BASE_URL, apiClient } from "./client";
import { readAdminSessionToken } from "../pages/admin/auth/adminAuth";

export const migrationsApi = {
  list: () => apiClient.get("/api/migrations"),
  start: (payload) => apiClient.post("/api/migrations", payload),
  detail: (migrationId) => apiClient.get(`/api/migrations/${migrationId}`),
  analyze: (migrationId) => apiClient.post(`/api/migrations/${migrationId}/analyze`, {}),
  improve: (migrationId) => apiClient.post(`/api/migrations/${migrationId}/improve`, {}),
  importPayload: (migrationId) => apiClient.post(`/api/migrations/${migrationId}/import`, {}),
  report: (migrationId) => apiClient.get(`/api/migrations/${migrationId}/report`),
};

export async function downloadMigrationReport(migrationId, format) {
  const token = readAdminSessionToken();
  const res = await fetch(
    `${API_BASE_URL}/api/migrations/${encodeURIComponent(migrationId)}/report.${format}`,
    {
      credentials: "include",
      headers: {
        "X-Tenant-Id": import.meta.env.VITE_TENANT_ID || "default",
        "X-Actor-Id": "admin-dashboard",
        "X-Source": "ADMIN_PANEL",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Download mislukt (${res.status})`);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `migration-report-${migrationId}.${format}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
