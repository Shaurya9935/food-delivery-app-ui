import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpScreen() {
  const navigation = useNavigation<any>();
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const faqs = [
    { id: 1, question: 'How long does delivery usually take?', answer: 'Delivery typically takes 15-35 minutes depending on the distance from the restaurant and current traffic conditions. You can track your active orders in the Orders tab.' },
    { id: 2, question: 'Can I cancel my order after placing it?', answer: 'Orders can only be cancelled within 60 seconds of placement. After that, the restaurant begins preparing your food, and cancellation is no longer possible.' },
    { id: 3, question: 'What payment methods do you support?', answer: 'We support Visa, Mastercard, American Express, Apple Pay, Google Pay, and Cash on Delivery.' },
    { id: 4, question: 'Is there a minimum order amount?', answer: 'Yes, minimum order amounts vary between $10.00 and $25.00 depending on the selected restaurant, which is displayed on the restaurant card.' }
  ];

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Help & Support',
      headerStyle: {
        backgroundColor: '#FFE5BF',
      },
      headerTintColor: '#F62440',
      headerBackTitle: 'Back',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const toggleFaq = (id: number) => {
    setExpandedFaq(prev => prev === id ? null : id);
  };

  const handleContactSupport = (method: string) => {
    Alert.alert('Contacting Support', `Opening ${method} support channel. An agent will be with you shortly!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Support channels */}
        <Text style={styles.sectionTitle}>Contact Customer Care</Text>
        <View style={styles.channelsContainer}>
          <TouchableOpacity style={styles.channelCard} onPress={() => handleContactSupport('Live Chat')}>
            <Ionicons name="chatbubbles-outline" size={28} color="#F62440" />
            <Text style={styles.channelLabel}>Live Chat</Text>
            <Text style={styles.channelDesc}>Average wait: 2m</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.channelCard} onPress={() => handleContactSupport('Email')}>
            <Ionicons name="mail-outline" size={28} color="#F62440" />
            <Text style={styles.channelLabel}>Email Us</Text>
            <Text style={styles.channelDesc}>Response within 2h</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.channelCard} onPress={() => handleContactSupport('Call')}>
            <Ionicons name="call-outline" size={28} color="#F62440" />
            <Text style={styles.channelLabel}>Call Center</Text>
            <Text style={styles.channelDesc}>24/7 Toll-free</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqs.map(faq => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <View key={faq.id} style={styles.faqCard}>
                <TouchableOpacity 
                  style={styles.faqQuestionRow} 
                  onPress={() => toggleFaq(faq.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={18} 
                    color="#F62440" 
                  />
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
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
  channelsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 10,
    marginBottom: 25,
  },
  channelCard: {
    flex: 1,
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2A2A',
    marginTop: 8,
  },
  channelDesc: {
    fontSize: 10,
    color: '#7A7A7A',
    marginTop: 2,
  },
  faqContainer: {
    marginHorizontal: 20,
  },
  faqCard: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2A2A',
    flex: 1,
    marginRight: 10,
  },
  faqAnswerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#FFE5BF',
    paddingTop: 12,
  },
  faqAnswer: {
    fontSize: 12,
    color: '#7A7A7A',
    lineHeight: 16,
  },
});
