<script setup lang="ts">
import { CustomImage } from "@/components/shared";
import { ANIMATED_AVATAR_CONTENT } from "@/content";
</script>

<template>
  <NuxtLink to="/">
    <div class="animation-wrapper">
      <v-avatar class="animation-wrapper__avatar custom-shadow">
        <CustomImage :follow-theme="false" :image="ANIMATED_AVATAR_CONTENT" />
      </v-avatar>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.animation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease-in-out;

  &__avatar {
    width: var(--navbar-avatar-size, 4rem);
    height: var(--navbar-avatar-size, 4rem);
  }
}
</style>
