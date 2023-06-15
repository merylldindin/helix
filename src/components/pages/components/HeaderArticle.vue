<script lang="ts" setup>
import { PropType, onMounted, onUnmounted, ref } from "vue";
import { useDisplay } from "vuetify";

import ScrollDown from "@/assets/animations/scroll-down.json";
import { CustomImage, CustomSection } from "@/components/shared";
import { DeliveredImage, GenericContent } from "@/types";

import ContentGenerator from "./ContentGenerator.vue";

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

const pageMargin = ref<string>("80vh");
const headerOpacity = ref<number>(1.0);

const opacityScrollHandler = () => {
  headerOpacity.value = 1.0 - window.scrollY / window.innerHeight;
};

const marginResizeHandler = () => {
  pageMargin.value = `${Math.floor(0.9 * window.innerHeight)}px`;
};

onMounted(() => {
  marginResizeHandler();

  window.addEventListener("resize", marginResizeHandler);

  window.addEventListener("scroll", opacityScrollHandler);
});

onUnmounted(() => {
  window.removeEventListener("resize", marginResizeHandler);

  window.removeEventListener("scroll", opacityScrollHandler);
});
</script>

<template>
  <CustomSection snap>
    <template #background>
      <CustomImage
        class="image-wrapper custom-shadow"
        cover
        :image="background"
        :style="{ opacity: headerOpacity }"
      />
    </template>

    <client-only>
      <v-row class="column-wrapper" :style="{ marginTop: pageMargin }">
        <Vue3Lottie
          :animation-data="ScrollDown"
          class="scroll-hint"
          :height="mobile ? '12vw' : '5vh'"
          :style="{ opacity: headerOpacity / 2 }"
        />

        <v-col class="text-wrapper" cols="12" md="8">
          <ContentGenerator
            v-if="content.length > 0"
            :content="(content as GenericContent[])"
          />

          <slot />
        </v-col>
      </v-row>
    </client-only>
  </CustomSection>
</template>

<style lang="scss" scoped>
.image-wrapper {
  position: fixed;
  height: calc(100vh - 112px);
  max-width: calc(100vw - 64px);
  margin: 80px 32px 32px;
  opacity: 1;

  @include sm-down {
    max-width: calc(100vw - 32px);
    margin: 64px 16px 16px;
  }
}

.column-wrapper {
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

  @include sm-down {
    top: 0;
  }
}

.text-wrapper {
  margin: 52px auto;

  @include sm-down {
    margin: 5vh auto 0;
  }
}
</style>
