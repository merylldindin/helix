<script lang="ts" setup>
import { computed } from "vue";

import { CustomDefinition } from "@/components/shared";

interface TextSegment {
  content: string;
  definition?: string;
  term?: string;
  type: "term" | "text";
}

const cProps = defineProps({
  text: {
    required: true,
    type: String,
  },
});

const DEFINITION_TOKEN = /\[\[(.+?)::(.+?)\]\]/g;

const segments = computed<TextSegment[]>(() => {
  const parts: TextSegment[] = [];
  let cursor = 0;

  for (const match of cProps.text.matchAll(DEFINITION_TOKEN)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      parts.push({ content: cProps.text.slice(cursor, start), type: "text" });
    }
    parts.push({
      content: match[1] ?? "",
      definition: match[2] ?? "",
      term: match[1] ?? "",
      type: "term",
    });
    cursor = start + match[0].length;
  }

  if (cursor < cProps.text.length) {
    parts.push({ content: cProps.text.slice(cursor), type: "text" });
  }

  return parts;
});
</script>

<template>
  <p
    ><template v-for="(segment, index) in segments" :key="index"
      ><CustomDefinition
        v-if="segment.type === 'term'"
        :definition="segment.definition ?? ''"
        :term="segment.term ?? ''" /><template v-else>{{
        segment.content
      }}</template></template
    ></p
  >
</template>
