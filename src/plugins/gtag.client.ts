import { createGtag } from "vue-gtag";

import { Environment } from "@/types";

import { defineNuxtPlugin, useRouter, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { environment } = useRuntimeConfig().public;

  if (environment === Environment.DEVELOPMENT) {
    return;
  }

  const router = useRouter();

  nuxtApp.vueApp.use(
    createGtag({
      pageTracker: {
        router,
        sendPageView: true,
        useRouteFullPath: true,
      },
      tagId: "G-YJHQMGJVMX",
    })
  );
});
