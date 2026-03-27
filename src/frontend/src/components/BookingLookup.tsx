import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import type { Booking } from "../backend";
import { useActor } from "../hooks/useActor";

const CAR_MODEL_LABELS: Record<string, string> = {
  swiftDzire: "Swift Dzire",
  marutiCiaz: "Ciaz",
  hyundaiAura: "Aura",
  toyotaEtios: "Etios",
  hondaCity: "Honda City",
  ertiga: "Ertiga",
  xl6: "XL6",
  kiaCarens: "Kia Carens",
  innova: "Innova",
  innovaCrysta: "Innova Crysta",
  tavera: "Tavera",
  hondaAmaze: "Honda Amaze",
  hyundaiXcent: "Hyundai Xcent",
  alto: "Alto",
  swift: "Swift",
  wagonR: "WagonR",
  scorpio: "Scorpio",
};

export default function BookingLookup() {
  const [bookingId, setBookingId] = useState("");
  const [result, setResult] = useState<(Booking & { id: string }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const { actor, isFetching: actorLoading } = useActor();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = bookingId.trim();
    if (!trimmedId) return;

    setLoading(true);
    setError("");
    setResult(null);
    setSearched(true);

    try {
      if (!actor) {
        setError("Connection not ready. Please wait a moment and try again.");
        return;
      }
      const booking = await actor.getBookingById(trimmedId);
      if (booking == null) {
        setError("No booking found with this ID. Please check and try again.");
      } else {
        setResult({ id: trimmedId, ...booking });
      }
    } catch (err) {
      console.error("Booking lookup error:", err);
      setError("Failed to look up booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const carModelLabel = result
    ? (CAR_MODEL_LABELS[result.carModel as string] ?? String(result.carModel))
    : "";

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3" style={{ color: "#1c1007" }}>
          Find My Booking
        </h2>
        <p className="text-gray-600 text-sm">
          Enter your Booking ID to retrieve your booking details.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="bookingId" className="sr-only">
            Booking ID
          </Label>
          <Input
            id="bookingId"
            data-ocid="booking_lookup.search_input"
            placeholder="Enter Booking ID (e.g. B-001)"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          data-ocid="booking_lookup.submit_button"
          disabled={loading || !bookingId.trim() || actorLoading}
          className="text-white"
          style={{ backgroundColor: "#d97706" }}
        >
          {loading || actorLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>

      {actorLoading && !searched && (
        <p className="mt-3 text-sm text-amber-600 flex items-center gap-2">
          <Loader2 className="h-3 w-3 animate-spin" /> Connecting...
        </p>
      )}

      {error && (
        <div
          data-ocid="booking_lookup.error_state"
          className="mt-4 p-4 rounded-lg text-sm text-red-700 bg-red-50 border border-red-200"
        >
          {error}
        </div>
      )}

      {result && (
        <div
          data-ocid="booking_lookup.success_state"
          className="mt-4 rounded-xl border overflow-hidden"
          style={{ borderColor: "#fde68a" }}
        >
          <div
            className="px-4 py-3 font-semibold text-sm"
            style={{ backgroundColor: "#d97706", color: "white" }}
          >
            Booking Found — ID: {result.id}
          </div>
          <div
            className="p-4 text-sm space-y-2"
            style={{ backgroundColor: "#fffbeb" }}
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium" style={{ color: "#78350f" }}>
                  Name:
                </span>
                <span className="ml-2">{result.name}</span>
              </div>
              <div>
                <span className="font-medium" style={{ color: "#78350f" }}>
                  Phone:
                </span>
                <span className="ml-2">{result.phone}</span>
              </div>
              <div>
                <span className="font-medium" style={{ color: "#78350f" }}>
                  Car:
                </span>
                <span className="ml-2">
                  {result.carCategory
                    ? `${String(result.carCategory).toUpperCase()} — `
                    : ""}
                  {carModelLabel}
                </span>
              </div>
              <div>
                <span className="font-medium" style={{ color: "#78350f" }}>
                  Seats:
                </span>
                <span className="ml-2">{String(result.seats)}</span>
              </div>
              <div>
                <span className="font-medium" style={{ color: "#78350f" }}>
                  Fare:
                </span>
                <span className="ml-2">₹{String(result.price)}</span>
              </div>
              <div>
                <span className="font-medium" style={{ color: "#78350f" }}>
                  Luggage:
                </span>
                <span className="ml-2">
                  {String(result.luggage?.count ?? 0)} bag(s)
                </span>
              </div>
            </div>
            {result.stops && result.stops.length > 0 && (
              <div>
                <span className="font-medium" style={{ color: "#78350f" }}>
                  Trip Details:
                </span>
                <ul className="mt-1 space-y-1">
                  {(result.stops as string[]).map((s) => (
                    <li key={s} className="text-gray-600 text-xs">
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
