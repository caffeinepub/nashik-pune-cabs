import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "./ui/separator";

export default function FooterContact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t text-white"
      style={{
        background:
          "linear-gradient(135deg, #1c1410 0%, #2d1e0a 50%, #1c1410 100%)",
      }}
    >
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                style={{ background: "#f59e0b" }}
              >
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
                <h3 className="text-lg font-bold">Nashik Pune Cabs</h3>
              </div>
            </div>
            <p className="text-sm text-amber-200">
              Your trusted partner for comfortable and reliable cab service
              between Nashik and Pune.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: "#f59e0b" }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>
                <a
                  href="#booking"
                  className="transition-colors hover:text-white"
                >
                  Book a Cab
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="transition-colors hover:text-white"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: "#f59e0b" }}>
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-amber-200">
              <li className="flex items-start gap-2">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "#fcd34d" }}
                />
                <a
                  href="tel:+919158818546"
                  className="transition-colors hover:text-white"
                >
                  +91 91588 18546
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "#fcd34d" }}
                />
                <a
                  href="mailto:nashiktopunecabs@gmail.com"
                  className="transition-colors hover:text-white"
                >
                  nashiktopunecabs@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "#fcd34d" }}
                />
                <span>Nashik, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: "#f59e0b" }}>
              Service Hours
            </h4>
            <div className="flex items-start gap-2 text-sm text-amber-200">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: "#fcd34d" }}
              />
              <div>
                <p className="font-semibold text-white">24/7 Available</p>
                <p>Book anytime, day or night</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-amber-300 md:flex-row md:text-left">
          <p>© {currentYear} Nashik Pune Cabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
