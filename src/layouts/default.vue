<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

import { AppNavbar } from "@/components/layouts";

const route = useRoute();

const setSectionHeight = async () => {
  await nextTick();

  const windowHeight = window.innerHeight;

  const sections = document.querySelectorAll("section");

  for (const section of sections) {
    section.style.height = `${windowHeight}px`;
  }
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

    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
