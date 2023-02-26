import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi-svg";

import { ColorName } from "@/types";

import { CustomTheme } from "./colors";
import { VuetifyComponents } from "./components";
import { VuetifyDefaults } from "./defaults";
import { VuetifyDirectives } from "./directives";
import { ICONS } from "./icons";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: VuetifyComponents,
    defaults: VuetifyDefaults,
    directives: VuetifyDirectives,
    display: {
      mobileBreakpoint: "sm",
      thresholds: {
        lg: 1264,
        md: 960,
        sm: 600,
        xl: 1904,
        xs: 0,
      },
    },
    icons: {
      defaultSet: "mdi",
      sets: {
        mdi,
      },
    },
    ssr: true,
    theme: {
      defaultTheme: "CustomTheme",
      themes: {
        CustomTheme,
      },
    },
  });

  nuxtApp.provide("ICON", ICONS);
  nuxtApp.provide("COLOR", ColorName);

  nuxtApp.vueApp.use(vuetify);
});
