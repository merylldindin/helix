<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
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
    :icon="props.icon"
    :block="props.block"
    :loading="props.loading"
    :variant="props.variant"
    @click="props.onClick"
  >
    <span v-if="props.prompt" class="text-mine-shaft">
      {{ props.prompt }}
    </span>
    <slot />
  </v-btn>
</template>
