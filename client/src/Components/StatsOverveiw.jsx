import { FaUsers, FaGlobe, FaShoppingCart, FaHome } from "react-icons/fa";

const StatsOverview = () => {
  const stats = [
    { icon: <FaUsers className="text-4xl text-green-600" />, label: "Farmers", value: 1500 },
    { icon: <FaShoppingCart className="text-4xl text-green-600" />, label: "Buyers", value: 200 },
    { icon: <FaGlobe className="text-4xl text-green-600" />, label: "Countries", value: 21 },
    { icon: <FaHome className="text-4xl text-green-600" />, label: "Villages Covered", value: 350 },
  ];

  return (
    <section className="py-16 bg-white" id="stats">
      <div className="container px-6 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">AgriConnect Community</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 text-center rounded-lg bg-green-50">
              <div className="mb-4">{stat.icon}</div>
              <h3 className="mb-2 text-2xl font-bold text-green-600">{stat.value.toLocaleString()}</h3>
              <p className="text-lg font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
