import UnheadVite from "@unhead/addons/vite";
import { defineNuxtConfig } from "nuxt/config";

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "./src/content";
import { RoutePath } from "./src/types/routes";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"]
  },

  compatibilityDate: "2025-03-08",

  components: [{
    extensions: [".vue"],
    path: "~/components"
  }],

  css: ["@/assets/styles/index.scss", "vuetify/lib/styles/main.sass"],

  experimental: {
    externalVue: true,
    payloadExtraction: true
  },

  // @ts-ignore-next-line
  linkChecker: {
    skipInspections: ["link-text", "no-error-response", "no-baseless", "trailing-slash"]
  },

  modules: ["@nuxt/devtools", "@nuxt/eslint", "@nuxtjs/sitemap", "nuxt-jsonld", "nuxt-link-checker", "nuxt-unhead"],

  nitro: {
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: Object.values(RoutePath)
    }
  },

  plugins: ["@/plugins/vuetify.client/index.ts"],

  postcss: {
    plugins: {
      cssnano: { preset: "default" },
    }
  },

  runtimeConfig: {
    public: {
      environment: process.env.NUXT_ENVIRONMENT,
      language: "en",
      siteDescription: DEFAULT_DESCRIPTION,
      siteName: DEFAULT_TITLE,
      siteUrl: process.env.NUXT_WEBSITE_URL,
      titleSeparator: "|",
      trailingSlash: true
    }
  },

  site: {
    trailingSlash: true,
    url: process.env.NUXT_WEBSITE_URL
  },

  sourcemap: {
    client: false,
    server: false
  },

  srcDir: "src/",
  ssr: true,
  telemetry: false,

  typescript: {
    shim: true,
    typeCheck: "build"
  },

  vite: {
    build: {
      cssCodeSplit: true,
      manifest: true,
      minify: true,

      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "EVAL" && warning.id && warning.id.includes("lottie-web")) {
            return;
          }

          warn(warning);
        },

        output: {
          compact: true,
          manualChunks: {
            lottie: ["vue3-lottie"],
            vuetify: ["vuetify"]
          }
        }
      },

      sourcemap: "hidden"
    },

    css: {
      preprocessorOptions: {
        sass: {
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"]
        },
        scss: {
          additionalData: "@use '@/assets/variables/index.scss' as *;",
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"]
        },
      },
    },

    define: {
      "process.env.DEBUG": false
    },

    plugins: [UnheadVite()],
  },
});
