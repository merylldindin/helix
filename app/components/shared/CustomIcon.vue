<script lang="ts" setup>
import type { ColorName, IconName } from "@/types";

import CustomImage from "./CustomImage.vue";

defineProps({
  color: {
    default: "mine-shaft",
    type: String,
  },
  icon: {
    default: undefined,
    type: String,
  },
  size: {
    default: "x-large",
    type: String,
  },
});

const matchSizeToPixel = (size: string): string => {
  switch (size) {
    case "x-small": {
      return "12px";
    }
    case "small": {
      return "14px";
    }
    case "medium": {
      return "16px";
    }
    case "large": {
      return "22px";
    }
    case "x-large": {
      return "28px";
    }
    default: {
      return "16px";
    }
  }
};
</script>

<template>
  <CustomImage
    v-if="icon && $ICON[icon as IconName]?.startsWith('https')"
    :aspect-ratio="1"
    :image="{
      altText: 'icon',
      source: $ICON[icon as IconName]!,
    }"
    :width="matchSizeToPixel(size)"
  />

  <v-icon
    v-else-if="icon"
    :color="color as ColorName"
    :icon="$ICON[icon as IconName]"
    :size="size"
  />
</template>
