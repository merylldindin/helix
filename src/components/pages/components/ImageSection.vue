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
    <div class="columns-wrapper">
      <div
        class="text-wrapper"
        :class="{
          'text-wrapper--default': !reverse,
          'text-wrapper--reverse': reverse,
        }"
      >
        <ContentGenerator
          v-if="content.length > 0"
          :content="content as GenericContent[]"
        />

        <slot />
      </div>

      <div class="image-column" :class="{ 'image-column--reverse': reverse }">
        <CustomImage
          :aspect-ratio="smAndDown ? 1.77 : 1"
          class="image-wrapper custom-shadow"
          cover
          :image="image"
        />
      </div>
    </div>
  </CustomSection>
</template>

<style lang="scss" scoped>
.columns-wrapper {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin: 0 (-$page-gutter);
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
  width: 50%;
  flex: 0 0 50%;
  align-self: center;
  order: 2;
  padding: $page-gutter;

  &--default {
    padding-left: 96px;

    @include sm-down {
      padding-left: $page-gutter;
    }
  }

  &--reverse {
    padding-right: 96px;

    @include sm-down {
      padding-right: $page-gutter;
    }
  }
}

.image-column {
  width: 50%;
  flex: 0 0 50%;
  order: 1;
  align-self: center;
  padding: 0 $page-gutter;

  &--reverse {
    order: 2;
  }
}

@include sm-down {
  .text-wrapper,
  .image-column {
    width: 100%;
    flex-basis: 100%;
  }

  .text-wrapper {
    &,
    &--reverse {
      order: 2;
      padding-right: $page-gutter;
      padding-left: $page-gutter;
    }
  }

  .image-column {
    &,
    &--reverse {
      order: 1;
    }
  }
}
</style>
