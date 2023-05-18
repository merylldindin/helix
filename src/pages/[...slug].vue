<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { DynamicPage } from "@/components/pages";
import { ROUTES_CONTENT } from "@/utils/routes";

import { definePageMeta, setPageLayout } from "#imports";

definePageMeta({
  layout: false,
});

const pageContent = computed(() => {
  return ROUTES_CONTENT[useRoute().path as keyof typeof ROUTES_CONTENT];
});

onMounted(() => {
  setPageLayout(pageContent.value.layout);
});
</script>

<template>
  <DynamicPage v-bind="pageContent" />
</template>
