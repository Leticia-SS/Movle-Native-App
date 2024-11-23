import { useQuery } from 'react-query';
import { tmdbService } from '../services/tmdb';
import type { MediaType, MediaCategory, Movie, TVSeries } from '../types/tmdb';

export function useMovies(category: MediaCategory) {
  return useQuery(['movies', category], () => tmdbService.getMovies(category));
}

export function useTVSeries(category: MediaCategory) {
  return useQuery(['tv', category], () => tmdbService.getTVSeries(category));
}

export function useMediaDetails<T>(id: number, type: MediaType) {
  return useQuery(['media', type, id], () => tmdbService.getMediaDetails<T>(id, type));
}

export function useMediaSearch(query: string, type: MediaType) {
  return useQuery(['search', type, query], () => tmdbService.searchMedia(query, type), {
    enabled: query.length > 0,
  });
}

export function usePopularActors() {
  return useQuery(['actors', 'popular'], () => tmdbService.getPopularActors());
}

