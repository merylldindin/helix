<script lang="ts" setup>
import type { PropType } from "vue";

import { CustomSection } from "@/components/shared";

import { LinksGrid } from "./components";

defineProps({
  pages: {
    required: true,
    type: Array as PropType<object[]>,
  },
});

const swiperConfig = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  centeredSlides: true,
  cubeEffect: {
    shadowScale: 1.0,
  },
  effect: "cube",
  grabCursor: true,
  loop: true,
  mousewheel: true,
  slidesPerView: 1,
};
</script>

<template>
  <CustomSection fullscreen>
    <template #background>
      <ClientOnly>
        <swiper-container ref="containerRef" v-bind="swiperConfig" class="cube-wrapper">
          <swiper-slide
            v-for="(page, index) in pages"
            :key="index"
            class="swiper-slide"
          >
            <LinksGrid :grid="page" />
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </template>
  </CustomSection>
</template>

<style lang="scss" scoped>
.cube-wrapper {
  height: 100%;
  width: 66vh;
  display: flex;
  flex-direction: row;
  margin: auto;
  padding-bottom: 4rem;

  @include xs-only {
    width: calc(100% - 32px);
    padding-bottom: 0;
    padding-top: 32px;
  }
}

.swiper-wrapper {
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--v-theme-slate-gray));
  height: 66vh;
  margin: auto;

  @include xs-only {
    height: calc(100% - 64px);
  }
}
</style>
