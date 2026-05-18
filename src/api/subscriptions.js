import { apiClient } from './client';

export const subscriptionsApi = {
  list() {
    return apiClient.get('/api/subscriptions');
  },
};

export default subscriptionsApi;
