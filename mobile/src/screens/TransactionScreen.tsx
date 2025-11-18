import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { TransactionItem } from '../components/TransactionItem';
import colors from '../constants/colors';
import Header from '../components/Header';
import { useLanguage } from '../hooks/useLang';

const MOCK_TRANSACTIONS = [
  {
    id: '1',
    projectId: 'p1',
    buyerId: 'b1',
    sellerId: 's1',
    amount: 1500.00,
    timestamp: '2023-11-18T10:30:00Z',
    buyerName: 'John Doe',
    sellerName: 'ABC Construction',
  },
  {
    id: '2',
    projectId: 'p2',
    buyerId: 'b2',
    sellerId: 's2',
    amount: -850.50,
    timestamp: '2023-11-17T14:15:00Z',
    buyerName: 'Jane Smith',
    sellerName: 'XYZ Supplies',
  },
];

export default function TransactionScreen() {
  const [transactions] = useState(MOCK_TRANSACTIONS);
  const router = useRouter();
  const {t} = useLanguage();

  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));

  const handleAddTransaction = () => {
    router.push('/(tabs)/transaction/add');
  };

  const handleTransactionPress = (transactionId: string) => {
    router.push(`/(tabs)/transaction/${transactionId}`);
  };

  return (
    <View style={styles.container}>
      <Header title={t('common.transaction')} onPress={() => router.back()} />
      <Image source={require('../../assets/creditCard.png')} style={styles.image} />

      <View style={styles.transactionHeader}>
        <Text style={styles.sectionTitle}>{t('common.recentTransactions')}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>{t('common.seeAll')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            id={item.id}
            amount={item.amount}
            timestamp={item.timestamp}
            buyerName={item.buyerName}
            sellerName={item.sellerName}
            onPress={() => handleTransactionPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    marginTop: 32,
  },
  balanceCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  income: {
    color: colors.success,
  },
  expense: {
    color: colors.danger,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 24,
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
});