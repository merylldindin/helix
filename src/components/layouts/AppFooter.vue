<script lang="ts" setup>
import { useDisplay } from "vuetify";

import { CustomLink } from "@/components/shared";
import { APP_FOOTER_CONTENT } from "@/content";
import type { IconName } from "@/types";

const { smAndDown } = useDisplay();
</script>

<template>
  <v-footer class="py-4 global-footer">
    <v-container>
      <v-row class="ma-0" :justify="smAndDown ? 'space-around' : 'space-between'">
        <div
          v-for="(link, index) in smAndDown
            ? APP_FOOTER_CONTENT.sitemapLinks
            : [...APP_FOOTER_CONTENT.sitemapLinks, ...APP_FOOTER_CONTENT.legalLinks]"
          :key="index"
        >
          <CustomLink v-bind="link" typography="text-cartesian text-2 text-foam" />
        </div>

        <div v-if="!smAndDown" class="global-copyright">
          <span class="text-cartesian text-2 text-foam">
            {{ APP_FOOTER_CONTENT.copyright }}
          </span>
        </div>
      </v-row>

      <v-row v-if="smAndDown" class="mx-0 my-6" justify="space-around">
        <div v-for="(link, index) in APP_FOOTER_CONTENT.legalLinks" :key="index">
          <CustomLink v-bind="link" typography="text-cartesian text-2 text-foam" />
        </div>

        <div class="global-copyright">
          <span class="text-cartesian text-2 text-foam">
            {{ APP_FOOTER_CONTENT.copyright }}
          </span>
        </div>
      </v-row>

      <v-divider class="my-4" :color="$COLOR.FOAM" />

      <v-row justify="space-between">
        <v-col
          v-for="(profile, index) in APP_FOOTER_CONTENT.socialsLinks"
          :key="index"
          class="text-center"
          cols="3"
          sm="auto"
        >
          <CustomLink v-bind="profile.link" class="grid-link">
            <v-icon
              :color="$COLOR.FOAM"
              :icon="$ICON[profile.icon as IconName]"
              size="small"
            />
          </CustomLink>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
.global-footer {
  z-index: 1000;
  background-color: rgb(var(--v-theme-slate-gray)) !important;
  scroll-snap-align: start;
}

.global-copyright {
  @include xs-only {
    text-align: end;
  }
}
</style>
