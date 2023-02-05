import { defineNuxtConfig } from "nuxt/config";

import { CUSTOM_HEAD } from "./src/content";

export default defineNuxtConfig({
  app: {
    head: CUSTOM_HEAD,
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  build: {
    transpile: ["vuetify"],
  },
  components: [
    {
      path: "~/components",
      extensions: [".vue"],
    },
  ],
  css: ["@/assets/styles/index.scss", "vuetify/lib/styles/main.sass", "vuetify/styles"],
  experimental: {
    payloadExtraction: false,
  },
  modules: ["nuxt-simple-sitemap"],
  nitro: {
    minify: true,
    prerender: {
      crawlLinks: true,
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_WEBSITE_URL,
    },
  },
  srcDir: "src/",
  ssr: false,
  telemetry: false,
  typescript: {
    typeCheck: "build",
    shim: true,
  },
  vite: {
    build: {
      cssCodeSplit: true,
      manifest: true,
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
      noExternal: ["vuetify"],
    },
  },
  webpack: {
    filenames: {
      // @ts-ignore
      chunk: ({ isDev }: { isDev: boolean }) =>
        isDev ? "[name].js" : "[contenthash].js",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
});
