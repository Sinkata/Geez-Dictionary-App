import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sampleData from '../data/sampleData.json';

interface Word {
  id: number;
  geez: string;
  english: string;
  definition: string;
}

export default function SearchScreen() {
  const [query, setQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Word[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const savedFavorites = await AsyncStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const toggleFavorite = async (item: Word) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === item.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== item.id);
    } else {
      updatedFavorites = [...favorites, item];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredData = sampleData.filter(item =>
    item.geez.toLowerCase().includes(query.toLowerCase()) ||
    item.english.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Geez, Amharic or English"
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.geez}>{item.geez}</Text>
            <Text style={styles.english}>{item.english}</Text>
            <Text style={styles.definition}>{item.definition}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Text style={styles.favoriteButton}>
                {favorites.some(fav => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 4 },
  item: { padding: 10, borderBottomColor: '#ddd', borderBottomWidth: 1 },
  geez: { fontSize: 18, fontWeight: 'bold' },
  english: { fontSize: 16, color: '#555' },
  definition: { fontSize: 14, color: '#888' },
  favoriteButton: { color: 'blue', marginTop: 5 }
});
