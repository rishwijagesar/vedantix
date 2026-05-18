export default function TopBar({ title }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}
