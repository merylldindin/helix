<script setup lang="ts">
import { AnimatedAvatar } from "@/components";
</script>

<template>
  <NuxtLayout name="default">
    <section class="section-wrapper">
      <AnimatedAvatar />
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.section-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
