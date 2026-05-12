<script setup lang="ts">
import { ANIMATED_AVATAR_CONTENT } from "@/content";
</script>

<template>
  <NuxtLink to="/">
    <div class="animation-wrapper">
      <v-avatar class="animation-wrapper__avatar custom-shadow">
        <img
          :alt="ANIMATED_AVATAR_CONTENT.altText"
          class="animation-wrapper__image"
          :src="ANIMATED_AVATAR_CONTENT.source"
        />
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

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
