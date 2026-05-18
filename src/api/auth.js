import { apiClient } from './client';

export const authApi = {
  login(payload) {
    return apiClient.post('/api/auth/login', payload);
  },

  me() {
    return apiClient.get('/api/auth/me');
  },

  logout() {
    return apiClient.post('/api/auth/logout');
  },
};

export default authApi;
