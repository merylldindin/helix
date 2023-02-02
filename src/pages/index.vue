<script setup lang="ts">
import BubblesAnimation from "@/assets/animations/hot-bubbles.json";
import { CustomImage } from "@/components";
import { CONTENT } from "@/content";
</script>

<template>
  <NuxtLayout name="default">
    <section class="section-wrapper">
      <div class="animation-wrapper">
        <client-only class="lottie-animation">
          <Vue3Lottie :width="'min(420px, 100%)'" :animation-data="BubblesAnimation" />
        </client-only>

        <v-avatar class="avatar custom-shadow">
          <CustomImage :image="CONTENT.root.avatar" />
        </v-avatar>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.section-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
}

.avatar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: fit-content;
  width: min(25rem, calc(100% - 32px));
}

.animation-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lottie-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
