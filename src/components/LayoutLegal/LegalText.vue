<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomText } from "@/components";
import { extractHead } from "@/utils/meta";

const props = defineProps({
  text: {
    required: true,
    type: Object,
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
    class="legal-title"
    typography="headline-3"
    :text="text.title"
  />

  <CustomHeadline
    :level="2"
    class="legal-date"
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

<style lang="scss" scoped>
.legal-title {
  margin-bottom: 2rem;
}

.legal-date {
  margin-bottom: 8rem;

  @include sm-down {
    margin-bottom: 4rem;
  }
}
</style>
