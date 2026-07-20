import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    { id: '1', name: 'Open Navigation Drawer', icon: 'menu-outline', action: () => navigation.openDrawer && navigation.openDrawer() },
    { id: '2', name: 'My Orders', icon: 'receipt-outline', action: () => navigation.navigate('Orders') },
    { id: '3', name: 'Saved Addresses', icon: 'location-outline', action: () => {} },
    { id: '4', name: 'Payment Methods', icon: 'card-outline', action: () => {} },
    { id: '5', name: 'Help & Support', icon: 'help-circle-outline', action: () => navigation.navigate('HelpScreen') },
    { id: '6', name: 'Settings', icon: 'settings-outline', action: () => navigation.navigate('SettingsScreen') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarBorder}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>Shaurya Gupta</Text>
          <Text style={styles.email}>shaurya@example.com</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Account Details</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuRow} onPress={item.action}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIconBg}>
                  <Ionicons name={item.icon as any} size={20} color="#F62440" />
                </View>
                <Text style={styles.menuLabel}>{item.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#7A7A7A" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuContainer}>
          {/* Notifications Toggle */}
          <View style={styles.preferenceRow}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBg}>
                <Ionicons name="notifications-outline" size={20} color="#F62440" />
              </View>
              <Text style={styles.menuLabel}>Push Notifications</Text>
            </View>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#FFE5BF', true: '#F62440' }}
              thumbColor={notificationsEnabled ? '#FFFAF3' : '#7A7A7A'}
            />
          </View>

          {/* Dark Mode Toggle */}
          <View style={styles.preferenceRow}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBg}>
                <Ionicons name="moon-outline" size={20} color="#F62440" />
              </View>
              <Text style={styles.menuLabel}>Dark Mode (Beta)</Text>
            </View>
            <Switch 
              value={darkModeEnabled} 
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#FFE5BF', true: '#F62440' }}
              thumbColor={darkModeEnabled ? '#FFFAF3' : '#7A7A7A'}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FFFAF3" />
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF3',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 60,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 24,
    marginHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 25,
  },
  avatarBorder: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: '#F62440',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2A2A2A',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: '#7A7A7A',
    marginBottom: 16,
  },
  editBtn: {
    backgroundColor: '#FFFAF3',
    borderWidth: 1,
    borderColor: '#F62440',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  editBtnText: {
    color: '#F62440',
    fontWeight: '700',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2A2A',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 25,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFAF3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE5BF',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  logoutBtn: {
    backgroundColor: '#F62440',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 26,
    marginHorizontal: 20,
    gap: 8,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 10,
  },
  logoutBtnText: {
    color: '#FFFAF3',
    fontSize: 16,
    fontWeight: '700',
  },
});
