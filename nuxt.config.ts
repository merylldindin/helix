import { defineNuxtConfig } from "nuxt/config";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  css: ["vuetify/lib/styles/main.sass", "vuetify/styles"],
  experimental: {
    payloadExtraction: false,
  },
  modules: [
    "@nuxt/ui",
    async (_, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
  ],
  srcDir: "src/",
  ssr: false,
  telemetry: false,
  typescript: {
    typeCheck: true,
    shim: true,
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    ssr: {
      noExternal: ["vuetify"],
    },
  },
});
