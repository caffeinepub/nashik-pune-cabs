import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Minus, Plus } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { CarCategory, CarModel } from "../backend";
import { useActor } from "../hooks/useActor";
import { useCreateBooking } from "../hooks/useQueries";

const ROUTES = [
  { value: "nashik-pune", label: "Nashik \u2192 Pune" },
  { value: "pune-nashik", label: "Pune \u2192 Nashik" },
  { value: "mumbai-pune", label: "Mumbai \u2192 Pune" },
  { value: "mumbai-nashik", label: "Mumbai \u2192 Nashik" },
  { value: "nashik-local", label: "Nashik Local" },
];

const ROUTE_FARES: Record<string, { sedan: number; suv: number }> = {
  "nashik-pune": { sedan: 2900, suv: 3500 },
  "pune-nashik": { sedan: 2900, suv: 3500 },
  "mumbai-pune": { sedan: 2500, suv: 3000 },
  "mumbai-nashik": { sedan: 3800, suv: 4500 },
  "nashik-local": { sedan: 1200, suv: 1500 },
};

const getFare = (routeVal: string, carTypeVal: string): number => {
  const fares = ROUTE_FARES[routeVal];
  if (!fares) return 3500;
  return carTypeVal === "sedan" ? fares.sedan : fares.suv;
};

const CAR_MODELS: Record<string, { value: CarModel; label: string }[]> = {
  sedan: [
    { value: CarModel.swiftDzire, label: "Swift Dzire" },
    { value: CarModel.marutiCiaz, label: "Ciaz" },
    { value: CarModel.hyundaiXcent, label: "Aura" },
    { value: CarModel.wagonR, label: "Etios" },
    { value: CarModel.hondaAmaze, label: "Honda City" },
  ],
  suv: [
    { value: CarModel.ertiga, label: "Ertiga" },
    { value: CarModel.xl6, label: "XL6" },
    { value: CarModel.kiaCarens, label: "Kia Carens" },
    { value: CarModel.innova, label: "Innova" },
    { value: CarModel.innovaCrysta, label: "Innova Crysta" },
    { value: CarModel.tavera, label: "Tavera" },
  ],
};

const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const MINUTES = ["00", "15", "30", "45"];

function cleanPhone(phone: string): string {
  return phone.replace(/[\s\-().+]/g, "");
}

interface Stop {
  id: string;
  value: string;
}

export default function BookingForm() {
  const [route, setRoute] = useState("nashik-pune");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [carType, setCarType] = useState<"sedan" | "suv">("sedan");
  const [carModel, setCarModel] = useState<CarModel>(CarModel.swiftDzire);
  const [seats, setSeats] = useState("");
  const [luggage, setLuggage] = useState("");
  const [stops, setStops] = useState<Stop[]>([]);
  const [fare, setFare] = useState("2900");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const stopCounter = useRef(0);

  const { actor, isFetching: actorLoading } = useActor();
  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  const selectedRoute = ROUTES.find((r) => r.value === route);

  const handleRouteChange = (val: string) => {
    setRoute(val);
    setFare(String(getFare(val, carType)));
  };

  const handleCarTypeChange = (val: string) => {
    const type = val as "sedan" | "suv";
    setCarType(type);
    setCarModel(CAR_MODELS[type][0].value);
    setFare(String(getFare(route, type)));
  };

  const addStop = () => {
    stopCounter.current += 1;
    setStops((prev) => [
      ...prev,
      { id: `stop-${stopCounter.current}`, value: "" },
    ]);
  };
  const removeStop = (id: string) =>
    setStops((prev) => prev.filter((s) => s.id !== id));
  const updateStop = (id: string, val: string) =>
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: val } : s)),
    );

  const handleNumberInput = useCallback(
    (setter: (v: string) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw === "") {
          setter("");
          return;
        }
        const num = Number.parseInt(raw, 10);
        if (!Number.isNaN(num) && num >= 0) setter(String(num));
      },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !phone.trim() ||
      !pickup.trim() ||
      !drop.trim() ||
      !date
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!actor) {
      toast.error("Server not connected. Please wait a moment and try again.");
      return;
    }

    const cleanedPhone = cleanPhone(phone);
    const time = `${hour}:${minute} ${ampm}`;
    const fareNum = Number.parseFloat(fare) || getFare(route, carType);
    const seatsNum = Number.parseInt(seats) || 1;
    const luggageNum = Number.parseInt(luggage) || 0;
    const stopValues = stops.map((s) => s.value).filter(Boolean);

    const modelLabel =
      CAR_MODELS[carType].find((m) => m.value === carModel)?.label ??
      String(carModel);

    const allStops = [
      `Route: ${selectedRoute?.label ?? route}`,
      `Pickup: ${pickup}`,
      `Drop: ${drop}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Car: ${carType.toUpperCase()} - ${modelLabel}`,
      `Email: ${email}`,
      ...stopValues.map((s, i) => `Stop ${i + 1}: ${s}`),
    ];

    let bookingId: string;
    try {
      bookingId = await createBooking({
        name: name.trim(),
        phone: cleanedPhone,
        carCategory: carType === "sedan" ? CarCategory.sedan : CarCategory.suv,
        carModel,
        price: fareNum,
        stops: allStops,
        luggageCount: luggageNum,
        luggageDetails: "",
        seats: seatsNum,
      });
      if (!bookingId) throw new Error("empty id");
    } catch {
      toast.error("Failed to create booking. Please try again.");
      return;
    }

    const stopsLine =
      stopValues.length > 0
        ? `\n\uD83D\uDED1 *Stops:* ${stopValues.join(", ")}`
        : "";
    const msg = [
      "\uD83D\uDE96 *New Cab Booking*",
      "",
      `\uD83D\uDCCB *Booking ID:* ${bookingId}`,
      `\uD83D\uDC64 *Name:* ${name}`,
      `\uD83D\uDCDE *Phone:* ${phone}`,
      `\uD83D\uDCE7 *Email:* ${email || "N/A"}`,
      "",
      `\uD83D\uDDFA\uFE0F *Route:* ${selectedRoute?.label ?? route}`,
      `\uD83D\uDCCD *Pickup:* ${pickup}`,
      `\uD83D\uDCCD *Drop:* ${drop}`,
      `\uD83D\uDCC5 *Date:* ${date}`,
      `\u23F0 *Time:* ${time}`,
      stopsLine,
      "",
      `\uD83D\uDE97 *Car:* ${carType.toUpperCase()} \u2014 ${modelLabel}`,
      `\uD83D\uDC65 *Seats:* ${seatsNum}`,
      `\uD83E\uDDF3 *Luggage:* ${luggageNum} bag(s)`,
      "",
      `\uD83D\uDCB0 *Fare:* \u20B9${fareNum} (Excluding toll fees)`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const waUrl = `https://wa.me/919158818546?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
    toast.success(
      `Booking confirmed! Your ID: ${bookingId}. Redirecting to WhatsApp...`,
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {actorLoading && (
        <div
          className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-amber-50 border border-amber-200"
          style={{ color: "#92400e" }}
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting to server...
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label
            htmlFor="route"
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Route *
          </Label>
          <Select value={route} onValueChange={handleRouteChange}>
            <SelectTrigger id="route" data-ocid="booking.route.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROUTES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor="pickup"
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Pickup Location *
          </Label>
          <Input
            id="pickup"
            data-ocid="booking.pickup.input"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>

        <div>
          <Label
            htmlFor="drop"
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Drop Location *
          </Label>
          <Input
            id="drop"
            data-ocid="booking.drop.input"
            placeholder="Enter drop location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
          />
        </div>

        <div>
          <Label
            htmlFor="date"
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Date *
          </Label>
          <Input
            id="date"
            type="date"
            data-ocid="booking.date.input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div>
          <Label
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Time *
          </Label>
          <div className="flex gap-2">
            <Select value={hour} onValueChange={setHour}>
              <SelectTrigger data-ocid="booking.hour.select" className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HOURS.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={minute} onValueChange={setMinute}>
              <SelectTrigger
                data-ocid="booking.minute.select"
                className="flex-1"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MINUTES.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex rounded-md overflow-hidden border border-input">
              <button
                type="button"
                data-ocid="booking.am.toggle"
                onClick={() => setAmpm("AM")}
                className={`px-3 text-sm font-medium transition-colors ${ampm === "AM" ? "text-white" : "bg-white text-gray-700"}`}
                style={ampm === "AM" ? { backgroundColor: "#d97706" } : {}}
              >
                AM
              </button>
              <button
                type="button"
                data-ocid="booking.pm.toggle"
                onClick={() => setAmpm("PM")}
                className={`px-3 text-sm font-medium transition-colors ${ampm === "PM" ? "text-white" : "bg-white text-gray-700"}`}
                style={ampm === "PM" ? { backgroundColor: "#d97706" } : {}}
              >
                PM
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Car Type
          </Label>
          <Select value={carType} onValueChange={handleCarTypeChange}>
            <SelectTrigger data-ocid="booking.cartype.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Car Model
          </Label>
          <Select
            value={carModel}
            onValueChange={(v) => setCarModel(v as CarModel)}
          >
            <SelectTrigger data-ocid="booking.carmodel.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CAR_MODELS[carType].map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label
            htmlFor="seats"
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            No. of Seats
          </Label>
          <Input
            id="seats"
            data-ocid="booking.seats.input"
            type="text"
            inputMode="numeric"
            placeholder="1"
            value={seats}
            onChange={handleNumberInput(setSeats)}
          />
        </div>
        <div>
          <Label
            htmlFor="luggage"
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Luggage (bags)
          </Label>
          <Input
            id="luggage"
            data-ocid="booking.luggage.input"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={luggage}
            onChange={handleNumberInput(setLuggage)}
          />
        </div>
        <div>
          <Label
            className="text-sm font-semibold mb-1 block"
            style={{ color: "#78350f" }}
          >
            Fare (&#x20B9;)
          </Label>
          <Input
            data-ocid="booking.fare.input"
            type="text"
            value={fare}
            readOnly
            className="bg-amber-50 cursor-not-allowed"
          />
          <p className="text-xs mt-1" style={{ color: "#b45309" }}>
            Excluding toll fees
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-semibold" style={{ color: "#78350f" }}>
            Additional Stops
          </Label>
          <button
            type="button"
            data-ocid="booking.add_stop.button"
            onClick={addStop}
            className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: "#d97706" }}
          >
            <Plus className="h-3 w-3" /> Add Stop
          </button>
        </div>
        {stops.map((stop, idx) => (
          <div key={stop.id} className="flex gap-2 mb-2">
            <Input
              data-ocid={`booking.stop.input.${idx + 1}`}
              placeholder={`Stop ${idx + 1}`}
              value={stop.value}
              onChange={(e) => updateStop(stop.id, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeStop(stop.id)}
              className="p-2 rounded-md text-red-500 hover:bg-red-50"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-5" style={{ borderColor: "#fde68a" }}>
        <h3
          className="font-semibold mb-4 text-sm uppercase tracking-wide"
          style={{ color: "#92400e" }}
        >
          Your Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label
              htmlFor="name"
              className="text-sm font-semibold mb-1 block"
              style={{ color: "#78350f" }}
            >
              Name *
            </Label>
            <Input
              id="name"
              data-ocid="booking.name.input"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-semibold mb-1 block"
              style={{ color: "#78350f" }}
            >
              Phone *
            </Label>
            <Input
              id="phone"
              data-ocid="booking.phone.input"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-semibold mb-1 block"
              style={{ color: "#78350f" }}
            >
              Email
            </Label>
            <Input
              id="email"
              data-ocid="booking.email.input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          data-ocid="booking.submit_button"
          disabled={isPending || actorLoading}
          className="flex-1 h-12 text-base font-bold text-white hover:opacity-90"
          style={{ backgroundColor: "#d97706" }}
        >
          {actorLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting to
              server...
            </>
          ) : isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Book Now"
          )}
        </Button>
        <a
          href="tel:+919158818546"
          data-ocid="booking.immediate.button"
          className="flex-1 h-12 flex items-center justify-center gap-2 rounded-lg border-2 font-semibold text-sm transition-colors hover:bg-amber-50"
          style={{ borderColor: "#d97706", color: "#92400e" }}
        >
          <span>&#x1F4DE;</span> Need Immediate Booking?
        </a>
      </div>
    </form>
  );
}
