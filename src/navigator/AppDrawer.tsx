import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import MainTabs from './MainTabs';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();
  const navigation = props.navigation;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* User Card Header */}
        <View style={styles.drawerHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Shaurya Gupta</Text>
          <Text style={styles.email}>shaurya@example.com</Text>
        </View>

        <View style={styles.divider} />

        {/* Custom Drawer Items */}
        <View style={styles.itemsContainer}>
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })}
          >
            <Ionicons name="home-outline" size={22} color="#F62440" />
            <Text style={styles.drawerItemLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => navigation.navigate('MainTabs', { screen: 'Orders' })}
          >
            <Ionicons name="receipt-outline" size={22} color="#F62440" />
            <Text style={styles.drawerItemLabel}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => navigation.navigate('SettingsScreen')}
          >
            <Ionicons name="settings-outline" size={22} color="#F62440" />
            <Text style={styles.drawerItemLabel}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => navigation.navigate('HelpScreen')}
          >
            <Ionicons name="help-circle-outline" size={22} color="#F62440" />
            <Text style={styles.drawerItemLabel}>Help & FAQs</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Logout button at bottom */}
      <TouchableOpacity 
        style={styles.logoutBtn} 
        activeOpacity={0.8}
        onPress={async () => {
          await logout();
          // Reset navigation container or redirect will happen automatically in RootNavigator
        }}
      >
        <Ionicons name="log-out-outline" size={22} color="#FFFAF3" />
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#FFFAF3',
          width: 280,
        },
        drawerActiveTintColor: '#F62440',
        drawerInactiveTintColor: '#2A2A2A',
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="HelpScreen" component={HelpScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF3',
  },
  scrollContent: {
    paddingTop: 50,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#F62440',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2A2A',
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    color: '#7A7A7A',
  },
  divider: {
    height: 1,
    backgroundColor: '#FFE5BF',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  itemsContainer: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
    gap: 12,
  },
  drawerItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F62440',
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutBtnText: {
    color: '#FFFAF3',
    fontSize: 15,
    fontWeight: '700',
  },
});
