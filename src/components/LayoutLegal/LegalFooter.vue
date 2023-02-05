<script lang="ts" setup></script>

<template>
  <v-footer app class="mt-10">
    <v-row justify="center" class="legal-footer">
      <v-col class="text-center my-8" cols="12">
        <span class="text-1 text-foam">
          {{ new Date().getFullYear() }} — © Meryll Dindin
        </span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style lang="scss" scoped>
.legal-footer {
  background-color: rgb(var(--v-theme-foam)) !important;
}
</style>
