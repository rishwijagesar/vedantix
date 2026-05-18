import { apiClient } from './client';

export const pricingApi = {
  /**
   * Publieke pricing data voor de website.
   */
  getSummary() {
    return apiClient.get('/api/pricing');
  },

  /**
   * BTW-overzicht voor financiële weergaven.
   */
  getVatSummary() {
    return apiClient.get('/api/pricing/vat-summary');
  },

  /**
   * Update een package vanuit het admin panel.
   * @param {string} code
   * @param {object} payload
   */
  updatePackage(code, payload) {
    return apiClient.put(`/api/pricing/packages/${code}`, payload);
  },

  /**
   * Update een addon vanuit het admin panel.
   * @param {string} code
   * @param {object} payload
   */
  updateAddon(code, payload) {
    return apiClient.put(`/api/pricing/addons/${code}`, payload);
  },
};

export default pricingApi;
