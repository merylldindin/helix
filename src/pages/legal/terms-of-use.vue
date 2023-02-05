<script lang="ts" setup>
import { LegalText } from "@/components";
import { PAGE_CONTENT } from "@/content";
</script>

<template>
  <NuxtLayout name="legal-layout">
    <section>
      <LegalText :text="PAGE_CONTENT.legal.termsOfUse" />
    </section>
  </NuxtLayout>
</template>
