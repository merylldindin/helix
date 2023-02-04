<script setup lang="ts">
import { PropType } from "vue";

import { DeliveredImage } from "~/types";

defineProps({
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  width: {
    type: String,
    default: "100%",
  },
});
</script>

<template>
  <v-img
    v-if="image.source"
    :eager="image.eager"
    :src="image.source"
    :lazy-src="image.lazySource"
    :alt="image.altText"
    :width="width"
  />
</template>
