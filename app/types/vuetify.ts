export const ColorName = {
  BACKGROUND: "background",
  ERROR: "error",
  FOAM: "foam",
  INFO: "info",
  LEMON: "lemon",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SLATE_GRAY: "slate-gray",
  SUCCESS: "success",
  SURFACE: "surface",
  WARNING: "warning",
} as const;

export type ColorName = (typeof ColorName)[keyof typeof ColorName];

export const IconName = {
  AT: "AT",
  BOOKSHELF: "BOOKSHELF",
  BRAIN: "BRAIN",
  CAMERA: "CAMERA",
  COMPASS_OUTLINE: "COMPASS_OUTLINE",
  COOKIE_CHECK: "COOKIE_CHECK",
  DNA: "DNA",
  EMAIL_NEWSLETTER: "EMAIL_NEWSLETTER",
  FACEBOOK: "FACEBOOK",
  FACTORY: "FACTORY",
  FIRE: "FIRE",
  FOOD_CROISSANT: "FOOD_CROISSANT",
  GITHUB: "GITHUB",
  HEART_PULSE: "HEART_PULSE",
  INSTAGRAM: "INSTAGRAM",
  LINKEDIN: "LINKEDIN",
  NOTEBOOK: "NOTEBOOK",
  PODCAST: "PODCAST",
  SCHOOL: "SCHOOL",
  SILVERWARE_FORK_KNIFE: "SILVERWARE_FORK_KNIFE",
  TOOLS: "TOOLS",
  TWITTER: "TWITTER",
  WEB: "WEB",
  YOUTUBE: "YOUTUBE",
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];
