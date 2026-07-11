import type {
  CastMember,
  MovieDetail,
  MovieSummary,
  TmdbCastMember,
  TmdbCreditsResponse,
  TmdbMovieDetailResult,
  TmdbMovieListResponse,
  TmdbMovieResult,
} from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
export const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export class TmdbNotFoundError extends Error {}

export function getPosterUrl(posterPath: string | null): string | null {
  return posterPath ? `${POSTER_BASE_URL}${posterPath}` : null;
}

export function getBackdropUrl(backdropPath: string | null): string | null {
  return backdropPath ? `${BACKDROP_BASE_URL}${backdropPath}` : null;
}

export function getProfileUrl(profilePath: string | null): string | null {
  return profilePath ? `${PROFILE_BASE_URL}${profilePath}` : null;
}

async function fetchTmdb<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}?api_key=${API_KEY}`);

  if (res.status === 404) {
    throw new TmdbNotFoundError("Data tidak ditemukan di TMDB");
  }

  if (!res.ok) {
    throw new Error("Gagal memuat data dari TMDB");
  }

  return res.json();
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

function toMovieDetail(result: TmdbMovieDetailResult): MovieDetail {
  return {
    id: result.id,
    title: result.title,
    posterPath: result.poster_path,
    backdropPath: result.backdrop_path,
    releaseDate: result.release_date,
    voteAverage: result.vote_average,
    runtime: result.runtime,
    genres: result.genres,
    overview: result.overview,
  };
}

function toCastMember(member: TmdbCastMember): CastMember {
  return {
    id: member.id,
    name: member.name,
    character: member.character,
    profilePath: member.profile_path,
  };
}

async function fetchMovieList(path: string): Promise<MovieSummary[]> {
  const data = await fetchTmdb<TmdbMovieListResponse>(path);
  return data.results.map(toMovieSummary);
}

export function getTrendingMoviesWeek(): Promise<MovieSummary[]> {
  return fetchMovieList("/trending/movie/week");
}

export function getPopularMovies(): Promise<MovieSummary[]> {
  return fetchMovieList("/movie/popular");
}

export async function getMovieDetail(id: string): Promise<MovieDetail> {
  const data = await fetchTmdb<TmdbMovieDetailResult>(`/movie/${id}`);
  return toMovieDetail(data);
}

export async function getMovieCredits(id: string): Promise<CastMember[]> {
  const data = await fetchTmdb<TmdbCreditsResponse>(`/movie/${id}/credits`);
  return data.cast.slice(0, 10).map(toCastMember);
}
