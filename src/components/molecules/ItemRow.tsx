import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TextLabel from '../atoms/TextLabel';
import TextInput from '../atoms/TextInput';

interface Item {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface ItemRowProps {
  item: Item;
  onChangeQty: (id: number, qty: number) => void;
  onChangePrice: (id: number, price: number) => void;
  onDelete: (id: number) => void;
}

export default function ItemRow({ item, onChangeQty, onChangePrice, onDelete }: ItemRowProps) {
  const handleQtyChange = (text: string) => {
    const qty = parseInt(text || '0');
    if (!isNaN(qty) && qty >= 0) {
      onChangeQty(item.id, qty);
    }
  };

  const handlePriceChange = (text: string) => {
    const price = parseInt(text.replace(/\D/g, '') || '0');
    if (!isNaN(price) && price >= 0) {
      onChangePrice(item.id, price);
    }
  };

  return (
    <View style={styles.row} accessibilityRole="list">
      <TextLabel 
        style={styles.name}
        accessibilityLabel={`Item: ${item.name}`}
      >
        {item.name}
      </TextLabel>
      <TextInput
        keyboardType="numeric"
        value={item.price.toString()}
        onChangeText={handlePriceChange}
        style={{...styles.input, ...styles.priceInput}}
        accessibilityLabel={`Price for ${item.name}`}
        accessibilityHint="Enter price"
      />
      <TextInput
        keyboardType="numeric"
        value={item.qty.toString()}
        onChangeText={handleQtyChange}
        style={styles.input}
        accessibilityLabel={`Quantity for ${item.name}`}
        accessibilityHint="Enter quantity"
      />
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={[styles.deleteButton, { backgroundColor: '#ff4444' }]}
        accessibilityLabel={`Delete ${item.name}`}
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    width: 60,
    textAlign: 'center',
    marginLeft: 8,
  },
  priceInput: {
    width: 100,
  },
  deleteButton: {
    width: 40,
    marginLeft: 8,
    padding: 8,
  },
});
