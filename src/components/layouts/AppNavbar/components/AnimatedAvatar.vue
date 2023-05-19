<script setup lang="ts">
import { useDisplay } from "vuetify";

import { CustomImage } from "@/components/shared";
import { ANIMATED_AVATAR_CONTENT } from "@/content";

const { smAndDown } = useDisplay();
</script>

<template>
  <client-only>
    <NuxtLink to="/">
      <div class="animation-wrapper">
        <v-avatar class="custom-shadow" :size="smAndDown ? '3rem' : '4rem'">
          <CustomImage :image="ANIMATED_AVATAR_CONTENT" />
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
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease-in-out;

  @include xs-only {
    top: 1.2rem;
    right: 1.2rem;
  }
}
</style>
