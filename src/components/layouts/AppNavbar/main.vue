<script lang="ts" setup>
import { AnimatedAvatar, PageBreadcrumb, WebsiteTitle } from "./components";
</script>

<template>
  <div class="global-navbar">
    <AnimatedAvatar />

    <WebsiteTitle />

    <PageBreadcrumb />
  </div>
</template>

<style lang="scss" scoped>
.global-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 8rem;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease-in-out;
  backdrop-filter: blur(2px);

  @include sm-down {
    height: 6rem;
  }
}
</style>
