<script lang="ts" setup>
import { PropType } from "vue";
import { useDisplay } from "vuetify";

import LearnMore from "@/assets/animations/learn-more.json";
import { CustomHeadline, CustomImage, CustomLink } from "@/components/shared";
import { ContentType, GenericContent } from "@/types";

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
      <CustomLink
        v-if="item.type === ContentType.ARTICLE"
        class="d-flex flex-column"
        :class="{ 'mt-5': index > 0 }"
        external
        rel="noopener noreferrer nofollow external"
        target="_blank"
        :to="item.prop.href"
      >
        <p class="text-1 mb-2 text-ellipsis"> {{ item.prop.title }} </p>

        <p class="text-2 text-blue-grey-darken-2"> {{ item.prop.description }} </p>
      </CustomLink>

      <CustomLink
        v-else-if="item.type === ContentType.BUTTON"
        v-bind="item.prop"
        class="font-weight-bold text-0 text-uppercase d-flex button-action"
        :class="{ 'mt-4 mb-6': index > 0 }"
      />

      <CustomImage
        v-else-if="item.type === ContentType.IMAGE"
        :class="{
          'mt-6': smAndDown && index > 0,
          'mb-6': smAndDown && index < content.length - 1,
          'mt-12': !smAndDown && index > 0,
          'mb-12': !smAndDown && index < content.length - 1,
        }"
        :image="item.prop"
      />

      <CustomHeadline
        v-else-if="item.type === ContentType.HEADLINE"
        v-bind="item.prop"
        :class="{ 'mt-3': index > 0 }"
      />

      <div v-else-if="item.type === ContentType.MORE" class="more-link">
        <CustomLink v-bind="item.prop">
          <client-only>
            <Vue3Lottie :animation-data="LearnMore" pause-on-hover :width="'120px'" />
          </client-only>
        </CustomLink>
      </div>

      <div v-else-if="item.type === ContentType.SOCIALS" :class="{ 'mt-3': index > 0 }">
        <CustomLink
          v-for="platform in item.prop"
          :key="platform.icon"
          v-bind="platform"
          class="mr-6 align-self-center"
          :color="$COLOR.PRIMARY"
          :prompt="undefined"
          size="large"
        />
      </div>

      <p
        v-else-if="item.type === ContentType.TEXT"
        class="text-0"
        :class="{ 'mt-3': index > 0 }"
      >
        {{ item.prop }}
      </p>

      <div
        v-else-if="item.type === ContentType.YOUTUBE"
        class="youtube-player"
        :class="{
          'mt-6': smAndDown && index > 0,
          'mb-6': smAndDown && index < content.length - 1,
          'mt-12': !smAndDown && index > 0,
          'mb-12': !smAndDown && index < content.length - 1,
        }"
      >
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          :frameborder="0"
          height="315"
          :src="item.prop"
          title="YouTube video player"
          width="560"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.more-link {
  display: flex;
  margin-top: -20px;
  margin-bottom: -40px;
  margin-left: -20px;
  justify-content: flex-start;
}

.youtube-player {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
