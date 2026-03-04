import { Clock, DollarSign, MapPin, Phone, Shield, Star } from "lucide-react";

export default function HighlightsSection() {
  const highlights = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Book anytime, day or night. We operate round the clock for your convenience.",
    },
    {
      icon: Shield,
      title: "Verified Drivers",
      description:
        "All our drivers are professionally trained, verified, and experienced.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description:
        "No hidden charges. What you see is what you pay. Fixed rates guaranteed.",
    },
    {
      icon: MapPin,
      title: "Door-to-Door Service",
      description:
        "Pickup from your doorstep in Nashik and drop at your exact location in Pune.",
    },
    {
      icon: Phone,
      title: "Easy Booking",
      description:
        "Simple online booking process or call us directly for instant confirmation.",
    },
    {
      icon: Star,
      title: "Premium Comfort",
      description:
        "Well-maintained, clean vehicles with AC and comfortable seating.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose <span className="text-saffron">Our Service</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Experience the difference with our reliable and customer-focused cab
            service
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:border-saffron hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-saffron/10 transition-colors group-hover:bg-saffron">
                  <Icon className="h-6 w-6 text-saffron transition-colors group-hover:text-charcoal" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
