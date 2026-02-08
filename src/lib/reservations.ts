export interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  totalPrice: number;
  nights: number;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const STORAGE_KEY = 'hotel_reservations';

export const saveReservation = (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
  const reservations = getReservations();
  const newReservation: Reservation = {
    ...reservation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };
  reservations.push(newReservation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  return newReservation;
};

export const getReservations = (): Reservation[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const updateReservationStatus = (id: string, status: Reservation['status']): void => {
  const reservations = getReservations();
  const index = reservations.findIndex(r => r.id === id);
  if (index !== -1) {
    reservations[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  }
};

export const deleteReservation = (id: string): void => {
  const reservations = getReservations().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
};
