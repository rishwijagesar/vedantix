import useSettings from '../../hooks/useSettings';
import PageHeader from '../../components/ui/PageHeader';
import ContentCard from '../../components/layout/ContentCard';
import Spinner from '../../components/ui/Spinner';

export default function SettingsPage() {
  const { loading, settings } = useSettings();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Beheer algemene applicatie-instellingen."
      />

      <ContentCard>
        <pre className="text-sm text-gray-700">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </ContentCard>
    </div>
  );
}
