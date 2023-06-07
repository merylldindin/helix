<script lang="ts" setup>
import { PropType } from "vue";

import { CustomHeadline, CustomImage, CustomLink } from "@/components/shared";
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
      <CustomLink
        v-if="item.type === ContentType.ARTICLE"
        class="d-flex flex-column"
        :class="{ 'mt-5': index > 0 }"
        external
        rel="noopener noreferrer nofollow external"
        target="_blank"
        :to="item.prop.href"
      >
        <p class="text-1 mb-2 text-ellipsis"> {{ item.prop.title }} </p>

        <p class="text-2 text-grey"> {{ item.prop.description }} </p>
      </CustomLink>

      <CustomLink
        v-else-if="item.type === ContentType.BUTTON"
        v-bind="item.prop"
        class="font-weight-bold text-0 text-uppercase d-flex"
        :class="{ 'mt-5': index > 0 }"
      />

      <CustomImage
        v-else-if="item.type === ContentType.IMAGE"
        class="mb-5"
        :class="{ 'mt-5': index > 0 }"
        :image="item.prop"
      />

      <CustomHeadline
        v-else-if="item.type === ContentType.HEADLINE"
        v-bind="item.prop"
        :class="{ 'mt-3': index > 0 }"
      />

      <div v-else-if="item.type === ContentType.MORE" class="more-link">
        <CustomLink
          v-bind="item.prop"
          class="text-2 font-italic d-flex"
          :class="{ 'mt-3': index > 0 }"
        />
      </div>

      <div v-else-if="item.type === ContentType.SOCIALS" :class="{ 'mt-3': index > 0 }">
        <CustomLink
          v-for="platform in item.prop"
          :key="platform.icon"
          v-bind="platform"
          class="mr-6 align-self-center"
          :color="$COLOR.PRIMARY"
          :prompt="undefined"
          size="large"
        />
      </div>

      <p
        v-else-if="item.type === ContentType.TEXT"
        class="text-0"
        :class="{ 'mt-3': index > 0 }"
      >
        {{ item.prop }}
      </p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.more-link {
  display: flex;
  justify-content: flex-end;
}
</style>
