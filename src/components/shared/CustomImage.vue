<template>
  <v-img :src="image.source" :lazy-src="image.lazySource" :alt="image.altText" />
</template>

<script lang="ts">
import { PropType } from "vue";

import { DeliveredImage } from "@/types";

export default {
  props: {
    image: {
      required: true,
      type: Object as PropType<DeliveredImage>,
    },
  },
};
</script>
