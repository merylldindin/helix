<script lang="ts" setup>
import { PropType } from "vue";
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomSection, CustomText } from "@/components/shared";

enum LegalTextType {
  SUBTITLE = "subtitle",
  PARAGRAPH = "paragraph",
}

defineProps({
  content: {
    required: true,
    type: Array as PropType<{ type: LegalTextType; content: string | Object }[]>,
  },
  date: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
});

const { smAndDown } = useDisplay();
</script>

<template>
  <CustomSection class="pb-12" offset-y>
    <CustomHeadline
      class="legal-title"
      :level="1"
      :text="title"
      typography="headline-3 text-slate-gray"
    />

    <CustomHeadline
      class="legal-date"
      :level="2"
      :text="date"
      typography="headline-6 text-slate-gray"
    />

    <div v-for="(chunk, index) in content" :key="index">
      <CustomHeadline
        v-if="chunk.type === LegalTextType.SUBTITLE"
        :class="smAndDown ? 'mt-6' : 'mt-8'"
        :level="3"
        :text="chunk.content as string"
        typography="headline-5  text-slate-gray"
        underlined
      />

      <CustomText
        v-else
        :class="smAndDown ? 'mt-4' : 'mt-6'"
        :text="chunk.content as object"
        typography="text-1 text-slate-gray"
      />
    </div>
  </CustomSection>
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
