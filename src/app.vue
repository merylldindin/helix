<script lang="ts" setup>
import { provide } from "vue";

import { CookieBanner } from "@/components";
import { ColorName } from "@/plugins/vuetify.client/colors";
import { CustomIcons } from "@/plugins/vuetify.client/icons";

import "vue3-lottie/dist/style.css";

provide("COLOR", ColorName);
provide("ICON", CustomIcons);
</script>

<template>
  <div id="app">
    <v-app class="application-wrapper">
      <NuxtPage />

      <CookieBanner />
    </v-app>
  </div>
</template>

<style lang="scss" scoped>
.application-wrapper {
  background-color: rgb(var(--v-theme-mine-shaft));
  color: rgb(var(--v-theme-foam));
}
</style>
