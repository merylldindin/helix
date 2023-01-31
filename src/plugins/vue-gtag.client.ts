import VueGtag, { trackRouter } from "vue-gtag-next";

import { defineNuxtPlugin, useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-YJHQMGJVMX",
    },
  });

  trackRouter(useRouter());
});
