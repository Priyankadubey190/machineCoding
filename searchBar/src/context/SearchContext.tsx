import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { fetchSuggestions } from "../services/api";
import type { Recipe } from "../types";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Recipe[];
  isLoading: boolean;
  loadingSuggestions: boolean;
  error: string | null;
  suggestions: string[];
  performSearch: () => Promise<void>;
  clearSearch: () => void;
  isListening: boolean;
  removeSuggestion: (suggestion: string) => void;
  startListening: () => void;
  stopListening: () => void;
  resetSearch: () => void;
  getSuggestions: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [excludedSuggestions, setExcludedSuggestions] = useState<string[]>([]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setError(null);

    try {
      setIsLoading(true);
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchQuery}`
      );
      const data = await res.json();

      if (data.recipes && data.recipes.length > 0) {
        setSearchResults(data.recipes);
      } else {
        setSearchResults([]);
        setError("No recipes found.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search recipes. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const suggestionsData = await fetchSuggestions(query);
      const filteredSuggestions = suggestionsData.filter(
        (suggestion) => !excludedSuggestions.includes(suggestion)
      );
      setSuggestions(filteredSuggestions);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSuggestions([]);
    setError(null);
  };

  const resetSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setSuggestions([]);
  }, []);

  const removeSuggestion = (suggestion: string) => {
    setExcludedSuggestions((prev) => [...prev, suggestion]);
    setSuggestions((prev) => prev.filter((s) => s !== suggestion));
  };

  const stopListening = useCallback(() => {
    setIsListening(false);
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.stop();
    }
  }, []);

  const startListening = useCallback(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast("Voice search is not supported in your browser", {
        icon: "🎤❌",
      });
      return;
    }

    setIsListening(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      await getSuggestions(transcript);
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast.error("Failed to recognize speech. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();

    toast("Listening...", {
      icon: "🎤",
      duration: 2000,
    });
  }, [performSearch]);

  useEffect(() => {
    const savedExclusions = localStorage.getItem("excludedSuggestions");
    if (savedExclusions) {
      setExcludedSuggestions(JSON.parse(savedExclusions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "excludedSuggestions",
      JSON.stringify(excludedSuggestions)
    );
  }, [excludedSuggestions]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isLoading,
        loadingSuggestions,
        error,
        suggestions,
        performSearch,
        clearSearch,
        resetSearch,
        isListening,
        startListening,
        stopListening,
        removeSuggestion,
        getSuggestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
