import axios from "axios";
import type { ApiResponse, Recipe } from "../types";

const API_BASE_URL = "https://dummyjson.com/recipes";

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${API_BASE_URL}/search?q=${query}`
    );
    return mapResponseToRecipes(response.data);
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw new Error("Failed to search recipes");
  }
};

export const fetchSuggestions = async (query: string): Promise<string[]> => {
  if (!query.trim()) return [];

  try {
    const response = await axios.get<ApiResponse>(
      `${API_BASE_URL}/search?q=${query}&limit=5`
    );
    return response.data.recipes.map((recipe: any) => recipe.name);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

const mapResponseToRecipes = (apiResponse: ApiResponse): Recipe[] => {
  if (!apiResponse.recipes) return [];

  return apiResponse.recipes.map((recipe: any) => ({
    id: recipe.id,
    name: recipe.name,
    description: recipe.instructions?.substring(0, 150) + "...",
    image: recipe.image,
    readyInMinutes: recipe.prepTimeMinutes + recipe.cookTimeMinutes,
    servings: recipe.servings,
    tags: recipe.tags || [],
  }));
};
