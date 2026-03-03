import Nat "mo:core/Nat";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  type OldBooking = {
    name : Text;
    phone : Text;
    carCategory : {
      #sedan;
      #suv;
      #hatchback;
      #luxury;
    };
    carModel : {
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
    };
    timestamp : Time.Time;
  };

  type OldActor = {
    bookings : Map.Map<Text, OldBooking>;
  };

  type NewBooking = {
    name : Text;
    phone : Text;
    carCategory : {
      #sedan;
      #suv;
      #hatchback;
      #luxury;
    };
    carModel : {
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
    };
    timestamp : Time.Time;
    price : Nat;
    stops : [Text];
    luggage : { count : Nat; details : Text };
    seats : Nat;
  };

  type NewActor = {
    bookings : Map.Map<Text, NewBooking>;
  };

  func getDefaultStops() : [Text] {
    List.empty<Text>().toArray();
  };

  public func run(old : OldActor) : NewActor {
    let newBookings = old.bookings.map<Text, OldBooking, NewBooking>(
      func(_id, oldBooking) {
        { oldBooking with
          price = 0;
          stops = getDefaultStops();
          luggage = { count = 0; details = "" };
          seats = 0;
        };
      }
    );

    { bookings = newBookings };
  };
};
