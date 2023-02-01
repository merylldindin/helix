<template>
  <v-img :src="image.source" :lazy-src="image.lazySource" :alt="image.altText" />
</template>

<script setup lang="ts">
import { PropType } from "vue";

import { DeliveredImage } from "~/types";

defineProps({
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
});
</script>
