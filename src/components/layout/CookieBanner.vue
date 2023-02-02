<script lang="ts" setup>
import { useDisplay } from "vuetify";

import { CustomButton, CustomText } from "@/components";
import { CONTENT } from "@/content";
import { CustomIcons } from "@/plugins/vuetify.client/icons";

import { useCookie } from "#app";

const { smAndDown } = useDisplay();

const isTracking = useCookie<boolean>("_ga_tracking");
isTracking.value = isTracking.value || false;

const dismissBanner = () => {
  isTracking.value = true;
};
</script>

<template>
  <v-slide-y-transition>
    <v-card v-if="!isTracking" class="cookie-banner custom-shadow">
      <CustomText
        :text="
          smAndDown
            ? CONTENT.app.cookieBanner.disclaimer.mobile
            : CONTENT.app.cookieBanner.disclaimer.desktop
        "
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
  bottom: 1rem;
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
