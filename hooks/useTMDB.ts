import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';
import type { MediaType, MediaCategory, Movie, TVSeries } from '../types/tmdb';

export function useMovies(category: MediaCategory) {
  return useQuery({
    queryKey: ['movies', category],
    queryFn: () => tmdbService.getMovies(category),
  });
}

export function useTVSeries(category: MediaCategory) {
  return useQuery({
    queryKey: ['tv', category],
    queryFn: () => tmdbService.getTVSeries(category),
  });
}

export function useMediaDetails<T>(id: number, type: MediaType) {
  return useQuery({
    queryKey: ['media', type, id],
    queryFn: () => tmdbService.getMediaDetails<T>(id, type),
  });
}

export function useMediaSearch(query: string, type: MediaType) {
  return useQuery({
    queryKey: ['search', type, query],
    queryFn: () => tmdbService.searchMedia(query, type),
    enabled: query.length > 0,
  });
}

