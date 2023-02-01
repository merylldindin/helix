import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import { CustomTheme } from "./colors";
import { VuetifyComponents } from "./components";
import { VuetifyDirectives } from "./directives";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: VuetifyComponents,
    directives: VuetifyDirectives,
    display: {
      mobileBreakpoint: "sm",
      thresholds: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1264,
        xl: 1904,
      },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: "CustomTheme",
      themes: {
        CustomTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
