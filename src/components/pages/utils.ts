import LegalText from "./components/LegalText.vue";
import RotatingCube from "./components/RotatingCube/main.vue";
import ThumbsGallery from "./components/ThumbsGallery/main.vue";

enum ComponentName {
  LEGAL_TEXT = "LEGAL_TEXT",
  ROTATING_CUBE = "ROTATING_CUBE",
  THUMBS_GALLERY = "THUMBS_GALLERY",
}

export const ASYNC_COMPONENTS: Record<string, any> = {
  [ComponentName.LEGAL_TEXT]: LegalText,
  [ComponentName.ROTATING_CUBE]: RotatingCube,
  [ComponentName.THUMBS_GALLERY]: ThumbsGallery,
};
