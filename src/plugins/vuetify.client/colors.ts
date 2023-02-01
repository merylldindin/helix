import { ThemeDefinition } from "vuetify";

export enum ColorName {
  BACKGROUND = "background",
  SURFACE = "surface",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  FOAM = "foam",
  LEMON = "lemon",
  MINE_SHAFT = "mine-shaft",
}

export const CustomTheme: ThemeDefinition = {
  dark: false,
  colors: {
    [ColorName.BACKGROUND]: "#F5FEFE",
    [ColorName.SURFACE]: "#F5FEFE",
    [ColorName.PRIMARY]: "#242424",
    [ColorName.SECONDARY]: "#242424",
    [ColorName.ERROR]: "#F6F609",
    [ColorName.INFO]: "#F6F609",
    [ColorName.SUCCESS]: "#F6F609",
    [ColorName.WARNING]: "#F6F609",
    [ColorName.FOAM]: "#F5FEFE",
    [ColorName.LEMON]: "#F6F609",
    [ColorName.MINE_SHAFT]: "#242424",
  },
};
