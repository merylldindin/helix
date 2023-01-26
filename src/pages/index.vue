<template>
  <NuxtLayout name="default">
    <v-avatar class="avatar">
      <CustomImage :image="CONTENT.root.avatar" />
    </v-avatar>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CustomImage } from "~/components";
import { CONTENT } from "~/content";
</script>

<style lang="scss" scoped>
.avatar {
  width: min(18rem, 60%);
  height: auto;
}
</style>
