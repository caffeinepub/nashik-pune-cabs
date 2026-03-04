import { Phone } from "lucide-react";
import { useRef, useState } from "react";
import type { CarCategory, CarModel } from "./backend";
import AdminBookingsPage from "./components/AdminBookingsPage";
import BookingConfirmation from "./components/BookingConfirmation";
import BookingForm from "./components/BookingForm";
import BookingLookup from "./components/BookingLookup";
import FaqSection from "./components/FaqSection";
import FooterContact from "./components/FooterContact";
import HighlightsSection from "./components/HighlightsSection";
import QuickLinksSection, {
  type QuickLinkData,
} from "./components/QuickLinksSection";
import RouteInfoSection from "./components/RouteInfoSection";
import TrustStrip from "./components/TrustStrip";
import VehiclePricingSection from "./components/VehiclePricingSection";
import { Button } from "./components/ui/button";

export interface BookingData {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  tripType: "one-way" | "round-trip";
  carType: string;
  carCategory?: CarCategory;
  carModel?: CarModel;
  price?: number;
  stops?: string[];
  luggage?: { count: number; details: string };
  seats?: number;
}

function App() {
  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceId: string;
    bookingData: BookingData;
  } | null>(null);

  const [quickLinkPrefill, setQuickLinkPrefill] = useState<
    Partial<BookingData> | undefined
  >(undefined);

  const bookingSectionRef = useRef<HTMLElement>(null);

  // Simple hash-based routing for admin page
  const [currentView, setCurrentView] = useState<"landing" | "admin">(() => {
    return window.location.hash === "#admin" ? "admin" : "landing";
  });

  // Listen for hash changes
  useState(() => {
    const handleHashChange = () => {
      setCurrentView(window.location.hash === "#admin" ? "admin" : "landing");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  });

  const handleBookingSuccess = (
    referenceId: string,
    bookingData: BookingData,
  ) => {
    setConfirmedBooking({ referenceId, bookingData });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewBooking = () => {
    setConfirmedBooking(null);
    setQuickLinkPrefill(undefined);
  };

  const handleQuickLink = (data: QuickLinkData) => {
    setConfirmedBooking(null);
    setQuickLinkPrefill(data);
    setTimeout(() => {
      bookingSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // Render admin page
  if (currentView === "admin") {
    return <AdminBookingsPage />;
  }

  // Render landing page
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-charcoal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
                <path d="M17 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                <path d="M6 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
                <circle cx="9" cy="17" r="2" />
                <circle cx="15" cy="17" r="2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Nashik Pune Cabs
              </h1>
              <p className="text-xs text-muted-foreground">
                Reliable & Comfortable
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="hidden sm:flex"
            >
              <a href="#track-booking">Track Booking</a>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-saffron text-charcoal hover:bg-saffron/90"
            >
              <a href="tel:+919158818546">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400">
        <div className="absolute inset-0 bg-[url('/assets/generated/cab-hero.dim_1600x700.png')] bg-cover bg-center opacity-20" />
        <div className="container relative py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Nashik to Pune
                  <span className="block text-saffron">Taxi Service</span>
                </h2>
                <p className="text-lg text-gray-200 md:text-xl">
                  Experience comfortable and reliable cab service from Nashik to
                  Pune. Professional drivers, transparent pricing, and
                  door-to-door convenience.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-saffron text-charcoal hover:bg-saffron/90"
                >
                  <a href="#booking">Book Now</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-charcoal text-white hover:bg-charcoal/90"
                >
                  <a href="tel:+919158818546">
                    <Phone className="mr-2 h-5 w-5" />
                    +91 91588 18546
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/assets/generated/cab-hero.dim_1600x700.png"
                alt="Comfortable taxi on highway from Nashik to Pune"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Quick Links */}
      <QuickLinksSection onQuickLink={handleQuickLink} />

      {/* Booking Confirmation or Form */}
      <section id="booking" ref={bookingSectionRef} className="py-12 md:py-16">
        <div className="container">
          {confirmedBooking ? (
            <BookingConfirmation
              referenceId={confirmedBooking.referenceId}
              bookingData={confirmedBooking.bookingData}
              onNewBooking={handleNewBooking}
            />
          ) : (
            <BookingForm
              onBookingSuccess={handleBookingSuccess}
              prefillData={quickLinkPrefill}
            />
          )}
        </div>
      </section>

      {/* Vehicle Pricing */}
      <section id="pricing">
        <VehiclePricingSection />
      </section>

      {/* Route Info */}
      <RouteInfoSection />

      {/* About Us / Highlights */}
      <section id="about">
        <HighlightsSection />
      </section>

      {/* Track Your Booking */}
      <section id="track-booking">
        <BookingLookup />
      </section>

      {/* FAQ */}
      <section id="faq">
        <FaqSection />
      </section>

      {/* Footer */}
      <FooterContact />
    </div>
  );
}

export default App;
