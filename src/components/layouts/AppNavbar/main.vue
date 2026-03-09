<script lang="ts" setup>
import { AnimatedAvatar, AppThemeToggle, BreadCrumbs } from "./components";
</script>

<template>
  <div class="global-navbar">
    <div class="global-navbar__actions">
      <AppThemeToggle />

      <AnimatedAvatar />
    </div>

    <BreadCrumbs />
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

  &__actions {
    position: absolute;
    top: 1.8rem;
    right: 4rem;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    @include xs-only {
      top: 1.2rem;
      right: 1.2rem;
      gap: 0.8rem;
    }
  }
}
</style>
