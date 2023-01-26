<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";

import { DEFAULT_APP_TITLE } from "@/utils/constants";

useHead({
  titleTemplate: (title) => {
    return title ? `${title} - ${DEFAULT_APP_TITLE}` : DEFAULT_APP_TITLE;
  },
});
</script>
