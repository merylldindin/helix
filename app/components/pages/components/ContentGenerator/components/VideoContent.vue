<script lang="ts" setup>
import type { PropType } from "vue";

import { CustomVideo } from "@/components/shared";
import type { DeliveredVideo } from "@/types";

defineProps({
  source: {
    required: true,
    type: Object as PropType<DeliveredVideo>,
  },
});
</script>

<template>
  <CustomVideo :video="source" />
</template>
