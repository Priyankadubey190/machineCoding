import React from "react";
import type { Recipe } from "../types";
import { Clock, User, Star } from "lucide-react";

interface SearchResultsProps {
  results: Recipe[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="loader" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No recipes found. Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-sm text-gray-500 mb-4">
        About {results.length} result{results.length !== 1 && "s"}
      </div>

      <div className="space-y-8">
        {results.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {recipe.image && (
                <div className="sm:w-40 h-40 flex-shrink-0">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex-grow">
                <h2 className="text-xl font-medium text-gray-800 mb-2 hover:text-blue-500 transition-colors">
                  <a href="#" className="hover:underline">
                    {recipe.name}
                  </a>
                </h2>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {recipe.instructions?.[0] ?? "No description available."}
                </p>

                <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>
                      {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                    </span>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-1 text-yellow-500" />
                    <span>
                      {recipe.rating.toFixed(1)} ⭐ ({recipe.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {recipe.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full bg-blue-50 text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}

                  {recipe.cuisine && (
                    <span className="px-2 py-1 rounded-full bg-green-50 text-green-700">
                      {recipe.cuisine}
                    </span>
                  )}
                  {recipe.difficulty && (
                    <span className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-700">
                      {recipe.difficulty}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
