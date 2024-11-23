import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useMovieGames } from '../hooks/useMovieGames';
import { GuessMovie } from './GuessMovie';
import { GuessActor } from './GuessActor';
import { MovieHangman } from './MovieHangman';

type GameType = 'guess-movie' | 'guess-actor' | 'hangman';

export function MovieGames() {
  const { gameState } = useMovieGames();
  const [currentGame, setCurrentGame] = useState<GameType | null>(null);

  const renderGame = () => {
    switch (currentGame) {
      case 'guess-movie':
        return <GuessMovie />;
      case 'guess-actor':
        return <GuessActor />;
      case 'hangman':
        return <MovieHangman />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Games</Text>
      <Text style={styles.points}>Total Points: {gameState.points}</Text>
      {currentGame ? (
        <>
          {renderGame()}
          <Button title="Back to Menu" onPress={() => setCurrentGame(null)} />
        </>
      ) : (
        <>
          <Button title="Guess the Movie" onPress={() => setCurrentGame('guess-movie')} />
          <Button title="Guess the Actor" onPress={() => setCurrentGame('guess-actor')} />
          <Button title="Movie Hangman" onPress={() => setCurrentGame('hangman')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  points: {
    fontSize: 18,
    marginBottom: 16,
  },
});

