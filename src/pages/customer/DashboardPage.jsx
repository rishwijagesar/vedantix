import PageHeader from '../../components/ui/PageHeader';
import GridSection from '../../components/layout/GridSection';
import StatCard from '../../components/ui/StatCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overzicht van je website en abonnement."
      />

      <GridSection columns={3}>
        <StatCard label="Actieve websites" value={1} />
        <StatCard label="Mailboxen" value={1} />
        <StatCard label="Status" value="Actief" />
      </GridSection>
    </div>
  );
}
