<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { AnimatedAvatar, GlobalFooter, WebsiteTitle } from "@/components";

const setSectionHeight = () => {
  const windowHeight = window.innerHeight;

  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.style.height = `${windowHeight}px`;
  });
};

onMounted(() => {
  window.addEventListener("resize", setSectionHeight);

  setSectionHeight();
});

onUnmounted(() => {
  window.removeEventListener("resize", setSectionHeight);
});
</script>

<template>
  <div class="default-layout">
    <WebsiteTitle />

    <AnimatedAvatar />

    <div class="default-page">
      <v-main>
        <slot />
      </v-main>

      <GlobalFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.default-page {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
</style>
