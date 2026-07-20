import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DUMMY_ITEMS = [
  { id: 'm1', name: 'Chef Special Garlic Pizza', price: 16.99, quantity: 1 },
  { id: 'm5', name: 'Hot Fudge Chocolate Lava Cake', price: 6.99, quantity: 2 },
];

export default function CartScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // Retrieve parameters
  const passedItems = route.params?.items;
  const passedTotal = route.params?.totalPrice;

  // Use passed items or fallback to dummy items for preview
  const [items, setItems] = React.useState<any[]>(passedItems || DUMMY_ITEMS);

  const subtotal = passedTotal || items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0.00;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Cart',
      headerStyle: {
        backgroundColor: '#FFE5BF',
      },
      headerTintColor: '#F62440',
      headerBackTitle: 'Back',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const handleQuantityAdd = (itemId: string) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const handleQuantityRemove = (itemId: string) => {
    setItems(prev => prev.map(i => {
      if (i.id === itemId) {
        return { ...i, quantity: Math.max(1, i.quantity - 1) };
      }
      return i;
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add some items to your cart first.');
      return;
    }

    // Programmatically navigate to the Orders screen in the tab navigator
    Alert.alert(
      'Order Placed!',
      'Your delicious meal is on the way!',
      [
        {
          text: 'Go to Orders',
          onPress: () => {
            // Programmatic navigation to nested tab: MainTabs -> Orders
            navigation.navigate('MainTabs', {
              screen: 'Orders',
              params: {
                newOrder: {
                  id: Math.floor(1000 + Math.random() * 9000).toString(),
                  restaurantName: 'Pizza Palace',
                  itemsCount: items.reduce((acc, curr) => acc + curr.quantity, 0),
                  amount: total,
                  date: 'Just Now',
                  status: 'Preparing',
                }
              }
            });
            // Clear cart items locally
            setItems([]);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBg}>
            <Ionicons name="cart-outline" size={80} color="#F62440" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Explore top restaurants around you and add delicious food!</Text>
          <TouchableOpacity 
            style={styles.browseBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
          >
            <Text style={styles.browseBtnText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Delivery address banner */}
            <View style={styles.deliveryCard}>
              <View style={styles.deliveryIconBg}>
                <Ionicons name="location" size={24} color="#F62440" />
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryLabel}>Delivery Address</Text>
                <Text style={styles.deliveryAddress} numberOfLines={1}>Connaught Place, New Delhi, 110001</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeBtnText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Cart Items List */}
            <Text style={styles.sectionTitle}>Items Ordered</Text>
            <View style={styles.itemsListContainer}>
              {items.map((item) => (
                <View key={item.id} style={styles.cartItemCard}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemUnitPrice}>${item.price.toFixed(2)} each</Text>
                  </View>
                  
                  {/* Quantity Controls */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={styles.quantityBtn}
                      onPress={() => handleQuantityRemove(item.id)}
                    >
                      <Ionicons name="remove" size={14} color="#F62440" />
                    </TouchableOpacity>
                    <Text style={styles.quantityCount}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityBtn}
                      onPress={() => handleQuantityAdd(item.id)}
                    >
                      <Ionicons name="add" size={14} color="#F62440" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemTotalPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>

                  <TouchableOpacity 
                    style={styles.removeBtn}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Ionicons name="trash-outline" size={16} color="#7A7A7A" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Payment Method Selector */}
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentCard}>
              <Ionicons name="card" size={24} color="#F62440" />
              <Text style={styles.paymentText}>Visa **** 4242</Text>
              <Ionicons name="checkmark-circle" size={20} color="#F62440" style={styles.paymentCheck} />
            </View>

            {/* Receipt Bill Details */}
            <Text style={styles.sectionTitle}>Bill Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax & Service Charges (8%)</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Place Order Checkout Bar */}
          <View style={styles.checkoutFooter}>
            <TouchableOpacity 
              style={styles.checkoutBtn}
              activeOpacity={0.8}
              onPress={handlePlaceOrder}
            >
              <Text style={styles.checkoutBtnText}>Place Order</Text>
              <Text style={styles.checkoutBtnPrice}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </>
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
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyIconBg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF2DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2A2A2A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  browseBtn: {
    backgroundColor: '#F62440',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  browseBtnText: {
    color: '#FFFAF3',
    fontWeight: '700',
    fontSize: 16,
  },
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
  },
  deliveryIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFAF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 12,
    color: '#7A7A7A',
    marginBottom: 2,
  },
  deliveryAddress: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  changeBtnText: {
    color: '#F62440',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2A2A',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  itemsListContainer: {
    marginHorizontal: 20,
  },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1.4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2A2A',
    marginBottom: 2,
  },
  itemUnitPrice: {
    fontSize: 11,
    color: '#7A7A7A',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFAF3',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE5BF',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 10,
  },
  quantityBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2A2A',
    marginHorizontal: 6,
  },
  itemTotalPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2A2A',
    minWidth: 50,
    textAlign: 'right',
    marginRight: 10,
  },
  removeBtn: {
    padding: 4,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2A2A',
    marginLeft: 12,
  },
  paymentCheck: {
    marginLeft: 'auto',
  },
  summaryCard: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#7A7A7A',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#FFE5BF',
    paddingTop: 12,
    marginTop: 6,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2A2A',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#F62440',
  },
  checkoutFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFAF3',
    borderTopWidth: 1,
    borderTopColor: '#FFE5BF',
  },
  checkoutBtn: {
    backgroundColor: '#F62440',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    shadowColor: '#F62440',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  checkoutBtnText: {
    color: '#FFFAF3',
    fontSize: 16,
    fontWeight: '700',
  },
  checkoutBtnPrice: {
    color: '#FFFAF3',
    fontSize: 18,
    fontWeight: '800',
  },
});
