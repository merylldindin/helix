<script lang="ts" setup>
import { useHead } from "@unhead/vue";

import { CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

const props = defineProps({
  error: {
    required: true,
    type: Object,
  },
});

useHead(extractHead(CONTENT.error.head), { mode: "client" });
</script>

<template>
  <div id="error">
    <v-app class="error-wrapper">
      <NuxtLayout name="error">
        <v-card class="custom-shadow" color="lemon">
          <v-card-title class="headline--1">
            {{ props.error.message }}
          </v-card-title>

          <v-card-text>
            {{ props.error.statusCode }}
          </v-card-text>

          <v-card-actions>
            <CustomButton block prompt="Home" />
          </v-card-actions>
        </v-card>
      </NuxtLayout>
    </v-app>
  </div>
</template>

<style lang="scss" scoped>
.error-wrapper {
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
