import {
  Calendar,
  Car,
  Clock,
  IndianRupee,
  Loader2,
  MapPin,
  Navigation,
  Package,
  Phone as PhoneIcon,
  Search,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { type Booking, CarCategory, CarModel } from "../backend";
import { useFindBookingByPhone } from "../hooks/useFindBookingByPhone";
import { useGetBookingById } from "../hooks/useGetBookingById";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const CAR_CATEGORY_LABELS: Record<CarCategory, string> = {
  [CarCategory.sedan]: "Sedan",
  [CarCategory.suv]: "SUV",
  [CarCategory.hatchback]: "Hatchback",
  [CarCategory.luxury]: "Luxury",
};

const CAR_MODEL_LABELS: Record<CarModel, string> = {
  [CarModel.swiftDzire]: "Swift Dzire",
  [CarModel.hondaAmaze]: "Honda Amaze",
  [CarModel.hyundaiXcent]: "Hyundai Xcent",
  [CarModel.marutiCiaz]: "Maruti Ciaz",
  [CarModel.innovaCrysta]: "Innova Crysta",
  [CarModel.ertiga]: "Ertiga",
  [CarModel.scorpio]: "Scorpio",
  [CarModel.swift]: "Swift",
  [CarModel.wagonR]: "WagonR",
  [CarModel.alto]: "Alto",
  [CarModel.mercedesEClass]: "Mercedes E-Class",
  [CarModel.bmw5Series]: "BMW 5 Series",
  [CarModel.audiA6]: "Audi A6",
  [CarModel.xl6]: "Maruti XL6",
  [CarModel.kiaCarens]: "Kia Carens",
  [CarModel.innova]: "Toyota Innova",
  [CarModel.tavera]: "Chevrolet Tavera",
};

function BookingCard({
  referenceId,
  booking,
}: { referenceId: string; booking: Booking }) {
  const formatTimestamp = (ts: bigint) => {
    const date = new Date(Number(ts) / 1_000_000);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="mt-6 space-y-4 rounded-xl border-2 border-saffron/30 bg-saffron/5 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-foreground">Booking Found</h4>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Confirmed
        </span>
      </div>

      {/* Reference ID */}
      <div className="rounded-lg bg-saffron/10 p-3 text-center">
        <p className="text-xs font-medium text-muted-foreground">
          Booking Reference ID
        </p>
        <p className="mt-0.5 text-xl font-bold tracking-wide text-saffron">
          {referenceId}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Passenger */}
        <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
          <User className="mt-0.5 h-4 w-4 text-saffron" />
          <div>
            <p className="text-xs text-muted-foreground">Passenger</p>
            <p className="font-semibold">{booking.name}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
          <PhoneIcon className="mt-0.5 h-4 w-4 text-saffron" />
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="font-semibold">{booking.phone}</p>
          </div>
        </div>

        {/* Vehicle */}
        <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
          <Car className="mt-0.5 h-4 w-4 text-saffron" />
          <div>
            <p className="text-xs text-muted-foreground">Vehicle</p>
            <p className="font-semibold">
              {CAR_CATEGORY_LABELS[booking.carCategory] ?? booking.carCategory}
              {" — "}
              {CAR_MODEL_LABELS[booking.carModel] ?? booking.carModel}
            </p>
          </div>
        </div>

        {/* Booked On */}
        <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
          <Calendar className="mt-0.5 h-4 w-4 text-saffron" />
          <div>
            <p className="text-xs text-muted-foreground">Booked On</p>
            <p className="font-semibold">
              {formatTimestamp(booking.timestamp)}
            </p>
          </div>
        </div>

        {/* Seats */}
        <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
          <Users className="mt-0.5 h-4 w-4 text-saffron" />
          <div>
            <p className="text-xs text-muted-foreground">Seats</p>
            <p className="font-semibold">
              {Number(booking.seats)} seat
              {Number(booking.seats) !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Luggage */}
        <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
          <Package className="mt-0.5 h-4 w-4 text-saffron" />
          <div>
            <p className="text-xs text-muted-foreground">Luggage</p>
            <p className="font-semibold">
              {Number(booking.luggage.count)} bag
              {Number(booking.luggage.count) !== 1 ? "s" : ""}
              {booking.luggage.details ? ` — ${booking.luggage.details}` : ""}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
          <IndianRupee className="mt-0.5 h-4 w-4 text-saffron" />
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-semibold text-saffron">
              {Number(booking.price) > 0
                ? `₹${Number(booking.price).toLocaleString("en-IN")}`
                : "To be confirmed"}
            </p>
          </div>
        </div>
      </div>

      {/* Stops */}
      {booking.stops && booking.stops.length > 0 && (
        <div className="rounded-lg border bg-background p-3">
          <div className="mb-2 flex items-center gap-2">
            <Navigation className="h-4 w-4 text-saffron" />
            <p className="text-xs font-semibold text-muted-foreground">Stops</p>
          </div>
          <ol className="space-y-1">
            {booking.stops.map((stop, i) => (
              <li key={stop} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-saffron/20 text-xs font-bold text-saffron">
                  {i + 1}
                </span>
                {stop}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

type SearchMode = "phone" | "id";

export default function BookingLookup() {
  const [mode, setMode] = useState<SearchMode>("phone");
  const [phoneInput, setPhoneInput] = useState("");
  const [idInput, setIdInput] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [foundByPhone, setFoundByPhone] = useState<[string, Booking] | null>(
    null,
  );

  const {
    mutate: findByPhone,
    isPending: phoneSearching,
    reset: resetPhoneError,
  } = useFindBookingByPhone();
  const { data: bookingById, isLoading: idSearching } =
    useGetBookingById(searchedId);

  const handlePhoneSearch = () => {
    if (!phoneInput.trim()) return;
    setNotFound(false);
    setFoundByPhone(null);
    resetPhoneError();
    // Normalize: strip spaces, dashes, parentheses so backend validation passes
    const normalizedPhone = phoneInput.trim().replace(/[\s\-().]/g, "");
    findByPhone(normalizedPhone, {
      onSuccess: (result) => {
        if (result && Array.isArray(result) && result.length === 2) {
          setFoundByPhone(result as [string, Booking]);
          setNotFound(false);
        } else {
          setFoundByPhone(null);
          setNotFound(true);
        }
      },
      onError: (err: unknown) => {
        setFoundByPhone(null);
        const msg = err instanceof Error ? err.message : String(err ?? "");
        if (
          msg.toLowerCase().includes("does not exist") ||
          msg.toLowerCase().includes("not found")
        ) {
          setNotFound(true);
        } else {
          setNotFound(true);
        }
      },
    });
  };

  const handleIdSearch = () => {
    if (!idInput.trim()) return;
    setNotFound(false);
    setSearchedId(idInput.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (mode === "phone") handlePhoneSearch();
      else handleIdSearch();
    }
  };

  const showIdNotFound = searchedId && !idSearching && bookingById === null;
  const isSearching = phoneSearching || idSearching;

  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Track Your <span className="text-saffron">Booking</span>
            </h2>
            <p className="text-muted-foreground">
              Enter your phone number or booking reference ID to view your
              booking details
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-saffron/10 to-saffron/5 pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Search className="h-5 w-5 text-saffron" />
                Find My Booking
              </CardTitle>
              <CardDescription>
                Search by phone number or booking reference ID
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              {/* Mode Toggle */}
              <div className="mb-5 flex rounded-lg border border-border bg-muted/40 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("phone");
                    setNotFound(false);
                    setFoundByPhone(null);
                    resetPhoneError();
                  }}
                  className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${
                    mode === "phone"
                      ? "bg-saffron text-charcoal shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  By Phone Number
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("id");
                    setNotFound(false);
                    setSearchedId("");
                  }}
                  className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${
                    mode === "id"
                      ? "bg-saffron text-charcoal shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  By Booking ID
                </button>
              </div>

              {mode === "phone" ? (
                <div className="space-y-3">
                  <Label htmlFor="lookup-phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="lookup-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button
                      onClick={handlePhoneSearch}
                      disabled={isSearching || !phoneInput.trim()}
                      className="bg-saffron text-charcoal hover:bg-saffron/90"
                    >
                      {phoneSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="lookup-id">Booking Reference ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="lookup-id"
                      placeholder="e.g. 1234567890BK"
                      value={idInput}
                      onChange={(e) => setIdInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 font-mono"
                    />
                    <Button
                      onClick={handleIdSearch}
                      disabled={isSearching || !idInput.trim()}
                      className="bg-saffron text-charcoal hover:bg-saffron/90"
                    >
                      {idSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Not Found */}
              {(notFound || showIdNotFound) && (
                <Alert className="mt-4" variant="destructive">
                  <AlertDescription>
                    No booking found. Please check your{" "}
                    {mode === "phone" ? "phone number" : "booking reference ID"}{" "}
                    and try again.
                  </AlertDescription>
                </Alert>
              )}

              {/* Results */}
              {mode === "phone" && foundByPhone && (
                <BookingCard
                  referenceId={foundByPhone[0]}
                  booking={foundByPhone[1]}
                />
              )}
              {mode === "id" && searchedId && bookingById && (
                <BookingCard referenceId={searchedId} booking={bookingById} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
