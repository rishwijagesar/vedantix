export default function Sidebar({ items = [] }) {
  return (
    <aside className="w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
