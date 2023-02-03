<script setup lang="ts">
import { CONTENT } from "@/content";

import { ProfileLink } from "./components";
</script>

<template>
  <v-container class="profile-wrapper">
    <v-row class="justify-center">
      <v-col
        v-for="(profile, index) in CONTENT.root.profiles"
        :key="index"
        cols="4"
        class="d-flex"
      >
        <ProfileLink v-bind="profile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.profile-wrapper {
  @include sm-down {
    max-width: 24rem;
  }
}
</style>
