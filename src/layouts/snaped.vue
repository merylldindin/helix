<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, watch } from "vue";

import { AppFooter, AppNavbar } from "@/components/layouts";

import { useRoute } from "#imports";

const route = useRoute();

const setSectionHeight = async () => {
  await nextTick();

  const windowHeight = window.innerHeight;

  const sections = document.querySelectorAll("section");

  for (const section of sections) {
    section.style.height = `${windowHeight}px`;
  }
};

const setScrollPosition = async () => {
  await nextTick();

  const sections = document.querySelectorAll("section");

  if (route && route.hash) {
    const suffixRegex = /(-banner|-header|-section)$/;

    const anchor = [...sections].find(
      (section) => section.id.replace(suffixRegex, "") === route.hash.slice(1)
    );

    if (anchor) {
      anchor.scrollIntoView();
    }
  } else {
    const header = [...sections].find(
      (section) => section.id.startsWith("header-") || section.id.startsWith("home-")
    );

    if (header) {
      header.scrollIntoView();
    }
  }
};

onMounted(async () => {
  window.addEventListener("resize", setSectionHeight);

  await setSectionHeight();
  await setScrollPosition();
});

watch(
  route,
  async () => {
    await setSectionHeight();
    await setScrollPosition();
  },
  { deep: true }
);

onUnmounted(() => {
  window.removeEventListener("resize", setSectionHeight);
});
</script>

<template>
  <div class="snaped-layout">
    <AppNavbar />

    <div class="snaped-page">
      <v-main>
        <slot />
      </v-main>

      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.snaped-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.snaped-page {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
</style>
