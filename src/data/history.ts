interface HistoryItem {
  id: string;
  timestamp: Date;
  itemId: number;
  itemName: string;
  oldPrice: number;
  newPrice: number;
  oldQty: number;
  newQty: number;
  action?: 'add' | 'update' | 'delete';
}

const history: HistoryItem[] = [];

export function deleteHistoryItem(id: string) {
  const index = history.findIndex(item => item.id === id);
  if (index !== -1) {
    history.splice(index, 1);
    return true;
  }
  return false;
}

export default history;
export type { HistoryItem };
