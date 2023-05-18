import LegalText from "./components/LegalText.vue";
import RotatingCube from "./components/RotatingCube/main.vue";

enum ComponentName {
  LEGAL_TEXT = "LEGAL_TEXT",
  ROTATING_CUBE = "ROTATING_CUBE",
}

export const ASYNC_COMPONENTS: Record<string, any> = {
  [ComponentName.LEGAL_TEXT]: LegalText,
  [ComponentName.ROTATING_CUBE]: RotatingCube,
};
