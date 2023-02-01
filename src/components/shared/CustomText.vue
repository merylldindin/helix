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

      <a v-else-if="item.type === TextChunkType.LINK" v-bind="item.props">
        <u>
          {{ item.content }}
        </u>
      </a>
    </span>
  </p>
</template>

<script setup lang="ts">
import { PropType } from "vue";

import { RichText, TextChunkType } from "@/types";

defineProps({
  text: {
    required: true,
    type: Object as PropType<RichText>,
  },
});
</script>
