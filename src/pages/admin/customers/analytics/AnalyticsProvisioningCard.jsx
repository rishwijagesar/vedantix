import React from "react";
import { BarChart3, Download, KeyRound, RefreshCw, Rocket } from "lucide-react";

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
  const environmentStatus = store.marketingEnvironmentStatus || {};
  const missingEnvironment = environmentStatus.missing || [];
  const environmentWarnings = environmentStatus.warnings || [];
  const canProvision = Boolean(customer?.id && customer?.domain && customer?.deployment?.deploymentId);
  const cooldownSeconds = store.analyticsActionCooldownSeconds || 0;
  const actionLocked =
    cooldownSeconds > 0 ||
    store.isProvisioningAnalytics ||
    store.isReconnectingGoogleAnalytics;

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
              onClick={() => {
                store.loadCustomerAnalyticsStatus(customer);
                store.loadMarketingEnvironmentStatus();
              }}
              disabled={store.isLoadingAnalyticsStatus}
            >
              Ververs
            </IconButton>
            <IconButton
              icon={KeyRound}
              tone="soft"
              onClick={() => store.reconnectGoogleAnalytics(customer)}
              disabled={!canProvision || actionLocked}
            >
              {store.isReconnectingGoogleAnalytics ? "Reconnect..." : "Reconnect OAuth"}
            </IconButton>
            <IconButton
              icon={Rocket}
              tone="primary"
              onClick={() => store.provisionCustomerAnalytics(customer)}
              disabled={!canProvision || actionLocked}
            >
              {store.isProvisioningAnalytics ? "Provisioning..." : "Provision marketing stack"}
            </IconButton>
            <IconButton
              icon={BarChart3}
              tone="soft"
              onClick={() => store.retryCustomerAnalytics(customer)}
              disabled={!canProvision || actionLocked}
            >
              {cooldownSeconds > 0 ? `Retry (${cooldownSeconds}s)` : "Retry"}
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

      {missingEnvironment.length || environmentWarnings.length ? (
        <div
          style={{
            border: missingEnvironment.length ? "1px solid #fecaca" : "1px solid #fed7aa",
            background: missingEnvironment.length ? "#fff1f2" : "#fff7ed",
            borderRadius: 10,
            padding: 12,
            marginBottom: 10,
            color: missingEnvironment.length ? "#991b1b" : "#9a3412",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          <strong>Marketing omgeving</strong>
          {missingEnvironment.length ? (
            <div>Ontbreekt: {missingEnvironment.join(", ")}</div>
          ) : null}
          {environmentWarnings.length ? (
            <div>{environmentWarnings.join(" ")}</div>
          ) : null}
        </div>
      ) : null}

      {store.analyticsPollingStopped ? (
        <div
          style={{
            border: "1px solid #bfdbfe",
            background: "#eff6ff",
            color: "#1d4ed8",
            borderRadius: 10,
            padding: 12,
            marginBottom: 10,
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          Automatisch verversen is gestopt om eindeloos pollen te voorkomen. Gebruik Ververs om de actuele status opnieuw op te halen.
        </div>
      ) : null}

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
