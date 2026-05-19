export default function useApiConfig() {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_PROVISIONING_API_URL ||
    import.meta.env.VITE_API_URL ||
    'https://api.vedantix.nl';

  const apiKey =
    import.meta.env.VITE_PROVISIONING_API_KEY ||
    import.meta.env.VITE_API_KEY ||
    '';

  return {
    apiBaseUrl,
    apiKey,
  };
}
