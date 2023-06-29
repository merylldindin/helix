<script lang="ts" setup>
import { CookieBanner } from "@/components/layouts";
import { DEFAULT_SCHEMA, WEBSITE_SCHEMA } from "@/content";

import { clearError } from "#app";
import { useJsonld } from "#jsonld";

useJsonld(
  // @ts-ignore
  DEFAULT_SCHEMA
);

useJsonld(
  // @ts-ignore
  WEBSITE_SCHEMA
);
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
