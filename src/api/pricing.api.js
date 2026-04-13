const API_BASE =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export async function fetchPackages() {
  const res = await fetch(`${API_BASE}/api/pricing/packages`);
  if (!res.ok) throw new Error("Failed to fetch packages");
  return res.json();
}