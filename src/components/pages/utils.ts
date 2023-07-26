import { ComponentName } from "@/types";

import ArticleSection from "./components/ArticleSection.vue";
import FrameSection from "./components/FrameSection.vue";
import ImageSection from "./components/ImageSection.vue";
import LegalSection from "./components/LegalSection.vue";
import RotatingCube from "./components/RotatingCube/main.vue";
import TimelineSection from "./components/TimelineSection/main.vue";

export const ASYNC_COMPONENTS: Record<string, any> = {
  [ComponentName.ARTICLE_SECTION]: ArticleSection,
  [ComponentName.FRAME_SECTION]: FrameSection,
  [ComponentName.IMAGE_SECTION]: ImageSection,
  [ComponentName.LEGAL_SECTION]: LegalSection,
  [ComponentName.ROTATING_CUBE]: RotatingCube,
  [ComponentName.TIMELINE_SECTION]: TimelineSection,
};
