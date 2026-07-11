"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  WATCHED_KEY,
  WATCHLIST_KEY,
  getServerCollectionSnapshot,
  readCollection,
  subscribeToCollection,
  writeCollection,
} from "@/lib/storage";
import type { CollectionItem, MovieSummary } from "@/types/movie";

export function useCollectionItems(key: string): CollectionItem[] {
  return useSyncExternalStore(
    (callback) => subscribeToCollection(key, callback),
    () => readCollection(key),
    getServerCollectionSnapshot
  );
}

function toCollectionItem(movie: MovieSummary): CollectionItem {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.posterPath,
    releaseDate: movie.releaseDate,
    voteAverage: movie.voteAverage,
    addedAt: new Date().toISOString(),
  };
}

function toggleInCollection(key: string, movie: MovieSummary): void {
  const current = readCollection(key);
  const exists = current.some((item) => item.id === movie.id);
  const next = exists
    ? current.filter((item) => item.id !== movie.id)
    : [...current, toCollectionItem(movie)];
  writeCollection(key, next);
}

interface UseCollectionResult {
  isInWatchlist: boolean;
  isWatched: boolean;
  toggleWatchlist: () => void;
  toggleWatched: () => void;
}

export function useCollection(movie: MovieSummary): UseCollectionResult {
  const watchlist = useCollectionItems(WATCHLIST_KEY);
  const watched = useCollectionItems(WATCHED_KEY);

  const isInWatchlist = watchlist.some((item) => item.id === movie.id);
  const isWatched = watched.some((item) => item.id === movie.id);

  const toggleWatchlist = useCallback(() => {
    toggleInCollection(WATCHLIST_KEY, movie);
  }, [movie]);

  const toggleWatched = useCallback(() => {
    toggleInCollection(WATCHED_KEY, movie);
  }, [movie]);

  return { isInWatchlist, isWatched, toggleWatchlist, toggleWatched };
}
