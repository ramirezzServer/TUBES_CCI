"use client";

import { SearchIcon } from "lucide-react";

import { useMovieSearch } from "@/hooks/use-movie-search";
import { Input } from "@/components/ui/input";
import { MovieGrid } from "@/components/movie-grid";
import { MovieGridSkeleton } from "@/components/states/movie-grid-skeleton";
import { ErrorState } from "@/components/states/error-state";
import { EmptyState } from "@/components/states/empty-state";

export default function SearchPage() {
  const { query, setQuery, movies, isLoading, error, isIdle } =
    useMovieSearch();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-8 md:py-14 lg:px-12">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari judul film..."
            className="h-10 pl-9"
          />
        </div>

        {isIdle ? (
          <EmptyState message="Mulai ketik untuk mencari film." />
        ) : isLoading ? (
          <MovieGridSkeleton />
        ) : error ? (
          <ErrorState message={error} />
        ) : movies.length === 0 ? (
          <EmptyState message={`Film tidak ditemukan untuk "${query}".`} />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </div>
  );
}
