<script lang="ts" setup>
import { useDisplay } from "vuetify";

import SwipeHint from "@/assets/animations/swipe-hint.json";
import { CustomHeadline, CustomImage, CustomLink } from "@/components/shared";
import { ICONS } from "@/plugins/vuetify.client/icons";
import { IconName } from "@/types";

const { smAndDown } = useDisplay();

defineProps({
  grid: {
    required: true,
    type: Object,
  },
  showHint: {
    required: false,
    type: Boolean,
  },
});
</script>

<template>
  <CustomImage
    :aspect-ratio="1"
    class="grid-image"
    :cover="smAndDown"
    :image="grid.background"
  />

  <div class="grid-overlay">
    <client-only>
      <Vue3Lottie
        v-if="showHint"
        :animation-data="SwipeHint"
        class="swipe-hint"
        :width="'5rem'"
      />
    </client-only>
  </div>

  <div class="grid-links">
    <CustomHeadline
      :level="2"
      :text="grid.headline"
      typography="text-cartesian text-foam headline-3 text-uppercase"
    />

    <CustomLink
      v-for="(profile, index) in grid.profiles"
      v-bind="profile.link"
      :key="index"
      class="grid-link"
    >
      <CustomHeadline
        :level="3"
        :text="profile.slug"
        typography="text-foam headline-5"
      />

      <v-icon :color="$COLOR.FOAM" :icon="ICONS[profile.icon as IconName]" />
    </CustomLink>
  </div>
</template>

<style lang="scss" scoped>
.grid-image {
  height: 100%;
  width: 50px;
  position: absolute;

  @include sm-down {
    min-height: 100%;
  }
}

.grid-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 25%);
  z-index: 1;
}

.swipe-hint {
  bottom: 0;
  right: 0;
  transform: rotate(90deg) translateX(33vh);

  @include sm-down {
    transform: rotate(90deg) translateX(36vh);
  }
}

.grid-links {
  max-height: 60vh;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  z-index: 2;
}

.grid-link {
  width: 50vh;
  border-radius: 20px;
  padding: 1rem 4rem;
  background-color: rgba(0 0 0 / 25%);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);

    > .v-icon {
      color: rgb(var(--v-theme-lemon)) !important;
    }
  }

  @include sm-down {
    width: 100%;
  }
}
</style>
