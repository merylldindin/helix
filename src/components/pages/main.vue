<script setup lang="ts">
import type { PropType } from "vue";
import { useRoute } from "vue-router";

import { DEFAULT_URL } from "@/content";
import type { PageComponent, PageHead } from "@/types";
import { extractHead } from "@/utils/meta";

import { ASYNC_COMPONENTS } from "./utilities";

import { useHead, useSeoMeta } from "#imports";

const route = useRoute();

const cProps = defineProps({
  components: {
    required: true,
    type: Array as PropType<PageComponent[]>,
  },
  head: {
    required: true,
    type: Object as PropType<PageHead>,
  },
});

const canonicalPath = cProps.head.canonical ?? route.path;
const canonicalUrl = `${DEFAULT_URL}${canonicalPath}`;

useHead({
  link: [{ href: canonicalUrl, rel: "canonical" }],
});

useSeoMeta(extractHead({ ...cProps.head, canonical: canonicalPath }));
</script>

<template>
  <div>
    <component
      :is="ASYNC_COMPONENTS[component.name]"
      v-for="component in components"
      :id="component.id"
      :key="component.id"
      v-bind="component.props"
    />
  </div>
</template>
