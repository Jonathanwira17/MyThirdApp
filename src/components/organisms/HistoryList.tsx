import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TextLabel from '../atoms/TextLabel';
import Button from '../atoms/Button';
import { HistoryItem } from '../../data/history';

interface HistoryListProps {
  history: HistoryItem[];
  onDelete?: (id: string) => void;
}

export default function HistoryList({ history, onDelete }: HistoryListProps) {
  return (
    <ScrollView style={styles.container}>
      {history.map((item) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.itemContent}>
            <TextLabel style={styles.text}>
              {new Date(item.timestamp).toLocaleString()}
            </TextLabel>
            <TextLabel style={styles.text}>
              {item.itemName}: {item.oldQty}→{item.newQty} @ Rp{item.oldPrice}→Rp{item.newPrice}
            </TextLabel>
          </View>
          {onDelete && (
            <Button
              title="Delete"
              onPress={() => onDelete(item.id)}
              backgroundColor="#ff6b6b"
              style={styles.deleteButton}
              accessibilityLabel={`Delete history item ${item.itemName}`}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  item: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  deleteButton: {
    marginLeft: 12,
    minWidth: 80,
  },
});
