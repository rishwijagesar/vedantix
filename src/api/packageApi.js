import { apiClient } from './client';

export function listPackages() {
  return apiClient.get('/api/packages');
}
