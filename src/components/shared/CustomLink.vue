<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed } from "vue";

import { DEFAULT_URL } from "@/content";

import { useRoute } from "#imports";

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

const route = useRoute();

const parsedLink: ComputedRef<{
  external: boolean;
  href?: string;
  to?: string | { hash: string; path: string };
}> = computed(() => {
  const parsedUrl = new URL(cProps.to, DEFAULT_URL);
  const isSamePage = route.path === parsedUrl.pathname;

  if (cProps.to.includes(":")) {
    return { external: true, href: cProps.to };
  }

  return {
    external: false,
    to: isSamePage
      ? parsedUrl.hash
      : {
          hash: parsedUrl.hash,
          path: parsedUrl.pathname,
        },
  };
});

const isExternalLink: ComputedRef<boolean> = computed(
  () => cProps.to.includes(":") || cProps.external || parsedLink.value.external
);
</script>

<template>
  <nuxt-link
    v-if="!isExternalLink"
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

  <a
    v-else
    v-bind="{ ...cProps, ...parsedLink, to: undefined }"
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
  </a>
</template>
