// src/store/authStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const USER_KEY = "@user_auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  login: async (email: string) => {
    try {
      const user: User = { email };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      set({ user, loading: false });
    } catch (error) {
      console.error("Login gagal:", error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      set({ user: null });
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  },

  checkAuth: async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      if (userData) {
        set({ user: JSON.parse(userData), loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error("Gagal cek auth:", error);
      set({ loading: false });
    }
  },
}));