<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useDisplay } from "vuetify";

import { CustomText } from "@/components/shared";
import { COOKIE_BANNER_CONTENT } from "@/content";
import type { ColorName, IconName } from "@/types";

const DEFAULT_GA_TRACKING_KEY = "_hx_tracking";

const isTracking = ref(false);

onMounted(() => {
  if (localStorage.getItem(DEFAULT_GA_TRACKING_KEY) === "true") {
    isTracking.value = true;
  }
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
      <div class="custom-shadow cookie-wrapper">
        <CustomText class="cookie-text" :text="cookieBannerText" typography="text-2" />

        <v-btn
          :aria-label="COOKIE_BANNER_CONTENT.button.ariaLabel"
          class="cookie-button"
          icon
          variant="tonal"
          @click="dismissBanner"
        >
          <v-icon
            :color="COOKIE_BANNER_CONTENT.button.color as ColorName"
            :icon="$ICON[COOKIE_BANNER_CONTENT.button.icon as IconName]"
            size="x-large"
          />
        </v-btn>
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
  background-color: rgb(var(--v-theme-surface));
  margin: 0 auto 16px;
  max-width: min(70rem, calc(100% - 28px));
  transition: all 0.2s ease;
  display: flex;
  flex-direction: row;
  z-index: 999;
  overflow: initial;
}

.cookie-wrapper {
  display: flex;
  align-items: center;
  gap: 2.4rem;
  padding: 1.5rem 2rem;

  @include md-down {
    padding: 1rem 1.5rem;
  }
}

.cookie-text {
  flex: 1;
}

.cookie-button {
  margin-left: auto;
}
</style>
