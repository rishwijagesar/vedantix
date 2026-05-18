import KpiCard from './KpiCard';

export default function KpiGrid({ items = [] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <KpiCard key={item.title} title={item.title} value={item.value} />
      ))}
    </div>
  );
}
