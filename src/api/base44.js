import { apiClient } from './client';

export const base44Api = {
  createApp(customerId) {
    return apiClient.post(`/api/customers/${customerId}/base44`, {});
  },

  getStatus(customerId) {
    return apiClient.get(`/api/customers/${customerId}/base44`);
  },

  sync(customerId) {
    return apiClient.post(`/api/customers/${customerId}/base44/sync`, {});
  },
};

export default base44Api;
