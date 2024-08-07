import UnheadVite from "@unhead/addons/vite";
import { defineNuxtConfig } from "nuxt/config";

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "./src/content";
import { RoutePath } from "./src/types/routes";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  components: [
    {
      extensions: [".vue"],
      path: "~/components",
    },
  ],
  css: ["@/assets/styles/index.scss", "vuetify/lib/styles/main.sass"],
  experimental: {
    externalVue: true,
    payloadExtraction: true,
  },
  // @ts-ignore-next-line
  linkChecker: {
    skipInspections: ["link-text", "no-error-response", "no-baseless", "trailing-slash"],
  },
  modules: [
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxtjs/sitemap",
    "nuxt-jsonld",
    "nuxt-link-checker",
    "nuxt-swiper",
    "nuxt-unhead",
  ],
  nitro: {
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: Object.values(RoutePath),
    },
  },
  plugins: ["@/plugins/vuetify.client/index.ts"],
  postcss: {
    plugins: {
      cssnano: true,
    },
  },
  runtimeConfig: {
    public: {
      environment: process.env.NUXT_ENVIRONMENT,
      language: "en",
      siteDescription: DEFAULT_DESCRIPTION,
      siteName: DEFAULT_TITLE,
      siteUrl: process.env.NUXT_WEBSITE_URL,
      titleSeparator: "|",
      trailingSlash: true,
    }
  },
  site: {
    trailingSlash: true,
    url: process.env.NUXT_WEBSITE_URL,
  },
  sourcemap: {
    client: false,
    server: false,
  },
  srcDir: "src/",
  ssr: true,
  telemetry: false,
  typescript: {
    shim: true,
    typeCheck: "build",
  },
  vite: {
    build: {
      cssCodeSplit: true,
      manifest: true,
      minify: true,
      rollupOptions: {
        output: {
          compact: true,
          manualChunks: {
            lottie: ["vue3-lottie"],
            swiper: ["nuxt-swiper"],
            vuetify: ["vuetify"],
          },
        },
      },
      sourcemap: "hidden",
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/assets/variables/index.scss' as *;",
        },
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
    plugins: [UnheadVite()],
    ssr: {
      noExternal: ["vue3-lottie"],
    },
  },
});
