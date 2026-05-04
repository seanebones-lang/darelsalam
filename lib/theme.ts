/** localStorage preference; `system` mirrors OS appearance. */

export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "darelsalam-theme";

export function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    /* private mode etc. */
  }
  return "system";
}

/** Whether the UI should paint in dark semantic colors. */
export function resolveDark(pref: ThemePreference): boolean {
  if (pref === "dark") return true;
  if (pref === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyDocumentTheme(pref: ThemePreference): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* ignore */
  }
  document.documentElement.classList.toggle("dark", resolveDark(pref));
}
