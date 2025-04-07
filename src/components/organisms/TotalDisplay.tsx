import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextLabel from '../atoms/TextLabel';

interface TotalDisplayProps {
  total: number;
}

export default function TotalDisplay({ total }: TotalDisplayProps) {
  return (
    <View style={styles.container}>
      <TextLabel style={styles.label}>TOTAL BELANJA</TextLabel>
      <TextLabel style={styles.amount}>Rp{total.toLocaleString()}</TextLabel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b8a3e',
  },
});
