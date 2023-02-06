<script lang="ts" setup>
import ButtonWave from "@/assets/animations/button-wave.json";
import { CustomLink } from "@/components/shared";
</script>

<template>
  <div class="button-wrapper">
    <client-only class="button-animation">
      <Vue3Lottie :width="'200px'" :animation-data="ButtonWave" />
    </client-only>

    <CustomLink class="button-action headline-6 text-mine-shaft" prompt="HOME" to="/" />
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  position: relative;
}

.button-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.button-action {
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
</style>
