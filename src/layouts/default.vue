<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { GlobalFooter, GlobalNavbar } from "@/components";

const setSectionHeight = () => {
  const windowHeight = window.innerHeight;

  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.style.minHeight = `${windowHeight}px`;
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
    <GlobalNavbar />

    <v-main>
      <slot />
    </v-main>

    <GlobalFooter />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
