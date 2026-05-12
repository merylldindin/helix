import { computed, onMounted, onUnmounted, ref } from "vue";
import { useTheme } from "vuetify";

import type { HelixThemePreference } from "@/plugins/vuetify.client/theme";
import {
  DARK_THEME_NAME,
  LIGHT_THEME_NAME,
  SYSTEM_THEME_NAME,
  getInitialThemeName,
  persistThemeName,
  resolveThemeName,
  syncBrowserTheme,
} from "@/plugins/vuetify.client/theme";

export const useAppTheme = () => {
  const theme = useTheme();
  const themeName = ref<HelixThemePreference>(getInitialThemeName());
  let systemQuery: MediaQueryList | undefined;

  const isDark = computed(() => theme.current.value.dark);

  const applyTheme = (nextTheme: HelixThemePreference, shouldPersist = true): void => {
    theme.change(resolveThemeName(nextTheme));
    themeName.value = nextTheme;

    if (shouldPersist) {
      persistThemeName(nextTheme);
    }

    syncBrowserTheme(nextTheme);
  };

  const handleSystemThemeChange = () => {
    if (themeName.value === SYSTEM_THEME_NAME) {
      applyTheme(SYSTEM_THEME_NAME, false);
    }
  };

  const setTheme = (nextTheme: HelixThemePreference): void => {
    applyTheme(nextTheme);
  };

  const toggleTheme = (): void => {
    setTheme(isDark.value ? LIGHT_THEME_NAME : DARK_THEME_NAME);
  };

  onMounted(() => {
    themeName.value = getInitialThemeName();
    systemQuery = window.matchMedia("(prefers-color-scheme: dark)");

    systemQuery.addEventListener("change", handleSystemThemeChange);
    applyTheme(themeName.value);
  });

  onUnmounted(() => {
    systemQuery?.removeEventListener("change", handleSystemThemeChange);
  });

  return {
    isDark,
    setTheme,
    themeName,
    toggleTheme,
  };
};
