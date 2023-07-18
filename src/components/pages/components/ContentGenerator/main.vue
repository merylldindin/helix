<script lang="ts" setup>
import { PropType } from "vue";
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomImage, CustomLink } from "@/components/shared";
import { ContentType, GenericContent } from "@/types";

import {
  ArticleContent,
  NetworksContent,
  RedirectContent,
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
</script>

<template>
  <div>
    <template v-for="(item, index) in content" :key="index">
      <CustomHeadline
        v-if="item.type === ContentType.HEADLINE"
        v-bind="item.prop"
        :class="{ 'mt-3': index > 0 }"
      />

      <p v-else-if="item.type === ContentType.TEXT" class="text-0">
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
      />

      <RedirectContent v-else-if="item.type === ContentType.MORE" :link="item.prop" />

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
