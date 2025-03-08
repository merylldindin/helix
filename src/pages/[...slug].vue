<script setup lang="ts">
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { DynamicPage } from "@/components/pages";
import { ROUTES_CONTENT } from "@/utils/routes";
import {
  getBlogPostSchema,
  getBreadcrumbsSchema,
  getItemListSchema,
  getWebPageSchema,
} from "@/utils/schemas";

import { definePageMeta, useHead } from "#imports";

definePageMeta({
  layout: "default",
});

const route = useRoute();

const pageContent = computed(() => {
  return ROUTES_CONTENT[route.path as keyof typeof ROUTES_CONTENT];
});

const pageSchema: ComputedRef<string | undefined> = computed(() => {
  // @ts-ignore
  return pageContent.value.schema?.type;
});

useHead(() => {
  const schemas = [];

  schemas.push(getBreadcrumbsSchema(route.path));

  schemas.push(getWebPageSchema(route.path));

  if (pageSchema.value === "itemList") {
    // @ts-ignore
    schemas.push(getItemListSchema(pageContent.value));
  }

  if (pageSchema.value === "blogPosting") {
    schemas.push(...getBlogPostSchema(pageContent.value));
  }

  return {
    script: schemas.map((schema) => ({
      children: JSON.stringify(schema),
      type: "application/ld+json",
    })),
  };
});
</script>

<template>
  <DynamicPage v-bind="pageContent" />
</template>
