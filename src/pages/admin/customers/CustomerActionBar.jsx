import React from "react";

import { Button, Card } from "../components/AdminUI";
import { generateOfferPdf } from "../offers/generateOfferPdf";
import {
  canApproveCustomer,
  canDeployCustomer,
  canManageDeployment,
  canMarkPreviewReady,
  canStartBuildFlow,
  deploymentTone,
  formatStageLabel,
  workflowTone,
} from "./customerWorkflow";
import StatusPill from "./StatusPill";

function ActionGroup({ title, children }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        alignContent: "start",
        minWidth: 0,
      }}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: 11,
          fontWeight: 900,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}

export default function CustomerActionBar({ store }) {
  const customer = store.selectedCustomer;
  const stripeCustomerId =
    customer?.stripeCustomerId || customer?.billing?.stripeCustomerId || "";
  const isBillingBusy = Boolean(store.isUpdatingBilling);

  if (!customer) return null;

  return (
    <Card
      style={{
        background: "#f8fbff",
        borderColor: "#cfe0f5",
        marginBottom: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <StatusPill tone={workflowTone(store.selectedCustomerWorkflowState)}>
            {store.selectedCustomerWorkflowState}
          </StatusPill>
          <StatusPill tone={deploymentTone(customer?.deployment?.status)}>
            {customer?.deployment?.status || "NO_DEPLOYMENT"}
          </StatusPill>
          <span
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              background: "#ffffff",
              color: "#0f172a",
              fontWeight: 900,
              fontSize: 12,
              border: "1px solid #d9e2ee",
            }}
          >
            {formatStageLabel(customer?.deployment?.currentStage)}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 14,
        }}
      >
        <ActionGroup title="Klant">
          <Button tone="soft" onClick={() => generateOfferPdf(customer)}>
            Genereer Offerte
          </Button>
          {customer.base44?.editorUrl ? (
            <Button tone="soft" onClick={() => store.openBase44Editor(customer)}>
              Open Base44
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
          <Button tone="danger" onClick={() => store.requestDeleteCustomer(customer)}>
            Verwijderen
          </Button>
        </ActionGroup>

        <ActionGroup title="Stripe">
          {!stripeCustomerId ? (
            <Button
              tone="primary"
              onClick={() => store.createStripeCustomer(customer)}
              disabled={isBillingBusy}
            >
              {isBillingBusy ? "Bezig..." : "Stripe klant aanmaken"}
            </Button>
          ) : null}
          <Button
            tone="success"
            onClick={() => store.createStripeCheckout(customer)}
            disabled={isBillingBusy}
          >
            {isBillingBusy ? "Bezig..." : "Open Checkout"}
          </Button>
          {stripeCustomerId ? (
            <Button
              tone="soft"
              onClick={() => store.openBillingPortal(customer)}
              disabled={isBillingBusy}
            >
              {isBillingBusy ? "Bezig..." : "Billing Portal"}
            </Button>
          ) : null}
        </ActionGroup>

        <ActionGroup title="Workflow">
          <Button tone="soft" onClick={() => store.autoCreateBase44App(customer)}>
            Bouwverzoek
          </Button>
        </ActionGroup>
      </div>
    </Card>
  );
}
