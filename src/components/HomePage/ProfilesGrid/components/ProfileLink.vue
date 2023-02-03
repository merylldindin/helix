<script setup lang="ts">
import { PropType } from "vue";

import { CustomImage, CustomLink } from "@/components";
import { DeliveredImage, ExternalLink } from "@/types";

defineProps({
  link: {
    required: true,
    type: Object as PropType<ExternalLink>,
  },
  logo: {
    required: true,
    type: Object as PropType<DeliveredImage>,
  },
});
</script>

<template>
  <CustomLink v-bind="link">
    <div class="custom-shadow link-support">
      <CustomImage :image="logo" class="link-logo" />
    </div>
  </CustomLink>
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

.link-logo {
  max-width: 36px;
  max-height: 36px;
}
</style>
