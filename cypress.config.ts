import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: ["**/spec.ts", "**/*.spec.ts"],
    viewportHeight: 800,
    viewportWidth: 1280,
  },
});
