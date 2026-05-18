import React, { useMemo, useState } from 'react';

import {
  ADMIN_TABS,
  DEFAULT_ADMIN_TAB,
  renderAdminTab,
} from './config';
import { useApiConfig } from './hooks';
import { AdminWorkspace, TabContent } from './layout';

export default function AdminCRMPage({
  initialTab = DEFAULT_ADMIN_TAB,
  title = 'Vedantix Admin CRM',
  subtitle = 'Beheer klanten, leads, deployments, mailboxen en finance.',
  sectionProps = {},
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { apiBaseUrl, apiKey } = useApiConfig();

  const mergedSectionProps = useMemo(
    () => ({
      apiBaseUrl,
      apiKey,
      activeTab,
      ...sectionProps,
    }),
    [apiBaseUrl, apiKey, activeTab, sectionProps]
  );

  return (
    <AdminWorkspace
      title={title}
      subtitle={subtitle}
      tabs={ADMIN_TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <TabContent>
        {renderAdminTab(activeTab, mergedSectionProps)}
      </TabContent>
    </AdminWorkspace>
  );
}
