import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useMovieGames } from '../hooks/useMovieGames';
import { getImageUrl } from '../config/api';

export function GuessMovie() {
  const { getRandomMovie, addPoints } = useMovieGames();
  const [currentMovie, setCurrentMovie] = useState(getRandomMovie());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentMovie) setCurrentMovie(getRandomMovie());
  }, [currentMovie, getRandomMovie]);

  const handleGuess = () => {
    if (guess.toLowerCase() === currentMovie?.title.toLowerCase()) {
      setMessage('Correct! You earned 10 points.');
      addPoints(10);
    } else {
      setMessage(`Wrong! The correct answer was ${currentMovie?.title}.`);
    }
    setCurrentMovie(getRandomMovie());
    setGuess('');
  };

  if (!currentMovie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Movie</Text>
      <Image
        source={{ uri: getImageUrl(currentMovie.backdrop_path) }}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        placeholder="Enter movie title"
      />
      <Button title="Submit Guess" onPress={handleGuess} />
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
  image: {
    width: 300,
    height: 169,
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

