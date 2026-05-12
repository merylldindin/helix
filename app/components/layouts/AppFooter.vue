<script lang="ts" setup>
import { useDisplay } from "vuetify";

import { DARK_THEME_NAME } from "@/plugins/vuetify.client/theme";
import { CustomLink } from "@/components/shared";
import { APP_FOOTER_CONTENT } from "@/content";
import type { IconName } from "@/types";

const { smAndDown } = useDisplay();

const footerLinks = [
  ...APP_FOOTER_CONTENT.sitemapLinks,
  ...APP_FOOTER_CONTENT.legalLinks,
];
</script>

<template>
  <v-footer class="global-footer" color="background" :theme="DARK_THEME_NAME">
    <div class="footer-content">
      <div v-if="!smAndDown" class="footer-links">
        <div v-for="(link, index) in footerLinks" :key="index">
          <CustomLink v-bind="link" typography="text-cartesian text-2 text-foam" />
        </div>

        <div class="global-copyright">
          <span class="text-cartesian text-2 text-foam">
            {{ APP_FOOTER_CONTENT.copyright }}
          </span>
        </div>
      </div>

      <div v-if="smAndDown" class="footer-links footer-mobile-grid">
        <div v-for="(link, index) in footerLinks" :key="index">
          <CustomLink v-bind="link" typography="text-cartesian text-2 text-foam" />
        </div>

        <div class="global-copyright">
          <span class="text-cartesian text-2 text-foam">
            {{ APP_FOOTER_CONTENT.copyright }}
          </span>
        </div>
      </div>

      <v-divider class="footer-divider" :color="$COLOR.FOAM" />

      <div class="footer-socials">
        <div
          v-for="(profile, index) in APP_FOOTER_CONTENT.socialsLinks"
          :key="index"
          class="footer-social"
        >
          <CustomLink v-bind="profile.link" class="grid-link">
            <v-icon
              :color="$COLOR.FOAM"
              :icon="$ICON[profile.icon as IconName]"
              size="small"
            />
          </CustomLink>
        </div>
      </div>
    </div>
  </v-footer>
</template>

<style lang="scss" scoped>
.global-footer {
  padding: 16px 0;
  z-index: 1000;
  scroll-snap-align: start;
}

.footer-content {
  width: 100%;
  max-width: $page-max-width;
  margin: 0 auto;
  padding: 0 $page-padding;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem 2.4rem;
}

.footer-mobile-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  place-items: start center;
  gap: 1.6rem 1.2rem;
  margin: 2.4rem 0;
  text-align: center;
}

.footer-mobile-grid > div,
.footer-mobile-grid > .global-copyright {
  width: 100%;
}

.footer-divider {
  margin: 1.6rem 0;
}

.footer-socials {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @include xs-only {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.footer-social {
  text-align: center;
}

.global-copyright {
  text-align: center;
}
</style>
