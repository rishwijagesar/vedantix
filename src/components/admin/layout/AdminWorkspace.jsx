import React from 'react';
import { DEFAULT_ADMIN_TAB, ADMIN_TABS } from '../config';
import AdminHeader from './AdminHeader';
import AdminPageContainer from './AdminPageContainer';
import AdminTabs from './AdminTabs';

export default function AdminWorkspace({
  title = 'Vedantix Admin CRM',
  subtitle = 'Beheer klanten, leads, deployments, mailboxen en finance.',
  tabs = ADMIN_TABS,
  activeTab = DEFAULT_ADMIN_TAB,
  onTabChange,
  children,
}) {
  return (
    <AdminPageContainer>
      <AdminHeader title={title} subtitle={subtitle} />
      <AdminTabs tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      {children}
    </AdminPageContainer>
  );
}
