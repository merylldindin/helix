<script setup lang="ts">
import { AnimatedAvatar, CookieBanner, GlobalFooter } from "@/components";
</script>

<template>
  <div class="h-100 w-100 d-flex flex-column">
    <CookieBanner />

    <AnimatedAvatar />

    <v-main>
      <slot />
    </v-main>

    <GlobalFooter />
  </div>
</template>
