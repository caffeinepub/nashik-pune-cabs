import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Calendar, Clock, MapPin, Car, User, Phone as PhoneIcon } from 'lucide-react';
import type { BookingData } from '../App';

interface BookingConfirmationProps {
  referenceId: string;
  bookingData: BookingData;
  onNewBooking: () => void;
}

export default function BookingConfirmation({ referenceId, bookingData, onNewBooking }: BookingConfirmationProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
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
          <p className="text-sm font-medium text-muted-foreground">Booking Reference ID</p>
          <p className="mt-1 text-2xl font-bold tracking-wide text-saffron">{referenceId}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Please save this reference ID for future communication
          </p>
        </div>

        {/* Trip Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Trip Summary</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <MapPin className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Route</p>
                <p className="font-semibold">{bookingData.pickup} → {bookingData.drop}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Car className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Vehicle</p>
                <p className="font-semibold capitalize">{bookingData.carType}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Calendar className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="font-semibold">{formatDate(bookingData.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Clock className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Pickup Time</p>
                <p className="font-semibold">{formatTime(bookingData.time)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Passenger Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <User className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-semibold">{bookingData.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 text-saffron" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
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
              <span>Our team will contact you shortly to confirm your booking details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-saffron">•</span>
              <span>Driver details will be shared 2-3 hours before pickup time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-saffron">•</span>
              <span>For any queries, call us at +91 98765 43210</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={onNewBooking}
            variant="outline"
            className="flex-1"
          >
            Book Another Ride
          </Button>
          <Button
            asChild
            className="flex-1 bg-saffron text-charcoal hover:bg-saffron/90"
          >
            <a href="tel:+919876543210">
              <PhoneIcon className="mr-2 h-4 w-4" />
              Contact Support
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
