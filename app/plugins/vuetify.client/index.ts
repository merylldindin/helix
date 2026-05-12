import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi-svg";

import { ColorName } from "@/types";

import { HelixDarkTheme, HelixLightTheme } from "./colors";
import { VuetifyComponents } from "./components";
import { VuetifyDefaults } from "./defaults";
import { ICONS } from "./icons";
import { DARK_THEME_NAME, LIGHT_THEME_NAME, syncBrowserTheme } from "./theme";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: VuetifyComponents,
    defaults: VuetifyDefaults,
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
      defaultTheme: LIGHT_THEME_NAME,
      themes: {
        [DARK_THEME_NAME]: HelixDarkTheme,
        [LIGHT_THEME_NAME]: HelixLightTheme,
      },
    },
  });

  syncBrowserTheme(LIGHT_THEME_NAME);

  nuxtApp.provide("ICON", ICONS);
  nuxtApp.provide("COLOR", ColorName);

  nuxtApp.vueApp.use(vuetify);
});
