<script setup lang="ts">
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from "@mdi/js";
import { computed } from "vue";

import { useAppTheme } from "@/composables/useAppTheme";

const { isDark, toggleTheme } = useAppTheme();

const ariaLabel = computed(() => {
  return isDark.value ? "Switch to light mode" : "Switch to dark mode";
});
</script>

<template>
  <v-btn
    :aria-label="ariaLabel"
    class="theme-toggle"
    :class="{
      'theme-toggle-dark': isDark,
      'theme-toggle-light': !isDark,
    }"
    height="44"
    min-width="76"
    rounded="pill"
    variant="text"
    @click="toggleTheme"
  >
    <span class="theme-toggle-track">
      <span class="theme-toggle-glyph theme-toggle-glyph-light">
        <v-icon :icon="mdiWhiteBalanceSunny" size="16" />
      </span>

      <span class="theme-toggle-glyph theme-toggle-glyph-dark">
        <v-icon :icon="mdiMoonWaningCrescent" size="16" />
      </span>

      <span class="theme-toggle-thumb" />
    </span>
  </v-btn>
</template>

<style lang="scss" scoped>
.theme-toggle {
  padding: 0 !important;
  min-width: 76px !important;
}

.theme-toggle-track {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 68px;
  height: 36px;
  padding: 0 10px;
  overflow: hidden;
  border: 1px solid rgb(var(--v-theme-primary) / 22%);
  border-radius: 999px;
  background-color: rgb(var(--v-theme-background) / 82%);
  backdrop-filter: blur(14px);
  box-shadow: 0 16px 30px rgb(0 0 0 / 10%);
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.theme-toggle-glyph {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary) / 45%);
  transition: color 0.35s ease;
}

.theme-toggle-thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-foam));
  box-shadow:
    0 10px 18px rgb(0 0 0 / 16%),
    inset 0 0 0 1px rgb(var(--v-theme-slate-gray) / 14%);
  transition:
    transform 0.35s ease,
    background-color 0.35s ease,
    box-shadow 0.35s ease;
}

.theme-toggle-light {
  .theme-toggle-glyph-light {
    color: rgb(var(--v-theme-slate-gray));
  }
}

.theme-toggle-dark {
  .theme-toggle-track {
    box-shadow:
      0 0 24px rgb(var(--v-theme-foam) / 8%),
      0 18px 34px rgb(0 0 0 / 28%);
  }

  .theme-toggle-glyph-dark {
    color: rgb(var(--v-theme-slate-gray));
  }

  .theme-toggle-thumb {
    transform: translateX(32px);
  }
}
</style>
