export default function SectionCard({ title, children }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
      )}
      {children}
    </section>
  );
}
