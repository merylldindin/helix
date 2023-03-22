<script lang="ts" setup>
import { PAGE_CONTENT } from "@/content";

import { LinksGrid } from "./components";

import { SwiperEffectCube, SwiperMousewheel } from "#imports";
</script>

<template>
  <div class="cube-wrapper">
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
        <LinksGrid :grid="page" :show-hint="index === 0" />
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
}

.swiper-wrapper {
  overflow: hidden;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in-out;

  @include sm-down {
    transform: scale(1.25) translateX(-16.5%);
    width: 100vw;
    padding: 0;
  }
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
