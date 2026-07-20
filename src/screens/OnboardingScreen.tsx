import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();

  const handleGetStarted = () => {
    // Navigate to Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Background Decorative Blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={styles.blob3} />

      {/* Main Illustration Area */}
      <View style={styles.illustrationContainer}>
        <View style={styles.circleBg}>
          <View style={styles.innerCircleBg}>
            <Ionicons name="fast-food" size={80} color="#F62440" />
          </View>
          {/* Floating small food badges for dynamic premium feel */}
          <View style={[styles.floatingBadge, styles.badge1]}>
            <Ionicons name="pizza" size={24} color="#F62440" />
          </View>
          <View style={[styles.floatingBadge, styles.badge2]}>
            <Ionicons name="cafe" size={24} color="#F62440" />
          </View>
          <View style={[styles.floatingBadge, styles.badge3]}>
            <Ionicons name="ice-cream" size={24} color="#F62440" />
          </View>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Gourmet{'\n'}
          <Text style={styles.titleHighlight}>Delivered Fresh</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          Craving something delicious? Get your favorite meals delivered blazing fast right to your doorstep.
        </Text>

        {/* Page Indicator */}
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <View style={styles.buttonIconBg}>
            <Ionicons name="arrow-forward" size={18} color="#F62440" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF3', // Warm cream background
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  blob1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFF2DB',
    opacity: 0.8,
  },
  blob2: {
    position: 'absolute',
    top: 180,
    left: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFE5BF',
    opacity: 0.5,
  },
  blob3: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFF2DB',
    opacity: 0.6,
  },
  illustrationContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBg: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FFE5BF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    position: 'relative',
  },
  innerCircleBg: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#FFF2DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBadge: {
    position: 'absolute',
    backgroundColor: '#FFFAF3',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  badge1: {
    top: 10,
    left: -10,
  },
  badge2: {
    bottom: 20,
    right: -15,
  },
  badge3: {
    top: 100,
    right: -20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#2A2A2A',
    lineHeight: 48,
    marginBottom: 16,
  },
  titleHighlight: {
    color: '#F62440',
  },
  subtitle: {
    fontSize: 16,
    color: '#7A7A7A',
    lineHeight: 24,
    marginBottom: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFE5BF',
    marginRight: 8,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: '#F62440',
  },
  button: {
    backgroundColor: '#F62440',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: 30,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    width: width - 60,
  },
  buttonText: {
    color: '#FFFAF3',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIconBg: {
    backgroundColor: '#FFFAF3',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});