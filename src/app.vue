<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { provide } from "vue";

import { CookieBanner, HomeButton } from "@/components";
import { ColorName } from "@/plugins/vuetify.client/colors";
import { CustomIcons } from "@/plugins/vuetify.client/icons";

import { CUSTOM_HEAD } from "./content";

import "vue3-lottie/dist/style.css";

provide("ColorName", ColorName);
provide("CustomIcons", CustomIcons);

useHead(CUSTOM_HEAD, { mode: "client" });
</script>

<template>
  <v-app class="application-background">
    <HomeButton />

    <NuxtPage />

    <CookieBanner />
  </v-app>
</template>

<style lang="scss" scoped>
.application-background {
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
