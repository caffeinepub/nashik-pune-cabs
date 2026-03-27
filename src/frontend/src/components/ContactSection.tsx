import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3" style={{ color: "#1c1007" }}>
          Contact Us
        </h2>
        <p className="text-gray-600">
          We're here to help, 24 hours a day, 7 days a week.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Phone,
            title: "Phone",
            lines: ["+91 91588 18546"],
            action: { href: "tel:+919158818546", label: "Call Now" },
          },
          {
            icon: Mail,
            title: "Email",
            lines: ["nashiktopunecabs@gmail.com"],
            action: {
              href: "mailto:nashiktopunecabs@gmail.com",
              label: "Send Email",
            },
          },
          {
            icon: MapPin,
            title: "Location",
            lines: ["Nashik, Maharashtra", "India"],
            action: null,
          },
          {
            icon: Clock,
            title: "Service Hours",
            lines: ["24/7 Available", "Book anytime, day or night"],
            action: null,
          },
        ].map((card) => (
          <div
            key={card.title}
            data-ocid={`contact.${card.title.toLowerCase().replace(/ /g, "_")}.card`}
            className="rounded-xl p-6 bg-white shadow-sm border text-center"
            style={{ borderColor: "#fde68a" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#fef3c7" }}
            >
              <card.icon className="h-5 w-5" style={{ color: "#d97706" }} />
            </div>
            <h3 className="font-bold text-sm mb-2" style={{ color: "#78350f" }}>
              {card.title}
            </h3>
            {card.lines.map((line) => (
              <p key={line} className="text-sm text-gray-600">
                {line}
              </p>
            ))}
            {card.action && (
              <a
                href={card.action.href}
                className="inline-block mt-3 text-xs font-semibold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#d97706" }}
              >
                {card.action.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
