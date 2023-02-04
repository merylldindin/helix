<script setup lang="ts">
import { PropType, inject } from "vue";

import { CustomLink } from "@/components";
import { ExternalLink, IconName } from "@/types";

defineProps({
  description: {
    required: true,
    type: String,
  },
  icon: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: Object as PropType<ExternalLink>,
  },
});

const CustomIcons = inject("CustomIcons") as Record<IconName, string>;
</script>

<template>
  <v-tooltip :text="description" location="top">
    <template #activator="{ props }">
      <CustomLink v-bind="link">
        <div class="custom-shadow link-support">
          <v-icon v-bind="props" size="large" :icon="CustomIcons[icon as IconName]" />
        </div>
      </CustomLink>
    </template>
  </v-tooltip>
</template>

<style lang="scss" scoped>
.link-support {
  width: 48px;
  height: 48px;
  display: flex;
  border-radius: 100%;
  border: 1px solid rgb(var(--v-theme-mine-shaft));
  align-items: center;
  justify-content: center;
}
</style>
