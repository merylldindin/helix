<script lang="ts" setup>
import { CustomLink } from "@/components/shared";
import { APP_FOOTER_CONTENT } from "@/content";
import { IconName } from "@/types";
</script>

<template>
  <v-footer class="py-4 global-footer">
    <v-container>
      <v-row class="ma-0" justify="space-between">
        <div
          v-for="(link, index) in [
            ...APP_FOOTER_CONTENT.sitemapLinks,
            ...APP_FOOTER_CONTENT.legalLinks,
          ]"
          :key="index"
        >
          <CustomLink v-bind="link" typography="text-cartesian text-2 text-foam" />
        </div>

        <div class="global-copyright">
          <span class="text-cartesian text-2 text-foam">
            {{ APP_FOOTER_CONTENT.copyright }}
          </span>
        </div>
      </v-row>

      <v-divider class="my-4" :color="$COLOR.FOAM" />

      <v-row class="ma-0" justify="space-between">
        <CustomLink
          v-for="(profile, index) in APP_FOOTER_CONTENT.socialsLinks"
          v-bind="profile.link"
          :key="index"
          class="grid-link"
        >
          <v-icon
            :color="$COLOR.FOAM"
            :icon="$ICON[profile.icon as IconName]"
            size="small"
          />
        </CustomLink>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
.global-footer {
  background-color: rgb(var(--v-theme-slate-gray)) !important;
  scroll-snap-align: start;
  z-index: 1000;
}

.global-copyright {
  @include xs-only {
    text-align: end;
  }
}
</style>
