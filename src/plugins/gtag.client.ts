import VueGtag, { trackRouter } from "vue-gtag-next";

import { Environment } from "@/types";

import { defineNuxtPlugin, useRouter, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const { environment } = useRuntimeConfig().public;

  if (environment === Environment.DEVELOPMENT) {
    return;
  }

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-YJHQMGJVMX",
      params: {
        send_page_view: false,
      },
    },
  });

  trackRouter(useRouter(), {
    template: (to) => ({
      page_path: to.path,
      page_title: document.title,
    }),
  });
});
