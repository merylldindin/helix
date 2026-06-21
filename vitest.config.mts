import { fileURLToPath } from "node:url";

import { defineVitestProject } from "@nuxt/test-utils/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["app/**/*.d.ts", "app/content/**", "app/types/**"],
      include: ["app/**/*.{ts,vue}"],
      provider: "v8",
      reporter: ["html", "text"],
    },
    projects: [
      {
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./app", import.meta.url)),
          },
        },
        test: {
          environment: "node",
          include: ["tests/unit/**/*.spec.ts"],
          name: "unit",
        },
      },
      await defineVitestProject({
        test: {
          environment: "nuxt",
          environmentOptions: {
            nuxt: { domEnvironment: "happy-dom" },
          },
          include: ["tests/nuxt/**/*.spec.ts"],
          name: "nuxt",
        },
      }),
    ],
  },
});
