<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  prompt: {
    type: String,
    default: undefined,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "mine-shaft",
  },
  variant: {
    type: String as PropType<"flat" | "tonal">,
    default: "tonal",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: undefined,
  },
});
</script>

<template>
  <v-btn
    :icon="icon"
    :block="block"
    :loading="loading"
    :variant="variant"
    @click="onClick"
  >
    <span v-if="prompt" class="text-mine-shaft">
      {{ prompt }}
    </span>
    <slot />
  </v-btn>
</template>
