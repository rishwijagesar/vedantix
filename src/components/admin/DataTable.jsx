export default function DataTable({ columns = [], rows = [] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id || index}>
            {columns.map((column) => (
              <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
