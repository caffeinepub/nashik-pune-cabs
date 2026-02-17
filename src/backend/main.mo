import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Char "mo:core/Char";

actor {
  type Booking = {
    name : Text;
    phone : Text;
    timestamp : Time.Time;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.timestamp.toNat(), booking2.timestamp.toNat());
    };
  };

  let bookings = Map.empty<Text, Booking>();

  public query ({ caller }) func getAllBookingsWithIdsSorted() : async [(Text, Booking)] {
    bookings.toArray().sort(
      func((id1, booking1), (id2, booking2)) {
        switch (Nat.compare(booking2.timestamp.toNat(), booking1.timestamp.toNat())) {
          case (#equal) { Text.compare(id1, id2) };
          case (other) { other };
        };
      }
    ); // Return latest bookings first
  };

  func validateName(name : Text) {
    if (name.size() < 2) { Runtime.trap("Name too short") };
    if (name.size() > 30) { Runtime.trap("Name too long") };
  };

  func validatePhone(phone : Text) {
    if (phone.size() < 10) { Runtime.trap("Phone number too short") };
    if (phone.size() > 15) { Runtime.trap("Phone number too long") };
    let validChars = phone.chars().all(func(c) { c.isDigit() or c == '+' });
    if (not validChars) { Runtime.trap("Phone number contains invalid characters") };
  };

  func generateBookingId() : Text {
    Time.now().toNat().toText().concat("BK");
  };

  public shared ({ caller }) func createBooking(
    name : Text,
    phone : Text,
  ) : async Text {
    validateName(name);
    validatePhone(phone);

    let bookingId = generateBookingId();

    let booking : Booking = {
      name;
      phone;
      timestamp = Time.now();
    };

    bookings.add(bookingId, booking);

    bookingId.concat(" ").concat(name).concat(" ").concat(phone);
  };
};
