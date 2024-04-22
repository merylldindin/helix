import type { ThemeDefinition } from "vuetify";

import { ColorName } from "@/types";

export const CustomTheme: ThemeDefinition = {
  colors: {
    [ColorName.BACKGROUND]: "#F5FEFE",
    [ColorName.SURFACE]: "#F5FEFE",
    [ColorName.PRIMARY]: "#040707",
    [ColorName.SECONDARY]: "#040707",
    [ColorName.ERROR]: "#F6F609",
    [ColorName.INFO]: "#F6F609",
    [ColorName.SUCCESS]: "#F6F609",
    [ColorName.WARNING]: "#F6F609",
    [ColorName.FOAM]: "#F5FEFE",
    [ColorName.LEMON]: "#F6F609",
    [ColorName.SLATE_GRAY]: "#040707",
  },
  dark: false,
};
