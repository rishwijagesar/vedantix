import { apiClient } from './client';

export const domainApi = {
  check(domain) {
    return apiClient.post('/api/domain/check', { domain });
  },
};

export default domainApi;
