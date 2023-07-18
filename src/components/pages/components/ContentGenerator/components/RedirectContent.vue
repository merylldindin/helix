<script lang="ts" setup>
import { PropType } from "vue";

import LearnMore from "@/assets/animations/learn-more.json";
import { CustomLink } from "@/components/shared";
import { ButtonItem } from "@/types";

defineProps({
  link: {
    required: true,
    type: Object as PropType<ButtonItem>,
  },
});
</script>

<template>
  <div class="more-link">
    <CustomLink v-bind="link">
      <client-only>
        <Vue3Lottie :animation-data="LearnMore" pause-on-hover :width="'120px'" />
      </client-only>
    </CustomLink>
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
</style>
