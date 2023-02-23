<script lang="ts" setup>
import { LegalText } from "@/components";
import { PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

import { defineWebPage, useSchemaOrg, useSeoMeta } from "#imports";

useSeoMeta(extractHead(PAGE_CONTENT.legal.privacyPolicy.head));

useSchemaOrg(defineWebPage());
</script>

<template>
  <NuxtLayout name="legal">
    <LegalText :text="PAGE_CONTENT.legal.privacyPolicy" />
  </NuxtLayout>
</template>
