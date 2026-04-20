import { apiClient } from "./client";

export async function fetchCustomers({ apiKey }) {
  return apiClient.get("/api/customers", { apiKey });
}

export async function updateCustomer({ id, payload, apiKey }) {
  return apiClient.put(`/api/customers/${id}`, payload, {
    apiKey,
  });
}

export async function deleteCustomer({ id, apiKey }) {
  return apiClient.delete(`/api/customers/${id}`, {
    apiKey,
  });
}