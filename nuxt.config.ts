import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import UnheadVite from "@unhead/addons/vite";
import { defineNuxtConfig } from "nuxt/config";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "./src/content";
import { RoutePath } from "./src/types/routes";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },

  compatibilityDate: "2026-05-10",

  components: [
    {
      extensions: [".vue"],
      path: "~/components",
    },
  ],

  css: ["@/assets/styles/index.scss", "@/assets/styles/vuetify.scss"],

  dir: {
    public: "src/public",
  },

  experimental: {
    payloadExtraction: "client",
    sharedPrerenderData: true,
  },

  hooks: {
    // @ts-expect-error mdream:llms-txt hook type is generated at build time
    "mdream:llms-txt": (payload: { content: string; fullContent: string }) => {
      const publicDir = resolve(__dirname, "src/public");
      payload.content = readFileSync(resolve(publicDir, "llms.txt"), "utf-8");
      payload.fullContent = readFileSync(
        resolve(publicDir, "llms-full.txt"),
        "utf-8",
      );
    },
  },

  // @ts-ignore-next-line
  linkChecker: {
    skipInspections: [
      "link-text",
      "no-baseless",
      "no-error-response",
      "trailing-slash",
    ],
  },

  modules: [
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxtjs/sitemap",
    "nuxt-jsonld",
    "nuxt-link-checker",
    "nuxt-swiper",
    "@mdream/nuxt",
  ],

  nitro: {
    minify: true,
    rollupConfig: {
      onLog(level: string, log: { code?: string; message?: string }, handler: (level: string, log: { code?: string; message?: string }) => void) {
        if (log.code === "CIRCULAR_DEPENDENCY" && log.message?.includes("nitropack/dist/runtime")) return;
        handler(level, log);
      },
    },
    prerender: {
      crawlLinks: true,
      routes: Object.values(RoutePath),
    },
  },

  plugins: ["@/plugins/vuetify.client/index.ts"],

  postcss: {
    plugins: {
      cssnano: { preset: "default" },
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
    },
  },

  site: {
    trailingSlash: true,
    url: process.env.NUXT_WEBSITE_URL,
  },

  sitemap: {
    defaults: {
      changefreq: "yearly",
      lastmod: new Date().toISOString(),
      priority: 0.6,
    },
    urls: [
      { changefreq: "monthly", loc: RoutePath.LANDING_PAGE, priority: 1.0 },
      { changefreq: "monthly", loc: RoutePath.VENTURES, priority: 0.8 },
      { changefreq: "monthly", loc: RoutePath.THOUGHTS, priority: 0.8 },
      { changefreq: "monthly", loc: RoutePath.SUGGESTIONS, priority: 0.8 },
      { changefreq: "yearly", loc: RoutePath.MISSIONS, priority: 0.7 },
      { changefreq: "yearly", loc: RoutePath.MENTIONS, priority: 0.5 },
      { changefreq: "yearly", loc: RoutePath.PRIVACY_POLICY, priority: 0.3 },
      { changefreq: "yearly", loc: RoutePath.TERMS_OF_USE, priority: 0.3 },
    ],
    zeroRuntime: true,
  },

  sourcemap: {
    client: false,
    server: false,
  },

  srcDir: "src/",
  ssr: true,
  telemetry: false,

  typescript: {
    shim: false,
    typeCheck: false,
  },

  vite: {
    build: {
      // Vuetify 4 emits nested @layer blocks that trigger esbuild CSS minify warnings.
      // PostCSS/cssnano still runs, so disabling the extra Vite CSS minify pass avoids the warnings
      // without changing Vuetify's cascade semantics.
      cssMinify: false,
      cssCodeSplit: true,
      manifest: true,
      minify: true,
      modulePreload: { polyfill: false },
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === "EVAL" &&
            warning.id &&
            warning.id.includes("lottie-web")
          ) {
            return;
          }

          warn(warning);
        },
        output: {
          manualChunks: (id) => {
            if (id.includes("vue3-lottie")) return "lottie";
            if (id.includes("vuetify")) return "vuetify";
          },
        },
      },
    },

    css: {
      preprocessorOptions: {
        sass: {
          silenceDeprecations: ["legacy-js-api"],
        },
        scss: {
          additionalData: "@use '@/assets/variables/index.scss' as *;",
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },

    define: {
      "process.env.DEBUG": false,
    },

    optimizeDeps: {
      include: [
        "@mdi/js",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "vue-gtag",
        "vue3-lottie",
      ],
    },

    plugins: [UnheadVite()],
  },
});
