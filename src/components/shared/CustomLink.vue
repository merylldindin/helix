<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  underlined: {
    type: Boolean,
    default: false,
  },
  prompt: {
    type: String,
    default: undefined,
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
    <template v-if="prompt">
      {{ prompt }}
    </template>

    <slot />
  </a>

  <nuxt-link v-else v-bind="props" :class="{ 'text-decoration-underline': underlined }">
    <template v-if="prompt">
      {{ prompt }}
    </template>

    <slot />
  </nuxt-link>
</template>
