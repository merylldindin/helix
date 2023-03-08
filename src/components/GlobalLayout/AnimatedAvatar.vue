<script setup lang="ts">
import HotBubbles from "@/assets/animations/hot-bubbles.json";
import { CustomImage } from "@/components/shared";
import { LAYOUT_CONTENT } from "@/content";
</script>

<template>
  <NuxtLink to="/">
    <div class="animation-wrapper">
      <div class="animation">
        <client-only>
          <Vue3Lottie :animation-data="HotBubbles" :width="'7rem'" />
        </client-only>
      </div>

      <v-avatar class="avatar custom-shadow" :size="'4rem'">
        <CustomImage :image="LAYOUT_CONTENT.animatedAvatar" />
      </v-avatar>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.animation-wrapper {
  position: fixed;
  top: 3rem;
  right: 3rem;
  width: 4rem;
  height: 4rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease-in-out;
}

.avatar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: fit-content;
  z-index: 1;
}

.animation {
  position: absolute;
  top: -0.5rem;
  right: -1.5rem;
  z-index: 1;
}
</style>
