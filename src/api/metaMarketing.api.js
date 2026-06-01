import { apiClient } from "./client";

export const metaMarketingApi = {
  getConnection: () => apiClient.get("/api/meta-marketing/connection"),
  getOAuthUrl: (redirectUri) =>
    apiClient.get(`/api/meta-marketing/oauth/url${redirectUri ? `?redirectUri=${encodeURIComponent(redirectUri)}` : ""}`),
  completeOAuth: (payload) => apiClient.post("/api/meta-marketing/oauth/callback", payload),
  listAssets: () => apiClient.get("/api/meta-marketing/assets"),
  selectAssets: (payload) => apiClient.post("/api/meta-marketing/connection/assets", payload),

  dashboard: () => apiClient.get("/api/meta-marketing/dashboard"),
  syncInsights: (payload) => apiClient.post("/api/meta-marketing/insights/sync", payload),

  listCampaigns: () => apiClient.get("/api/meta-marketing/campaigns"),
  createCampaign: (payload) => apiClient.post("/api/meta-marketing/campaigns", payload),
  updateCampaign: (campaignId, payload) => apiClient.put(`/api/meta-marketing/campaigns/${campaignId}`, payload),
  startCampaign: (campaignId) => apiClient.post(`/api/meta-marketing/campaigns/${campaignId}/start`, {}),
  stopCampaign: (campaignId) => apiClient.post(`/api/meta-marketing/campaigns/${campaignId}/stop`, {}),
  archiveCampaign: (campaignId) => apiClient.post(`/api/meta-marketing/campaigns/${campaignId}/archive`, {}),
  duplicateCampaign: (campaignId, payload = {}) => apiClient.post(`/api/meta-marketing/campaigns/${campaignId}/duplicate`, payload),

  listAdSets: (campaignId) =>
    apiClient.get(`/api/meta-marketing/adsets${campaignId ? `?campaignId=${encodeURIComponent(campaignId)}` : ""}`),
  createAdSet: (payload) => apiClient.post("/api/meta-marketing/adsets", payload),

  listCreatives: () => apiClient.get("/api/meta-marketing/creatives"),
  createCreative: (payload) => apiClient.post("/api/meta-marketing/creatives", payload),
  listAds: () => apiClient.get("/api/meta-marketing/ads"),
  createAd: (payload) => apiClient.post("/api/meta-marketing/ads", payload),

  listLeads: () => apiClient.get("/api/meta-marketing/leads"),
  updateLead: (leadId, payload) => apiClient.put(`/api/meta-marketing/leads/${leadId}`, payload),
  addLeadActivity: (leadId, payload) => apiClient.post(`/api/meta-marketing/leads/${leadId}/activities`, payload),

  listRecommendations: () => apiClient.get("/api/meta-marketing/recommendations"),
  generateRecommendations: () => apiClient.post("/api/meta-marketing/recommendations/generate", {}),
  generateAdVariants: (payload) => apiClient.post("/api/meta-marketing/assistant/ad-variants", payload),
  pixelSnippet: () => apiClient.get("/api/meta-marketing/pixel/snippet"),
};
