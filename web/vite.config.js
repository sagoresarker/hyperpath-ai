import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Builds a static multi-page site into the repository root, which GitHub Pages
// serves directly from the main branch. Set VITE_BASE="/" for a custom domain.
export default defineConfig({
  base: process.env.VITE_BASE || "/hyperpath-ai/",
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, ".."),
    emptyOutDir: false,
    assetsDir: "assets",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        notfound: resolve(__dirname, "404.html"),
      },
    },
  },
});
