import React, { useMemo, useState } from 'react';
import { AdminWorkspace, TabContent } from './layout';
import { useApiConfig } from './hooks';
import { ADMIN_TABS, DEFAULT_ADMIN_TAB, renderAdminTab } from './config';

export default function AdminCRMBulk({ initialTab = DEFAULT_ADMIN_TAB, sectionProps = {}, title = 'Vedantix Admin CRM', subtitle = 'Beheer klanten, leads, deployments, mailboxen en finance.' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { apiBaseUrl, apiKey } = useApiConfig();

  const mergedSectionProps = useMemo(() => ({ apiBaseUrl, apiKey, activeTab, ...sectionProps }), [apiBaseUrl, apiKey, activeTab, sectionProps]);

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