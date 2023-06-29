import { ComponentName } from "@/types";

import HeaderArticle from "./components/HeaderArticle.vue";
import LegalText from "./components/LegalText.vue";
import RotatingCube from "./components/RotatingCube/main.vue";
import SectionImage from "./components/SectionImage.vue";
import ThumbsGallery from "./components/ThumbsGallery/main.vue";

export const ASYNC_COMPONENTS: Record<string, any> = {
  [ComponentName.HEADER_ARTICLE]: HeaderArticle,
  [ComponentName.LEGAL_TEXT]: LegalText,
  [ComponentName.ROTATING_CUBE]: RotatingCube,
  [ComponentName.SECTION_IMAGE]: SectionImage,
  [ComponentName.THUMBS_GALLERY]: ThumbsGallery,
};
