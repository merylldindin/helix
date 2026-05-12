export const LIGHT_THEME_NAME = "HelixLightTheme";
export const DARK_THEME_NAME = "HelixDarkTheme";
export const SYSTEM_THEME_NAME = "system";
export const THEME_STORAGE_KEY = "helix-theme";

const DEFAULT_THEME_PREFERENCE = SYSTEM_THEME_NAME;

const BROWSER_THEME_COLORS: Record<"dark" | "light", string> = {
  dark: "#050808",
  light: "#F5FEFE",
};

export type HelixThemeName = typeof LIGHT_THEME_NAME | typeof DARK_THEME_NAME;
export type HelixThemePreference = HelixThemeName | typeof SYSTEM_THEME_NAME;

const THEME_MODES: Record<HelixThemeName, "dark" | "light"> = {
  [DARK_THEME_NAME]: "dark",
  [LIGHT_THEME_NAME]: "light",
};

const THEME_META_NAMES = ["theme-color", "msapplication-navbutton-color"];

export const getSystemThemeName = (): HelixThemeName => {
  if (!import.meta.client) {
    return LIGHT_THEME_NAME;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME_NAME
    : LIGHT_THEME_NAME;
};

export const resolveThemeName = (
  themePreference: HelixThemePreference
): HelixThemeName => {
  return themePreference === SYSTEM_THEME_NAME ? getSystemThemeName() : themePreference;
};

export const getThemeMode = (
  themePreference: HelixThemePreference
): "dark" | "light" => {
  return THEME_MODES[resolveThemeName(themePreference)];
};

export const isHelixThemePreference = (
  value: string | null
): value is HelixThemePreference => {
  return (
    value === DARK_THEME_NAME ||
    value === LIGHT_THEME_NAME ||
    value === SYSTEM_THEME_NAME
  );
};

export const getInitialThemeName = (): HelixThemePreference => {
  if (!import.meta.client) {
    return DEFAULT_THEME_PREFERENCE;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return isHelixThemePreference(storedTheme) ? storedTheme : DEFAULT_THEME_PREFERENCE;
};

export const persistThemeName = (themeName: HelixThemePreference): void => {
  if (!import.meta.client) {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, themeName);
};

export const syncBrowserTheme = (themeName: HelixThemePreference): void => {
  if (!import.meta.client) {
    return;
  }

  const themeMode = getThemeMode(themeName);

  document.documentElement.dataset.appTheme = themeMode;
  document.documentElement.style.colorScheme = themeMode;

  for (const metaName of THEME_META_NAMES) {
    const element = document.querySelector(`meta[name="${metaName}"]`);

    if (element) {
      element.setAttribute("content", BROWSER_THEME_COLORS[themeMode]);
    }
  }
};
