import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useMovieGames } from '../hooks/useMovieGames';
import { getImageUrl } from '../config/api';

export function GuessActor() {
  const { getRandomActor, addPoints } = useMovieGames();
  const [currentActor, setCurrentActor] = useState(getRandomActor());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentActor) setCurrentActor(getRandomActor());
  }, [currentActor, getRandomActor]);

  const handleGuess = () => {
    if (guess.toLowerCase() === currentActor?.name.toLowerCase()) {
      setMessage('Correct! You earned 10 points.');
      addPoints(10);
    } else {
      setMessage(`Wrong! The correct answer was ${currentActor?.name}.`);
    }
    setCurrentActor(getRandomActor());
    setGuess('');
  };

  if (!currentActor) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Actor</Text>
      <Image
        source={{ uri: getImageUrl(currentActor.profile_path) }}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        placeholder="Enter actor name"
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
    width: 200,
    height: 300,
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

