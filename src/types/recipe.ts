export interface Recipe {
    id: string; // Changed from number to string for Firestore/UUID compatibility transparency
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
