import { create } from "zustand";
import { Recipe } from "../types/recipe";

interface FavoritesState {
  favorites: Recipe[];
  addFavorite: (item: Recipe) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (item) => set((state) => ({ favorites: [...state.favorites, item] })),
  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter((f) => f.id !== id),
  })),
}));