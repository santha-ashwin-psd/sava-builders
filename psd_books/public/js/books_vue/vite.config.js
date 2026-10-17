import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// Vue + Vue Router are bundled (not externalised). The legacy SPA loaded them
// from a CDN; the new bundle is self-contained so the app works on networks
// that block unpkg.
export default defineConfig({
  plugins: [vue()],
  // Vite's `lib` build mode does NOT auto-replace process.env.NODE_ENV
  // the way an app build does, so Vue's runtime references a non-existent
  // `process` global at runtime. Inline the production constants here.
  define: {
    "process.env.NODE_ENV":            JSON.stringify("production"),
    "__VUE_OPTIONS_API__":             "true",
    "__VUE_PROD_DEVTOOLS__":           "false",
    "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__": "false",
  },
  build: {
    outDir:      resolve(__dirname, "../../js"),
    assetsDir:   "",
    emptyOutDir: false,
    lib: {
      entry:    resolve(__dirname, "src/main.js"),
      name:     "BooksApp",
      fileName: () => "books.js",
      formats:  ["iife"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]",
      },
    },
    minify:       true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
});
