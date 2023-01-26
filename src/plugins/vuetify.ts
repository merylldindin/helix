import { defineNuxtPlugin } from "#app";
import { ThemeDefinition, createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases } from "vuetify/iconsets/mdi-svg";
import { mdi } from "vuetify/lib/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

enum CustomColor {
  FOAM = "foam",
  LEMON = "lemon",
  MINE_SHAFT = "mine-shaft",
  PRIMARY = "primary",
}

const CustomTheme: ThemeDefinition = {
  dark: false,
  colors: {
    [CustomColor.FOAM]: "#f5fefd",
    [CustomColor.LEMON]: "#f6f609",
    [CustomColor.MINE_SHAFT]: "#242424",
    [CustomColor.PRIMARY]: "#242424",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
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

  nuxtApp.vueApp.mixin({
    data() {
      return {
        Color: CustomColor,
      };
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
