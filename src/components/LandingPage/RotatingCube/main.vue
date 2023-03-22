<script lang="ts" setup>
import { PAGE_CONTENT } from "@/content";

import { LinksGrid } from "./components";

import { SwiperEffectCube, SwiperMousewheel } from "#imports";
</script>

<template>
  <Swiper
    :centered-slides="true"
    class="swiper-wrapper"
    :cube-effect="{
      shadowScale: 1.0,
    }"
    :effect="'cube'"
    :loop="true"
    :modules="[SwiperEffectCube, SwiperMousewheel]"
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
</template>

<style lang="scss" scoped>
.swiper-wrapper {
  width: 85vh;
  height: 85vh;
  padding: 0 2.5vh 2.5vh;
  margin: auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease-in-out;

  @include sm-down {
    transform: scale(1.11);
    width: 100vw;
    height: 90%;
    padding: 0;
  }
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
