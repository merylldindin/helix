<script lang="ts" setup>
import type { PropType } from "vue";
import { useDisplay } from "vuetify";

import { CustomImage, CustomSection } from "@/components/shared";
import type { DeliveredImage, GenericContent } from "@/types";

import ContentGenerator from "./ContentGenerator/main.vue";

defineProps({
  content: {
    default: () => [],
    type: Array,
  },
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  reverse: {
    default: false,
    type: Boolean,
  },
});

const { smAndDown } = useDisplay();
</script>

<template>
  <CustomSection fullscreen snap>
    <v-row class="columns-wrapper">
      <v-col
        class="text-wrapper"
        :class="reverse ? 'text-wrapper--reverse' : 'text-wrapper--default'"
        cols="12"
        md="6"
        :order="smAndDown ? 2 : reverse ? 1 : 2"
      >
        <ContentGenerator
          v-if="content.length > 0"
          :content="content as GenericContent[]"
        />

        <slot />
      </v-col>

      <v-col
        class="align-self-center py-0"
        cols="12"
        md="6"
        :order="smAndDown ? 1 : reverse ? 2 : 1"
      >
        <CustomImage
          :aspect-ratio="smAndDown ? 1.77 : 1"
          class="image-wrapper custom-shadow"
          :class="{ 'image-wrapper--reverse': reverse }"
          cover
          :image="image"
        />
      </v-col>
    </v-row>
  </CustomSection>
</template>

<style lang="scss" scoped>
.columns-wrapper {
  height: 100%;
  overflow: hidden;
  margin: 0 -12px;
  align-content: center;

  @include sm-down {
    align-content: space-between;
  }
}

.image-wrapper {
  height: auto;
  max-height: none;

  @include sm-down {
    max-height: 45vh;
  }
}

.text-wrapper {
  align-self: center;

  &--default {
    padding-left: 96px;

    @include sm-down {
      padding-left: 12px;
    }
  }

  &--reverse {
    padding-right: 96px;

    @include sm-down {
      padding-right: 12px;
    }
  }
}
</style>
