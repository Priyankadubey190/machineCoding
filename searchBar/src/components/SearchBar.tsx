import React, { useEffect, useState, useRef } from "react";
import { useSearch } from "../context/SearchContext";
import { Camera, Mic, Search, Upload, X } from "lucide-react";

interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const {
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    suggestions,
    removeSuggestion,
    resetSearch,
    isListening,
    startListening,
    stopListening,
    performSearch,
    getSuggestions,
    loadingSuggestions,
  } = useSearch();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const barClasses = `
    w-full flex items-center px-6 py-3 rounded-full
    border border-gray-200 hover:shadow-md transition-all duration-200
    ${isFocused ? "shadow-lg border-transparent ring-1 ring-blue-200" : ""}
  `;

  const handleClear = () => {
    resetSearch();
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      getSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSearchQuery(`Uploaded recipe from: ${file.name}`);
      await performSearch();
      onSearch();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await performSearch();
      onSearch();
      setSelectedSuggestionIndex(-1);
      setIsFocused(false);
      setShowSuggestions(false);
    }
  };

  const handleRemoveSuggestion = (e: React.MouseEvent, suggestion: string) => {
    e.stopPropagation();
    removeSuggestion(suggestion);
  };

  const handleSelectSuggestion = async (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    await performSearch();
    onSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions) return;

      if (e.key === "Escape") {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown" && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp" && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestions, selectedSuggestionIndex, showSuggestions]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className={barClasses}>
          <Search size={20} className="text-gray-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Search for recipes..."
            className="flex-grow outline-none text-gray-700 bg-transparent"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <div className="h-5 w-px bg-gray-200 mx-2"></div>
          <button
            type="button"
            onClick={handleFileUpload}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Upload file"
          >
            <Upload size={18} />
          </button>
          <button
            type="button"
            onClick={handleImageUpload}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Upload image"
          >
            <Camera size={18} />
          </button>
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`p-2 transition-colors ${
              isListening
                ? "text-red-500 animate-pulse"
                : "text-gray-400 hover:text-blue-500"
            }`}
            aria-label={
              isListening ? "Stop voice search" : "Start voice search"
            }
          >
            <Mic size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </form>
      {isLoading && <p className="text-sm text-gray-500 mt-2">Searching...</p>}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      {showSuggestions && searchQuery.trim() && (
        <ul className="absolute z-50 bg-white border border-gray-300 rounded-lg mt-1 w-full shadow-md max-h-60 overflow-y-auto">
          {loadingSuggestions ? (
            <li className="px-4 py-2 text-gray-500">Loading suggestions...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`group flex items-center justify-between px-4 py-2 cursor-pointer ${
                  index === selectedSuggestionIndex
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{suggestion}</span>
                <button
                  onClick={(e) => handleRemoveSuggestion(e, suggestion)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                  aria-label="Remove suggestion"
                >
                  <X size={16} />
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No suggestions found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
