import { apiClient } from './client';

export const customersApi = {
  list(params = '') {
    const query = params ? `?${params}` : '';
    return apiClient.get(`/api/customers${query}`);
  },

  get(customerId) {
    return apiClient.get(`/api/customers/${customerId}`);
  },

  create(payload) {
    return apiClient.post('/api/customers', payload);
  },

  update(customerId, payload) {
    return apiClient.put(`/api/customers/${customerId}`, payload);
  },

  remove(customerId) {
    return apiClient.delete(`/api/customers/${customerId}`);
  },

  createBase44App(customerId) {
    return apiClient.post(`/api/customers/${customerId}/base44`, {});
  },

  listMailboxes(customerId) {
    return apiClient.get(`/api/customers/${customerId}/mailboxes`);
  },
};

export default customersApi;
