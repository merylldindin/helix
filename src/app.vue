<template>
  <div>
    <NuxtPage />
    <CookieBanner />
  </div>
</template>

<script lang="ts">
import { CookieBanner } from "@/components";

export default {
  components: {
    CookieBanner,
  },
};
</script>
