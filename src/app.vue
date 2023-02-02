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
  position: fixed;
  width: 100%;
  height: calc(100vh - env(safe-area-inset-bottom));
  overflow-y: hidden;
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
