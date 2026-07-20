import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { id: '1', name: 'Pizza', icon: 'pizza-outline' },
  { id: '2', name: 'Burgers', icon: 'hamburger-outline' },
  { id: '3', name: 'Sushi', icon: 'fish-outline' },
  { id: '4', name: 'Desserts', icon: 'ice-cream-outline' },
  { id: '5', name: 'Drinks', icon: 'beer-outline' },
];

const RESTAURANTS = [
  {
    id: '1',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.8,
    time: '15-25 min',
    price: 18.99,
    priceRange: '$$',
    description: 'Fresh wood-fired sourdough pizzas with authentic Italian ingredients and premium toppings.',
    tag: 'Free Delivery',
  },
  {
    id: '2',
    name: 'Burger Bistro',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.7,
    time: '20-30 min',
    price: 14.50,
    priceRange: '$$',
    description: 'Juicy grass-fed beef burgers topped with craft cheddar, secret bistro sauce, and fresh brioche buns.',
    tag: 'Trending',
  },
  {
    id: '3',
    name: 'Sushi Samurai',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.9,
    time: '25-35 min',
    price: 24.99,
    priceRange: '$$$',
    description: 'Masterfully prepared sushi rolls, nigiri, and sashimi using fresh fish sourced daily.',
    tag: 'Top Rated',
  },
  {
    id: '4',
    name: 'Taco Town',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.5,
    time: '10-20 min',
    price: 12.00,
    priceRange: '$',
    description: 'Crispy street tacos filled with seasoned meats, homemade cilantro salsa, and pickled onions.',
    tag: 'Cheapest Delivery',
  }
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = React.useState('1');

  const handleRestaurantPress = (restaurant: typeof RESTAURANTS[0]) => {
    // Pass restaurant name, price, rating, image, description using params
    navigation.navigate('RestaurantDetail', {
      id: restaurant.id,
      name: restaurant.name,
      price: restaurant.price,
      rating: restaurant.rating,
      image: restaurant.image,
      description: restaurant.description,
    });
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerBtn}
          onPress={() => navigation.openDrawer ? navigation.openDrawer() : null}
        >
          <Ionicons name="menu-outline" size={26} color="#2A2A2A" />
        </TouchableOpacity>
        
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Deliver to</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#F62440" />
            <Text style={styles.locationText}>Connaught Place, Delhi</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.headerBtn}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={26} color="#2A2A2A" />
          <View style={styles.cartBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hello, Shaurya 👋</Text>
          <Text style={styles.welcomeSubtitle}>What are you craving today?</Text>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          style={styles.searchContainer}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search-outline" size={20} color="#7A7A7A" style={styles.searchIcon} />
          <Text style={styles.searchTextPlaceholder}>Search for restaurants, dishes...</Text>
          <Ionicons name="options-outline" size={20} color="#F62440" />
        </TouchableOpacity>

        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>30% OFF</Text>
            <Text style={styles.bannerSubtitle}>On your first order today!</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60' }}
            style={styles.bannerImage}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedCategory;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardSelected,
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <View style={[
                  styles.categoryIconBg,
                  isSelected ? styles.categoryIconBgSelected : styles.categoryIconBgUnselected
                ]}>
                  <Ionicons name={item.icon as any} size={22} color={isSelected ? '#FFFAF3' : '#F62440'} />
                </View>
                <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Featured Restaurants Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantsList}>
          {RESTAURANTS.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              activeOpacity={0.95}
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
              
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{restaurant.tag}</Text>
              </View>

              <View style={styles.restaurantInfo}>
                <View style={styles.restaurantNameRow}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <View style={styles.ratingBg}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>
                <Text style={styles.restaurantDesc} numberOfLines={1}>{restaurant.description}</Text>
                
                <View style={styles.restaurantDetailsRow}>
                  <View style={styles.restaurantMetaItem}>
                    <Ionicons name="time-outline" size={14} color="#7A7A7A" />
                    <Text style={styles.restaurantMetaText}>{restaurant.time}</Text>
                  </View>
                  <View style={styles.restaurantMetaItem}>
                    <Ionicons name="wallet-outline" size={14} color="#7A7A7A" />
                    <Text style={styles.restaurantMetaText}>Min. order ${restaurant.price.toFixed(2)}</Text>
                  </View>
                  <Text style={styles.priceRangeText}>{restaurant.priceRange}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF2DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F62440',
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 12,
    color: '#7A7A7A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2A2A',
    marginLeft: 4,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2A2A2A',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchTextPlaceholder: {
    flex: 1,
    color: '#7A7A7A',
    fontSize: 14,
  },
  bannerCard: {
    flexDirection: 'row',
    backgroundColor: '#FFE5BF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 16,
    height: 130,
    overflow: 'hidden',
    marginBottom: 25,
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#F62440',
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2A2A',
    marginTop: 4,
    marginBottom: 10,
  },
  bannerBtn: {
    backgroundColor: '#F62440',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: '#FFFAF3',
    fontSize: 12,
    fontWeight: '700',
  },
  bannerImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -10,
    bottom: -10,
    borderRadius: 20,
    transform: [{ rotate: '-10deg' }],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2A2A',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F62440',
  },
  categoriesList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#FFF2DB',
    padding: 10,
    borderRadius: 18,
    marginRight: 12,
    width: 76,
    borderWidth: 1,
    borderColor: '#FFE5BF',
  },
  categoryCardSelected: {
    backgroundColor: '#FFE5BF',
    borderColor: '#F62440',
  },
  categoryIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryIconBgUnselected: {
    backgroundColor: '#FFFAF3',
  },
  categoryIconBgSelected: {
    backgroundColor: '#F62440',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7A7A7A',
  },
  categoryTextSelected: {
    color: '#F62440',
  },
  restaurantsList: {
    paddingHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 160,
  },
  tagBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#F62440',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    color: '#FFFAF3',
    fontSize: 11,
    fontWeight: '700',
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2A2A',
  },
  ratingBg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5BF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  restaurantDesc: {
    fontSize: 12,
    color: '#7A7A7A',
    marginBottom: 12,
  },
  restaurantDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  restaurantMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  restaurantMetaText: {
    fontSize: 11,
    color: '#7A7A7A',
  },
  priceRangeText: {
    marginLeft: 'auto',
    fontSize: 12,
    fontWeight: '700',
    color: '#F62440',
  },
});
