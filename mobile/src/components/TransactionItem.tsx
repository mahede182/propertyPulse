import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

interface TransactionItemProps {
  id: string;
  amount: number;
  timestamp: string;
  buyerName: string;
  sellerName: string;
  onPress?: () => void;
}

export const TransactionItem = ({
  amount,
  timestamp,
  buyerName,
  sellerName,
  onPress,
}: TransactionItemProps) => {
  const isPositive = amount >= 0;
  const formattedAmount = `$${Math.abs(amount).toFixed(2)}`;
  const formattedDate = new Date(timestamp).toLocaleDateString();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>
          {isPositive ? '↓' : '↑'}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.primaryText}>
          {isPositive ? `From: ${sellerName}` : `To: ${buyerName}`}
        </Text>
        <Text style={styles.secondaryText}>{formattedDate}</Text>
      </View>
      <Text 
        style={[
          styles.amount,
          isPositive ? styles.positive : styles.negative
        ]}
      >
        {isPositive ? '+' : '-'}{formattedAmount}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  secondaryText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.danger,
  },
});