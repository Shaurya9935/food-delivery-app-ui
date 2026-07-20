import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Fallback restaurant data if loaded via deep link (id only)
const RESTAURANT_FALLBACKS: Record<string, any> = {
  '123': {
    name: 'Gourmet Pizza Station',
    price: 19.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60',
    description: 'Exclusive deep-linked premium pizza station. Experience the best woodfired slices in the city.',
  },
  '1': {
    name: 'Pizza Palace',
    price: 18.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60',
    description: 'Fresh wood-fired sourdough pizzas with authentic Italian ingredients and premium toppings.',
  },
  '2': {
    name: 'Burger Bistro',
    price: 14.50,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
    description: 'Juicy grass-fed beef burgers topped with craft cheddar, secret bistro sauce, and fresh brioche buns.',
  },
  '3': {
    name: 'Sushi Samurai',
    price: 24.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60',
    description: 'Masterfully prepared sushi rolls, nigiri, and sashimi using fresh fish sourced daily.',
  },
  '4': {
    name: 'Taco Town',
    price: 12.00,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60',
    description: 'Crispy street tacos filled with seasoned meats, homemade salsa, and fresh pickled onions.',
  }
};

const MENU_ITEMS = [
  { id: 'm1', name: 'Chef Special Garlic Pizza', price: 16.99, description: 'Creamy garlic sauce, cheese, rosemary, caramelized onions, white truffle oil.', rating: '98% liked' },
  { id: 'm2', name: 'Classic Pepperoni Deluxe', price: 14.99, description: 'Double pepperoni, loaded fresh mozzarella cheese, spicy tomato sauce, oregano.', rating: '95% liked' },
  { id: 'm3', name: 'Truffle Mushroom Calzone', price: 15.50, description: 'Folded pizza filled with porcini mushrooms, ricotta cheese, truffle paste, garlic.', rating: '92% liked' },
  { id: 'm4', name: 'Zesty Buffalo Wings', price: 9.99, description: '8 pieces of crispy chicken wings tossed in spicy signature buffalo sauce, ranch dip.', rating: '90% liked' },
  { id: 'm5', name: 'Hot Fudge Chocolate Lava Cake', price: 6.99, description: 'Warm dark chocolate cake with a molten chocolate center, served with vanilla scoop.', rating: '99% liked' },
];

export default function RestaurantDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  
  // Extract params
  const { id, name: paramName, price: paramPrice, rating: paramRating, image: paramImage, description: paramDescription } = route.params || {};

  // Resolve restaurant details (handles deep linking by checking fallback record if only ID is provided)
  const restaurantId = id || '123';
  const fallback = RESTAURANT_FALLBACKS[restaurantId] || RESTAURANT_FALLBACKS['123'];
  
  const name = paramName || fallback.name;
  const price = paramPrice || fallback.price;
  const rating = paramRating || fallback.rating;
  const image = paramImage || fallback.image;
  const description = paramDescription || fallback.description;

  // Local cart state for testing the UI
  const [cartItems, setCartItems] = React.useState<Array<{ id: string; name: string; price: number; quantity: number }>>([]);

  // Dynamically configure the header stack options
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: name,
      headerStyle: {
        backgroundColor: '#FFE5BF', // Custom header color
      },
      headerTintColor: '#F62440', // Back button/Title tint
      headerBackTitle: 'Back', // Back label
      headerShadowVisible: false,
      // Custom right side cart trigger
      headerRight: () => (
        <TouchableOpacity style={styles.headerCart} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="#F62440" />
          {cartItems.length > 0 && (
            <View style={styles.headerCartBadge}>
              <Text style={styles.headerCartBadgeText}>{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}</Text>
            </View>
          )}
        </TouchableOpacity>
      )
    });
  }, [navigation, name, cartItems]);

  const handleAddToCart = (item: typeof MENU_ITEMS[0]) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const totalQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Image */}
        <Image source={{ uri: image }} style={styles.bannerImage} />

        {/* Restaurant Summary */}
        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.ratingBg}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="bicycle" size={18} color="#F62440" />
              <Text style={styles.metaText}>Free Delivery</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="wallet-outline" size={18} color="#7A7A7A" />
              <Text style={styles.metaText}>Min. ${price.toFixed(2)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="star-outline" size={18} color="#7A7A7A" />
              <Text style={styles.metaText}>Trending #1</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <Text style={styles.menuTitle}>Popular Dishes</Text>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => {
            const cartItem = cartItems.find(i => i.id === item.id);
            return (
              <View key={item.id} style={styles.menuCard}>
                <View style={styles.menuLeft}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
                  <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.menuLikedRow}>
                    <Ionicons name="thumbs-up" size={12} color="#F62440" />
                    <Text style={styles.menuLikedText}>{item.rating}</Text>
                  </View>
                </View>

                {/* Add/Quantity control buttons */}
                <View style={styles.menuRight}>
                  {cartItem ? (
                    <View style={styles.quantityControl}>
                      <TouchableOpacity 
                        style={styles.controlBtn} 
                        onPress={() => handleRemoveFromCart(item.id)}
                      >
                        <Ionicons name="remove" size={16} color="#FFFAF3" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.controlBtn} 
                        onPress={() => handleAddToCart(item)}
                      >
                        <Ionicons name="add" size={16} color="#FFFAF3" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => handleAddToCart(item)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating View Cart bar */}
      {cartItems.length > 0 && (
        <Animated.View style={styles.floatingCartContainer}>
          <TouchableOpacity 
            style={styles.floatingCartBar}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Cart', { items: cartItems, totalPrice: totalPrice })}
          >
            <View style={styles.floatingCartLeft}>
              <View style={styles.cartCountCircle}>
                <Text style={styles.cartCountText}>{totalQuantity}</Text>
              </View>
              <Text style={styles.floatingCartTitle}>View your Cart</Text>
            </View>
            <Text style={styles.floatingCartPrice}>${totalPrice.toFixed(2)}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF3',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bannerImage: {
    width: '100%',
    height: 220,
  },
  headerCart: {
    padding: 8,
    marginRight: 8,
    position: 'relative',
  },
  headerCartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#F62440',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCartBadgeText: {
    color: '#FFFAF3',
    fontSize: 9,
    fontWeight: '900',
  },
  infoCard: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: -30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2A2A2A',
    flex: 1,
    marginRight: 10,
  },
  ratingBg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5BF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2A2A2A',
  },
  description: {
    fontSize: 13,
    color: '#7A7A7A',
    lineHeight: 18,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#FFE5BF',
    paddingTop: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2A2A',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuCard: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuLeft: {
    flex: 1,
    marginRight: 12,
  },
  menuItemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2A2A',
    marginBottom: 4,
  },
  menuItemDesc: {
    fontSize: 12,
    color: '#7A7A7A',
    lineHeight: 16,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F62440',
    marginBottom: 4,
  },
  menuLikedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  menuLikedText: {
    fontSize: 11,
    color: '#F62440',
    fontWeight: '700',
  },
  menuRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#FFFAF3',
    borderWidth: 1,
    borderColor: '#F62440',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#F62440',
    fontWeight: '800',
    fontSize: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F62440',
    borderRadius: 18,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 8,
  },
  controlBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#FFFAF3',
    fontWeight: '800',
    fontSize: 14,
    minWidth: 16,
    textAlign: 'center',
  },
  floatingCartContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    zIndex: 99,
  },
  floatingCartBar: {
    backgroundColor: '#F62440',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  floatingCartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartCountCircle: {
    backgroundColor: '#FFFAF3',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#F62440',
    fontSize: 12,
    fontWeight: '800',
  },
  floatingCartTitle: {
    color: '#FFFAF3',
    fontWeight: '700',
    fontSize: 14,
  },
  floatingCartPrice: {
    color: '#FFFAF3',
    fontWeight: '800',
    fontSize: 16,
  },
});
