<script lang="ts" setup>
import { DEFAULT_IDENTITY } from "@/content";

import { clearError } from "#app";
import { definePerson, defineWebSite, useSchemaOrg } from "#imports";

useSchemaOrg([definePerson(DEFAULT_IDENTITY), defineWebSite()]);
</script>

<template>
  <NuxtErrorBoundary @error="clearError">
    <client-only>
      <v-app class="application-background">
        <NuxtPage />
      </v-app>
    </client-only>
  </NuxtErrorBoundary>
</template>

<style lang="scss" scoped>
.application-background {
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
