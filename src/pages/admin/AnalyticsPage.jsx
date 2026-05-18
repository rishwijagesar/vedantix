import useAnalytics from '../../hooks/useAnalytics';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import GridSection from '../../components/layout/GridSection';
import Spinner from '../../components/ui/Spinner';

export default function AnalyticsPage() {
  const { loading, summary } = useAnalytics();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Overzicht van bezoekers, leads en conversies."
      />

      <GridSection columns={3}>
        <StatCard label="Bezoekers" value={summary?.visitors ?? 0} />
        <StatCard label="Leads" value={summary?.leads ?? 0} />
        <StatCard label="Conversies" value={summary?.conversions ?? 0} />
      </GridSection>
    </div>
  );
}
