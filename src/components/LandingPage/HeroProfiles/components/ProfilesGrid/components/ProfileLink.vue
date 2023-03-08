<script setup lang="ts">
import { PropType } from "vue";

import { CustomLink } from "@/components/shared";
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
</script>

<template>
  <v-tooltip :aria-label="link.ariaLabel" location="top" :text="description">
    <template #activator="{ props }">
      <CustomLink v-bind="link">
        <div class="custom-shadow link-support">
          <v-icon v-bind="props" :icon="$ICON[icon as IconName]" size="large" />
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
  background-color: rgb(var(--v-theme-mine-shaft));
  align-items: center;
  justify-content: center;
}
</style>
