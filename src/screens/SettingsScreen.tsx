import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [promoEmails, setPromoEmails] = React.useState(true);
  const [orderSms, setOrderSms] = React.useState(true);
  const [biometrics, setBiometrics] = React.useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Settings',
      headerStyle: {
        backgroundColor: '#FFE5BF',
      },
      headerTintColor: '#F62440',
      headerBackTitle: 'Back',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Section 1: Notifications */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.menuContainer}>
          <View style={styles.preferenceRow}>
            <View style={styles.rowLeft}>
              <Ionicons name="mail" size={20} color="#F62440" />
              <Text style={styles.rowLabel}>Promotional Emails</Text>
            </View>
            <Switch
              value={promoEmails}
              onValueChange={setPromoEmails}
              trackColor={{ false: '#FFE5BF', true: '#F62440' }}
              thumbColor={promoEmails ? '#FFFAF3' : '#7A7A7A'}
            />
          </View>
          <View style={styles.preferenceRow}>
            <View style={styles.rowLeft}>
              <Ionicons name="chatbox" size={20} color="#F62440" />
              <Text style={styles.rowLabel}>Order Status SMS</Text>
            </View>
            <Switch
              value={orderSms}
              onValueChange={setOrderSms}
              trackColor={{ false: '#FFE5BF', true: '#F62440' }}
              thumbColor={orderSms ? '#FFFAF3' : '#7A7A7A'}
            />
          </View>
        </View>

        {/* Section 2: Security */}
        <Text style={styles.sectionTitle}>Security & Access</Text>
        <View style={styles.menuContainer}>
          <View style={styles.preferenceRow}>
            <View style={styles.rowLeft}>
              <Ionicons name="finger-print" size={20} color="#F62440" />
              <Text style={styles.rowLabel}>Face ID / Biometrics</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: '#FFE5BF', true: '#F62440' }}
              thumbColor={biometrics ? '#FFFAF3' : '#7A7A7A'}
            />
          </View>
          <TouchableOpacity style={styles.clickableRow}>
            <View style={styles.rowLeft}>
              <Ionicons name="key" size={20} color="#F62440" />
              <Text style={styles.rowLabel}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#7A7A7A" />
          </TouchableOpacity>
        </View>

        {/* Section 3: App info */}
        <Text style={styles.sectionTitle}>About App</Text>
        <View style={styles.menuContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.0.0 (Expo v55)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={18} color="#7A7A7A" />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color="#7A7A7A" />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveBtnText}>Save Preferences</Text>
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
    paddingTop: 20,
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
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  clickableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  infoValue: {
    fontSize: 14,
    color: '#7A7A7A',
    fontWeight: '500',
  },
  saveBtn: {
    backgroundColor: '#F62440',
    height: 52,
    borderRadius: 26,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  saveBtnText: {
    color: '#FFFAF3',
    fontSize: 16,
    fontWeight: '700',
  },
});
