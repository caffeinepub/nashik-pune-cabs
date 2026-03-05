import {
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  IndianRupee,
  MapPin,
  Navigation,
  Package,
  Phone as PhoneIcon,
  User,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { BookingData } from "../App";
import { CarCategory, CarModel } from "../backend";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface BookingConfirmationProps {
  referenceId: string;
  bookingData: BookingData;
  onNewBooking: () => void;
}

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
  [CarModel.xl6]: "XL6",
  [CarModel.kiaCarens]: "Kia Carens",
  [CarModel.innova]: "Innova",
  [CarModel.tavera]: "Tavera",
};

// Admin WhatsApp number that receives all booking notifications
const ADMIN_WHATSAPP_NUMBER = "919158818546";

function buildWhatsAppMessage(
  referenceId: string,
  bookingData: BookingData,
  categoryLabel: string,
  modelLabel: string,
): string {
  const lines = [
    `*New Cab Booking - ${referenceId}*`,
    "",
    `*Passenger:* ${bookingData.name}`,
    `*Phone:* ${bookingData.phone}`,
    `*Route:* ${bookingData.pickup} → ${bookingData.drop}`,
    `*Date:* ${bookingData.date}`,
    `*Time:* ${bookingData.time}`,
    `*Trip Type:* ${bookingData.tripType === "one-way" ? "One Way" : "Round Trip"}`,
    `*Vehicle:* ${categoryLabel}${modelLabel ? ` - ${modelLabel}` : ""}`,
    bookingData.seats ? `*Seats:* ${bookingData.seats}` : "",
    bookingData.luggage?.count
      ? `*Luggage:* ${bookingData.luggage.count} bag(s)${bookingData.luggage.details ? ` - ${bookingData.luggage.details}` : ""}`
      : "",
    bookingData.stops?.length ? `*Stops:* ${bookingData.stops.join(", ")}` : "",
    bookingData.price
      ? `*Fare:* ₹${bookingData.price.toLocaleString("en-IN")}`
      : "",
  ].filter(Boolean);
  return lines.join("\n");
}

export default function BookingConfirmation({
  referenceId,
  bookingData,
  onNewBooking,
}: BookingConfirmationProps) {
  const categoryLabel = bookingData.carCategory
    ? (CAR_CATEGORY_LABELS[bookingData.carCategory as CarCategory] ??
      bookingData.carCategory)
    : bookingData.carType;

  const modelLabel = bookingData.carModel
    ? (CAR_MODEL_LABELS[bookingData.carModel as CarModel] ??
      bookingData.carModel)
    : "";

  // Auto-send booking details to admin WhatsApp once on first mount
  const whatsappSentRef = useRef(false);
  useEffect(() => {
    if (whatsappSentRef.current) return;
    whatsappSentRef.current = true;
    const message = buildWhatsAppMessage(
      referenceId,
      bookingData,
      categoryLabel,
      modelLabel,
    );
    const waUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }, [referenceId, bookingData, categoryLabel, modelLabel]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <Card className="mx-auto max-w-3xl border-2 shadow-xl">
      <CardHeader className="space-y-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
            <CheckCircle2 className="h-7 w-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">
              Booking Confirmed!
            </CardTitle>
            <CardDescription className="text-base">
              Your cab has been successfully booked
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Reference ID */}
        <div className="rounded-lg bg-saffron/10 p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Booking Reference ID
          </p>
          <p className="mt-1 text-2xl font-bold tracking-wide text-saffron">
            {referenceId}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Save this reference ID to track your booking anytime
          </p>
        </div>

        {/* Trip Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Trip Summary</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <MapPin className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Route
                </p>
                <p className="font-semibold">
                  {bookingData.pickup} → {bookingData.drop}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Car className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Vehicle
                </p>
                <p className="font-semibold">
                  {categoryLabel}
                  {modelLabel ? ` — ${modelLabel}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Calendar className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Date
                </p>
                <p className="font-semibold">{formatDate(bookingData.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Clock className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Pickup Time
                </p>
                <p className="font-semibold">{formatTime(bookingData.time)}</p>
              </div>
            </div>

            {/* Price */}
            {bookingData.price !== undefined && bookingData.price > 0 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <IndianRupee className="mt-0.5 h-5 w-5 text-saffron" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Fare
                  </p>
                  <p className="text-lg font-bold text-saffron">
                    ₹{bookingData.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            )}

            {/* Seats */}
            {bookingData.seats !== undefined && bookingData.seats > 0 && (
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <Users className="mt-0.5 h-5 w-5 text-saffron" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Seats
                  </p>
                  <p className="font-semibold">
                    {bookingData.seats} seat{bookingData.seats !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Luggage */}
          {bookingData.luggage && bookingData.luggage.count > 0 && (
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Package className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Luggage
                </p>
                <p className="font-semibold">
                  {bookingData.luggage.count} bag
                  {bookingData.luggage.count !== 1 ? "s" : ""}
                  {bookingData.luggage.details
                    ? ` — ${bookingData.luggage.details}`
                    : ""}
                </p>
              </div>
            </div>
          )}

          {/* Stops */}
          {bookingData.stops && bookingData.stops.length > 0 && (
            <div className="rounded-lg border p-3">
              <div className="mb-2 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-saffron" />
                <p className="text-sm font-medium text-muted-foreground">
                  Stops
                </p>
              </div>
              <ol className="space-y-1">
                {bookingData.stops.map((stop, i) => (
                  <li
                    key={stop}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
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

        {/* Passenger Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Passenger Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <User className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="font-semibold">{bookingData.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Phone
                </p>
                <p className="font-semibold">{bookingData.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-lg bg-muted/50 p-4">
          <h4 className="mb-2 font-semibold">What's Next?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-saffron">•</span>
              <span>
                Our team will contact you shortly to confirm your booking
                details
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-saffron">•</span>
              <span>
                Driver details will be shared 2-3 hours before pickup time
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-saffron">•</span>
              <span>For any queries, call us at +91 91588 18546</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={onNewBooking} variant="outline" className="flex-1">
            Book Another Ride
          </Button>
          <Button
            asChild
            className="flex-1 bg-saffron text-charcoal hover:bg-saffron/90"
          >
            <a href="tel:+919158818546">
              <PhoneIcon className="mr-2 h-4 w-4" />
              Contact Support
            </a>
          </Button>
        </div>

        {/* Booking details are automatically sent to admin WhatsApp on confirmation */}
      </CardContent>
    </Card>
  );
}
