import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import AISummaryScreen from './src/screens/AISummaryScreen';
import { COLORS } from './src/utils/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Purefeed' }}
        />
        <Stack.Screen 
          name="ArticleDetail" 
          component={ArticleDetailScreen}
          options={{ title: '' }}
        />
        <Stack.Screen 
          name="AISummary" 
          component={AISummaryScreen}
          options={{ 
            title: 'AI 总结',
            headerBackTitle: '返回'
          }}
        />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
