import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import { COLOR, CustomTheme } from "./colors";
import { VuetifyComponents } from "./components";
import { VuetifyDefaults } from "./defaults";
import { VuetifyDirectives } from "./directives";
import { ICON } from "./icons";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: VuetifyComponents,
    defaults: VuetifyDefaults,
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

  nuxtApp.provide("ICON", ICON);
  nuxtApp.provide("COLOR", COLOR);

  nuxtApp.vueApp.use(vuetify);
});
