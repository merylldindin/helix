<script lang="ts" setup>
import ButtonWave from "@/assets/animations/button-wave.json";
import { CustomLink } from "@/components/shared";
</script>

<template>
  <div class="button-wrapper">
    <div class="button-animation">
      <client-only>
        <Vue3Lottie :animation-data="ButtonWave" :width="'200px'" />
      </client-only>
    </div>

    <CustomLink class="button-action headline-6 text-slate-gray" prompt="HOME" to="/" />
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  position: relative;
  width: 200px;
}

.button-animation {
  position: absolute;
  inset: 2px 0 0;
  display: flex;
  height: fit-content;
  margin: auto;
}

.button-action {
  position: absolute;
  inset: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
