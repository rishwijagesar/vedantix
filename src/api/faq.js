import { apiClient } from './client';

export const faqApi = {
  list() {
    return apiClient.get('/api/faq');
  },
};

export default faqApi;
