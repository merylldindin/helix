import LegalText from "./components/LegalText.vue";
import RotatingCube from "./components/RotatingCube/main.vue";
import SectionImage from "./components/SectionImage.vue";
import ThumbsGallery from "./components/ThumbsGallery/main.vue";

enum ComponentName {
  LEGAL_TEXT = "LEGAL_TEXT",
  ROTATING_CUBE = "ROTATING_CUBE",
  SECTION_IMAGE = "SECTION_IMAGE",
  THUMBS_GALLERY = "THUMBS_GALLERY",
}

export const ASYNC_COMPONENTS: Record<string, any> = {
  [ComponentName.LEGAL_TEXT]: LegalText,
  [ComponentName.ROTATING_CUBE]: RotatingCube,
  [ComponentName.SECTION_IMAGE]: SectionImage,
  [ComponentName.THUMBS_GALLERY]: ThumbsGallery,
};
