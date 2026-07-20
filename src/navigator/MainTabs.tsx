import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import HomeStack from './HomeStack';
import SearchScreen from '../screens/SearchScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { totalQuantity } = useCart();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        // Hiding bottom tab bar on nested screens
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        const shouldHide = routeName === 'RestaurantDetail' || routeName === 'Cart';

        return {
          headerShown: false,
          tabBarActiveTintColor: '#F62440',
          tabBarInactiveTintColor: '#7A7A7A',
          tabBarStyle: shouldHide 
            ? { display: 'none' } 
            : {
                backgroundColor: '#FFF2DB',
                borderTopColor: '#FFE5BF',
                borderTopWidth: 1,
                height: 60 + insets.bottom,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                paddingTop: 6,
              },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          }
        };
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={focused ? 24 : 22} color={color} />
          ),
          // Badge on Orders tab when cart is not empty
          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#F62440',
            color: '#FFFAF3',
            fontSize: 10,
            fontWeight: 'bold',
          }
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={focused ? 24 : 22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
