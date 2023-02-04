import type { RouterConfig } from "@nuxt/schema";
import { createWebHistory } from "vue-router";

const CustomRouterConfig: RouterConfig = {
  history: createWebHistory,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true,
};

export default CustomRouterConfig;
