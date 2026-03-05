import {
  Calendar as CalendarIcon,
  IndianRupee,
  Loader2,
  Navigation,
  Package,
  Plus,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { BookingData } from "../App";
import { CarCategory, CarModel } from "../backend";
import { useCreateBooking } from "../hooks/useCreateBooking";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Car category → models mapping (no luxury, no hatchback)
const CAR_CATEGORY_MODELS: Record<
  CarCategory.sedan | CarCategory.suv,
  { value: CarModel; label: string }[]
> = {
  [CarCategory.sedan]: [
    { value: CarModel.swiftDzire, label: "Swift Dzire" },
    { value: CarModel.hondaAmaze, label: "Honda Amaze" },
    { value: CarModel.hyundaiXcent, label: "Hyundai Xcent" },
    { value: CarModel.marutiCiaz, label: "Maruti Ciaz" },
  ],
  [CarCategory.suv]: [
    { value: CarModel.ertiga, label: "Ertiga" },
    { value: CarModel.xl6, label: "XL6" },
    { value: CarModel.kiaCarens, label: "Kia Carens" },
    { value: CarModel.innova, label: "Innova" },
    { value: CarModel.innovaCrysta, label: "Innova Crysta" },
    { value: CarModel.tavera, label: "Tavera" },
  ],
};

const CAR_CATEGORY_LABELS: Record<CarCategory.sedan | CarCategory.suv, string> =
  {
    [CarCategory.sedan]: "Sedan (4 seater)",
    [CarCategory.suv]: "SUV (6-7 seater)",
  };

// Base prices per category (INR)
const BASE_PRICES: Record<CarCategory.sedan | CarCategory.suv, number> = {
  [CarCategory.sedan]: 2800,
  [CarCategory.suv]: 4000,
};

function calculateFare(category: CarCategory.sedan | CarCategory.suv): number {
  return BASE_PRICES[category];
}

// Max seats per category
const MAX_SEATS: Record<CarCategory.sedan | CarCategory.suv, number> = {
  [CarCategory.sedan]: 4,
  [CarCategory.suv]: 7,
};

const AVAILABLE_CATEGORIES = [CarCategory.sedan, CarCategory.suv] as const;
type AvailableCategory = (typeof AVAILABLE_CATEGORIES)[number];

// ─── Main Booking Form ────────────────────────────────────────────────────────

interface BookingFormProps {
  onBookingSuccess: (referenceId: string, bookingData: BookingData) => void;
  prefillData?: Partial<BookingData>;
}

export default function BookingForm({
  onBookingSuccess,
  prefillData,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phone: "",
    pickup: prefillData?.pickup ?? "",
    drop: prefillData?.drop ?? "Pune Station",
    date: "",
    time: "",
    tripType: prefillData?.tripType ?? "one-way",
    carType: "sedan",
    carCategory: CarCategory.sedan,
    carModel: CarModel.swiftDzire,
  });

  // Seats and luggage as string to avoid leading-zero / zero-on-backspace issues
  const [seatsStr, setSeatsStr] = useState<string>("1");
  const [luggageStr, setLuggageStr] = useState<string>("1");

  // Car model state
  const [selectedCategory, setSelectedCategory] = useState<AvailableCategory>(
    CarCategory.sedan,
  );
  const [selectedModel, setSelectedModel] = useState<CarModel>(
    CarModel.swiftDzire,
  );

  // Stops state — each stop has a stable id so the key is never an array index
  const stopIdRef = useRef(0);
  const [stops, setStops] = useState<{ id: number; value: string }[]>([]);

  // Time AM/PM state
  const [timeHour, setTimeHour] = useState<string>("08");
  const [timeMinute, setTimeMinute] = useState<string>("00");
  const [timeAmPm, setTimeAmPm] = useState<"AM" | "PM">("AM");

  // Price state
  const [price, setPrice] = useState<number>(calculateFare(CarCategory.sedan));
  const [priceEdited, setPriceEdited] = useState(false);

  // Luggage details (separate from count)
  const [luggageDetails, setLuggageDetails] = useState<string>("");

  // Derive numeric seats/luggage from string state
  const seats = seatsStr === "" ? 0 : Number(seatsStr);
  const luggageCount = luggageStr === "" ? 0 : Number(luggageStr);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: createBooking, isPending, error } = useCreateBooking();

  // Apply prefill data when it changes
  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        pickup: prefillData.pickup ?? prev.pickup,
        drop: prefillData.drop ?? prev.drop,
        tripType: prefillData.tripType ?? prev.tripType,
      }));
    }
  }, [prefillData]);

  // Sync AM/PM time to formData.time
  useEffect(() => {
    let hour24 = Number.parseInt(timeHour, 10);
    if (timeAmPm === "AM") {
      if (hour24 === 12) hour24 = 0;
    } else {
      if (hour24 !== 12) hour24 += 12;
    }
    const formatted = `${String(hour24).padStart(2, "0")}:${timeMinute}`;
    setFormData((prev) => ({ ...prev, time: formatted }));
  }, [timeHour, timeMinute, timeAmPm]);

  // Auto-recalculate price when category changes (unless user manually edited)
  useEffect(() => {
    if (!priceEdited) {
      setPrice(calculateFare(selectedCategory));
    }
  }, [selectedCategory, priceEdited]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }
    if (!formData.time) {
      newErrors.time = "Please select a time";
    }
    if (!formData.pickup.trim()) {
      newErrors.pickup = "Pickup location is required";
    }
    if (!formData.drop.trim()) {
      newErrors.drop = "Drop location is required";
    }
    if (!selectedModel) {
      newErrors.carModel = "Please select a car model";
    }
    if (seats < 1 || seats > MAX_SEATS[selectedCategory]) {
      newErrors.seats = `Seats must be between 1 and ${MAX_SEATS[selectedCategory]} for ${CAR_CATEGORY_LABELS[selectedCategory]}`;
    }
    if (luggageCount < 0 || luggageCount > 10) {
      newErrors.luggageCount = "Luggage count must be between 0 and 10";
    }
    if (price < 0) {
      newErrors.price = "Price cannot be negative";
    }
    // Validate stops
    for (const stop of stops) {
      if (!stop.value.trim()) {
        newErrors[`stop_${stop.id}`] = "Stop location cannot be empty";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const stopValues = stops.map((s) => s.value).filter((v) => v.trim());
    createBooking(
      {
        name: formData.name,
        phone: formData.phone,
        carCategory: selectedCategory,
        carModel: selectedModel,
        price,
        stops: stopValues,
        luggage: { count: luggageCount, details: luggageDetails },
        seats,
      },
      {
        onSuccess: (referenceId) => {
          onBookingSuccess(referenceId, {
            ...formData,
            carCategory: selectedCategory,
            carModel: selectedModel,
            price,
            stops: stopValues,
            luggage: { count: luggageCount, details: luggageDetails },
            seats,
          });
        },
      },
    );
  };

  const handleChange = (field: keyof BookingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCategoryChange = (cat: AvailableCategory) => {
    setSelectedCategory(cat);
    const firstModel = CAR_CATEGORY_MODELS[cat][0].value;
    setSelectedModel(firstModel);
    // Reset seats if over new max
    if (seats > MAX_SEATS[cat]) setSeatsStr(String(MAX_SEATS[cat]));
    // Let price auto-recalculate for new category (base price only)
    setPriceEdited(false);
    if (errors.carModel) setErrors((prev) => ({ ...prev, carModel: "" }));
  };

  const handleModelChange = (model: CarModel) => {
    setSelectedModel(model);
    if (errors.carModel) setErrors((prev) => ({ ...prev, carModel: "" }));
  };

  // Stops handlers
  const addStop = () => {
    if (stops.length < 5) {
      stopIdRef.current += 1;
      setStops((prev) => [...prev, { id: stopIdRef.current, value: "" }]);
    }
  };

  const removeStop = (id: number) => {
    setStops((prev) => prev.filter((s) => s.id !== id));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`stop_${id}`];
      return next;
    });
  };

  const updateStop = (id: number, value: string) => {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
    if (errors[`stop_${id}`]) {
      setErrors((prev) => ({ ...prev, [`stop_${id}`]: "" }));
    }
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const availableModels = CAR_CATEGORY_MODELS[selectedCategory];
  const maxSeats = MAX_SEATS[selectedCategory];

  return (
    <>
      <Card className="mx-auto max-w-4xl border-2 shadow-xl">
        <CardHeader className="space-y-1 bg-gradient-to-r from-saffron/10 to-saffron/5">
          <CardTitle className="text-2xl font-bold">Book Your Cab</CardTitle>
          <CardDescription>
            Fill in the details below to reserve your ride
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Trip Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Pickup Location - plain text input */}
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    type="text"
                    value={formData.pickup}
                    onChange={(e) => handleChange("pickup", e.target.value)}
                    placeholder="Enter your pickup address"
                    className={errors.pickup ? "border-destructive" : ""}
                    data-ocid="booking.pickup.input"
                  />
                  {errors.pickup && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.pickup.error_state"
                    >
                      {errors.pickup}
                    </p>
                  )}
                </div>

                {/* Drop Location - plain text input */}
                <div className="space-y-2">
                  <Label htmlFor="drop">Drop Location</Label>
                  <Input
                    id="drop"
                    type="text"
                    value={formData.drop}
                    onChange={(e) => handleChange("drop", e.target.value)}
                    placeholder="Enter your drop address"
                    className={errors.drop ? "border-destructive" : ""}
                    data-ocid="booking.drop.input"
                  />
                  {errors.drop && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.drop.error_state"
                    >
                      {errors.drop}
                    </p>
                  )}
                </div>
              </div>

              {/* Stops Section */}
              <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-saffron" />
                    <h4 className="font-semibold text-foreground">
                      Stops Along the Way
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      ({stops.length}/5)
                    </span>
                  </div>
                  {stops.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addStop}
                      className="border-saffron/40 text-saffron hover:bg-saffron hover:text-charcoal"
                      data-ocid="booking.stop.button"
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Add Stop
                    </Button>
                  )}
                </div>

                {stops.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No stops added. Click "Add Stop" to add intermediate
                    locations.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron/20 text-xs font-bold text-saffron">
                          {index + 1}
                        </span>
                        <Input
                          value={stop.value}
                          onChange={(e) => updateStop(stop.id, e.target.value)}
                          placeholder={`Stop ${index + 1} location`}
                          className={`flex-1 ${errors[`stop_${stop.id}`] ? "border-destructive" : ""}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeStop(stop.id)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        {errors[`stop_${stop.id}`] && (
                          <p className="text-sm text-destructive">
                            {errors[`stop_${stop.id}`]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Journey Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      min={minDate}
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className={errors.date ? "border-destructive" : ""}
                      data-ocid="booking.date.input"
                    />
                    <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.date && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.date.error_state"
                    >
                      {errors.date}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-hour">Pickup Time</Label>
                  <div className="flex items-center gap-2">
                    {/* Hour */}
                    <Select value={timeHour} onValueChange={setTimeHour}>
                      <SelectTrigger id="time-hour" className="w-20">
                        <SelectValue placeholder="HH" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const v = String(i + 1).padStart(2, "0");
                          return (
                            <SelectItem key={v} value={v}>
                              {v}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <span className="font-bold text-muted-foreground">:</span>
                    {/* Minute */}
                    <Select value={timeMinute} onValueChange={setTimeMinute}>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {["00", "15", "30", "45"].map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* AM / PM */}
                    <div className="flex overflow-hidden rounded-md border border-input">
                      <button
                        type="button"
                        onClick={() => setTimeAmPm("AM")}
                        className={`px-3 py-2 text-sm font-semibold transition-colors ${
                          timeAmPm === "AM"
                            ? "bg-saffron text-charcoal"
                            : "bg-background text-muted-foreground hover:bg-accent"
                        }`}
                        data-ocid="booking.time.toggle"
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeAmPm("PM")}
                        className={`px-3 py-2 text-sm font-semibold transition-colors ${
                          timeAmPm === "PM"
                            ? "bg-saffron text-charcoal"
                            : "bg-background text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                  {errors.time && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.time.error_state"
                    >
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Trip Type */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tripType">Trip Type</Label>
                  <Select
                    value={formData.tripType}
                    onValueChange={(value: "one-way" | "round-trip") =>
                      handleChange("tripType", value)
                    }
                  >
                    <SelectTrigger
                      id="tripType"
                      data-ocid="booking.triptype.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-way">One Way</SelectItem>
                      <SelectItem value="round-trip">Round Trip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Car Category + Model Selection */}
              <div className="space-y-3 rounded-lg border border-saffron/20 bg-saffron/5 p-4">
                <h4 className="font-semibold text-foreground">
                  Choose Your Vehicle
                </h4>

                {/* Step 1: Car Category */}
                <div className="space-y-2">
                  <Label htmlFor="carCategory">Car Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) =>
                      handleCategoryChange(value as AvailableCategory)
                    }
                  >
                    <SelectTrigger
                      id="carCategory"
                      data-ocid="booking.carcategory.select"
                    >
                      <SelectValue placeholder="Select car category" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {CAR_CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Step 2: Car Model */}
                {selectedCategory && (
                  <div className="space-y-2">
                    <Label>Select Car Model</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {availableModels.map((model) => (
                        <button
                          key={model.value}
                          type="button"
                          onClick={() => handleModelChange(model.value)}
                          className={`rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${
                            selectedModel === model.value
                              ? "border-saffron bg-saffron text-charcoal shadow-md"
                              : "border-border bg-background text-foreground hover:border-saffron/60 hover:bg-saffron/10"
                          }`}
                        >
                          {model.label}
                        </button>
                      ))}
                    </div>
                    {errors.carModel && (
                      <p
                        className="text-sm text-destructive"
                        data-ocid="booking.carmodel.error_state"
                      >
                        {errors.carModel}
                      </p>
                    )}
                  </div>
                )}

                {/* Price Field */}
                <div className="space-y-2 border-t border-saffron/20 pt-3">
                  <Label htmlFor="price" className="flex items-center gap-1.5">
                    <IndianRupee className="h-4 w-4 text-saffron" />
                    Fare / Price (₹)
                    <span className="text-xs font-normal text-muted-foreground">
                      — estimated based on category, you can customize
                    </span>
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      step={100}
                      value={price}
                      onChange={(e) => {
                        setPrice(Number(e.target.value));
                        setPriceEdited(true);
                        if (errors.price)
                          setErrors((prev) => ({ ...prev, price: "" }));
                      }}
                      className={`pl-7 ${errors.price ? "border-destructive" : ""}`}
                      data-ocid="booking.price.input"
                    />
                  </div>
                  {errors.price && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.price.error_state"
                    >
                      {errors.price}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Base fare ₹
                    {BASE_PRICES[selectedCategory].toLocaleString("en-IN")} —{" "}
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      excluding toll fees
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Passenger Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? "border-destructive" : ""}
                    data-ocid="booking.name.input"
                  />
                  {errors.name && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.name.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={errors.phone ? "border-destructive" : ""}
                    data-ocid="booking.phone.input"
                  />
                  {errors.phone && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.phone.error_state"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Number of Seats */}
                <div className="space-y-2">
                  <Label htmlFor="seats" className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-saffron" />
                    Number of Seats
                    <span className="text-xs font-normal text-muted-foreground">
                      (max {maxSeats})
                    </span>
                  </Label>
                  <Input
                    id="seats"
                    type="text"
                    inputMode="numeric"
                    value={seatsStr}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      // Remove leading zeros
                      const cleaned = raw === "" ? "" : String(Number(raw));
                      setSeatsStr(cleaned);
                      if (errors.seats)
                        setErrors((prev) => ({ ...prev, seats: "" }));
                    }}
                    onBlur={() => {
                      // On blur, enforce min 1
                      if (seatsStr === "" || Number(seatsStr) < 1)
                        setSeatsStr("1");
                    }}
                    placeholder="1"
                    className={errors.seats ? "border-destructive" : ""}
                    data-ocid="booking.seats.input"
                  />
                  {errors.seats && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.seats.error_state"
                    >
                      {errors.seats}
                    </p>
                  )}
                </div>

                {/* Luggage Count */}
                <div className="space-y-2">
                  <Label
                    htmlFor="luggageCount"
                    className="flex items-center gap-1.5"
                  >
                    <Package className="h-4 w-4 text-saffron" />
                    Number of Bags
                    <span className="text-xs font-normal text-muted-foreground">
                      (max 10)
                    </span>
                  </Label>
                  <Input
                    id="luggageCount"
                    type="text"
                    inputMode="numeric"
                    value={luggageStr}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      // Remove leading zeros but allow 0
                      const cleaned = raw === "" ? "" : String(Number(raw));
                      setLuggageStr(cleaned);
                      if (errors.luggageCount)
                        setErrors((prev) => ({ ...prev, luggageCount: "" }));
                    }}
                    onBlur={() => {
                      // On blur, default to 0 if empty
                      if (luggageStr === "") setLuggageStr("0");
                    }}
                    placeholder="0"
                    className={errors.luggageCount ? "border-destructive" : ""}
                    data-ocid="booking.luggage.input"
                  />
                  {errors.luggageCount && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="booking.luggage.error_state"
                    >
                      {errors.luggageCount}
                    </p>
                  )}
                </div>
              </div>

              {/* Luggage Details */}
              <div className="space-y-2">
                <Label htmlFor="luggageDetails">
                  Luggage Details (optional)
                </Label>
                <Input
                  id="luggageDetails"
                  value={luggageDetails}
                  onChange={(e) => setLuggageDetails(e.target.value)}
                  placeholder="e.g. 1 large suitcase, 2 backpacks"
                  maxLength={200}
                  data-ocid="booking.luggagedetails.input"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" data-ocid="booking.error_state">
                <AlertDescription>
                  Failed to create booking. Please check your details and try
                  again.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full bg-saffron text-charcoal hover:bg-saffron/90"
              data-ocid="booking.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Booking...
                </>
              ) : (
                "Book Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
