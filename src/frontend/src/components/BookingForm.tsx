import {
  Calendar as CalendarIcon,
  CheckCircle2,
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

// ─── Blinkit-style Location Picker Modal ────────────────────────────────────

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  locations: string[];
  selected: string;
  title: string;
  placeholder: string;
  onUseCurrentLocation?: () => void;
  isLocating?: boolean;
  locationError?: string;
}

function LocationPickerModal({
  isOpen,
  onClose,
  onSelect,
  locations,
  selected,
  title,
  placeholder,
  onUseCurrentLocation,
  isLocating,
  locationError,
}: LocationPickerModalProps) {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-focus search input when panel opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const filtered = search.trim()
    ? locations.filter((loc) =>
        loc.toLowerCase().includes(search.toLowerCase()),
      )
    : locations;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close location picker"
      />

      {/* Panel */}
      <div
        className="relative z-10 flex w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl"
        style={{ maxHeight: "85vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-white px-4 py-4">
          <h2 className="text-base font-bold text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close location picker"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Use Current Location CTA */}
        {onUseCurrentLocation && (
          <div className="border-b border-border bg-white px-4 py-3">
            <button
              type="button"
              onClick={() => {
                onUseCurrentLocation();
                // Don't close immediately, let locating happen
              }}
              disabled={isLocating}
              className="flex w-full items-center gap-3 rounded-xl border-2 border-saffron/30 bg-saffron/5 px-4 py-3 text-left transition-colors hover:border-saffron/60 hover:bg-saffron/10 disabled:opacity-60"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/20">
                {isLocating ? (
                  <Loader2 className="h-5 w-5 animate-spin text-saffron" />
                ) : (
                  <LocateFixed className="h-5 w-5 text-saffron" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {isLocating
                    ? "Detecting your location..."
                    : "Use Current Location"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isLocating ? "Please wait" : "Auto-detect via GPS"}
                </p>
              </div>
            </button>
            {locationError && (
              <p className="mt-2 text-xs text-destructive">{locationError}</p>
            )}
          </div>
        )}

        {/* Search Input */}
        <div className="sticky top-0 z-10 border-b border-border bg-white px-4 py-3">
          <div className="flex items-center gap-3 rounded-xl border-2 border-input bg-white px-4 py-2.5 focus-within:border-saffron focus-within:ring-2 focus-within:ring-saffron/20">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Location List */}
        <div ref={scrollRef} className="overflow-y-auto overscroll-contain">
          {filtered.length > 0 ? (
            <ul className="py-2">
              {filtered.map((loc, idx) => {
                const isSelected = selected === loc;
                return (
                  <li key={loc}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(loc);
                        onClose();
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? "bg-saffron/10 text-saffron"
                          : "hover:bg-accent"
                      } ${idx !== filtered.length - 1 ? "border-b border-border/50" : ""}`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-saffron/20" : "bg-muted"}`}
                      >
                        {isSelected ? (
                          <CheckCircle2 className="h-4 w-4 text-saffron" />
                        ) : (
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${isSelected ? "font-semibold" : "font-medium text-foreground"}`}
                      >
                        {loc}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  No locations found
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  No results for &ldquo;{search}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Location Trigger Button ─────────────────────────────────────────────────

interface LocationTriggerProps {
  value: string;
  placeholder: string;
  hasError: boolean;
  onClick: () => void;
}

function LocationTrigger({
  value,
  placeholder,
  hasError,
  onClick,
}: LocationTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border-2 bg-white px-4 py-3 text-left transition-all hover:border-saffron/60 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 ${
        hasError ? "border-destructive" : "border-input"
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron/15">
          <MapPin className="h-4 w-4 text-saffron" />
        </div>
        <span
          className={`truncate text-sm ${value ? "font-medium text-foreground" : "text-muted-foreground"}`}
        >
          {value || placeholder}
        </span>
      </span>
      <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  );
}

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

  // Location picker modal state
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [dropModalOpen, setDropModalOpen] = useState(false);

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

          // Use AbortController to enforce a fetch timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);

          let suburb = "";
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
              { signal: controller.signal },
            );
            clearTimeout(timeoutId);
            const data = await response.json();
            suburb =
              data.address?.suburb ||
              data.address?.neighbourhood ||
              data.address?.village ||
              data.address?.town ||
              data.address?.city_district ||
              data.address?.city ||
              data.display_name?.split(",")[0] ||
              "";
          } catch {
            clearTimeout(timeoutId);
            // Geocoding failed — fall back to coordinates
          }

          // Always set a location value — either the geocoded suburb or raw coordinates
          const locationValue = suburb.trim()
            ? suburb.trim()
            : `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

          handleChange("pickup", locationValue);
          // Always close the modal after successfully obtaining a position
          setPickupModalOpen(false);
        } catch {
          setLocationError(
            "Could not determine your location. Please select manually.",
          );
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError(
            "Location access denied. Please allow location access in your browser settings and try again.",
          );
        } else if (err.code === err.TIMEOUT) {
          setLocationError(
            "Location request timed out. Please try again or select manually.",
          );
        } else {
          setLocationError(
            "Unable to get your location. Please select manually.",
          );
        }
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
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
  };

  const handleDropSelect = (location: string) => {
    handleChange("drop", location);
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
      {/* Pickup Location Picker Modal */}
      <LocationPickerModal
        isOpen={pickupModalOpen}
        onClose={() => setPickupModalOpen(false)}
        onSelect={handlePickupSelect}
        locations={ALL_PICKUP_LOCATIONS}
        selected={formData.pickup}
        title="Select Pickup Location"
        placeholder="Search for area, street name..."
        onUseCurrentLocation={handleGetCurrentLocation}
        isLocating={locating}
        locationError={locationError}
      />

      {/* Drop Location Picker Modal */}
      <LocationPickerModal
        isOpen={dropModalOpen}
        onClose={() => setDropModalOpen(false)}
        onSelect={handleDropSelect}
        locations={ALL_DROP_LOCATIONS}
        selected={formData.drop}
        title="Select Drop Location"
        placeholder="Search for area, street name..."
      />

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
                {/* Pickup Location - Blinkit-style picker */}
                <div className="space-y-2">
                  <Label htmlFor="pickup-trigger">Pickup Location</Label>
                  <LocationTrigger
                    value={formData.pickup}
                    placeholder="Select pickup location"
                    hasError={!!errors.pickup}
                    onClick={() => {
                      setLocationError("");
                      setPickupModalOpen(true);
                    }}
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

                {/* Drop Location - Blinkit-style picker */}
                <div className="space-y-2">
                  <Label htmlFor="drop-trigger">Drop Location</Label>
                  <LocationTrigger
                    value={formData.drop}
                    placeholder="Select drop location"
                    hasError={!!errors.drop}
                    onClick={() => setDropModalOpen(true)}
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
                    Base ₹
                    {BASE_PRICES[selectedCategory].toLocaleString("en-IN")} + ₹
                    {PRICE_PER_EXTRA_SEAT}/extra seat + ₹{PRICE_PER_LUGGAGE}
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
                "Confirm Booking"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
