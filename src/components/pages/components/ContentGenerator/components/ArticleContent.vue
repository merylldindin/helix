<script lang="ts" setup>
import type { PropType } from "vue";

import { CustomLink } from "@/components/shared";
import type { ArticleItem } from "@/types";

defineProps({
  article: {
    required: true,
    type: Object as PropType<ArticleItem>,
  },
});
</script>

<template>
  <CustomLink
    class="d-flex flex-column"
    rel="noopener noreferrer nofollow external"
    target="_blank"
    :to="article.href"
  >
    <p class="text-1 mb-2 text-ellipsis">
      {{ article.title }}
    </p>

    <p class="article-description text-2">
      {{ article.description }}
    </p>
  </CustomLink>
</template>

<style lang="scss" scoped>
.article-description {
  color: rgb(var(--v-theme-primary) / 68%);
}
</style>
