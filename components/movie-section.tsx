"use client";

import { useMovies } from "@/hooks/use-movies";
import { getPopularMovies, getTrendingMoviesWeek } from "@/lib/tmdb";
import { MovieGrid } from "@/components/movie-grid";
import { MovieGridSkeleton } from "@/components/states/movie-grid-skeleton";
import { ErrorState } from "@/components/states/error-state";
import { EmptyState } from "@/components/states/empty-state";

const fetchersByKind = {
  trending: getTrendingMoviesWeek,
  popular: getPopularMovies,
} as const;

interface MovieSectionProps {
  title: string;
  kind: keyof typeof fetchersByKind;
}

export function MovieSection({ title, kind }: MovieSectionProps) {
  const { movies, isLoading, error } = useMovies(fetchersByKind[kind]);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {isLoading ? (
        <MovieGridSkeleton />
      ) : error ? (
        <ErrorState message={error} />
      ) : movies.length === 0 ? (
        <EmptyState message="Belum ada film untuk ditampilkan." />
      ) : (
        <MovieGrid movies={movies} />
      )}
    </section>
  );
}
