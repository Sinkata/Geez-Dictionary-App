import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import AppNavigation from './navigation/Navigation';  // Assuming Navigation is set up
import sampleData from './data/sampleData.json';

// Define the shape of the word data
interface Word {
  id: number;
  geez: string;
  english: string;
  definition: string;
}

export default function App() {
  const [wordOfTheDay, setWordOfTheDay] = useState<Word | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]); // List of favorite words
  const [showFavorites, setShowFavorites] = useState<boolean>(false); // State to toggle the favorites list

  // Set the Word of the Day
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sampleData.length);
    setWordOfTheDay(sampleData[randomIndex]);
  }, []);

  // Toggle visibility of the favorites list
  const toggleShowFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  return (
    <>
      <AppNavigation favorites={favorites} />  {/* Passing favorites to navigation */}
      <View style={styles.container}>
        {wordOfTheDay && (
          <View style={styles.wordContainer}>
            <Text style={styles.title}>Word of the Day</Text>
            <Text style={styles.geez}>{wordOfTheDay.geez}</Text>
            <Text style={styles.english}>{wordOfTheDay.english}</Text>
            <Text style={styles.definition}>{wordOfTheDay.definition}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={showFavorites ? 'Hide Favorites' : 'View Favorites'}
            onPress={toggleShowFavorites}
          />
        </View>

        {showFavorites && favorites.length > 0 && (
          <FlatList
            data={favorites}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.favoriteItem}>
                <Text style={styles.geez}>{item}</Text>
              </View>
            )}
          />
        )}

        {showFavorites && favorites.length === 0 && (
          <Text style={styles.noFavorites}>No favorites yet</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff', padding: 20 },
  wordContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 20, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  geez: { fontSize: 18, fontWeight: 'bold' },
  english: { fontSize: 16, color: '#555' },
  definition: { fontSize: 14, color: '#888', marginTop: 5 },
  buttonContainer: { marginVertical: 20 },
  favoriteItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', width: '100%' },
  noFavorites: { fontSize: 16, color: '#888', marginTop: 20 }
});
