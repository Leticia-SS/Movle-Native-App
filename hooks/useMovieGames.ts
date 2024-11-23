import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';
import { Movie, Actor } from '../types/tmdb';

type GameState = {
  points: number;
};

export function useMovieGames() {
  const [gameState, setGameState] = useState<GameState>({ points: 0 });

  const { data: movies, error: moviesError } = useQuery<{ results: Movie[] }>({
    queryKey: ['movies', 'popular'],
    queryFn: () => tmdbService.getMovies('popular'),
  });

  const { data: actors, error: actorsError } = useQuery<{ results: Actor[] }>({
    queryKey: ['actors', 'popular'],
    queryFn: () => tmdbService.getPopularActors(),
  });

  const getRandomMovie = useCallback(() => {
    if (!movies?.results || movies.results.length === 0) return null;
    return movies.results[Math.floor(Math.random() * movies.results.length)];
  }, [movies]);

  const getRandomActor = useCallback(() => {
    if (!actors?.results || actors.results.length === 0) return null;
    return actors.results[Math.floor(Math.random() * actors.results.length)];
  }, [actors]);

  const addPoints = useCallback((points: number) => {
    setGameState(prev => ({ ...prev, points: prev.points + points }));
  }, []);

  return {
    gameState,
    getRandomMovie,
    getRandomActor,
    addPoints,
    errors: {
      moviesError,
      actorsError,
    },
  };
}
