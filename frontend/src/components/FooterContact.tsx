import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Separator } from './ui/separator';

export default function FooterContact() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'nashik-pune-cabs';

  return (
    <footer className="border-t bg-charcoal text-white">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
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
                >
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
                  <path d="M17 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                  <path d="M6 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
                  <circle cx="9" cy="17" r="2" />
                  <circle cx="15" cy="17" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Nashik Pune Cabs</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Your trusted partner for comfortable and reliable cab service between Nashik and Pune.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-saffron hover:text-charcoal"
                aria-label="Facebook"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-saffron hover:text-charcoal"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-saffron hover:text-charcoal"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#booking" className="transition-colors hover:text-saffron">
                  Book a Cab
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-saffron">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-saffron">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-saffron">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <a href="tel:+919876543210" className="transition-colors hover:text-saffron">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <a href="mailto:info@nashikpunecabs.com" className="transition-colors hover:text-saffron">
                  info@nashikpunecabs.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <span>Nashik, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Service Hours</h4>
            <div className="flex items-start gap-2 text-sm text-gray-300">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
              <div>
                <p className="font-semibold text-white">24/7 Available</p>
                <p>Book anytime, day or night</p>
              </div>
            </div>
            <div className="rounded-lg bg-saffron/10 p-4">
              <p className="mb-2 text-sm font-semibold text-saffron">Need Immediate Booking?</p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-saffron"
              >
                <Phone className="h-4 w-4" />
                Call Now: +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-400 md:flex-row md:text-left">
          <p>© {currentYear} Nashik Pune Cabs. All rights reserved.</p>
          <p>
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-saffron transition-colors hover:text-saffron/80"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
