<script lang="ts" setup>
import { PropType, onMounted, ref } from "vue";

import { CustomSection } from "@/components/shared";

import { LinksGrid } from "./components";

interface PageProfile {
  slug: string;
  link: { ariaLabel: string; to: string; external?: boolean };
}

interface PageData {
  headline: { prompt: string; to?: string; ariaLabel?: string };
  profiles: PageProfile[];
}

const cProps = defineProps({
  pages: {
    required: true,
    type: Array as PropType<PageData[]>,
  },
});

const containerRef = ref(null);
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
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
      <nav v-if="!mounted" aria-label="Site navigation" class="sr-only">
        <ul v-for="(page, index) in cProps.pages" :key="index">
          <li v-if="page.headline.to">
            <a :href="page.headline.to">{{ page.headline.prompt }}</a>
          </li>
          <li v-else>{{ page.headline.prompt }}</li>
          <li v-for="(profile, pIndex) in page.profiles" :key="pIndex">
            <a
              :aria-label="profile.link.ariaLabel"
              :href="profile.link.to"
              v-bind="
                profile.link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}
              "
            >
              {{ profile.slug }}
            </a>
          </li>
        </ul>
      </nav>
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
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

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
