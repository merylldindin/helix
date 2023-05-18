<script lang="ts" setup>
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

      <Vue3Lottie
        v-if="showHint"
        :animation-data="SwipeHint"
        class="swipe-hint"
        :width="'5vh'"
      />
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
.grid-links {
  height: 100%;
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

  @include xs-only {
    transform: rotate(90deg) translateX(36vh);
  }
}

.grid-link {
  min-width: 33vh;
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

  @include xs-only {
    min-width: 66vw;
  }
}

.title-typography {
  font-size: 3.5vh !important;
}

.link-typography {
  font-size: 2vh !important;
}
</style>
