<script lang="ts" setup>
import { computed } from "vue";
import { useDisplay } from "vuetify";

import { CustomButton, CustomText } from "@/components/shared";
import { COOKIE_BANNER_CONTENT } from "@/content";

import { useCookie } from "#app";

const { xs } = useDisplay();

const isTracking = useCookie<boolean>("_ga_tracking");
isTracking.value = isTracking.value || false;

const dismissBanner = () => {
  isTracking.value = true;
};

const cookieBannerText = computed(() => {
  return xs.value
    ? COOKIE_BANNER_CONTENT.disclaimer.mobile
    : COOKIE_BANNER_CONTENT.disclaimer.desktop;
});
</script>

<template>
  <v-slide-y-transition>
    <v-card v-if="!isTracking" class="cookie-banner custom-shadow">
      <CustomText :text="cookieBannerText" typography="text-1" />

      <v-spacer />

      <CustomButton
        class="ml-6"
        v-bind="COOKIE_BANNER_CONTENT.button"
        @click="dismissBanner"
      />
    </v-card>
  </v-slide-y-transition>
</template>

<style lang="scss" scoped>
.cookie-banner {
  top: 8px;
  left: 0;
  right: 0;
  position: absolute;
  border-radius: 0;
  background-color: rgb(var(--v-theme-slate-gray));
  margin: 0 auto 16px;
  padding: 1.5rem 2rem;
  max-width: min(70rem, calc(100% - 28px));
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
