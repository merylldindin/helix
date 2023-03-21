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
    <CustomSection class="hero-section" fullscreen snap>
      <template #background>
        <CustomImage
          class="hero-background"
          cover
          :image="PAGE_CONTENT.landingPage.background"
        />

        <div class="hero-overlay" />
      </template>

      <template #default>
        <HeroProfiles />
      </template>
    </CustomSection>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.hero-background {
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(0 0 0 / 33%);
  z-index: 1;
}
</style>
