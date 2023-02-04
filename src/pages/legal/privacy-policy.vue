<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomText } from "@/components";
import { PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

enum LegalTextType {
  SUBTITLE = "subtitle",
  PARAGRAPH = "paragraph",
}

const { smAndDown } = useDisplay();

useHead(extractHead(PAGE_CONTENT.legal.privacyPolicy.head), { mode: "client" });
</script>

<template>
  <NuxtLayout name="legal-layout">
    <section>
      <CustomHeadline
        :level="1"
        :class="smAndDown ? 'my-6' : 'my-8'"
        typography="headline-3"
        :text="PAGE_CONTENT.legal.privacyPolicy.title"
      />

      <CustomHeadline
        :level="2"
        :class="smAndDown ? 'mb-6' : 'mb-8'"
        typography="headline-6"
        :text="PAGE_CONTENT.legal.privacyPolicy.date"
      />

      <div
        v-for="(chunk, index) in PAGE_CONTENT.legal.privacyPolicy.content"
        :key="index"
      >
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
    </section>
  </NuxtLayout>
</template>
