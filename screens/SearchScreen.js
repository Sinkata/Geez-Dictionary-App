import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import sampleData from '../data/sampleData.json';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  // Filter sample data based on query
  const filteredData = sampleData.filter(item =>
    item.geez.toLowerCase().includes(query.toLowerCase()) ||
    item.english.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Geez ፣ አማርና English"
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
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  geez: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  english: {
    fontSize: 16,
    color: '#555',
  },
  definition: {
    fontSize: 14,
    color: '#888',
  },
});