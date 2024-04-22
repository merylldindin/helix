<script setup lang="ts">
import type { ComputedRef, PropType } from "vue";
import { computed, onMounted, ref, watch } from "vue";
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
  width: {
    default: "100%",
    type: String,
  },
});

const { smAndDown } = useDisplay();

const isShown = ref<boolean>(false);

onMounted(() => {
  isShown.value = true;
});

watch(
  () => smAndDown.value,
  () => {
    isShown.value = false;

    setTimeout(() => {
      isShown.value = true;
    }, 100);
  }
);

const imageSource: ComputedRef<string> = computed(() => {
  if (smAndDown.value && cProps.image.mobile) {
    return cProps.image.mobile;
  }

  return cProps.image.source;
});

const imageLazySource: ComputedRef<string | undefined> = computed(() => {
  if (smAndDown.value && cProps.image.lazySource) {
    return cProps.image.lazyMobile;
  }

  return cProps.image.lazySource;
});
</script>

<template>
  <template v-if="isShown">
    <v-img
      :alt="image.altText"
      :aspect-ratio="aspectRatio"
      :cover="cover"
      :eager="image.eager"
      :lazy-src="imageLazySource"
      :src="imageSource"
      :width="width"
    />
  </template>
</template>
