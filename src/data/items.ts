interface Item {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const items: Item[] = [
  { id: 1, name: 'Beras', price: 12000, qty: 0 },
  { id: 2, name: 'Minyak Goreng', price: 14000, qty: 0 },
  { id: 3, name: 'Gula', price: 10000, qty: 0 },
];

export default items;
export type { Item };
