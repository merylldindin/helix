import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  experimental: {
    payloadExtraction: false,
  },
  modules: ["@nuxt/ui"],
  srcDir: "src/",
  ssr: false,
  telemetry: false,
  typescript: {
    typeCheck: true,
    shim: true,
  },
});
