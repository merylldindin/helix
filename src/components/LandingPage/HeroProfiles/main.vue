<script lang="ts" setup>
import { ProfilesGrid } from "./components";
</script>

<template>
  <div class="hero-profiles">
    <ProfilesGrid class="hero-grid" />
  </div>
</template>

<style lang="scss" scoped>
.hero-grid {
  z-index: 2;
}

.hero-profiles {
  text-align-last: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
