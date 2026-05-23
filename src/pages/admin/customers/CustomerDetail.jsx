import React from "react";
import { Link } from "react-router-dom";

import { Button, SectionTitle } from "../components/AdminUI";
import Base44WorkflowSection from "./Base44WorkflowSection";
import CustomerActionBar from "./CustomerActionBar";
import CustomerFinanceSection from "./CustomerFinanceSection";
import CustomerProfileSection from "./CustomerProfileSection";
import CustomerStatsGrid from "./CustomerStatsGrid";
import CustomerWorkflowStepper from "./CustomerWorkflowStepper";
import DeploymentHistorySection from "./DeploymentHistorySection";
import DeploymentStatusSection from "./DeploymentStatusSection";
import StripeBillingSection from "./StripeBillingSection";

export default function CustomerDetail({ store }) {
  const customer = store.selectedCustomer;

  if (!customer) {
    return null;
  }

  return (
    <div>
      <SectionTitle
        title={customer.companyName}
        subtitle={`${customer.domain || "Geen domein"} · ${customer.contactName || "Geen contactpersoon"}`}
        action={
          <Link to="/admin/customers" style={{ textDecoration: "none" }}>
            <Button tone="soft">Terug naar klanten</Button>
          </Link>
        }
      />

      <CustomerActionBar store={store} />
      <CustomerWorkflowStepper customer={customer} />
      <CustomerStatsGrid store={store} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
          gap: 12,
          marginBottom: 12,
          alignItems: "start",
        }}
      >
        <Base44WorkflowSection store={store} />
        <div style={{ display: "grid", gap: 12 }}>
          <CustomerProfileSection store={store} />
          <StripeBillingSection store={store} />
          <DeploymentStatusSection store={store} />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
          gap: 12,
          marginBottom: 12,
          alignItems: "start",
        }}
      >
        <CustomerFinanceSection store={store} />
        <DeploymentHistorySection store={store} />
      </div>
    </div>
  );
}
