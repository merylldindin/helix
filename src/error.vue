<template>
  <NuxtLayout name="error">
    <h1>Page Not Found</h1>
    <nuxt-link to="/">Home</nuxt-link>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";

useHead({
  titleTemplate: (chunk) => {
    return chunk ? `${chunk} - Meryll Dindin` : "Meryll Dindin";
  },
});
</script>
