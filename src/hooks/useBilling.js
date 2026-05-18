import { useEffect, useState } from 'react';
import billingApi from '../api/billing';

export function useBilling() {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      billingApi.getSubscription(),
      billingApi.getInvoices(),
    ])
      .then(([subscriptionResult, invoicesResult]) => {
        setSubscription(subscriptionResult);
        setInvoices(invoicesResult?.items || invoicesResult || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    subscription,
    invoices,
    error,
    createCheckoutSession: billingApi.createCheckoutSession,
    createPortalSession: billingApi.createPortalSession,
  };
}

export default useBilling;
