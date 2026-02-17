import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { useCreateBooking } from '../hooks/useCreateBooking';
import type { BookingData } from '../App';

interface BookingFormProps {
  onBookingSuccess: (referenceId: string, bookingData: BookingData) => void;
}

export default function BookingForm({ onBookingSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    pickup: 'Nashik',
    drop: 'Pune',
    date: '',
    time: '',
    tripType: 'one-way',
    carType: 'sedan',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const { mutate: createBooking, isPending, error } = useCreateBooking();

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Pickup location is required';
    }
    if (!formData.drop.trim()) {
      newErrors.drop = 'Drop location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    createBooking(
      { name: formData.name, phone: formData.phone },
      {
        onSuccess: (referenceId) => {
          onBookingSuccess(referenceId, formData);
        },
      }
    );
  };

  const handleChange = (field: keyof BookingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Card className="mx-auto max-w-4xl border-2 shadow-xl">
      <CardHeader className="space-y-1 bg-gradient-to-r from-saffron/10 to-saffron/5">
        <CardTitle className="text-2xl font-bold">Book Your Cab</CardTitle>
        <CardDescription>Fill in the details below to reserve your ride from Nashik to Pune</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trip Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  value={formData.pickup}
                  onChange={(e) => handleChange('pickup', e.target.value)}
                  placeholder="Enter pickup location"
                  className={errors.pickup ? 'border-destructive' : ''}
                />
                {errors.pickup && <p className="text-sm text-destructive">{errors.pickup}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="drop">Drop Location</Label>
                <Input
                  id="drop"
                  value={formData.drop}
                  onChange={(e) => handleChange('drop', e.target.value)}
                  placeholder="Enter drop location"
                  className={errors.drop ? 'border-destructive' : ''}
                />
                {errors.drop && <p className="text-sm text-destructive">{errors.drop}</p>}
              </div>
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
                    onChange={(e) => handleChange('date', e.target.value)}
                    className={errors.date ? 'border-destructive' : ''}
                  />
                  <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Pickup Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className={errors.time ? 'border-destructive' : ''}
                />
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tripType">Trip Type</Label>
                <Select value={formData.tripType} onValueChange={(value: 'one-way' | 'round-trip') => handleChange('tripType', value)}>
                  <SelectTrigger id="tripType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-way">One Way</SelectItem>
                    <SelectItem value="round-trip">Round Trip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="carType">Car Type</Label>
                <Select value={formData.carType} onValueChange={(value) => handleChange('carType', value)}>
                  <SelectTrigger id="carType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan (4 seater)</SelectItem>
                    <SelectItem value="suv">SUV (6-7 seater)</SelectItem>
                  </SelectContent>
                </Select>
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
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to create booking. Please check your details and try again.
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
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
