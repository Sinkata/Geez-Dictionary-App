import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Geez Dictionary!</Text>
      <Button title="Search Dictionary" onPress={() => navigation.navigate('Search')} />
    </View>
  );
}