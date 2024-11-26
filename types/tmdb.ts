export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  media_type: 'movie';
}

export interface TVSeries {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  media_type: 'tv';
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
}

export type MediaType = 'movie' | 'tv';
export type MediaCategory = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

export interface GameState {
  points: number;
}

