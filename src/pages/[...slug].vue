<script setup lang="ts">
import { computed } from "vue";

import { DynamicPage } from "@/components/pages";
import type { PageContent, RoutePath } from "@/types";
import { ROUTES_CONTENT } from "@/utils/routes";
import {
  getBlogPostSchema,
  getBreadcrumbsSchema,
  getItemListSchema,
  getProfilePageSchema,
  getWebPageSchema,
} from "@/utils/schemas";

import { definePageMeta, useHead, useRoute } from "#imports";

definePageMeta({
  layout: "default",
});

const route = useRoute();

const pageContent = computed((): PageContent | undefined => {
  return ROUTES_CONTENT[route.path as RoutePath];
});

const pageSchemaType = computed(() => {
  return pageContent.value?.schema?.type;
});

useHead(() => {
  const schemas = [];

  // Add ProfilePage schema on landing page
  if (route.path === "/") {
    schemas.push(getProfilePageSchema());
  }

  schemas.push(getBreadcrumbsSchema(route.path));
  schemas.push(getWebPageSchema(route.path, pageContent.value));

  if (pageSchemaType.value === "itemList" && pageContent.value) {
    schemas.push(getItemListSchema(pageContent.value));
  }

  if (pageSchemaType.value === "blogPosting" && pageContent.value) {
    schemas.push(...getBlogPostSchema(pageContent.value));
  }

  return {
    script: schemas.map((schema) => ({
      innerHTML: JSON.stringify(schema),
      type: "application/ld+json",
    })),
  };
});
</script>

<template>
  <DynamicPage v-if="pageContent" v-bind="pageContent" />
</template>
