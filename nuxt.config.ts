import { defineNuxtConfig } from "nuxt/config";

import { CUSTOM_HEAD, DEFAULT_DESCRIPTION, DEFAULT_SITE_NAME } from "./src/content";

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
  css: ["@/assets/styles/index.scss", "vuetify/lib/styles/main.sass", "vuetify/styles"],
  experimental: {
    externalVue: true,
    payloadExtraction: false,
  },
  extends: ["nuxt-seo-kit"],
  nitro: {
    minify: true,
    prerender: {
      crawlLinks: true,
    },
  },
  runtimeConfig: {
    public: {
      siteDescription: DEFAULT_DESCRIPTION,
      siteName: DEFAULT_SITE_NAME,
      siteUrl: process.env.NUXT_WEBSITE_URL,
      titleSeparator: "|",
      trailingSlash: false,
    },
  },
  sourcemap: {
    client: true,
    server: false,
  },
  srcDir: "src/",
  ssr: true,
  telemetry: false,
  typescript: {
    shim: true,
    typeCheck: false,
  },
  vite: {
    build: {
      cssCodeSplit: true,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            lottie: ["vue3-lottie"],
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
    ssr: {
      noExternal: ["vue3-lottie"],
    },
  },
});
