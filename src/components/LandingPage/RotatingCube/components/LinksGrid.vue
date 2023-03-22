<script lang="ts" setup>
import { useDisplay } from "vuetify";

import { CustomHeadline, CustomImage, CustomLink } from "@/components/shared";
import { ICONS } from "@/plugins/vuetify.client/icons";
import { IconName } from "@/types";

const { smAndDown } = useDisplay();

defineProps({
  grid: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <CustomImage class="grid-image" :cover="smAndDown" :image="grid.background" />

  <div class="grid-image grid-overlay" />

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
  position: absolute;
  max-width: 80vh;
  max-height: 80vh;
  transition: all 0.3s ease-in-out;

  @include sm-down {
    min-height: 100%;
  }
}

.grid-overlay {
  position: absolute;
  width: 80vh;
  height: 80vh;
  background-color: rgb(0 0 0 / 25%);
  z-index: 1;
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
