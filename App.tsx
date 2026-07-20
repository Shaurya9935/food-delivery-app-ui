import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import RootNavigator from "./src/navigator/RootNavigator";

// Deep linking configuration
const linking = {
  prefixes: ['foodapp://'],
  config: {
    screens: {
      MainDrawer: {
        screens: {
          MainTabs: {
            screens: {
              HomeTab: {
                screens: {
                  RestaurantDetail: {
                    path: 'restaurant/:id',
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer linking={linking as any}>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}