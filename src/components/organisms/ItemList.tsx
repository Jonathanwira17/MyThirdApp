import React from 'react';
import { View, StyleSheet } from 'react-native';
import ItemRow from '../molecules/ItemRow';
import { Item } from '../../data/items';

interface ItemListProps {
  items: Item[];
  onChangeQty: (id: number, qty: number) => void;
  onChangePrice: (id: number, price: number) => void;
  onDelete: (id: number) => void;
}

export default function ItemList({ items, onChangeQty, onChangePrice, onDelete }: ItemListProps) {
  return (
    <View style={styles.container} accessibilityRole="list">
      {items.map(item => (
        <ItemRow 
          key={item.id}
          item={item}
          onChangeQty={onChangeQty}
            onChangePrice={onChangePrice}
            onDelete={onDelete}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});
