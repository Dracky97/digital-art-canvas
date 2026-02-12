export interface RoomPricing {
  id: string;
  name: string;
  price: number;
}

const STORAGE_KEY = 'room_pricing';

const DEFAULT_PRICES: RoomPricing[] = [
  { id: "mud-house", name: "Mud House", price: 450 },
  { id: "tree-house", name: "Tree House", price: 550 },
  { id: "glamping", name: "Luxury Glamping", price: 350 },
  { id: "luxury-suite", name: "Luxury Suite", price: 750 },
  { id: "family-suite", name: "Family Suite", price: 650 },
];

export const getRoomPrices = (): RoomPricing[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return DEFAULT_PRICES;
};

export const updateRoomPrice = (id: string, price: number): void => {
  const prices = getRoomPrices();
  const index = prices.findIndex(r => r.id === id);
  if (index !== -1) {
    prices[index].price = price;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
  }
};

export const getRoomPrice = (id: string): number => {
  const prices = getRoomPrices();
  const room = prices.find(r => r.id === id);
  return room?.price ?? 0;
};
