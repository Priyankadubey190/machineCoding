import React, { useRef } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResult";
import { useSearch } from "../context/SearchContext";

const SearchContainer: React.FC = () => {
  const { searchQuery, searchResults, isLoading } = useSearch();
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-4xl px-4 pt-12 pb-24 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-12">
        <h1 className="text-center mb-6">
          <span className="text-blue-500 text-5xl font-bold tracking-tight">
            R
          </span>
          <span className="text-red-500 text-5xl font-bold tracking-tight">
            e
          </span>
          <span className="text-yellow-500 text-5xl font-bold tracking-tight">
            c
          </span>
          <span className="text-blue-500 text-5xl font-bold tracking-tight">
            i
          </span>
          <span className="text-green-500 text-5xl font-bold tracking-tight">
            p
          </span>
          <span className="text-red-500 text-5xl font-bold tracking-tight">
            e
          </span>
          <span className="text-5xl font-bold text-gray-700 ml-2 tracking-tight">
            Search
          </span>
        </h1>
        <SearchBar onSearch={scrollToResults} />
      </div>

      <div
        ref={resultsRef}
        className={`w-full transition-opacity duration-300 ${
          searchQuery && !isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        {searchQuery && (
          <SearchResults results={searchResults} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
