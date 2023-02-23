<script lang="ts" setup>
import { CookieBanner, HomeButton } from "@/components";
import { DEFAULT_IDENTITY } from "@/content";

import { clearError } from "#app";
import { definePerson, defineWebSite, useSchemaOrg } from "#imports";

useSchemaOrg([definePerson(DEFAULT_IDENTITY), defineWebSite()]);
</script>

<template>
  <client-only>
    <NuxtErrorBoundary @error="clearError">
      <v-app class="application-background">
        <HomeButton />

        <NuxtPage />

        <CookieBanner />
      </v-app>
    </NuxtErrorBoundary>
  </client-only>
</template>

<style lang="scss" scoped>
.application-background {
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
