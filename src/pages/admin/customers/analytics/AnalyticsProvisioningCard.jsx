import React from "react";
import { BarChart3, Download, RefreshCw, Rocket } from "lucide-react";

import { Button, Card, SectionTitle } from "../../components/AdminUI";
import GoogleAdsStatusCard from "./GoogleAdsStatusCard";
import ProvisioningErrorCard from "./ProvisioningErrorCard";
import ProvisioningTimeline from "./ProvisioningTimeline";
import SearchConsoleStatusCard from "./SearchConsoleStatusCard";
import TrackingEnvironmentPanel from "./TrackingEnvironmentPanel";
import TrackingStatusCard from "./TrackingStatusCard";

function IconButton({ icon: Icon, children, ...props }) {
  return (
    <Button
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        ...(props.style || {}),
      }}
    >
      <Icon size={15} />
      {children}
    </Button>
  );
}

export default function AnalyticsProvisioningCard({ store }) {
  const customer = store.selectedCustomer;
  const status = store.analyticsStatus || customer?.analytics || {};
  const googleAnalytics = status.googleAnalytics || {};
  const searchConsole = status.searchConsole || {};
  const googleAds = status.googleAds || {};
  const clarity = status.clarity || {};
  const canProvision = Boolean(customer?.id && customer?.domain && customer?.deployment?.deploymentId);

  if (!customer) return null;

  return (
    <Card style={{ marginBottom: 12 }}>
      <SectionTitle
        title="Marketing tracking"
        subtitle="Google Analytics, Search Console, Google Ads en tracking-injectie."
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <IconButton
              icon={RefreshCw}
              tone="soft"
              onClick={() => store.loadCustomerAnalyticsStatus(customer)}
              disabled={store.isLoadingAnalyticsStatus}
            >
              Ververs
            </IconButton>
            <IconButton
              icon={Rocket}
              tone="primary"
              onClick={() => store.provisionCustomerAnalytics(customer)}
              disabled={!canProvision || store.isProvisioningAnalytics}
            >
              Provision marketing stack
            </IconButton>
            <IconButton
              icon={BarChart3}
              tone="soft"
              onClick={() => store.retryCustomerAnalytics(customer)}
              disabled={!canProvision || store.isProvisioningAnalytics}
            >
              Retry
            </IconButton>
            <IconButton
              icon={Download}
              tone="soft"
              onClick={() => store.downloadCustomerAnalyticsPdf(customer)}
              disabled={store.isDownloadingAnalytics}
            >
              PDF
            </IconButton>
          </div>
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <TrackingStatusCard title="Google Analytics" status={googleAnalytics.status}>
          <div>Measurement ID: <strong>{googleAnalytics.measurementId || "—"}</strong></div>
          <div>Property: <strong>{googleAnalytics.propertyId || "—"}</strong></div>
          <div>Stream: <strong>{googleAnalytics.dataStreamId || "—"}</strong></div>
        </TrackingStatusCard>
        <SearchConsoleStatusCard searchConsole={searchConsole} />
        <GoogleAdsStatusCard googleAds={googleAds} />
        <TrackingStatusCard title="Clarity" status={clarity.status}>
          <div>Project ID: <strong>{clarity.projectId || "—"}</strong></div>
          <div>{clarity.errorMessage || "Optioneel onderdeel van de tracking stack."}</div>
        </TrackingStatusCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))", gap: 10 }}>
        <TrackingEnvironmentPanel environment={status.trackingEnvironment} />
        <ProvisioningTimeline events={status.timeline} />
      </div>

      <div style={{ marginTop: 10 }}>
        <ProvisioningErrorCard errors={status.provisioningErrors} />
      </div>
    </Card>
  );
}
