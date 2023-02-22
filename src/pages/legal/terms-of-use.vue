<script lang="ts" setup>
import { useHead } from "@unhead/vue";

import { LegalText } from "@/components";
import { PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

useHead(extractHead(PAGE_CONTENT.legal.termsOfUse.head), { mode: "client" });
</script>

<template>
  <NuxtLayout name="legal">
    <LegalText :text="PAGE_CONTENT.legal.termsOfUse" />
  </NuxtLayout>
</template>
