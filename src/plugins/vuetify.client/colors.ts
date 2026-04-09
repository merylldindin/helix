import type { ThemeDefinition } from "vuetify";

import { ColorName } from "@/types";

export const HelixLightTheme: ThemeDefinition = {
  colors: {
    [ColorName.BACKGROUND]: "#F5FEFE",
    [ColorName.ERROR]: "#F6F609",
    [ColorName.FOAM]: "#F5FEFE",
    [ColorName.INFO]: "#F6F609",
    [ColorName.LEMON]: "#F6F609",
    [ColorName.PRIMARY]: "#040707",
    [ColorName.SECONDARY]: "#040707",
    [ColorName.SLATE_GRAY]: "#040707",
    [ColorName.SUCCESS]: "#F6F609",
    [ColorName.SURFACE]: "#F5FEFE",
    [ColorName.WARNING]: "#F6F609",
    "on-surface-variant": "#314040",
    "primary-darken-1": "#040707",
    "secondary-darken-1": "#040707",
    "surface-bright": "#FCFFFF",
    "surface-light": "#F8FFFF",
    "surface-variant": "#DDE9E9",
  },
  dark: false,
};

export const HelixDarkTheme: ThemeDefinition = {
  colors: {
    [ColorName.BACKGROUND]: "#000000",
    [ColorName.ERROR]: "#F6F609",
    [ColorName.FOAM]: "#F5FEFE",
    [ColorName.INFO]: "#F6F609",
    [ColorName.LEMON]: "#F6F609",
    [ColorName.PRIMARY]: "#F5FEFE",
    [ColorName.SECONDARY]: "#F5FEFE",
    [ColorName.SLATE_GRAY]: "#040707",
    [ColorName.SUCCESS]: "#F6F609",
    [ColorName.SURFACE]: "#0E1414",
    [ColorName.WARNING]: "#F6F609",
    "on-surface-variant": "#E0ECEC",
    "primary-darken-1": "#D9E1E1",
    "secondary-darken-1": "#D9E1E1",
    "surface-bright": "#151C1C",
    "surface-light": "#101717",
    "surface-variant": "#243030",
  },
  dark: true,
};
