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
  modules: ["@nuxt/ui"],
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
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/assets/styles/mixins.scss' as *;",
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
    extractCSS: true,
    filenames: {
      // @ts-ignore
      chunk: ({ isDev }) => (isDev ? "[name].js" : "[id].[contenthash].js"),
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    terser: true,
  },
});
