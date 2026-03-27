import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "How do I book a cab from Nashik to Pune?",
    a: "Simply fill out the booking form above with your pickup location, drop location, date, time, and car preference. Click 'Book Now' and you'll be redirected to WhatsApp to confirm your booking.",
  },
  {
    q: "What is the distance between Nashik and Pune?",
    a: "The distance from Nashik to Pune via NH 60 is approximately 165 km. The journey typically takes 3\u20134 hours depending on traffic conditions.",
  },
  {
    q: "Are toll fees included in the fare?",
    a: "No, toll fees are not included in the quoted fare. Tolls will be charged extra based on the actual tolls encountered during your journey.",
  },
  {
    q: "What types of vehicles are available?",
    a: "We offer Sedans (Swift Dzire, Ciaz) and SUVs (Ertiga, XL6, Kia Carens, Innova, Innova Crysta, Tavera). Choose the vehicle that best suits your comfort and budget.",
  },
  {
    q: "Is the service available 24/7?",
    a: "Yes! Our cab service operates 24 hours a day, 7 days a week. You can book anytime, even for early morning or late night pickups.",
  },
  {
    q: "Can I book a cab for Mumbai routes?",
    a: "Absolutely! We provide cab services for Mumbai\u2013Pune, Mumbai\u2013Nashik routes as well, in addition to Nashik\u2013Pune and local Nashik rides.",
  },
  {
    q: "How do I cancel or modify my booking?",
    a: "For cancellations or modifications, please call us immediately at +91 91588 18546 or send a message on WhatsApp. We'll do our best to accommodate changes.",
  },
  {
    q: "Are the drivers experienced and verified?",
    a: "Yes, all our drivers are professionally trained, licensed, and background-verified. Your safety and comfort are our top priority.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3" style={{ color: "#1c1007" }}>
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600">Got questions? We've got answers.</p>
      </div>
      <div className="space-y-3" data-ocid="faqs.list">
        {FAQS.map((faq, i) => (
          <div
            key={faq.q}
            data-ocid={`faqs.item.${i + 1}`}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "#fde68a" }}
          >
            <button
              type="button"
              className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-sm hover:bg-amber-50 transition-colors"
              style={{ color: "#78350f" }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{faq.q}</span>
              {open === i ? (
                <ChevronUp className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0" />
              )}
            </button>
            {open === i && (
              <div
                className="px-6 pb-4 text-sm text-gray-700 border-t"
                style={{ borderColor: "#fde68a", backgroundColor: "#fffbeb" }}
              >
                <p className="pt-3">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
