<script lang="ts" setup>
import { computed } from "vue";

const cProps = defineProps({
  ariaLabel: {
    default: undefined,
    type: String,
  },
  href: {
    default: undefined,
    type: String,
  },
  prompt: {
    default: undefined,
    type: String,
  },
  rel: {
    default: undefined,
    type: String,
  },
  target: {
    default: undefined,
    type: String,
  },
  to: {
    default: undefined,
    type: String,
  },
  typography: {
    default: "text-1",
    type: String,
  },
  underlined: {
    default: false,
    type: Boolean,
  },
});

const isExternal = computed(() => {
  return cProps.href !== undefined;
});
</script>

<template>
  <a
    v-if="isExternal"
    v-bind="cProps"
    :class="[
      typography,
      underlined ? 'text-decoration-underline' : 'text-decoration-none',
    ]"
  >
    <template v-if="prompt">
      {{ prompt }}
    </template>

    <slot />
  </a>

  <nuxt-link
    v-else
    v-bind="cProps"
    :class="[
      typography,
      underlined ? 'text-decoration-underline' : 'text-decoration-none',
    ]"
  >
    <template v-if="prompt">
      {{ prompt }}
    </template>

    <slot />
  </nuxt-link>
</template>
