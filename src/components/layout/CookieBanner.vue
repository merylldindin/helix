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
    <v-container v-if="!isTracking" class="cookie-banner custom-shadow">
      <v-row>
        <v-col cols="12" md="10">
          <CustomText
            :text="
              smAndDown
                ? CONTENT.app.cookieBanner.disclaimer.mobile
                : CONTENT.app.cookieBanner.disclaimer.desktop
            "
          />
        </v-col>

        <v-col cols="12" md="2" class="button-wrapper">
          <CustomButton icon :block="smAndDown" @click="dismissBanner">
            <v-icon size="x-large" :icon="CustomIcons.COOKIE_CHECK" />
          </CustomButton>
        </v-col>
      </v-row>
    </v-container>
  </v-slide-y-transition>
</template>

<style lang="scss" scoped>
.cookie-banner {
  bottom: 1rem;
  left: 0;
  right: 0;
  position: absolute;
  background-color: rgb(var(--v-theme-lemon));
  color: rgb(var(--v-theme-mine-shaft));
  margin: 0 auto 0.5rem;
  padding: 2rem;
  max-width: min(70rem, 90%);
  transition: all 0.2s ease;
  border-radius: 4px;

  @include md-down {
    padding: 1.5rem;
  }
}

.button-wrapper {
  display: flex;
  align-self: center;
  justify-content: flex-end;

  @include sm-down {
    justify-content: center;
  }
}
</style>
