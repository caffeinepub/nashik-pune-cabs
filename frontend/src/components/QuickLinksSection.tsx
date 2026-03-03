import { MapPin, Plane, Navigation, RotateCcw, Building2 } from 'lucide-react';

export interface QuickLinkData {
  pickup?: string;
  drop?: string;
  tripType?: 'one-way' | 'round-trip';
}

interface QuickLink {
  label: string;
  icon: React.ReactNode;
  data: QuickLinkData;
}

const quickLinks: QuickLink[] = [
  {
    label: 'Nashik → Pune',
    icon: <Navigation className="h-5 w-5" />,
    data: { pickup: 'Nashik CBS', drop: 'Pune Station', tripType: 'one-way' },
  },
  {
    label: 'Pune → Nashik',
    icon: <Navigation className="h-5 w-5" />,
    data: { pickup: 'Nashik CBS', drop: 'Pune Station', tripType: 'round-trip' },
  },
  {
    label: 'Nashik → Mumbai',
    icon: <Building2 className="h-5 w-5" />,
    data: { pickup: 'Nashik CBS', drop: 'Mumbai', tripType: 'one-way' },
  },
  {
    label: 'Pune → Mumbai',
    icon: <Building2 className="h-5 w-5" />,
    data: { pickup: 'Nashik CBS', drop: 'Mumbai', tripType: 'one-way' },
  },
  {
    label: 'Airport Transfer',
    icon: <Plane className="h-5 w-5" />,
    data: { pickup: 'Nashik Road', drop: 'Pune Airport', tripType: 'one-way' },
  },
  {
    label: 'Pune Airport',
    icon: <Plane className="h-5 w-5" />,
    data: { pickup: 'Nashik CBS', drop: 'Pune Airport', tripType: 'one-way' },
  },
  {
    label: 'Round Trip',
    icon: <RotateCcw className="h-5 w-5" />,
    data: { pickup: 'Nashik CBS', drop: 'Pune Station', tripType: 'round-trip' },
  },
  {
    label: 'Hinjewadi IT Park',
    icon: <MapPin className="h-5 w-5" />,
    data: { pickup: 'Nashik CBS', drop: 'Hinjewadi', tripType: 'one-way' },
  },
];

interface QuickLinksSectionProps {
  onQuickLink: (data: QuickLinkData) => void;
}

export default function QuickLinksSection({ onQuickLink }: QuickLinksSectionProps) {
  return (
    <section className="border-b border-border/40 bg-background py-6">
      <div className="container">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Quick Book
        </p>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onQuickLink(link.data)}
              className="flex items-center gap-2 rounded-full border-2 border-saffron/40 bg-saffron/5 px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-saffron hover:bg-saffron hover:text-charcoal active:scale-95"
            >
              <span className="text-saffron group-hover:text-charcoal">{link.icon}</span>
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
