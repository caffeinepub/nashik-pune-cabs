import { Clock, MapPin, Shield, Star } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      icon: Shield,
      title: "Safe & Reliable",
      desc: "All drivers are verified and professionally trained. Your safety is our #1 priority.",
    },
    {
      icon: Clock,
      title: "Always On Time",
      desc: "Punctuality is core to our service. We ensure timely pickups and drop-offs, every time.",
    },
    {
      icon: Star,
      title: "Premium Comfort",
      desc: "Well-maintained, clean vehicles with AC. Travel in comfort and style.",
    },
    {
      icon: MapPin,
      title: "Local Expertise",
      desc: "We know the Nashik–Pune corridor inside out. Fastest routes, local knowledge.",
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#1c1007" }}>
          About Nashik Pune Cabs
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
          Nashik Pune Cabs is your trusted transportation partner for intercity
          and local cab services. We connect Nashik, Pune, and Mumbai with
          reliable, comfortable, and affordable cab rides. Our mission is to
          make every journey pleasant and stress-free.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="rounded-xl p-6 text-center border hover:shadow-md transition-shadow"
            style={{ borderColor: "#fde68a", backgroundColor: "#fffbeb" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#fef3c7" }}
            >
              <h.icon className="h-6 w-6" style={{ color: "#d97706" }} />
            </div>
            <h3
              className="font-bold text-base mb-2"
              style={{ color: "#78350f" }}
            >
              {h.title}
            </h3>
            <p className="text-sm text-gray-600">{h.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
