import type { RouterConfig } from "@nuxt/schema";

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
  strict: false,
} satisfies RouterConfig;
