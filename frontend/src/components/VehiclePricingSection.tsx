import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Briefcase } from 'lucide-react';

export default function VehiclePricingSection() {
  const vehicles = [
    {
      name: 'Sedan',
      description: 'Perfect for small families and business trips',
      capacity: '4 Passengers',
      luggage: '2-3 Bags',
      features: ['AC', 'Comfortable Seats', 'Professional Driver'],
      price: '₹2,500 - ₹3,000',
      icon: Users,
      popular: false,
    },
    {
      name: 'SUV',
      description: 'Spacious and comfortable for group travel',
      capacity: '6-7 Passengers',
      luggage: '4-5 Bags',
      features: ['AC', 'Extra Legroom', 'Premium Comfort'],
      price: '₹3,500 - ₹4,500',
      icon: Briefcase,
      popular: true,
    },
  ];

  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Choose Your <span className="text-saffron">Vehicle</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Select from our fleet of well-maintained vehicles. All prices are approximate and may vary based on specific requirements.
          </p>
        </div>

        {/* Vehicle Set Image */}
        <div className="mb-12">
          <img
            src="/assets/generated/vehicle-set-no-tempo.dim_1200x400.png"
            alt="Fleet of sedan and SUV vehicles available for Nashik to Pune journey"
            className="mx-auto rounded-2xl shadow-lg"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {vehicles.map((vehicle) => {
            const Icon = vehicle.icon;
            return (
              <Card key={vehicle.name} className={`relative overflow-hidden transition-all hover:shadow-lg ${vehicle.popular ? 'border-saffron border-2' : ''}`}>
                {vehicle.popular && (
                  <Badge className="absolute right-4 top-4 bg-saffron text-charcoal">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-saffron/10">
                    <Icon className="h-7 w-7 text-saffron" />
                  </div>
                  <CardTitle className="text-2xl">{vehicle.name}</CardTitle>
                  <CardDescription>{vehicle.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-semibold">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Luggage:</span>
                      <span className="font-semibold">{vehicle.luggage}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Features:</p>
                    <ul className="space-y-1">
                      {vehicle.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <svg
                            className="mr-2 h-4 w-4 text-saffron"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">Approx. Price:</span>
                      <span className="text-2xl font-bold text-saffron">{vehicle.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
