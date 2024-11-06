import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface FavoritesScreenProps {
  favorites: string[];
  toggleFavorite: (word: string) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ favorites, toggleFavorite }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Words</Text>
      {favorites.length === 0 ? (
        <Text>No favorite words added yet!</Text>
      ) : (
        favorites.map((word, index) => (
          <View key={index} style={styles.wordContainer}>
            <Text style={styles.word}>{word}</Text>
            <Button
              title="Remove from Favorites"
              onPress={() => toggleFavorite(word)}
            />
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  word: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default FavoritesScreen;
