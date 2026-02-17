import { Shield, Clock, DollarSign, Star } from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: Shield,
      text: 'Verified Drivers',
    },
    {
      icon: Clock,
      text: '24/7 Support',
    },
    {
      icon: DollarSign,
      text: 'Transparent Pricing',
    },
    {
      icon: Star,
      text: '1000+ Happy Customers',
    },
  ];

  return (
    <section className="border-b border-t bg-saffron/5 py-6">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron">
                  <Icon className="h-5 w-5 text-charcoal" />
                </div>
                <span className="text-sm font-semibold md:text-base">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
