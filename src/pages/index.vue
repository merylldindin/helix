<template>
  <NuxtLayout name="default">
    <v-avatar class="avatar custom-shadow">
      <CustomImage :image="CONTENT.root.avatar" />
    </v-avatar>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CustomImage } from "@/components";
import { CONTENT } from "@/content";
</script>

<style lang="scss" scoped>
.avatar {
  height: auto;
  width: min(25rem, 60%);
}
</style>
