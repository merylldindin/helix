<script setup lang="ts">
import { RotatingCube } from "@/components";
import { CustomImage, CustomSection } from "@/components/shared";
import { PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

import { defineWebPage, useSchemaOrg, useSeoMeta } from "#imports";

useSeoMeta(extractHead(PAGE_CONTENT.landingPage.head));

useSchemaOrg(defineWebPage());
</script>

<template>
  <NuxtLayout name="snaped">
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
        <div class="hero-cube">
          <RotatingCube />
        </div>
      </template>
    </CustomSection>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.hero-background {
  z-index: 0;
  position: absolute;

  @include sm-down {
    height: 100vh;
  }
}

.hero-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(0 0 0 / 33%);
  z-index: 1;
}

.hero-cube {
  display: flex;
  height: 100%;
  padding: 8rem 4rem;

  @include sm-down {
    padding: 2rem 0 0;
  }
}
</style>
