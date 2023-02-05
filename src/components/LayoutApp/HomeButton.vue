<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

import ButtonClick from "@/assets/animations/button-click.json";
import { CustomLink } from "@/components";

const route = useRoute();

const isHomePage = computed(() => {
  return route.path === "/";
});

const { smAndDown } = useDisplay();
</script>

<template>
  <div v-show="!isHomePage" class="button-wrapper">
    <client-only>
      <Vue3Lottie
        class="button-animation"
        :width="smAndDown ? '80px' : '100px'"
        :animation-data="ButtonClick"
      />
    </client-only>

    <CustomLink to="/" class="button-action">
      <v-icon
        :size="smAndDown ? '3rem' : '4rem'"
        class="button-icon"
        :icon="$ICON.HOME_CIRCLE_OUTLINE"
        :color="$COLOR.FOAM"
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
    top: 1.5rem;
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
    top: 1.5rem;
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
