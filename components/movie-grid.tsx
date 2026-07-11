import { MovieCard } from "@/components/movie-card";
import type { MovieSummary } from "@/types/movie";

interface MovieGridProps {
  movies: MovieSummary[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6 xl:gap-8 2xl:grid-cols-7">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
