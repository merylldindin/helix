<script setup lang="ts">
import { computed } from "vue";

import { DynamicPage } from "@/components/pages";
import type { PageContent, RoutePath } from "@/types";
import { filterReleasedComponents, getCurrentDateInPst } from "@/utils/publishing";
import { ROUTES_CONTENT } from "@/utils/routes";
import {
  getBlogPostSchema,
  getBreadcrumbsSchema,
  getItemListSchema,
  getProfilePageSchema,
  getWebPageSchema,
} from "@/utils/schemas";

import { useHead, useRoute, useState } from "#imports";

const route = useRoute();

const currentDateInPst = useState("currentDateInPst", () => getCurrentDateInPst());

const pageContent = computed((): PageContent | undefined => {
  const content = ROUTES_CONTENT[route.path as RoutePath];

  if (!content) {
    return content;
  }

  return {
    ...content,
    components: filterReleasedComponents(content.components, currentDateInPst.value),
  };
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
