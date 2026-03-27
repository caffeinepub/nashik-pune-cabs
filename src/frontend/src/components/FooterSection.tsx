import { Car } from "lucide-react";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const FOOTER_LINKS = [
  { label: "Book a Cab", id: "book" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQs", id: "faqs" },
  { label: "About Us", id: "about" },
  { label: "Contact Us", id: "contact" },
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#1c1007", color: "#f5e6d0" }}>
      <div className="container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#d97706" }}
              >
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg" style={{ color: "#fbbf24" }}>
                Nashik Pune Cabs
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#d4b896" }}>
              Your trusted partner for comfortable and reliable cab service
              between Nashik and Pune.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wide"
              style={{ color: "#fbbf24" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    data-ocid={`footer.${link.id}.link`}
                    className="text-sm hover:underline transition-colors"
                    style={{ color: "#d4b896" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wide"
              style={{ color: "#fbbf24" }}
            >
              Contact
            </h4>
            <div className="space-y-2 text-sm" style={{ color: "#d4b896" }}>
              <div>
                <a
                  href="tel:+919158818546"
                  className="hover:underline"
                  style={{ color: "#d4b896" }}
                >
                  &#x1F4DE; +91 91588 18546
                </a>
              </div>
              <div>
                <a
                  href="mailto:nashiktopunecabs@gmail.com"
                  className="hover:underline"
                  style={{ color: "#d4b896" }}
                >
                  &#x1F4E7; nashiktopunecabs@gmail.com
                </a>
              </div>
              <div style={{ color: "#d4b896" }}>
                &#x1F4CD; Nashik, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Service Hours */}
          <div>
            <h4
              className="font-bold mb-4 text-sm uppercase tracking-wide"
              style={{ color: "#fbbf24" }}
            >
              Service Hours
            </h4>
            <div className="space-y-1 text-sm" style={{ color: "#d4b896" }}>
              <div className="font-semibold" style={{ color: "#fbbf24" }}>
                24/7 Available
              </div>
              <div>Book anytime, day or night</div>
              <div className="mt-3">
                <a
                  href="tel:+919158818546"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: "#d97706" }}
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid #3d2005", backgroundColor: "#140c04" }}
      >
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#8a6040" }}>
            &copy; {year} Nashik Pune Cabs. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#8a6040" }}>
            Serving Nashik &middot; Pune &middot; Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
