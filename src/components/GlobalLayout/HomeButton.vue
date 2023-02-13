<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

import ButtonClick from "@/assets/animations/button-click.json";
import { CustomLink } from "@/components/shared";

const route = useRoute();

const isHomePage = computed(() => {
  return route.path === "/";
});

const { smAndDown } = useDisplay();
</script>

<template>
  <div v-show="!isHomePage" class="button-wrapper">
    <Vue3Lottie
      :animation-data="ButtonClick"
      class="button-animation"
      :width="smAndDown ? '80px' : '100px'"
    />

    <CustomLink class="button-action" to="/">
      <v-icon
        class="button-icon"
        :color="$COLOR.FOAM"
        :icon="$ICON.HOME_CIRCLE_OUTLINE"
        :size="smAndDown ? '3rem' : '4rem'"
      />
    </CustomLink>
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  position: fixed;
  width: 100%;
}

.button-animation {
  position: absolute;
  height: fit-content;
  top: 1.9rem;
  left: 0;

  @include sm-down {
    top: 3.2rem;
    left: auto;
    right: 0;
    width: 80px;
    height: 80px;
  }
}

.button-action {
  position: absolute;
  top: 1.9rem;
  left: 0;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  @include sm-down {
    top: 3.2rem;
    left: auto;
    right: 0;
    width: 80px;
    height: 80px;
  }
}

.button-icon {
  border-radius: 100%;
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
