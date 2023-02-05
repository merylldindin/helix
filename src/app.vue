<script lang="ts" setup>
import { CookieBanner, HomeButton } from "@/components";

import "vue3-lottie/dist/style.css";
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
