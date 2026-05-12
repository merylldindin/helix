<script lang="ts" setup>
import { PropType, onMounted, ref } from "vue";

import { CustomSection } from "@/components/shared";
import { isExternalUrl } from "@/utils/links";

import { LinksGrid } from "./components";

interface PageProfile {
  slug: string;
  link: { ariaLabel: string; to: string };
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
    shadow: true,
    shadowOffset: 28,
    shadowScale: 1.08,
    slideShadows: true,
  },
  effect: "cube",
  grabCursor: true,
  injectStyles: [
    `
      .swiper-cube .swiper-cube-shadow {
        opacity: var(--cube-shadow-opacity, 0.6);
      }

      .swiper-cube .swiper-cube-shadow::before {
        background: radial-gradient(
          ellipse at center,
          rgba(var(--cube-shadow-core-rgb, 0, 0, 0), var(--cube-shadow-core-alpha, 0.28)) 0%,
          rgba(var(--cube-shadow-glow-rgb, 0, 0, 0), var(--cube-shadow-glow-alpha, 0.14)) 42%,
          transparent 78%
        );
        filter: blur(var(--cube-shadow-blur, 56px));
        transform: scale(1.18);
      }
    `,
  ],
  loop: true,
  mousewheel: true,
  slidesPerView: 1,
};
</script>

<template>
  <CustomSection fullscreen>
    <template #background>
      <div class="cube-backdrop" />

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
                isExternalUrl(profile.link.to)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}
              "
            >
              {{ profile.slug }}
            </a>
          </li>
        </ul>
      </nav>
      <ClientOnly fallback-tag="div">
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

.cube-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 50% 38%,
      rgb(var(--v-theme-primary) / 4%) 0,
      rgb(var(--v-theme-primary) / 2%) 18%,
      transparent 42%
    ),
    linear-gradient(
      180deg,
      rgb(var(--v-theme-background)) 0%,
      rgb(var(--v-theme-surface)) 100%
    );
  transition:
    background 0.45s ease,
    filter 0.45s ease;
}

.cube-wrapper {
  --cube-shadow-opacity: 0.34;
  --cube-shadow-core-rgb: var(--v-theme-primary);
  --cube-shadow-core-alpha: 0.18;
  --cube-shadow-glow-rgb: var(--v-theme-primary);
  --cube-shadow-glow-alpha: 0.08;
  --cube-shadow-blur: 58px;

  height: 100%;
  width: 66vh;
  display: flex;
  flex-direction: row;
  margin: auto;
  padding-bottom: 4rem;
  position: relative;
  isolation: isolate;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    pointer-events: none;
    border-radius: 999px;
    z-index: -1;
    transform: translateX(-50%);
  }

  &::before {
    bottom: 5rem;
    width: 78%;
    height: 20%;
    background-color: rgb(var(--cube-shadow-glow-rgb));
    filter: blur(calc(var(--cube-shadow-blur) * 0.92));
    opacity: calc(var(--cube-shadow-opacity) * var(--cube-shadow-glow-alpha));
    transform: translateX(-50%) scaleY(0.52);
  }

  &::after {
    bottom: 5.6rem;
    width: 68%;
    height: 16%;
    background-color: rgb(var(--cube-shadow-core-rgb));
    filter: blur(calc(var(--cube-shadow-blur) * 0.62));
    opacity: calc(var(--cube-shadow-opacity) * var(--cube-shadow-core-alpha));
    transform: translateX(-50%) scaleY(0.4);
  }

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

:global(:root[data-app-theme="dark"] .cube-wrapper .swiper-slide) {
  background-color: rgb(var(--v-theme-surface));
}

:global(:root[data-app-theme="dark"] .cube-wrapper) {
  --cube-shadow-opacity: 1;
  --cube-shadow-core-rgb: var(--v-theme-on-surface-variant);
  --cube-shadow-core-alpha: 0.28;
  --cube-shadow-glow-rgb: var(--v-theme-on-surface-variant);
  --cube-shadow-glow-alpha: 0.1;
  --cube-shadow-blur: 88px;
}

:global(:root[data-app-theme="dark"] .cube-wrapper::before),
:global(:root[data-app-theme="dark"] .cube-wrapper::after) {
  mix-blend-mode: screen;
}

:global(:root[data-app-theme="dark"] .cube-backdrop) {
  background:
    radial-gradient(
      circle at 50% 38%,
      rgb(var(--v-theme-lemon) / 16%) 0,
      rgb(var(--v-theme-lemon) / 6%) 18%,
      transparent 42%
    ),
    radial-gradient(
      circle at 50% 52%,
      rgb(var(--v-theme-foam) / 14%) 0,
      rgb(var(--v-theme-foam) / 4%) 24%,
      transparent 52%
    ),
    linear-gradient(180deg, #050808 0%, #0d1212 54%, #050808 100%);
  filter: saturate(1.05);
}
</style>
