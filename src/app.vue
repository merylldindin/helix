<script lang="ts" setup>
import { CookieBanner, HomeButton } from "@/components";

import { clearError } from "#app";
</script>

<template>
  <NuxtErrorBoundary @error="clearError">
    <v-app class="application-background">
      <HomeButton />

      <NuxtPage />

      <CookieBanner />
    </v-app>
  </NuxtErrorBoundary>
</template>

<style lang="scss" scoped>
.application-background {
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
