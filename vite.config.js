import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  logLevel: "info",
  base: "/",
  build: {
    // phaser isn't compatible with base64 encoded images
    assetsInlineLimit: 0,
    sourcemap: process.env.NODE_ENV === "development",
  },
  define: {
    // phaser references 'global' so we need to set it to window
    global: "globalThis",
  },
});
