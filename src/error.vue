<script lang="ts" setup>
import { useHead } from "@unhead/vue";

import ButtonAnimation from "@/assets/animations/wave-button.json";
import { CustomLink } from "@/components";
import { CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

useHead(extractHead(CONTENT.error.head), { mode: "client" });

const props = defineProps({
  error: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <div id="error">
    <v-app class="error-wrapper">
      <NuxtLayout name="error">
        <div class="error-container">
          <p class="text-center headline--1 mb-8">
            {{ props.error.statusCode }}
          </p>

          <div class="animation-wrapper">
            <client-only class="lottie-animation">
              <Vue3Lottie :width="'200px'" :animation-data="ButtonAnimation" />
            </client-only>

            <CustomLink class="error-actions headline--6" prompt="HOME" to="/" />
          </div>
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animation-wrapper {
  position: relative;
}

.lottie-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
