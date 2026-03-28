import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

actor {
  type CarCategory = { #suv; #sedan; #luxury; #hatchback };
  type CarModel = {
    #xl6; #hyundaiXcent; #alto; #bmw5Series; #marutiCiaz; #innovaCrysta;
    #swiftDzire; #kiaCarens; #ertiga; #audiA6; #scorpio; #mercedesEClass;
    #swift; #tavera; #innova; #wagonR; #hondaAmaze
  };
  type Luggage = { count: Nat; details: Text };
  type UserProfile = { name: Text; phone: Text };
  type UserRole = { #admin; #user; #guest };
  type Time = Int;
  type Booking = {
    carModel: CarModel;
    carCategory: CarCategory;
    name: Text;
    seats: Nat;
    stops: [Text];
    timestamp: Time;
    phone: Text;
    price: Nat;
    luggage: Luggage;
  };

  // Migration: preserve old stable var from previous schema to avoid M0169 error
  type OldBookingStatus = { #pending; #confirmed; #cancelled };
  type OldBooking = {
    id: Text;
    customerName: Text;
    phone: Text;
    email: Text;
    pickupLocation: Text;
    dropLocation: Text;
    route: Text;
    date: Text;
    time: Text;
    carType: Text;
    carModel: Text;
    seats: Nat;
    luggage: Nat;
    stops: [Text];
    fare: Text;
    status: OldBookingStatus;
    createdAt: Int;
  };
  stable var bookings: [OldBooking] = [];

  // New storage
  stable var bookingIds: [Text] = [];
  stable var bookingData: [Booking] = [];
  stable var bookingCounter: Nat = 0;

  stable var profileOwners: [Principal] = [];
  stable var profileData: [UserProfile] = [];

  stable var adminPrincipal: ?Principal = null;
  stable var adminAssigned: Bool = false;

  // Helper: find booking index
  func findBookingIndex(id: Text): ?Nat {
    var i = 0;
    for (bid in bookingIds.vals()) {
      if (bid == id) return ?i;
      i += 1;
    };
    null
  };

  // Helper: find profile index
  func findProfileIndex(p: Principal): ?Nat {
    var i = 0;
    for (owner in profileOwners.vals()) {
      if (owner == p) return ?i;
      i += 1;
    };
    null
  };

  // ===== Admin / Authorization =====

  public shared(msg) func initializeAdmin(): async () {
    if (not adminAssigned) {
      adminPrincipal := ?msg.caller;
      adminAssigned := true;
    }
  };

  public query func hasAdmin(): async Bool {
    adminAssigned
  };

  public shared query(msg) func isCallerAdmin(): async Bool {
    switch (adminPrincipal) {
      case (?admin) { msg.caller == admin };
      case (null) { false };
    }
  };

  public shared query(msg) func getCurrentPrincipalText(): async Text {
    Principal.toText(msg.caller)
  };

  public shared query(msg) func getCallerUserRole(): async UserRole {
    switch (adminPrincipal) {
      case (?admin) {
        if (msg.caller == admin) { #admin }
        else if (msg.caller.isAnonymous()) { #guest }
        else { #user }
      };
      case (null) {
        if (msg.caller.isAnonymous()) { #guest } else { #user }
      };
    }
  };

  public shared(msg) func assignCallerUserRole(_user: Principal, _role: UserRole): async () {
    // no-op: admin is managed via initializeAdmin
  };

  // ===== User Profiles =====

  public shared query(msg) func getCallerUserProfile(): async ?UserProfile {
    switch (findProfileIndex(msg.caller)) {
      case (?i) { ?profileData[i] };
      case (null) { null };
    }
  };

  public shared(msg) func saveCallerUserProfile(profile: UserProfile): async () {
    switch (findProfileIndex(msg.caller)) {
      case (?i) {
        let arr = Array.thaw<UserProfile>(profileData);
        arr[i] := profile;
        profileData := Array.freeze(arr);
      };
      case (null) {
        profileOwners := Array.append(profileOwners, [msg.caller]);
        profileData := Array.append(profileData, [profile]);
      };
    }
  };

  public query func getUserProfile(user: Principal): async ?UserProfile {
    switch (findProfileIndex(user)) {
      case (?i) { ?profileData[i] };
      case (null) { null };
    }
  };

  // ===== Bookings =====

  private func doCreateBooking(
    name: Text,
    phone: Text,
    carCategory: CarCategory,
    carModel: CarModel,
    price: Nat,
    stops: [Text],
    luggage: Luggage,
    seats: Nat
  ): Text {
    bookingCounter += 1;
    let id = "NPC" # Nat.toText(bookingCounter);
    let booking: Booking = {
      carModel;
      carCategory;
      name;
      seats;
      stops;
      timestamp = Time.now();
      phone;
      price;
      luggage;
    };
    bookingIds := Array.append(bookingIds, [id]);
    bookingData := Array.append(bookingData, [booking]);
    id
  };

  public shared func createBooking(
    name: Text,
    phone: Text,
    carCategory: CarCategory,
    carModel: CarModel,
    price: Nat,
    stops: [Text],
    luggage: Luggage,
    seats: Nat
  ): async Text {
    doCreateBooking(name, phone, carCategory, carModel, price, stops, luggage, seats)
  };

  public shared func createBookingWithStops(
    name: Text,
    phone: Text,
    carCategory: CarCategory,
    carModel: CarModel,
    price: Nat,
    stops: [Text],
    luggage: Luggage,
    seats: Nat
  ): async Text {
    doCreateBooking(name, phone, carCategory, carModel, price, stops, luggage, seats)
  };

  public query func getBookingById(bookingId: Text): async ?Booking {
    switch (findBookingIndex(bookingId)) {
      case (?i) { ?bookingData[i] };
      case (null) { null };
    }
  };

  public shared query(msg) func getAllBookingsWithIdsSorted(): async [(Text, Booking)] {
    let isAdmin = switch (adminPrincipal) {
      case (?admin) { msg.caller == admin };
      case (null) { false };
    };
    if (not isAdmin) { return [] };
    let n = bookingIds.size();
    var pairs: [(Text, Booking)] = [];
    var i = n;
    while (i > 0) {
      i -= 1;
      pairs := Array.append(pairs, [(bookingIds[i], bookingData[i])]);
    };
    pairs
  };

  public query func findBookingByPhone(phone: Text): async ?(Text, Booking) {
    var i = 0;
    for (b in bookingData.vals()) {
      if (b.phone == phone) {
        return ?(bookingIds[i], b);
      };
      i += 1;
    };
    null
  };

  public shared func submitStops(bookingId: Text, newStops: [Text]): async () {
    switch (findBookingIndex(bookingId)) {
      case (?i) {
        let arr = Array.thaw<Booking>(bookingData);
        let b = arr[i];
        arr[i] := {
          carModel = b.carModel;
          carCategory = b.carCategory;
          name = b.name;
          seats = b.seats;
          stops = newStops;
          timestamp = b.timestamp;
          phone = b.phone;
          price = b.price;
          luggage = b.luggage;
        };
        bookingData := Array.freeze(arr);
      };
      case (null) {};
    }
  };
}
