import { Card, CardContent } from './ui/card';
import { MapPin, Clock, Route } from 'lucide-react';

export default function RouteInfoSection() {
  const nashikRouteDetails = [
    {
      icon: Route,
      label: 'Distance',
      value: '~165 km',
      description: 'Nashik → Pune via NH 60',
    },
    {
      icon: Clock,
      label: 'Duration',
      value: '3-4 hours',
      description: 'Depending on traffic',
    },
    {
      icon: MapPin,
      label: 'Route',
      value: 'Nashik → Pune',
      description: 'Fastest highway route',
    },
  ];

  const nashikPickupPoints = [
    'Nashik Road Railway Station',
    'Nashik City Center (CBS)',
    'Trimbakeshwar Area',
    'Panchavati',
    'Gangapur Road',
    'Deolali',
    'Any location in Nashik',
  ];

  const puneDropPoints = [
    'Pune Railway Station',
    'Pune Airport',
    'Hinjewadi IT Park',
    'Koregaon Park',
    'Shivajinagar',
    'Kothrud',
    'Any location in Pune',
  ];

  const punePickupPoints = [
    'Pune Station',
    'Shivajinagar',
    'Hinjewadi IT Park',
    'Viman Nagar',
    'Koregaon Park',
    'Kothrud',
    'Any location in Pune',
  ];

  const nashikDropPoints = [
    'Nashik CBS',
    'Nashik Road',
    'Panchavati',
    'Gangapur Road',
    'Trimbakeshwar',
    'Deolali',
    'Any location in Nashik',
  ];

  return (
    <section className="bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal py-16 text-white md:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Route <span className="text-saffron">Information</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Everything you need to know about the Nashik ↔ Pune journey
          </p>
        </div>

        {/* Route Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {nashikRouteDetails.map((detail) => {
            const Icon = detail.icon;
            return (
              <Card key={detail.label} className="border-white/10 bg-white/5 backdrop-blur">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-saffron">
                    <Icon className="h-6 w-6 text-charcoal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">{detail.label}</p>
                    <p className="text-2xl font-bold text-white">{detail.value}</p>
                    <p className="text-sm text-gray-400">{detail.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Nashik ↔ Pune Pickup and Drop Points */}
        <div className="mb-8">
          <h3 className="mb-6 text-center text-xl font-bold text-saffron">Nashik → Pune</h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <MapPin className="h-5 w-5 text-saffron" />
                  Popular Pickup Points in Nashik
                </h4>
                <ul className="space-y-2">
                  {nashikPickupPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-gray-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <MapPin className="h-5 w-5 text-saffron" />
                  Popular Drop Points in Pune
                </h4>
                <ul className="space-y-2">
                  {puneDropPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-gray-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pune → Nashik */}
        <div>
          <h3 className="mb-6 text-center text-xl font-bold text-saffron">Pune → Nashik</h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <MapPin className="h-5 w-5 text-saffron" />
                  Popular Pickup Points in Pune
                </h4>
                <ul className="space-y-2">
                  {punePickupPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-gray-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur">
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <MapPin className="h-5 w-5 text-saffron" />
                  Popular Drop Points in Nashik
                </h4>
                <ul className="space-y-2">
                  {nashikDropPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-gray-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
