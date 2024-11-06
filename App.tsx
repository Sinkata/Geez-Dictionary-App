import React from 'react';
import AppNavigation from './navigation/Navigation';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return <AppNavigation />;
}
