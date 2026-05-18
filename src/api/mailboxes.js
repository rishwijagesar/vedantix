import { apiClient } from './client';

export const mailboxesApi = {
  list() {
    return apiClient.get('/api/mailboxes');
  },
};

export default mailboxesApi;
