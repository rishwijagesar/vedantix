import { apiClient } from './client';

export const financeApi = {
  getSummary() {
    return apiClient.get('/api/finance/summary');
  },

  getInvoices(params = '') {
    const query = params ? `?${params}` : '';
    return apiClient.get(`/api/finance/invoices${query}`);
  },

  getRevenue(params = '') {
    const query = params ? `?${params}` : '';
    return apiClient.get(`/api/finance/revenue${query}`);
  },
};

export default financeApi;
