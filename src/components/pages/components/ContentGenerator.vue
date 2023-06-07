<script lang="ts" setup>
import { PropType } from "vue";

import { CustomHeadline, CustomLink } from "@/components/shared";
import { ContentType, GenericContent } from "@/types";

defineProps({
  content: {
    default: () => [],
    type: Array as PropType<GenericContent[]>,
  },
});
</script>

<template>
  <div>
    <template v-for="(item, index) in content" :key="index">
      <CustomHeadline
        v-if="item.type === ContentType.HEADLINE"
        v-bind="item.prop"
        :class="{ 'mt-3': index > 0 }"
      />

      <p
        v-else-if="item.type === ContentType.TEXT"
        class="text-0"
        :class="{ 'mt-3': index > 0 }"
      >
        {{ item.prop }}
      </p>

      <CustomLink
        v-else-if="item.type === ContentType.BUTTON"
        v-bind="item.prop"
        class="font-weight-bold text-0 text-uppercase d-flex"
        :class="{ 'mt-5': index > 0 }"
      />

      <div v-else-if="item.type === ContentType.MORE" class="more-link">
        <CustomLink
          v-bind="item.prop"
          class="text-2 font-italic d-flex"
          :class="{ 'mt-3': index > 0 }"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.more-link {
  display: flex;
  justify-content: flex-end;
}
</style>
