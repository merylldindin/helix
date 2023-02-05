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
    default: "mine-shaft",
    type: String as PropType<ColorName>,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  icon: {
    default: undefined,
    type: String as PropType<IconName>,
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
    :icon="icon"
    :block="block"
    :loading="loading"
    :variant="variant"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <span v-if="prompt" class="text-mine-shaft">
      {{ prompt }}
    </span>

    <v-icon v-else-if="icon" :size="size" :color="color" :icon="$ICON[icon]" />

    <slot />
  </v-btn>
</template>
