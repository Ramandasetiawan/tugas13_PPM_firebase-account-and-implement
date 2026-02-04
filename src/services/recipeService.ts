import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Recipe } from "../types/recipe";

const RECIPES_COLLECTION = "recipes";

export const fetchRecipes = async (): Promise<Recipe[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, RECIPES_COLLECTION));
        const recipes: Recipe[] = [];
        querySnapshot.forEach((doc) => {
            // Firestore data doesnt include ID inside the data object by default usually, but we can mix it.
            // Also casting to Recipe. Be careful with types.
            const data = doc.data();
            recipes.push({ id: doc.id, ...data } as unknown as Recipe);
        });
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes from Firestore:", error);
        throw error;
    }
};

export const addRecipe = async (recipe: Omit<Recipe, "id">): Promise<string> => {
    try {
        // Create a doc with auto-ID
        const docRef = await addDoc(collection(db, RECIPES_COLLECTION), recipe);
        return docRef.id;
    } catch (error) {
        console.error("Error adding recipe:", error);
        throw error;
    }
};

// Add other CRUD operations as needed
