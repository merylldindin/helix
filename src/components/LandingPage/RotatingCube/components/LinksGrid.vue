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
    <div class="h-100 w-100 d-flex flex-column">
      <client-only>
        <Vue3Lottie
          v-if="showHint"
          :animation-data="SwipeHint"
          class="swipe-hint"
          :width="'5vh'"
        />
      </client-only>
    </div>
  </div>

  <div class="grid-links">
    <CustomHeadline
      class="title-typography"
      :level="2"
      :text="grid.headline"
      typography="text-cartesian text-foam text-uppercase"
    />

    <CustomLink
      v-for="(profile, index) in grid.profiles"
      v-bind="profile.link"
      :key="index"
      class="grid-link"
    >
      <CustomHeadline
        class="link-typography"
        :level="3"
        :text="profile.slug"
        typography="text-foam"
      />

      <v-icon
        :color="$COLOR.FOAM"
        :icon="ICONS[profile.icon as IconName]"
        :size="'3vh'"
      />
    </CustomLink>
  </div>
</template>

<style lang="scss" scoped>
.grid-image {
  height: 100%;
  width: 50px;
  position: absolute;
  z-index: 0;

  @include sm-down {
    min-height: 100%;
  }
}

.grid-overlay {
  position: absolute;
  width: 100%;
  height: 66vh;
  background-color: rgb(0 0 0 / 25%);
  overflow: hidden;
  z-index: 1;

  @include sm-down {
    height: 100%;
  }
}

.grid-links {
  height: calc(66vh - 6vh);
  padding-top: 6vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  z-index: 2;
}

.swipe-hint {
  position: absolute;
  right: 0;
  left: 0;
  transform: rotate(90deg) translateX(calc(33vh - 2.5vh));

  @include sm-down {
    transform: rotate(90deg) translateX(36vh);
  }
}

.grid-link {
  width: 50vh;
  border-radius: 3vh;
  padding: 1vh 4vh;
  align-items: center;
  background-color: rgba(0 0 0 / 25%);
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  z-index: 3;

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

.title-typography {
  font-size: 4vh !important;
}

.link-typography {
  font-size: 2vh !important;
}
</style>
