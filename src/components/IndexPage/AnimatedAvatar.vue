<script setup lang="ts">
import { ref } from "vue";

import HotBubbles from "@/assets/animations/hot-bubbles.json";
import { CustomImage } from "@/components/shared";
import { PAGE_CONTENT } from "@/content";

const transitionUp = ref<boolean>(false);
setTimeout(() => {
  transitionUp.value = true;
}, 500);
</script>

<template>
  <div class="animation-wrapper" :class="{ 'animation-transition': transitionUp }">
    <div class="animation">
      <client-only>
        <Vue3Lottie :animation-data="HotBubbles" :width="'min(42rem, 52vh, 100%)'" />
      </client-only>
    </div>

    <v-avatar class="avatar custom-shadow" :size="'min(25rem, 28vh, 100%)'">
      <CustomImage :image="PAGE_CONTENT.landingPage.avatar" />
    </v-avatar>
  </div>
</template>

<style lang="scss" scoped>
.animation-wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1.5s ease-in-out;
}

.animation-transition {
  margin-top: -47vh;

  @include sm-down {
    margin-top: -46vh;
  }

  @include xs-only {
    margin-top: -45vh;
  }
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 0;
}
</style>
