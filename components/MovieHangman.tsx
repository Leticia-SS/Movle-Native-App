import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMovieGames } from '../hooks/useMovieGames';

export function MovieHangman() {
  const { getRandomMovie, addPoints } = useMovieGames();
  const [currentMovie, setCurrentMovie] = useState(getRandomMovie());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentMovie) setCurrentMovie(getRandomMovie());
  }, [currentMovie, getRandomMovie]);

  const handleGuess = () => {
    if (guess.length !== 1) {
      setMessage('Please enter a single letter.');
      return;
    }

    const letter = guess.toLowerCase();
    if (guessedLetters.includes(letter)) {
      setMessage('You already guessed that letter.');
      return;
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (!currentMovie?.title.toLowerCase().includes(letter)) {
      setRemainingGuesses(remainingGuesses - 1);
    }

    setGuess('');
  };

  const maskedTitle = currentMovie?.title
    .split('')
    .map(char => (guessedLetters.includes(char.toLowerCase()) || char === ' ' ? char : '_'))
    .join(' ');

  useEffect(() => {
    if (maskedTitle === currentMovie?.title) {
      setMessage('Congratulations! You guessed the movie. You earned 20 points.');
      addPoints(20);
      setCurrentMovie(getRandomMovie());
      setGuessedLetters([]);
      setRemainingGuesses(6);
    } else if (remainingGuesses === 0) {
      setMessage(`Game over. The movie was "${currentMovie?.title}".`);
      setCurrentMovie(getRandomMovie());
      setGuessedLetters([]);
      setRemainingGuesses(6);
    }
  }, [maskedTitle, currentMovie, remainingGuesses, addPoints, getRandomMovie]);

  if (!currentMovie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Hangman</Text>
      <Text style={styles.maskedTitle}>{maskedTitle}</Text>
      <Text>Remaining guesses: {remainingGuesses}</Text>
      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        placeholder="Enter a letter"
        maxLength={1}
      />
      <Button title="Guess" onPress={handleGuess} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  maskedTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
  },
});

