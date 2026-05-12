export const ComponentName = {
  ARTICLE_SECTION: "ARTICLE_SECTION",
  FRAME_SECTION: "FRAME_SECTION",
  IMAGE_SECTION: "IMAGE_SECTION",
  LEGAL_SECTION: "LEGAL_SECTION",
  LINKS_SECTION: "LINKS_SECTION",
  ROTATING_CUBE: "ROTATING_CUBE",
  TIMELINE_SECTION: "TIMELINE_SECTION",
} as const;

export type ComponentName = (typeof ComponentName)[keyof typeof ComponentName];
