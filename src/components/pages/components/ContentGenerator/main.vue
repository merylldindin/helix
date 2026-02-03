<script lang="ts" setup>
import type { PropType } from "vue";
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomImage, CustomLink } from "@/components/shared";
import type { GenericContent } from "@/types";
import { ContentType } from "@/types";

import {
  ArticleContent,
  NetworksContent,
  RedirectContent,
  ReferenceContent,
  SocialsContent,
  YoutubeContent,
} from "./components";

defineProps({
  content: {
    default: () => [],
    type: Array as PropType<GenericContent[]>,
  },
});

const { smAndDown } = useDisplay();

const getMarginFromTypography = (typography: string, index: number) => {
  const headlineMatch = typography.match(/headline-(\d)/);
  if (!headlineMatch?.[1]) return "";

  const headlineNumber = parseInt(headlineMatch[1]);

  const marginMappings: Record<number, object> = {
    1: { "mb-9": true, "mt-12": index > 0 },
    2: { "mb-8": true, "mt-10": index > 0 },
    3: { "mb-6": true, "mt-9": index > 0 },
    4: { "mb-5": true, "mt-7": index > 0 },
    5: { "mb-4": true, "mt-6": index > 0 },
    6: { "mb-3": true, "mt-4": index > 0 },
  };

  return marginMappings[headlineNumber] || "";
};
</script>

<template>
  <div>
    <template v-for="(item, index) in content" :key="index">
      <CustomHeadline
        v-if="item.type === ContentType.HEADLINE"
        v-bind="item.prop"
        :class="getMarginFromTypography(item.prop.typography, index)"
      />

      <p
        v-else-if="item.type === ContentType.TEXT"
        class="text-0"
        :class="{ 'mt-3': index > 0 }"
      >
        {{ item.prop }}
      </p>

      <CustomImage
        v-else-if="item.type === ContentType.IMAGE"
        :class="smAndDown ? 'my-6' : 'my-12'"
        :image="item.prop"
      />

      <CustomLink
        v-else-if="item.type === ContentType.BUTTON"
        v-bind="item.prop"
        class="mt-4 mb-6 font-weight-bold text-0 text-uppercase d-flex button-action"
      />

      <ArticleContent
        v-else-if="item.type === ContentType.ARTICLE"
        :article="item.prop"
        class="mb-3"
      />

      <NetworksContent
        v-else-if="item.type === ContentType.NETWORKS"
        v-bind="item.prop"
        :has-more-content="index < content.length - 1"
      />

      <RedirectContent v-else-if="item.type === ContentType.MORE" :link="item.prop" />

      <ReferenceContent
        v-else-if="item.type === ContentType.REFERENCE"
        :reference="item.prop"
      />

      <SocialsContent
        v-else-if="item.type === ContentType.SOCIALS"
        :platforms="item.prop"
      />

      <YoutubeContent
        v-else-if="item.type === ContentType.YOUTUBE"
        :source="item.prop"
      />
    </template>
  </div>
</template>
