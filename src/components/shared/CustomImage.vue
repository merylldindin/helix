<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

import { DeliveredImage } from "@/types";

defineProps({
  cover: {
    default: false,
    type: Boolean,
  },
  image: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
  width: {
    default: "100%",
    type: String,
  },
});

const { smAndDown } = useDisplay();

const isImageRendered = ref<boolean>(false);

onMounted(() => {
  isImageRendered.value = true;
});
</script>

<template>
  <v-img
    v-if="isImageRendered && (!smAndDown || !image.mobileSource)"
    :alt="image.altText"
    :cover="cover"
    :eager="image.eager"
    :lazy-src="image.lazySource"
    :src="image.source"
    :width="width"
  />

  <v-img
    v-else-if="isImageRendered && image.mobileSource && smAndDown"
    :alt="image.altText"
    :cover="cover"
    :eager="image.eager"
    :lazy-src="image.lazyMobileSource"
    :src="image.mobileSource"
    :width="width"
  />
</template>
