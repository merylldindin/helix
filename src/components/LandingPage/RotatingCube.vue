<script lang="ts" setup>
import { useDisplay } from "vuetify";

import { CustomImage } from "@/components/shared";
import { PAGE_CONTENT } from "@/content";

import { SwiperEffectCube } from "#imports";

const { smAndDown } = useDisplay();
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
    :modules="[SwiperEffectCube]"
    :slides-per-view="1"
  >
    <SwiperSlide
      v-for="(image, index) in PAGE_CONTENT.landingPage.tesseract"
      :key="index"
      class="swiper-slide"
    >
      <CustomImage class="swiper-image" :cover="smAndDown" :image="image.background" />
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper-wrapper {
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease-in-out;

  @include sm-down {
    transform: scale(1.11);
  }
}

.swiper-image {
  transition: all 0.3s ease-in-out;

  @include sm-down {
    min-height: 100%;
  }
}
</style>
