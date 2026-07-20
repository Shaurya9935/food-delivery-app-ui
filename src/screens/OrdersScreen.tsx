import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const INITIAL_ACTIVE_ORDERS = [
  {
    id: '9082',
    restaurantName: 'Pizza Palace',
    itemsCount: 3,
    amount: 32.48,
    date: 'Today, 07:12 PM',
    status: 'In Transit',
  }
];

const PAST_ORDERS = [
  {
    id: '8024',
    restaurantName: 'Sushi Samurai',
    itemsCount: 5,
    amount: 58.99,
    date: '17 July 2026',
    status: 'Delivered',
  },
  {
    id: '7611',
    restaurantName: 'Burger Bistro',
    itemsCount: 2,
    amount: 21.00,
    date: '12 July 2026',
    status: 'Delivered',
  },
  {
    id: '7103',
    restaurantName: 'Taco Town',
    itemsCount: 4,
    amount: 17.50,
    date: '05 July 2026',
    status: 'Delivered',
  }
];

export default function OrdersScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  
  const [activeTab, setActiveTab] = React.useState<'active' | 'past'>('active');
  const [activeOrders, setActiveOrders] = React.useState<any[]>(INITIAL_ACTIVE_ORDERS);

  // Read params for newly placed order
  React.useEffect(() => {
    if (route.params?.newOrder) {
      const order = route.params.newOrder;
      // Add to start of active orders
      setActiveOrders(prev => {
        // Prevent duplicate loads
        if (prev.find(o => o.id === order.id)) return prev;
        return [order, ...prev];
      });
      // Switch tab to active
      setActiveTab('active');
    }
  }, [route.params?.newOrder]);

  const handleReorder = (order: any) => {
    // Navigate to restaurant page to reorder
    navigation.navigate('HomeStack', {
      screen: 'RestaurantDetail',
      params: {
        name: order.restaurantName,
        price: order.amount / order.itemsCount,
        rating: 4.7,
      }
    });
  };

  const renderOrderCard = (order: any, isActive: boolean) => {
    return (
      <View key={order.id} style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <View style={styles.restaurantRow}>
            <View style={styles.restaurantIconBg}>
              <Ionicons name="restaurant" size={18} color="#F62440" />
            </View>
            <View>
              <Text style={styles.restaurantName}>{order.restaurantName}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
          </View>
          <View style={[
            styles.statusBadge,
            isActive ? styles.statusBadgeActive : styles.statusBadgeDelivered
          ]}>
            <Text style={[
              styles.statusText,
              isActive ? styles.statusTextActive : styles.statusTextDelivered
            ]}>
              {order.status}
            </Text>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>#G-{order.id}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Items Quantity</Text>
            <Text style={styles.detailValue}>{order.itemsCount} Items</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Total Amount</Text>
            <Text style={styles.detailTotal}>${order.amount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          {isActive ? (
            <TouchableOpacity style={styles.trackBtn}>
              <Ionicons name="map-outline" size={16} color="#FFFAF3" />
              <Text style={styles.trackBtnText}>Track Order</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.reorderBtn} onPress={() => handleReorder(order)}>
              <Ionicons name="refresh-outline" size={16} color="#F62440" />
              <Text style={styles.reorderBtnText}>Reorder Items</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const displayedOrders = activeTab === 'active' ? activeOrders : PAST_ORDERS;

  return (
    <View style={styles.container}>
      {/* Top Tabs */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'active' && styles.tabBtnSelected]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextSelected]}>
            Active Orders
          </Text>
          {activeOrders.length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{activeOrders.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'past' && styles.tabBtnSelected]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextSelected]}>
            Order History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {displayedOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color="#FFE5BF" />
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptySubtitle}>You don't have any orders in this tab. Start ordering some delicious meals!</Text>
          </View>
        ) : (
          <View style={styles.ordersList}>
            {displayedOrders.map((order) => renderOrderCard(order, activeTab === 'active'))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF3',
  },
  tabHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFF2DB',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#FFE5BF',
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  tabBtnSelected: {
    backgroundColor: '#FFFAF3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7A7A7A',
  },
  tabTextSelected: {
    color: '#F62440',
  },
  tabBadge: {
    backgroundColor: '#F62440',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: {
    color: '#FFFAF3',
    fontSize: 10,
    fontWeight: '900',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  ordersList: {
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFF2DB',
    borderWidth: 1,
    borderColor: '#FFE5BF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  restaurantIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFAF3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE5BF',
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2A2A',
  },
  orderDate: {
    fontSize: 11,
    color: '#7A7A7A',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeActive: {
    backgroundColor: '#FFE5BF',
  },
  statusBadgeDelivered: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextActive: {
    color: '#F62440',
  },
  statusTextDelivered: {
    color: '#4CAF50',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#FFE5BF',
    marginVertical: 14,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 11,
    color: '#7A7A7A',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  detailTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F62440',
  },
  cardActions: {
    marginTop: 4,
  },
  trackBtn: {
    backgroundColor: '#F62440',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    gap: 6,
  },
  trackBtnText: {
    color: '#FFFAF3',
    fontSize: 13,
    fontWeight: '700',
  },
  reorderBtn: {
    backgroundColor: '#FFFAF3',
    borderWidth: 1,
    borderColor: '#F62440',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    gap: 6,
  },
  reorderBtnText: {
    color: '#F62440',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2A2A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#7A7A7A',
    textAlign: 'center',
    lineHeight: 18,
  },
});
