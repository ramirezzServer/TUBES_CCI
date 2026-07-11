import Image from "next/image";
import Link from "next/link";
import { ImageOffIcon } from "lucide-react";

import { getPosterUrl } from "@/lib/tmdb";
import { TrackButtons } from "@/components/track-buttons";
import type { MovieSummary } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSummary;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.posterPath);
  const year = movie.releaseDate ? movie.releaseDate.slice(0, 4) : "—";

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/movie/${movie.id}`} className="group flex flex-col gap-2">
        <div className="relative aspect-2/3 overflow-hidden rounded-lg border border-border bg-muted">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOffIcon className="size-8" />
              <span className="text-xs">Tidak ada poster</span>
            </div>
          )}
          <div className="absolute bottom-1.5 right-1.5 rounded-md bg-background/90 px-1.5 py-0.5 text-xs font-medium text-foreground">
            {movie.voteAverage.toFixed(1)}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="line-clamp-1 text-sm font-semibold text-foreground">
            {movie.title}
          </span>
          <span className="text-xs text-muted-foreground">{year}</span>
        </div>
      </Link>
      <TrackButtons movie={movie} variant="icon" />
    </div>
  );
}
