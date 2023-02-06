import { defineNuxtConfig } from "nuxt/config";

import { CUSTOM_HEAD } from "./src/content";

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
  sourcemap: {
    client: true,
    server: true,
  },
  srcDir: "src/",
  ssr: false,
  telemetry: false,
  typescript: {
    shim: true,
    typeCheck: "build",
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
    cssSourceMap: true,
    filenames: {
      // @ts-ignore
      chunk: ({ isDev }: { isDev: boolean }) =>
        isDev ? "[name].js" : "[id].[contenthash].js",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
});
