<script lang="ts" setup>
import { useHead } from "@unhead/vue";

import { CookieBanner, HomeButton } from "@/components";
import { CUSTOM_HEAD } from "@/content";

import "vue3-lottie/dist/style.css";

useHead(CUSTOM_HEAD, { mode: "client" });
</script>

<template>
  <v-app class="application-background">
    <HomeButton />

    <NuxtLoadingIndicator :color="$COLOR.LEMON" />

    <NuxtPage />

    <CookieBanner />
  </v-app>
</template>

<style lang="scss" scoped>
.application-background {
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
