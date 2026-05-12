import type { Component } from "vue";
import { defineAsyncComponent } from "vue";

import { ComponentName } from "@/types";

export const ASYNC_COMPONENTS: Record<string, Component> = {
  [ComponentName.ARTICLE_SECTION]: defineAsyncComponent(
    () => import("./components/ArticleSection.vue")
  ),
  [ComponentName.FRAME_SECTION]: defineAsyncComponent(
    () => import("./components/FrameSection.vue")
  ),
  [ComponentName.IMAGE_SECTION]: defineAsyncComponent(
    () => import("./components/ImageSection.vue")
  ),
  [ComponentName.LEGAL_SECTION]: defineAsyncComponent(
    () => import("./components/LegalSection.vue")
  ),
  [ComponentName.LINKS_SECTION]: defineAsyncComponent(
    () => import("./components/LinksSection.vue")
  ),
  [ComponentName.ROTATING_CUBE]: defineAsyncComponent(
    () => import("./components/RotatingCube/main.vue")
  ),
  [ComponentName.TIMELINE_SECTION]: defineAsyncComponent(
    () => import("./components/TimelineSection/main.vue")
  ),
};
