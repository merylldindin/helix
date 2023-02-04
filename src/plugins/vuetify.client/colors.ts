import { ThemeDefinition } from "vuetify";

export enum COLOR {
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
    [COLOR.BACKGROUND]: "#F5FEFE",
    [COLOR.SURFACE]: "#F5FEFE",
    [COLOR.PRIMARY]: "#242424",
    [COLOR.SECONDARY]: "#242424",
    [COLOR.ERROR]: "#F6F609",
    [COLOR.INFO]: "#F6F609",
    [COLOR.SUCCESS]: "#F6F609",
    [COLOR.WARNING]: "#F6F609",
    [COLOR.FOAM]: "#F5FEFE",
    [COLOR.LEMON]: "#F6F609",
    [COLOR.MINE_SHAFT]: "#242424",
  },
};
