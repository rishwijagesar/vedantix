import React from "react";
import {
  BarChart3,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileText,
  MailPlus,
  PowerOff,
  ReceiptText,
  Rocket,
  Trash2,
} from "lucide-react";

import { Button, Card } from "../components/AdminUI";
import { generateOfferPdf } from "../offers/generateOfferPdf";
import {
  canDeployCustomer,
  canOpenLiveWebsite,
  canOpenPreview,
  canSendFirstInvoice,
  canSendOffer,
  deploymentTone,
  formatStageLabel,
  hasCustomerMailDomain,
  isCustomerLive,
  workflowTone,
} from "./customerWorkflow";
import StatusPill from "./StatusPill";

function compactDomain(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

function openLiveWebsite(customer) {
  const domain = compactDomain(customer?.domain);
  if (!domain) return;
  window.open(`https://${domain}`, "_blank", "noopener,noreferrer");
}

function sendOffer(customer) {
  generateOfferPdf(customer);

  const subject = encodeURIComponent(`Offerte ${customer.companyName || customer.domain}`);
  const body = encodeURIComponent(
    [
      `Hi ${customer.contactName || customer.companyName || ""},`,
      "",
      "Bijgevoegd vind je de offerte voor je nieuwe website.",
      "",
      "Met vriendelijke groet,",
      "Vedantix",
    ].join("\n"),
  );

  if (customer.email) {
    window.location.href = `mailto:${customer.email}?subject=${subject}&body=${body}`;
  }
}

function ActionButton({ icon: Icon, children, disabled = false, ...props }) {
  return (
    <Button
      {...props}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        flex: "0 1 auto",
        minHeight: 32,
        padding: "7px 10px",
        fontSize: 12.5,
        whiteSpace: "nowrap",
        maxWidth: "100%",
        ...(props.style || {}),
      }}
    >
      {Icon ? <Icon size={15} strokeWidth={2.4} /> : null}
      <span>{children}</span>
    </Button>
  );
}

function ActionGroup({ title, children }) {
  return (
    <div
      style={{
        minWidth: 0,
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        background: "#f8fafc",
        padding: 8,
      }}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 7,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 7,
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function CustomerActionBar({ store }) {
  const customer = store.selectedCustomer;
  const stripeCustomerId =
    customer?.stripeCustomerId || customer?.billing?.stripeCustomerId || "";
  const isBillingBusy = Boolean(store.isUpdatingBilling);
  const isWorkflowBusy = Boolean(store.isUpdatingWorkflow || store.isProvisioningMail);

  if (!customer) return null;

  const live = isCustomerLive(customer);
  const previewEnabled = canOpenPreview(customer);
  const publishEnabled = canDeployCustomer(customer);
  const hasExistingDeployment = Boolean(customer?.deployment?.deploymentId);
  const publishLabel = hasExistingDeployment
    ? live
      ? "Herdeploy naar AWS"
      : "Publiceren / herstellen"
    : "Publiceren naar AWS";
  const websiteEnabled = canOpenLiveWebsite(customer);
  const analyticsEnabled = Boolean(customer?.id && customer?.domain && customer?.deployment?.deploymentId);
  const analyticsLocked =
    store.isProvisioningAnalytics || (store.analyticsActionCooldownSeconds || 0) > 0;
  const offerEnabled = canSendOffer(customer);
  const invoiceEnabled = canSendFirstInvoice(customer);
  const mailReady = hasCustomerMailDomain(customer);
  const offlineEnabled = Boolean(customer?.deployment?.deploymentId && live);

  return (
    <Card
      style={{
        background: "#ffffff",
        borderColor: "#dbe4ef",
        marginBottom: 12,
        padding: 14,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(150px, 0.32fr) minmax(0, 1fr)",
          gap: 12,
          alignItems: "start",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 8 }}>
            <StatusPill tone={workflowTone(store.selectedCustomerWorkflowState)}>
              {store.selectedCustomerWorkflowState}
            </StatusPill>
            <StatusPill tone={deploymentTone(customer?.deployment?.status)}>
              {customer?.deployment?.status || "NO_DEPLOYMENT"}
            </StatusPill>
          </div>
          <div
            style={{
              color: "#64748b",
              fontSize: 12,
              fontWeight: 800,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={formatStageLabel(customer?.deployment?.currentStage)}
          >
            Stage: {formatStageLabel(customer?.deployment?.currentStage)}
          </div>
        </div>

        <div
          style={{
            minWidth: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 8,
          }}
        >
          <ActionGroup title="Website">
            <ActionButton
              icon={Eye}
              onClick={() => store.openBase44Preview(customer)}
              disabled={!previewEnabled}
            >
              Open Preview
            </ActionButton>

            <ActionButton
              icon={Rocket}
              tone="success"
              onClick={() => store.deployCustomer(customer)}
              disabled={isWorkflowBusy || !publishEnabled}
            >
              {publishLabel}
            </ActionButton>

            <ActionButton
              icon={ExternalLink}
              tone={live ? "soft" : "default"}
              onClick={() => openLiveWebsite(customer)}
              disabled={!websiteEnabled}
            >
              Open website
            </ActionButton>

            <ActionButton
              icon={PowerOff}
              tone="danger"
              onClick={() => store.takeCustomerOffline(customer)}
              disabled={store.isTakingCustomerOffline || !offlineEnabled}
            >
              Website offline
            </ActionButton>
          </ActionGroup>

          <ActionGroup title="Marketing">
            <ActionButton
              icon={BarChart3}
              tone="soft"
              onClick={() => store.provisionCustomerAnalytics(customer)}
              disabled={analyticsLocked || !analyticsEnabled}
            >
              {store.isProvisioningAnalytics
                ? "Analytics bezig"
                : store.analyticsActionCooldownSeconds
                  ? `Analytics (${store.analyticsActionCooldownSeconds}s)`
                  : "Analytics koppelen"}
            </ActionButton>

            <ActionButton
              icon={Download}
              tone="soft"
              onClick={() => store.downloadCustomerAnalyticsPdf(customer)}
              disabled={store.isDownloadingAnalytics || !customer?.id}
            >
              Analytics PDF
            </ActionButton>
          </ActionGroup>

          <ActionGroup title="Klant">
            <ActionButton
              icon={MailPlus}
              tone={mailReady ? "soft" : "default"}
              onClick={() => store.provisionInfoMailbox(customer)}
              disabled={store.isProvisioningMail || !customer.domain}
            >
              {mailReady ? "Mail gekoppeld" : "Maak mail account aan"}
            </ActionButton>

            <ActionButton
              icon={FileText}
              tone="soft"
              onClick={() => sendOffer(customer)}
              disabled={!offerEnabled}
            >
              Verstuur offerte
            </ActionButton>
          </ActionGroup>

          <ActionGroup title="Billing">
            <ActionButton
              icon={CreditCard}
              tone={stripeCustomerId ? "soft" : "primary"}
              onClick={() =>
                stripeCustomerId
                  ? store.openBillingPortal(customer)
                  : store.createStripeCustomer(customer)
              }
              disabled={isBillingBusy}
            >
              {stripeCustomerId ? "Open Stripe" : "Koppelen aan Stripe"}
            </ActionButton>

            <ActionButton
              icon={ReceiptText}
              tone="success"
              onClick={() => store.sendFirstMonthInvoice(customer)}
              disabled={isBillingBusy || !invoiceEnabled}
            >
              Factuur eerste maand
            </ActionButton>
          </ActionGroup>

          <ActionGroup title="Beheer">
            <ActionButton
              icon={Trash2}
              tone="danger"
              onClick={() => store.requestDeleteCustomer(customer)}
            >
              Verwijderen
            </ActionButton>
          </ActionGroup>
        </div>
      </div>
    </Card>
  );
}
