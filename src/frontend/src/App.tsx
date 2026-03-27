import { Toaster } from "@/components/ui/sonner";
import { Car, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import AdminPage from "./components/AdminPage";
import BookingForm from "./components/BookingForm";
import BookingLookup from "./components/BookingLookup";
import ContactSection from "./components/ContactSection";
import FaqSection from "./components/FaqSection";
import FooterSection from "./components/FooterSection";
import PricingSection from "./components/PricingSection";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const NAV_LINKS = [
  { label: "Book a Cab", href: "book" },
  { label: "Pricing", href: "pricing" },
  { label: "FAQs", href: "faqs" },
  { label: "About Us", href: "about" },
  { label: "Contact Us", href: "contact" },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-amber-100">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "#d97706" }}
            >
              <Car className="h-5 w-5 text-white" />
            </div>
            <div>
              <div
                className="text-lg font-bold leading-tight"
                style={{ color: "#1c1007" }}
              >
                Nashik Pune Cabs
              </div>
              <div className="text-xs" style={{ color: "#92400e" }}>
                Reliable & Comfortable
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                data-ocid={`nav.${link.href}.link`}
                onClick={() => scrollToSection(link.href)}
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-amber-50"
                style={{ color: "#78350f" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-amber-100 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  scrollToSection(link.href);
                  setMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-amber-50"
                style={{ color: "#78350f" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="book"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f59e0b 0%, #d97706 55%, #b45309 100%)",
        }}
      >
        <div className="container relative py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Nashik to Pune{" "}
              <span style={{ color: "#fef3c7" }}>Taxi Service</span>
            </h1>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto">
              Your trusted partner for comfortable and reliable cab service
              between Nashik and Pune.
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div
                className="px-6 py-4 border-b border-amber-100"
                style={{ backgroundColor: "#fffbeb" }}
              >
                <h2 className="text-xl font-bold" style={{ color: "#92400e" }}>
                  Book Your Cab
                </h2>
                <p className="text-sm" style={{ color: "#b45309" }}>
                  Fill in the details below to confirm your booking
                </p>
              </div>
              <div className="p-6">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <div className="bg-amber-800 text-amber-50 py-4">
        <div className="container flex flex-wrap justify-center gap-8 text-sm font-medium">
          <div>&#x2705; 24/7 Service</div>
          <div>&#x1F697; Professional Drivers</div>
          <div>&#x1F4B0; Transparent Pricing</div>
          <div>&#x1F4F1; Instant Confirmation</div>
        </div>
      </div>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="container">
          <PricingSection />
        </div>
      </section>

      {/* Route Info */}
      <section className="py-16" style={{ backgroundColor: "#1c1007" }}>
        <div className="container">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Route Information
          </h2>
          <p className="text-amber-200 text-center mb-10">
            Everything you need to know about the journey
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                route: "Nashik \u2192 Pune",
                distance: "~165 km",
                duration: "3\u20134 hours",
                via: "NH 60",
                fare: "\u20b93,500 \u2013 \u20b94,500",
              },
              {
                route: "Mumbai \u2192 Pune",
                distance: "~150 km",
                duration: "2.5\u20133.5 hours",
                via: "Mumbai Pune Expressway",
                fare: "\u20b93,000 \u2013 \u20b94,000",
              },
              {
                route: "Mumbai \u2192 Nashik",
                distance: "~167 km",
                duration: "3\u20134 hours",
                via: "NH 3",
                fare: "\u20b94,500 \u2013 \u20b95,500",
              },
            ].map((r) => (
              <div
                key={r.route}
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "#2c1a0a", borderColor: "#78350f" }}
              >
                <div className="text-lg font-bold text-white mb-4">
                  {r.route}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "#fcd34d" }}>Distance</span>
                    <span className="text-white">{r.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#fcd34d" }}>Duration</span>
                    <span className="text-white">{r.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#fcd34d" }}>Via</span>
                    <span className="text-white">{r.via}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#fcd34d" }}>Approx. Fare</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#fbbf24" }}
                    >
                      {r.fare}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-amber-300 text-sm mt-6">
            * All fares are excluding toll fees
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-white">
        <div className="container">
          <AboutSection />
        </div>
      </section>

      {/* Find My Booking */}
      <section className="py-16" style={{ backgroundColor: "#fffbeb" }}>
        <div className="container max-w-lg mx-auto">
          <BookingLookup />
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 bg-white">
        <div className="container max-w-3xl mx-auto">
          <FaqSection />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-16"
        style={{ backgroundColor: "#fef3c7" }}
      >
        <div className="container">
          <ContactSection />
        </div>
      </section>

      <FooterSection />
      <Toaster />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"landing" | "admin">(() => {
    const hash = window.location.hash.replace("#", "");
    const path = window.location.pathname;
    return hash === "admin" || path === "/admin" ? "admin" : "landing";
  });

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace("#", "");
      const path = window.location.pathname;
      setView(hash === "admin" || path === "/admin" ? "admin" : "landing");
    };
    window.addEventListener("hashchange", handler);
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("hashchange", handler);
      window.removeEventListener("popstate", handler);
    };
  }, []);

  if (view === "admin") return <AdminPage />;
  return <LandingPage />;
}
