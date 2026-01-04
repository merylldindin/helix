import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Vue3Lottie", {
    render: () => null,
  });
});
