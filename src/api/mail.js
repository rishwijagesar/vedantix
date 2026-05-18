import { apiClient } from './client';

export const mailApi = {
  provisionMailbox(payload) {
    return apiClient.post('/api/mail/provision', payload);
  },

  disableMailbox(mailboxId) {
    return apiClient.post(`/api/mail/mailboxes/${mailboxId}/disable`, {});
  },

  enableMailbox(mailboxId) {
    return apiClient.post(`/api/mail/mailboxes/${mailboxId}/enable`, {});
  },

  deleteMailbox(mailboxId) {
    return apiClient.delete(`/api/mail/mailboxes/${mailboxId}`);
  },
};

export default mailApi;
