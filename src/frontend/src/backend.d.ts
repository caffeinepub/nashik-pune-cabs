import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Booking {
    carModel: CarModel;
    carCategory: CarCategory;
    name: string;
    seats: bigint;
    stops: Array<string>;
    timestamp: Time;
    phone: string;
    price: bigint;
    luggage: {
        count: bigint;
        details: string;
    };
}
export interface UserProfile {
    name: string;
    phone: string;
}
export enum CarCategory {
    suv = "suv",
    sedan = "sedan",
    luxury = "luxury",
    hatchback = "hatchback"
}
export enum CarModel {
    xl6 = "xl6",
    hyundaiXcent = "hyundaiXcent",
    alto = "alto",
    bmw5Series = "bmw5Series",
    marutiCiaz = "marutiCiaz",
    innovaCrysta = "innovaCrysta",
    swiftDzire = "swiftDzire",
    kiaCarens = "kiaCarens",
    ertiga = "ertiga",
    audiA6 = "audiA6",
    scorpio = "scorpio",
    mercedesEClass = "mercedesEClass",
    swift = "swift",
    tavera = "tavera",
    innova = "innova",
    wagonR = "wagonR",
    hondaAmaze = "hondaAmaze"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(name: string, phone: string, carCategory: CarCategory, carModel: CarModel, price: bigint, stops: Array<string>, luggage: {
        count: bigint;
        details: string;
    }, seats: bigint): Promise<string>;
    createBookingWithStops(name: string, phone: string, carCategory: CarCategory, carModel: CarModel, price: bigint, stops: Array<string>, luggage: {
        count: bigint;
        details: string;
    }, seats: bigint): Promise<string>;
    findBookingByPhone(phone: string): Promise<[string, Booking] | null>;
    getAllBookingsWithIdsSorted(): Promise<Array<[string, Booking]>>;
    getBookingById(bookingId: string): Promise<Booking | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentPrincipalText(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasAdmin(): Promise<boolean>;
    initializeAdmin(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitStops(bookingId: string, stops: Array<string>): Promise<void>;
}
