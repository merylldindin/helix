<script lang="ts" setup>
import { PropType, ref } from "vue";
import { useDisplay } from "vuetify";

import { CustomImage, CustomSection } from "@/components/shared";
import { DeliveredImage } from "@/types";

import {
  SwiperAutoplay,
  SwiperFreeMode,
  SwiperNavigation,
  SwiperThumbs,
} from "#imports";

defineProps({
  images: {
    required: true,
    type: Array as PropType<DeliveredImage[]>,
  },
  thumbnails: {
    required: true,
    type: Array as PropType<DeliveredImage[]>,
  },
});

const { mobile } = useDisplay();

const thumbsSwiper = ref(null);
</script>

<template>
  <CustomSection fullscreen>
    <template #background>
      <div class="thumbs-wrapper">
        <Swiper
          :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }"
          :centered-slides="true"
          :grab-cursor="true"
          :loop="true"
          :modules="[SwiperAutoplay, SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
          :mousewheel="true"
          :slides-per-view="'auto'"
          :space-between="10"
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          :thumbs="{ swiper: thumbsSwiper }"
        >
          <SwiperSlide
            v-for="(image, index) in images"
            :key="index"
            class="gallery-image"
            :lazy="index < 1 ? false : true"
          >
            <CustomImage class="h-100 w-100" cover :image="image" />
          </SwiperSlide>
        </Swiper>

        <Swiper
          class="mt-4"
          :loop="true"
          :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
          :slides-per-view="mobile ? 1.5 : 3"
          :space-between="10"
          :watch-slides-progress="true"
          @swiper="thumbsSwiper = $event"
        >
          <SwiperSlide
            v-for="(image, index) in thumbnails"
            :key="index"
            class="gallery-thumbnail"
            :lazy="index < 4 ? false : true"
          >
            <CustomImage class="h-100 w-100" cover :image="image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </template>
  </CustomSection>
</template>

<style lang="scss" scoped>
.thumbs-wrapper {
  margin-top: 80px;
  height: calc(100vh - 80px);
  width: 100%;

  @include xs-only {
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
}

.gallery-image {
  height: calc(100vh - 60px - 15vh - 32px);

  @include sm-down {
    height: calc(100vh - 60px - 15vh - 12px);
  }
}

.gallery-thumbnail {
  height: 15vh;
}
</style>
