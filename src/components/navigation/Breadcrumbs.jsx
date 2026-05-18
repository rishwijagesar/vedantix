export default function Breadcrumbs({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <nav className="mb-4 text-sm text-gray-500">
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 && ' / '}
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
        </span>
      ))}
    </nav>
  );
}
