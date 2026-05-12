<script lang="ts" setup>
import { CookieBanner } from "@/components/layouts";
import { CUSTOM_HEAD, DEFAULT_SCHEMA, WEBSITE_SCHEMA } from "@/content";

import { clearError, useHead } from "#app";
import { useJsonld } from "#jsonld";

useJsonld(
  // @ts-ignore
  DEFAULT_SCHEMA
);

useJsonld(
  // @ts-ignore
  WEBSITE_SCHEMA
);

useHead(CUSTOM_HEAD);
</script>

<template>
  <NuxtErrorBoundary @error="clearError">
    <v-app class="application-background">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <!-- BANNERS -->

      <CookieBanner />
    </v-app>
  </NuxtErrorBoundary>
</template>

<style lang="scss" scoped>
.application-background {
  background-color: rgb(var(--v-theme-background));
}
</style>
