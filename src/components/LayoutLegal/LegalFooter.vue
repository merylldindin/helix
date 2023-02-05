<script lang="ts" setup>
import { CustomLink } from "@/components";
import { LAYOUT_CONTENT } from "@/content";
</script>

<template>
  <v-footer class="pa-0">
    <v-container>
      <v-row justify="center" class="legal-footer">
        <v-col
          v-for="(link, index) in LAYOUT_CONTENT.legalFooter.links"
          :key="index"
          cols="12"
          sm="auto"
        >
          <CustomLink v-bind="link" typography="text-1 text-mine-shaft" />
        </v-col>

        <v-spacer />

        <v-col cols="12" sm="auto" class="legal-copyright">
          <span class="text-1 text-mine-shaft">
            {{ LAYOUT_CONTENT.legalFooter.copyright }}
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
.legal-footer {
  background-color: rgb(var(--v-theme-foam)) !important;
}

.legal-copyright {
  @include sm-down {
    text-align: end;
  }
}
</style>
