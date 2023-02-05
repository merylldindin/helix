<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomText } from "@/components";
import { extractHead } from "@/utils/meta";

const props = defineProps({
  text: {
    type: Object,
    required: true,
  },
});

enum LegalTextType {
  SUBTITLE = "subtitle",
  PARAGRAPH = "paragraph",
}

const { smAndDown } = useDisplay();

useHead(extractHead(props.text.head), { mode: "client" });
</script>

<template>
  <CustomHeadline
    :level="1"
    :class="smAndDown ? 'my-6' : 'my-8'"
    typography="headline-3"
    :text="text.title"
  />

  <CustomHeadline
    :level="2"
    :class="smAndDown ? 'mb-6' : 'mb-8'"
    typography="headline-6"
    :text="text.date"
  />

  <div v-for="(chunk, index) in text.content" :key="index">
    <CustomHeadline
      v-if="chunk.type === LegalTextType.SUBTITLE"
      :class="smAndDown ? 'mb-6' : 'mb-8'"
      :level="3"
      underlined
      typography="headline-5"
      :text="(chunk.content as string)"
    />

    <CustomText
      v-else
      typography="text-1"
      :text="(chunk.content as object)"
      :class="smAndDown ? 'mb-4' : 'mb-6'"
    />
  </div>
</template>
