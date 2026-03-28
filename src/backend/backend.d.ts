import type { Principal } from '@dfinity/principal';

export type CarCategory = { sedan: null } | { suv: null };
export type CarModel =
  | { swiftDzire: null }
  | { marutiCiaz: null }
  | { hyundaiXcent: null }
  | { wagonR: null }
  | { hondaAmaze: null }
  | { ertiga: null }
  | { xl6: null }
  | { kiaCarens: null }
  | { innova: null }
  | { innovaCrysta: null }
  | { tavera: null };
export type BookingStatus = { pending: null } | { confirmed: null } | { cancelled: null };
export interface Luggage { count: bigint; details: string; }
export interface Booking {
  id: string;
  name: string;
  phone: string;
  carCategory: CarCategory;
  carModel: CarModel;
  price: bigint;
  stops: string[];
  luggage: Luggage;
  seats: bigint;
  status: BookingStatus;
  createdAt: bigint;
}

export interface _SERVICE {
  initializeAdmin: () => Promise<void>;
  hasAdmin: () => Promise<boolean>;
  isCallerAdmin: () => Promise<boolean>;
  createBooking: (
    name: string,
    phone: string,
    carCategory: CarCategory,
    carModel: CarModel,
    price: bigint,
    stops: string[],
    luggage: Luggage,
    seats: bigint
  ) => Promise<string>;
  getBookingById: (id: string) => Promise<[] | [Booking]>;
  getAllBookingsWithIdsSorted: () => Promise<[string, Booking][]>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<boolean>;
}
