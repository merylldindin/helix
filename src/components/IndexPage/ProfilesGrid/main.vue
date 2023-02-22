<script setup lang="ts">
import { PAGE_CONTENT } from "@/content";

import { ProfileLink } from "./components";
</script>

<template>
  <v-container class="profile-wrapper">
    <v-row class="justify-center">
      <v-col
        v-for="(profile, index) in PAGE_CONTENT.landingPage.profiles"
        :key="index"
        class="d-flex justify-center"
        cols="4"
      >
        <ProfileLink
          :description="profile.description"
          :icon="profile.icon"
          :link="profile.link"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.profile-wrapper {
  margin-top: 3rem;
  max-width: 44rem;

  @include md-down {
    margin-top: 2rem;
    max-width: 36rem;
  }

  @include sm-down {
    margin-top: 1rem;
    max-width: 24rem;
  }
}
</style>
