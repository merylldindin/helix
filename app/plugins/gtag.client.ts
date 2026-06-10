import { createGtag, pageview } from "vue-gtag";

import { Environment } from "@/types";

import { defineNuxtPlugin, useRouter, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { environment } = useRuntimeConfig().public;

  if (environment === Environment.DEVELOPMENT) {
    return;
  }

  nuxtApp.vueApp.use(createGtag({ tagId: "G-YJHQMGJVMX" }));

  const router = useRouter();

  router.afterEach((to) => {
    setTimeout(() => {
      pageview({ page_path: to.fullPath, page_title: document.title });
    }, 100);
  });
});
