export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
  validUntil?: string;
}

const STORAGE_KEY = 'promo_codes';

const DEFAULT_PROMO_CODES: PromoCode[] = [
  { code: "AARA10", discountPercent: 10, description: "10% off your stay" },
  { code: "WELCOME20", discountPercent: 20, description: "20% welcome discount" },
  { code: "RETREAT15", discountPercent: 15, description: "15% retreat special" },
];

export const getPromoCodes = (): PromoCode[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROMO_CODES));
  return DEFAULT_PROMO_CODES;
};

export const validatePromoCode = (code: string): PromoCode | null => {
  const codes = getPromoCodes();
  const found = codes.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
  return found || null;
};

export const addPromoCode = (promo: PromoCode): void => {
  const codes = getPromoCodes();
  codes.push(promo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
};

export const deletePromoCode = (code: string): void => {
  const codes = getPromoCodes().filter(c => c.code !== code);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
};
