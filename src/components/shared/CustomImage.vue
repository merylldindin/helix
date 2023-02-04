<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";

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

const isShown = ref<boolean>(false);
onMounted(() => {
  isShown.value = true;
});
</script>

<template>
  <template v-if="isShown">
    <v-img
      :eager="image.eager"
      :src="image.source"
      :lazy-src="image.lazySource"
      :alt="image.altText"
      :width="width"
    />
  </template>
</template>
