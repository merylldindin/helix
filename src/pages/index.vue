<script setup lang="ts">
import { ref } from "vue";

import { AnimatedAvatar, ProfilesGrid } from "@/components";
import { PAGE_CONTENT } from "@/content";
import { extractHead } from "@/utils/meta";

import { defineWebPage, useSchemaOrg, useSeoMeta } from "#imports";

useSeoMeta(extractHead(PAGE_CONTENT.landingPage.head));

useSchemaOrg(defineWebPage());

const showProfiles = ref<boolean>(false);

setTimeout(() => {
  showProfiles.value = true;
}, 1250);
</script>

<template>
  <NuxtLayout name="global">
    <section class="section-wrapper">
      <AnimatedAvatar />

      <v-slide-y-transition>
        <div v-show="showProfiles" class="profile-title">
          <h1 class="headline-2">
            {{ PAGE_CONTENT.landingPage.headline }}
          </h1>

          <ProfilesGrid />
        </div>
      </v-slide-y-transition>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.section-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.profile-title {
  position: absolute;
  top: 34rem;
  bottom: 0;
  left: 0;
  right: 0;
  text-align-last: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(var(--v-theme-foam));
  transition: all 1.5s ease-in-out;

  @include md-down {
    top: 35rem;
  }

  @include sm-down {
    top: 36rem;
  }
}
</style>
