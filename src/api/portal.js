import { apiClient } from './client';

export const portalApi = {
  getDashboard() {
    return apiClient.get('/api/dashboard');
  },

  getSubscription() {
    return apiClient.get('/api/subscriptions');
  },

  getMailboxes() {
    return apiClient.get('/api/mailboxes');
  },
};

export default portalApi;
