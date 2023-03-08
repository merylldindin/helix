<script setup lang="ts">
import { HeroProfiles } from "@/components";
import { CustomImage, CustomSection } from "@/components/shared";
import { PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

import { defineWebPage, useSchemaOrg, useSeoMeta } from "#imports";

useSeoMeta(extractHead(PAGE_CONTENT.landingPage.head));

useSchemaOrg(defineWebPage());
</script>

<template>
  <NuxtLayout name="global">
    <CustomImage
      class="hero-background full-screen"
      cover
      :image="PAGE_CONTENT.landingPage.background"
    />

    <div class="hero-overlay full-screen" />

    <CustomSection class="hero-section full-screen">
      <v-scale-transition> <HeroProfiles /> </v-scale-transition>
    </CustomSection>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.full-screen {
  width: 100vw;
  height: 100vh;

  @include sm-down {
    height: calc(100vh - $browser-navbar-offset);
  }
}

.hero-section {
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1px);
  background-color: rgb(0 0 0 / 15%);
  z-index: 1;
}
</style>
