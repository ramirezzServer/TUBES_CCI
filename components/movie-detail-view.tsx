"use client";

import Image from "next/image";
import { ImageOffIcon, UserIcon } from "lucide-react";

import { useMovieDetail } from "@/hooks/use-movie-detail";
import { getBackdropUrl, getPosterUrl, getProfileUrl } from "@/lib/tmdb";
import { MovieDetailSkeleton } from "@/components/states/movie-detail-skeleton";
import { ErrorState } from "@/components/states/error-state";
import { EmptyState } from "@/components/states/empty-state";
import { TrackButtons } from "@/components/track-buttons";

interface MovieDetailViewProps {
  id: string;
}

export function MovieDetailView({ id }: MovieDetailViewProps) {
  const { movie, cast, isLoading, error, notFound } = useMovieDetail(id);

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (notFound) {
    return (
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-8 md:py-14 lg:px-12">
        <EmptyState message="Film tidak ditemukan." />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-8 md:py-14 lg:px-12">
        <ErrorState message={error ?? "Gagal memuat detail film."} />
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdropPath);
  const posterUrl = getPosterUrl(movie.posterPath);
  const year = movie.releaseDate ? movie.releaseDate.slice(0, 4) : "—";
  const runtimeLabel = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}j ${movie.runtime % 60}m`
    : null;

  return (
    <div className="flex flex-col">
      {backdropUrl && (
        <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-104 lg:h-120">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-8 md:py-14 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          <div className="mx-auto w-48 shrink-0 sm:w-56 md:mx-0">
            <div className="relative aspect-2/3 overflow-hidden rounded-lg border border-border bg-muted">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="(min-width: 768px) 224px, 192px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageOffIcon className="size-8" />
                  <span className="text-xs">Tidak ada poster</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                {year}
                {runtimeLabel ? ` · ${runtimeLabel}` : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                ★ {movie.voteAverage.toFixed(1)}
              </span>
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <TrackButtons movie={movie} />

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Sinopsis
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {movie.overview || "Sinopsis belum tersedia."}
              </p>
            </div>

            {cast.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Pemeran
                </h2>
                <div className="mt-3 flex gap-4 overflow-x-auto pb-2">
                  {cast.map((member) => {
                    const profileUrl = getProfileUrl(member.profilePath);
                    return (
                      <div
                        key={member.id}
                        className="flex w-20 shrink-0 flex-col items-center gap-1.5 text-center"
                      >
                        <div className="relative size-16 overflow-hidden rounded-full border border-border bg-muted">
                          {profileUrl ? (
                            <Image
                              src={profileUrl}
                              alt={member.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <UserIcon className="size-6" />
                            </div>
                          )}
                        </div>
                        <span className="line-clamp-1 text-xs font-medium text-foreground">
                          {member.name}
                        </span>
                        <span className="line-clamp-1 text-[11px] text-muted-foreground">
                          {member.character}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
