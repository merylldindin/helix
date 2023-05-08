<script lang="ts" setup>
import { PAGE_CONTENT } from "@/content";

import { LinksGrid } from "./components";

import { SwiperAutoplay, SwiperEffectCube, SwiperMousewheel } from "#imports";
</script>

<template>
  <div class="cube-wrapper">
    <Swiper
      :autoplay="{
        delay: 1500,
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
      <SwiperSlide
        v-for="(page, index) in PAGE_CONTENT.landingPage.tesseract"
        :key="index"
        class="swiper-slide"
        :lazy="index !== 0"
      >
        <LinksGrid :grid="page" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.cube-wrapper {
  height: 100%;
  width: 66vh;
  display: flex;
  flex-direction: row;
  margin: auto;

  @include xs-only {
    width: calc(100vw - 32px);
  }
}

.swiper-wrapper {
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in-out;

  @include xs-only {
    transform: scale(1.1);
  }
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
