import type { RouterConfig } from "@nuxt/schema";

const CustomRouterConfig: RouterConfig = {
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true,
};

export default CustomRouterConfig;
