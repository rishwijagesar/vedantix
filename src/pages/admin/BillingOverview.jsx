import useBilling from '../../hooks/useBilling';

export default function BillingOverview() {
  const { loading, subscription, invoices } = useBilling();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Billing Overview</h1>
      <pre>{JSON.stringify(subscription, null, 2)}</pre>
      <pre>{JSON.stringify(invoices, null, 2)}</pre>
    </div>
  );
}
