<script lang="ts" setup>
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomText } from "@/components/shared";

defineProps({
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
</script>

<template>
  <CustomHeadline
    class="legal-title"
    :level="1"
    :text="text.title"
    typography="headline-3"
  />

  <CustomHeadline
    class="legal-date"
    :level="2"
    :text="text.date"
    typography="headline-6"
  />

  <div v-for="(chunk, index) in text.content" :key="index">
    <CustomHeadline
      v-if="chunk.type === LegalTextType.SUBTITLE"
      :class="smAndDown ? 'mb-6' : 'mb-8'"
      :level="3"
      :text="(chunk.content as string)"
      typography="headline-5"
      underlined
    />

    <CustomText
      v-else
      :class="smAndDown ? 'mb-4' : 'mb-6'"
      :text="(chunk.content as object)"
      typography="text-1"
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
