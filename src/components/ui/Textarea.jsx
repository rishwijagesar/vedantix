export default function Textarea(props) {
  return (
    <textarea
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      {...props}
    />
  );
}
