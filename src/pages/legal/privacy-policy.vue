<script lang="ts" setup>
import { LegalText } from "@/components";
import { PAGE_CONTENT } from "@/content";
</script>

<template>
  <NuxtLayout name="legal-layout">
    <LegalText :text="PAGE_CONTENT.legal.privacyPolicy" />
  </NuxtLayout>
</template>
