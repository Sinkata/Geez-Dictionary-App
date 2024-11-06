import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AppNavigation from './navigation/Navigation';
import sampleData from './data/sampleData.json';

export default function App() {
  const [wordOfTheDay, setWordOfTheDay] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]); // List of favorite words

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sampleData.length);
    setWordOfTheDay(sampleData[randomIndex]);
  }, []);

  const toggleFavorite = (word: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(word)
        ? prevFavorites.filter(fav => fav !== word)
        : [...prevFavorites, word]
    );
  };

  // Debugging to ensure wordOfTheDay is populated
  console.log("wordOfTheDay:", wordOfTheDay);

  return (
    <>
      {/* Comment this out temporarily to isolate the source of the error */}
      <AppNavigation favorites={favorites} toggleFavorite={toggleFavorite} />
      <View style={styles.container}>
        {wordOfTheDay && wordOfTheDay.geez && wordOfTheDay.english && wordOfTheDay.definition ? (
          <View>
            <Text style={styles.title}>Word of the Day</Text>
            <Text style={styles.geez}>{wordOfTheDay.geez}</Text>
            <Text style={styles.english}>{wordOfTheDay.english}</Text>
            <Text style={styles.definition}>{wordOfTheDay.definition}</Text>
            <Button
              title={favorites.includes(wordOfTheDay.geez) ? 'Remove from Favorites' : 'Add to Favorites'}
              onPress={() => toggleFavorite(wordOfTheDay.geez)}
            />
          </View>
        ) : (
          <Text style={styles.title}>Loading...</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 35,   paddingBottom: 45, },
  geez: { fontSize: 18, fontWeight: 'bold' },
  english: { fontSize: 16, color: '#555' },
  definition: { fontSize: 14, color: '#888', marginTop: 5 }
});
