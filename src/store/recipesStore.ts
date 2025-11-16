// src/store/recipesStore.ts
import { create } from "zustand";
import { getRecipes, Recipe } from "../api/recipesApi";

interface RecipesState {
  allRecipes: Recipe[];
  loading: boolean;
  error: string | null;
  fetchAllRecipes: () => Promise<void>;
}

export const useRecipesStore = create<RecipesState>((set) => ({
  allRecipes: [],
  loading: false,
  error: null,
  fetchAllRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getRecipes();
      set({ allRecipes: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));