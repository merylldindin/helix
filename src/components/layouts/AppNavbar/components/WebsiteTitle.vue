<script lang="ts" setup>
import { CustomHeadline } from "@/components/shared";
import { WEBSITE_TITLE_CONTENT } from "@/content";
</script>

<template>
  <nuxt-link to="/">
    <CustomHeadline
      class="website-title"
      :level="1"
      :text="WEBSITE_TITLE_CONTENT.headline"
      typography="headline-4 text-slate-gray"
    />
  </nuxt-link>
</template>

<style lang="scss" scoped>
.website-title {
  position: absolute;
  top: 1.8rem;
  left: 4rem;
  transition: all 0.3s ease-in-out;
  z-index: 2;

  @include sm-down {
    top: 1.6rem;
    left: 1.6rem;
  }
}
</style>
