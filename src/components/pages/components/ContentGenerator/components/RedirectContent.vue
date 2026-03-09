<script lang="ts" setup>
import type { PropType } from "vue";
import { computed } from "vue";
import { useTheme } from "vuetify";

import LearnMore from "@/assets/animations/learn-more.json";
import { CustomLink } from "@/components/shared";
import type { ButtonItem } from "@/types";
import { cloneLottieWithColor } from "@/utils/lottie";

defineProps({
  link: {
    required: true,
    type: Object as PropType<ButtonItem>,
  },
});

const theme = useTheme();

const learnMoreColor = computed(() => {
  const primaryColor = theme.current.value.colors.primary;

  return typeof primaryColor === "string" ? primaryColor : "#040707";
});

const learnMoreAnimation = computed(() => {
  return cloneLottieWithColor(LearnMore, learnMoreColor.value);
});
</script>

<template>
  <div class="more-link">
    <CustomLink v-bind="link">
      <client-only>
        <Vue3Lottie
          :key="learnMoreColor"
          :animation-data="learnMoreAnimation"
          pause-on-hover
          :width="'120px'"
        />
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
