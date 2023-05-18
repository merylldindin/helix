<script lang="ts" setup>
import { AppFooter, AppNavbar } from "@/components/layouts";
</script>

<template>
  <div class="scrolled-layout">
    <AppNavbar />

    <v-main>
      <slot />
    </v-main>

    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.scrolled-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
</style>
