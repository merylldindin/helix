<script lang="ts" setup>
import { inject } from "vue";
import { useDisplay } from "vuetify";

import { CustomButton, CustomText } from "@/components";
import { LAYOUT_CONTENT } from "@/content";
import { IconName } from "@/types";

import { useCookie } from "#app";

const { xs } = useDisplay();

const isTracking = useCookie<boolean>("_ga_tracking");
isTracking.value = isTracking.value || false;

const dismissBanner = () => {
  isTracking.value = true;
};

const CustomIcons = inject("CustomIcons") as Record<IconName, string>;
</script>

<template>
  <v-slide-y-transition>
    <v-card v-if="!isTracking" class="cookie-banner custom-shadow">
      <CustomText
        :text="
          xs
            ? LAYOUT_CONTENT.cookieBanner.disclaimer.mobile
            : LAYOUT_CONTENT.cookieBanner.disclaimer.desktop
        "
        typography="text-1 text-mine-shaft"
      />

      <v-spacer />

      <CustomButton class="ml-6" icon @click="dismissBanner">
        <v-icon size="x-large" :icon="CustomIcons.COOKIE_CHECK" />
      </CustomButton>
    </v-card>
  </v-slide-y-transition>
</template>

<style lang="scss" scoped>
.cookie-banner {
  top: 1.5rem;
  left: 0;
  right: 0;
  position: absolute;
  background-color: rgb(var(--v-theme-lemon));
  margin: 0 auto 16px;
  padding: 1.5rem 2rem;
  max-width: min(70rem, calc(100% - 32px));
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  z-index: 999;

  @include md-down {
    padding: 1rem 1.5rem;
  }
}

.button-wrapper {
  display: flex;
  align-self: center;
  justify-content: flex-end;
}
</style>
