import { TMDB_API_KEY, TMDB_BASE_URL } from '../config/api';
import type { MediaType, MediaCategory, Movie, TVSeries, TMDBResponse, Actor, MovieDetails } from '../types/tmdb';

class TMDBService {
  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async getMovies(category: MediaCategory): Promise<TMDBResponse<Movie>> {
    return this.fetch<TMDBResponse<Movie>>(`/movie/${category}`);
  }

  async getTVSeries(category: MediaCategory): Promise<TMDBResponse<TVSeries>> {
    return this.fetch<TMDBResponse<TVSeries>>(`/tv/${category}`);
  }

  async getMediaDetails<T>(id: number, type: MediaType): Promise<T> {
    return this.fetch<T>(`/${type}/${id}`);
  }

  async searchMedia(query: string, type: MediaType): Promise<TMDBResponse<Movie | TVSeries>> {
    return this.fetch<TMDBResponse<Movie | TVSeries>>(`/search/${type}?query=${encodeURIComponent(query)}`);
  }

  async getPopularActors(): Promise<TMDBResponse<Actor>> {
    return this.fetch<TMDBResponse<Actor>>('/person/popular');
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.fetch<MovieDetails>(`/movie/${id}`);
  }
}

export const tmdbService = new TMDBService();

