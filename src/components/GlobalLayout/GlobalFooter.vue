<script lang="ts" setup>
import { CustomLink } from "@/components/shared";
import { LAYOUT_CONTENT } from "@/content";
</script>

<template>
  <v-footer class="pa-0 global-footer">
    <v-container>
      <v-row class="text-center" justify="center">
        <v-col
          v-for="(link, index) in LAYOUT_CONTENT.globalFooter.links"
          :key="index"
          cols="12"
          sm="auto"
        >
          <CustomLink v-bind="link" typography="text-1 text-foam" />
        </v-col>

        <v-spacer />

        <v-col class="text-center global-copyright" cols="12" sm="auto">
          <span class="text-1 text-foam">
            {{ LAYOUT_CONTENT.globalFooter.copyright }}
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
.global-footer {
  background-color: rgb(var(--v-theme-slate-gray)) !important;
  scroll-snap-align: start;
}

.global-copyright {
  @include sm-down {
    text-align: end;
  }
}
</style>
