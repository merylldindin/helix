<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";
import { useDisplay } from "vuetify";

import type { DeliveredImage } from "@/types";

const cProps = defineProps({
  aspectRatio: {
    default: undefined,
    type: Number,
  },
  cover: {
    default: false,
    type: Boolean,
  },
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  useMobileSource: {
    default: true,
    type: Boolean,
  },
  width: {
    default: "100%",
    type: String,
  },
});

const { smAndDown } = useDisplay();

const imageSource = computed(() => {
  if (cProps.useMobileSource && smAndDown.value && cProps.image.mobile) {
    return cProps.image.mobile;
  }

  return cProps.image.source;
});

const imageLazySource = computed(() => {
  if (cProps.useMobileSource && smAndDown.value && cProps.image.lazyMobile) {
    return cProps.image.lazyMobile;
  }

  return cProps.image.lazySource;
});

const imageKey = computed(() => `${imageSource.value}:${imageLazySource.value ?? ""}`);
</script>

<template>
  <v-img
    :key="imageKey"
    :alt="image.altText"
    :aspect-ratio="aspectRatio"
    :cover="cover"
    :eager="image.eager"
    :lazy-src="imageLazySource"
    :src="imageSource"
    :width="width"
  />
</template>
