<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";

import { DeliveredImage } from "~/types";

defineProps({
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  width: {
    default: "100%",
    type: String,
  },
});

const isShown = ref<boolean>(false);
onMounted(() => {
  isShown.value = true;
});
</script>

<template>
  <template v-if="isShown">
    <v-img
      :alt="image.altText"
      :eager="image.eager"
      :lazy-src="image.lazySource"
      :src="image.source"
      :width="width"
    />
  </template>
</template>
