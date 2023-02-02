<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  prompt: {
    type: String,
    required: true,
  },
  underlined: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  rel: {
    type: String,
    default: undefined,
  },
  target: {
    type: String,
    default: undefined,
  },
});

const isExternal = computed(() => {
  return props.href !== undefined;
});
</script>

<template>
  <a
    v-if="isExternal"
    v-bind="props"
    :class="{ 'text-decoration-underline': underlined }"
  >
    {{ prompt }}
  </a>

  <nuxt-link v-else v-bind="props" :class="{ 'text-decoration-underline': underlined }">
    {{ prompt }}
  </nuxt-link>
</template>
