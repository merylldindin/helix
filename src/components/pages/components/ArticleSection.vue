<script lang="ts" setup>
import type { PropType } from "vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useDisplay } from "vuetify";

import ScrollDown from "@/assets/animations/scroll-down.json";
import { CustomImage, CustomSection } from "@/components/shared";
import type { DeliveredImage, GenericContent } from "@/types";

import ContentGenerator from "./ContentGenerator/main.vue";

defineProps({
  background: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  content: {
    default: () => [],
    type: Array,
  },
});

const { mobile } = useDisplay();

const HEADER_HEIGHT_RATIO = 0.72;

const pageMargin = ref("72vh");
const headerOpacity = ref(1);

const getHeaderHeight = () => HEADER_HEIGHT_RATIO * window.innerHeight;

const handleScroll = () => {
  headerOpacity.value = 1 - window.scrollY / getHeaderHeight();
};

const handleResize = () => {
  pageMargin.value = `${Math.floor(getHeaderHeight())}px`;
};

const scrollDown = () => {
  window.scrollTo({ behavior: "smooth", top: Math.floor(getHeaderHeight()) });
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <CustomSection>
    <template #background>
      <CustomImage
        class="image-wrapper"
        :image="background"
        :style="{ opacity: headerOpacity }"
        :use-mobile-source="false"
      />
    </template>

    <client-only>
      <div class="column-wrapper" :style="{ marginTop: pageMargin }">
        <Vue3Lottie
          :animation-data="ScrollDown"
          class="scroll-hint"
          :height="mobile ? '12vw' : '5vh'"
          :style="{ opacity: headerOpacity / 2 }"
          @click="scrollDown"
        />

        <div class="text-wrapper">
          <ContentGenerator
            v-if="content.length > 0"
            :content="content as GenericContent[]"
          />

          <slot />
        </div>
      </div>
    </client-only>
  </CustomSection>
</template>

<style lang="scss" scoped>
.image-wrapper {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60vh;
  width: 60vh;

  :deep(img) {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  @include sm-down {
    top: 40%;
    height: 50vh;
    width: 90vw;
  }
}

.column-wrapper {
  display: flow-root;
  height: fit-content;
  margin-bottom: 6rem;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  background-color: rgb(var(--v-theme-foam));
  border-radius: 4px 4px 0 0;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10vh;
    box-shadow: rgb(0 0 0 / 10%) 0 -4px 6px -1px;
    z-index: -1;

    @include sm-down {
      height: 5vh;
    }
  }

  @include sm-down {
    margin-bottom: 3rem;
    margin-right: -16px;
    margin-left: -16px;
  }
}

.scroll-hint {
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  cursor: pointer;

  @include sm-down {
    top: 0;
  }
}

.text-wrapper {
  width: min(100%, calc(100% * 8 / 12));
  padding: $page-gutter;
  margin: 80px auto 52px;

  @include sm-down {
    width: 100%;
    margin: 10vh auto 0;
  }
}
</style>
