<script lang="ts" setup>
import { CookieBanner } from "@/components";
import { DEFAULT_IDENTITY } from "@/content";

import { clearError } from "#app";
import { definePerson, defineWebSite, useSchemaOrg } from "#imports";

useSchemaOrg([definePerson(DEFAULT_IDENTITY), defineWebSite()]);
</script>

<template>
  <NuxtErrorBoundary @error="clearError">
    <v-app class="application-background">
      <NuxtPage />

      <CookieBanner />
    </v-app>
  </NuxtErrorBoundary>
</template>

<style lang="scss" scoped>
.application-background {
  background-color: rgb(var(--v-theme-slate-gray));
}
</style>
