"use client";

import { useEffect, useState, useTransition } from "react";
import { searchMovies } from "@/lib/tmdb";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { MovieSummary } from "@/types/movie";

const DEBOUNCE_DELAY_MS = 400;

interface UseMovieSearchResult {
  query: string;
  setQuery: (query: string) => void;
  movies: MovieSummary[];
  isLoading: boolean;
  error: string | null;
  isIdle: boolean;
}

export function useMovieSearch(): UseMovieSearchResult {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const debouncedQuery = useDebouncedValue(query.trim(), DEBOUNCE_DELAY_MS);
  const isIdle = debouncedQuery.length === 0;

  useEffect(() => {
    if (isIdle) return;

    let isMounted = true;

    startTransition(async () => {
      try {
        const data = await searchMovies(debouncedQuery);
        if (!isMounted) return;
        setMovies(data);
        setError(null);
      } catch {
        if (!isMounted) return;
        setError("Gagal mencari film. Coba lagi nanti.");
      }
    });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, isIdle]);

  return {
    query,
    setQuery,
    movies: isIdle ? [] : movies,
    isLoading: isPending,
    error: isIdle ? null : error,
    isIdle,
  };
}
