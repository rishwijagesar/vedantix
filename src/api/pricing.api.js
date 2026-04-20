import { apiClient } from "./client";

export async function fetchPricingSummary() {
  return apiClient.get("/api/pricing");
}

export async function fetchPackages() {
  const summary = await fetchPricingSummary();
  return summary?.packages || [];
}

export async function updatePricingPackage({
  code,
  payload,
  apiKey,
}) {
  return apiClient.put(`/api/pricing/packages/${code}`, payload, {
    apiKey,
  });
}

export async function updatePricingAddon({
  code,
  payload,
  apiKey,
}) {
  return apiClient.put(`/api/pricing/addons/${code}`, payload, {
    apiKey,
  });
}