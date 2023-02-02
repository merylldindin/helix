<script lang="ts" setup>
import { CustomLink } from "@/components";
import { TextChunkType } from "@/types";

defineProps({
  text: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <p>
    <span v-for="(item, index) in text" :key="index">
      <span v-if="item.type === TextChunkType.PARAGRAPH">
        {{ item.content }}
      </span>

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
        v-bind="item.props"
      />
    </span>
  </p>
</template>
