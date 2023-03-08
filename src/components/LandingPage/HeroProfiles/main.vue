<script lang="ts" setup>
import { ref } from "vue";

import { CustomHeadline } from "@/components/shared";
import { PAGE_CONTENT } from "@/content";

import { ProfilesGrid } from "./components";

const showProfiles = ref<boolean>(false);

setTimeout(() => {
  showProfiles.value = true;
}, 333);
</script>

<template>
  <div v-show="showProfiles" class="hero-profiles">
    <CustomHeadline
      class="hero-headline"
      :text="PAGE_CONTENT.landingPage.headline"
      typography="headline-2"
    />

    <ProfilesGrid class="hero-grid" />
  </div>
</template>

<style lang="scss" scoped>
.hero-headline {
  z-index: 2;
  align-self: center;
  margin-bottom: 4rem;
}

.hero-grid {
  z-index: 2;
}

.hero-profiles {
  text-align-last: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 1.5s ease-in-out;
}
</style>
