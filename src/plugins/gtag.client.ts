import VueGtag from "vue-gtag-next";

import { Environment } from "@/types";

import { defineNuxtPlugin, useRouter, useRuntimeConfig } from "#app";

declare global {
  interface Window {
    gtag?: (...arguments_: unknown[]) => void;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const { environment } = useRuntimeConfig().public;

  if (environment === Environment.DEVELOPMENT) {
    return;
  }

  const initGA = () => {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: "G-YJHQMGJVMX",
      },
    });

    const router = useRouter();

    router.afterEach((to) => {
      setTimeout(() => {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "page_view", {
            page_location: window.location.href,
            page_path: to.fullPath,
            page_title: document.title,
          });
        }
      }, 100);
    });
  };

  if (typeof window !== "undefined") {
    setTimeout(initGA, 3000);
  }
});
