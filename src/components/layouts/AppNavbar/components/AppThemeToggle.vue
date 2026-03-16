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
    rounded="pill"
    variant="text"
    @click="toggleTheme"
  >
    <span class="theme-toggle-track">
      <span class="theme-toggle-glyph theme-toggle-glyph-light">
        <v-icon class="theme-toggle-icon" :icon="mdiWhiteBalanceSunny" />
      </span>

      <span
        class="theme-toggle-glyph theme-toggle-glyph-dark"
        style="padding-left: 6px"
      >
        <v-icon class="theme-toggle-icon" :icon="mdiMoonWaningCrescent" />
      </span>

      <span class="theme-toggle-thumb" />
    </span>
  </v-btn>
</template>

<style lang="scss" scoped>
.theme-toggle {
  height: var(--navbar-toggle-hit-height, 44px) !important;
  padding: 0 !important;
  min-width: var(--navbar-toggle-hit-width, 76px) !important;
}

.theme-toggle-track {
  --theme-toggle-track-width: var(--navbar-toggle-track-width, 68px);
  --theme-toggle-track-height: var(--navbar-toggle-track-height, 36px);
  --theme-toggle-thumb-size: var(--navbar-toggle-thumb-size, 26px);
  --theme-toggle-thumb-offset: var(--navbar-toggle-thumb-offset, 4px);
  --theme-toggle-thumb-travel: calc(
    var(--theme-toggle-track-width) - var(--theme-toggle-thumb-size) -
      (var(--theme-toggle-thumb-offset) * 2)
  );

  position: relative;
  display: block;
  width: var(--theme-toggle-track-width);
  height: var(--theme-toggle-track-height);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, rgb(var(--v-theme-primary)) 22%, transparent);
  border-radius: 999px;
  background-color: color-mix(in srgb, rgb(var(--v-theme-background)) 82%, transparent);
  backdrop-filter: blur(14px);
  box-shadow: 0 16px 30px rgb(0 0 0 / 10%);
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.theme-toggle-glyph {
  position: absolute;
  top: 50%;
  width: var(--theme-toggle-thumb-size);
  height: var(--theme-toggle-thumb-size);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  color: rgb(var(--v-theme-primary) / 45%);
  transition: color 0.35s ease;
}

.theme-toggle-icon {
  :deep(svg) {
    width: var(--navbar-toggle-icon-size, 16px);
    height: var(--navbar-toggle-icon-size, 16px);
  }
}

.theme-toggle-glyph-light {
  left: var(--theme-toggle-thumb-offset);
}

.theme-toggle-glyph-dark {
  right: var(--theme-toggle-thumb-offset);
}

.theme-toggle-thumb {
  position: absolute;
  top: 50%;
  left: var(--theme-toggle-thumb-offset);
  transform: translateY(-50%);
  width: var(--theme-toggle-thumb-size);
  height: var(--theme-toggle-thumb-size);
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
  .theme-toggle-thumb {
    background-color: rgb(var(--v-theme-slate-gray));
    box-shadow:
      0 10px 18px rgb(0 0 0 / 18%),
      inset 0 0 0 1px rgb(var(--v-theme-foam) / 12%);
  }

  .theme-toggle-glyph-light {
    color: rgb(var(--v-theme-foam));
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
    background-color: rgb(var(--v-theme-foam));
    transform: translateY(-50%) translateX(var(--theme-toggle-thumb-travel));
  }
}
</style>
