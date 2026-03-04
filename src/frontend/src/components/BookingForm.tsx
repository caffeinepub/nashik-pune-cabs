import {
  Calendar as CalendarIcon,
  ChevronDown,
  IndianRupee,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Package,
  Plus,
  Search,
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

// All major Nashik localities
const NASHIK_LOCATIONS = [
  "Nashik CBS",
  "Nashik Road",
  "Gangapur Road",
  "College Road",
  "Dwarka",
  "Cidco",
  "Panchavati",
  "Satpur",
  "Ambad",
  "Trimbak Road",
  "Pathardi Phata",
  "Nashik Phata",
  "Indira Nagar",
  "Peth Road",
  "Mahatma Nagar",
  "Shalimar",
  "Sharanpur Road",
  "Tidke Colony",
  "Jail Road",
  "MG Road",
  "Thakkar Bazar",
  "Deolali",
  "Igatpuri",
  "Sinnar",
  "Ozar",
  "Dindori",
  "Mhasrul",
  "Adgaon",
  "Govardhan",
  "Nashik Village",
  "Tapovan",
  "Anandvalli",
  "Bytco Point",
  "Canada Corner",
  "Nashik East",
  "Nashik West",
  "Nashik Central",
  "Trimbakeshwar",
  "Nandur Madhyameshwar",
  "Yeola",
  "Manmad",
  "Niphad",
  "Chandwad",
  "Kalwan",
  "Surgana",
  "Baglan",
  "Malegaon",
];

// All major Pune localities (mirroring Nashik structure)
const PUNE_LOCATIONS = [
  "Pune Station",
  "Pune Airport",
  "Shivajinagar",
  "Kothrud",
  "Hinjewadi",
  "Wakad",
  "Baner",
  "Aundh",
  "Viman Nagar",
  "Koregaon Park",
  "Kalyani Nagar",
  "Hadapsar",
  "Kharadi",
  "Magarpatta",
  "Wanowrie",
  "Kondhwa",
  "Katraj",
  "Swargate",
  "Deccan Gymkhana",
  "FC Road",
  "JM Road",
  "Pimpri",
  "Chinchwad",
  "Akurdi",
  "Nigdi",
  "Bhosari",
  "Alandi",
  "Chakan",
  "Talegaon",
  "Lonavala",
  "Kamshet",
  "Dehu Road",
  "Pimpri Chinchwad",
  "Bhugaon",
  "Bavdhan",
  "Pashan",
  "Sus",
  "Mahalunge",
  "Balewadi",
  "Tathawade",
  "Ravet",
  "Punawale",
  "Moshi",
  "Dighi",
  "Dhanori",
  "Lohegaon",
  "Wagholi",
  "Nagar Road",
  "Mundhwa",
  "Undri",
];

// All major Mumbai localities
const MUMBAI_LOCATIONS = [
  "Mumbai Central",
  "Dadar",
  "Bandra",
  "Andheri",
  "Borivali",
  "Thane",
  "Navi Mumbai",
  "Kurla",
  "Chembur",
  "Ghatkopar",
  "Mulund",
  "Vikhroli",
  "Powai",
  "Goregaon",
  "Malad",
  "Kandivali",
  "Dahisar",
  "Mira Road",
  "Bhayander",
  "Vasai",
  "Virar",
  "Panvel",
  "Vashi",
  "Nerul",
  "Belapur",
  "Kharghar",
  "Airoli",
  "Mumbai Airport (T2)",
  "Mumbai Airport (T1)",
  "Worli",
  "Lower Parel",
  "Parel",
  "Sewri",
  "Wadala",
  "Sion",
  "Dharavi",
  "CST",
  "Fort",
  "Churchgate",
  "Colaba",
  "Nariman Point",
  "Marine Lines",
];

// Combined locations for pickup (Nashik) and drop (Pune + Mumbai + others)
const ALL_PICKUP_LOCATIONS = NASHIK_LOCATIONS;
const ALL_DROP_LOCATIONS = [
  ...PUNE_LOCATIONS,
  ...MUMBAI_LOCATIONS,
  "Mumbai",
  "Mumbai Airport",
  "Nashik",
  ...NASHIK_LOCATIONS.filter((l) => l !== "Nashik CBS"),
];

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

// Base prices per category (INR) — for 1 seat, 0 luggage
const BASE_PRICES: Record<CarCategory.sedan | CarCategory.suv, number> = {
  [CarCategory.sedan]: 2800,
  [CarCategory.suv]: 4000,
};

// Extra charge per additional seat (beyond 1)
const PRICE_PER_EXTRA_SEAT = 200;

// Extra charge per luggage bag
const PRICE_PER_LUGGAGE = 100;

function calculateFare(
  category: CarCategory.sedan | CarCategory.suv,
  seats: number,
  luggage: number,
): number {
  const base = BASE_PRICES[category];
  const seatExtra = Math.max(0, seats - 1) * PRICE_PER_EXTRA_SEAT;
  const luggageExtra = luggage * PRICE_PER_LUGGAGE;
  return base + seatExtra + luggageExtra;
}

// Max seats per category
const MAX_SEATS: Record<CarCategory.sedan | CarCategory.suv, number> = {
  [CarCategory.sedan]: 4,
  [CarCategory.suv]: 7,
};

const AVAILABLE_CATEGORIES = [CarCategory.sedan, CarCategory.suv] as const;
type AvailableCategory = (typeof AVAILABLE_CATEGORIES)[number];

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
    pickup: prefillData?.pickup ?? "Nashik CBS",
    drop: prefillData?.drop ?? "Pune Station",
    date: "",
    time: "",
    tripType: prefillData?.tripType ?? "one-way",
    carType: "sedan",
    carCategory: CarCategory.sedan,
    carModel: CarModel.swiftDzire,
  });

  // Current location state
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string>("");

  // Pickup location dropdown state
  const [pickupSearch, setPickupSearch] = useState("");
  const [pickupOpen, setPickupOpen] = useState(false);
  const pickupRef = useRef<HTMLDivElement>(null);

  // Drop location dropdown state
  const [dropSearch, setDropSearch] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

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
  const [price, setPrice] = useState<number>(BASE_PRICES[CarCategory.sedan]);
  const [priceEdited, setPriceEdited] = useState(false);

  // Seats state
  const [seats, setSeats] = useState<number>(1);

  // Luggage state
  const [luggageCount, setLuggageCount] = useState<number>(1);
  const [luggageDetails, setLuggageDetails] = useState<string>("");

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

  // Auto-recalculate price when category, seats, or luggage changes (unless user manually edited)
  useEffect(() => {
    if (!priceEdited) {
      setPrice(calculateFare(selectedCategory, seats, luggageCount));
    }
  }, [selectedCategory, seats, luggageCount, priceEdited]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setPickupOpen(false);
      }
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPickupLocations = ALL_PICKUP_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(pickupSearch.toLowerCase()),
  );

  const filteredDropLocations = ALL_DROP_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(dropSearch.toLowerCase()),
  );

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await response.json();
          const suburb =
            data.address?.suburb ||
            data.address?.neighbourhood ||
            data.address?.village ||
            data.address?.town ||
            data.address?.city_district ||
            data.address?.city ||
            data.display_name?.split(",")[0] ||
            "";
          if (suburb) {
            handleChange("pickup", suburb);
          } else {
            handleChange(
              "pickup",
              `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            );
          }
        } catch {
          setLocationError(
            "Could not fetch location name. Please select manually.",
          );
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocationError("Location access denied. Please select manually.");
        setLocating(false);
      },
    );
  };

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
    if (seats > MAX_SEATS[cat]) setSeats(MAX_SEATS[cat]);
    // Let price auto-recalculate for new category
    setPriceEdited(false);
    if (errors.carModel) setErrors((prev) => ({ ...prev, carModel: "" }));
  };

  const handleModelChange = (model: CarModel) => {
    setSelectedModel(model);
    if (errors.carModel) setErrors((prev) => ({ ...prev, carModel: "" }));
  };

  const handlePickupSelect = (location: string) => {
    handleChange("pickup", location);
    setPickupSearch("");
    setPickupOpen(false);
  };

  const handleDropSelect = (location: string) => {
    handleChange("drop", location);
    setDropSearch("");
    setDropOpen(false);
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
              {/* Pickup Location - Searchable Dropdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    disabled={locating}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-saffron transition-colors hover:bg-saffron/10 disabled:opacity-50"
                  >
                    {locating ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <LocateFixed className="h-3 w-3" />
                    )}
                    {locating ? "Locating..." : "Use Current Location"}
                  </button>
                </div>
                {locationError && (
                  <p className="text-xs text-destructive">{locationError}</p>
                )}
                <div ref={pickupRef} className="relative">
                  <button
                    type="button"
                    id="pickup"
                    onClick={() => setPickupOpen((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      errors.pickup ? "border-destructive" : "border-input"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <MapPin className="h-4 w-4 shrink-0 text-saffron" />
                      <span
                        className={
                          formData.pickup
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {formData.pickup || "Select pickup location"}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${pickupOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {pickupOpen && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border border-border bg-popover shadow-lg">
                      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search Nashik locations..."
                          value={pickupSearch}
                          onChange={(e) => setPickupSearch(e.target.value)}
                          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                      <ul className="max-h-56 overflow-y-auto py-1">
                        {filteredPickupLocations.length > 0 ? (
                          filteredPickupLocations.map((loc) => (
                            <li key={loc}>
                              <button
                                type="button"
                                onClick={() => handlePickupSelect(loc)}
                                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                  formData.pickup === loc
                                    ? "bg-saffron/10 font-semibold text-saffron"
                                    : ""
                                }`}
                              >
                                <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                {loc}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                            No locations found
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {errors.pickup && (
                  <p className="text-sm text-destructive">{errors.pickup}</p>
                )}
              </div>

              {/* Drop Location - Searchable Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="drop">Drop Location</Label>
                <div ref={dropRef} className="relative">
                  <button
                    type="button"
                    id="drop"
                    onClick={() => setDropOpen((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      errors.drop ? "border-destructive" : "border-input"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <MapPin className="h-4 w-4 shrink-0 text-saffron" />
                      <span
                        className={
                          formData.drop
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {formData.drop || "Select drop location"}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${dropOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropOpen && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border border-border bg-popover shadow-lg">
                      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search Pune / drop locations..."
                          value={dropSearch}
                          onChange={(e) => setDropSearch(e.target.value)}
                          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                      <ul className="max-h-56 overflow-y-auto py-1">
                        {filteredDropLocations.length > 0 ? (
                          filteredDropLocations.map((loc) => (
                            <li key={loc}>
                              <button
                                type="button"
                                onClick={() => handleDropSelect(loc)}
                                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                  formData.drop === loc
                                    ? "bg-saffron/10 font-semibold text-saffron"
                                    : ""
                                }`}
                              >
                                <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                {loc}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                            No locations found
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {errors.drop && (
                  <p className="text-sm text-destructive">{errors.drop}</p>
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
                  />
                  <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date}</p>
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
                  <p className="text-sm text-destructive">{errors.time}</p>
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
                  <SelectTrigger id="tripType">
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
                  <SelectTrigger id="carCategory">
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
                    <p className="text-sm text-destructive">
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
                  />
                </div>
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Base ₹{BASE_PRICES[selectedCategory].toLocaleString("en-IN")}{" "}
                  + ₹{PRICE_PER_EXTRA_SEAT}/extra seat + ₹{PRICE_PER_LUGGAGE}
                  /bag —{" "}
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
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
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
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
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
                  type="number"
                  min={1}
                  max={maxSeats}
                  value={seats}
                  onChange={(e) => {
                    setSeats(Number(e.target.value));
                    setPriceEdited(false);
                    if (errors.seats)
                      setErrors((prev) => ({ ...prev, seats: "" }));
                  }}
                  className={errors.seats ? "border-destructive" : ""}
                />
                {errors.seats && (
                  <p className="text-sm text-destructive">{errors.seats}</p>
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
                  type="number"
                  min={0}
                  max={10}
                  value={luggageCount}
                  onChange={(e) => {
                    setLuggageCount(Number(e.target.value));
                    setPriceEdited(false);
                    if (errors.luggageCount)
                      setErrors((prev) => ({ ...prev, luggageCount: "" }));
                  }}
                  className={errors.luggageCount ? "border-destructive" : ""}
                />
                {errors.luggageCount && (
                  <p className="text-sm text-destructive">
                    {errors.luggageCount}
                  </p>
                )}
              </div>
            </div>

            {/* Luggage Details */}
            <div className="space-y-2">
              <Label htmlFor="luggageDetails">Luggage Details (optional)</Label>
              <Input
                id="luggageDetails"
                value={luggageDetails}
                onChange={(e) => setLuggageDetails(e.target.value)}
                placeholder="e.g. 1 large suitcase, 2 backpacks"
                maxLength={200}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
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
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
