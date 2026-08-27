import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  logLevel: "error",
  plugins: [react()],
  server: {
    proxy: {
      "/provisioning-api": {
        target: process.env.VITE_PROVISIONING_TARGET || "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/provisioning-api/, ""),
      },
    },
  },
});
