<template>
  <div id="app">
    <v-app class="application-wrapper">
      <NuxtPage />

      <CookieBanner />
    </v-app>
  </div>
</template>

<script lang="ts">
import { CookieBanner } from "@/components";
import { ColorName } from "@/plugins/vuetify.client/colors";
import { CustomIcons } from "@/plugins/vuetify.client/icons";

export default {
  components: {
    CookieBanner,
  },
  provide: {
    COLOR: ColorName,
    ICON: CustomIcons,
  },
};
</script>

<style lang="scss" scoped>
.application-wrapper {
  background-color: rgb(var(--v-theme-mine-shaft));
  color: rgb(var(--v-theme-foam));
}
</style>
