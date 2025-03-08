<script setup lang="ts">
import type { PropType } from "vue";

import type { PageComponent, PageHead } from "@/types";
import { extractHead } from "@/utils/meta";

import { ASYNC_COMPONENTS } from "./utilities";

import { useSeoMeta } from "#imports";

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

useSeoMeta(
  // @ts-ignore
  extractHead(cProps.head)
);
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
