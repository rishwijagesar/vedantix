import { createClient } from '@base44/sdk';

const BASE44_APP_ID = import.meta.env.VITE_BASE44_APP_ID || "69b9b443c57eefc3d3bfafbf";
const BASE44_APP_BASE_URL = (
  import.meta.env.VITE_BASE44_APP_BASE_URL || "https://app.base44.com"
).replace(/\/+$/, "");

export const base44 = createClient({
  appId: BASE44_APP_ID,
  appBaseUrl: BASE44_APP_BASE_URL,
  functionsVersion: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
  requiresAuth: false,
});

export function getBase44LoginUrl(fromUrl) {
  const redirectUrl =
    typeof window === "undefined"
      ? fromUrl || "/klantenportaal"
      : new URL(fromUrl || "/klantenportaal", window.location.origin).toString();
  const loginUrl = new URL(`${BASE44_APP_BASE_URL}/login`);
  loginUrl.searchParams.set("from_url", redirectUrl);
  loginUrl.searchParams.set("app_id", BASE44_APP_ID);
  return loginUrl.toString();
}

export function redirectToBase44Login(fromUrl) {
  window.location.href = getBase44LoginUrl(fromUrl);
}
