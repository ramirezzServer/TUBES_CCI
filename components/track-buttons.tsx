"use client";

import { BookmarkIcon, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/hooks/use-collection";
import type { MovieSummary } from "@/types/movie";

interface TrackButtonsProps {
  movie: MovieSummary;
  variant?: "full" | "icon";
  className?: string;
}

export function TrackButtons({
  movie,
  variant = "full",
  className,
}: TrackButtonsProps) {
  const { isInWatchlist, isWatched, toggleWatchlist, toggleWatched } =
    useCollection(movie);

  const isIconOnly = variant === "icon";
  const watchlistLabel = isInWatchlist
    ? "Hapus dari Watchlist"
    : "Mau Ditonton";
  const watchedLabel = isWatched
    ? "Sudah Ditonton"
    : "Tandai Sudah Ditonton";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Button
        type="button"
        variant={isInWatchlist ? "default" : "outline"}
        size={isIconOnly ? "icon-sm" : "default"}
        aria-pressed={isInWatchlist}
        onClick={toggleWatchlist}
      >
        <BookmarkIcon className={isInWatchlist ? "fill-current" : undefined} />
        <span className={isIconOnly ? "sr-only" : undefined}>
          {watchlistLabel}
        </span>
      </Button>
      <Button
        type="button"
        variant={isWatched ? "default" : "outline"}
        size={isIconOnly ? "icon-sm" : "default"}
        aria-pressed={isWatched}
        onClick={toggleWatched}
        className={
          isWatched
            ? "border-transparent bg-watched text-background hover:bg-watched/90"
            : undefined
        }
      >
        <CheckIcon />
        <span className={isIconOnly ? "sr-only" : undefined}>
          {watchedLabel}
        </span>
      </Button>
    </div>
  );
}
