import { apiClient } from './client';

export const billingApi = {
  getSubscription() {
    return apiClient.get('/api/billing/subscription');
  },

  getInvoices() {
    return apiClient.get('/api/billing/invoices');
  },

  createCheckoutSession(payload) {
    return apiClient.post('/api/billing/checkout', payload);
  },

  createPortalSession() {
    return apiClient.post('/api/billing/portal');
  },
};

export default billingApi;
