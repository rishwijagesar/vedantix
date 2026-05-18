import React from 'react';

import {
  CustomerListSection,
  DashboardSection,
  DeploymentActionsSection,
  DeploymentTimelineSection,
  FinanceSection,
  InvoiceOverviewSection,
  LeadPipelineSection,
  MailboxManagementSection,
  PaymentReminderSection,
} from '../sections';

export function renderDashboardTab(props) {
  return <DashboardSection {...props} />;
}

export function renderCustomersTab(props) {
  return <CustomerListSection {...props} />;
}

export function renderLeadsTab(props) {
  return <LeadPipelineSection {...props} />;
}

export function renderDeploymentsTab(props) {
  return (
    <>
      <DeploymentActionsSection {...props} />
      <DeploymentTimelineSection {...props} />
    </>
  );
}

export function renderMailboxesTab(props) {
  return <MailboxManagementSection {...props} />;
}

export function renderFinanceTab(props) {
  return (
    <>
      <FinanceSection {...props} />
      <InvoiceOverviewSection {...props} />
      <PaymentReminderSection {...props} />
    </>
  );
}

export function renderSettingsTab() {
  return null;
}

export const TAB_SECTION_REGISTRY = {
  dashboard: renderDashboardTab,
  customers: renderCustomersTab,
  leads: renderLeadsTab,
  deployments: renderDeploymentsTab,
  mailboxes: renderMailboxesTab,
  finance: renderFinanceTab,
  settings: renderSettingsTab,
};

export function renderAdminTab(tab, props = {}) {
  const renderer = TAB_SECTION_REGISTRY[tab];

  if (!renderer) {
    return null;
  }

  return renderer(props);
}
