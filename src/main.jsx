import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "@/App.jsx";
import "@/index.css";
import "./styles/accessibility.css";

const CHUNK_RELOAD_KEY = "vedantix_chunk_reload_at";
const CHUNK_RELOAD_COOLDOWN_MS = 30_000;

function reloadOnceForStaleChunk() {
  try {
    const lastReloadAt = Number(window.sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
    const now = Date.now();

    if (now - lastReloadAt < CHUNK_RELOAD_COOLDOWN_MS) {
      return;
    }

    window.sessionStorage.setItem(CHUNK_RELOAD_KEY, String(now));
  } catch {
    // Session storage may be unavailable; reloading is still the safest recovery.
  }

  window.location.reload();
}

// Vite emits this when a lazily loaded, hashed chunk no longer exists after a deployment.
// A single reload fetches the latest no-cache index.html and therefore the new asset hashes.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  reloadOnceForStaleChunk();
});

// Keep a fallback for browsers where a failed dynamic import surfaces as an unhandled promise rejection.
window.addEventListener("unhandledrejection", (event) => {
  const message = String(event.reason?.message || event.reason || "");
  if (
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("Importing a module script failed")
  ) {
    event.preventDefault();
    reloadOnceForStaleChunk();
  }
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);