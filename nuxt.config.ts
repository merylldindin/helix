export default defineNuxtConfig({
  experimental: {
    payloadExtraction: false,
  },
  modules: ["@nuxt/ui"],
  srcDir: "src/",
  ssr: false,
  telemetry: false,
  typescript: {
    typeCheck: true,
    shim: false,
  },
});
