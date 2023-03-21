<script lang="ts" setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";

import { CustomButton, CustomText } from "@/components/shared";
import { LAYOUT_CONTENT } from "@/content";

import { useCookie } from "#app";

const { xs } = useDisplay();

const isTracking = useCookie<boolean>("_ga_tracking");
isTracking.value = isTracking.value || false;

const dismissBanner = () => {
  isTracking.value = true;
};

const cookieBannerText = computed(() => {
  return xs.value
    ? LAYOUT_CONTENT.cookieBanner.disclaimer.mobile
    : LAYOUT_CONTENT.cookieBanner.disclaimer.desktop;
});
</script>

<template>
  <v-slide-y-transition>
    <v-card v-if="!isTracking" class="cookie-banner custom-shadow">
      <CustomText :text="cookieBannerText" typography="text-1 text-mine-shaft" />

      <v-spacer />

      <CustomButton
        class="ml-6"
        v-bind="LAYOUT_CONTENT.cookieBanner.button"
        @click="dismissBanner"
      />
    </v-card>
  </v-slide-y-transition>
</template>

<style lang="scss" scoped>
.cookie-banner {
  bottom: 0;
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
