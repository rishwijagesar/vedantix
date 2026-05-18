import { apiClient } from './client';

export const analyticsSummaryApi = {
  get() {
    return apiClient.get('/api/analytics/summary');
  },
};

export default analyticsSummaryApi;
