<script lang="ts" setup>
import { CookieBanner } from "@/components/layouts";
import { DEFAULT_IDENTITY } from "@/content";

import { clearError } from "#app";
import { definePerson, defineWebPage, defineWebSite, useSchemaOrg } from "#imports";

useSchemaOrg([definePerson(DEFAULT_IDENTITY), defineWebSite(), defineWebPage()]);
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
