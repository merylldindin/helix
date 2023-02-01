import { defineNuxtConfig } from "nuxt/config";

import { CUSTOM_HEAD } from "./src/content";

export default defineNuxtConfig({
  app: {
    head: CUSTOM_HEAD,
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
  css: ["vuetify/lib/styles/main.sass", "vuetify/styles"],
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
          additionalData: "@use '@/assets/styles/index.scss' as *;",
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
});
