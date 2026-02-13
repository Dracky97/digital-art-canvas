export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  validUntil: string;
  terms: string;
  promoCode?: string;
  promoDiscount?: number;
}

const STORAGE_KEY = 'offers_data';

const DEFAULT_OFFERS: Offer[] = [
  {
    id: "extended-stay",
    title: "Extended Stay Retreat",
    subtitle: "Stay 5 nights, pay for 4",
    description: "Extend your sanctuary escape with complimentary nights and exclusive amenities including daily spa credits and private dining experiences.",
    imageUrl: "",
    validUntil: "March 31, 2025",
    terms: "Subject to availability. Blackout dates apply.",
  },
];

export const getOffers = (): Offer[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_OFFERS));
  return DEFAULT_OFFERS;
};

export const addOffer = (offer: Omit<Offer, 'id'>): Offer => {
  const offers = getOffers();
  const newOffer: Offer = { ...offer, id: `offer-${Date.now()}` };
  offers.push(newOffer);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  return newOffer;
};

export const updateOffer = (id: string, updates: Partial<Omit<Offer, 'id'>>): void => {
  const offers = getOffers();
  const index = offers.findIndex(o => o.id === id);
  if (index !== -1) {
    offers[index] = { ...offers[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  }
};

export const deleteOffer = (id: string): void => {
  const offers = getOffers().filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
};
