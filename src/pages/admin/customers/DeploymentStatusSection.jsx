import React from "react";

import { Button, Card, SectionTitle, StatCard } from "../components/AdminUI";
import { deploymentTone, formatStageLabel } from "./customerWorkflow";

function getMetadataValue(metadata, key) {
  if (!metadata || typeof metadata !== "object") return "";
  return metadata[key] || metadata?.M?.[key]?.S || "";
}

function getLatestDeploymentFailure(store) {
  const failedOperation = (store.deploymentOperations || []).find(
    (operation) =>
      String(operation?.status || "").toUpperCase() === "FAILED" &&
      operation?.errorMessage
  );
  const failedEvent = (store.deploymentAuditEvents || []).find(
    (event) =>
      event?.eventType === "STAGE_FAILED" &&
      getMetadataValue(event?.metadata || event?.details, "error")
  );

  const eventMetadata = failedEvent?.metadata || failedEvent?.details || {};
  const message =
    failedOperation?.errorMessage ||
    getMetadataValue(eventMetadata, "error") ||
    "";
  const stage =
    getMetadataValue(eventMetadata, "stage") ||
    failedOperation?.requestedStage ||
    store.selectedCustomer?.deployment?.failureStage ||
    store.selectedCustomer?.deployment?.currentStage ||
    "";

  if (!message && String(store.selectedCustomer?.deployment?.status || "") !== "FAILED") {
    return null;
  }

  return {
    message: message || "De deployment is gefaald, maar er is nog geen foutmelding geladen.",
    stage,
  };
}

function getFailureAdvice(message, domain) {
  const normalized = String(message || "").toUpperCase();

  if (
    normalized.includes("DELEGATION_PENDING") ||
    normalized.includes("NAMESERVER DELEGATION IS STILL PENDING")
  ) {
    return `De backend heeft de Route53 hosted zone voor ${domain || "dit domein"} geregeld. Zet alleen nog de nameservers bij de domeinregistrar naar de Route53 nameservers uit de foutmelding en probeer daarna opnieuw.`;
  }

  if (normalized.includes("HOSTED_ZONE_NOT_FOUND")) {
    return `De Route53 hosted zone voor ${domain || "dit domein"} ontbreekt nog. Publiceer opnieuw zodra de backend met automatische zone-aanmaak is uitgerold.`;
  }

  if (normalized.includes("RECORD_CONFLICT")) {
    return "Er bestaan al DNS-records op dit hostname. Verwijder of migreer de conflicterende A/AAAA/CNAME records voordat je opnieuw publiceert.";
  }

  if (normalized.includes("HTTP_ACTIVE")) {
    return "Er reageert al een bestaande website op dit domein. Controleer of dit domein al live gebruikt wordt voordat je het overschrijft.";
  }

  return "Bekijk de audit events hieronder voor extra context en probeer de gefaalde stage opnieuw nadat de oorzaak is opgelost.";
}

export default function DeploymentStatusSection({ store }) {
  const customer = store.selectedCustomer;
  const failure = getLatestDeploymentFailure(store);
  const failedStage = failure?.stage || customer?.deployment?.currentStage;
  const canRetryFailedStage = Boolean(
    customer?.deployment?.deploymentId &&
      failedStage &&
      String(customer?.deployment?.status || "").toUpperCase() === "FAILED"
  );

  return (
    <>
      <Card style={{ marginBottom: 14 }}>
        <SectionTitle
          title="Deployment status"
          subtitle="Actuele provisioningstatus, stage en live domein."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 12,
          }}
        >
          <StatCard
            title="Deployment status"
            value={customer?.deployment?.status || "—"}
            subtitle="Laatste backend status"
            tone={deploymentTone(customer?.deployment?.status)}
          />
          <StatCard
            title="Current stage"
            value={formatStageLabel(customer?.deployment?.currentStage)}
            subtitle="Huidige deployment stage"
            tone="#0ea5e9"
          />
          <StatCard
            title="Deployment ID"
            value={customer?.deployment?.deploymentId || "—"}
            subtitle="Actieve deployment"
            tone="#8b5cf6"
          />
          <StatCard
            title="Live domein"
            value={customer?.deployment?.liveDomain || "—"}
            subtitle="Na productie deployment"
            tone="#10b981"
          />
        </div>

        {failure ? (
          <div
            style={{
              marginTop: 12,
              border: "1px solid #fecaca",
              borderRadius: 10,
              background: "#fff1f2",
              padding: 12,
              color: "#991b1b",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 4 }}>
              Deployment gefaald bij {formatStageLabel(failure.stage)}
            </div>
            <div style={{ fontWeight: 800 }}>{failure.message}</div>
            <div style={{ marginTop: 6, color: "#b91c1c" }}>
              {getFailureAdvice(failure.message, customer?.domain)}
            </div>
          </div>
        ) : null}
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTitle
          title="Deployment recovery"
          subtitle="Huidige stage en herstelcontext."
          action={
            canRetryFailedStage ? (
              <Button
                tone="soft"
                disabled={store.isUpdatingWorkflow}
                onClick={() => store.retryDeploymentStage(customer, failedStage)}
              >
                Retry {formatStageLabel(failedStage)}
              </Button>
            ) : null
          }
        />

        <div
          style={{
            border: "1px solid #dbe4ef",
            borderRadius: 10,
            padding: 12,
            background: "#ffffff",
            color: "#334155",
            lineHeight: 1.5,
            fontSize: 13,
          }}
        >
          Huidige stage:{" "}
          <strong>{formatStageLabel(customer?.deployment?.currentStage)}</strong>
        </div>
      </Card>
    </>
  );
}
