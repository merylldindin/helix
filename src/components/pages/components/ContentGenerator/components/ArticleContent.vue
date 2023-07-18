<script lang="ts" setup>
import { PropType } from "vue";

import { CustomLink } from "@/components/shared";
import { ArticleItem } from "@/types";

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
    external
    rel="noopener noreferrer nofollow external"
    target="_blank"
    :to="article.href"
  >
    <p class="text-1 mb-2 text-ellipsis"> {{ article.title }} </p>

    <p class="text-2 text-blue-grey-darken-2"> {{ article.description }} </p>
  </CustomLink>
</template>
