<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { DEFAULT_URL } from "@/content";

import CustomIcon from "./CustomIcon.vue";

const cProps = defineProps({
  ariaLabel: {
    default: undefined,
    type: String,
  },
  color: {
    default: "mine-shaft",
    type: String,
  },
  external: {
    default: false,
    type: Boolean,
  },
  icon: {
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
  size: {
    default: "x-large",
    type: String,
  },
  target: {
    default: undefined,
    type: String,
  },
  to: {
    required: true,
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

const parsedLink: ComputedRef<object> = computed(() => {
  const parsedUrl = new URL(cProps.to, DEFAULT_URL);
  const isSamePage = useRoute().path === parsedUrl.pathname;

  if (!cProps.to.startsWith("http") && cProps.to.includes("#")) {
    return {
      external: isSamePage,
      to: isSamePage
        ? parsedUrl.hash
        : {
            hash: parsedUrl.hash,
            path: parsedUrl.pathname,
          },
    };
  }

  return { to: cProps.to };
});
</script>

<template>
  <nuxt-link
    v-bind="{ ...cProps, ...parsedLink }"
    :class="[
      typography,
      underlined ? 'text-decoration-underline' : 'text-decoration-none',
    ]"
  >
    <template v-if="prompt">
      {{ prompt }}
    </template>

    <CustomIcon v-else-if="icon" :color="color" :icon="icon" :size="size" />

    <slot />
  </nuxt-link>
</template>
