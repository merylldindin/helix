<script lang="ts" setup>
import { PropType } from "vue";

import { ColorName, IconName } from "@/types";

defineProps({
  ariaLabel: {
    default: undefined,
    type: String,
  },
  block: {
    default: false,
    type: Boolean,
  },
  color: {
    default: "slate-gray",
    type: String,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  icon: {
    default: undefined,
    type: String,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  onClick: {
    default: undefined,
    type: Function,
  },
  prompt: {
    default: undefined,
    type: String,
  },
  size: {
    default: "x-large",
    type: String,
  },
  variant: {
    default: "tonal",
    type: String as PropType<"flat" | "tonal">,
  },
});
</script>

<template>
  <v-btn
    :aria-label="ariaLabel"
    :block="block"
    :icon="icon"
    :loading="loading"
    :variant="variant"
    @click="onClick"
  >
    <span v-if="prompt" class="text-slate-gray">
      {{ prompt }}
    </span>

    <v-icon
      v-else-if="icon"
      :color="color as ColorName"
      :icon="$ICON[icon as IconName]"
      :size="size"
    />

    <slot />
  </v-btn>
</template>
