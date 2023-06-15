<script lang="ts" setup>
import { PropType, onMounted, onUnmounted, ref } from "vue";

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

const headerOpacity = ref<number>(1.0);

const opacityScrollHandler = () => {
  headerOpacity.value = 1.0 - window.scrollY / window.innerHeight;
};

onMounted(() => {
  window.addEventListener("scroll", opacityScrollHandler);
});

onUnmounted(() => {
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

    <v-row class="column-wrapper">
      <v-col class="text-wrapper" cols="12" md="8">
        <ContentGenerator
          v-if="content.length > 0"
          :content="(content as GenericContent[])"
        />

        <slot />
      </v-col>
    </v-row>
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
  background-color: rgb(var(--v-theme-foam));
  height: fit-content;
  margin: 90vh auto 6rem;
  position: relative;
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
    margin: 90vh -16px 3rem;
  }
}

.text-wrapper {
  margin: 52px auto;

  @include sm-down {
    margin: 5vh auto 0;
  }
}
</style>
