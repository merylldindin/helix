<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

import { CustomButton, CustomText } from "@/components/shared";
import { COOKIE_BANNER_CONTENT } from "@/content";

const DEFAULT_GA_TRACKING_KEY = "_hx_tracking";

const isTracking = ref(false);
const isMounted = ref(false);

onMounted(() => {
  if (localStorage.getItem(DEFAULT_GA_TRACKING_KEY) === "true") {
    isTracking.value = true;
  }
  isMounted.value = true;
});

const dismissBanner = () => {
  localStorage.setItem(DEFAULT_GA_TRACKING_KEY, "true");
  isTracking.value = true;
};

const { xs } = useDisplay();

const cookieBannerText = computed(() => {
  return xs.value
    ? COOKIE_BANNER_CONTENT.disclaimer.mobile
    : COOKIE_BANNER_CONTENT.disclaimer.desktop;
});
</script>

<template>
  <v-slide-y-transition>
    <v-card v-if="!isTracking" class="cookie-banner">
      <div class="custom-shadow cookie-wrapper d-flex flex-row">
        <CustomText
          class="align-self-center"
          :text="cookieBannerText"
          typography="text-2"
        />

        <v-spacer />

        <CustomButton
          class="ml-6"
          v-bind="COOKIE_BANNER_CONTENT.button"
          @click="dismissBanner"
        />
      </div>
    </v-card>
  </v-slide-y-transition>
</template>

<style lang="scss" scoped>
.cookie-banner {
  top: 8px;
  left: 0;
  right: 0;
  position: fixed;
  border-radius: 0;
  background-color: rgb(var(--v-theme-foam));
  margin: 0 auto 16px;
  max-width: min(70rem, calc(100% - 28px));
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  z-index: 999;
  overflow: initial;
}

.cookie-wrapper {
  padding: 1.5rem 2rem;

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
