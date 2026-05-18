export default function useApiConfig() {
  const apiBaseUrl =
    import.meta.env.VITE_PROVISIONING_API_URL ||
    import.meta.env.VITE_API_URL ||
    '';

  const apiKey =
    import.meta.env.VITE_PROVISIONING_API_KEY ||
    import.meta.env.VITE_API_KEY ||
    '';

  return {
    apiBaseUrl,
    apiKey,
  };
}
