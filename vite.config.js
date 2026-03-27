import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    coverage: {
      provider: "istanbul",
      reporter: ["html"],
      reportsDirectory: "./coverage",
      exclude: ["data/**", "test/**"],
    },
  },
});
