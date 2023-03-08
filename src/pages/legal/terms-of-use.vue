<script lang="ts" setup>
import { LegalText } from "@/components";
import { CustomSection } from "@/components/shared";
import { PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

import { defineWebPage, useSchemaOrg, useSeoMeta } from "#imports";

useSeoMeta(extractHead(PAGE_CONTENT.legal.termsOfUse.head));

useSchemaOrg(defineWebPage());
</script>

<template>
  <NuxtLayout name="global">
    <CustomSection>
      <LegalText :text="PAGE_CONTENT.legal.termsOfUse" />
    </CustomSection>
  </NuxtLayout>
</template>
