export default function PricingSection() {
  const carPricing = [
    {
      type: "Sedan",
      models: "Swift Dzire, Ciaz, Aura, Etios, Honda City",
      price: "\u20b93,200",
    },
    {
      type: "SUV - Ertiga",
      models: "Ertiga, XL6",
      price: "\u20b93,900",
    },
    {
      type: "SUV - Premium",
      models: "Kia Carens",
      price: "\u20b94,500",
    },
    {
      type: "SUV - Luxury",
      models: "Innova, Tavera",
      price: "\u20b93,500",
    },
    {
      type: "SUV - Premium Luxury",
      models: "Innova Crysta",
      price: "\u20b97,000",
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
                Car Type
              </th>
              <th className="text-left px-6 py-4 text-white font-semibold">
                Car Models
              </th>
              <th className="text-center px-6 py-4 text-white font-semibold">
                Price per Trip
              </th>
            </tr>
          </thead>
          <tbody>
            {carPricing.map((row, i) => (
              <tr
                key={row.type}
                data-ocid={`pricing.row.${i + 1}`}
                className={i % 2 === 0 ? "bg-white" : "bg-amber-50"}
              >
                <td
                  className="px-6 py-4 font-semibold"
                  style={{ color: "#78350f" }}
                >
                  {row.type}
                </td>
                <td className="px-6 py-4 text-gray-600">{row.models}</td>
                <td
                  className="px-6 py-4 text-center font-bold text-lg"
                  style={{ color: "#d97706" }}
                >
                  {row.price}
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
          by route and will be charged extra. Prices shown are per trip — final
          price depends on route, traffic, and additional stops.
        </div>
      </div>
    </div>
  );
}
