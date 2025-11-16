// src/api/recipesApi.ts
const BASE_URL = "https://691654a6a7a34288a27d10a8.mockapi.io/data/resepmakan";

export interface Recipe {
  id: number;
  name: string;
  origin: string;
  category: string;
  difficulty: string;
  cook_time: string;
  image: string;
  ingredients: string[];
  description: string;
  instructions?: string[];
}

export const getRecipes = async (): Promise<Recipe[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return await res.json();
};

// getRecipeById TIDAK DIGUNAKAN → boleh dihapus