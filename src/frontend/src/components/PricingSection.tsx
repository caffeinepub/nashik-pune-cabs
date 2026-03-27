export default function PricingSection() {
  const routes = [
    {
      route: "Nashik → Pune",
      distance: "~165 km",
      sedan: "₹3,500",
      suv: "₹4,500",
    },
    {
      route: "Pune → Nashik",
      distance: "~165 km",
      sedan: "₹3,500",
      suv: "₹4,500",
    },
    {
      route: "Mumbai → Pune",
      distance: "~150 km",
      sedan: "₹3,000",
      suv: "₹4,000",
    },
    {
      route: "Mumbai → Nashik",
      distance: "~167 km",
      sedan: "₹4,500",
      suv: "₹5,500",
    },
    {
      route: "Nashik Local",
      distance: "City rides",
      sedan: "₹1,500",
      suv: "₹2,000",
    },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3" style={{ color: "#1c1007" }}>
          Transparent Pricing
        </h2>
        <p className="text-gray-600">
          Honest fares with no hidden charges. All prices exclude toll fees.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="w-full text-sm" data-ocid="pricing.table">
          <thead>
            <tr style={{ backgroundColor: "#d97706" }}>
              <th className="text-left px-6 py-4 text-white font-semibold">
                Route
              </th>
              <th className="text-left px-6 py-4 text-white font-semibold">
                Distance
              </th>
              <th className="text-center px-6 py-4 text-white font-semibold">
                🚗 Sedan
              </th>
              <th className="text-center px-6 py-4 text-white font-semibold">
                🚙 SUV
              </th>
            </tr>
          </thead>
          <tbody>
            {routes.map((row, i) => (
              <tr
                key={row.route}
                data-ocid={`pricing.row.${i + 1}`}
                className={i % 2 === 0 ? "bg-white" : "bg-amber-50"}
              >
                <td
                  className="px-6 py-4 font-semibold"
                  style={{ color: "#78350f" }}
                >
                  {row.route}
                </td>
                <td className="px-6 py-4 text-gray-600">{row.distance}</td>
                <td
                  className="px-6 py-4 text-center font-bold"
                  style={{ color: "#d97706" }}
                >
                  {row.sedan}
                </td>
                <td
                  className="px-6 py-4 text-center font-bold"
                  style={{ color: "#b45309" }}
                >
                  {row.suv}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="mt-4 flex items-start gap-2 p-4 rounded-lg"
        style={{ backgroundColor: "#fef3c7" }}
      >
        <span className="text-lg">ℹ️</span>
        <div className="text-sm" style={{ color: "#78350f" }}>
          <strong>Note:</strong> All fares are excluding toll fees. Tolls vary
          by route and will be charged extra. Fares shown are indicative — final
          price depends on car model, traffic, and additional stops.
        </div>
      </div>
    </div>
  );
}
