<script lang="ts" setup>
import { PropType } from "vue";

import { GenericContent } from "@/types";

defineProps({
  platforms: {
    default: () => [],
    type: Array as PropType<GenericContent[]>,
  },
});
</script>

<template>
  <div>
    <CustomLink
      v-for="platform in platforms"
      :key="platform.icon"
      v-bind="platform"
      class="mr-6 align-self-center"
      :color="$COLOR.PRIMARY"
      :prompt="undefined"
      size="large"
    />
  </div>
</template>
