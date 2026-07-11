"use client";

import { useEffect, useState } from "react";
import type { MovieSummary } from "@/types/movie";

type MovieFetcher = () => Promise<MovieSummary[]>;

interface UseMoviesResult {
  movies: MovieSummary[];
  isLoading: boolean;
  error: string | null;
}

export function useMovies(fetcher: MovieFetcher): UseMoviesResult {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetcher()
      .then((data) => {
        if (!isMounted) return;
        setMovies(data);
        setError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Gagal memuat data film. Coba lagi nanti.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  return { movies, isLoading, error };
}
