import { apiClient } from './client';

export const systemApi = {
  health() {
    return apiClient.get('/health');
  },

  readiness() {
    return apiClient.get('/ready');
  },
};

export default systemApi;
