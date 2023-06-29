<script lang="ts" setup>
import { computed } from "vue";

import { ErrorButton } from "@/components/layouts";
import { CustomHeadline } from "@/components/shared";
import { ERROR_PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

import { useSeoMeta } from "#imports";

useSeoMeta(
  // @ts-ignore
  extractHead(ERROR_PAGE_CONTENT.head)
);

const cProps = defineProps({
  error: {
    required: true,
    type: Object,
  },
});

const statusCode = computed(() => cProps.error.statusCode.toString());
</script>

<template>
  <v-app class="error-background">
    <v-main class="error-wrapper">
      <v-container class="error-container">
        <v-row>
          <v-col class="error-content" cols="12">
            <CustomHeadline
              class="text-center mb-8"
              :level="1"
              :text="statusCode"
              typography="headline-1 text-slate-gray"
            />

            <ErrorButton />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.error-background {
  background-color: rgb(var(--v-theme-lemon));
}

.error-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  @include xs-only {
    max-height: calc(100vh - $browser-navbar-offset);
  }
}

.error-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
