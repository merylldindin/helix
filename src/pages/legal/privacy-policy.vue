<script lang="ts" setup>
import { LegalText } from "@/components";
import { PAGE_CONTENT } from "@/content";

import { definePageMeta } from "#imports";
// import { extractHead } from "@/utils/meta";

// useHead(extractHead(PAGE_CONTENT.legal.privacyPolicy.head), { mode: "client" });

definePageMeta({
  description: "Welcome to my website",
  title: "Privacy Policy",
});
</script>

<template>
  <NuxtLayout name="legal">
    <LegalText :text="PAGE_CONTENT.legal.privacyPolicy" />
  </NuxtLayout>
</template>
