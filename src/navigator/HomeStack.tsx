import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFE5BF', // Custom warm header background color
        },
        headerTintColor: '#F62440', // Back button color
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#2A2A2A',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="RestaurantDetail" 
        component={RestaurantDetailScreen}
        options={{
          animation: 'slide_from_right', // Slide animation from right
        }}
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          animation: 'slide_from_bottom', // Slide animation from bottom
        }}
      />
    </Stack.Navigator>
  );
}
