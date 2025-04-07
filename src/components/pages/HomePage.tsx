import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Button from '../atoms/Button';
import ItemList from '../organisms/ItemList';
import TotalDisplay from '../organisms/TotalDisplay';
import HistoryList from '../organisms/HistoryList';
import itemsData, { Item } from '../../data/items';
import history, { HistoryItem, deleteHistoryItem } from '../../data/history';

export default function HomePage() {
  const [items, setItems] = useState<Item[]>(itemsData);
  const [showHistory, setShowHistory] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(0);

  useEffect(() => {
    setHistoryItems(history);
  }, []);

  const handleQtyChange = (id: number, qty: number) => {
    setItems(prev => {
      const oldItem = prev.find(item => item.id === id);
      if (oldItem) {
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: new Date(),
          itemId: id,
          itemName: oldItem.name,
          oldPrice: oldItem.price,
          newPrice: oldItem.price,
          oldQty: oldItem.qty,
          newQty: qty
        };
        history.push(newHistoryItem);
        setHistoryItems([...history]);
      }
      return prev.map(item => (item.id === id ? { ...item, qty } : item));
    });
  };

  const handleAddItem = () => {
    if (newItemName.trim() && newItemPrice > 0) {
      const newItem: Item = {
        id: Date.now(),
        name: newItemName,
        price: newItemPrice,
        qty: 0
      };
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date(),
        itemId: newItem.id,
        itemName: newItem.name,
        oldPrice: 0,
        newPrice: newItem.price,
        oldQty: 0,
        newQty: 0,
        action: 'add'
      };

      setItems(prev => [...prev, newItem]);
      history.push(newHistoryItem);
      setHistoryItems([...history]);
      setNewItemName('');
      setNewItemPrice(0);
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems(prev => {
      const deletedItem = prev.find(item => item.id === id);
      if (deletedItem) {
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: new Date(),
          itemId: id,
          itemName: deletedItem.name,
          oldPrice: deletedItem.price,
          newPrice: 0,
          oldQty: deletedItem.qty,
          newQty: 0,
          action: 'delete'
        };
        history.push(newHistoryItem);
        setHistoryItems([...history]);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const handlePriceChange = (id: number, price: number) => {
    setItems(prev => {
      const oldItem = prev.find(item => item.id === id);
      if (oldItem) {
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: new Date(),
          itemId: id,
          itemName: oldItem.name,
          oldPrice: oldItem.price,
          newPrice: price,
          oldQty: oldItem.qty,
          newQty: oldItem.qty
        };
        history.push(newHistoryItem);
        setHistoryItems([...history]);
      }
      return prev.map(item => (item.id === id ? { ...item, price } : item));
    });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View style={styles.container}>
      {!showHistory ? (
        <>
          <View style={styles.addItemContainer}>
            <TextInput
              placeholder="Item name"
              value={newItemName}
              onChangeText={setNewItemName}
              style={styles.nameInput}
            />
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              value={newItemPrice.toString()}
              onChangeText={text => setNewItemPrice(parseInt(text) || 0)}
              style={styles.priceInput}
            />
            <Button
              title="Add Item"
              onPress={handleAddItem}
              backgroundColor="#4CAF50"
            />
          </View>
          <ItemList 
            items={items} 
            onChangeQty={handleQtyChange}
            onChangePrice={handlePriceChange}
            onDelete={handleDeleteItem}
          />
          {showTotal && <TotalDisplay total={total} />}
          <View style={styles.buttonContainer}>
            <Button 
              title="Hitung Total" 
              onPress={() => setShowTotal(true)}
              backgroundColor="#4CAF50"
            />
            <View style={styles.buttonSpacer} />
            <Button 
              title="View History" 
              onPress={() => setShowHistory(true)}
              backgroundColor="#2196F3"
            />
          </View>
        </>
      ) : (
        <>
          <HistoryList 
            history={historyItems} 
            onDelete={(id) => {
              if (deleteHistoryItem(id)) {
                setHistoryItems([...history]);
              }
            }}
          />
          <Button 
            title="Back to Items" 
            onPress={() => {
              setShowHistory(false);
              setShowTotal(false);
            }}
            backgroundColor="#607D8B"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  priceInput: {
    width: 80,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSpacer: {
    width: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
});
