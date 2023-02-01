<template>
  <v-slide-y-transition>
    <v-container v-if="!isTracking" class="cookie-banner custom-shadow">
      <v-row>
        <v-col cols="12" md="10">
          <CustomText
            :text="
              smAndDown
                ? APP_CONTENT.cookieBanner.disclaimer.mobile
                : APP_CONTENT.cookieBanner.disclaimer.desktop
            "
          />
        </v-col>

        <v-col cols="12" md="2" class="button-wrapper">
          <v-btn
            variant="tonal"
            :block="$vuetify.display.smAndDown"
            @click="dismissBanner"
          >
            {{ APP_CONTENT.cookieBanner.action }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-slide-y-transition>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

import { CustomText } from "@/components";
import { APP_CONTENT } from "@/content";

import { useCookie } from "#app";

const { smAndDown } = useDisplay();

const isTracking = useCookie<boolean>("_ga_tracking");
isTracking.value = isTracking.value || false;

const dismissBanner = () => {
  isTracking.value = true;
};
</script>

<style lang="scss" scoped>
.cookie-banner {
  bottom: 1rem;
  left: 0;
  right: 0;
  position: absolute;
  background-color: rgb(var(--v-theme-mine-shaft));
  margin: 0 auto 0.5rem;
  padding: 2rem;
  max-width: min(50rem, 90%);
  transition: all 0.2s ease;

  @include sm-down {
    padding: 1rem;
  }
}

.button-wrapper {
  display: flex;
  align-self: center;
  justify-content: flex-end;

  @include sm-down {
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>
