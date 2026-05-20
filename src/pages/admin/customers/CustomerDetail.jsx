import React from "react";

import { SectionTitle } from "../components/AdminUI";
import { buildChecklist } from "./customerWorkflow";
import BackendActionsSection from "./BackendActionsSection";
import Base44WorkflowSection from "./Base44WorkflowSection";
import CustomerActionBar from "./CustomerActionBar";
import CustomerFinanceSection from "./CustomerFinanceSection";
import CustomerProfileSection from "./CustomerProfileSection";
import CustomerStatsGrid from "./CustomerStatsGrid";
import DeploymentHistorySection from "./DeploymentHistorySection";
import DeploymentStatusSection from "./DeploymentStatusSection";
import StripeBillingSection from "./StripeBillingSection";
import WorkflowChecklist from "./WorkflowChecklist";

export default function CustomerDetail({ store }) {
  const customer = store.selectedCustomer;

  if (!customer) {
    return null;
  }

  return (
    <div>
      <SectionTitle
        title={`Klantdetail — ${customer.companyName}`}
        subtitle="Alle klantgegevens, Base44-koppeling, preview en financieel overzicht per periode."
      />

      <CustomerActionBar store={store} />
      <WorkflowChecklist checklist={buildChecklist(customer)} />
      <DeploymentStatusSection store={store} />
      <CustomerStatsGrid store={store} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 14,
          marginBottom: 14,
        }}
      >
        <StripeBillingSection store={store} />
        <CustomerProfileSection store={store} />
        <Base44WorkflowSection store={store} />
      </div>

      <DeploymentHistorySection store={store} />
      <CustomerFinanceSection store={store} />
      <BackendActionsSection store={store} />
    </div>
  );
}
