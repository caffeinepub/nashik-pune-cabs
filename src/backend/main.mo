import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";


import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Add CLO migration support

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var adminInitialized : Bool = false;

  public type UserProfile = {
    name : Text;
    phone : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type CarCategory = {
    #sedan;
    #suv;
    #hatchback;
    #luxury;
  };

  type CarModel = {
    #swiftDzire;
    #hondaAmaze;
    #hyundaiXcent;
    #marutiCiaz;
    #innovaCrysta;
    #ertiga;
    #scorpio;
    #swift;
    #wagonR;
    #alto;
    #mercedesEClass;
    #bmw5Series;
    #audiA6;
    #xl6;
    #kiaCarens;
    #innova;
    #tavera;
  };

  type Booking = {
    name : Text;
    phone : Text;
    carCategory : CarCategory;
    carModel : CarModel;
    timestamp : Time.Time;
    price : Nat;
    stops : [Text];
    luggage : { count : Nat; details : Text };
    seats : Nat;
  };

  let bookings = Map.empty<Text, Booking>();

  public query ({ caller }) func getAllBookingsWithIdsSorted() : async [(Text, Booking)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.toArray().sort(
      func((id1, booking1), (id2, booking2)) {
        switch (Nat.compare(booking2.timestamp.toNat(), booking1.timestamp.toNat())) {
          case (#equal) { Text.compare(id1, id2) };
          case (other) { other };
        };
      }
    ); // Return latest bookings first.
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

  func validateStops(stops : [Text]) {
    if (stops.size() > 5) { Runtime.trap("Too many stops") };
    stops.forEach(func(stop) {
      if (stop.size() > 100) { Runtime.trap("Stop location too long") };
    });
  };

  func generateBookingId() : Text {
    Time.now().toNat().toText().concat("BK");
  };

  public shared ({ caller }) func createBooking(
    name : Text,
    phone : Text,
    carCategory : CarCategory,
    carModel : CarModel,
    price : Nat,
    stops : [Text],
    luggage : { count : Nat; details : Text },
    seats : Nat,
  ) : async Text {
    if (seats < 1 or seats > 7) { Runtime.trap("Invalid number of seats") };
    if (luggage.count > 10) { Runtime.trap("Too much luggage") };

    validateName(name);
    validatePhone(phone);
    validateStops(stops);

    let bookingId = generateBookingId();

    let booking : Booking = {
      name;
      phone;
      carCategory;
      carModel;
      timestamp = Time.now();
      price;
      stops;
      luggage;
      seats;
    };

    bookings.add(bookingId, booking);

    bookingId;
  };

  public shared ({ caller }) func initializeAdmin() : async () {
    if (adminInitialized) {
      Runtime.trap("Unauthorized: Admin already initialized");
    };
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot be admin");
    };
    AccessControl.initialize(accessControlState, caller, "", "");
    adminInitialized := true;
  };

  public query ({ caller }) func hasAdmin() : async Bool {
    adminInitialized;
  };

  public query ({ caller }) func getCurrentPrincipalText() : async Text {
    caller.toText();
  };

  public query ({ caller }) func getBookingById(bookingId : Text) : async ?Booking {
    if (bookingId.isEmpty()) { Runtime.trap("Booking ID cannot be empty") };
    bookings.get(bookingId);
  };

  public query ({ caller }) func findBookingByPhone(phone : Text) : async ?(Text, Booking) {
    if (phone.isEmpty()) { Runtime.trap("Phone cannot be empty") };

    let filteredEntries = bookings.entries().filter(
      func((_, booking)) { booking.phone == phone }
    );

    switch (filteredEntries.size()) {
      case (0) {
        Runtime.trap("Booking with phone number " # phone # " does not exist");
      };
      case (_) { filteredEntries.next() };
    };
  };

  public shared ({ caller }) func submitStops(bookingId : Text, stops : [Text]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update booking stops");
    };
    validateStops(stops);
    let currentBooking = switch (bookings.get(bookingId)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking does not exist") };
    };
    let updatedBooking = {
      name = currentBooking.name;
      phone = currentBooking.phone;
      carCategory = currentBooking.carCategory;
      carModel = currentBooking.carModel;
      timestamp = currentBooking.timestamp;
      price = currentBooking.price;
      stops;
      luggage = currentBooking.luggage;
      seats = currentBooking.seats;
    };
    bookings.add(bookingId, updatedBooking);
  };

  public shared ({ caller }) func createBookingWithStops(
    name : Text,
    phone : Text,
    carCategory : CarCategory,
    carModel : CarModel,
    price : Nat,
    stops : [Text],
    luggage : { count : Nat; details : Text },
    seats : Nat,
  ) : async Text {
    await createBooking(
      name,
      phone,
      carCategory,
      carModel,
      price,
      stops,
      luggage,
      seats,
    );
  };
};
