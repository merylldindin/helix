<script lang="ts" setup>
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

import ButtonClick from "@/assets/animations/button-click.json";
import { CustomLink } from "@/components";
import { IconName } from "@/types";

const route = useRoute();

const isHomePage = computed(() => {
  return route.path === "/";
});

const { smAndDown } = useDisplay();

const ColorName = inject("ColorName") as Record<string, string>;
const CustomIcons = inject("CustomIcons") as Record<IconName, string>;
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
        :icon="CustomIcons.HOME_CIRCLE_OUTLINE"
        :color="ColorName.FOAM"
      />
    </CustomLink>
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
}

.button-animation {
  position: absolute;
  height: fit-content;
  top: 2rem;
  right: 0;

  @include sm-down {
    top: 1.5rem;
    width: 80px;
    height: 80px;
  }
}

.button-action {
  position: absolute;
  top: 2rem;
  right: 0;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  @include sm-down {
    top: 1.5rem;
    width: 80px;
    height: 80px;
  }
}

.button-icon {
  border-radius: 100%;
  background-color: rgb(var(--v-theme-mine-shaft));
}
</style>
