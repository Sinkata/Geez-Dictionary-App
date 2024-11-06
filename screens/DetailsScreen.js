import React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ route }) {
  const { word, translation, phonetics, examples } = route.params.word;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{word}</Text>
      <Text>Translation: {translation}</Text>
      <Text>Phonetics: {phonetics}</Text>
      <Text>Examples:</Text>
      {examples.map((example, index) => (
        <Text key={index} style={{ marginVertical: 4 }}>{example}</Text>
      ))}
    </View>
  );
}
