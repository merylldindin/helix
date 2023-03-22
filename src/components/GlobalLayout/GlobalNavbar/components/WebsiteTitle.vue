<script lang="ts" setup>
import { CustomHeadline } from "@/components/shared";
import { LAYOUT_CONTENT } from "@/content";
</script>

<template>
  <nuxt-link to="/">
    <CustomHeadline
      class="website-title"
      :level="1"
      :text="LAYOUT_CONTENT.websiteTitle.headline"
      typography="text-foam headline-3 text-cartesian"
    />
  </nuxt-link>
</template>

<style lang="scss" scoped>
.website-title {
  position: absolute;
  top: 1.6rem;
  left: 4rem;
  transition: all 0.3s ease-in-out;
  z-index: 2;

  @include sm-down {
    top: 1.6rem;
    left: 1.6rem;
  }
}
</style>
