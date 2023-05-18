<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

import { AppNavbar } from "@/components/layouts";

const route = useRoute();

const setSectionHeight = async () => {
  await nextTick();

  const windowHeight = window.innerHeight;

  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.style.height = `${windowHeight}px`;
  });
};

onMounted(async () => {
  window.addEventListener("resize", setSectionHeight);

  await setSectionHeight();
});

watch(
  route,
  async () => {
    await setSectionHeight();
  },
  { deep: true }
);

onUnmounted(() => {
  window.removeEventListener("resize", setSectionHeight);
});
</script>

<template>
  <div class="default-layout">
    <AppNavbar />

    <div class="default-page">
      <v-main>
        <slot />
      </v-main>
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
}
</style>
