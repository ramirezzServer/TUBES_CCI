"use client";

import { useEffect, useState } from "react";
import {
  TmdbNotFoundError,
  getMovieCredits,
  getMovieDetail,
} from "@/lib/tmdb";
import type { CastMember, MovieDetail } from "@/types/movie";

interface UseMovieDetailResult {
  movie: MovieDetail | null;
  cast: CastMember[];
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
}

export function useMovieDetail(id: string): UseMovieDetailResult {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getMovieDetail(id), getMovieCredits(id)])
      .then(([movieData, castData]) => {
        if (!isMounted) return;
        setMovie(movieData);
        setCast(castData);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        if (err instanceof TmdbNotFoundError) {
          setNotFound(true);
        } else {
          setError("Gagal memuat detail film. Coba lagi nanti.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { movie, cast, isLoading, error, notFound };
}
