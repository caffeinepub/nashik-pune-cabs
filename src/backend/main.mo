import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor {
  type BookingStatus = { #pending; #confirmed; #cancelled };

  type Booking = {
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
    status: BookingStatus;
    createdAt: Int;
  };

  stable var bookings: [Booking] = [];
  stable var adminPrincipal: ?Principal = null;
  stable var bookingCounter: Nat = 0;

  // Admin management
  public shared(msg) func claimAdmin(): async Bool {
    switch (adminPrincipal) {
      case (null) {
        adminPrincipal := ?msg.caller;
        true
      };
      case (?_) { false };
    }
  };

  public shared(msg) func setAdmin(p: Principal): async Bool {
    switch (adminPrincipal) {
      case (null) {
        adminPrincipal := ?p;
        true
      };
      case (?admin) {
        if (msg.caller == admin) {
          adminPrincipal := ?p;
          true
        } else { false }
      };
    }
  };

  public query func getAdmin(): async ?Principal {
    adminPrincipal
  };

  public shared query(msg) func isAdmin(): async Bool {
    switch (adminPrincipal) {
      case (null) { false };
      case (?admin) { msg.caller == admin };
    }
  };

  // Booking management
  public shared func createBooking(
    customerName: Text,
    phone: Text,
    email: Text,
    pickupLocation: Text,
    dropLocation: Text,
    route: Text,
    date: Text,
    time: Text,
    carType: Text,
    carModel: Text,
    seats: Nat,
    luggage: Nat,
    stops: [Text],
    fare: Text
  ): async Text {
    bookingCounter += 1;
    let id = "NPC" # Nat.toText(bookingCounter);
    let booking: Booking = {
      id;
      customerName;
      phone;
      email;
      pickupLocation;
      dropLocation;
      route;
      date;
      time;
      carType;
      carModel;
      seats;
      luggage;
      stops;
      fare;
      status = #pending;
      createdAt = Time.now();
    };
    bookings := Array.append(bookings, [booking]);
    id
  };

  public query func getBooking(id: Text): async ?Booking {
    Array.find(bookings, func(b: Booking): Bool { b.id == id })
  };

  public shared query(msg) func getAllBookings(): async [Booking] {
    switch (adminPrincipal) {
      case (?admin) {
        if (msg.caller == admin) { bookings }
        else { [] }
      };
      case (null) { [] };
    }
  };

  public shared(msg) func updateBookingStatus(id: Text, status: BookingStatus): async Bool {
    switch (adminPrincipal) {
      case (?admin) {
        if (msg.caller != admin) { return false };
      };
      case (null) { return false };
    };
    var found = false;
    bookings := Array.map(bookings, func(b: Booking): Booking {
      if (b.id == id) {
        found := true;
        { b with status }
      } else { b }
    });
    found
  };
}
