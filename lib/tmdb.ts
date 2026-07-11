import type {
  MovieSummary,
  TmdbMovieListResponse,
  TmdbMovieResult,
} from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function getPosterUrl(posterPath: string | null): string | null {
  return posterPath ? `${POSTER_BASE_URL}${posterPath}` : null;
}

function toMovieSummary(result: TmdbMovieResult): MovieSummary {
  return {
    id: result.id,
    title: result.title,
    posterPath: result.poster_path,
    releaseDate: result.release_date,
    voteAverage: result.vote_average,
  };
}

async function fetchMovieList(path: string): Promise<MovieSummary[]> {
  const res = await fetch(`${BASE_URL}${path}?api_key=${API_KEY}`);

  if (!res.ok) {
    throw new Error("Gagal memuat data film dari TMDB");
  }

  const data: TmdbMovieListResponse = await res.json();
  return data.results.map(toMovieSummary);
}

export function getTrendingMoviesWeek(): Promise<MovieSummary[]> {
  return fetchMovieList("/trending/movie/week");
}

export function getPopularMovies(): Promise<MovieSummary[]> {
  return fetchMovieList("/movie/popular");
}
