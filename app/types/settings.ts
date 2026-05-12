export const Environment = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
} as const;

export type Environment = (typeof Environment)[keyof typeof Environment];
