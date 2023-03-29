<script setup lang="ts">
import { useDisplay } from "vuetify";

import HotBubbles from "@/assets/animations/hot-bubbles.json";
import { CustomImage } from "@/components/shared";
import { LAYOUT_CONTENT } from "@/content";

const { smAndDown } = useDisplay();
</script>

<template>
  <client-only>
    <NuxtLink to="/">
      <div class="animation-wrapper">
        <div class="animation">
          <Vue3Lottie
            :animation-data="HotBubbles"
            :width="smAndDown ? '5.5rem' : '8rem'"
          />
        </div>

        <v-avatar class="avatar custom-shadow" :size="smAndDown ? '3rem' : '4.5rem'">
          <CustomImage :image="LAYOUT_CONTENT.animatedAvatar" />
        </v-avatar>
      </div>
    </NuxtLink>
  </client-only>
</template>

<style lang="scss" scoped>
.animation-wrapper {
  position: fixed;
  top: 1.8rem;
  right: 4rem;
  width: 4.5rem;
  height: 4.5rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease-in-out;

  @include sm-down {
    top: 2rem;
    right: 2.5rem;
    width: 2rem;
    height: 2rem;
  }
}

.avatar {
  position: absolute;
  inset: 0;
  margin: auto;
  height: fit-content;
  z-index: 1;
}

.animation {
  position: absolute;
  top: -0.5rem;
  right: -1.8rem;
  z-index: 1;

  @include sm-down {
    top: -1rem;
    right: -2.3rem;
  }
}
</style>
