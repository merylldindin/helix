import { defineNuxtRouteMiddleware } from "#app";
import { ROUTES_CONTENT } from "@/utils/routes";

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path as keyof typeof ROUTES_CONTENT;

  if (path in ROUTES_CONTENT) {
    to.meta.layout = ROUTES_CONTENT[path].layout;
  } else {
    to.meta.layout = "default";
  }
});
