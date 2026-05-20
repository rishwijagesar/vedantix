import React from "react";

import { Button, Card, SectionTitle } from "../components/AdminUI";
import {
  buildChecklist,
  deploymentTone,
  formatStageLabel,
  workflowTone,
} from "./customerWorkflow";
import BackendActionsSection from "./BackendActionsSection";
import Base44WorkflowSection from "./Base44WorkflowSection";
import CustomerFinanceSection from "./CustomerFinanceSection";
import CustomerProfileSection from "./CustomerProfileSection";
import CustomerStatsGrid from "./CustomerStatsGrid";
import DeploymentHistorySection from "./DeploymentHistorySection";
import DeploymentStatusSection from "./DeploymentStatusSection";
import StatusPill from "./StatusPill";
import StripeBillingSection from "./StripeBillingSection";
import WorkflowChecklist from "./WorkflowChecklist";

export default function CustomerDetail({ store }) {
  const customer = store.selectedCustomer;

  if (!customer) {
    return null;
  }

  return (
    <Card>
      <SectionTitle
        title={`Klantdetail — ${customer.companyName}`}
        subtitle="Alle klantgegevens, Base44-koppeling, preview en financieel overzicht per periode."
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <StatusPill tone={workflowTone(store.selectedCustomerWorkflowState)}>
              {store.selectedCustomerWorkflowState}
            </StatusPill>

            <StatusPill tone={deploymentTone(customer?.deployment?.status)}>
              {customer?.deployment?.status || "NO_DEPLOYMENT"}
            </StatusPill>

            <span
              style={{
                padding: "7px 12px",
                borderRadius: 999,
                background: "#0f172a10",
                color: "#0f172a",
                fontWeight: 900,
                fontSize: 12,
                border: "1px solid #0f172a15",
              }}
            >
              {formatStageLabel(customer?.deployment?.currentStage)}
            </span>

            {store.isAutoRefreshing ? (
              <span
                style={{
                  padding: "7px 12px",
                  borderRadius: 999,
                  background: "#0f172a10",
                  color: "#0f172a",
                  fontWeight: 900,
                  fontSize: 12,
                  border: "1px solid #0f172a15",
                }}
              >
                Auto-refresh actief
              </span>
            ) : null}

            {customer.base44?.editorUrl ? (
              <Button tone="soft" onClick={() => store.openBase44Editor(customer)}>
                Open in Base44
              </Button>
            ) : null}

            {customer.preview?.fullUrl ? (
              <Button
                onClick={() =>
                  window.open(customer.preview.fullUrl, "_blank", "noopener,noreferrer")
                }
              >
                Open preview
              </Button>
            ) : null}
          </div>
        }
      />

      <WorkflowChecklist checklist={buildChecklist(customer)} />
      <DeploymentStatusSection store={store} />
      <CustomerStatsGrid store={store} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <StripeBillingSection store={store} />
        <CustomerProfileSection store={store} />
        <Base44WorkflowSection store={store} />
      </div>

      <DeploymentHistorySection store={store} />
      <CustomerFinanceSection store={store} />
      <BackendActionsSection store={store} />
    </Card>
  );
}
