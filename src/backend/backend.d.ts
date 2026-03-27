import type { Principal } from '@dfinity/principal';

export type BookingStatus = { pending: null } | { confirmed: null } | { cancelled: null };

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  dropLocation: string;
  route: string;
  date: string;
  time: string;
  carType: string;
  carModel: string;
  seats: bigint;
  luggage: bigint;
  stops: string[];
  fare: string;
  status: BookingStatus;
  createdAt: bigint;
}

export interface _SERVICE {
  claimAdmin: () => Promise<boolean>;
  setAdmin: (p: Principal) => Promise<boolean>;
  getAdmin: () => Promise<[] | [Principal]>;
  isAdmin: () => Promise<boolean>;
  createBooking: (
    customerName: string,
    phone: string,
    email: string,
    pickupLocation: string,
    dropLocation: string,
    route: string,
    date: string,
    time: string,
    carType: string,
    carModel: string,
    seats: bigint,
    luggage: bigint,
    stops: string[],
    fare: string
  ) => Promise<string>;
  getBooking: (id: string) => Promise<[] | [Booking]>;
  getAllBookings: () => Promise<Booking[]>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<boolean>;
}
