<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { computed } from "vue";

import { CustomHeadline, ErrorButton } from "@/components";
import { CUSTOM_ERROR_HEAD } from "@/content";

const props = defineProps({
  error: {
    required: true,
    type: Object,
  },
});

const statusCode = computed(() => JSON.stringify(props.error.statusCode));

useHead(CUSTOM_ERROR_HEAD, { mode: "client" });
</script>

<template>
  <v-app class="error-background">
    <v-main class="error-wrapper">
      <v-container class="error-container">
        <v-row>
          <v-col cols="12" class="error-content">
            <CustomHeadline
              :level="1"
              typography="headline-1 text-mine-shaft"
              :text="statusCode"
              class="text-center mb-8"
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
