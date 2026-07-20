import * as React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const POPULAR_TAGS = ['Pizza', 'Burger', 'Tacos', 'Sushi', 'Salad', 'Coffee', 'Dessert', 'Wings'];

const DISHES_DATA = [
  { id: '1', name: 'Margherita Pizza', restaurant: 'Pizza Palace', price: 12.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=60', rating: 4.7 },
  { id: '2', name: 'Cheeseburger', restaurant: 'Burger Bistro', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=60', rating: 4.6 },
  { id: '3', name: 'California Roll', restaurant: 'Sushi Samurai', price: 14.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&auto=format&fit=crop&q=60', rating: 4.8 },
  { id: '4', name: 'Chicken Tacos', restaurant: 'Taco Town', price: 8.50, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&auto=format&fit=crop&q=60', rating: 4.4 },
];

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>(DISHES_DATA);

  React.useEffect(() => {
    // Dynamic mock search filter
    if (query.trim() === '') {
      setResults(DISHES_DATA);
    } else {
      const filtered = DISHES_DATA.filter(dish =>
        dish.name.toLowerCase().includes(query.toLowerCase()) ||
        dish.restaurant.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  const handleDishPress = (dish: any) => {
    // Direct navigate to restaurant details passing parent info
    navigation.navigate('HomeStack', {
      screen: 'RestaurantDetail',
      params: {
        id: dish.id === '3' ? '3' : dish.id === '2' ? '2' : dish.id === '4' ? '4' : '1',
        name: dish.restaurant,
        price: dish.price + 5,
        rating: dish.rating,
        image: dish.image,
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Input Area */}
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={20} color="#7A7A7A" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search for delicious food..."
            placeholderTextColor="#A0A0A0"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#7A7A7A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Popular Tags */}
        {query.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <View style={styles.tagsContainer}>
              {POPULAR_TAGS.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.tagBtn}
                  onPress={() => setQuery(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Results list */}
        <Text style={styles.sectionTitle}>
          {query.length > 0 ? `Search Results (${results.length})` : 'Recommended For You'}
        </Text>

        <View style={styles.resultsList}>
          {results.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={60} color="#FFE5BF" />
              <Text style={styles.noResultsTitle}>No results found</Text>
              <Text style={styles.noResultsText}>We couldn't find anything matching "{query}". Try checking your spelling or search for something else.</Text>
            </View>
          ) : (
            results.map((dish) => (
              <TouchableOpacity
                key={dish.id}
                style={styles.dishCard}
                activeOpacity={0.9}
                onPress={() => handleDishPress(dish)}
              >
                <Image source={{ uri: dish.image }} style={styles.dishImage} />
                
                <View style={styles.dishInfo}>
                  <Text style={styles.dishName}>{dish.name}</Text>
                  <Text style={styles.dishRest}>{dish.restaurant}</Text>
                  <View style={styles.dishFooter}>
                    <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
                    <View style={styles.ratingBg}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.ratingText}>{dish.rating}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.arrowIconBg}>
                  <Ionicons name="chevron-forward" size={18} color="#F62440" />
                </View>
              </TouchableOpacity>
            ))
          )}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: '#FFFAF3',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2A2A2A',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2A2A',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  tagBtn: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: '#2A2A2A',
    fontWeight: '600',
    fontSize: 13,
  },
  resultsList: {
    paddingHorizontal: 20,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  dishImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2A2A',
    marginBottom: 2,
  },
  dishRest: {
    fontSize: 12,
    color: '#7A7A7A',
    marginBottom: 6,
  },
  dishFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F62440',
  },
  ratingBg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5BF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  arrowIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFAF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2A2A',
    marginTop: 15,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 13,
    color: '#7A7A7A',
    textAlign: 'center',
    lineHeight: 18,
  },
});
