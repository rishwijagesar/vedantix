import useMailboxes from '../../hooks/useMailboxes';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import EmptyState from '../../components/ui/EmptyState';
import Spinner from '../../components/ui/Spinner';

export default function MailboxesPage() {
  const { loading, items } = useMailboxes();

  if (loading) {
    return <Spinner />;
  }

  if (!items.length) {
    return (
      <EmptyState
        title="Geen mailboxen"
        description="Er zijn nog geen mailboxen beschikbaar."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Mailboxes" />

      <Table
        columns={[
          { key: 'email', label: 'E-mailadres' },
          { key: 'status', label: 'Status' },
        ]}
        rows={items}
      />
    </div>
  );
}
