import UnheadVite from "@unhead/addons/vite";
import { defineNuxtConfig } from "nuxt/config";

import { CUSTOM_HEAD, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "./src/content";

export default defineNuxtConfig({
  app: {
    head: CUSTOM_HEAD,
    layoutTransition: {
      mode: "out-in",
      name: "layout",
    },
    pageTransition: {
      mode: "out-in",
      name: "page",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  components: [
    {
      extensions: [".vue"],
      path: "~/components",
    },
  ],
  css: [
    "@/assets/styles/index.scss",
    "vue3-lottie/dist/style.css",
    "vuetify/lib/styles/main.sass",
  ],
  experimental: {
    externalVue: true,
    payloadExtraction: false,
  },
  modules: [
    "@nuxt/devtools",
    "nuxt-link-checker",
    "nuxt-schema-org",
    "nuxt-simple-sitemap",
    "nuxt-swiper",
    "nuxt-unhead",
  ],
  nitro: {
    minify: true,
    prerender: {
      crawlLinks: true,
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
      siteDescription: DEFAULT_DESCRIPTION,
      siteName: DEFAULT_TITLE,
      siteUrl: process.env.NUXT_WEBSITE_URL,
      titleSeparator: "|",
      trailingSlash: false,
    },
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
