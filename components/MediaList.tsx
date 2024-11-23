import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useMovies, useTVSeries } from '../hooks/useTMDB';
import { getImageUrl } from '../config/api';
import type { MediaCategory, Movie, TVSeries } from '../types/tmdb';

interface MediaListProps {
  type: 'movie' | 'tv';
  category: MediaCategory;
}

export function MediaList({ type, category }: MediaListProps) {
  const movieQuery = useMovies(category);
  const tvQuery = useTVSeries(category);
  
  const query = type === 'movie' ? movieQuery : tvQuery;
  const { data, isLoading, error } = query;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Movie | TVSeries }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: getImageUrl(item.poster_path) }}
        style={styles.poster}
      />
      <Text style={styles.title}>
        {type === 'movie' ? (item as Movie).title : (item as TVSeries).name}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data?.results}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  card: {
    width: 140,
    marginRight: 16,
  },
  poster: {
    width: '100%',
    height: 210,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});

