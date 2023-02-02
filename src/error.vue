<script lang="ts" setup>
import { useHead } from "@unhead/vue";

import { CustomLink } from "@/components";
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
        <div class="error-container">
          <p class="text-center headline--1 mb-8">
            {{ props.error.statusCode }}
          </p>

          <CustomLink class="error-actions headline--5" prompt="HOME" to="/" />
        </div>
      </NuxtLayout>
    </v-app>
  </div>
</template>

<style lang="scss" scoped>
.error-wrapper {
  background-color: rgb(var(--v-theme-lemon));
}

.error-container {
  width: min(50rem, calc(100% - 32px));
}

.error-actions {
  display: flex;
  justify-content: center;
}
</style>
