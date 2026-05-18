import { apiClient } from './client';

export const deploymentsApi = {
  list(params = '') {
    const query = params ? `?${params}` : '';
    return apiClient.get(`/api/deployments${query}`);
  },

  get(deploymentId) {
    return apiClient.get(`/api/deployments/${deploymentId}`);
  },

  run(payload) {
    return apiClient.post('/api/deployments/run', payload);
  },

  retry(deploymentId) {
    return apiClient.post(`/api/deployments/${deploymentId}/retry`, {});
  },

  rollback(deploymentId) {
    return apiClient.post(`/api/deployments/${deploymentId}/rollback`, {});
  },

  remove(deploymentId) {
    return apiClient.delete(`/api/deployments/${deploymentId}`);
  },

  getAudit(deploymentId) {
    return apiClient.get(`/api/deployments/${deploymentId}/audit`);
  },
};

export default deploymentsApi;
