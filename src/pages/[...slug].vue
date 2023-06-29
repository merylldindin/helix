<script setup lang="ts">
import { ComputedRef, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { DynamicPage } from "@/components/pages";
import { ROUTES_CONTENT } from "@/utils/routes";
import {
  getBlogPostSchema,
  getBreadcrumbsSchema,
  getWebPageSchema,
} from "@/utils/schemas";

import { definePageMeta, setPageLayout } from "#imports";
import { useJsonld } from "#jsonld";

definePageMeta({
  layout: false,
});

const pageContent = computed(() => {
  return ROUTES_CONTENT[useRoute().path as keyof typeof ROUTES_CONTENT];
});

const pageSchema: ComputedRef<string | undefined> = computed(() => {
  // @ts-ignore
  return pageContent.value.schema?.type;
});

onMounted(() => {
  setPageLayout(pageContent.value.layout);

  // @ts-ignore
  useJsonld(getBreadcrumbsSchema(useRoute().path));

  // @ts-ignore
  useJsonld(getWebPageSchema(useRoute().path));

  if (pageSchema.value === "blogPosting") {
    getBlogPostSchema(pageContent.value).forEach((schema) => {
      // @ts-ignore
      useJsonld(schema);
    });
  }
});
</script>

<template>
  <DynamicPage v-bind="pageContent" />
</template>
