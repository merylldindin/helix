import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/" && to.path.endsWith("/")) {
    const { path, query, hash } = to;

    const nextPath = path.replace(/\/+$/, "") || "/";

    const nextRoute = {
      hash,
      path: nextPath,
      query,
    };

    navigateTo(nextRoute);
  }
});
