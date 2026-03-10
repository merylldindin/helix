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
  --theme-toggle-track-width: 68px;
  --theme-toggle-track-height: 36px;
  --theme-toggle-thumb-size: 26px;
  --theme-toggle-thumb-offset: 4px;
  --theme-toggle-thumb-travel: 32px;

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
  top: var(--theme-toggle-thumb-offset);
  width: var(--theme-toggle-thumb-size);
  height: var(--theme-toggle-thumb-size);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--v-theme-primary) / 45%);
  transition: color 0.35s ease;
}

.theme-toggle-glyph-light {
  left: var(--theme-toggle-thumb-offset);
}

.theme-toggle-glyph-dark {
  right: var(--theme-toggle-thumb-offset);
}

.theme-toggle-thumb {
  position: absolute;
  top: var(--theme-toggle-thumb-offset);
  left: var(--theme-toggle-thumb-offset);
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
    transform: translateX(var(--theme-toggle-thumb-travel));
  }
}
</style>
