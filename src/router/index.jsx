import { createBrowserRouter } from 'react-router-dom';

import PricingPage from '../pages/pricing/PricingPage';
import BlogPage from '../pages/blog/BlogPage';
import FaqPage from '../pages/faq/FaqPage';
import ContactPage from '../pages/contact/ContactPage';

import AnalyticsPage from '../pages/admin/AnalyticsPage';
import MailboxesPage from '../pages/admin/MailboxesPage';
import SettingsPage from '../pages/admin/SettingsPage';

import DashboardPage from '../pages/customer/DashboardPage';
import SubscriptionPage from '../pages/customer/SubscriptionPage';

export const router = createBrowserRouter([
  { path: '/', element: <PricingPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/faq', element: <FaqPage /> },
  { path: '/contact', element: <ContactPage /> },

  { path: '/admin/analytics', element: <AnalyticsPage /> },
  { path: '/admin/mailboxes', element: <MailboxesPage /> },
  { path: '/admin/settings', element: <SettingsPage /> },

  { path: '/portal', element: <DashboardPage /> },
  { path: '/portal/subscription', element: <SubscriptionPage /> },
]);

export default router;
