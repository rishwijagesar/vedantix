import { apiClient } from "./client";

/**
 * @param {{ apiKey?: string }} [options]
 */
export async function fetchCatalogProducts({ apiKey } = {}) {
  return apiClient.get("/api/catalog/products", { apiKey });
}

/**
 * @param {{ product: any, apiKey?: string }} params
 */
export async function saveCatalogProduct({ product, apiKey }) {
  return apiClient.post("/api/catalog/products", product, { apiKey });
}

/**
 * @param {{ code: string, apiKey?: string }} params
 */
export async function syncCatalogProduct({ code, apiKey }) {
  return apiClient.post(`/api/catalog/products/${code}/sync`, {}, { apiKey });
}
