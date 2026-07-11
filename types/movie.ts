export interface MovieSummary {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
}

export interface TmdbMovieResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface TmdbMovieListResponse {
  page: number;
  results: TmdbMovieResult[];
  total_pages: number;
  total_results: number;
}
