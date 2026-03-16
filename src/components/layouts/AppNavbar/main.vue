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
    --navbar-action-gap: 1.2rem;
    --navbar-avatar-size: 4rem;
    --navbar-toggle-hit-width: 76px;
    --navbar-toggle-hit-height: 44px;
    --navbar-toggle-track-width: 68px;
    --navbar-toggle-track-height: 36px;
    --navbar-toggle-thumb-size: 26px;
    --navbar-toggle-thumb-offset: 4px;
    --navbar-toggle-icon-size: 16px;

    position: absolute;
    top: 50%;
    right: 4rem;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: var(--navbar-action-gap);
    transform: translateY(-50%);

    @include xs-only {
      --navbar-action-gap: 0.8rem;
      --navbar-avatar-size: 3rem;
      --navbar-toggle-hit-width: 52px;
      --navbar-toggle-track-width: 44px;
      --navbar-toggle-track-height: 24px;
      --navbar-toggle-thumb-size: 18px;
      --navbar-toggle-thumb-offset: 3px;
      --navbar-toggle-icon-size: 12px;

      right: 1.2rem;
    }
  }
}
</style>
