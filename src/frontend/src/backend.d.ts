import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    name: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    createBooking(name: string, phone: string): Promise<string>;
    getAllBookingsWithIdsSorted(): Promise<Array<[string, Booking]>>;
}
