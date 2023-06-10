<script lang="ts" setup>
import { useDisplay } from "vuetify";

import SwipeHint from "@/assets/animations/swipe-hint.json";
import { CustomHeadline, CustomLink } from "@/components/shared";
import { ICONS } from "@/plugins/vuetify.client/icons";
import { IconName } from "@/types";

defineProps({
  grid: {
    required: true,
    type: Object,
  },
  showHint: {
    default: true,
    type: Boolean,
  },
});

const { mobile } = useDisplay();
</script>

<template>
  <client-only>
    <div class="grid-links">
      <CustomHeadline
        class="title-typography"
        :level="2"
        :text="grid.headline"
        typography="text-foam"
      />

      <CustomLink
        v-for="(profile, index) in grid.profiles"
        v-bind="profile.link"
        :key="index"
        class="grid-link"
      >
        <CustomHeadline
          v-if="!mobile"
          class="link-typography"
          :level="3"
          :text="profile.slug"
          typography="text-foam"
        />

        <span v-else class="text-1 text-foam"> {{ profile.slug }} </span>

        <v-icon
          :color="$COLOR.FOAM"
          :icon="ICONS[profile.icon as IconName]"
          :size="'3vh'"
        />
      </CustomLink>

      <Vue3Lottie
        v-if="showHint"
        :animation-data="SwipeHint"
        class="swipe-hint"
        :width="mobile ? '12vw' : '5vh'"
      />
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
.grid-links {
  height: calc(66vh - 12vh);
  width: calc(100% - 12vw);
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 6vh 6vw;

  @include xs-only {
    height: calc(100% - 64px);
    width: calc(100% - 32px);
    padding: 16px;
  }
}

.title-typography {
  font-size: 3.5vh !important;
  margin-bottom: 3vh;
}

.grid-link {
  width: 100%;
  border-radius: 3vh;
  padding: 1vh 4vh;
  margin-bottom: 2.5vh;
  align-items: center;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  background-color: rgba(255 255 255 / 10%);

  &:hover {
    background-color: rgba(255 255 255 / 25%);
  }

  @include xs-only {
    width: calc(100% - 96px);
  }
}

.link-typography {
  font-family: "Lexend Deca", Arial, sans-serif !important;
  font-size: 2vh !important;
}

.swipe-hint {
  left: 0;
  right: 0;
  bottom: 3vh;
  position: absolute;
  transform: rotate(90deg) translateX(calc(33vh - 2.5vh));

  @include xs-only {
    transform: rotate(90deg) translateX(36vh);
  }
}
</style>