<script lang="ts" setup>
import type { PropType } from "vue";

import { CustomSection } from "@/components/shared";

import { LinksGrid } from "./components";

import { SwiperAutoplay, SwiperEffectCube, SwiperMousewheel } from "#imports";

defineProps({
  pages: {
    required: true,
    type: Array as PropType<Object[]>,
  },
});
</script>

<template>
  <CustomSection fullscreen>
    <template #background>
      <div class="cube-wrapper">
        <Swiper
          :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }"
          :centered-slides="true"
          class="swiper-wrapper"
          :cube-effect="{
            shadowScale: 1.0,
          }"
          :effect="'cube'"
          :grab-cursor="true"
          :loop="true"
          :modules="[SwiperAutoplay, SwiperEffectCube, SwiperMousewheel]"
          :mousewheel="true"
          :slides-per-view="1"
        >
          <SwiperSlide v-for="(page, index) in pages" :key="index" class="swiper-slide">
            <LinksGrid :grid="page" />
          </SwiperSlide>
        </Swiper>
      </div>
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
