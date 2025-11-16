// src/store/themeStore.ts
import { create } from "zustand";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  initializeTheme: () => Promise<void>;
}

const THEME_STORAGE_KEY = "@app_theme";

const isValidTheme = (value: string | null): value is Theme => {
  return value === "light" || value === "dark";
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",

  initializeTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (isValidTheme(savedTheme)) {
        set({ theme: savedTheme });
      } else {
        const systemTheme = Appearance.getColorScheme();
        set({ theme: systemTheme === "dark" ? "dark" : "light" });
      }
    } catch (e) {
      console.warn("Gagal muat tema", e);
      set({ theme: "light" });
    }
  },

  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: newTheme });
    AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  },
}));