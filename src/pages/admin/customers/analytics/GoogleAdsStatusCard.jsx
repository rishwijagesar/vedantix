import React from "react";

import TrackingStatusCard from "./TrackingStatusCard";

/**
 * @param {{ googleAds?: {
 *   status?: string,
 *   customerId?: string,
 *   conversionId?: string,
 *   conversions?: unknown[]
 * } }} props
 */
export default function GoogleAdsStatusCard({ googleAds = {} }) {
  const conversions = googleAds.conversions || [];

  return (
    <TrackingStatusCard title="Google Ads" status={googleAds.status}>
      <div>Customer ID: <strong>{googleAds.customerId || "—"}</strong></div>
      <div>Conversion ID: <strong>{googleAds.conversionId || "—"}</strong></div>
      <div>Events: <strong>{conversions.length || 0}</strong></div>
    </TrackingStatusCard>
  );
}
