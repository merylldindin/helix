<script lang="ts" setup>
import { TextChunkType } from "@/types";

import CustomLink from "./CustomLink.vue";

defineProps({
  text: {
    required: true,
    type: Object,
  },
  typography: {
    default: "text-1",
    type: String,
  },
});
</script>

<template>
  <p>
    <span v-for="(item, index) in text" :key="index" :class="typography">
      <template v-if="item.type === TextChunkType.PARAGRAPH">
        {{ item.content }}
      </template>

      <b v-else-if="item.type === TextChunkType.BOLD">
        {{ item.content }}
      </b>

      <i v-else-if="item.type === TextChunkType.ITALIC">
        {{ item.content }}
      </i>

      <u v-else-if="item.type === TextChunkType.UNDERLINE">
        {{ item.content }}
      </u>

      <CustomLink
        v-else-if="item.type === TextChunkType.LINK"
        :prompt="item.content"
        :typography="typography"
        v-bind="item.props"
      />
    </span>
  </p>
</template>
