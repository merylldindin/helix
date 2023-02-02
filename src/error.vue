<template>
  <NuxtLayout name="error">
    <h1>Page Not Found</h1>

    <nuxt-link to="/">Home</nuxt-link>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useHead } from "@unhead/vue";

useHead({
  title: "Page Not Found",
  meta: [
    {
      name: "description",
      content: "Page Not Found",
    },
  ],
});
</script>
