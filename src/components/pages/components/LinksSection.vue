<script lang="ts" setup>
import { PropType } from "vue";

import { CustomSection } from "@/components/shared";
import { GenericContent } from "@/types";

import ContentGenerator from "./ContentGenerator/main.vue";

defineProps({
  content: {
    required: true,
    type: Array as PropType<GenericContent[]>,
  },
});
</script>

<template>
  <CustomSection offset-y>
    <ContentGenerator :content="content" />
  </CustomSection>
</template>
