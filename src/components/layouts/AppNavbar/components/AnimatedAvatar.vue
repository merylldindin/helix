<script setup lang="ts">
import { useDisplay } from "vuetify";

import { CustomImage } from "@/components/shared";
import { ANIMATED_AVATAR_CONTENT } from "@/content";

const { smAndDown } = useDisplay();
</script>

<template>
  <NuxtLink to="/">
    <div class="animation-wrapper">
      <v-avatar class="custom-shadow" :size="smAndDown ? '3rem' : '4rem'">
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
}
</style>
