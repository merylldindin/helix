<template>
  <v-container v-if="!isTracking" class="cookie-banner custom-shadow">
    <v-row>
      <v-col cols="10">
        <CustomText :text="APP_CONTENT.cookieBanner.text" />
      </v-col>

      <v-col cols="2" class="button-wrapper">
        <v-btn variant="tonal" @click="dismissBanner">
          {{ APP_CONTENT.cookieBanner.action }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { CustomText } from "@/components";
import { APP_CONTENT } from "@/content";

import { useCookie } from "#app";

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
  background: rgb(var(--v-theme-mine-shaft));
  margin: 0 auto 1rem;
  max-width: min(50rem, 90%);
  padding: 1rem 2rem;
}

.button-wrapper {
  display: flex;
  align-self: center;
  justify-content: flex-end;
}
</style>
